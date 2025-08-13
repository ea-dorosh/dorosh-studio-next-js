import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import CategoryCardInfo from '@/components/CategoryCardInfo/CategoryCardInfo';

export default function ServicesPage() {
  return (
    <Box
      bgcolor="background.default"
      component="section"
      sx={{
        paddingBottom: `32px`,
        maxWidth: `1200px`,
        margin: `0 auto`,
      }}
    >
      <Container sx={{ maxWidth: `100%` }}>
        <Typography
          variant="h1"
          color="primary"
          sx={{
            textAlign: `center`,
            marginTop: `18px`,
            marginBottom: `18px`,
            textTransform: `uppercase`,
          }}
        >
          Unsere Services
        </Typography>

        <Box
          sx={{
            display: `flex`,
            flexDirection: {
              xs: `column`,
              lg: `row`,
            },
            gap: `16px`,
            justifyContent: `center`,
            alignItems: `center`,
            maxWidth: {
              xs: `100%`,
              sm: `600px`,
              md: `800px`,
              lg: `100%`,
            },
            margin: `0 auto`,
          }}
        >
          <Box
            sx={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              width: `100%`,
              maxWidth: {
                xs: `100%`,
                sm: `500px`,
                md: `400px`,
                lg: `500px`,
              },
            }}
          >
            <CategoryCardInfo
              title="Permanent Make-up"
              subtitle="Powder Brows, Velvet Lips, Wimpernkranzverdichtung, Hairstroke"
              linkHref="/services/permanent-make-up"
              imageSrc="/images/services/permanent-make-up.avif"
              imageAlt="Frau mit Permanent Make-up"
            />
          </Box>

          <Box
            sx={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              width: `100%`,
              maxWidth: {
                xs: `100%`,
                sm: `500px`,
                md: `400px`,
                lg: `500px`,
              },
            }}
          >
            <CategoryCardInfo
              title="Nails"
              subtitle="Manicure & Pedicure"
              linkHref="/services/nails"
              imageSrc="/images/services/manikure.avif"
              imageAlt="Hände mit Manikur"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
