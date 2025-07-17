import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import ServicesCard from "./ServiceCard/ServicesCard";

export default function ServicesSection() {

  return (
    <Box
      bgcolor="background.default"
      component="section"
    >
      <Container sx={{
        padding: `0 32px`,
      }}>
        <Typography
          variant="h2"
          color="primary"
          sx={{
            fontSize: '2.2rem',
            textAlign: 'center',
            marginTop: `18px`,
            marginBottom: `18px`,
          }}
        >
          Unsere Services
        </Typography>

        <Box
          sx={{
            display: `flex`,
            flexDirection: `column`,
            gap: `16px`,
          }}
        >
          <ServicesCard
            title="Permanent Make-up"
            subtitle="Powder Brows, Velvet Lips, Wimpernkranzverdichtung, Hairstroke"
            linkHref="/services#permanent-make-up"
            imageSrc="/images/services/permanent-make-up.avif"
            imageAlt="Frau mit Permanent Make-up"
          />

          <ServicesCard
            title="Nails"
            subtitle="Manicure & Pedicure"
            linkHref="/services#nails"
            imageSrc="/images/services/manikure.avif"
            imageAlt="Hände mit Manikur"
          />
        </Box>
      </Container>
    </Box>
  );
}
