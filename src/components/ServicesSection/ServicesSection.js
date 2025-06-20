import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ServicesCard from "./ServiceCard/ServicesCard";

export default function ServicesSection() {

  return (
    <Box>
      <Box
        color="primary.main"
        bgcolor="primary.main"
        sx={{
          padding: `24px`,
        }}
      >
        <Typography
          variant="h2"
          color="secondary"
          sx={{
            '@media (max-width: 392px)': {
              fontSize: '2.2rem',
            },
            textAlign: 'center',
          }}
        >
          Unsere Services
        </Typography>
      </Box>

      <ServicesCard
        title="Velvet Lips"
        subtitle="Lippenpigmentierung"
        linkHref="/services#velvet-lips"
        imageSrc="/images/services/velvetLips.webp"
        imageAlt="Permanent Make-up Velvet Lips"
      />

      <ServicesCard
        title="Hairstroke"
        subtitle="Permanent Augenbrauen Make-Up in Haar Technik"
        linkHref="/services#hairstroke"
        imageSrc="/images/services/hairstroke.webp"
        imageAlt="Permanent Make-up Hairstroke"
      />

      <ServicesCard
        title="Powder Brows"
        subtitle="Permanent Augenbrauen Make-Up"
        linkHref="/services#powder-brows"
        imageSrc="/images/services/powderBrows.webp"
        imageAlt="Permanent Make-up Powder Brows"
      />

      <ServicesCard
        title="Wimpernkranz verdichtung"
        subtitle="Permanent Make-Up"
        linkHref="/services#wimpernkranz"
        imageSrc="/images/services/wimpernkranz.webp"
        imageAlt="Wimpernkranzverdichtung"
      />

      <ServicesCard
        title="Beratung"
        subtitle="Permanent Make-Up"
        linkHref="/services#beratung"
        imageSrc="/images/services/beratung.webp"
        imageAlt="Natalia Dorosh"
      />
    </Box>
  );
}
