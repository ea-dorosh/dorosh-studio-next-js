"use client";

import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import Close from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
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
import ServiceSelectionForm from '@/components/BookingForm/ServiceSelectionForm/ServiceSelectionForm';
import { sendGaEvent } from '@/lib/ga';
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendarOverview, setShowCalendarOverview] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [createAppointmentErrors, setCreateAppointmentErrors] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [appointmentConfirmation, setAppointmentConfirmation] = useState(null);
  const [serviceEmployees, setServiceEmployees] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Watch */
  useEffect(() => {
    if (!formState.firstService) {
      setShowCalendar(false);
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
    setShowCalendarOverview(false);
    setShowCalendar(true);
  };

  const onSubmitCustomerFormClick = async (formData) => {
    setCreateAppointmentErrors(null);
    setGeneralError(null);
    setIsSubmitting(true);
    const appointmentData = {
      ...formData,
      date: selectedDay.day,
      service: selectedTimeSlot,
    };

    try {
      const {
        validationErrors,
        errorMessage,
        data,
      } = await appointmentsService.createAppointment(appointmentData);

      if (validationErrors) {
        setCreateAppointmentErrors(validationErrors);
      } else if (errorMessage) {
        setGeneralError(errorMessage);
      } else if (data) {
        try {
          sendGaEvent(`booking_submitted`, {
            event_category: `booking`,
            value: 1,
          });
        } catch (_) {}
        setAppointmentConfirmation(data);

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: `smooth`,
          });
        }, 100);
      }
    } catch (error) {
      setGeneralError(`Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`);
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
          activeStep={(
            appointmentConfirmation ? 3 : (showCalendarOverview ? 2 : (showCalendar ? 1 : 0))
          )}
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
            // MuiStepLabel-label
            '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
              marginTop: `6px`,
            },
          }}
        >
          <Step><StepLabel>Service</StepLabel></Step>
          <Step><StepLabel>Datum</StepLabel></Step>
          <Step><StepLabel>Details</StepLabel></Step>
          <Step><StepLabel>Bestätigung</StepLabel></Step>
        </Stepper>
      </Box>
      {showCalendar && !showCalendarOverview && !appointmentConfirmation && (
        <Box
          sx={{
            mb: 2,
            display: `flex`,
            justifyContent: `flex-start`,
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
            onClick={() => setShowCalendar(false)}
          >
            Zurück zur Serviceauswahl
          </Button>
        </Box>
      )}
      {!showCalendarOverview && (
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
              {formState.firstService && !showCalendar && (
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
                        event_label: `step:calendar`,
                      });

                      setShowCalendar(true);
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
          onNextStep={() => {
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
            onChange={onEditCalendarClick}
          />

          <CustomerForm
            createAppointment={onSubmitCustomerFormClick}
            formErrors={createAppointmentErrors}
          />

          {generalError && (
            <Typography
              variant="body1"
              sx={{
                color: `red`,
                textAlign: `center`,
              }}
            >
              {generalError}
            </Typography>
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
