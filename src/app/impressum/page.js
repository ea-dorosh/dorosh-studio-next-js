import { Container, Typography, Box } from '@mui/material';

export const metadata = {
  title: "Impressum - MOOD BEAUTY | Natalia Dorosh",
  description: "Impressum und rechtliche Informationen zu MOOD BEAUTY München",
};

export default function ImpressumPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h1" gutterBottom>
          Impressum
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          Angaben gemäß § 5 TMG
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          MOOD BEAUTY<br />
          Natalia Dorosh<br />
          Otl-Aicher-Str. 46<br />
          80807 München<br />
          Deutschland
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          Kontakt
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Telefon: 0152 073 89 443<br />
          E-Mail: moodbeauty.de@gmail.com
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          Berufsbezeichnung und berufsrechtliche Regelungen
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Berufsbezeichnung: Permanent Make-Up Artist<br />
          Verliehen in: Deutschland
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          EU-Streitschlichtung
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          Verbraucherstreitbeilegung/<br />Universalschlichtungsstelle
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </Typography>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
          <strong>Hinweis:</strong> Bitte ergänzen Sie die Platzhalter Otl-Aicher-Str. 46,
          80807 München und moodbeauty.de@gmail.com mit Ihren tatsächlichen Daten.
        </Typography>
      </Box>
    </Container>
  );
}