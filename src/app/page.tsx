import Link from "next/link";
import ContactSection from "@/components/ContactSection/ContactSection";
import HomeServices from "@/components/HomeServices/HomeServices";
import ParallaxHero from "@/components/Parallax/ParallaxHero";
import PricePreview from "@/components/PricePreview/PricePreview";
import UberMoodSection from "@/components/UberMoodSection/UberMoodSection";
import servicesService from "@/services/services.service";
import MosaicGallery from "@/components/MosaicGallery/MosaicGallery";

const GALLERY_IMAGES = [
  {
    src: `/images/services/nails/IMG_0189.avif`,
    alt: `Professionelle Maniküre Ergebnis - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0196.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0198.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0200.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0201.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0202.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0204.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0209.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0213.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0329.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0374.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
  {
    src: `/images/services/nails/IMG_0375.avif`,
    alt: `Gel-Lack Nägel Design - MOOD BEAUTY München`,
  },
];

export default async function HomePage() {
  const categories = await servicesService.getServices();

  return (
    <>
      {/* Hero Section — edge-to-edge on mobile */}
      <ParallaxHero
        src="/images/design/design_1.avif"
        alt="Eine Frau mit gepflegten Augenbrauen und Make-up"
        height="80vh"
      >
        <div className="h-full flex items-center justify-end md:justify-center flex-col gap-4 py-8 md:py-16 pb-14 md:pb-16 max-w-full px-4">
          <h1 className="heading-1 text-primary-contrast text-center leading-none tracking-[.06em]">
            MOOD
            <span className="block text-secondary font-normal tracking-[.02em] mt-2 text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem]">
              beauty studio in München
            </span>
          </h1>

          <div className="flex justify-center flex-col md:flex-row gap-4 items-center">
            <Link
              href="/services"
              className="btn btn-md btn-outline-white"
            >
              Services
            </Link>
            <Link
              href="/booking"
              className="btn btn-md btn-primary"
            >
              Termin
            </Link>
          </div>
        </div>
      </ParallaxHero>

      {/* Services section */}
      <HomeServices />

      {/* Gallery section */}
      <MosaicGallery
          images={GALLERY_IMAGES}
          title="Nägel"
        />

      {/* About section */}
      <UberMoodSection />

      {/* Price preview section */}
      <PricePreview categories={categories} />

      {/* Contact section */}
      <ContactSection />
    </>
  );
}
