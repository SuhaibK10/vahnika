import { Hero } from "@/components/home/Hero";
import { Bestsellers } from "@/components/home/Bestsellers";
import { Testimonials } from "@/components/home/Testimonials";
import {
  BedroomEditorial,
  PaletteRow,
  ServiceRow,
  SocialStrip,
} from "@/components/home/Sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Bestsellers />
      <PaletteRow />
      <BedroomEditorial />
      <Testimonials />
      <SocialStrip />
      <ServiceRow />
    </>
  );
}
