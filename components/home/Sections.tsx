import Image from "next/image";
import Link from "next/link";
import { MEDIA } from "@/lib/media";
import { PALETTES, PRODUCTS, getProduct, type Product } from "@/lib/products";
import { ARTICLES } from "@/lib/journal";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Newsletter } from "@/components/Newsletter";
import {
  ArrowIcon,
  CottonIcon,
  GiftIcon,
  InstagramIcon,
  LeafIcon,
  ReturnIcon,
  ShieldIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/Icons";

/* ─────────────── Values marquee ─────────────── */
const VALUES = ["Pure cotton", "Jaipuri prints", "Breathable & soft", "Designed in India", "Named, never numbered", "Cash on delivery", "Easy 7-day returns"];

export function ValuesMarquee() {
  return (
    <div className="overflow-hidden border-y border-sand bg-paper py-6" aria-label="Our promises">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {VALUES.map((v) => (
              <span key={v} className="flex items-center whitespace-nowrap px-8 font-display text-[1.7rem] italic text-forest-800 lg:text-[2rem]">
                {v}
                <LeafIcon className="ml-16 h-4 w-4 text-gold" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── The bedroom editorial ─────────────── */
export function BedroomEditorial() {
  return (
    <section className="overflow-hidden bg-paper py-24 lg:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6 lg:pr-10">
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
              nothing hurried — just the quiet luxury of a well-made bed.
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

/* ─────────────── Print Library teaser ─────────────── */
const LIBRARY_PICKS = ["mor-bagh", "raat-rani", "neela-jharokha", "kairi-jaal", "saanjh"].map((s) => getProduct(s) as Product);

export function PrintLibraryTeaser() {
  return (
    <section className="grain relative overflow-hidden bg-forest-900 py-24 text-ivory lg:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_10%,#1f5a46_0%,transparent_55%)]" />
      <div className="container-x">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-gold">The Print Library</p>
            <h2 className="display-lg mt-5 font-light">
              Every print has <em className="text-gold-soft">a story.</em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[1.02rem] leading-relaxed text-ivory/70">
              Our prints are named, never numbered. Each one is drawn from a place, a season or a memory — the peacocks
              of a Rajput garden, the jasmine that blooms after dark, the arched windows of a Jaipur palace.
            </p>
            <Link href="/prints" className="link-underline mt-6 inline-flex items-center gap-2 pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-gold-soft">
              Enter the library <ArrowIcon />
            </Link>
          </div>
        </Reveal>

        <div className="no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
          {LIBRARY_PICKS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 110} className="w-[68vw] max-w-[300px] shrink-0 snap-start lg:w-auto lg:max-w-none">
              <Link href={`/products/${p.slug}`} className="group block">
                <div className="relative aspect-[3/4.3] overflow-hidden rounded-t-full ring-1 ring-gold/25 transition-all duration-700 group-hover:-translate-y-2 group-hover:ring-gold/70">
                  <Image src={p.images[p.images.length - 1]} alt={`${p.name} print detail`} fill sizes="(min-width:1024px) 18vw, 68vw" placeholder="blur" className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-950/80 to-transparent" />
                  <span className="absolute bottom-5 left-0 right-0 text-center text-[0.6rem] uppercase tracking-[0.24em] text-gold-soft">{p.family}</span>
                </div>
                <p className="mt-5 text-center font-display text-[1.7rem] leading-none">{p.name}</p>
                <p className="mt-1.5 text-center font-display text-lg italic text-ivory/60">{p.meaning}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Shop by palette ─────────────── */
export function PaletteRow() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="container-x text-center">
        <Reveal>
          <p className="eyebrow text-gold-deep">Shop by palette</p>
          <h2 className="display-md mx-auto mt-4 max-w-2xl font-light">
            A palette drawn from <em className="text-forest-700">the garden</em>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-3 gap-y-10 sm:grid-cols-6">
          {PALETTES.map((pal, i) => (
            <Reveal key={pal.name} delay={i * 80}>
              <Link href={`/shop?palette=${pal.name}`} className="group flex flex-col items-center">
                <span className="relative block h-24 w-24 overflow-hidden rounded-full ring-1 ring-black/5 ring-offset-4 ring-offset-paper transition-all duration-500 group-hover:ring-2 group-hover:ring-gold sm:h-28 sm:w-28 lg:h-32 lg:w-32">
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

/* ─────────────── Craft ─────────────── */
const CRAFT = [
  ["Pure cotton, nothing else", "100% cotton — no polyester blends — so the fabric breathes on humid nights and softens with every wash."],
  ["The right thread count", "200 TC: the sweet spot for Indian weather. Smooth enough to hold a crisp print, light enough to stay cool."],
  ["Rooted in Jaipur", "Motifs drawn from Sanganer and Bagru, the printing towns outside Jaipur, redrawn for the homes we live in today."],
  ["The complete set", "Every bedsheet arrives with two matching pillow covers, folded and ready to give."],
];

export function CraftSection() {
  return (
    <section className="bg-ivory py-24 lg:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative mx-auto w-full max-w-[560px]">
          <Reveal mask>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
              <Image src={MEDIA.blockPrintingHands} alt="Hands pressing a wooden block onto indigo cotton" fill sizes="(min-width:1024px) 40vw, 90vw" placeholder="blur" className="object-cover" />
            </div>
          </Reveal>
          <Reveal className="absolute -bottom-10 -right-2 w-[46%] sm:-right-10" delay={300}>
            <div className="relative aspect-square overflow-hidden rounded-full border-[10px] border-ivory shadow-xl">
              <Image src={MEDIA.printingBlocks} alt="Carved wooden printing blocks" fill sizes="260px" placeholder="blur" className="object-cover" />
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="eyebrow text-gold-deep">Made the slow way</p>
          <h2 className="display-lg mt-5 font-light">
            Rooted in the printing towns of <em className="text-forest-700">Jaipur</em>
          </h2>
          <ol className="mt-12 space-y-8">
            {CRAFT.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[3.5rem_1fr] gap-2 border-t border-ink/10 pt-6">
                <span className="font-display text-3xl italic text-gold-deep">0{i + 1}</span>
                <div>
                  <p className="font-display text-[1.6rem] leading-tight">{t}</p>
                  <p className="mt-2 text-[0.96rem] leading-relaxed text-ink/70">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/journal/thread-count-decoded" className="link-underline mt-10 inline-flex items-center gap-2 pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-forest-800">
            Thread count, decoded <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── Bed to Body ─────────────── */
export function BedToBodyTeaser() {
  return (
    <section className="overflow-hidden bg-sand py-24 lg:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <Reveal mask>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
              <Image src={MEDIA.loungewearRed} alt="A woman in cotton pyjamas sitting by a bed" fill sizes="(min-width:1024px) 55vw, 95vw" placeholder="blur" className="object-cover object-[50%_30%]" />
            </div>
          </Reveal>
          <Reveal className="absolute -bottom-12 right-4 w-[36%] lg:-right-10" delay={250}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border-[8px] border-sand shadow-xl">
              <Image src={MEDIA.loungewearReading} alt="A man reading in bed in soft loungewear" fill sizes="300px" placeholder="blur" className="object-cover" />
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 lg:pl-10" delay={150}>
          <p className="eyebrow flex items-center gap-3 text-gold-deep">
            <span className="rounded-full bg-forest-800 px-3 py-1 text-[0.6rem] text-gold-soft">Coming soon</span> Apparel
          </p>
          <h2 className="display-lg mt-6 font-light">
            From bed <em className="text-forest-700">to body.</em>
          </h2>
          <p className="mt-6 text-[1.03rem] leading-[1.85] text-ink/75">
            The prints you sleep in, cut into easy cotton loungewear — kurta sets, pyjamas and robes for the slowest
            hours of the day. Match your bed, or don&apos;t. Either way, it&apos;s the softest thing you&apos;ll wear all week.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Kurta sets", "Pyjama sets", "Robes", "Kaftans"].map((t) => (
              <span key={t} className="rounded-full border border-ink/15 px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">{t}</span>
            ))}
          </div>
          <div className="mt-9 max-w-md">
            <Newsletter tone="light" cta="Join the waitlist" success="You're on the list — we'll write when it lands." />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── Gifting ─────────────── */
export function GiftingSection() {
  return (
    <section id="gifting" className="grid scroll-mt-24 bg-forest-900 text-ivory lg:grid-cols-2">
      <div className="grain relative flex items-center px-6 py-24 sm:px-12 lg:px-20 lg:py-36">
        <Reveal className="max-w-xl">
          <GiftIcon className="h-10 w-10 text-gold" />
          <p className="eyebrow mt-8 text-gold">Gifting</p>
          <h2 className="display-lg mt-5 font-light">
            The gift of <em className="text-gold-soft">slow mornings.</em>
          </h2>
          <p className="mt-6 text-[1.03rem] leading-[1.85] text-ivory/70">
            For a wedding trousseau, a griha pravesh or a Diwali visit — bed linen arrives beautifully boxed, with a
            handwritten note in your words. Planning for a team or a family function? Our gifting concierge will help.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Wedding trousseau", "Griha pravesh", "Festive", "Corporate"].map((t) => (
              <span key={t} className="rounded-full border border-ivory/20 px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-ivory/75">{t}</span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-gold">Shop gift-ready sets <ArrowIcon /></Link>
            <a href={SITE.whatsapp} className="btn btn-ghost-light"><WhatsAppIcon /> Gifting concierge</a>
          </div>
        </Reveal>
      </div>
      <div className="relative min-h-[420px] lg:min-h-0">
        <Image src={MEDIA.giftBox} alt="Folded linen in a gift box with a blank note card" fill sizes="(min-width:1024px) 50vw, 100vw" placeholder="blur" className="object-cover" />
        <div className="absolute bottom-8 left-8 hidden w-[34%] overflow-hidden rounded-t-full border-[6px] border-forest-900 shadow-2xl sm:block lg:-left-24 lg:bottom-16 lg:w-[38%]">
          <div className="relative aspect-[3/4]">
            <Image src={MEDIA.mehendiHands} alt="Hands with mehendi and bangles" fill sizes="280px" placeholder="blur" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Journal preview ─────────────── */
export function JournalPreview() {
  const [lead, ...rest] = ARTICLES.slice(0, 3);
  return (
    <section className="bg-paper py-24 lg:py-36">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-gold-deep">The Journal</p>
            <h2 className="display-lg mt-4 font-light">
              Notes on rest, craft <em className="text-forest-700">&amp; the art of the bed</em>
            </h2>
          </div>
          <Link href="/journal" className="link-underline inline-flex items-center gap-2 self-start pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] lg:self-auto">
            Read the journal <ArrowIcon />
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Link href={`/journal/${lead.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
                <Image src={lead.cover} alt="" fill sizes="(min-width:1024px) 46vw, 95vw" placeholder="blur" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-105" />
              </div>
              <p className="eyebrow mt-6 text-gold-deep">{lead.category} · {lead.readTime}</p>
              <h3 className="mt-3 font-display text-[2.4rem] leading-tight">{lead.title}</h3>
              <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink/70">{lead.dek}</p>
            </Link>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:gap-8">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i + 1) * 120}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
                    <Image src={a.cover} alt="" fill sizes="(min-width:1024px) 22vw, 45vw" placeholder="blur" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-105" />
                  </div>
                  <p className="eyebrow mt-6 text-gold-deep">{a.category} · {a.readTime}</p>
                  <h3 className="mt-3 font-display text-[1.8rem] leading-tight">{a.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Social strip ─────────────── */
const UGC = [
  { src: PRODUCTS[0].images[0], alt: "Mor Bagh bedsheet" },
  { src: MEDIA.teaBookBed, alt: "Tea and a book in bed" },
  { src: PRODUCTS[3].images[0], alt: "Neela Jharokha bedsheet" },
  { src: MEDIA.leafShadowPillow, alt: "Leaf shadow on a pillow" },
  { src: PRODUCTS[4].images[1], alt: "Gulabi Bagh pillow covers" },
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
              <a href={SITE.instagram} className="group relative block aspect-square overflow-hidden rounded-xl">
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
