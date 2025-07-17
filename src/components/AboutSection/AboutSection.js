import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import Image from 'next/image';

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
        <Image
          src="/images/promo-image.avif"
          alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
          style={{
            width: `80%`,
            height: `auto`,
            display: `block`,
            margin: `0 auto`,
          }}
          width={512}
          height={512}
        />

        <Typography
          variant="h2"
          color="primary"
          sx={{
            fontSize: '2.2rem',
            textAlign: 'center',
            marginTop: `24px`,
          }}
        >
          Premium Permanent Make-Up in München von Natalia Dorosh
        </Typography>

        <Typography
          color="primary"
          component="p"
          marginTop={2}
        >
          Hochwertiges Permanent Make-Up durch die super TOP-Techniken ist endlich soweit in München.
        </Typography>

        <Typography
          color="primary"
          component="p"
          marginTop={2}
        >
          Ich heiße Natalia Dorosh & bin ausgebildete Permanent Make-Up Meisterin & Trainerin mit 8 jährigen Berufserfahrung.
        </Typography>

        <Typography
          color="primary"
          component="p"
          marginTop={2}
        >
          Nach der Behandlung braucht ihr NICHT mehr:
          <br/>
          30-40 Minuten im Bad beim Schminken zu verschwenden,
          <br/>
          euch die Sorgen um euren Make-Up Zustand  zu machen,
          <br/>
          regelmäßig eine neue Formkorrektur für die Augenbrauen machen zu lassen,
          <br/>
          ständig die Augenbrauen asymmetrisch nachzuzeichnen.
        </Typography>

        <Typography
          color="primary"
          component="p"
          marginTop={2}
        >
          2 stündige hochwertige Behandlung schenkt euch:
          <br/>
          alltägliches & natürlich wirkendes Make-Up,
          <br/>
          gepflegtes & frisches Gesicht 24 / 7,
          <br/>
          Hygeniemaßnahmen auf höchstem Neveau: Sterilisation & Sicherheit,
          <br/>
          leichte & schmerzfreie Technik.
        </Typography>
      </Container>
    </Box>
  );
}
