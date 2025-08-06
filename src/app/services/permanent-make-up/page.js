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
    google: "your-google-verification-code",
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
            Natürlicher Brauen-Look mit weicher Schattierung
            <br/>
            <br/>
            Powder Brows sind eine moderne Form des permanenten Augenbrauen-Make-ups. Die Technik erzeugt einen sanften, pudrigen Effekt - wie leicht geschminkt, aber dauerhaft gepflegt. Ideal bei ungleichmäßiger Form oder lückenhaften Brauen.
            <br/>
            <br/>
            Vorteile:
            <br/>
            • Zarter, natürlicher Look ohne harte Konturen
            <br/>
            • Farbton und Intensität werden individuell angepasst
            <br/>
            • Für alle Hauttypen geeignet
            <br/>
            • Hält 1,5–2 Jahre und verblasst gleichmäßig ohne Rückstände
            <br/>
            • Schmerzarm & hygienisch - perfekte Behandlung bei Mood Beauty in München
          </SubCategoryCardInfo>

          <SubCategoryCardInfo
            id="hairstroke"
            title="Hairstroke"
            price="350"
            imageSrc="/images/services-page/service-hairstroke.webp"
            imageAlt="Permanent Make-up Hairstroke Brows"
            detailsHref="/services/permanent-make-up/hairstroke"
          >
            Natürlich. Schmerzfrei.
            <br/>
            <br/>
            Hairstroke ist eine maschinelle Technik des permanenten Augenbrauen-Make-ups, bei der feine Linien wie echte Härchen pigmentiert werden - ganz ohne Hautschnitte.
            <br/>
            <br/>
            Warum Hairstroke?
            <br/>
            • Natürlicher Härchen-Effekt - kaum von echten Brauen zu unterscheiden
            <br/>
            • Keine Schnitte, keine Verletzungen, keine Narben
            <br/>
            • Schmerzarm und oberflächlich - ideal für empfindliche Haut
            <br/>
            • Farbe verblasst gleichmäßig und vollständig nach 1–1,5 Jahren
            <br/>
            • Sanfte Heilung - ohne Krusten oder Schwellung
          </SubCategoryCardInfo>

          <SubCategoryCardInfo
            id="velvet-lips"
            title="Velvet Lips"
            price="350"
            imageSrc="/images/services-page/service-lips.webp"
            imageAlt="Permanent Make-up Velvet Lips"
            detailsHref="/services/permanent-make-up/velvet-lips"
          >
            Natürliche Lippenfarbe - ganz ohne Schmerzen oder harte Konturen
            <br/>
            <br/>
            Velvet Lips ist eine sanfte Form des permanenten Lippen-Make-ups, bei der die Lippen wie zart getönt wirken. Kein starker Rand, kein &ldquo;geschminkter&rdquo; Look - nur gepflegte, ebenmäßige Farbe für jeden Tag.
            <br/>
            <br/>
            Warum Velvet Lips?
            <br/>
            • Oberflächliche Technik - nahezu schmerzfrei
            <br/>
            • Aquarellähnlicher Effekt ohne harte Linien
            <br/>
            • Ideal auch bei unscharfem Lippenrand
            <br/>
            • Große Farbauswahl - für jeden Geschmack
            <br/>
            • Hält 1,5–2 Jahre und verblasst rückstandslos
            <br/>
            • Schnelle Heilung - ohne starke Schwellung oder Krusten
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
