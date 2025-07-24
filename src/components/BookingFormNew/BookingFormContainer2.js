"use client";

import {
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useState } from "react";
import React from "react";
import AddServiceQuestion from "./AddServiceQuestion/AddServiceQuestion";
import CalendarForm from "./Calendar/CalendarForm";
import ServiceOverview from "./ServiceOverview/ServiceOverview";
import ServiceSelectionForm from "./ServiceSelectionForm/ServiceSelectionForm";

export default function BookingFormContainer2({ categories }) {
  const theme = useTheme();

  console.log(`categories: `, JSON.stringify(categories, null, 2));

  /** State */
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServicesForChange, setSelectedServicesForChange] = useState(null); // id
  const [showAddServiceQuestion, setShowAddServiceQuestion] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  /** Methods */
  const onServiceSelected = (service) => {
    // if (selectedServicesForChange) {
    //   const selectedServiceIndex = selectedServices?.findIndex(selectedService => selectedService.id === selectedServicesForChange)

    //   setSelectedServices(selectedServices => selectedServices.map(s => s.id === selectedServicesForChange ? service : s));
    //   setSelectedServicesForChange(null);
    //   return;
    // }

    setSelectedServices(prev => {
      const newServices = prev.find(s => s.id === service.id) ? [...prev] : [...prev, service];
      return newServices;
    });
    setShowAddServiceQuestion(true);
    setSelectedServicesForChange(null);
  };

  const onAddServiceYes = () => {
    setShowAddServiceQuestion(false);
    setSelectedServices(prev => [...prev, {}]);
    // Новая форма будет отрендерена автоматически
  };

  const onAddServiceNo = () => {
    setShowAddServiceQuestion(false);
    setShowCalendar(true);
  };

  const removeService = (serviceId) => {
    setSelectedServices(prev => prev.filter(service => service.id !== serviceId));
    if (selectedServices.length === 1) {
      setShowAddServiceQuestion(false);
      setShowCalendar(false);
    }
  };

  const onChangeService = (serviceId) => {
    // setShowAddServiceQuestion(false);
    setSelectedServicesForChange(serviceId);
  };

  console.log(`selectedServicesForChange: `, selectedServicesForChange);
  console.log(`selectedServices: `, selectedServices);

  // Фильтруем уже выбранные сервисы
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

      {/* Service Overview Components */}
      {/* {selectedServices.length > 0 && <>
        <Typography sx={{
          mb: 1,
          textAlign: `left`,
          fontSize: `1.2rem`,
          fontWeight: `400`,
        }}>
          Sie haben gewählt:
        </Typography>

        {selectedServices.map(service => (<React.Fragment key={service.id}>
          {service.id !== selectedServicesForChange ? (<ServiceOverview
            key={service.id}
            service={service}
            onRemove={() => removeService(service.id)}
            onChange={() => onChangeService(service.id)}
            selectedServices={selectedServices}
          />) : (
            <ServiceSelectionForm
              key={service.id}
              categories={categories}
              onServiceSelect={onServiceSelected}
              getAvailableServices={() => getAllServices(service.categoryId, service.subCategoryId)}
              selectedServiceId={service.id}
              selectedCategoryId={service.categoryId}
              selectedSubCategoryId={service.subCategoryId}
            />
          )}
        </React.Fragment>
        ))}
      </>} */}

      {/* New Service Selection Form */}
      {/* {!showCalendar && !showAddServiceQuestion && ( */}
      {selectedServices.map(service => (<React.Fragment key={service.id}>
        <ServiceSelectionForm
          categories={categories}
          onServiceSelect={onServiceSelected}
          getAvailableServices={getAvailableServices}
        />
      </React.Fragment>))}

      {/* )} */}

      {/* Add Service Question */}
      {showAddServiceQuestion && (
        <AddServiceQuestion
          onYes={onAddServiceYes}
          onNo={onAddServiceNo}
        />
      )}

      {/* Calendar */}
      {showCalendar && selectedServices.length > 0 && (
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
