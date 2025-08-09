"use client";

import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import {
  useState,
  useEffect,
} from 'react';
import AddServiceQuestion from '@/components/BookingForm/AddServiceQuestion/AddServiceQuestion';
import CalendarForm from '@/components/BookingForm/CalendarForm/CalendarForm';
import CalendarOverview from '@/components/BookingForm/CalendarOverview/CalendarOverview';
import Confirmation from '@/components/BookingForm/Confirmation/Confirmation';
import CustomerForm from '@/components/BookingForm/CustomerForm/CustomerForm';
import ServiceSelectionForm from '@/components/BookingForm/ServiceSelectionForm/ServiceSelectionForm';
import appointmentsService from '@/services/appointments.service';

export default function BookingFormContainer({ categories }) {
  const theme = useTheme();

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

  // const getAllServices = (categoryId, subCategoryId) => {
  //   return categories.find(category => category.categoryId === categoryId)?.subCategories.find(subCategory => subCategory.subCategoryId === subCategoryId)?.services;
  // };

  const onEditCalendarClick = () => {
    setShowCalendarOverview(false);
    setShowCalendar(true);
  };

  const onSubmitCustomerFormClick = async (formData) => {
    const appointmentData = {
      ...formData,
      date: selectedDay.day,
      service: selectedTimeSlot,
    };

    try {
      const {
        validationErrors, errorMessage, data,
      } = await appointmentsService.createAppointment(appointmentData);

      if (validationErrors) {
        setCreateAppointmentErrors(validationErrors);
      } else if (errorMessage) {
        setGeneralError(errorMessage);
      } else if (data) {
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
          py: 0.5,
          px: 1,
          pl: `max(16px, env(safe-area-inset-left))`,
          pr: `max(16px, env(safe-area-inset-right))`,
          backgroundColor: `rgba(255,255,255,0.9)`,
          backdropFilter: `saturate(180%) blur(8px)`,
          WebkitBackdropFilter: `saturate(180%) blur(8px)`,
          '& .MuiStepLabel-label': {
            fontSize: {
              xs: `0.78rem`,
              md: `0.9rem`,
            },
          },
        }}
      >
        <Stepper alternativeLabel activeStep={(
          appointmentConfirmation ? 3 : (showCalendarOverview ? 2 : (showCalendar ? 1 : 0))
        )} sx={{
          '& .MuiStepIcon-root': {
            color: `rgba(0,0,0,0.2)`,
            fontSize: `1.1rem`,
            width: 24,
            height: 24,
          },
          '& .Mui-active': { color: `primary.main !important` },
          '& .Mui-completed': { color: `primary.main !important` },
          '& .MuiStepConnector-line': {
            borderTopWidth: `2px`,
          },
          minHeight: 0,
          py: 0,
          // MuiStepLabel-label
          '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
            marginTop: `5px`,
          },
        }}>
          <Step><StepLabel>Service</StepLabel></Step>
          <Step><StepLabel>Datum</StepLabel></Step>
          <Step><StepLabel>Details</StepLabel></Step>
          <Step><StepLabel>Bestätigung</StepLabel></Step>
        </Stepper>
      </Box>
      {showCalendar && !showCalendarOverview && !appointmentConfirmation && (
        <Box sx={{
          mb: 2,
          display: `flex`,
          justifyContent: `flex-start`,
        }}>
          <Button
            variant="outlined"
            color="success"
            startIcon={<ArrowBackIosNew fontSize="small" />}
            sx={{
              textTransform: `none`,
            }}
            onClick={() => {
              setShowCalendar(false);
            }}
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
                    setFormState(prev => ({
                      ...prev,
                      hasSecondService: true,
                    }));
                  }}
                />
              )}
              {formState.firstService && !showCalendar && (
                <Box mt={2} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShowCalendar(true);
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
            window.scrollTo({
              top: 0,
              behavior: `smooth`,
            });
          }}
        />
      )}

      {!appointmentConfirmation && showCalendarOverview && (<>
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
          <Typography variant="body1" sx={{
            color: `red`,
            textAlign: `center`,
          }}>
            {generalError}
          </Typography>
        )}
      </>
      )}

      {appointmentConfirmation && <Confirmation appointment={appointmentConfirmation} />}
    </Box>
  );
}
