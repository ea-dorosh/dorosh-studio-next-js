import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export const metadata = {
  title: `Wimpernkranz München - MOOD BEAUTY | Permanent Make-up für Augenlider`,
  description: `Wimpernkranz in München - feine Füllung des Wimpernkranzes für einen ausdrucksstarken, aber natürlichen Blick. Jetzt Termin vereinbaren!`,
  keywords: `Wimpernkranz München, Permanent Make-up Augenlider München, Augenpigmentierung München, MOOD BEAUTY, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/permanent-make-up/wimpernkranz` },
  openGraph: {
    title: `Wimpernkranz München - MOOD BEAUTY`,
    description: `Wimpernkranz in München - feine Füllung des Wimpernkranzes für einen ausdrucksstarken, aber natürlichen Blick.`,
    url: `https://moodbeauty.de/services/permanent-make-up/wimpernkranz`,
    siteName: `MOOD BEAUTY`,
    locale: `de_DE`,
    type: `website`,
    images: [
      {
        url: `/images/services-page/service-wimpernkranz.webp`,
        width: 1200,
        height: 630,
        alt: `Wimpernkranz München`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `Wimpernkranz München - MOOD BEAUTY`,
    description: `Wimpernkranz in München - feine Füllung des Wimpernkranzes für einen ausdrucksstarken, aber natürlichen Blick.`,
    images: [`/images/services-page/service-wimpernkranz.webp`],
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

export default function WimpernkranzPage() {
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
          Wimpernkranz
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
          Der Effekt eines frisch geöffneten Looks
        </Typography>

        {/* Изображение */}
        <Box
          sx={{
            position: `relative`,
            width: `100%`,
            maxWidth: `600px`,
            margin: `0 auto 32px auto`,
            paddingTop: `67%`,
            overflow: `hidden`,
            borderRadius: `16px`,
          }}
        >
          <OptimizedImage
            src="/images/services-page/service-wimpernkranz.webp"
            alt="Wimpernkranz München"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            quality={80}
            style={{
              objectFit: `cover`,
              objectPosition: `center`,
            }}
          />
        </Box>

        {/* Заглушка */}
        <Box sx={{
          maxWidth: `800px`,
          margin: `0 auto`,
          textAlign: `center`,
        }}>
          <Typography
            sx={{
              lineHeight: 1.8,
              marginBottom: `32px`,
              fontSize: `1.2rem`,
              color: `text.secondary`,
            }}
          >
            Detaillierte Informationen zu unserer Wimpernkranz-Behandlung werden derzeit vorbereitet.
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.8,
              marginBottom: `32px`,
              fontSize: `1.1rem`,
              textAlign: `justify`,
            }}
          >
            Schmerzlose und sichere Behandlung mit Sterilisation, Qualität & Komfort. Der Effekt eines frisch geöffneten Looks.
          </Typography>

          {/* Кнопки */}
          <Box sx={{
            display: `flex`,
            gap: `16px`,
            justifyContent: `center`,
            flexWrap: `wrap`,
          }}>
            <Button
              component={Link}
              href="/booking"
              variant="contained"
              color="primary"
              size="medium"
              sx={{ width: `304px` }} // same as next button
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
