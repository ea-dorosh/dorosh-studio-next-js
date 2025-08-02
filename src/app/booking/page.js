import BookingFormContainer from "@/components/BookingForm/BookingFormContainer";
import servicesService from "@/services/services.service";

export const metadata = {
  title: "Online Termin buchen - MOOD BEAUTY München | Natalia Dorosh",
  description: "Buchen Sie Ihren Termin für Permanent Make-Up, Nail Art und andere Schönheitsbehandlungen in München. Kostenlose Beratung verfügbar.",
  keywords: "Termin buchen, Permanent Make-Up München, Nail Art München, Schönheitsbehandlung, Online Buchung, MOOD BEAUTY",
  openGraph: {
    title: "Online Termin buchen - MOOD BEAUTY München | Natalia Dorosh",
    description: "Buchen Sie Ihren Termin für Permanent Make-Up, Nail Art und andere Schönheitsbehandlungen in München.",
    type: "website",
  },
};

export default async function BookingPage() {
  const categories = await servicesService.getServices();

  return (
    <BookingFormContainer categories={categories} />
  );
}
