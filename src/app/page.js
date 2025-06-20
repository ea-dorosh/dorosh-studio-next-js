import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import * as React from "react";
import AboutSection from "@/components/AboutSection/AboutSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Box sx={{
        display: `flex`,
        flexDirection: `column`,
        width: `100%`,
        padding: `0 24px`,
        backgroundColor: `#151211`,
        '@media (min-width: 1024px)': {
          flexDirection: `row`,
        }
      }}>
        <Box>
          <Typography
            sx={{
              marginTop: `35px`,
            }}
            variant="h1"
            color="secondary.main"
            fontSize={`2rem`}
          >
            Dorosh Studio<br/>
            Schönheitssalon<br/>
            in München
          </Typography>

          <Typography
            sx={{
              marginTop: `20px`,
              fontSize: `1.2rem !important`,
              fontFamily: `poppins`,
              lineHeight: 1.3,
              textAlign: `center`,
            }}
            variant="h2"
            color="secondary.main"
          >
            Permanent Make-up • Maniküre
          </Typography>

          <Button
            component={Link}
            href="/services"
            sx={{
              marginTop: `30px`,
              width: `100%`,
            }}
            color="secondary"
            size="large"
            variant="contained"

          >
            Unsere Services
          </Button>
        </Box>

        <Box sx={{
          backgroundImage: `url(/images/main.webp)`,
          marginTop: `auto`,
          backgroundSize: `100%`,
          height: `350px`,
          backgroundRepeat: `no-repeat`,

          '@media (min-width: 500px)': {
            backgroundPositionY: `-37px`,
          },
          '@media (min-width: 630px)': {
            backgroundPositionY: `-72px`,
          },
          '@media (min-width: 770px)': {
            backgroundPositionY: `-116px`,
            height: `380px`,
          },
          '@media (min-width: 1024px)': {
            backgroundPositionY: `-60px`,
            height: `500px`,
            width: `100%`,
          },
          '@media (min-width: 1224px)': {
            backgroundPositionY: `0px`,
            height: `700px`,
          },
        }}>
        </Box>
      </Box>

      <ServicesSection />

      <AboutSection />

      <ContactSection />
    </>
  );
}
