"use client";

import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { forwardRef } from "react";
import { useState, useMemo } from "react";
import EmployeesForm from "./Employees/EmployeesForm";
import EmployeesOverview from "./Employees/EmployeesOverview";
import FORM_STEPS from "./formSteps";
import ServiceOverview from "./Services/ServiceOverview";
import ServicesList from "./Services/ServicesList";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BookingModal({ 
  open, 
  handleClose,
  category, 
  services,
}) {
  const theme = useTheme();

  /** state */
  const [formStep, setFormStep] = useState(FORM_STEPS.SERVICES);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);

  /** computed */
  const filteredServices = services.filter(
    (service) => service.categoryId === category.id
  );

  const selectedEmployees = useMemo(() => selectedService?.employees.filter(employee => selectedEmployeesIds.includes(employee.id)), 
    [selectedService?.employees, selectedEmployeesIds]);
  
  const hasServicesForm = useMemo(() => formStep === FORM_STEPS.SERVICES, [formStep]);
  const hasServiceOverview = useMemo(() => formStep > FORM_STEPS.SERVICES && formStep < FORM_STEPS.FINISH, [formStep]);
  
  const hasEmployeesForm = useMemo(() => formStep === FORM_STEPS.EMPLOYEES, [formStep]);
  const hasEmployeesOverview = useMemo(() => formStep > FORM_STEPS.EMPLOYEES && formStep < FORM_STEPS.FINISH, [formStep]);

  const hasCalendarForm = useMemo(() => formStep === FORM_STEPS.CALENDAR, [formStep]);
  const hasCalendarOverview = useMemo(() => formStep > FORM_STEPS.CALENDAR && formStep < FORM_STEPS.FINISH, [formStep]);


  /* methods */
  const onSubmitServiceFormClick = (service) => {
    setSelectedService(service);

    if (service.employees.length === 1) {      
      setSelectedEmployeesIds([service.employees[0].id]);
      setFormStep(FORM_STEPS.CALENDAR);
    } else {
      setFormStep(FORM_STEPS.EMPLOYEES);    
    }
  }

  const onChangeServiceFormClick = () => {
    setSelectedService(null);
    setSelectedEmployeesIds([]);
    // setSelectedEmployeeFromTimeSlotAvailability(null);

    setFormStep(FORM_STEPS.SERVICES);
  }

  const onChangeSelectedEmployeeClick = (event) => {
    const { value, checked } = event.target;

    setSelectedEmployeesIds((prevData) => (
      checked ? // eslint-disable-next-line no-undef
        [...new Set([...prevData, Number(value)])]
        : prevData.filter(
          (id) => Number(id) !== Number(value)
        )
    ));
  };

  const onSelectAllClick = () => {
    if (selectedEmployeesIds.length === selectedService.employees.length) {
      setSelectedEmployeesIds([]);
    } else {
      setSelectedEmployeesIds(()=>(
        selectedService.employees.map(employee => employee.id)
      ));
    }
  };

  const onSubmitEmployeeFormClick = () => {
    if (selectedEmployeesIds.length === 0) {
      alert(`Bitte wählen Sie mindestens einen Mitarbeiter aus.`);
    } else {
      setFormStep(FORM_STEPS.CALENDAR);
    }
  };

  const onChangeEmployeeFormClick = () => {   
    setFormStep(FORM_STEPS.EMPLOYEES);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: `background.white`,
        }
      }}
    >
      <AppBar
        sx={{
          position: `relative`,
          backgroundColor: `transparent`,
        }}
      >
        <Toolbar sx={{ justifyContent: `flex-start`}}>
          <IconButton
            edge="start"
            color="primary"
            bgcolor="background.main"
            onClick={handleClose}
            aria-label="close"
            size="large"
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: `-56px` }}>
        <CardMedia
          component="img"
          image={category.image}
          alt={category.name}
          sx={{
            width: `100%`,
            height: `250px`,
            objectFit: `cover`,
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h2" gutterBottom mb={4}>
          {category.name}
        </Typography>

        {hasServicesForm && <ServicesList 
          services={filteredServices}
          theme={theme}
          selectService={onSubmitServiceFormClick}
        />}

        {hasServiceOverview && <ServiceOverview
          service={selectedService}
          changeService={onChangeServiceFormClick}
        />}

        {hasEmployeesForm && <EmployeesForm 
          availableEmployees={selectedService.employees}
          selectedEmployeesIds={selectedEmployeesIds}
          changeEmployees={onChangeSelectedEmployeeClick}
          selectAllEmployees={onSelectAllClick}
          onNextStepClick={onSubmitEmployeeFormClick}
        />}

        {hasEmployeesOverview && <EmployeesOverview
          selectedEmployees={selectedEmployees}
          hasOnlyOneEmployee={selectedService?.employees.length === 1}
          changeEmployees={onChangeEmployeeFormClick}
        />}

        {/* {hasCalendarForm && <MonthCalendar 
          service={selectedService}
          employees={selectedEmployeeIds}
          setSelectedDay={setSelectedDay}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={onSelectTimeSlotClick}
        />} */}

      </Box>
    </Dialog>
  );
}
