import {
  Delete as DeleteIcon,
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
  IconButton,
} from "@mui/material";
import {
  useState,
  useEffect,
} from "react";
import CategoryForm from "../Categories/CategoryForm";
import ServicesList from "../Services/ServicesList";
import SubCategoryForm from "../SubCategories/SubCategoryForm";
import { formatTimeToString } from "@/utils/formatters";

export default function ServiceSelectionForm({
  categories,
  onServiceSelect,
  getAvailableServices,
  serviceData,
  deleteService,
  hasDeleteButton,
  selectedServicesIds,
}) {
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
    setExpandedPanel('subCategory');
  };

  const onSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setExpandedPanel('service');
  };

  const onServiceSelectInternal = (service) => {
    setExpandedPanel(null);
    // setSelectedService(service);
    onServiceSelect(service);
  };

  return (
    <Card
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

        '&:last-child': {
          p: 0,
        },
      }}>
        <Accordion
          expanded={!selectedCategory ? true : expandedPanel === 'category'}
          onChange={handlePanelChange('category')}
        >
          <AccordionSummary expandIcon={selectedCategory && <ExpandMoreIcon />}
            sx={{
              '& .MuiAccordionSummary-content': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            }}>
            <Box sx={{ width: `100%`, pr: 3 }}>
              {!selectedCategory ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <Typography sx={{ fontWeight: `bold` }}>Kategorie wählen</Typography>

                  {hasDeleteButton && (
                    <Box sx={{
                      margin: `-4px 0`,
                    }}>
                      <IconButton
                        size='small'
                        color="error"
                        onClick={deleteService}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>)
                :
                <Typography sx={{ fontWeight: `bold` }}>
                  {selectedCategory.categoryName}
                </Typography>
              }
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
            expanded={!selectedSubCategory ? true : expandedPanel === 'subCategory'}
            onChange={handlePanelChange('subCategory')}
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
            expanded={expandedPanel === 'service'}
            onChange={handlePanelChange('service')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {!serviceData || expandedPanel === 'service' ?
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <Typography>Service wählen</Typography>

                  {hasDeleteButton && (
                    <Box sx={{
                      margin: `-4px 0`,
                    }}>
                      <IconButton
                        size='small'
                        color="error"
                        onClick={deleteService}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                :
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography>{serviceData.name}</Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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

                  {hasDeleteButton && (
                    <Box sx={{
                      margin: `-4px 0`,
                    }}>
                      <IconButton
                        size='small'
                        color="error"
                        onClick={deleteService}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              }
            </AccordionSummary>

            <AccordionDetails>
              <ServicesList
                services={getAvailableServices(selectedSubCategory.services)}
                onServiceSelect={onServiceSelectInternal}
                selectedServicesIds={selectedServicesIds}
              />
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
