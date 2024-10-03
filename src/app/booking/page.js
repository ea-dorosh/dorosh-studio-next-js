// app/booking/page.jsx

import { Box, Container, Typography } from "@mui/material";
import CategoryList from "@/components/Booking/CategoriesList/CategoriesList";
import servicesService from "@/services/services.service";

export default async function BookingPage() {
  const services = await servicesService.getServices();

  const getUniqueCategories = (services) => {
    const categoriesMap = new Map(); // eslint-disable-line no-undef
    services.forEach((service) => {
      if (!categoriesMap.has(service.categoryId)) {
        categoriesMap.set(service.categoryId, {
          id: service.categoryId,
          name: service.categoryName,
          image: service.categoryImage,
          url: service.categoryUrl,
        });
      }
    });
    return Array.from(categoriesMap.values());
  };

  const categories = getUniqueCategories(services);

  return (
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
            fontSize: `1.2rem`,
          }}
          variant="h2"
        >
          Für welche Prozedur möchten Sie sich anmelden?
        </Typography>

        <CategoryList categories={categories} services={services} />
      </Box>
    </Container>
  );
}
