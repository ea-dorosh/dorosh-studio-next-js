import { FiberManualRecord as FiberManualRecordIcon } from '@mui/icons-material';
import {
  Box,
  Container,
  ListItem,
  Typography,
  List,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export default function AboutSection() {

  return (
    <Box
      bgcolor="background.default"
      component="section"
      sx={{
        padding: `32px 0`,
        maxWidth: `1200px`,
        margin: `0 auto`,
      }}
    >
      <Container sx={{ maxWidth: `100%` }}>
        <Box
          sx={{
            position: `relative`,
            width: {
              xs: `82%`,
              md: `60%`,
              lg: `48%`,
            },
            margin: `0 auto`,
            aspectRatio: `1/1`,
            maxWidth: {
              xs: `520px`,
              md: `420px`,
              lg: `360px`,
            },
          }}
        >
          <OptimizedImage
            src="/images/promo-image.avif"
            alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 350px"
            quality={85}
            style={{
              objectFit: `cover`,
              borderRadius: `12px`,
            }}
          />
        </Box>
        <Typography
          variant="h2"
          color="primary"
          sx={{
            textAlign: `center`,
            marginTop: `28px`,
          }}
        >
          Über MOOD
        </Typography>

        <Box
          sx={{
            maxWidth: {
              xs: `100%`,
              md: `800px`,
              lg: `900px`,
            },
            margin: `0 auto`,
          }}
        >
          <Typography
            color="primary"
            component="p"
            marginTop={2}
            sx={{
              lineHeight: `1.6`,
            }}
          >
            MOOD ist mehr als ein Beautystudio - es ist ein Raum für Stimmung, Pflege und Ästhetik.
            <br />
            <br />
            Wir glauben, dass Schönheit kein Standard ist.
            Sie ist ein Gefühl, ein Zustand, ein Spiegel deines inneren Rhythmus.
          </Typography>

          <Typography
            color="primary"
            component="p"
            marginTop={2}
            sx={{
              lineHeight: `1.6`,
            }}
          >
            Im MOOD Beauty Studio schaffen wir ein individuelles Erlebnis für jede Kundin und jeden Kunden:
          </Typography>

          <List
            sx={{
              maxWidth: {
                xs: `100%`,
                md: `600px`,
              },
              margin: `0 auto`,
            }}
          >
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
                Permanent Make-up
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
                Professionelle Hautpflege
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
                Ästhetische Maniküre und Pediküre
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
                Augenbrauen- und Wimpernstyling
              </ListItemText>
            </ListItem>
          </List>

          <Typography
            color="primary"
            component="p"
            sx={{
              lineHeight: `1.6`,
            }}
          >
            - in einer ruhigen, makellos sauberen und inspirierenden Atmosphäre.
          </Typography>


          <Typography
            color="primary"
            component="p"
            marginTop={2}
            sx={{
              lineHeight: `1.6`,
            }}
          >
            Worauf wir besonderen Wert legen:
          </Typography>

          <List
            sx={{
              maxWidth: {
                xs: `100%`,
                md: `600px`,
              },
              margin: `0 auto`,
            }}
          >
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
                Höchste Hygienestandards
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
                Qualitativ hochwertige Produkte
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
                Minimalistisches, durchdachtes Design
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
                Und vor allem: dein Wohlbefinden.
              </ListItemText>
            </ListItem>
          </List>

          <Typography
            color="primary"
            component="p"
            marginTop={2}
            sx={{
              lineHeight: `1.6`,
            }}
          >
            MOOD folgt keinen Trends.<br />
            MOOD folgt dir - und dem Gefühl, das du heute leben willst.
            <br />
            <br />
            Willkommen in deiner Stimmung.
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: `center`,
            marginTop: 4,
          }}
        >
          <Button
            component={Link}
            href="/ueber-uns"
            variant="contained"
            color="primary"
            size="large"
          >
            Mehr über uns erfahren
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
