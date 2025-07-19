"use client";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useTheme } from "@mui/material";
import {
  useState,
  useMemo,
  useEffect,
} from "react";
import CalendarForm from "@/components/BookingForm/Calendar/CalendarForm";
import CategoryForm from "@/components/BookingForm/Categories/CategoryForm";
import Confirmation from "@/components/BookingForm/Confirmation/Confirmation";
import CustomerForm from "@/components/BookingForm/CustomerForm/CustomerForm";
import FORM_STEPS from "@/components/BookingForm/formSteps";
import ServicesList from "@/components/BookingForm/Services/ServicesList";
import SubCategoryForm from "@/components/BookingForm/SubCategories/SubCategoryForm";
import appointmentsService from "@/services/appointments.service";
import companyService from "@/services/company.service";

export default function BookingFormContainer({
  categories,
}) {
  const theme = useTheme();
  console.log(`categories: `, JSON.stringify(categories, null, 4));

  /** state */
  const [company, setCompany] = useState(null);
  const [formStep, setFormStep] = useState(FORM_STEPS.CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [createAppointmentErrors, setCreateAppointmentErrors] = useState(null);
  const [selectedEmployeeFromTimeSlotAvailability, setSelectedEmployeeFromTimeSlotAvailability] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [appointmentConfirmation, setAppointmentConfirmation] = useState(null);

  // Collapsible state - only one panel can be open at a time
  const [expandedPanel, setExpandedPanel] = useState('category');

  /** computed */
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
    if (selectedDay) {
      setSelectedTimeSlot(null);
    }
  } ,[selectedDay]);

  /** methods */
  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const onSubmitCategoryFormClick = (category) => {
    setSelectedCategory(category);
    setExpandedPanel('subCategory');
  }

  const onSubmitSubCategoryFormClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setExpandedPanel('service');
  }

  const onSubmitServiceFormClick = (service) => {
    setSelectedService(service);
    setExpandedPanel('calendar');
  }

  // Методы для работы с выбором мастеров (теперь в CalendarForm)
  const onChangeSelectedEmployeeClick = (employeeIds) => {
    // Сохраняем выбранных сотрудников для использования в API
    // Этот callback вызывается из CalendarForm когда меняется выбор сотрудников
    console.log('Selected employees changed:', employeeIds);
  };

  const onSelectTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
    setSelectedEmployeeFromTimeSlotAvailability(slot.employeeId[0]);
  }

  const onSubmitCalendarFormClick = () => {
    if (!selectedDay || !selectedTimeSlot) {
      alert(`Bitte wählen Sie ein Datum und eine Uhrzeit aus.`);
    } else {
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

  const getCategoryTitle = () => {
    if (selectedCategory) {
      return `${selectedCategory.categoryName} - Ausgewählt`;
    }
    return `Kategorie wählen`;
  };

  const getSubCategoryTitle = () => {
    if (selectedSubCategory) {
      return `${selectedSubCategory.subCategoryName} - Ausgewählt`;
    }
    return `Unterkategorie wählen`;
  };

  const getServiceTitle = () => {
    if (selectedService) {
      return `${selectedService.name} - Ausgewählt`;
    }
    return `Service wählen`;
  };



  return (<>
    <Box sx={{
      p: 2,
      backgroundColor: theme.palette.background.default,
      zIndex: 1,
    }}>
      {!hasConfirmationMessage && (
        <>
          {/* Category Selection */}
          <Accordion
            expanded={expandedPanel === 'category'}
            onChange={handlePanelChange('category')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{getCategoryTitle()}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CategoryForm
                categories={categories}
                onCategorySelect={onSubmitCategoryFormClick}
              />
            </AccordionDetails>
          </Accordion>

          {/* SubCategory Selection */}
          {selectedCategory && (
            <Accordion
              expanded={expandedPanel === 'subCategory'}
              onChange={handlePanelChange('subCategory')}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{getSubCategoryTitle()}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SubCategoryForm
                  subCategories={selectedCategory.subCategories}
                  onSubCategorySelect={onSubmitSubCategoryFormClick}
                />
              </AccordionDetails>
            </Accordion>
          )}

          {/* Service Selection */}
          {selectedSubCategory && (
            <Accordion
              expanded={expandedPanel === 'service'}
              onChange={handlePanelChange('service')}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{getServiceTitle()}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ServicesList
                  services={selectedSubCategory.services}
                  theme={theme}
                  selectService={onSubmitServiceFormClick}
                />
              </AccordionDetails>
            </Accordion>
          )}



          {/* Calendar Selection */}
          {selectedService && (
            <Accordion
              expanded={expandedPanel === 'calendar'}
              onChange={handlePanelChange('calendar')}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  {selectedDay && selectedTimeSlot
                    ? `${selectedDay.day} ${selectedTimeSlot.startTime} - Ausgewählt`
                    : `Datum und Zeit wählen`
                  }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CalendarForm
                  service={selectedService}
                  availableEmployees={selectedService.employees}
                  onEmployeesChange={onChangeSelectedEmployeeClick}
                  setSelectedDay={setSelectedDay}
                  selectedDay={selectedDay}
                  selectedTimeSlot={selectedTimeSlot}
                  setSelectedTimeSlot={onSelectTimeSlotClick}
                  theme={theme}
                  onNextStepClick={onSubmitCalendarFormClick}
                />
              </AccordionDetails>
            </Accordion>
          )}
        </>
      )}

      {formStep === FORM_STEPS.CUSTOMER_FORM && <div>
        <CustomerForm
          createAppointment={onSubmitCustomerFormClick}
          formErrors={createAppointmentErrors}
        />
      </div>}

      {hasConfirmationMessage && <Confirmation
        appointment={appointmentConfirmation}
        closeConfirmation={() => {}}
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
