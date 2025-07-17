import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import ServiceCard from "@/components/ServiceCard/ServiceCard";

export const metadata = {
  title: "Permanent Make-up München - Dorosh Studio | Powder Brows, Hairstroke, Velvet Lips",
  description: "Professionelles Permanent Make-up in München. Powder Brows, Hairstroke, Velvet Lips & Wimpernkranz. Natürliche Ergebnisse mit modernster Technik. Jetzt Termin vereinbaren!",
  keywords: "Permanent Make-up München, Powder Brows München, Hairstroke München, Velvet Lips München, Wimpernkranz München, Augenbrauen München, Lippenpigmentierung München, Dorosh Studio, Schönheitsstudio München",
  authors: [{ name: "Dorosh Studio" }],
  creator: "Dorosh Studio",
  publisher: "Dorosh Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dorosh-studio.de"),
  alternates: {
    canonical: "/services/permanent-make-up",
  },
  openGraph: {
    title: "Permanent Make-up München - Dorosh Studio",
    description: "Professionelles Permanent Make-up in München. Powder Brows, Hairstroke, Velvet Lips & Wimpernkranz. Natürliche Ergebnisse mit modernster Technik.",
    url: "https://dorosh-studio.de/services/permanent-make-up",
    siteName: "Dorosh Studio",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/images/services-page/service-brows.jpg",
        width: 1200,
        height: 630,
        alt: "Permanent Make-up Powder Brows München",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Permanent Make-up München - Dorosh Studio",
    description: "Professionelles Permanent Make-up in München. Powder Brows, Hairstroke, Velvet Lips & Wimpernkranz.",
    images: ["/images/services-page/service-brows.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Замените на ваш код
  },
};

export default async function CategoryPage() {
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

        <Typography
          variant="h2"
          color="primary"
          sx={{
            textAlign: `center`,
            marginTop: `18px`,
            marginBottom: `18px`,
          }}
        >
          Permanent Make-up
        </Typography>

        <Box
          sx={{
            display: `flex`,
            flexDirection: `column`,
            gap: `16px`,
          }}
        >
          <ServiceCard
            id="powder-brows"
            title="Powder Brows"
            imageSrc="/images/services-page/service-brows.jpg"
            imageAlt="Permanent Make-up Powder Brows"
            bookingLink="/booking/permanent-make-up/powder-brows"
          >
            Powder Brows, Pudertechnik, Ombre Brows. Hochwertiges Permanent Make-Up hält 1,5-2 Jahre & die Augenbrauen wirken sehr natürlich, sehen dicht und voll aus.
          </ServiceCard>

          <ServiceCard
            id="hairstroke"
            title="Hairstroke"
            imageSrc="/images/services-page/service-hairstroke.webp"
            imageAlt="Permanent Make-up Hairstroke Brows"
            bookingLink="/booking/permanent-make-up/hairstroke"
          >
            Permanent Augenbrauen Make-Up in Haar Technik.
            <br/>
            Die natürlichste und realistischste Technik.
            <br/>
            Nicht zu verwechseln mit Microblading! Hairstroke - eine leichte, oberflächliche Technik ohne Hauttrauma
          </ServiceCard>

          <ServiceCard
            id="velvet-lips"
            title="Velvet Lips"
            imageSrc="/images/services-page/service-lips.webp"
            imageAlt="Permanent Make-up Velvet Lips"
            bookingLink="/booking/permanent-make-up/velvet-lippen"
          >
            Lippenpigmentierung.Velvet Lips, Nude Lips, Lipstick Effect Es sieht sehr harmonisch & natürlich aus.
            <br/>
            Schmerzfreie Behandlung. Auf jede Kundin tüchtig abgestimmte Pigmentfarbe & Formkorrektur.
          </ServiceCard>

          <ServiceCard
            id="wimpernkranz"
            title="Wimpernkranz"
            imageSrc="/images/services-page/service-wimpernkranz.webp"
            imageAlt="Permanent Make-up Wimpernkranz"
            bookingLink="/booking/permanent-make-up/wimpernkranz"
          >
            Der Effekt eines frisch geöffneten Looks Schmerlos und sicher Bechandlung.
            <br/>
            <br/>
            Sterilisation, Qualität & Komfort.
          </ServiceCard>
        </Box>
      </Container>
    </Box>
  );
}