import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export const metadata = {
  title: `Datenschutzerklärung - MOOD BEAUTY | Natalia Dorosh`,
  description: `Datenschutzerklärung und Informationen zum Schutz Ihrer Daten bei MOOD BEAUTY München`,
};

export default function DatenschutzPage() {
  const listItemStyle = {
    display: `list-item`,
    listStyleType: `disc`,
    marginLeft: 2,
    padding: 0,
    paddingLeft: 2,
    width: `calc(100% - 16px)`,
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{
        maxWidth: 800,
        mx: `auto`, 
      }}>
        <Typography variant="h1" gutterBottom fontSize={28}>
          Datenschutzerklärung
        </Typography>

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
            E-Mail: <span suppressHydrationWarning>moodbeauty.de@gmail.com</span>
          </Typography>
          <Typography variant="h3" sx={headlineH3Style}>
            1.2 Datenschutzbeauftragter
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Nicht bestellt
          </Typography>
        </Box>

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
            Wir verwenden die Dienste der <b>Cloudflare, Inc.</b>, 101 Townsend Street, San Francisco, CA 94107, USA für:
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

          <Typography variant="h3" sx={headlineH3Style}>
            2.4 Soziale Netzwerke und Messaging-Dienste
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Wir nutzen verschiedene Kommunikationskanäle für Kundenanfragen und Terminbuchungen:
          </Typography>

          <Typography variant="h4" sx={{
            ...headlineH3Style,
            fontSize: `16px !important`,
            mt: 2,
            mb: 1, 
          }}>
            WhatsApp Business
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            <b>Anbieter:</b> Meta Platforms Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland<br />
            <b>Datenverarbeitung:</b> Nachrichten, Telefonnummern, Profilbilder, Zeitstempel<br />
            <b>Zweck:</b> Kundenbetreuung, Terminanfragen und -bestätigungen<br />
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kundenkommunikation)
          </Typography>

          <Typography
            variant="h4"
            sx={{
              ...headlineH3Style,
              fontSize: `16px !important`,
              mt: 2,
              mb: 1,
            }}
          >
            Instagram und Facebook
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            <b>Anbieter:</b> Meta Platforms Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland<br />
            <b>Datenverarbeitung:</b> Nachrichten, Benutzernamen, Profilangaben, Interaktionen<br />
            <b>Zweck:</b> Kundenbetreuung, Terminanfragen, Präsentation unserer Dienstleistungen<br />
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Kundenkommunikation und Marketing)
          </Typography>

          <Typography variant="body2" sx={body2Style}>
            <b>Datenübertragung in Drittländer:</b> Meta-Dienste übertragen Daten in die USA auf Grundlage von Standardvertragsklauseln und angemessenen Garantien gemäß Art. 46 DSGVO.<br />
            <b>Aufbewahrungsdauer:</b> Kommunikationsdaten werden solange gespeichert, bis Sie um Löschung bitten oder kein berechtigtes Interesse an der Aufbewahrung mehr besteht. Relevante Kundendaten können in unser CRM-System übertragen werden.<br />
            <b>Datenschutzerklärung von Meta:</b> https://www.facebook.com/privacy/policy/
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
            <ListItem sx={listItemStyle}><ListItemText primary="Versendung von Terminbestätigungen und -erinnerungen per E-Mail" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Versendung von SMS-Erinnerungen bei Bedarf (z.B. bei nicht erreichbaren Kunden)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Information über Terminänderungen oder -absagen" /></ListItem>
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
          <Typography variant="h3" sx={headlineH3Style}>
            4.3 E-Mail- und SMS-Kommunikation
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Wir verwenden Ihre Kontaktdaten für folgende geschäftliche Kommunikation:
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="Terminbestätigungen per E-Mail" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Erinnerungen an bevorstehende Termine per E-Mail oder SMS" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Mitteilungen über Terminänderungen oder -absagen" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="SMS-Erinnerungen bei besonderen Umständen (z.B. wenn telefonisch nicht erreichbar)" /></ListItem>
          </List>
          <Typography variant="body2" sx={body2Style}>
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an ordnungsgemäßer Terminverwaltung)<br />
            <b>SMS-Versand:</b> Erfolgt über unsere eigenen Mobilgeräte oder Standard-SMS-Dienste ohne Weitergabe an Dritte<br />
            <b>Widerspruch:</b> Sie können jederzeit per E-Mail an <span suppressHydrationWarning>moodbeauty.de@gmail.com</span> der Zusendung von Erinnerungen widersprechen
          </Typography>

          <Typography variant="h3" sx={headlineH3Style}>
            4.4 QR-Code-Tracking
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Wir verwenden anonyme QR-Code-Verfolgung zur Analyse der Nutzung unserer Marketing-Materialien:
          </Typography>
          <List>
            <ListItem sx={listItemStyle}><ListItemText primary="Anzahl der QR-Code-Scans (ohne Personenbezug)" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Zeitstempel des Scans" /></ListItem>
            <ListItem sx={listItemStyle}><ListItemText primary="Quelle des QR-Codes (z.B. 'public' für öffentliche Materialien)" /></ListItem>
          </List>
          <Typography variant="body2" sx={body2Style}>
            <b>Zweck:</b> Statistische Auswertung der Wirksamkeit unserer Marketing-Materialien<br />
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Marketing-Analyse)<br />
            <b>Datenart:</b> Ausschließlich anonyme, nicht-personenbezogene Statistikdaten<br />
            <b>Aufbewahrungsdauer:</b> 12 Monate für statistische Zwecke
          </Typography>

          <Typography variant="h3" sx={headlineH3Style}>
            4.5 Google Web Fonts
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            Diese Website nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
          </Typography>
          <Typography variant="body2" sx={body2Style}>
            <b>Anbieter:</b> Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA<br />
            <b>Datenverarbeitung:</b> IP-Adresse, Browser-Informationen (User-Agent), Referrer-URL, Zeitstempel<br />
            <b>Zweck:</b> Einheitliche Darstellung von Schriftarten auf unserer Website<br />
            <b>Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an ansprechender Website-Gestaltung)<br />
            <b>Datenübertragung in Drittländer:</b> Die Datenübertragung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework und angemessener Garantien gemäß Art. 46 DSGVO<br />
            <b>Datenschutzerklärung von Google:</b> https://policies.google.com/privacy
          </Typography>
        </Box>

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
            Zur Ausübung Ihrer Rechte senden Sie bitte eine E-Mail an: <span suppressHydrationWarning>moodbeauty.de@gmail.com</span><br />
            <b>Löschung von Daten:</b> Wenn Sie die Löschung Ihrer personenbezogenen Daten wünschen, teilen Sie uns dies per E-Mail mit dem Betreff "Datenlöschung" mit. Wir bearbeiten Ihren Antrag innerhalb von 30 Tagen, vorbehaltlich gesetzlicher Aufbewahrungspflichten.
          </Typography>
        </Box>

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
