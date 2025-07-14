import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import SubCategoriesList from "@/components/BookingForm/SubCategoriesList/SubCategoriesList";
import servicesService from "@/services/services.service";

export default async function BookingPage() {
  const services = await servicesService.getServices();

  const getUniqueSubCategories = (services) => {
    const subCategoriesMap = new Map(); // eslint-disable-line no-undef
    services.forEach((service) => {
      if (!subCategoriesMap.has(service.subCategoryId)) {
        subCategoriesMap.set(service.subCategoryId, {
          id: service.subCategoryId,
          name: service.subCategoryName,
          image: service.subCategoryImage,
          url: service.subCategoryUrl,
        });
      }
    });
    return Array.from(subCategoriesMap.values());
  };

  const subCategories = getUniqueSubCategories(services);

  return (
    <Box bgcolor="background.default">
      <Container>
        <Box
          sx={{
            display: `flex`,
            flexDirection: `column`,
            padding: `30px 0 10px 0`,
          }}
        >
          <Typography
            color="primary"
            sx={{
              textAlign: `center`,
              fontSize: `1.2rem !important`,
            }}
            variant="h1"
          >
            Für welche Prozedur möchten Sie sich anmelden?
          </Typography>

          <SubCategoriesList
            subCategories={subCategories}
            services={services}
          />
        </Box>
      </Container>
    </Box>
  );
}
