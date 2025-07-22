"use client";

import {
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useState } from "react";
import AddServiceQuestion from "./AddServiceQuestion/AddServiceQuestion";
import CalendarForm from "./Calendar/CalendarForm";
import ServiceOverview from "./ServiceOverview/ServiceOverview";
import ServiceSelectionForm from "./ServiceSelectionForm/ServiceSelectionForm";

export default function BookingFormContainer2({ categories }) {
  const theme = useTheme();

  console.log(`categories: `, JSON.stringify(categories, null, 4));

  /** State */
  const [selectedServices, setSelectedServices] = useState([]);
  const [showAddServiceQuestion, setShowAddServiceQuestion] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  /** Methods */
  const onServiceSelected = (service) => {
    setSelectedServices(prev => [...prev, service]);
    setShowAddServiceQuestion(true);
  };

  const onAddServiceYes = () => {
    setShowAddServiceQuestion(false);
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

  // Фильтруем уже выбранные сервисы
  const getAvailableServices = (services) => {
    const selectedServiceIds = selectedServices.map(s => s.id);
    return services.filter(service => !selectedServiceIds.includes(service.id));
  };

  return (
    <Box sx={{
      p: 2,
      backgroundColor: theme.palette.background.default,
      zIndex: 1,
    }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Service auswählen
      </Typography>

      {/* Service Overview Components */}
      {selectedServices.map((service, index) => (
        <ServiceOverview
          key={service.id}
          service={service}
          serviceNumber={index + 1}
          onRemove={() => removeService(service.id)}
        />
      ))}

      {/* Add Service Question */}
      {showAddServiceQuestion && (
        <AddServiceQuestion
          onYes={onAddServiceYes}
          onNo={onAddServiceNo}
        />
      )}

      {/* New Service Selection Form */}
      {!showCalendar && !showAddServiceQuestion && (
        <ServiceSelectionForm
          categories={categories}
          onServiceSelect={onServiceSelected}
          getAvailableServices={getAvailableServices}
          serviceNumber={selectedServices.length + 1}
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