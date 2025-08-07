import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import CategoryCardInfo from '@/components/CategoryCardInfo/CategoryCardInfo';

export default function ServicesPage() {
  return (
    <Box
      bgcolor="background.paper"
      component="section"
      sx={{ paddingBottom: `32px` }}
    >
      <Container>
        <Typography
          variant="h1"
          color="primary"
          sx={{
            textAlign: `center`,
            marginTop: `18px`,
            marginBottom: `18px`,
            textTransform: `uppercase`,
            fontSize: `2.5rem`,
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
          <CategoryCardInfo
            title="Permanent Make-up"
            subtitle="Powder Brows, Velvet Lips, Wimpernkranzverdichtung, Hairstroke"
            linkHref="/services/permanent-make-up"
            imageSrc="/images/services/permanent-make-up.avif"
            imageAlt="Frau mit Permanent Make-up"
          />

          <CategoryCardInfo
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
