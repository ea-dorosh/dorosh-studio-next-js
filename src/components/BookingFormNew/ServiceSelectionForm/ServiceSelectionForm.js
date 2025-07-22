import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
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
  serviceNumber
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
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
    onServiceSelect(service);
  };

  return (
    <Card sx={{ mb: 3, border: '1px solid', borderColor: 'grey.300' }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          Service {serviceNumber} auswählen
        </Typography>

        {/* Category Selection - Becomes collapsible after selection */}
        {!selectedCategory ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Kategorie wählen
            </Typography>
            <CategoryForm
              categories={categories}
              onCategorySelect={onCategorySelect}
              selectedCategory={selectedCategory}
            />
          </Box>
        ) : (
          <Accordion
            expanded={expandedPanel === 'category'}
            onChange={handlePanelChange('category')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Kategorie: {selectedCategory.categoryName}
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
        )}

        {/* SubCategory Selection - Collapsible */}
        {selectedCategory && (
          <Accordion
            expanded={expandedPanel === 'subCategory'}
            onChange={handlePanelChange('subCategory')}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                {selectedSubCategory
                  ? `Unterkategorie: ${selectedSubCategory.subCategoryName}`
                  : 'Unterkategorie wählen'
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
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Service wählen</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ServicesList
                services={getAvailableServices(selectedSubCategory.services)}
                onServiceSelect={onServiceSelectInternal}
              />
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}