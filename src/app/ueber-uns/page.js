import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: `Über MOOD Beauty Studio München - Permanent Make-up & Maniküre`,
  description: `MOOD Beauty Studio - Ihr modernes Kosmetikstudio in München. Spezialisiert auf Permanent Make-up und ästhetische Maniküre. Natürliche Ausstrahlung, professionelle Techniken und individuelle Beratung.`,
  keywords: `MOOD Beauty Studio München, Permanent Make-up München, Maniküre München, Kosmetikstudio München, Augenbrauen München, Lippenpigmentierung München, Nagelpflege München, Beauty Studio München, Natalia Dorosh`,
  authors: [{ name: `Natalia Dorosh` }],
  creator: `Natalia Dorosh`,
  publisher: `MOOD BEAUTY`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`https://moodbeauty.de`),
  alternates: { canonical: `/ueber-uns` },
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
};

export default function ÜberUnsPage() {
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
      <Container
        sx={{
          maxWidth: `100%`,
          padding: {
            xs: `0 16px`,
            md: `0 32px`,
          },
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          sx={{
            textAlign: `center`,
            marginTop: `18px`,
            marginBottom: `32px`,
            textTransform: `uppercase`,
          }}
        >
          Über uns
        </Typography>

        <Box
          sx={{
            maxWidth: {
              xs: `100%`,
              md: `900px`,
              lg: `1000px`,
            },
            margin: `0 auto`,
          }}
        >
          <Typography
            variant="h2"
            color="primary"
            sx={{
              marginBottom: `24px`,
              fontWeight: 600,
            }}
          >
            Über MOOD Beauty Studio - Permanent Make-up & Maniküre in München
          </Typography>

          <Typography
            color="primary"
            component="p"
            sx={{
              marginBottom: 3,
              lineHeight: 1.7,
            }}
          >
            MOOD Beauty Studio ist ein modernes, stilvolles Kosmetikstudio im Zentrum von München, spezialisiert auf Permanent Make-up und ästhetische Maniküre.
          </Typography>

          <Typography
            color="primary"
            component="p"
            sx={{
              marginBottom: 3,
              lineHeight: 1.7,
            }}
          >
            Unser Fokus liegt auf natürlicher Ausstrahlung, makelloser Ausführung und individueller Beratung.
            Jede Behandlung bei MOOD ist ein persönliches Beauty-Ritual - in ruhiger Atmosphäre, mit höchsten Hygienestandards und professionellen Techniken.
          </Typography>

          <Divider
            sx={{
              my: 4,
              backgroundColor: `primary.main`,
              opacity: 0.3,
            }}
          />

          <Typography
            variant="h3"
            color="primary"
            sx={{
              marginBottom: `24px`,
              fontWeight: 600,
            }}
          >
            Unsere Schwerpunkte:
          </Typography>

          <Box sx={{ marginBottom: 4 }}>
            <Typography
              variant="h4"
              color="primary"
              sx={{
                marginBottom: `16px`,
                fontWeight: 600,
              }}
            >
              - Permanent Make-up in München
            </Typography>

            <Typography
              color="primary"
              component="p"
              sx={{
                marginBottom: 2,
                lineHeight: 1.7,
                paddingLeft: 2,
              }}
            >
              Wir bieten präzises, typgerechtes PMU für Augenbrauen, Lippen und Lidstrich - für ein dauerhaft gepflegtes Aussehen ganz ohne Make-up.
              Nur hochwertige Farben, modernste Techniken und ein klares Ziel: Ihre natürliche Schönheit zu betonen.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 4 }}>
            <Typography
              variant="h4"
              color="primary"
              sx={{
                marginBottom: `16px`,
                fontWeight: 600,
              }}
            >
              - Ästhetische Maniküre & Nagelpflege
            </Typography>

            <Typography
              color="primary"
              component="p"
              sx={{
                marginBottom: 2,
                lineHeight: 1.7,
                paddingLeft: 2,
              }}
            >
              Ob klassische Maniküre, Gel oder minimalistische Nail Art - wir gestalten gepflegte Hände mit Stil und Gefühl für Details.
              Unsere Manikürebehandlungen vereinen Hautpflege, Nagelästhetik und Entspannung auf höchstem Niveau.
            </Typography>
          </Box>

          <Divider
            sx={{
              my: 4,
              backgroundColor: `primary.main`,
              opacity: 0.3,
            }}
          />

          <Typography
            variant="h3"
            color="primary"
            sx={{
              marginBottom: `16px`,
              fontWeight: 600,
            }}
          >
            Weitere Leistungen:
          </Typography>

          <List sx={{ marginBottom: 4 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  color: `primary.main`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: `.7rem` }} />
              </ListItemIcon>

              <ListItemText>
                Sanfte Gesichtsbehandlungen & Pflege
              </ListItemText>
            </ListItem>

            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  color: `primary.main`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: `.7rem` }} />
              </ListItemIcon>

              <ListItemText>
                Wimpern- und Augenbrauenstyling
              </ListItemText>
            </ListItem>

            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  color: `primary.main`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: `.7rem` }} />
              </ListItemIcon>

              <ListItemText>
                Entspannende Atmosphäre mit exklusiven Produkten
              </ListItemText>
            </ListItem>
          </List>

          <Divider
            sx={{
              my: 4,
              backgroundColor: `primary.main`,
              opacity: 0.3,
            }}
          />

          <Typography
            variant="h3"
            color="primary"
            sx={{
              marginBottom: `16px`,
              fontWeight: 600,
            }}
          >
            Warum MOOD?
          </Typography>

          <List sx={{ marginBottom: 4 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  color: `primary.main`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: `.7rem` }} />
              </ListItemIcon>
              <ListItemText>
                Spezialisierung auf Permanent Make-up München & Maniküre München
              </ListItemText>
            </ListItem>

            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  color: `primary.main`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: `.7rem` }} />
              </ListItemIcon>
              <ListItemText>
                Moderne Techniken & hochwertige Materialien
              </ListItemText>
            </ListItem>

            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  color: `primary.main`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: `.7rem` }} />
              </ListItemIcon>
              <ListItemText>
                Individuelle Beratung & natürliche Ergebnisse
              </ListItemText>
            </ListItem>

            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  color: `primary.main`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: `.7rem` }} />
              </ListItemIcon>
              <ListItemText>
                Hygienisch einwandfreie Arbeitsweise
              </ListItemText>
            </ListItem>

            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  color: `primary.main`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: `.7rem` }} />
              </ListItemIcon>
              <ListItemText>
                Minimalistisches, stilvolles Studioambiente
              </ListItemText>
            </ListItem>
          </List>

          <Divider
            sx={{
              my: 4,
              backgroundColor: `primary.main`,
              opacity: 0.3,
            }}
          />

          <Typography
            color="primary"
            component="p"
            sx={{
              lineHeight: 1.7,
              textAlign: `center`,
              fontStyle: `italic`,
              marginTop: 4,
            }}
          >
            MOOD ist mehr als ein Kosmetikstudio - es ist Ihr Raum für Ruhe, Schönheit und Persönlichkeit.
            <br />
            Erleben Sie, wie präzise Ästhetik und echtes Wohlgefühl zusammenwirken.
          </Typography>

          <Typography
            color="primary"
            component="p"
            sx={{
              lineHeight: 1.7,
              textAlign: `center`,
              fontWeight: 600,
              marginTop: 3,
            }}
          >
            Willkommen bei MOOD - Ihrem Studio für Permanent Make-up & Maniküre in München.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
