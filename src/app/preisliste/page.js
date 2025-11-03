import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import PriceMenu from '@/components/PriceMenu/PriceMenu';
import servicesService from '@/services/services.service';

export const metadata = {
  title: `Preisliste - MOOD BEAUTY München`,
  description: `Unsere Preisliste für Permanent Make-Up, Nails, Lashes & Brows Services in München. Transparente Preisgestaltung für alle Schönheitsbehandlungen.`,
  keywords: `Preisliste, Permanent Make-Up Preise, Nails Preise, Lashes Preise, München, MOOD BEAUTY`,
};

export default async function PreislistePage() {
  const categories = await servicesService.getServices();

  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 4,
          md: 8,
        },
        backgroundColor: `background.default`,
      }}
    >
      <Container
        sx={{
          maxWidth: `1200px`,
          px: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          textAlign="center"
          sx={{
            fontWeight: 700,
            letterSpacing: `.02em`,
            mb: 2,
          }}
        >
          Preisliste
        </Typography>

        <Typography
          variant="body1"
          color="primary"
          textAlign="center"
          sx={{
            mb: 4,
            opacity: 0.8,
            maxWidth: `600px`,
            mx: `auto`,
          }}
        >
          Entdecken Sie unsere transparenten Preise für alle Beauty-Services
        </Typography>

        <PriceMenu categories={categories} />

        {/* Booking Call-to-Action */}
        <Box
          sx={{
            mt: {
              xs: 6,
              md: 8,
            },
            textAlign: `center`,
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            sx={{
              mb: 3,
              fontWeight: 600,
            }}
          >
            Bereit für Ihren Termin?
          </Typography>

          <Box
            sx={{
              display: `flex`,
              flexDirection: {
                xs: `column`,
                sm: `row`,
              },
              gap: 2,
              justifyContent: `center`,
              alignItems: `center`,
            }}
          >
            <Button
              component={Link}
              href="/booking"
              color="primary"
              variant="contained"
              size="large"
              sx={{
                px: 5,
                minWidth: {
                  xs: `100%`,
                  sm: `200px`,
                },
              }}
            >
              Online Termin buchen
            </Button>

            <Button
              component={Link}
              href="/services"
              color="primary"
              variant="outlined"
              size="large"
              sx={{
                px: 5,
                minWidth: {
                  xs: `100%`,
                  sm: `200px`,
                },
              }}
            >
              Unsere Services
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

