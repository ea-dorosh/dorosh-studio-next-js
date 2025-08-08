import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ServicesCard from '@/components/ServicesSection/ServiceCard/ServiceCard';

export default function ServicesSection() {

  return (
    <Box bgcolor="background.alternate" component="section">
      <Container sx={{
        maxWidth: `1200px`,
        margin: `0 auto`,
        padding: {
          xs: `24px 16px 0 16px`,
          md: `32px 24px 0 24px`,
        },
      }}>
        <Typography
          variant="h2"
          color="primary"
          sx={{
            textAlign: `center`,
            marginTop: `12px`,
            marginBottom: `24px`,
          }}
        >
          Unsere Services
        </Typography>

        <Box
          sx={{
            display: `grid`,
            gridTemplateColumns: {
              xs: `1fr`,
              md: `repeat(2, minmax(0, 1fr))`,
            },
            gap: {
              xs: `16px`,
              md: `24px`,
            },
            alignItems: `stretch`,
            margin: `0 auto`,
            maxWidth: `100%`,
          }}
        >
          <Box sx={{
            display: `flex`,
            flexDirection: `column`,
            alignItems: `stretch`,
            width: `100%`,
            maxWidth: `100%`,
          }}>
            <ServicesCard
              title="Permanent Make-up"
              subtitle="Powder Brows, Velvet Lips, Wimpernkranzverdichtung, Hairstroke"
              linkHref="/services/permanent-make-up"
              imageSrc="/images/services/permanent-make-up.avif"
              imageAlt="Frau mit Permanent Make-up"
            />
          </Box>

          <Box sx={{
            display: `flex`,
            flexDirection: `column`,
            alignItems: `stretch`,
            width: `100%`,
            maxWidth: `100%`,
          }}>
            <ServicesCard
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
