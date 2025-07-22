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
import AddMoreServicesQuestion from "@/components/BookingForm/AddMoreServices/AddMoreServicesQuestion";
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
  const [selectedServices, setSelectedServices] = useState([]); // массив выбранных сервисов
  const [additionalServiceCategory, setAdditionalServiceCategory] = useState(null);
  const [additionalServiceSubCategory, setAdditionalServiceSubCategory] = useState(null);
  const [hasAnsweredAddMoreServices, setHasAnsweredAddMoreServices] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [createAppointmentErrors, setCreateAppointmentErrors] = useState(null);
  const [selectedEmployeeFromTimeSlotAvailability, setSelectedEmployeeFromTimeSlotAvailability] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [appointmentConfirmation, setAppointmentConfirmation] = useState(null);

  // Collapsible state for main panels
  const [expandedMainPanel, setExpandedMainPanel] = useState('service1');
  // Nested panels within each service
  const [expandedServicePanels, setExpandedServicePanels] = useState({
    service1: 'category',
    service2: null,
  });

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
  const handleMainPanelChange = (panel) => (event, isExpanded) => {
    setExpandedMainPanel(isExpanded ? panel : null);
  };

  const handleServicePanelChange = (serviceKey, panel) => (event, isExpanded) => {
    setExpandedServicePanels(prev => ({
      ...prev,
      [serviceKey]: isExpanded ? panel : null,
    }));
  };

  const onSubmitCategoryFormClick = (category) => {
    setSelectedCategory(category);
    setExpandedServicePanels(prev => ({
      ...prev,
      service1: 'subCategory',
    }));
  }

  const onSubmitSubCategoryFormClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setExpandedServicePanels(prev => ({
      ...prev,
      service1: 'service',
    }));
  }

  const onSubmitServiceFormClick = (service) => {
    setSelectedService(service);
    setSelectedServices(prev => [...prev, service]);
    setFormStep(FORM_STEPS.ADD_MORE_SERVICES);
  }

  // Методы для работы с выбором мастеров (теперь в CalendarForm)
  const onChangeSelectedEmployeeClick = (employeeIds) => {
    // Сохраняем выбранных сотрудников для использования в API
    // Этот callback вызывается из CalendarForm когда меняется выбор сотрудников
    console.log('Selected employees changed:', employeeIds);
  };

  // Обработчики для вопроса о добавлении еще одного сервиса
  const onAddMoreServicesYes = () => {
    // Добавляем еще один сервис - показываем новую панель
    setHasAnsweredAddMoreServices(true);
    setAdditionalServiceCategory(null);
    setAdditionalServiceSubCategory(null);
    setExpandedMainPanel('service2');
    setExpandedServicePanels(prev => ({
      ...prev,
      service2: 'category',
    }));
  };

  const onAddMoreServicesNo = () => {
    // Переходим к календарю
    setHasAnsweredAddMoreServices(true);
    setExpandedMainPanel('calendar');
  };

  // Обработчики для дополнительных сервисов
  const onSubmitAdditionalCategoryFormClick = (category) => {
    setAdditionalServiceCategory(category);
    setExpandedServicePanels(prev => ({
      ...prev,
      service2: 'subCategory',
    }));
  };

  const onSubmitAdditionalSubCategoryFormClick = (subCategory) => {
    setAdditionalServiceSubCategory(subCategory);
    setExpandedServicePanels(prev => ({
      ...prev,
      service2: 'service',
    }));
  };

  const onSubmitAdditionalServiceFormClick = (service) => {
    setSelectedServices(prev => [...prev, service]);
    setAdditionalServiceCategory(null);
    setAdditionalServiceSubCategory(null);
    setHasAnsweredAddMoreServices(false); // Сброс для возможности добавления еще сервисов
    // После выбора дополнительного сервиса снова показываем вопрос
    setFormStep(FORM_STEPS.ADD_MORE_SERVICES);
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
      services: selectedServices.map(service => ({
        serviceId: service.id,
        serviceDuration: service.durationTime,
      })),
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

  // Фильтруем уже выбранные сервисы
  const getAvailableServices = (services) => {
    const selectedServiceIds = selectedServices.map(s => s.id);
    return services.filter(service => !selectedServiceIds.includes(service.id));
  };



  return (<>
    <Box sx={{
      p: 2,
      backgroundColor: theme.palette.background.default,
      zIndex: 1,
    }}>
      {!hasConfirmationMessage && (
        <>
          {/* Service 1 Panel */}
          <Accordion
            expanded={expandedMainPanel === 'service1'}
            onChange={handleMainPanelChange('service1')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                {selectedService ? `Service 1: ${selectedService.name}` : 'Service 1 wählen'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Category Selection within Service 1 */}
              <Accordion
                expanded={expandedServicePanels.service1 === 'category'}
                onChange={handleServicePanelChange('service1', 'category')}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{getCategoryTitle()}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CategoryForm
                    categories={categories}
                    onCategorySelect={onSubmitCategoryFormClick}
                  />
                </AccordionDetails>
              </Accordion>

              {/* SubCategory Selection within Service 1 */}
              {selectedCategory && (
                <Accordion
                  expanded={expandedServicePanels.service1 === 'subCategory'}
                  onChange={handleServicePanelChange('service1', 'subCategory')}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{getSubCategoryTitle()}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <SubCategoryForm
                      subCategories={selectedCategory.subCategories}
                      onSubCategorySelect={onSubmitSubCategoryFormClick}
                    />
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Service Selection within Service 1 */}
              {selectedSubCategory && (
                <Accordion
                  expanded={expandedServicePanels.service1 === 'service'}
                  onChange={handleServicePanelChange('service1', 'service')}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{getServiceTitle()}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ServicesList
                      services={getAvailableServices(selectedSubCategory.services)}
                      theme={theme}
                      selectService={onSubmitServiceFormClick}
                    />
                  </AccordionDetails>
                </Accordion>
              )}
            </AccordionDetails>
          </Accordion>



          {/* Add More Services Question */}
          {formStep === FORM_STEPS.ADD_MORE_SERVICES && !hasAnsweredAddMoreServices && (
            <Box sx={{ mb: 2 }}>
              <AddMoreServicesQuestion
                onYes={onAddMoreServicesYes}
                onNo={onAddMoreServicesNo}
              />
            </Box>
          )}

          {/* Service 2 Panel */}
          {expandedMainPanel === 'service2' && (
            <Accordion
              expanded={expandedMainPanel === 'service2'}
              onChange={handleMainPanelChange('service2')}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  {selectedServices.length > 1 ? `Service 2: ${selectedServices[1].name}` : 'Service 2 wählen'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Category Selection within Service 2 */}
                <Accordion
                  expanded={expandedServicePanels.service2 === 'category'}
                  onChange={handleServicePanelChange('service2', 'category')}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Kategorie wählen</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CategoryForm
                      categories={categories}
                      onCategorySelect={onSubmitAdditionalCategoryFormClick}
                    />
                  </AccordionDetails>
                </Accordion>

                {/* SubCategory Selection within Service 2 */}
                {additionalServiceCategory && (
                  <Accordion
                    expanded={expandedServicePanels.service2 === 'subCategory'}
                    onChange={handleServicePanelChange('service2', 'subCategory')}
                    sx={{ mb: 1 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">Unterkategorie wählen</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <SubCategoryForm
                        subCategories={additionalServiceCategory.subCategories}
                        onSubCategorySelect={onSubmitAdditionalSubCategoryFormClick}
                      />
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Service Selection within Service 2 */}
                {additionalServiceSubCategory && (
                  <Accordion
                    expanded={expandedServicePanels.service2 === 'service'}
                    onChange={handleServicePanelChange('service2', 'service')}
                    sx={{ mb: 1 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">Service wählen</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ServicesList
                        services={getAvailableServices(additionalServiceSubCategory.services)}
                        theme={theme}
                        selectService={onSubmitAdditionalServiceFormClick}
                      />
                    </AccordionDetails>
                  </Accordion>
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {/* Calendar Selection */}
          {selectedServices.length > 0 && expandedMainPanel === 'calendar' && (
            <Accordion
              expanded={expandedMainPanel === 'calendar'}
              onChange={handleMainPanelChange('calendar')}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  {selectedDay && selectedTimeSlot
                    ? `${selectedDay.day} ${selectedTimeSlot.startTime} - Ausgewählt`
                    : `Datum und Zeit wählen (${selectedServices.length} Service${selectedServices.length > 1 ? 's' : ''})`
                  }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CalendarForm
                  services={selectedServices}
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
