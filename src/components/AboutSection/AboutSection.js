import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function AboutSection() {

  return (
    <Box
      color="primary.main"
      bgcolor="primary.main"
      sx={{
        padding: `24px`,
      }}
    >
      <Typography
        variant="h2"
        color="secondary"
        sx={{
          fontSize: '2.2rem',
          textAlign: 'center',
        }}
      >
        Premium Permanent Make-Up in München von Natalia Dorosh
      </Typography>

      <Typography
        color="info.contrastText"
        variant="subtitle1"
        component="p"
        marginTop={2}
      >
        Hochwertiges Permanent Make-Up durch die super TOP-Techniken ist endlich soweit in München.
      </Typography>

      <Typography
        color="info.contrastText"
        variant="subtitle1"
        component="p"
        marginTop={2}
      >
        Ich heiße Natalia Dorosh & bin ausgebildete Permanent Make-Up Meisterin & Trainerin mit 6 jährigen Berufserfahrung.
      </Typography>

      <Typography
        color="info.contrastText"
        variant="subtitle1"
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
        color="info.contrastText"
        variant="subtitle1"
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
    </Box>
  );
}
