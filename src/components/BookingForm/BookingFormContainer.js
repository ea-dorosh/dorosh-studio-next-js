"use client";

import {
  Box,
  // CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
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
import companyService from "@/services/company.service";

export default function BookingFormContainer({
  service,
}) {
  const theme = useTheme();
  const calendarFormRef = useRef(null);
  const customerFormRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const cardMediaRef = useRef(null);

  /** state */
  const [company, setCompany] = useState(null);
  const [formStep, setFormStep] = useState(service.employees.length === 1 ? FORM_STEPS.CALENDAR : FORM_STEPS.EMPLOYEES);
  const [selectedService, setSelectedService] = useState(service);
  const [selectedEmployeesIds, setSelectedEmployeesIds] = useState(service.employees.length === 1 ? [service.employees[0].id] : []);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [createAppointmentErrors, setCreateAppointmentErrors] = useState(null);
  const [selectedEmployeeFromTimeSlotAvailability, setSelectedEmployeeFromTimeSlotAvailability] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [appointmentConfirmation, setAppointmentConfirmation] = useState(null);

  /** computed */
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

  /** mounted */
  useEffect(() => {
    const fetchCompany = async () => {
      const company = await companyService.getCompany();
      setCompany(company);
    };

    fetchCompany();
  }, []);

  /** watchers */
  useEffect(() => {
    if (hasCalendarForm) {
      if (calendarFormRef.current) {
        // calendarFormRef.current.style.scrollMargin = `350px`;
      }

      // calendarFormRef.current?.scrollIntoView({
      //   behavior: "smooth",
      // });
    } else if (hasCustomerForm) {
      // customerFormRef.current?.scrollIntoView({
      //   behavior: "smooth",
      // });
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

    // cardMediaRef.current?.scrollIntoView({
    //   behavior: "smooth",
    // });

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
      const {validationErrors, errorMessage, data} = await appointmentsService.createAppointment(appointmentData);

      if (validationErrors) {
        setCreateAppointmentErrors(validationErrors);
      } else if (errorMessage) {
        setGeneralError(errorMessage);
      } else if (data) {
        setAppointmentConfirmation(data);
        setFormStep(FORM_STEPS.FINISH);
      }
    } catch (error) {
      setGeneralError(`Beim Erstellen des Datensatzes ist ein Fehler aufgetreten, bitte versuchen Sie es erneut oder versuchen Sie es später noch einmal.`);
    }
  }

  return (<>
    {/* {!hasConfirmationMessage && <><span ref={cardMediaRef}></span>
      <Box sx={{
        mt: `-56px`,
        position: `sticky`,
        top: 0,
      }}>
        <CardMedia
          component="img"
          image={subCategory.subCategoryImage}
          alt={subCategory.subCategoryName}
          sx={{
            width: `100%`,
            height: `250px`,
            objectFit: `cover`,
          }}
        />
      </Box></>} */}

    <Box sx={{
      p: 2,
      backgroundColor: theme.palette.background.default,
      zIndex: 1,
    }}>
      {/* {!hasConfirmationMessage && <Typography
        variant="h2"
        gutterBottom mb={4}
      >
        {subCategory.subCategoryName}
      </Typography>} */}

      {hasServicesForm && <ServicesList
        services={[service]}
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
        company={company}
      />}

      {generalError &&
        <Dialog
          open={Boolean(generalError)}
          onClose={() => setGeneralError(null)}
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <DialogContent>
            <Typography
              variant="h6"
              mt={2}
              color={`error`}
            >
              Fehler
            </Typography>

            <Typography
              variant="subtitle1"
              mt={2}
              sx={{
                fontSize: `1rem`,
              }}
            >
              {generalError}
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setGeneralError(null)}
              autoFocus
              variant="contained"
              size="small"
            >
              Akzeptieren
            </Button>
          </DialogActions>
        </Dialog>
      }
    </Box>
  </>
  );
}
