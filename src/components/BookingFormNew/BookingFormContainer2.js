"use client";

import {
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import AddServiceQuestion from "./AddServiceQuestion/AddServiceQuestion";
import CalendarForm from "./Calendar/CalendarForm";
import ServiceSelectionForm from "./ServiceSelectionForm/ServiceSelectionForm";

export default function BookingFormContainer2({ categories }) {
  const theme = useTheme();

  // console.log(`categories: `, JSON.stringify(categories, null, 2));

  const [formState, setFormState] = useState({
    firstService: null,
    secondService: null,
    hasSecondService: false,
  });

  console.log(`formState: `, JSON.stringify(formState, null, 2));

  /** State */
  const [selectedServices, setSelectedServices] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

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

  return (
    <Box sx={{
      p: 2,
      backgroundColor: theme.palette.background.paper,
      zIndex: 1,
    }}>
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

      {/* Calendar */}
      {showCalendar && (
        <CalendarForm
          services={selectedServices}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          onEmployeesChange={() => {}} // placeholder for now
          onNextStepClick={() => console.log('Next step clicked')} // placeholder for now
        />
      )}
    </Box>
  );
}
