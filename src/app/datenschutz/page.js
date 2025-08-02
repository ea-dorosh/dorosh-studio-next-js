import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export const metadata = {
  title: "Datenschutzerklärung - MOOD BEAUTY | Natalia Dorosh",
  description: "Datenschutzerklärung und Informationen zum Schutz Ihrer Daten bei MOOD BEAUTY München",
};

const listItemStyle = {
  display: 'list-item',
  listStyleType: 'disc',
  marginLeft: 2,
  padding: 0,
  paddingLeft: 1,
};

const headlineH2Style = {
  mt: 4,
  mb: 2,
  fontSize: `20px !important`,
  fontWeight: `bold`,
  fontFamily: `"Montserrat", sans-serif`,
};

const headlineH3Style = {
  mt: 3,
  mb: 1,
  fontSize: `18px !important`,
  fontWeight: `bold`,
  fontFamily: `"Montserrat", sans-serif`,
};

const body2Style = {
  mb: 2,
  fontSize: 16,
};

export default function DatenschutzPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h1" gutterBottom fontSize={28}>
          Datenschutzerklärung
        </Typography>

        {/* Section 1 */}
        <Box>
          <Typography variant="h2" sx={headlineH2Style}>
            1. Verantwortlicher und Datenschutzbeauftragter
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            1.1 Verantwortlicher
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Natalia Dorosh<br />
            Otl-Aicher Str. 46<br />
            80807 München<br />
            E-Mail: moodbeauty.de@gmail.com
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            1.2 Datenschutzbeauftragter
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Nicht bestellt
          </Typography>
        </Box>

        {/* Section 2 */}
        <Box>
          <Typography variant="h2" sx={headlineH2Style}>
            2. Hosting & Auftragsverarbeitung
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            2.1 Hosting
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Unsere Website (https://moodbeauty.de) und unsere interne CRM (Node.js-Backend mit MySQL) laufen auf
            Servern von <b>Amazon Web Services (AWS)</b> in der Region <b>Frankfurt (eu-central-1)</b>.
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            2.2 Auftragsverarbeitung
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Als Auftragsverarbeiter fungiert<br />
            Amazon Web Services, Inc., EMEA SARL,<br />
            38 avenue John F. Kennedy,<br />
            L-1855 Luxembourg.<br />
            Ein <b>AWS Data Processing Addendum (DPA)</b> ist Teil der AWS Customer Agreement und kann in der
            AWS-Konsole unter <b>Artifact → Agreements → AWS Data Processing Addendum</b> eingesehen werden.
          </Typography>

          <Typography variant="h3" sx={headlineH3Style}>
            2.3 Content Delivery Network (CDN) und Website-Sicherheit
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Wir verwenden die Dienste der <b>Cloudflare Germany GmbH</b>, Rosental 7, c/o Mindspace, 80331 München für:
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="Content Delivery Network (CDN)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="DDoS-Schutz und Website-Sicherheit" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="DNS-Services" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Performance-Optimierung" /></ListItem>
          </List>
          <Typography variant="body2" sx={body2Style}>
            Dabei werden folgende Daten verarbeitet:
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="IP-Adresse des Besuchers" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Browser-Informationen (User-Agent)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Referrer-URL" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Zeitstempel des Zugriffs" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="HTTP-Request-Daten" /></ListItem>
          </List>
          <Typography variant="body2" sx={body2Style}>
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an schneller, sicherer und stabiler Website-Bereitstellung)<br />
            <b>Aufbewahrungsdauer:</b> Log-Daten werden von Cloudflare nach maximal 30 Tagen gelöscht<br />
            <b>Datenübertragung in Drittländer:</b> Die Datenübertragung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework und angemessener Garantien gemäß Art. 46 DSGVO. Cloudflare ist nach dem EU-US Data Privacy Framework zertifiziert.
          </Typography>
        </Box>

        {/* Section 3 */}
        <Box>
          <Typography variant="h2" sx={headlineH2Style}>
            3. Verarbeitung Ihrer Daten in unserem CRM-System
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            3.1 Kategorien personenbezogener Daten
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Wir speichern in unserem internen CRM-System die folgenden Daten:
          </Typography>

          <Typography variant="h3" sx={headlineH3Style}>
            Kundendaten
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="Vor- und Nachname (first_name, last_name)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="E‑Mail-Adresse (email)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Telefonnummer (phone)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Optional: Adresse (Straße, PLZ, Ort, Land) - nur für Rechnungsstellung" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Aufnahmedatum (added_date)" /></ListItem>
          </List>

          <Typography variant="h3" sx={headlineH3Style}>
            Termindaten
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="Termin-ID (id)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Datum und Uhrzeit (date, time_start, time_end)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Leistung (service_name, service_duration)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Verweis auf Kunde (customer_id) und Duplikate (customer_first_name, customer_last_name, customer_email, customer_phone)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Status des Termins (status)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Nachricht / Gesamtsumme (order_message, order_total)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Google Calendar Event (google_calendar_event_id)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Standort (location, location_id)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Erstellt am (created_date)" /></ListItem>
          </List>

          <Typography variant="h3" sx={headlineH3Style}>
            3.2 Zwecke und Rechtsgrundlage
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="Durchführung des Vertrags und Erbringung der Leistungen (Art. 6 Abs. 1 lit. b DSGVO)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Verwaltung und Dokumentation von Terminen und Kundenkommunikation" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Rechnungsstellung gegenüber Kunden" /></ListItem>
          </List>

          <Typography variant="h3" sx={headlineH3Style}>
            3.3 Aufbewahrungsdauer
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="Aktive Daten: solange Vertragsverhältnis besteht" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Rechnungsrelevante Daten: 10 Jahre ab Ende des Kalenderjahres (Abgabenordnung)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Sonstige Korrespondenzdaten: 6 Jahre ab Ende des Kalenderjahres (Handelsgesetzbuch)" /></ListItem>
          </List>

          <Typography variant="h3" sx={headlineH3Style}>
            3.4 Zugriff auf die Daten
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Der Zugriff ist ausschließlich möglich für:<br />
            • die Betreiberin (Natalia Dorosh)<br />
            • autorisierte Mitarbeiter:innen des Salons
          </Typography>
        </Box>

        {/* Section 4: Website Processing */}
        <Box>
          <Typography variant="h2" sx={headlineH2Style}>
            4. Datenerfassung auf dieser Website
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            4.1 Server-Log-Dateien
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Unser Hosting-Provider erhebt und speichert automatisch Log-Daten (Browsertyp/-version, Betriebssystem, Referrer-URL, Hostname des Rechners, Uhrzeit der Anfrage, IP-Adresse).<br />
            Verarbeitung gem. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Sicherheit und Stabilität).
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            4.2 Kontaktformular
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Über unser Kontaktformular erhobene Daten (z.B. Name, E-Mail, Betreff, Nachricht) speichern wir zur Bearbeitung Ihrer Anfrage.<br />
            Verarbeitung gem. Art. 6 Abs. 1 lit. b DSGVO (Notwendigkeit zur Vertragserfüllung/Kommunikation).
          </Typography>
        </Box>

        {/* Section 5: Cookies */}
        <Box>
          <Typography variant="h2" sx={headlineH2Style}>
            5. Cookies
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            5.1 Technisch notwendige Cookies
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="cookieConsent (Speicherung Ihrer Cookie-Einwilligung)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Session-Cookies (Sitzungsmanagement)" /></ListItem>
          </List>
          <Typography variant="body2" sx={body2Style}>
            Verarbeitung gem. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Funktionalität).
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Sie können Cookies in Ihren Browsereinstellungen jederzeit deaktivieren; dies kann die Funktionalität der Website einschränken.
          </Typography>
        </Box>

        {/* Section 6: Your Rights */}
        <Box>
          <Typography variant="h2" sx={headlineH2Style}>
            6. Ihre Rechte
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="Auskunft (Art. 15 DSGVO)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Berichtigung (Art. 16 DSGVO)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Löschung (Art. 17 DSGVO)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Einschränkung der Verarbeitung (Art. 18 DSGVO)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Datenübertragbarkeit (Art. 20 DSGVO)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Widerruf von Einwilligungen (Art. 7 Abs. 3 DSGVO)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)" /></ListItem>
          </List>
          <Typography variant="body2" sx={body2Style}>
            Zur Ausübung Ihrer Rechte senden Sie bitte eine E-Mail an: moodbeauty.de@gmail.com
          </Typography>
        </Box>

        {/* Section 7: Update */}
        <Box>
          <Typography variant="h2" sx={headlineH2Style}>
            7. Aktualisierung
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Diese Datenschutzerklärung wird bei Bedarf, spätestens jedoch einmal jährlich, überprüft und aktualisiert.<br />
            Datum letzte Aktualisierung: 02.08.2025
          </Typography>
        </Box>

      </Box>
    </Container>
  );
}