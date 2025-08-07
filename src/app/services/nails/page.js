import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import CategoryInfo from "@/components/CategoryInfo/CategoryInfo";

export const metadata = {
  title: `Maniküre und Pediküre München - MOOD BEAUTY | Professionelle Nagelpflege`,
  description: `Professionelle Maniküre und Pediküre in München. Höchste Hygienestandards, sanfte Behandlung und hochwertige Produkte. Jetzt Termin vereinbaren!`,
  keywords: `Maniküre München, Pediküre München, Nagelpflege München, Gel-Lack München, Shellac München, Fußpflege München, MOOD BEAUTY, Schönheitsstudio München, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/nails` },
  openGraph: {
    title: `Maniküre und Pediküre München - MOOD BEAUTY`,
    description: `Professionelle Maniküre und Pediküre in München. Höchste Hygienestandards, sanfte Behandlung und hochwertige Produkte.`,
    url: `https://moodbeauty.de/services/nails`,
    siteName: `MOOD BEAUTY`,
    locale: `de_DE`,
    type: `website`,
    images: [
      {
        url: `/images/services/manikure.avif`,
        width: 1200,
        height: 630,
        alt: `Maniküre und Pediküre München`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `Maniküre und Pediküre München - MOOD BEAUTY`,
    description: `Professionelle Maniküre und Pediküre in München. Höchste Hygienestandards, sanfte Behandlung und hochwertige Produkte.`,
    images: [`/images/services/manikure.avif`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": `large`,
      "max-snippet": -1,
    },
  },
  verification: { google: `your-google-verification-code` },
};

export default async function NailsPage() {
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

        <CategoryInfo
          title="Maniküre und Pediküre in München"
          subtitle="Pflege, Komfort und höchste Hygienestandards"
          description="Gepflegte Hände und Füße sind nicht nur schön, sondern auch ein Ausdruck von Selbstfürsorge. Im Studio Mood Beauty in München bieten wir professionelle Maniküre und Pediküre mit Fokus auf Qualität, Sterilität und Wohlbefinden. Jede Behandlung ist ein Moment der bewussten Pflege. Wir schaffen einen Ort, an dem Sie sich entspannen, sich sicher fühlen und mit perfekten Nägeln sowie einem Gefühl von Leichtigkeit und Frische nach Hause gehen."
          services={[
            `Klassische, kombinierte und apparative Maniküre`,
            `Hygienische Pediküre mit sanfter Fußpflege`,
            `Gel-Lack (Shellac) - langlebig und schonend`,
            `Nagelpflege und Aufbau brüchiger Nägel`,
            `Maniküre und Pediküre für Frauen und Männer`,
            `Pflege für Nägel und Haut mit wohltuender Wirkung`,
          ]}
          advantages={[
            `Absolute Hygiene und Sicherheit - alle Instrumente werden mehrfach desinfiziert und sterilisiert`,
            `Sanfte und sorgfältige Behandlung - keine Schmerzen, kein unangenehmes Gefühl`,
            `Verwendung von hochwertigen Produkten europäischer Marken`,
            `Individuelle Betreuung mit Achtsamkeit und Präzision`,
            `Perfekt für alle, die Maniküre und Pediküre in München mit höchsten Hygienestandards suchen`,
          ]}
          conclusion="Unsere Fachkräfte arbeiten achtsam und präzise, mit viel Feingefühl für empfindliche Haut und individuelle Bedürfnisse. Wir verbinden sichtbare Pflegeergebnisse mit echtem Wohlgefühl und respektvollem Umgang."
        />
      </Container>
    </Box>
  );
}