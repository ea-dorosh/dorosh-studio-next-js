import {
  Button,
  Container,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Image from 'next/image';
import Link from "next/link";
import * as React from "react";
import AboutSection from "@/components/AboutSection/AboutSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";


export default function HomePage() {
  return (
    <>
      <Box
        component="section"
      >
        <Box sx={{
          position: `relative`,
          width: `100%`,
          overflow: `hidden`,
          backgroundColor: `#e1dbd6`,
        }}>
          <Image
            src="/images/main-top-image.avif"
            alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
            priority
            style={{
              objectFit: `cover`,
              position: `absolute`,
              top: `50%`,
              left: `50%`,
              transform: `translate(-50%, -50%)`,
              zIndex: `0`,
              width: `100%`,
              height: `100%`,
            }}
            width={512}
            height={512}
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
              sx={{
                lineHeight: `0.6`,
              }}
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
                size="large"
                variant="contained"
                sx={{
                  width: `150px`,
                }}
              >
                Services
              </Button>

              <Button
                component={Link}
                href="/booking"
                color="secondary"
                size="large"
                variant="contained"
                sx={{
                  width: `150px`,
                }}
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