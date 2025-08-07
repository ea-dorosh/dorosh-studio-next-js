import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
} from "@mui/material";
import {
  useState,
  useEffect,
  forwardRef,
} from "react";
import CategoryForm from "@/components/BookingForm/CategoryForm/CategoryForm";
import ServicesList from "@/components/BookingForm/ServicesList/ServicesList";
import SubCategoryForm from "@/components/BookingForm/SubCategoryForm/SubCategoryForm";
import { formatTimeToString } from "@/utils/formatters";

const ServiceSelectionForm = forwardRef(function ServiceSelectionForm({
  categories,
  onServiceSelect,
  getAvailableServices,
  serviceData,
  deleteService,
  hasDeleteButton,
  selectedServicesIds,
  firstService,
}, ref) {
  useEffect(() => {
    if (serviceData) {
      const category = categories.find(category => category.categoryId === serviceData?.categoryId);
      const subCategory = category?.subCategories.find(subCategory => subCategory.subCategoryId === serviceData?.subCategoryId);

      setSelectedCategory(category || null);
      setSelectedSubCategory(subCategory || null);
    } else {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceData]);

  const [selectedCategory, setSelectedCategory] = useState(
    serviceData ? categories.find(category => category.categoryId === serviceData?.categoryId) : null
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    selectedCategory ? selectedCategory?.subCategories.find(subCategory => subCategory.subCategoryId === serviceData?.subCategoryId) : null
  );

  const [expandedPanel, setExpandedPanel] = useState(null);

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const onCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setExpandedPanel(`subCategory`);
  };

  const onSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setExpandedPanel(`service`);
  };

  const onServiceSelectInternal = (service) => {
    setExpandedPanel(null);
    // setSelectedService(service);
    onServiceSelect(service);
  };

  return (
    <Card
      ref={ref}
      sx={{
        boxShadow: `none`,
        overflow: `unset`,
        border: `1px solid`,
        borderColor: `grey.300`,
        borderRadius: `12px`,
        padding: `4px`,
        backgroundColor: `background.default`,
      }}
    >
      <CardContent sx={{
        p: 0,

        '&:last-child': {p: 0},
      }}>

        {hasDeleteButton && (
          <Box sx={{
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
            gap: 1,
            width: `100%`,
            padding: `4px 16px`,
            borderBottom: `1px solid`,
            borderColor: `grey.300`,
          }}>
            <Typography>{firstService ? `Service 1` : `Service 2`}</Typography>

            <Button size='small' color="error" onClick={deleteService} sx={{
              p:0,
              fontWeight: `bold`,
            }}>löschen</Button>
          </Box>
        )}
        <Accordion
          expanded={!selectedCategory ? true : expandedPanel === `category`}
          onChange={handlePanelChange(`category`)}
        >
          <AccordionSummary expandIcon={selectedCategory && <ExpandMoreIcon />}
            sx={{
              '& .MuiAccordionSummary-content': {
                display: `flex`,
                justifyContent: `space-between`,
                alignItems: `center`,
              },
            }}>
            <Box sx={{
              width: `100%`,
              pr: 3, 
            }}>
              <Typography sx={{ fontWeight: `bold` }}>
                {!selectedCategory ? `Kategorie wählen` : selectedCategory.categoryName}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <CategoryForm
              categories={categories}
              onCategorySelect={onCategorySelect}
              selectedCategory={selectedCategory}
            />
          </AccordionDetails>
        </Accordion>
        {/* )} */}

        {/* SubCategory Selection - Collapsible */}
        {selectedCategory && (
          <Accordion
            expanded={!selectedSubCategory ? true : expandedPanel === `subCategory`}
            onChange={handlePanelChange(`subCategory`)}
          >
            <AccordionSummary expandIcon={selectedSubCategory &&<ExpandMoreIcon />}>
              <Typography>
                {selectedSubCategory
                  ? selectedSubCategory.subCategoryName
                  : `Unterkategorie wählen`
                }
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <SubCategoryForm
                subCategories={selectedCategory.subCategories}
                onSubCategorySelect={onSubCategorySelect}
                selectedSubCategory={selectedSubCategory}
              />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Service Selection - Collapsible */}
        {selectedSubCategory && (
          <Accordion
            expanded={expandedPanel === `service`}
            onChange={handlePanelChange(`service`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {!serviceData || expandedPanel === `service` ?
                <Typography>Service wählen</Typography>
                :
                <Box
                  sx={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    alignItems: `center`,
                    gap: 1,
                    width: `100%`,
                  }}
                >
                  <Box sx={{
                    display: `flex`,
                    flexDirection: `column`,
                    gap: 1, 
                  }}>
                    <Typography>{serviceData.name}</Typography>

                    <Box sx={{
                      display: `flex`,
                      gap: 1,
                      flexWrap: `wrap`, 
                    }}>
                      <Chip
                        label={<>Dauer: <b>{formatTimeToString(serviceData?.durationTime)}</b></>}
                        size="small"
                        variant="outlined"
                      />

                      {serviceData?.employees && serviceData?.employees?.length > 0 && (
                        <Chip
                          label={<>Preis: <b>{serviceData?.employees[0]?.price || 0}€</b></>}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              }
            </AccordionSummary>

            <AccordionDetails>
              <ServicesList
                services={getAvailableServices(selectedSubCategory.services)}
                onServiceSelect={onServiceSelectInternal}
                selectedServicesIds={selectedServicesIds}
                selectedServiceId={serviceData?.id}
              />
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
});

export default ServiceSelectionForm;
