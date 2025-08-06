import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export const metadata = {
  title: "Velvet Lips München - MOOD BEAUTY | Zarte Farbe und natürlich wirkende Lippen",
  description: "Velvet Lips in München - moderne Technik für natürliche Lippenpigmentierung. Sanfter Farbeffekt, gepflegte Lippen. Jetzt Termin vereinbaren!",
  keywords: "Velvet Lips München, Lippenpigmentierung München, Permanent Make-up Lippen München, Nude Lips München, MOOD BEAUTY, Natalia Dorosh",
  authors: [{ name: "Natalia Dorosh" }],
  creator: "Natalia Dorosh",
  publisher: "MOOD BEAUTY",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://moodbeauty.de"),
  alternates: {
    canonical: "/services/permanent-make-up/velvet-lips",
  },
  openGraph: {
    title: "Velvet Lips München - MOOD BEAUTY",
    description: "Velvet Lips in München - moderne Technik für natürliche Lippenpigmentierung. Sanfter Farbeffekt, gepflegte Lippen.",
    url: "https://moodbeauty.de/services/permanent-make-up/velvet-lips",
    siteName: "MOOD BEAUTY",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/images/services-page/service-lips.webp",
        width: 1200,
        height: 630,
        alt: "Velvet Lips München",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Lips München - MOOD BEAUTY",
    description: "Velvet Lips in München - moderne Technik für natürliche Lippenpigmentierung. Sanfter Farbeffekt, gepflegte Lippen.",
    images: ["/images/services-page/service-lips.webp"],
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
    google: "your-google-verification-code",
  },
};

export default function VelvetLipsPage() {
  return (
    <Box
      bgcolor="background.paper"
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
            textTransform: `uppercase`,
            fontSize: `2.5rem`,
          }}
        >
          Velvet Lips
        </Typography>

        <Typography
          variant="h2"
          color="primary"
          sx={{
            textAlign: `center`,
            marginBottom: `32px`,
            fontSize: `1.4rem`,
            color: `text.secondary`,
            fontStyle: `italic`,
          }}
        >
          Zarte Farbe und natürlich wirkende Lippen
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto 32px auto',
            paddingTop: '67%',
            overflow: 'hidden',
            borderRadius: `16px`,
          }}
        >
          <OptimizedImage
            src="/images/services-page/service-lips.webp"
            alt="Velvet Lips München"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            quality={80}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>

        <Box sx={{ maxWidth: `800px`, margin: `0 auto` }}>
          <Typography
            sx={{
              lineHeight: 1.8,
              marginBottom: `32px`,
              fontSize: `1.1rem`,
              textAlign: `justify`,
            }}
          >
            Velvet Lips ist eine moderne Technik des permanenten Lippen-Make-ups, bei der ein sanfter, gleichmäßiger Farbeffekt entsteht - als wären die Lippen leicht getönt. Ohne harte Konturen, ohne Überzeichnung - nur eine dezente, natürliche Farbauffrischung, die die Lippen gepflegt und harmonisch aussehen lässt.
          </Typography>

          <Typography
            variant="h3"
            sx={{
              marginBottom: `16px`,
              fontSize: `1.3rem`,
              fontWeight: `600`,
              color: `primary.main`,
            }}
          >
            Diese Behandlung eignet sich ideal für alle, die:
          </Typography>
          <Box component="ul" sx={{ marginBottom: `32px`, paddingLeft: `24px` }}>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              ihrer natürlichen Lippenfarbe mehr Frische verleihen möchten
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              regelmäßig Lippenstift nachziehen müssen und sich mehr Komfort wünschen
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Form und Ton der Lippen sanft ausgleichen möchten
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              ein dauerhaft gepflegtes, unaufdringliches Ergebnis bevorzugen
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              marginBottom: `16px`,
              fontSize: `1.3rem`,
              fontWeight: `600`,
              color: `primary.main`,
            }}
          >
            Vorteile von Velvet Lips:
          </Typography>
          <Box component="ul" sx={{ marginBottom: `32px`, paddingLeft: `24px` }}>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Aquarellähnlicher Farbeffekt mit weichen Übergängen
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Große Farbauswahl - für jeden Geschmack die passende Nuance
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Geeignet auch bei unregelmäßigem oder wenig definiertem Lippenrand
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Oberflächliche und nahezu schmerzfreie Methode
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Pigment baut sich gleichmäßig ab und verschwindet nach 1,5-2 Jahren rückstandslos
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Sanfter Heilungsverlauf ohne starke Schwellung oder Schorfbildung
            </Typography>
          </Box>

          <Typography
            sx={{
              lineHeight: 1.8,
              marginBottom: `32px`,
              fontSize: `1.1rem`,
              textAlign: `justify`,
            }}
          >
            Im Studio Mood Beauty in München verwenden wir ausschließlich zertifizierte Pigmente und achten auf höchste Hygienestandards. Die Behandlung wird von Natalia Dorosh durchgeführt - Spezialistin für permanentes Make-up mit Erfahrung seit 2017.
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.8,
              marginBottom: `32px`,
              fontSize: `1.1rem`,
              textAlign: `justify`,
              fontStyle: `italic`,
              color: `text.secondary`,
            }}
          >
            Velvet Lips steht für natürlich schöne, gepflegte Lippen - Tag für Tag, ganz ohne Schminke.
          </Typography>

          <Box sx={{ display: `flex`, gap: `16px`, justifyContent: `center`, flexWrap: `wrap` }}>
            <Button
              component={Link}
              href="/booking"
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                width: `304px`, // same as next button
              }}
            >
              Jetzt Termin vereinbaren
            </Button>

            <Button
              component={Link}
              href="/services/permanent-make-up"
              variant="outlined"
              color="primary"
              size="medium"
            >
              Zurück zu Permanent Make-up
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}