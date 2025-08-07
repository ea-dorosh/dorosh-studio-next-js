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
        <Box sx={{
          position: `relative`,
          width: `100%`,
          minHeight: {
            xs: `400px`,
          },
          overflow: `hidden`,
          backgroundColor: `#e1dbd6`,
          borderRadius: {
            xs: 0,
            md: `12px`,
          },
        }}>
          <OptimizedImage
            src="/images/main-top-image.avif"
            alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1200px"
            quality={90}
            style={{
              objectFit: `cover`,
              zIndex: `0`,
            }}
          />

          <Container sx={{
            background: `rgb(0 0 0 / 0.3)`,
            position: `relative`,
            paddingTop: {
              xs: `208px`,
              md: `250px`,
              lg: `300px`,
            },
            paddingBottom: `30px`,
            maxWidth: `100%`,
          }}>
            <Typography
              variant="h1"
              color="primary.contrastText"
              fontSize={{
                xs: `3rem`,
                md: `4rem`,
                lg: `5rem`,
              }}
              textAlign={`center`}
              sx={{ lineHeight: `0.6` }}
            >
              MOOD <br/>

              <Typography
                component="span" sx={{
                  fontSize: {
                    xs: `1.4rem`,
                    md: `1.8rem`,
                    lg: `2.2rem`,
                  },
                  fontWeight: `400`,
                  fontFamily: `cormorantGaramond`,
                  lineHeight: `0.6`,
                }}
              >
                beauty studio <br/>
                in München
              </Typography>

            </Typography>

            <Box
              sx={{
                marginTop: `30px`,
                display: `flex`,
                justifyContent: `center`,
                flexDirection: {
                  xs: `column`,
                  md: `row`,
                },
                gap: `16px`,
                alignItems: `center`,
              }}
            >
              <Button
                component={Link}
                href="/services"
                color="secondary"
                size="medium"
                variant="contained"
              >
                Services
              </Button>

              <Button
                component={Link}
                href="/booking"
                color="secondary"
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
