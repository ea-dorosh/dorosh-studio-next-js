import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import CategoriesList from "@/components/BookingForm/CategoriesList";
import servicesService from "@/services/services.service";

export const metadata = {
  title: "Online Termin buchen - Dorosh Studio München",
  description: "Buchen Sie Ihren Termin für Permanent Make-Up, Nail Art und andere Schönheitsbehandlungen in München. Kostenlose Beratung verfügbar.",
  keywords: "Termin buchen, Permanent Make-Up München, Nail Art München, Schönheitsbehandlung, Online Buchung",
  openGraph: {
    title: "Online Termin buchen - Dorosh Studio München",
    description: "Buchen Sie Ihren Termin für Permanent Make-Up, Nail Art und andere Schönheitsbehandlungen in München.",
    type: "website",
  },
};

export default async function BookingPage() {
  const categories = await servicesService.getServices();

  return (
    <Box bgcolor="background.default">
      <Container>
        <Box
          sx={{
            display: `flex`,
            flexDirection: `column`,
            padding: `30px 0 10px 0`,
          }}
        >
          <Typography
            color="primary"
            sx={{
              textAlign: `center`,
              fontSize: `1.2rem !important`,
            }}
            variant="h1"
          >
            Für welche Prozedur möchten Sie sich anmelden?
          </Typography>

          <CategoriesList categories={categories} />
        </Box>
      </Container>
    </Box>
  );
}
