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
      >
        <Box sx={{
          position: `relative`,
          width: `100%`,
          minHeight: {
            xs: `400px`,
            sm: `500px`,
            md: `600px`,
          },
          overflow: `hidden`,
          backgroundColor: `#e1dbd6`,
        }}>
          <OptimizedImage
            src="/images/main-top-image.avif"
            alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
            priority
            fill
            sizes="100vw"
            quality={90}
            style={{
              objectFit: `cover`,
              zIndex: `0`,
            }}
          />

          <Container sx={{
            background: `rgb(0 0 0 / 0.3)`,
            position: `relative`,
            paddingTop: `208px`,
            paddingBottom: `30px`,
          }}>
            <Typography
              variant="h1"
              color="primary.contrastText"
              fontSize={`3rem`}
              textAlign={`center`}
              sx={{ lineHeight: `0.6` }}
            >
              MOOD <br/>

              <Typography
                component="span" sx={{
                  fontSize: `1.4rem`,
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
                flexDirection: `column`,
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
