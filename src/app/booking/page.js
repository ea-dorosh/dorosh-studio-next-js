import BookingFormContainer from "@/components/BookingForm/BookingFormContainer";
import servicesService from "@/services/services.service";

// Revalidate every hour
export const revalidate = 3600; // 1 hour = 3600 seconds

export const metadata = {
  title: `Online Termin buchen - MOOD BEAUTY München | Natalia Dorosh`,
  description: `Buchen Sie Ihren Termin für Permanent Make-Up, Nail Art und andere Schönheitsbehandlungen in München. Kostenlose Beratung verfügbar.`,
  keywords: `Termin buchen, Permanent Make-Up München, Nail Art München, Schönheitsbehandlung, Online Buchung, MOOD BEAUTY`,
  openGraph: {
    title: `Online Termin buchen - MOOD BEAUTY München | Natalia Dorosh`,
    description: `Buchen Sie Ihren Termin für Permanent Make-Up, Nail Art und andere Schönheitsbehandlungen in München.`,
    type: `website`,
  },
};

async function trackQrScan(searchParams) {
  const source = searchParams?.source;

  if (source === `public`) {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}api/public/tracking/qr-scan`, {
        method: `POST`,
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          trackedAt: new Date().toISOString(),
          source: `server-side`,
        }),
      });
    } catch (error) {
      console.error(`QR tracking error:`, error);
    }
  }
}

export default async function BookingPage({ searchParams }) {
  const categories = await servicesService.getServices();
  await trackQrScan(searchParams);

  return (
    <BookingFormContainer categories={categories} />
  );
}
