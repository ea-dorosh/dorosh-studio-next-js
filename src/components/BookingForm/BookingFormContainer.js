"use client";

import {
  Box,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import AddServiceQuestion from '@/components/BookingForm/AddServiceQuestion/AddServiceQuestion';
import CalendarForm from '@/components/BookingForm/CalendarForm/CalendarForm';
import CalendarOverview from '@/components/BookingForm/CalendarOverview/CalendarOverview';
import Confirmation from '@/components/BookingForm/Confirmation/Confirmation';
import CustomerForm from '@/components/BookingForm/CustomerForm/CustomerForm';
import ServiceSelectionForm from '@/components/BookingForm/ServiceSelectionForm/ServiceSelectionForm';
import appointmentsService from '@/services/appointments.service';

export default function BookingFormContainer({ categories }) {
  const theme = useTheme();
  const calendarRef = useRef(null);
  const firstServiceSelectionRef = useRef(null);

  // console.log(`categories: `, JSON.stringify(categories, null, 2));

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
    if (formState.firstService) {
      setShowCalendar(true);
    } else {
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
        }, 0);
      }
    } catch (error) {
      setGeneralError(`Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`);
    }
  }

  return (
    <Box sx={{
      p: 2,
      backgroundColor: theme.palette.background.default,
      zIndex: 1,
    }}>
      {!showCalendarOverview && <>
        <Typography variant="h1" sx={{
          mb: 3,
          textAlign: `center`,
          fontSize: `2.4rem`,
          fontWeight: `400`,
        }}>
          Service auswählen
        </Typography>

        <ServiceSelectionForm
          ref={firstServiceSelectionRef}
          categories={categories}
          onServiceSelect={(service) => {
            setFormState(prev => ({
              ...prev,
              firstService: service,
            }));
            firstServiceSelectionRef.current?.scrollIntoView({
              behavior: `smooth`,
              block: `start`,
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

        {formState.hasSecondService && (<Box mt={2}>
          <ServiceSelectionForm
            categories={categories}
            onServiceSelect={(service) => {
              setFormState(prev => ({
                ...prev,
                secondService: service,
              }));
              firstServiceSelectionRef.current?.scrollIntoView({
                behavior: `smooth`,
                block: `start`,
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
              setFormState(prev => ({
                ...prev,
                hasSecondService: true,
              }));
            }}
          />
        )}
      </>}

      {/* Calendar */}
      {showCalendar && (
        <CalendarForm
          ref={calendarRef}
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
            }, 0);
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
