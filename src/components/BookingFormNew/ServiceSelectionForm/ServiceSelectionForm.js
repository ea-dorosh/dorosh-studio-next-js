import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import CategoryForm from "../Categories/CategoryForm";
import ServicesList from "../Services/ServicesList";
import SubCategoryForm from "../SubCategories/SubCategoryForm";

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
        {/* Category Selection - Becomes collapsible after selection */}
        {/* {!selectedCategory ? (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontSize: `1.8rem`,
                fontWeight: `400`,
              }}
            >
              Kategorie wählen
            </Typography>

            <CategoryForm
              categories={categories}
              onCategorySelect={onCategorySelect}
              selectedCategory={selectedCategory}
            />
          </Box>
        ) : ( */}
        <Accordion
          expanded={!selectedCategory ? true : expandedPanel === 'category'}
          onChange={handlePanelChange('category')}
          sx={{
            mb: 2,
            boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
            borderRadius: `12px`,

            '&:before': {
              display: 'none',
            },

            '&:first-of-type': {
              borderRadius: `12px`,
            },

            '&:last-of-type': {
              borderRadius: `12px`,
            },
          }}
        >
          <AccordionSummary expandIcon={selectedCategory && <ExpandMoreIcon />}>
            <Typography variant="h6">
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
              mb: 2,
              boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
              borderRadius: `12px`,

              '&:before': {
                display: 'none',
              },

              '&:first-of-type': {
                borderRadius: `12px`,
              },

              '&:last-of-type': {
                borderRadius: `12px`,
              },
            }}
          >
            <AccordionSummary expandIcon={selectedSubCategory &&<ExpandMoreIcon />}>
              <Typography variant="h6">
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
              mb: 2,
              boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
              borderRadius: `12px`,

              '&:before': {
                display: 'none',
              },

              '&:first-of-type': {
                borderRadius: `12px`,
              },

              '&:last-of-type': {
                borderRadius: `12px`,
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Service wählen</Typography>
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
