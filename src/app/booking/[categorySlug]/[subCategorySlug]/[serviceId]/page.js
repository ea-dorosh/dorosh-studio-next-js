import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingFormContainer from "@/components/BookingForm/BookingFormContainer";
import servicesService from "@/services/services.service";
import { formatTimeToString } from "@/utils/formatters";
import { slugify } from "@/utils/slugify";

export async function generateMetadata({ params }) {
  const categories = await servicesService.getServices();
  const category = categories.find(cat =>
    slugify(cat.categoryName) === params.categorySlug
  );
  const subCategory = category?.subCategories.find(sub => sub.subCategoryUrl === params.subCategorySlug);
  const service = subCategory?.services.find(service => service.id.toString() === params.serviceId);

  if (!category || !subCategory || !service) {
    return {
      title: "Service nicht gefunden - Dorosh Studio",
    };
  }

  return {
    title: `${service.name} - ${subCategory.subCategoryName} | Dorosh Studio München`,
    description: `${service.name} in München. Professionelle ${subCategory.subCategoryName} Behandlung. Dauer: ${service.durationTime}.`,
    keywords: `${service.name}, ${subCategory.subCategoryName}, ${category.categoryName}, München, Schönheitsbehandlung, Dorosh Studio`,
    openGraph: {
      title: `${service.name} - ${subCategory.subCategoryName} | Dorosh Studio München`,
      description: `${service.name} in München. Professionelle Behandlung.`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }) {
  const categories = await servicesService.getServices();
  const category = categories.find(cat =>
    slugify(cat.categoryName) === params.categorySlug
  );
  const subCategory = category?.subCategories.find(sub => sub.subCategoryUrl === params.subCategorySlug);
  const service = subCategory?.services.find(service => service.id.toString() === params.serviceId);

  if (!category || !subCategory || !service) {
    notFound();
  }

  return (
    <Box bgcolor="background.default" sx={{ paddingBottom: `30px` }}>
      <Container>
        <Box
          sx={{
            display: `flex`,
            flexDirection: `column`,
          }}
        >
          {/* Back Button */}
          <Button
            component={Link}
            href={`/booking/${params.categorySlug}/${params.subCategorySlug}`}
            style={{ textDecoration: 'none' }}
            sx={{
              color: `primary.main`,
              '&:hover': {
                backgroundColor: `rgba(0, 0, 0, 0.04)`,
              },
            }}
            startIcon={<ArrowBack />}
          >
            Zurück zu {subCategory.subCategoryName}
          </Button>

          {/* Service Header */}
          <Box
            sx={{
              display: `flex`,
              alignItems: `center`,
              gap: `1.5rem`,
              mb: `2rem`,
              padding: `1.5rem`,
              backgroundColor: `primary.main`,
              borderRadius: `12px`,
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: `1.4rem !important`,
                  fontWeight: `bold`,
                  color: `secondary.main`,
                  mb: `0.5rem`,
                  textAlign: `center`,
                  wordBreak: `break-word`,
                  whiteSpace: `normal`,
                }}
              >
                {service.name}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: `1.1rem`,
                  color: `secondary.main`,
                  opacity: 0.8,
                  mb: `0.5rem`,
                }}
              >
                {category.categoryName} <br />
                {subCategory.subCategoryName} <br />
                Dauer: {formatTimeToString(service.durationTime)}
              </Typography>
            </Box>
          </Box>

          {/* Booking Form */}
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: `1.5rem`,
                fontWeight: `bold`,
                color: `primary.main`,
                mb: `1.5rem`,
                textAlign: `center`,
              }}
            >
              Termin buchen
            </Typography>

            <BookingFormContainer service={service} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}