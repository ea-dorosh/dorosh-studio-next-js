"use client";

import {
  Box,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { 
  useState, 
  useMemo, 
  useRef, 
  useEffect,
} from "react";
import CalendarForm from "@/components/BookingForm/Calendar/CalendarForm";
import CalendarOverview from "@/components/BookingForm/Calendar/CalendarOverview";
import Confirmation from "@/components/BookingForm/Confirmation/Confirmation";
import CustomerForm from "@/components/BookingForm/CustomerForm/CustomerForm";
import EmployeesForm from "@/components/BookingForm/Employees/EmployeesForm";
import EmployeesOverview from "@/components/BookingForm/Employees/EmployeesOverview";
import FORM_STEPS from "@/components/BookingForm/formSteps";
import ServiceOverview from "@/components/BookingForm/Services/ServiceOverview";
import ServicesList from "@/components/BookingForm/Services/ServicesList";
import appointmentsService from "@/services/appointments.service";

export default function BookingFormContainer({ 
  category, 
  services,
  closeModal,
}) {
  const theme = useTheme();
  const calendarFormRef = useRef(null);
  const customerFormRef = useRef(null);
  const cardMediaRef = useRef(null);

  /** state */
  const [formStep, setFormStep] = useState(FORM_STEPS.SERVICES);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEmployeesIds, setSelectedEmployeesIds] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [createAppointmentErrors, setCreateAppointmentErrors] = useState(null);
  const [selectedEmployeeFromTimeSlotAvailability, setSelectedEmployeeFromTimeSlotAvailability] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [appointmentConfirmation, setAppointmentConfirmation] = useState(null);

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

  const hasCustomerForm = useMemo(() => formStep === FORM_STEPS.CUSTOMER_FORM && formStep < FORM_STEPS.FINISH, [formStep]);

  const hasConfirmationMessage = useMemo(() => formStep === FORM_STEPS.FINISH, [formStep]);

  /** watchers */
  useEffect(() => {
    if (hasCalendarForm) {
      if (calendarFormRef.current) {
        calendarFormRef.current.style.scrollMargin = `350px`;
      }

      calendarFormRef.current?.scrollIntoView({ 
        behavior: "smooth", 
      });
    } else if (hasCustomerForm) {
      customerFormRef.current?.scrollIntoView({ 
        behavior: "smooth", 
      });
    }
  } ,[hasCalendarForm, hasCustomerForm]);

  useEffect(() => {
    if (selectedDay) {
      setSelectedTimeSlot(null);
    }
  } ,[selectedDay]);


  /** methods */
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
    setSelectedDay(null);
    setSelectedEmployeesIds([]);
    setSelectedEmployeeFromTimeSlotAvailability(null);

    cardMediaRef.current?.scrollIntoView({ 
      behavior: "smooth", 
    });

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
    setSelectedDay(null);
  };

  const onSelectTimeSlotClick = (slot) => {   
    setSelectedTimeSlot(slot);
    setSelectedEmployeeFromTimeSlotAvailability(slot.employeeId[0]);

    // if (slot.employeeId.length > 1) {
    //   setFormStep(FORM_STEPS.EMPLOYEES_FOR_CURRENT_SLOT);
    // } else {
    // setSelectedEmployeeFromTimeSlotAvailability(slot.employeeId[0]);
    // setFormStep(FORM_STEPS.CUSTOMER_FORM);
    // }
  }

  const onSubmitCalendarFormClick = () => {
    if (!selectedDay || !selectedTimeSlot) {
      alert(`Bitte wählen Sie ein Datum und eine Uhrzeit aus.`);
    } else {
      setSelectedEmployeesIds([selectedEmployeeFromTimeSlotAvailability]);
      setFormStep(FORM_STEPS.CUSTOMER_FORM);
    }
  };

  const onSubmitCustomerFormClick = async (formData) => {
    const appointmentData = {
      ...formData,
      date: selectedDay.day,
      time: selectedTimeSlot.startTime,
      serviceId: selectedService.id,
      serviceDuration: selectedService.duration,
      employeeId: selectedEmployeeFromTimeSlotAvailability,
    };

    try {      
      const data = await appointmentsService.createAppointment(appointmentData);
      setAppointmentConfirmation(data.data);
      // reset form after successful submission
      setFormStep(FORM_STEPS.FINISH);
      // setSelectedService(null);
      // setSelectedEmployeeIds([]);
      // setSelectedDay(null);
      // setSelectedTimeSlot(null);
      // setCreateAppointmentErrors(null);
      // setSelectedEmployeeFromTimeSlotAvailability(null);
    } catch (error) {
      const parsedErrors = await JSON.parse(error.message);

      if (typeof parsedErrors === `string`) {
        setGeneralError(parsedErrors);
      } else {
        setCreateAppointmentErrors(parsedErrors);
      }
    }
  }

  return (<>
    {!hasConfirmationMessage && <><span ref={cardMediaRef}></span>
      <Box sx={{ 
        mt: `-56px`,
        position: `sticky`,
        top: 0,
      }}>
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
      </Box></>}

    <Box sx={{ 
      p: 2,
      backgroundColor: theme.palette.background.white,
      zIndex: 1,
    }}>
      {!hasConfirmationMessage && <Typography 
        variant="h2" 
        gutterBottom mb={4}
      >
        {category.name}
      </Typography>}

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

      {hasCalendarForm && (
        <div ref={calendarFormRef} style={{minHeight:`4000px`}}>
          <CalendarForm
            service={selectedService}
            employees={selectedEmployeesIds}
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={onSelectTimeSlotClick}
            theme={theme}
            onNextStepClick={onSubmitCalendarFormClick}
          />
        </div>
      )}

      {hasCalendarOverview && <CalendarOverview
        date={selectedDay?.day}
        time={selectedTimeSlot?.startTime}
        changeDate={()=> setFormStep(FORM_STEPS.CALENDAR)}
      />}

      {hasCustomerForm && <div ref={customerFormRef}>
        <CustomerForm
          createAppointment={onSubmitCustomerFormClick}
          formErrors={createAppointmentErrors}
        />
      </div>}

      {hasConfirmationMessage && <Confirmation 
        appointment={appointmentConfirmation}
        closeConfirmation={closeModal}
      />}

      {generalError && 
        <Typography
          variant="subtitle1"
          mt={2}
          color={`error`}
        >
          {generalError}
        </Typography>
      }
    </Box>
  </>
  );
}
