import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import servicesService from "@/services/services.service";
import { slugify } from "@/utils/slugify";

export async function generateMetadata({ params }) {
  const categories = await servicesService.getServices();
  const category = categories.find(cat =>
    slugify(cat.categoryName) === params.categorySlug
  );

  if (!category) {
    return {
      title: "Kategorie nicht gefunden - Dorosh Studio",
    };
  }

  return {
    title: `${category.categoryName} - Dorosh Studio München`,
    description: `Entdecken Sie unsere ${category.categoryName} Services in München. Professionelle Behandlungen mit modernster Technik.`,
    keywords: `${category.categoryName}, München, Schönheitsbehandlung, Dorosh Studio`,
    openGraph: {
      title: `${category.categoryName} - Dorosh Studio München`,
      description: `Entdecken Sie unsere ${category.categoryName} Services in München.`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }) {
  const categories = await servicesService.getServices();
  const category = categories.find(cat =>
    slugify(cat.categoryName) === params.categorySlug
  );

  if (!category) {
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
            href="/booking" style={{ textDecoration: 'none' }}
            sx={{
              color: `primary.main`,
              '&:hover': {
                backgroundColor: `rgba(0, 0, 0, 0.04)`,
              },
            }}
            startIcon={<ArrowBack />}
          >
            Zurück zur Kategorieauswahl
          </Button>

          {/* Category Header */}
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
              {category.categoryName}
            </Typography>
          </Box>

          {/* Subcategories */}
          <Box
            sx={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
              gap: `2rem`,
            }}
          >
            {category.subCategories.map((subCategory) => (
              <Link
                key={subCategory.subCategoryId}
                href={`/booking/${params.categorySlug}/${subCategory.subCategoryUrl}`}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  sx={{
                    backgroundColor: `secondary.main`,
                    position: `relative`,
                    overflow: `hidden`,
                    transition: `transform 0.3s, box-shadow 0.3s`,
                    cursor: `pointer`,
                    height: `100%`,
                    '&:hover': {
                      transform: `scale(1.02)`,
                      boxShadow: `0 8px 25px rgba(0, 0, 0, 0.15)`,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={subCategory.subCategoryImage}
                    alt={subCategory.subCategoryName}
                    sx={{
                      objectFit: `cover`,
                    }}
                  />

                  <CardContent>
                    <Typography
                      variant="h3"
                      sx={{
                        textAlign: `left`,
                        fontSize: `1.3rem`,
                        fontWeight: `bold`,
                        mb: `0.5rem`,
                      }}
                      color="primary.main"
                    >
                      {subCategory.subCategoryName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: `left`,
                        fontSize: `1rem`,
                        color: `primary.main`,
                        opacity: 0.8,
                      }}
                    >
                      {subCategory.services.length} {subCategory.services.length === 1 ? 'Service' : 'Services'} verfügbar
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}