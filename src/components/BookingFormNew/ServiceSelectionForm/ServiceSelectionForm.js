import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Box,
  Chip,
} from "@mui/material";
import { useState } from "react";
import CategoryForm from "../Categories/CategoryForm";
import ServicesList from "../Services/ServicesList";
import SubCategoryForm from "../SubCategories/SubCategoryForm";
import { formatTimeToString } from "@/utils/formatters";

export default function ServiceSelectionForm({
  categories,
  onServiceSelect,
  getAvailableServices,
  selectedServiceId,
  selectedCategoryId,
  selectedSubCategoryId,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryId ? categories.find(category => category.categoryId === selectedCategoryId) : null
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    selectedSubCategoryId ? selectedCategory?.subCategories.find(subCategory => subCategory.subCategoryId === selectedSubCategoryId) : null
  );
  const [selectedService, setSelectedService] = useState(null);
  const [expandedPanel, setExpandedPanel] = useState(selectedServiceId ? 'service' : null);

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
    setSelectedService(service);
    onServiceSelect(service);
  };

  return (
    <Card
      sx={{
        mb: 3,
        boxShadow: `none`,
        overflow: `unset`,
        border: `1px solid`,
        borderColor: `grey.300`,
        borderRadius: `12px`,
        p: 2,
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
          sx={{
            boxShadow: `none`,
            // boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
            borderRadius: `0`,
            backgroundColor: `background.default`,
            borderBottom: `1px solid`,

            '&:before': {
              display: 'none',
            },

            '&:first-of-type': {
              borderRadius: `0`,
            },

            '&:last-of-type': {
              borderRadius: `0`,
            },
          }}
        >
          <AccordionSummary
            expandIcon={selectedCategory && <ExpandMoreIcon />}
            sx={{
              '& .MuiAccordionSummary-content': {
                margin: `14px 0`,
              },

              '&.Mui-expanded': {
                minHeight: `48px`,
              },

              '& .Mui-expanded': {
                margin: `14px 0`,
              },
            }}
          >
            <Typography sx={{ fontWeight: `bold` }}>
              {!selectedCategory ? `Kategorie wählen` : selectedCategory.categoryName}
            </Typography>
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
            sx={{
              boxShadow: `none`,
              // boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
              borderRadius: `0`,
              backgroundColor: `background.default`,
              borderBottom: `1px solid`,

              '&:before': {
                display: 'none',
              },

              '&:first-of-type': {
                borderRadius: `0`,
              },

              '&:last-of-type': {
                borderRadius: `0`,
              },
            }}
          >
            <AccordionSummary expandIcon={selectedSubCategory &&<ExpandMoreIcon />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  margin: `14px 0`,
                },

                '&.Mui-expanded': {
                  minHeight: `48px`,
                },

                '& .Mui-expanded': {
                  margin: `14px 0`,
                },
              }}
            >
              <Typography sx={{ fontWeight: `bold` }}>
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
            sx={{
              boxShadow: `none`,
              // boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
              borderRadius: `0`,
              backgroundColor: `background.default`,
              // borderBottom: `1px solid`,

              '&:before': {
                display: 'none',
              },

              '&:first-of-type': {
                borderRadius: `0`,
              },

              '&:last-of-type': {
                borderRadius: `0`,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  margin: `14px 0`,
                },

                '&.Mui-expanded': {
                  minHeight: `48px`,
                },

                '& .Mui-expanded': {
                  margin: `14px 0`,
                },
              }}
            >
              {!selectedService || expandedPanel === 'service' ?
                <Typography sx={{ fontWeight: `bold` }}>Service wählen</Typography>
                :
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: `bold` }}>{selectedService.name}</Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={<>Dauer: <b>{formatTimeToString(selectedService.durationTime)}</b></>}
                      size="small"
                      variant="outlined"
                    />

                    {selectedService.employees && selectedService.employees.length > 0 && (
                      <Chip
                        label={<>Preis: <b>{selectedService.employees[0].price || 0}€</b></>}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Box>
              }
            </AccordionSummary>

            <AccordionDetails>
              <ServicesList
                services={getAvailableServices(selectedSubCategory.services)}
                onServiceSelect={onServiceSelectInternal}
                selectedServiceId={selectedServiceId}
              />
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
