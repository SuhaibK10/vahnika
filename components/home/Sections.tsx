import Image from "next/image";
import Link from "next/link";
import { MEDIA } from "@/lib/media";
import { PALETTES, PRODUCTS, getProduct } from "@/lib/products";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import {
  ArrowIcon,
  CottonIcon,
  InstagramIcon,
  ReturnIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/Icons";

/* ─────────────── The bedroom editorial ─────────────── */
export function BedroomEditorial() {
  return (
    <section className="overflow-hidden bg-paper pb-24 pt-10 lg:pb-40 lg:pt-14">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="mx-auto max-w-2xl text-center lg:col-span-6 lg:px-6">
          <p className="eyebrow text-gold-deep">The Vahnika way</p>
          <h2 className="display-lg mt-5 font-light text-ink">
            The bedroom is where <span className="font-semibold text-forest-700">life slows down.</span>
          </h2>
          <div className="mt-8 space-y-5 text-[1.03rem] leading-[1.85] text-ink/75">
            <p>
              It is where the day begins in half-light and ends in a whisper. Where chai goes cold beside an unfinished
              book, where children climb in after a bad dream and stay till sunrise, where Sunday afternoons quietly
              disappear.
            </p>
            <p>
              We design for that room. Pure cotton that breathes through Indian summers. Prints that carry the memory of
              Rajasthan&apos;s gardens and palaces. A softness that asks you to stay a little longer. Nothing loud,
              nothing hurried. Just the quiet luxury of a well-made bed.
            </p>
          </div>
          <Link href="/our-story" className="btn btn-ghost-dark mt-10">
            Our story <ArrowIcon />
          </Link>
        </Reveal>

        <div className="relative h-[460px] sm:h-[560px] lg:col-span-6 lg:h-[640px]">
          <div className="absolute right-[6%] top-0 h-[78%] w-[56%] rounded-t-full border border-gold/50" />
          <Reveal className="absolute left-0 top-[8%] w-[60%] -rotate-[4deg]" delay={100}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-25px_rgba(15,46,37,.45)]">
              <Image src={MEDIA.womanSunlitBed} alt="A woman resting in a sunlit bed among plants" fill sizes="(min-width:1024px) 30vw, 60vw" placeholder="blur" className="object-cover" />
            </div>
          </Reveal>
          <Reveal className="absolute right-0 top-[22%] w-[52%] rotate-[3deg]" delay={250}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full shadow-[0_30px_60px_-25px_rgba(15,46,37,.45)]">
              <Image src={MEDIA.familyBed2} alt="Parents and a baby relaxing together in bed" fill sizes="(min-width:1024px) 26vw, 52vw" placeholder="blur" className="object-cover" />
            </div>
          </Reveal>
          <Reveal className="absolute bottom-0 left-[14%] rounded-2xl bg-paper px-6 py-4 shadow-[0_20px_50px_-20px_rgba(15,46,37,.35)]" delay={400}>
            <p className="font-display text-xl italic text-forest-800">Sunday, 8:10 am.</p>
            <p className="text-xs text-muted">Nobody is in a hurry.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Shop by palette ─────────────── */
export function PaletteRow() {
  return (
    // Follows the collection on the same ivory ground, so the two read as one shopping band
    <section className="bg-ivory pb-12 lg:pb-16">
      <div className="container-x border-t border-sand pt-10 text-center lg:pt-12">
        <Reveal>
          <p className="eyebrow text-gold-deep">Shop by palette</p>
          <h2 className="display-md mx-auto mt-4 max-w-2xl font-light">
            A palette drawn from <em className="text-forest-700">the garden</em>
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-8 lg:gap-x-16">
          {PALETTES.map((pal, i) => (
            <Reveal key={pal.name} delay={i * 80}>
              <Link href={`/shop?palette=${pal.name}`} className="group flex flex-col items-center">
                <span className="relative block h-24 w-24 overflow-hidden rounded-full ring-2 ring-forest-700 transition-all duration-500 group-hover:ring-[3px] sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                  <Image src={pal.swatch} alt="" fill sizes="128px" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <span className="absolute inset-0 mix-blend-color opacity-30" style={{ background: pal.hex }} />
                </span>
                <span className="mt-4 font-display text-xl italic">{pal.name}</span>
                <span className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                  {(() => {
                    const n = PRODUCTS.filter((p) => p.palette.includes(pal.name)).length;
                    return `${n} ${n === 1 ? "print" : "prints"}`;
                  })()}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Social strip ─────────────── */
const UGC = [
  { src: getProduct("mor-bagh")!.images[0], alt: "Mor Bagh bedsheet" },
  { src: MEDIA.teaBookBed, alt: "Tea and a book in bed" },
  { src: getProduct("neela-jharokha")!.images[0], alt: "Neela Jharokha bedsheet" },
  { src: MEDIA.leafShadowPillow, alt: "Leaf shadow on a pillow" },
  { src: getProduct("gulabi-bagh")!.images[1], alt: "Gulabi Bagh pillow covers" },
  { src: MEDIA.readingPrintedBed, alt: "Reading on a printed bed" },
];

export function SocialStrip() {
  return (
    <section className="bg-paper pb-24 lg:pb-32">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col items-center text-center">
          <p className="font-display text-[2.2rem] italic text-forest-800">#SleepInVahnika</p>
          <a href={SITE.instagram} className="link-underline mt-2 inline-flex items-center gap-2 pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
            <InstagramIcon /> Follow @vahnika
          </a>
        </Reveal>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {UGC.map((u, i) => (
            <Reveal key={i} delay={i * 70}>
              <a href={SITE.instagram} className="group relative block aspect-square overflow-hidden rounded-xl border-2 border-forest-700">
                <Image src={u.src} alt={u.alt} fill sizes="(min-width:1024px) 16vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-forest-950/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-forest-950/40 group-hover:opacity-100">
                  <InstagramIcon width={26} height={26} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Service promises ─────────────── */
const SERVICES = [
  { Icon: CottonIcon, title: "100% cotton", text: "Breathable, skin-friendly, softer with every wash." },
  { Icon: TruckIcon, title: "Free shipping", text: "Complimentary delivery across India, dispatched in 48 hours." },
  { Icon: ShieldIcon, title: "Cash on delivery", text: "Pay by UPI, card or cash when it arrives." },
  { Icon: ReturnIcon, title: "Easy returns", text: "Not quite right? Exchange or return within 7 days." },
];

export function ServiceRow() {
  return (
    <section className="border-t border-sand bg-ivory">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4">
        {SERVICES.map(({ Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:gap-5 lg:text-left">
            <Icon className="h-9 w-9 shrink-0 text-forest-700" />
            <div className="mt-4 lg:mt-0">
              <p className="font-display text-[1.45rem] leading-none">{title}</p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
