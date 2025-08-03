import {FiberManualRecord as FiberManualRecordIcon} from '@mui/icons-material';
import {
  Box,
  Container,
  ListItem,
  Typography,
  List,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

export default function AboutSection() {

  return (
    <Box
      bgcolor="background.paper"
      component="section"
      sx={{
        padding: `24px 0`,
      }}
    >
      <Container>
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            margin: '0 auto',
            aspectRatio: '1/1',
            maxWidth: '500px',
          }}
        >
          <OptimizedImage
            src="/images/promo-image.avif"
            alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
            fill
            sizes="(max-width: 768px) 80vw, 50vw"
            quality={85}
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Typography
          variant="h2"
          color="primary"
          sx={{
            fontSize: '2.2rem',
            textAlign: 'center',
            marginTop: `24px`,
          }}
        >
          Über MOOD
        </Typography>

        <Typography
          color="primary"
          component="p"
          marginTop={2}
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
        >
          Im MOOD Beauty Studio schaffen wir ein individuelles Erlebnis für jede Kundin und jeden Kunden:
        </Typography>

        <List>
          <ListItem sx={{padding: 0}}>
            <ListItemIcon sx={{minWidth: 0, mr: 1, color: `primary.main`}}>
              <FiberManualRecordIcon sx={{fontSize: `.7rem`}} />
            </ListItemIcon>
            <ListItemText>
              Permanent Make-up
            </ListItemText>
          </ListItem>

          <ListItem sx={{padding: 0}}>
            <ListItemIcon sx={{minWidth: 0, mr: 1, color: `primary.main`}}>
              <FiberManualRecordIcon sx={{fontSize: `.7rem`}} />
            </ListItemIcon>
            <ListItemText>
              Professionelle Hautpflege
            </ListItemText>
          </ListItem>

          <ListItem sx={{padding: 0}}>
            <ListItemIcon sx={{minWidth: 0, mr: 1, color: `primary.main`}}>
              <FiberManualRecordIcon sx={{fontSize: `.7rem`}} />
            </ListItemIcon>
            <ListItemText>
              Ästhetische Maniküre und Pediküre
            </ListItemText>
          </ListItem>

          <ListItem sx={{padding: 0}}>
            <ListItemIcon sx={{minWidth: 0, mr: 1, color: `primary.main`}}>
              <FiberManualRecordIcon sx={{fontSize: `.7rem`}} />
            </ListItemIcon>
            <ListItemText>
              Augenbrauen- und Wimpernstyling
            </ListItemText>
          </ListItem>
        </List>

        <Typography
          color="primary"
          component="p"
        >
          - in einer ruhigen, makellos sauberen und inspirierenden Atmosphäre.
        </Typography>


        <Typography
          color="primary"
          component="p"
          marginTop={2}
        >
          Worauf wir besonderen Wert legen:
        </Typography>

        <List>
          <ListItem sx={{padding: 0}}>
            <ListItemIcon sx={{minWidth: 0, mr: 1, color: `primary.main`}}>
              <FiberManualRecordIcon sx={{fontSize: `.7rem`}} />
            </ListItemIcon>
            <ListItemText>
              Höchste Hygienestandards
            </ListItemText>
          </ListItem>

          <ListItem sx={{padding: 0}}>
            <ListItemIcon sx={{minWidth: 0, mr: 1, color: `primary.main`}}>
              <FiberManualRecordIcon sx={{fontSize: `.7rem`}} />
            </ListItemIcon>
            <ListItemText>
              Qualitativ hochwertige Produkte
            </ListItemText>
          </ListItem>

          <ListItem sx={{padding: 0}}>
            <ListItemIcon sx={{minWidth: 0, mr: 1, color: `primary.main`}}>
              <FiberManualRecordIcon sx={{fontSize: `.7rem`}} />
            </ListItemIcon>
            <ListItemText>
              Minimalistisches, durchdachtes Design
            </ListItemText>
          </ListItem>

          <ListItem sx={{padding: 0}}>
            <ListItemIcon sx={{minWidth: 0, mr: 1, color: `primary.main`}}>
              <FiberManualRecordIcon sx={{fontSize: `.7rem`}} />
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
        >
          MOOD folgt keinen Trends.<br />
          MOOD folgt dir - und dem Gefühl, das du heute leben willst.
          <br />
          <br />
          Willkommen in deiner Stimmung.
        </Typography>

        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Button
            component={Link}
            href="/ueber-uns"
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'info.main',
              },
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Mehr über uns erfahren
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
