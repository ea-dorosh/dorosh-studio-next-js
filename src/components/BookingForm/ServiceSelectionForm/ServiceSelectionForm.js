import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import CategoryForm from '@/components/BookingForm/CategoryForm/CategoryForm';
import ServicesList from '@/components/BookingForm/ServicesList/ServicesList';
import SubCategoryForm from '@/components/BookingForm/SubCategoryForm/SubCategoryForm';
import { formatTimeToString } from '@/utils/formatters';

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
      const subCategory = category?.subCategories?.find(subCategory => subCategory.subCategoryId === serviceData?.subCategoryId);

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

  // Expose imperative API to parent to control accordion state
  useImperativeHandle(ref, () => ({
    collapseAll: () => setExpandedPanel(null),
    openCategory: () => setExpandedPanel(`category`),
    openService: () => setExpandedPanel(`service`),
  }), []);

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const onCategorySelect = (category) => {
    // If user re-selects the same category and a service is already chosen,
    // just close the accordion without changing state
    if (selectedCategory?.categoryId === category.categoryId && serviceData) {
      setExpandedPanel(null);
      return;
    }

    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setExpandedPanel(category?.hasSubCategories === false ? `service` : `subCategory`);
  };

  const onSubCategorySelect = (subCategory) => {
    // If user re-selects the same subcategory and a service is already chosen,
    // just close the accordion without changing state
    if (selectedSubCategory?.subCategoryId === subCategory.subCategoryId && serviceData) {
      setExpandedPanel(null);
      return;
    }

    setSelectedSubCategory(subCategory);
    setExpandedPanel(`service`);
  };

  const onServiceSelectInternal = (service) => {
    // First propagate selection to parent, then close the accordion in next tick
    onServiceSelect(service);
    setTimeout(() => setExpandedPanel(null), 0);
  };

  return (
    <Card
      ref={ref}
      sx={{
        boxShadow: `none`,
        overflow: `hidden`,
        borderRadius: `20px`,
        padding: `6px`,
        backgroundColor: `background.alternate`,
      }}
    >
      <CardContent sx={{
        p: 0,

        '&:last-child': { p: 0 },
      }}>

        {hasDeleteButton && (
          <Box sx={{
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
            gap: 1,
            width: `100%`,
            padding: `0 16px`,
            borderBottom: `1px solid`,
            borderColor: `grey.300`,
          }}>
            <Typography color="success.main" fontWeight={600}>{firstService ? `Service 1` : `Service 2`}</Typography>

            <Button size='small' color="error" onClick={deleteService} sx={{
              p:0,
              fontWeight: `bold`,
            }}>löschen</Button>
          </Box>
        )}
        <Accordion
          disableGutters
          expanded={!selectedCategory ? true : expandedPanel === `category`}
          onChange={handlePanelChange(`category`)}
          sx={{
            backgroundColor: `transparent`,
            boxShadow: `none`,
          }}
        >
          <AccordionSummary expandIcon={selectedCategory && <ExpandMoreIcon />}
            sx={{
              '& .MuiAccordionSummary-content': {
                display: `flex`,
                justifyContent: `space-between`,
                alignItems: `center`,
              },
              px: 2,
              py: 1,
              borderRadius: `12px`,
            }}>
            <Box sx={{
              width: `100%`,
              pr: 3,
            }}>
              <Typography sx={{
                fontWeight: 600,
                letterSpacing: `.01em`,
              }}>
                {!selectedCategory ? `Kategorie wählen` : selectedCategory.categoryName}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              px: 2,
              pb: 2,
            }}
          >
            <CategoryForm
              categories={categories}
              onCategorySelect={onCategorySelect}
              selectedCategory={selectedCategory}
            />
          </AccordionDetails>
        </Accordion>
        {/* )} */}

        {/* SubCategory Selection - Collapsible */}
        {selectedCategory && selectedCategory.hasSubCategories !== false && (
          <Accordion
            disableGutters
            expanded={!selectedSubCategory ? true : expandedPanel === `subCategory`}
            onChange={handlePanelChange(`subCategory`)}
            sx={{
              backgroundColor: `transparent`,
              boxShadow: `none`,
            }}
          >
            <AccordionSummary
              expandIcon={selectedSubCategory && <ExpandMoreIcon />}
              sx={{
                px: 2,
                py: 1,
                borderRadius: `12px`,
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {selectedSubCategory
                  ? selectedSubCategory.subCategoryName
                  : `Unterkategorie wählen`
                }
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: 2,
                pb: 2,
              }}
            >
              <SubCategoryForm
                subCategories={selectedCategory.subCategories}
                onSubCategorySelect={onSubCategorySelect}
                selectedSubCategory={selectedSubCategory}
              />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Service Selection - Collapsible */}
        {(selectedCategory && selectedCategory.hasSubCategories === false) || selectedSubCategory ? (
          <Accordion
            disableGutters
            expanded={expandedPanel === `service`}
            onChange={handlePanelChange(`service`)}
            sx={{
              backgroundColor: `transparent`,
              boxShadow: `none`,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                px: 2,
                py: 1,
                borderRadius: `12px`,
              }}
            >
              {!serviceData || expandedPanel === `service` ?
                <Typography sx={{
                  fontWeight: 600, letterSpacing: `.01em`,
                }}>Service wählen</Typography>
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
                    <Typography sx={{
                      fontWeight: 700, letterSpacing: `.01em`,
                    }}>{serviceData.name}</Typography>

                    <Box sx={{
                      display: `flex`,
                      gap: 1,
                      flexWrap: `wrap`,
                    }}>
                      <Chip
                        label={<>Dauer: <b>{formatTimeToString(serviceData?.durationTime)}</b></>}
                        size="small"
                        variant="filled"
                        sx={{
                          borderRadius: `9999px`,
                        }}
                      />

                      {serviceData?.employees && serviceData?.employees?.length > 0 && (
                        <Chip
                          label={<>Preis: <b>{serviceData?.employees[0]?.price || 0}€</b></>}
                          size="small"
                          variant="filled"
                          sx={{ borderRadius: `9999px` }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              }
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: 2,
                pb: 2,
              }}
            >
              <ServicesList
                services={getAvailableServices(selectedCategory?.hasSubCategories === false ? selectedCategory.services : selectedSubCategory.services)}
                onServiceSelect={onServiceSelectInternal}
                selectedServicesIds={selectedServicesIds}
                selectedServiceId={serviceData?.id}
              />
            </AccordionDetails>
          </Accordion>
        ) : null}
      </CardContent>
    </Card>
  );
});

export default ServiceSelectionForm;
