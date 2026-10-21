import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MEDIA } from "@/lib/media";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Emblem } from "@/components/Emblem";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Our Story",
  description: SITE.tagline,
};

const VALUES = [
  ["Pure, always", "Only cotton touches your skin. No polyester blends to trap heat, no shortcuts to save a rupee."],
  ["Rooted in craft", "Our prints draw on centuries of Jaipuri printing — redrawn with care, never copied carelessly."],
  ["Made to be lived in", "Bed linen for real homes: washed often, slept on daily, climbed on by children and the occasional cat."],
  ["Honest by design", "Fair, everyday prices. Real photographs. Clear policies. No countdown timers, ever."],
];

const PROCESS = [
  { step: "Drawn", text: "Each print begins as a story — a garden, a window, a season — and is drawn and coloured for the way Indian homes look today.", image: PRODUCTS[0].images[2] },
  { step: "Printed", text: "Patterns are printed onto pure cotton in the printing traditions of Rajasthan, so colour sits crisply in the weave.", image: MEDIA.printingBlocks },
  { step: "Finished", text: "Sheets are finished, checked and paired with matching pillow covers, then folded the way you'd fold them at home.", image: MEDIA.sheetFoldsWarm },
  { step: "Delivered", text: "Wrapped, boxed and sent free across India — ready to make the bed the same evening.", image: MEDIA.giftBox },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="under-header relative overflow-hidden bg-forest-950 text-ivory">
        {/* Shown at 40% under a dark overlay, so a lighter file is visually identical */}
        <Image src={MEDIA.hawaMahal} alt="The latticed facade of the Hawa Mahal in Jaipur" fill priority sizes="(min-width: 1024px) 100vw, 50vw" placeholder="blur" className="object-cover object-[50%_30%] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/30" />
        <div className="container-x relative flex min-h-[86svh] flex-col justify-end pb-20 pt-32 lg:pb-28">
          <p className="animate-fade-up eyebrow text-gold">Our story</p>
          <h1 className="animate-fade-up display-xl mt-6 max-w-5xl font-light [animation-delay:150ms]">
            Designed in India, for everyday comfort and <em className="text-gold-soft">quiet elegance.</em>
          </h1>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold-deep">What we believe</p>
            <h2 className="display-lg mt-5 font-light">
              Luxury should feel <em className="text-forest-700">quiet.</em>
            </h2>
          </Reveal>
          <Reveal className="space-y-6 text-[1.08rem] leading-[1.9] text-ink/75 lg:col-span-6 lg:col-start-7" delay={150}>
            <p>
              Vahnika began with a simple frustration. Beautiful Indian bed linen was either precious and out of reach, or
              affordable and loud — shiny polyester, garish colours, prints that shouted across the room.
            </p>
            <p>
              We wanted something in between: the craft and colour of a Jaipur heritage hotel, at a price you don&apos;t
              have to think twice about. Pure cotton that breathes through an Indian summer. Prints with names and
              stories. A bed you look forward to at the end of a long day.
            </p>
            <p className="font-display text-[1.7rem] italic leading-snug text-forest-700">
              Nothing loud, nothing hurried — just the quiet luxury of a well-made bed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The emblem */}
      <section className="grain relative overflow-hidden bg-forest-900 py-24 text-ivory lg:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <div className="relative grid aspect-square w-full max-w-[420px] place-items-center rounded-full bg-forest-800">
              <span className="absolute inset-6 rounded-full border border-gold/30" />
              <Emblem className="w-[78%]" vColor="#F5EFE6" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-gold">The emblem</p>
            <h2 className="display-lg mt-5 font-light">
              A <em className="text-gold-soft">V</em> that holds a seedling.
            </h2>
            <p className="mt-6 text-[1.05rem] leading-[1.9] text-ivory/72">
              Our mark is a V cradling two young leaves, inside a single golden ring. It stands for the things we care
              about most: growth, patience and care — the slow way good things are made. The emerald is the colour of a
              courtyard garden after rain; the gold, the lamp that is lit at dusk.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-32">
        <div className="container-x">
          <Reveal className="text-center">
            <p className="eyebrow text-gold-deep">Our promises</p>
            <h2 className="display-lg mt-4 font-light">Four things we <em className="text-forest-700">won&apos;t compromise</em></h2>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100} className="rounded-t-full bg-paper px-8 pb-10 pt-20 text-center">
                <p className="font-display text-4xl italic text-gold-deep">0{i + 1}</p>
                <p className="mt-5 font-display text-[1.8rem] leading-tight">{t}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-deep">From sketch to sheet</p>
            <h2 className="display-lg mt-4 font-light">How a Vahnika print <em className="text-forest-700">comes home</em></h2>
          </Reveal>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 120}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
                  <Image src={p.image} alt="" fill sizes="(min-width:1024px) 22vw, 45vw" placeholder="blur" className="object-cover" />
                </div>
                <p className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-xl italic text-gold-deep">0{i + 1}</span>
                  <span className="font-display text-[2rem] leading-none">{p.step}</span>
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-950 text-ivory">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px]">
            <Image src={MEDIA.jharokha} alt="Carved sandstone jharokha windows in Rajasthan" fill sizes="(min-width:1024px) 50vw, 100vw" placeholder="blur" className="object-cover" />
          </div>
          <Reveal className="grain flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-20">
            <p className="eyebrow text-gold">Rooted in Jaipur</p>
            <h2 className="display-lg mt-5 font-light">The pink city&apos;s <em className="text-gold-soft">long memory</em></h2>
            <p className="mt-6 text-[1.05rem] leading-[1.9] text-ivory/72">
              Outside Jaipur, the towns of Sanganer and Bagru have printed cloth for centuries. Their florals, lattices
              and borders once travelled the world as chintz and calico. Our prints are a love letter to that vocabulary
              — redrawn for the homes we live in now.
            </p>
            <Link href="/journal/a-short-story-of-the-jaipuri-print" className="link-underline mt-8 inline-flex items-center gap-2 self-start pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-gold-soft">
              A short story of the Jaipuri print <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 text-center lg:py-32">
        <Reveal className="container-x flex flex-col items-center">
          <Emblem className="h-16 w-16" vColor="#1A4D3C" />
          <h2 className="display-lg mt-8 max-w-3xl font-light">
            Come home to a bed <em className="text-forest-700">worth slowing down for.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn btn-forest">Shop the collection <ArrowIcon /></Link>
            <Link href="/prints" className="btn btn-ghost-dark">Explore the prints</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
