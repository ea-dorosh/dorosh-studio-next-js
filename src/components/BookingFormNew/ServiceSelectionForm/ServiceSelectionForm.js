import DeleteIcon from '@mui/icons-material/Delete';
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
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
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
  isFirstForm,
}) {
  useEffect(() => {
    console.log(`ServiceSelectionForm ${isFirstForm ? `1` : `2`} rendered`);
  }, []);

  // ... existing code ...

  // Добавить новый useEffect для отслеживания изменений serviceData
  useEffect(() => {
    if (serviceData) {
      const category = categories.find(category => category.categoryId === serviceData?.categoryId);
      const subCategory = category?.subCategories.find(subCategory => subCategory.subCategoryId === serviceData?.subCategoryId);
      const service = subCategory?.services.find(service => service.serviceId === serviceData?.serviceId);

      setSelectedCategory(category || null);
      setSelectedSubCategory(subCategory || null);
      setSelectedService(service || null);
    } else {
    // Если serviceData стала null, очищаем состояние
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setSelectedService(null);
    }
  }, [serviceData]);

  const [selectedCategory, setSelectedCategory] = useState(
    serviceData ? categories.find(category => category.categoryId === serviceData?.categoryId) : null
  );

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    selectedCategory ? selectedCategory?.subCategories.find(subCategory => subCategory.subCategoryId === serviceData?.subCategoryId) : null
  );

  const [selectedService, setSelectedService] = useState(
    selectedSubCategory ? selectedSubCategory.services.find(service => service.serviceId === serviceData?.serviceId) : null
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
        mb: 3,
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
        position: `relative`,

        '&:last-child': {
          p: 0,
        },
      }}>
        {hasDeleteButton && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: `absolute`, top: 0, left: 0, zIndex: 1 }}>
            <IconButton onClick={deleteService}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <Accordion
          expanded={!selectedCategory ? true : expandedPanel === 'category'}
          onChange={handlePanelChange('category')}
        >
          <AccordionSummary expandIcon={selectedCategory && <ExpandMoreIcon />}>
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
          >
            <AccordionSummary expandIcon={selectedSubCategory &&<ExpandMoreIcon />}>
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
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {!serviceData || expandedPanel === 'service' ?
                <Typography sx={{ fontWeight: `bold` }}>Service wählen</Typography>
                :
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontWeight: `bold` }}>{serviceData.name}</Typography>

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
              }
            </AccordionSummary>

            <AccordionDetails>
              <ServicesList
                services={getAvailableServices(selectedSubCategory.services)}
                onServiceSelect={onServiceSelectInternal}
                selectedServiceId={serviceData?.id}
              />
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
