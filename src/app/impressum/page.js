import { Container, Typography, Box } from '@mui/material';
import React from 'react';

export const metadata = {
  title: "Impressum - MOOD BEAUTY | Natalia Dorosh",
  description: "Impressum und rechtliche Informationen zu MOOD BEAUTY München",
};

export const dynamic = 'force-dynamic';

export default function ImpressumPage() {

  const containerStyle = { py: 4 };
  const innerBoxStyle = { maxWidth: 800, mx: 'auto' };
  const titleStyle = { fontSize: 28, mb: 2 };
  const sectionHeadingStyle = {
    mt: 4,
    mb: 2,
    fontSize: '20px !important',
    fontWeight: 'bold',
    fontFamily: '"Montserrat", sans-serif',
  };
  const bodyTextStyle = { mb: 2, fontSize: 16 };

  return (
    <Container maxWidth="lg" sx={containerStyle}>
      <Box sx={innerBoxStyle}>
        <Typography variant="h1" sx={titleStyle}>
          Impressum
        </Typography>

        <Typography variant="h2" sx={sectionHeadingStyle}>
          Angaben gemäß § 5 TMG
        </Typography>
        <Typography variant="body1" sx={bodyTextStyle}>
          MOOD BEAUTY<br />
          Natalia Dorosh<br />
          Otl-Aicher-Str. 46<br />
          80807 München<br />
          Deutschland
        </Typography>

        <Typography variant="h2" sx={sectionHeadingStyle}>
          Kontakt
        </Typography>
        <Typography variant="body1" sx={bodyTextStyle}>
          Telefon: 0152 073 89 443<br />
          E-Mail: moodbeauty.de@gmail.com
        </Typography>

        <Typography variant="h2" sx={sectionHeadingStyle}>
          Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV
        </Typography>
        <Typography variant="body1" sx={bodyTextStyle}>
          Natalia Dorosh<br />
          Otl-Aicher-Str. 46, 80807 München<br />
          Deutschland
        </Typography>

        <Typography variant="h2" sx={sectionHeadingStyle}>
          Umsatzsteuer-Identifikationsnummer
        </Typography>
        <Typography variant="body1" sx={bodyTextStyle}>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: <strong>DE14420320346</strong>
        </Typography>

        <Typography variant="h2" sx={sectionHeadingStyle}>
          Berufsbezeichnung und berufsrechtliche Regelungen
        </Typography>
        <Typography variant="body1" sx={bodyTextStyle}>
          Berufsbezeichnung: Permanent Make-Up Artist<br />
          Verliehen in: Deutschland<br />
          Kammerzugehörigkeit: nicht anwendbar<br />
          Berufsrechtliche Regelungen: Tätigkeit im Rahmen der Handwerksordnung
        </Typography>

        <Typography variant="h2" sx={sectionHeadingStyle}>
          EU-Streitschlichtung
        </Typography>
        <Typography variant="body1" sx={bodyTextStyle}>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.<br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </Typography>

        <Typography variant="h2" sx={sectionHeadingStyle}>
          Verbraucherstreitbeilegung/<br />Universalschlichtungsstelle
        </Typography>
        <Typography variant="body1" sx={bodyTextStyle}>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </Typography>
      </Box>
    </Container>
  );
}
