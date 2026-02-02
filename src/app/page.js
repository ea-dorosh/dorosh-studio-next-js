import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';
import ContactSection from '@/components/ContactSection/ContactSection';
import HomeServices from '@/components/HomeServices/HomeServices';
import MosaicGallery from '@/components/MosaicGallery/MosaicGallery';
import ParallaxHero from '@/components/Parallax/ParallaxHero';
import PerformanceMonitor from '@/components/PerformanceMonitor/PerformanceMonitor';
import PricePreview from '@/components/PricePreview/PricePreview';
import UberMoodSection from '@/components/UberMoodSection/UberMoodSection';
import servicesService from '@/services/services.service';

const GALLERY_IMAGES = [
  {
    src: `/images/services/nails/IMG_0189.avif`,
    alt: `Professionelle Maniküre Ergebnis - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0196.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0198.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0200.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0201.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0202.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0204.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0209.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0213.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0329.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0374.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0375.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
];

export default async function HomePage() {
  const categories = await servicesService.getServices();
  return (
    <>
      <PerformanceMonitor />

      <Box
        component="section"
        sx={{
          maxWidth: `1200px`,
          margin: `0 auto`,
        }}
      >
        <Box
          sx={{
            position: `relative`,
            width: `100%`,
            minHeight: {
              xs: `70vh`,
              md: `70vh`,
            },
            overflow: `hidden`,
          }}
        >
          <ParallaxHero
            src="/images/design/design_1.avif"
            alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
            height="80vh"
          />

          <Container
            sx={{
              position: `absolute`,
              inset: 0,
              zIndex: 2,
              display: `flex`,
              alignItems: `center`,
              justifyContent: {
                xs: `flex-end`,
                md: `center`,
              },
              flexDirection: `column`,
              gap: 2,
              py: {
                xs: 4,
                md: 8,
              },
              pb: {
                xs: 14,
                md: 8,
              },
              maxWidth: `100%`,
            }}
          >
            <Typography
              variant="h1"
              color="primary.contrastText"
              textAlign="center"
              sx={{
                lineHeight: 1,
                letterSpacing: `.06em`,
              }}
            >
              MOOD
              <Box
                component="span"
                sx={{
                  display: `block`,
                  color: `secondary.main`,
                  fontWeight: 400,
                  letterSpacing: `.02em`,
                  mt: 1,
                  fontSize: {
                    xs: `1.4rem`,
                    md: `1.8rem`,
                    lg: `2.2rem`,
                  },
                }}
              >
                beauty studio in München
              </Box>
            </Typography>

            <Box
              sx={{
                display: `flex`,
                justifyContent: `center`,
                flexDirection: {
                  xs: `column`,
                  md: `row`,
                },
                gap: 2,
                alignItems: `center`,
              }}
            >
              <Button
                component={Link}
                href="/services"
                color="secondary"
                size="medium"
                variant="outlined"
              >
                Services
              </Button>

              <Button
                component={Link}
                href="/booking"
                color="primary"
                size="medium"
                variant="contained"
              >
                Termin
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      <HomeServices />

      <UberMoodSection />

      <Container>
        <MosaicGallery
          images={GALLERY_IMAGES}
          title="Unsere Maniküre Arbeiten"
        />
      </Container>

      <PricePreview categories={categories} />

      <ContactSection />
    </>
  );
}
