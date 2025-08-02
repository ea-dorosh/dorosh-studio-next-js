import { Container, Typography, Box } from '@mui/material';

export const metadata = {
  title: "Datenschutzerklärung - MOOD BEAUTY | Natalia Dorosh",
  description: "Datenschutzerklärung und Informationen zum Schutz Ihrer Daten bei MOOD BEAUTY München",
};

export default function DatenschutzPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h1" gutterBottom fontSize={28}>
          Datenschutzerklärung
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          1. Datenschutz auf einen Blick
        </Typography>

        <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Allgemeine Hinweise
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
          personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
          Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </Typography>

        <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Datenerfassung auf dieser Website
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
          Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Wie erfassen wir Ihre Daten?</strong><br />
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
          Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          2. Hosting
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
        </Typography>

        <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Externes Hosting
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser
          Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert.
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          3. Allgemeine Hinweise und Pflichtinformationen
        </Typography>

        <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Datenschutz
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der
          gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </Typography>

        <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Cookies
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Unsere Website verwendet Cookies. Bei Cookies handelt es sich um kleine Textdateien,
          die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Technisch notwendige Cookies:</strong><br />
          Diese Website verwendet ausschließlich technisch notwendige Cookies. Dazu gehört:
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, ml: 2 }}>
          • Cookie-Einverständnis (cookieConsent): Speichert Ihre Zustimmung zu unseren Cookies<br />
          • Session-Cookies: Ermöglichen die Grundfunktionen der Website
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Diese Cookies sind für das Funktionieren der Website erforderlich und können
          nicht deaktiviert werden.
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          4. Datenerfassung auf dieser Website
        </Typography>

        <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Server-Log-Dateien
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in
          so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
          Dies sind:
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, ml: 2 }}>
          • Browsertyp und Browserversion<br />
          • verwendetes Betriebssystem<br />
          • Referrer URL<br />
          • Hostname des zugreifenden Rechners<br />
          • Uhrzeit der Serveranfrage<br />
          • IP-Adresse
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
        </Typography>

        <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
          Kontaktformular
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
          aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten
          zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
        </Typography>

        <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
          5. Ihre Rechte
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger
          und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
          außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
        </Typography>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
          Diese Datenschutzerklärung wurde erstellt am {new Date().toLocaleDateString('de-DE')}.
          Bei Fragen zum Datenschutz kontaktieren Sie uns über die im Impressum angegebenen Kontaktdaten.
        </Typography>
      </Box>
    </Container>
  );
}