import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import CategoryCard from "@/components/CategoryCard/CategoryCard";

export default function ServicesPage() {
  return (
    <Box
      bgcolor="background.default"
      component="section"
      sx={{
        paddingBottom: `32px`,
      }}
    >
      <Container>
        <Typography
          variant="h1"
          color="primary"
          sx={{
            textAlign: `center`,
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
          <CategoryCard
            title="Permanent Make-up"
            subtitle="Powder Brows, Velvet Lips, Wimpernkranzverdichtung, Hairstroke"
            linkHref="/services/permanent-make-up"
            imageSrc="/images/services/permanent-make-up.avif"
            imageAlt="Frau mit Permanent Make-up"
          />

          <CategoryCard
            title="Nails"
            subtitle="Manicure & Pedicure"
            linkHref="/services/nails"
            imageSrc="/images/services/manikure.avif"
            imageAlt="Hände mit Manikur"
          />
        </Box>
      </Container>
    </Box>
  );
}
