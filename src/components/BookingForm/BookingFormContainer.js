"use client";

import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import { useTheme } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import AddServiceQuestion from '@/components/BookingForm/AddServiceQuestion/AddServiceQuestion';
import CalendarForm from '@/components/BookingForm/CalendarForm/CalendarForm';
import CalendarOverview from '@/components/BookingForm/CalendarOverview/CalendarOverview';
import Confirmation from '@/components/BookingForm/Confirmation/Confirmation';
import CustomerForm from '@/components/BookingForm/CustomerForm/CustomerForm';
import EmployeeSelectionStep, { shouldShowEmployeeSelection } from '@/components/BookingForm/EmployeeSelectionStep/EmployeeSelectionStep';
import SelectedServicesSummary from '@/components/BookingForm/SelectedServicesSummary/SelectedServicesSummary';
import ServiceSelectionForm from '@/components/BookingForm/ServiceSelectionForm/ServiceSelectionForm';
import { employeeSelectionTypeEnum } from '@/constants/enums';
import {
  sendGaEvent,
  trackBookingOpened,
  trackServiceSelected,
  trackEmployeeSelected,
  trackDateSelected,
  trackTimeslotSelected,
  trackCustomerFormShown,
  trackBookingSuccess,
  trackBookingError,
  trackBookingBackStep,
  trackBookingAbandoned,
} from '@/lib/ga';
import { trackBookingComplete, trackBookingStart } from '@/lib/gtm';
import appointmentsService from '@/services/appointments.service';

export default function BookingFormContainer({ categories }) {
  const theme = useTheme();

  const firstServiceRef = useRef(null);

  const [formState, setFormState] = useState({
    firstService: null,
    secondService: null,
    hasSecondService: false,
  });

  /** State */
  const [selectedServices, setSelectedServices] = useState([]);
  const [showEmployeeSelection, setShowEmployeeSelection] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendarOverview, setShowCalendarOverview] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [createAppointmentErrors, setCreateAppointmentErrors] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [appointmentConfirmation, setAppointmentConfirmation] = useState(null);
  const [serviceEmployees, setServiceEmployees] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine if employee selection step should be shown
  const needsEmployeeSelection = shouldShowEmployeeSelection(selectedServices);

  // Track booking form opened on mount
  useEffect(() => {
    trackBookingOpened();

    // Track abandonment when user leaves the page
    const handleBeforeUnload = () => {
      if (!appointmentConfirmation && selectedServices.length > 0) {
        let lastStep = `service`;
        if (showCalendarOverview) lastStep = `customer_form`;
        else if (showCalendar) lastStep = `calendar`;
        else if (showEmployeeSelection) lastStep = `employee`;

        trackBookingAbandoned({
          lastStep,
          serviceSelected: selectedServices.length > 0,
        });
      }
    };

    window.addEventListener(`beforeunload`, handleBeforeUnload);
    return () => window.removeEventListener(`beforeunload`, handleBeforeUnload);
  }, [appointmentConfirmation, selectedServices, showCalendarOverview, showCalendar, showEmployeeSelection]);

  // Calculate current step for stepper
  // Steps without employee selection: Service(0) → Datum(1) → Details(2) → Bestätigung(3)
  // Steps with employee selection: Service(0) → Mitarbeiter(1) → Datum(2) → Details(3) → Bestätigung(4)
  const getCurrentStep = () => {
    if (needsEmployeeSelection) {
      if (appointmentConfirmation) return 4;
      if (showCalendarOverview) return 3;
      if (showCalendar) return 2;
      if (showEmployeeSelection) return 1;
      return 0;
    }
    // Without employee selection step
    if (appointmentConfirmation) return 3;
    if (showCalendarOverview) return 2;
    if (showCalendar) return 1;
    return 0;
  };

  /** Watch */
  useEffect(() => {
    if (!formState.firstService) {
      setShowCalendar(false);
      setShowEmployeeSelection(false);
    }

    const updatedServices = [];
    if (formState.firstService) {
      updatedServices.push(formState.firstService);
    }
    if (formState.secondService) {
      updatedServices.push(formState.secondService);
    }
    setSelectedServices(updatedServices);

    // Initialize serviceEmployees for new services
    if (updatedServices.length > 0) {
      const newServiceEmployees = { ...serviceEmployees };
      let hasChanges = false;

      updatedServices.forEach(service => {
        if (!newServiceEmployees[service?.id]) {
          if (service?.employees?.length === 1) {
            newServiceEmployees[service.id] = [service.employees[0].id.toString()];
          } else {
            newServiceEmployees[service.id] = [`all`];
          }
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setServiceEmployees(newServiceEmployees);
      }
    }
  }, [formState, serviceEmployees]);

  /** Methods */
  const getAvailableServices = (services) => {
    return services;
  };

  const onEditCalendarClick = () => {
    trackBookingBackStep({
      fromStep: `customer_form`,
      toStep: `calendar`,
    });
    setShowCalendarOverview(false);
    setShowCalendar(true);
  };

  /**
   * Determine how customer selected employee(s) for analytics tracking
   * Returns: { type: EmployeeSelectionTypeEnum | null, selectedIds: number[] | null }
   */
  const getEmployeeSelectionInfo = () => {
    // Only track for services that had multiple employees to choose from
    const servicesWithChoice = selectedServices.filter(
      (service) => service?.employees?.length > 1
    );

    if (servicesWithChoice.length === 0) {
      // No choice was available - single employee per service
      return {
        type: null,
        selectedIds: null,
      };
    }

    // Check the selection for each service (use first service with choice)
    for (const service of servicesWithChoice) {
      const selection = serviceEmployees[service.id] || [`all`];

      if (selection.includes(`all`)) {
        // Customer chose "Egal / Alle Mitarbeiter" explicitly
        return {
          type: employeeSelectionTypeEnum.any,
          selectedIds: null,
        };
      }

      const selectedCount = selection.length;
      const selectedIds = selection.map((id) => parseInt(id, 10));

      if (selectedCount === 1) {
        // Customer selected one specific employee
        return {
          type: employeeSelectionTypeEnum.specific,
          selectedIds,
        };
      }

      if (selectedCount > 1) {
        // Customer selected multiple employees (even if all of them)
        return {
          type: employeeSelectionTypeEnum.multiple,
          selectedIds,
        };
      }
    }

    return {
      type: null,
      selectedIds: null,
    };
  };

  const onSubmitCustomerFormClick = async (formData) => {
    setCreateAppointmentErrors(null);
    setGeneralError(null);
    setIsSubmitting(true);
    const employeeSelectionInfo = getEmployeeSelectionInfo();
    const appointmentData = {
      ...formData,
      date: selectedDay.day,
      service: selectedTimeSlot,
      employeeSelectionType: employeeSelectionInfo.type,
      employeeSelectionIds: employeeSelectionInfo.selectedIds,
    };

    try {
      const {
        validationErrors,
        errorMessage,
        data,
      } = await appointmentsService.createAppointment(appointmentData);

      if (validationErrors) {
        setCreateAppointmentErrors(validationErrors);
        trackBookingError({
          errorMessage: `Validation errors`,
          errorStep: `customer_form`,
        });
      } else if (errorMessage) {
        setGeneralError(errorMessage);
        trackBookingError({
          errorMessage,
          errorStep: `customer_form`,
        });
      } else if (data) {
        sendGaEvent(`booking_submitted`, {
          event_category: `booking`,
          value: 1,
        });

        // Google Ads Conversion Tracking
        const totalPrice = selectedServices.reduce((sum, service) => sum + (service.price || 350), 0);
        trackBookingComplete({
          bookingId: data.id || Date.now().toString(),
          serviceName: selectedServices.map(s => s.name).join(`, `),
          category: selectedServices[0]?.category || `Beauty`,
          price: totalPrice,
        });

        // GA4 Funnel Tracking
        trackBookingSuccess({
          bookingId: data.id || Date.now().toString(),
          serviceName: selectedServices.map(s => s.name).join(`, `),
          totalPrice,
        });

        setAppointmentConfirmation(data);

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: `smooth`,
          });
        }, 100);
      }
    } catch (error) {
      const errorMsg = `Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`;
      setGeneralError(errorMsg);
      trackBookingError({
        errorMessage: error?.message || `Network error`,
        errorStep: `customer_form_submit`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
        },
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          mb: 2,
          position: `sticky`,
          top: 0,
          // full-bleed without horizontal shift
          mx: `calc(50% - 50vw)`,
          width: `100vw`,
          zIndex: 10,
          py: 1,
          px: 1,
          pl: `max(16px, env(safe-area-inset-left))`,
          pr: `max(16px, env(safe-area-inset-right))`,
          backgroundColor: `rgba(255,255,255,0.88)`,
          backdropFilter: `saturate(180%) blur(10px)`,
          WebkitBackdropFilter: `saturate(180%) blur(10px)`,
          borderBottom: `1px solid rgba(0,0,0,0.06)`,
          boxShadow: `none`,
          '& .MuiStepLabel-label': {
            fontSize: {
              xs: `0.8rem`,
              md: `0.95rem`,
            },
            letterSpacing: `.01em`,
          },
        }}
      >
        <Stepper
          alternativeLabel
          activeStep={getCurrentStep()}
          sx={{
            '& .MuiStepIcon-root': {
              color: `rgba(0,0,0,0.2)`,
              fontSize: `1.15rem`,
              width: 26,
              height: 26,
            },
            '& .Mui-active': { color: `primary.main !important` },
            '& .Mui-completed': { color: `primary.main !important` },
            '& .MuiStepConnector-line': {
              borderTopWidth: `2px`,
              borderColor: `rgba(0,0,0,0.12)`,
            },
            minHeight: 0,
            py: 0,
            '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
              marginTop: `6px`,
            },
          }}
        >
          <Step><StepLabel>Service</StepLabel></Step>
          {needsEmployeeSelection && <Step><StepLabel>Mitarbeiter</StepLabel></Step>}
          <Step><StepLabel>Datum</StepLabel></Step>
          <Step><StepLabel>Details</StepLabel></Step>
          <Step><StepLabel>Bestätigung</StepLabel></Step>
        </Stepper>
      </Box>

      {/* Employee Selection Step */}
      {showEmployeeSelection && !showCalendar && !showCalendarOverview && !appointmentConfirmation && (
        <Box>
          <Box
            sx={{
              mb: 2,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `flex-start`,
              gap: 1.5,
            }}
          >
            <Button
              variant="outlined"
              color="success"
              startIcon={<ArrowBackIosNew fontSize="small" />}
              sx={{
                textTransform: `none`,
                backgroundColor: `rgba(0, 171, 85, 0.04)`,
              }}
              onClick={() => {
                trackBookingBackStep({
                  fromStep: `employee`,
                  toStep: `service`,
                });
                setShowEmployeeSelection(false);
              }}
            >
              Zurück zur Serviceauswahl
            </Button>

            <SelectedServicesSummary
              services={selectedServices}
              categories={categories}
              serviceEmployees={serviceEmployees}
              showEmployees={false}
            />
          </Box>

          <EmployeeSelectionStep
            services={selectedServices}
            serviceEmployees={serviceEmployees}
            setServiceEmployees={setServiceEmployees}
            onNextStep={() => {
              // Track employee selection
              const employeeSelectionInfo = getEmployeeSelectionInfo();
              trackEmployeeSelected({
                selectionType: employeeSelectionInfo.type || `unknown`,
                employeeCount: employeeSelectionInfo.selectedIds?.length || 0,
              });

              setShowEmployeeSelection(false);
              setShowCalendar(true);
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: `smooth`,
                });
              }, 100);
            }}
          />
        </Box>
      )}

      {showCalendar && !showCalendarOverview && !appointmentConfirmation && (
        <Box
          sx={{
            mb: 2,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `flex-start`,
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            color="success"
            startIcon={<ArrowBackIosNew fontSize="small" />}
            sx={{
              textTransform: `none`,
              backgroundColor: `rgba(0, 171, 85, 0.04)`,
            }}
            onClick={() => {
              if (needsEmployeeSelection) {
                trackBookingBackStep({
                  fromStep: `calendar`,
                  toStep: `employee`,
                });
                setShowCalendar(false);
                setShowEmployeeSelection(true);
              } else {
                trackBookingBackStep({
                  fromStep: `calendar`,
                  toStep: `service`,
                });
                setShowCalendar(false);
              }
            }}
          >
            {needsEmployeeSelection ? `Zurück zur Mitarbeiterauswahl` : `Zurück zur Serviceauswahl`}
          </Button>

          <SelectedServicesSummary
            services={selectedServices}
            categories={categories}
            serviceEmployees={serviceEmployees}
            showEmployees={needsEmployeeSelection}
          />
        </Box>
      )}

      {!showCalendarOverview && !showEmployeeSelection && (
        <>
          {!showCalendar && (
            <>
              <Typography
                variant="h1"
                sx={{
                  mb: 2,
                  textAlign: `center`,
                  fontSize: {
                    xs: `2rem`,
                    md: `2.6rem`,
                  },
                  fontWeight: 600,
                  letterSpacing: `.02em`,
                }}
              >
                Service auswählen
              </Typography>

              <ServiceSelectionForm
                ref={firstServiceRef}
                categories={categories}
                onServiceSelect={(service) => {
                  setFormState(prev => ({
                    ...prev,
                    firstService: service,
                  }));
                  trackServiceSelected({
                    serviceName: service?.name,
                    serviceId: service?.id,
                    serviceCount: 1,
                  });
                }}
                getAvailableServices={getAvailableServices}
                serviceData={formState.firstService}
                hasDeleteButton={formState.hasSecondService}
                deleteService={() => {
                  setFormState(prev => ({
                    ...prev,
                    hasSecondService: false,
                    firstService: prev.secondService,
                    secondService: null,
                  }));
                }}
                selectedServicesIds={selectedServices.map(service => service.id)}
                firstService
              />

              {formState.hasSecondService && (
                <Box mt={2}>
                  <ServiceSelectionForm
                    categories={categories}
                    onServiceSelect={(service) => {
                      setFormState(prev => ({
                        ...prev,
                        secondService: service,
                      }));
                      trackServiceSelected({
                        serviceName: service?.name,
                        serviceId: service?.id,
                        serviceCount: 2,
                      });
                    }}
                    hasDeleteButton
                    deleteService={() => {
                      setFormState(prev => ({
                        ...prev,
                        hasSecondService: false,
                        secondService: null,
                      }));
                    }}
                    getAvailableServices={getAvailableServices}
                    serviceData={formState.secondService}
                    selectedServicesIds={selectedServices.map(service => service.id)}
                  />
                </Box>
              )}

              {/* Add Service Question */}
              {formState.firstService && !formState.hasSecondService && (
                <AddServiceQuestion
                  onAddService={() => {
                    // Collapse any open accordions in the first ServiceSelectionForm
                    try {
                      firstServiceRef.current?.collapseAll?.();
                    } catch (error) {
                      console.error(`[BookingFormContainer] error`, error);
                    }

                    setFormState(prev => ({
                      ...prev,
                      hasSecondService: true,
                    }));
                  }}
                />
              )}
              {formState.firstService && !showCalendar && !showEmployeeSelection && (
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => {
                      sendGaEvent(`start_booking`, {
                        event_category: `booking`,
                        event_label: needsEmployeeSelection ? `step:employee` : `step:calendar`,
                      });

                      // Google Ads: начало бронирования
                      const firstServiceName = selectedServices[0]?.name || `Service`;
                      trackBookingStart(firstServiceName);

                      // If employee selection is needed, show that step first
                      if (needsEmployeeSelection) {
                        setShowEmployeeSelection(true);
                      } else {
                        setShowCalendar(true);
                      }
                    }}
                    sx={{
                      px: 5,
                      ml: `auto`,
                      mr: `auto`,
                      width: `300px`,
                      maxWidth: `100%`,
                    }}
                  >
                    Weiter
                  </Button>
                </Box>
              )}
            </>
          )}
        </>
      )}

      {/* Calendar */}
      {showCalendar && (
        <CalendarForm
          services={selectedServices}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          serviceEmployees={serviceEmployees}
          setServiceEmployees={setServiceEmployees}
          hideEmployeeSelector={needsEmployeeSelection}
          onNextStep={() => {
            // Track date and timeslot selection
            if (selectedDay) {
              const today = new Date();
              const selectedDate = new Date(selectedDay.day);
              const daysFromToday = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));
              trackDateSelected({
                date: selectedDay.day,
                daysFromToday,
              });
            }
            if (selectedTimeSlot) {
              trackTimeslotSelected({
                time: selectedTimeSlot.startTime,
              });
            }
            // Track customer form shown
            trackCustomerFormShown();

            setShowCalendarOverview(true);
            setShowCalendar(false);
            setTimeout(() => {
              window.scrollTo({
                top: 0,
                behavior: `smooth`,
              });
            }, 100);
          }}
        />
      )}

      {!appointmentConfirmation && showCalendarOverview && (
        <>
          <Button
            variant="outlined"
            color="success"
            startIcon={<ArrowBackIosNew fontSize="small" />}
            sx={{
              textTransform: `none`,
              backgroundColor: `rgba(0, 171, 85, 0.04)`,
              mb: 2,
            }}
            onClick={onEditCalendarClick}
          >
            Zurück zur Terminauswahl
          </Button>

          <CalendarOverview
            services={selectedServices}
            selectedDay={selectedDay}
            selectedTimeSlot={selectedTimeSlot}
            serviceEmployees={serviceEmployees}
            onChange={onEditCalendarClick}
          />

          <CustomerForm
            createAppointment={onSubmitCustomerFormClick}
            formErrors={createAppointmentErrors}
          />

          {generalError && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: `#ffebee`,
                borderLeft: `4px solid #f44336`,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: `#d32f2f`,
                  textAlign: `center`,
                  fontWeight: 500,
                }}
              >
                {generalError}
              </Typography>
            </Box>
          )}
        </>
      )}

      {appointmentConfirmation && <Confirmation appointment={appointmentConfirmation} />}

      <Backdrop
        open={isSubmitting}
        sx={{
          color: `#ffffff`,
          zIndex: (t) => t.zIndex.modal + 1,
          background: `rgba(0,0,0,0.45)`,
          backdropFilter: `blur(4px)`,
        }}
      >
        <Box
          role="dialog"
          aria-live="polite"
          aria-busy={isSubmitting}
          sx={{
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            gap: 2,
            p: 3,
            borderRadius: 2,
            background: `linear-gradient(135deg, rgba(0,171,85,0.96) 0%, rgba(0,200,100,0.96) 100%)`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.35)`,
            textAlign: `center`,
            width: `90%`,
          }}
        >
          <CircularProgress
            size={48}
            thickness={4}
            sx={{ color: `#ffffff` }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: `1.1rem`,
                md: `1.25rem`,
              },
            }}
          >
            Bitte warten Sie einen Moment - wir speichern gerade Ihre Buchung.
          </Typography>

          <Typography sx={{ opacity: 0.9 }}>
            Dies kann einige Sekunden dauern.
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
