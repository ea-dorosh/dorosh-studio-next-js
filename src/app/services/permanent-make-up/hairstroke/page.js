import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export const metadata = {
  title: "Hairstroke München - MOOD BEAUTY | Maschinelle Härchenzeichnung für natürlich wirkende Augenbrauen",
  description: "Hairstroke in München - moderne maschinelle Technik für natürliche Augenbrauen. Feine haarähnliche Linien, schmerzfrei. Jetzt Termin vereinbaren!",
  keywords: "Hairstroke München, Permanent Make-up Augenbrauen München, Maschinelle Technik München, Natürliche Augenbrauen München, MOOD BEAUTY, Natalia Dorosh",
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
    canonical: "/services/permanent-make-up/hairstroke",
  },
  openGraph: {
    title: "Hairstroke München - MOOD BEAUTY",
    description: "Hairstroke in München - moderne maschinelle Technik für natürliche Augenbrauen. Feine haarähnliche Linien, schmerzfrei.",
    url: "https://moodbeauty.de/services/permanent-make-up/hairstroke",
    siteName: "MOOD BEAUTY",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/images/services-page/service-hairstroke.webp",
        width: 1200,
        height: 630,
        alt: "Hairstroke München",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairstroke München - MOOD BEAUTY",
    description: "Hairstroke in München - moderne maschinelle Technik für natürliche Augenbrauen. Feine haarähnliche Linien, schmerzfrei.",
    images: ["/images/services-page/service-hairstroke.webp"],
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

export default function HairstrokePage() {
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
          Hairstroke
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
          Maschinelle Härchenzeichnung für natürlich wirkende Augenbrauen
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
            src="/images/services-page/service-hairstroke.webp"
            alt="Hairstroke München"
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
            Hairstroke ist eine moderne, maschinelle Technik des permanenten Augenbrauen-Make-ups, bei der feine, haarähnliche Linien in die Haut pigmentiert werden - ganz ohne Schnitte oder Verletzungen. Im Gegensatz zu Microblading erfolgt die Pigmentierung sehr oberflächlich und absolut schonend für die Haut. Die Technik ist nahezu schmerzfrei und ideal für alle, die sich ein natürliches, harmonisches Ergebnis wünschen.
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
            Für wen eignet sich Hairstroke?
          </Typography>
          <Box component="ul" sx={{ marginBottom: `32px`, paddingLeft: `24px` }}>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Bei lückenhaften, dünnen oder asymmetrischen Augenbrauen
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Zur Kaschierung kleiner Narben oder Unregelmäßigkeiten
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Für alle, die keine dichte Schattierung wünschen
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Ideal bei empfindlicher oder feiner Haut, bei der Microblading nicht empfohlen wird
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
            Vorteile der maschinellen Hairstroke-Technik:
          </Typography>
          <Box component="ul" sx={{ marginBottom: `32px`, paddingLeft: `24px` }}>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Keine Schnitte, keine Narben, keine Hautverletzungen
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Nahezu schmerzfreie Anwendung dank oberflächlicher Pigmentierung
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Sanftes Ausbleichen - die Farbe verschwindet vollständig und gleichmäßig
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Keine Verfärbungen ins Graue oder Rötliche
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Natürliches Ergebnis - fein, zart und kaum von echten Haaren zu unterscheiden
            </Typography>
            <Typography component="li" sx={{ marginBottom: `8px`, lineHeight: 1.6 }}>
              Schnelle Heilung ohne Krusten oder Schwellung
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
            Die Behandlung wird im Studio Mood Beauty in München von Natalia Dorosh, erfahrene Permanent Make-up Artistin seit 2017, durchgeführt. Wir arbeiten mit hochwertigen, zertifizierten Farben, sterilen Einwegnadeln und modernen Geräten für maximale Hygiene und Präzision.
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
            Hairstroke ist die perfekte Wahl für alle, die sich natürlich definierte Augenbrauen ohne sichtbares Make-up wünschen.
          </Typography>

          <Box sx={{ display: `flex`, gap: `16px`, justifyContent: `center`, flexWrap: `wrap` }}>
            <Button
              component={Link}
              href="/booking"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                padding: `12px 32px`,
                fontSize: `1.1rem`,
                fontWeight: `600`,
                borderRadius: `8px`,
                textTransform: `none`,
                boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
                '&:hover': {
                  boxShadow: `0 6px 16px rgba(0, 0, 0, 0.2)`,
                }
              }}
            >
              Jetzt Termin vereinbaren
            </Button>

            <Button
              component={Link}
              href="/services/permanent-make-up"
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                padding: `12px 32px`,
                fontSize: `1.1rem`,
                fontWeight: `600`,
                borderRadius: `8px`,
                textTransform: `none`,
              }}
            >
              Zurück zu Permanent Make-up
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}