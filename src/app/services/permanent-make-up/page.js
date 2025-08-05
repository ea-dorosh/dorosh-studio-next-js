import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import CategoryInfo from "@/components/CategoryInfo/CategoryInfo";
import SubCategoryCardInfo from "@/components/SubCategoryCardInfo/SubCategoryCardInfo";

export const metadata = {
  title: "Permanent Make-up München - MOOD BEAUTY | Powder Brows, Hairstroke, Velvet Lips",
  description: "Professionelles Permanent Make-up in München. Powder Brows, Hairstroke, Velvet Lips & Wimpernkranz. Natürliche Ergebnisse mit modernster Technik. Jetzt Termin vereinbaren!",
  keywords: "Permanent Make-up München, Powder Brows München, Hairstroke München, Velvet Lips München, Wimpernkranz München, Augenbrauen München, Lippenpigmentierung München, MOOD BEAUTY, Schönheitsstudio München, Natalia Dorosh",
  authors: [{ name: "Natalia Dorosh" }],
  creator: "Natalia Dorosh",
  publisher: "MOOD BEAUTY",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://moodbeauty.de"),
  alternates: {
    canonical: "/services/permanent-make-up",
  },
  openGraph: {
    title: "Permanent Make-up München - MOOD BEAUTY",
    description: "Professionelles Permanent Make-up in München. Powder Brows, Hairstroke, Velvet Lips & Wimpernkranz. Natürliche Ergebnisse mit modernster Technik.",
    url: "https://moodbeauty.de/services/permanent-make-up",
    siteName: "MOOD BEAUTY",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/images/services-page/service-brows.jpg",
        width: 1200,
        height: 630,
        alt: "Permanent Make-up Powder Brows München",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Permanent Make-up München - MOOD BEAUTY",
    description: "Professionelles Permanent Make-up in München. Powder Brows, Hairstroke, Velvet Lips & Wimpernkranz.",
    images: ["/images/services-page/service-brows.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Замените на ваш код
  },
};

export default async function CategoryPage() {
  return (
    <Box
      bgcolor="background.paper"
      component="section"
      sx={{
        paddingBottom: `32px`,
      }}
    >
      <Container>
        <Typography
          variant="h1"
          color="primary"
          sx={{
            textAlign: `center`,
            marginTop: `18px`,
            marginBottom: `18px`,
            textTransform: `uppercase`,
            fontSize: `2.5rem`,
          }}
        >
          Unsere Services
        </Typography>

        <CategoryInfo
          title="Permanent Make-up in München"
          subtitle="Natürliche Schönheit ohne Aufwand"
          description="Permanent Make-up in München ist eine einfache Möglichkeit, Ihre natürliche Schönheit zu unterstreichen und dabei täglich Zeit zu sparen. Im Studio Mood Beauty spezialisieren wir uns auf schonende, natürliche Techniken, die Ihre Gesichtszüge harmonisch betonen und sich nach 1,5 bis 2 Jahren vollständig und rückstandslos aus der Haut abbauen - ohne Flecken oder Farbveränderungen."
          services={[
            "Permanent Make-up für die Augenbrauen - sanftes Powder Brows und Soft Shading für eine natürlich volle Form",
            "Permanent Make-up für die Lippen - Aquarelltechnik mit dem Effekt von dezent getönten, \"geküssten Lippen\"",
            "Permanent Make-up für die Augenlider - feine Füllung des Wimpernkranzes für einen ausdrucksstarken, aber natürlichen Blick"
          ]}
          advantages={[
            "Maximale Natürlichkeit - niemand wird merken, dass es Permanent Make-up ist",
            "Der Farbstoff baut sich vollständig innerhalb von 1,5 bis 2 Jahren ab",
            "Ideal für alle, die natürliche Ergebnisse bevorzugen",
            "Keine Farbveränderungen im Laufe der Zeit",
            "Minimaler Heilungsprozess ohne Schorfbildung oder starke Schwellungen"
          ]}
          conclusion="Wir arbeiten ausschließlich mit zertifizierten, europäischen Pigmenten und halten höchste Hygienestandards ein. Jede Behandlung beginnt mit einer ausführlichen Beratung, bei der wir gemeinsam die passende Form und Farbe für Ihren Typ auswählen. Erleben Sie, wie es ist, jeden Tag frisch, gepflegt und natürlich schön auszusehen."
        />

        <Box
          sx={{
            display: `flex`,
            flexDirection: `column`,
            gap: `16px`,
            marginTop: `32px`,
          }}
        >
          <SubCategoryCardInfo
            id="powder-brows"
            title="Powder Brows"
            price="350"
            imageSrc="/images/services-page/service-brows.jpg"
            imageAlt="Permanent Make-up Powder Brows"
            detailsHref="/services/permanent-make-up/powder-brows"
          >
            Powder Brows, Pudertechnik, Ombre Brows. Hochwertiges Permanent Make-Up hält 1,5-2 Jahre & die Augenbrauen wirken sehr natürlich, sehen dicht und voll aus.
          </SubCategoryCardInfo>

          <SubCategoryCardInfo
            id="hairstroke"
            title="Hairstroke"
            price="350"
            imageSrc="/images/services-page/service-hairstroke.webp"
            imageAlt="Permanent Make-up Hairstroke Brows"
            detailsHref="/services/permanent-make-up/hairstroke"
          >
            Permanent Augenbrauen Make-Up in Haar Technik.
            <br/>
            Die natürlichste und realistischste Technik.
            <br/>
            Nicht zu verwechseln mit Microblading! Hairstroke - eine leichte, oberflächliche Technik ohne Hauttrauma
          </SubCategoryCardInfo>

          <SubCategoryCardInfo
            id="velvet-lips"
            title="Velvet Lips"
            price="350"
            imageSrc="/images/services-page/service-lips.webp"
            imageAlt="Permanent Make-up Velvet Lips"
            detailsHref="/services/permanent-make-up/velvet-lips"
          >
            Lippenpigmentierung.Velvet Lips, Nude Lips, Lipstick Effect Es sieht sehr harmonisch & natürlich aus.
            <br/>
            Schmerzfreie Behandlung. Auf jede Kundin tüchtig abgestimmte Pigmentfarbe & Formkorrektur.
          </SubCategoryCardInfo>

          <SubCategoryCardInfo
            id="wimpernkranz"
            title="Wimpernkranz"
            price="250"
            imageSrc="/images/services-page/service-wimpernkranz.webp"
            imageAlt="Permanent Make-up Wimpernkranz"
            detailsHref="/services/permanent-make-up/wimpernkranz"
          >
            Der Effekt eines frisch geöffneten Looks Schmerlos und sicher Bechandlung.
            <br/>
            <br/>
            Sterilisation, Qualität & Komfort.
          </SubCategoryCardInfo>
        </Box>
      </Container>
    </Box>
  );
}