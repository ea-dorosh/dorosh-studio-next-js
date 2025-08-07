import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export const metadata = {
  title: `Powder Brows München - MOOD BEAUTY | Natürlicher Look und gepflegte Form`,
  description: `Powder Brows in München - moderne Technik für natürliche Augenbrauen. Sanfter Schattierungseffekt, gepflegte Form. Jetzt Termin vereinbaren!`,
  keywords: `Powder Brows München, Permanent Make-up Augenbrauen München, Pudertechnik München, Ombre Brows München, MOOD BEAUTY, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/permanent-make-up/powder-brows` },
  openGraph: {
    title: `Powder Brows München - MOOD BEAUTY`,
    description: `Powder Brows in München - moderne Technik für natürliche Augenbrauen. Sanfter Schattierungseffekt, gepflegte Form.`,
    url: `https://moodbeauty.de/services/permanent-make-up/powder-brows`,
    siteName: `MOOD BEAUTY`,
    locale: `de_DE`,
    type: `website`,
    images: [
      {
        url: `/images/services-page/service-brows.jpg`,
        width: 1200,
        height: 630,
        alt: `Powder Brows München`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `Powder Brows München - MOOD BEAUTY`,
    description: `Powder Brows in München - moderne Technik für natürliche Augenbrauen. Sanfter Schattierungseffekt, gepflegte Form.`,
    images: [`/images/services-page/service-brows.jpg`],
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

export default function PowderBrowsPage() {
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
          Powder Brows
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
          Natürlicher Look und gepflegte Form
        </Typography>

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
            src="/images/services-page/service-brows.jpg"
            alt="Powder Brows München"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            quality={80}
            style={{
              objectFit: `cover`,
              objectPosition: `center`,
            }}
          />
        </Box>

        <Box sx={{
          maxWidth: `800px`,
          margin: `0 auto`,
        }}>
          <Typography
            sx={{
              lineHeight: 1.8,
              marginBottom: `32px`,
              fontSize: `1.1rem`,
              textAlign: `justify`,
            }}
          >
            Powder Brows sind eine moderne Technik des permanenten Make-ups für die Augenbrauen, bei der ein sanfter Schattierungseffekt entsteht - wie leicht mit Puder oder Lidschatten betonte Brauen. Das Ergebnis wirkt gepflegt, harmonisch und gleichzeitig sehr natürlich - ganz ohne harte Konturen.
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
            Diese Methode eignet sich ideal für alle, die:
          </Typography>
          <Box component="ul" sx={{
            marginBottom: `32px`,
            paddingLeft: `24px`,
          }}>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              die Form und Symmetrie der Augenbrauen optimieren möchten
            </Typography>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              visuell mehr Fülle erzielen wollen
            </Typography>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              ihre natürlichen Gesichtszüge dezent unterstreichen möchten
            </Typography>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              täglich Zeit beim Schminken sparen wollen
            </Typography>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              ein langanhaltendes, aber natürliches Ergebnis für 1,5-2 Jahre wünschen
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
            Vorteile von Powder Brows:
          </Typography>
          <Box component="ul" sx={{
            marginBottom: `32px`,
            paddingLeft: `24px`,
          }}>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              Zarter, pudriger Effekt mit weicher Kontur
            </Typography>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              Farbpigmente werden oberflächlich eingebracht und bauen sich gleichmäßig ohne Rückstände ab
            </Typography>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              Auch für fettige oder empfindliche Haut geeignet
            </Typography>
            <Typography component="li" sx={{
              marginBottom: `8px`,
              lineHeight: 1.6,
            }}>
              Farbton und Intensität werden individuell angepasst - von sehr dezent bis leicht betont
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
            Die Behandlung des Powder Brows Permanent Make-ups in München wird von Natalia Dorosh durchgeführt - einer erfahrenen Spezialistin mit über 8 Jahren Praxis. Im Studio Mood Beauty verwenden wir ausschließlich zertifizierte Pigmente und arbeiten nach höchsten Hygienestandards.
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
            Wenn Sie sich gepflegte, gleichmäßige Brauen mit einem natürlichen Look wünschen, sind Powder Brows die perfekte Wahl.
          </Typography>

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
