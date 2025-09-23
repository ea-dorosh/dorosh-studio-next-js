import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import { servicesData } from '@/constants/staticData';

export const metadata = {
  title: `Brow & Lash Lifting München - MOOD BEAUTY | Natürlich schöner Blick`,
  description: `Brow- und Lash-Lifting in München: sanfte Laminierung, Färben und Pflege. Wacher Blick und gepflegte Brauen & Wimpern ohne tägliches Make-up. Jetzt Termin buchen!`,
  keywords: `Brow Lifting München, Lash Lifting München, Brow & Lash Lifting, Laminierung, Augenbrauenlifting, Wimpernlifting, Mood Beauty`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/services/lashes-und-brows` },
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

export default function LashesUndBrowsPage() {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 4,
          md: 8,
        },
      }}
    >
      <Container
        sx={{
          maxWidth: `1200px`,
          px: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          textAlign="center"
          sx={{
            fontWeight: 700,
            letterSpacing: `.02em`,
            mb: 2,
          }}
        >
          Lashes & Brows
        </Typography>

        <Typography
          variant="h2"
          color="primary"
          textAlign="center"
          sx={{
            fontWeight: 600,
            mb: 2,
            fontSize: {
              xs: `1.25rem`,
              md: `1.5rem`,
            },
          }}
        >
          Brow- und Lash-Lifting - natürliche Pflege & Ausdruck ohne Make-up
        </Typography>

        <Typography
          color="primary"
          textAlign="center"
          sx={{
            maxWidth: 900,
            mx: `auto`,
            mb: 4,
            opacity: 0.95,
          }}
        >
          Lifting (Laminierung) ist eine sanfte Behandlung zur Formung, Stärkung und Verschönerung der natürlichen Brauen und Wimpern - für einen frischen, gepflegten Look ganz ohne tägliches Schminken.
        </Typography>

        <Box
          sx={{
            maxWidth: 900,
            mx: `auto`,
            mb: 6,
            color: `primary.main`,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Im Studio Mood Beauty München bieten wir Ihnen:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 2,
              m: 0,
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Brow Lifting</strong>
              <Box
                component="ul"
                sx={{
                  pl: 2,
                  m: 0,
                }}
              >
                <li>Bringt die Härchen in Form und hält sie in gewünschter Richtung</li>
                <li>Sorgt für mehr Fülle und Volumen</li>
                <li>Verleiht definierte Form ohne starre Linien</li>
                <li>Effekt hält 4-6 Wochen</li>
              </Box>
            </li>
            <li>
              <strong>Lash Lifting</strong>
              <Box
                component="ul"
                sx={{
                  pl: 2,
                  m: 0,
                }}
              >
                <li>Hebt die Naturwimpern sichtbar an</li>
                <li>Öffnet den Blick und lässt die Augen wacher wirken</li>
                <li>Pflegt und stärkt die Wimpernstruktur</li>
                <li>Haltbarkeit bis zu 6 Wochen</li>
              </Box>
            </li>
            <li>
              <strong>Kombi: Lifting + Färben</strong>
              <Box
                component="ul"
                sx={{
                  pl: 2,
                  m: 0,
                }}
              >
                <li>Ideal für helle, feine oder wenig definierte Brauen & Wimpern</li>
                <li>Individuelle Farbauswahl abgestimmt auf Ihren Typ</li>
                <li>Ausdrucksstarker, gepflegter Look - ganz ohne Make-up</li>
                <li>Effekt: natürlich, sichtbar und langanhaltend</li>
              </Box>
            </li>
          </Box>

          <Box
            component="ul"
            sx={{
              pl: 2,
              m: 0,
              lineHeight: 1.8,
            }}
          >
            <li>Warum Mood Beauty?</li>
            <Box
              component="ul"
              sx={{
                pl: 2,
                m: 0,
              }}
            >
              <li>Schonende Formeln, auch für empfindliche Haut</li>
              <li>Hochwertige Produkte & professionelle Anwendung</li>
              <li>Alles in einem Termin - schnell & effektiv</li>
              <li>Persönliche Beratung und liebevolle Präzision</li>
            </Box>
          </Box>

          <Typography
            sx={{
              mt: 2,
            }}
          >
            Gönnen Sie sich einen wachen Blick und gepflegte Brauen - ganz ohne tägliches Styling. Jetzt Termin buchen für Brow- & Lash-Lifting bei Mood Beauty in München.
          </Typography>
        </Box>

        <Grid
          container
          spacing={{
            xs: 2,
            md: 3,
          }}
        >
          {servicesData.map((serviceCard, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              lg={4}
              sx={{
                display: {
                  md: `flex`,
                },
                justifyContent: {
                  md: `center`,
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: `background.paper`,
                  borderRadius: {
                    xs: `16px`,
                    md: `24px`,
                  },
                  overflow: `hidden`,
                  boxShadow: `0 10px 30px rgba(0,0,0,.06)`,
                  height: `100%`,
                  width: {
                    xs: `100%`,
                    md: 400,
                  },
                  flexShrink: 0,
                  display: `flex`,
                  flexDirection: `column`,
                  transition: `transform .15s ease, box-shadow .15s ease`,
                  '&:hover': {
                    transform: `translateY(-2px)`,
                    boxShadow: `0 14px 36px rgba(0,0,0,.1)`,
                  },
                }}
              >
                <Box
                  sx={{
                    position: `relative`,
                    aspectRatio: `16 / 9`,
                  }}
                >
                  <OptimizedImage
                    src={serviceCard.img}
                    alt={serviceCard.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    style={{
                      objectFit: `cover`,
                      objectPosition: `center`,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    p: {
                      xs: 2,
                      md: 3,
                    },
                    display: `flex`,
                    flexDirection: `column`,
                    gap: 1.5,
                  }}
                >
                  <Typography
                    variant="h3"
                    color="primary"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {serviceCard.title}
                  </Typography>

                  <Typography
                    color="primary"
                    sx={{
                      opacity: 0.95,
                    }}
                  >
                    {serviceCard.lead}
                  </Typography>

                  <Box
                    component="ul"
                    sx={{
                      pl: 3,
                      m: 0,
                      color: `primary.main`,
                    }}
                  >
                    {serviceCard.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      mt: 1.5,
                    }}
                  >
                    <Button
                      component={Link}
                      href="/booking"
                      variant="contained"
                      color="primary"
                      size="medium"
                    >
                      Jetzt Termin buchen
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
