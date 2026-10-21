import { Hero } from "@/components/home/Hero";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import {
  BedroomEditorial,
  BedToBodyTeaser,
  CraftSection,
  GiftingSection,
  JournalPreview,
  PaletteRow,
  PrintLibraryTeaser,
  ServiceRow,
  SocialStrip,
  ValuesMarquee,
} from "@/components/home/Sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuesMarquee />
      <BedroomEditorial />
      <CollectionShowcase />
      <PrintLibraryTeaser />
      <PaletteRow />
      <CraftSection />
      <BedToBodyTeaser />
      <GiftingSection />
      <JournalPreview />
      <Testimonials />
      <SocialStrip />
      <ServiceRow />
    </>
  );
}
