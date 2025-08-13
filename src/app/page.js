import {
  Button,
  Container,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
import AboutSection from '@/components/AboutSection/AboutSection';
import ContactSection from '@/components/ContactSection/ContactSection';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import PerformanceMonitor from '@/components/PerformanceMonitor/PerformanceMonitor';
import ServicesSection from '@/components/ServicesSection/ServicesSection';


export default function HomePage() {
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
            backgroundColor: `#e1dbd6`,
            borderRadius: {
              xs: 0,
              md: `16px`,
            },
          }}
        >
          <OptimizedImage
            src="/images/main-top-image.avif"
            alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1200px"
            quality={90}
            style={{
              objectFit: `cover`,
              objectPosition: `center`,
              zIndex: `0`,
            }}
          />

          {/* gradient overlay */}
          <Box
            sx={{
              position: `absolute`,
              inset: 0,
              zIndex: 1,
              background: `linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.4) 100%)`,
            }}
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

      <AboutSection />

      <ServicesSection />

      <ContactSection />
    </>
  );
}
