import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubCategoryServicesSSR from "./SubCategoryServicesSSR";
import servicesService from "@/services/services.service";
import { slugify } from "@/utils/slugify";

export async function generateMetadata({ params }) {
  const categories = await servicesService.getServices();
  const category = categories.find(cat =>
    slugify(cat.categoryName) === params.categorySlug
  );
  const subCategory = category?.subCategories.find(sub => sub.subCategoryUrl === params.subCategorySlug);

  if (!category || !subCategory) {
    return {
      title: "Service nicht gefunden - Dorosh Studio",
    };
  }

  return {
    title: `${subCategory.subCategoryName} - ${category.categoryName} | Dorosh Studio München`,
    description: `${subCategory.subCategoryName} in München. Professionelle ${category.categoryName} Behandlung mit ${subCategory.services.length} verschiedenen Services.`,
    keywords: `${subCategory.subCategoryName}, ${category.categoryName}, München, Schönheitsbehandlung, Dorosh Studio`,
    openGraph: {
      title: `${subCategory.subCategoryName} - ${category.categoryName} | Dorosh Studio München`,
      description: `${subCategory.subCategoryName} in München. Professionelle Behandlung.`,
      type: "website",
    },
  };
}

export default async function SubCategoryPage({ params }) {
  const categories = await servicesService.getServices();
  const category = categories.find(cat =>
    slugify(cat.categoryName) === params.categorySlug
  );
  const subCategory = category?.subCategories.find(sub => sub.subCategoryUrl === params.subCategorySlug);

  if (!category || !subCategory) {
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
            href={`/booking/${params.categorySlug}`}
            style={{ textDecoration: 'none' }}
            sx={{
              color: `primary.main`,
              '&:hover': {
                backgroundColor: `rgba(0, 0, 0, 0.04)`,
              },
            }}
            startIcon={<ArrowBack />}
          >
            Zurück zu {category.categoryName}
          </Button>

          {/* SubCategory Header */}
          <Box
            sx={{
              mb: `2rem`,
              padding: `1.5rem`,
              backgroundColor: `primary.main`,
              borderRadius: `12px`,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: `1.4rem !important`,
                fontWeight: `bold`,
                color: `secondary.main`,
                textAlign: `center`,
              }}
            >
              {subCategory.subCategoryName}
            </Typography>
          </Box>

          {/* Services Component */}
          <SubCategoryServicesSSR
            subCategory={subCategory}
            categorySlug={params.categorySlug}
            subCategorySlug={params.subCategorySlug}
          />
        </Box>
      </Container>
    </Box>
  );
}