"use client";

import {
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import React from "react";
import AddServiceQuestion from "./AddServiceQuestion/AddServiceQuestion";
import CalendarForm from "./Calendar/CalendarForm";
import CalendarOverview from "./Calendar/CalendarOverview";
import ServiceSelectionForm from "./ServiceSelectionForm/ServiceSelectionForm";
import CustomerForm from "./CustomerForm/CustomerForm";
import appointmentsService from "@/services/appointments.service";

export default function BookingFormContainer({ categories }) {
  const theme = useTheme();
  const calendarRef = useRef(null);

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
  }, [formState]);

  /** Methods */
  const getAvailableServices = (services) => {
    return services;
    const selectedServiceIds = selectedServices.map(s => s.id);
    return services.filter(service => !selectedServiceIds.includes(service.id));
  };

  const getAllServices = (categoryId, subCategoryId) => {
    return categories.find(category => category.categoryId === categoryId)?.subCategories.find(subCategory => subCategory.subCategoryId === subCategoryId)?.services;
  };

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
      const {validationErrors, errorMessage, data} = await appointmentsService.createAppointment(appointmentData);

      if (validationErrors) {
        setCreateAppointmentErrors(validationErrors);
      } else if (errorMessage) {
        setGeneralError(errorMessage);
      } else if (data) {
        setAppointmentConfirmation(data);
      }
    } catch (error) {
      setGeneralError(`Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`);
    }
  }

  return (
    <Box sx={{
      p: 2,
      backgroundColor: theme.palette.background.paper,
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
          categories={categories}
          onServiceSelect={(service) => {
            setFormState(prev => ({ ...prev, firstService: service }));
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
        />

        {formState.hasSecondService && (<Box mt={2}>
          <ServiceSelectionForm
            categories={categories}
            onServiceSelect={(service) => {
              setFormState(prev => ({ ...prev, secondService: service }));
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
              setFormState(prev => ({ ...prev, hasSecondService: true }));
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
          onNextStep={() => {
            setShowCalendarOverview(true);
            setShowCalendar(false);

            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: `smooth` });
            }, 0);
          }}
        />
      )}

      {showCalendarOverview && (<>
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
      </>
      )}
    </Box>
  );
}
