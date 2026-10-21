import type { Metadata } from "next";
import Image from "next/image";
import { MEDIA } from "@/lib/media";
import { getProduct, type Product } from "@/lib/products";
import { Reveal } from "@/components/Reveal";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Bed to Body — Cotton Loungewear",
  description: "The prints you sleep in, cut into easy cotton loungewear. Vahnika apparel is coming soon — join the waitlist.",
};

const PIECES = [
  { piece: "The pyjama set", print: "mor-bagh", note: "Relaxed shirt, drawstring pyjama." },
  { piece: "The robe", print: "raat-rani", note: "Knee-length, with a soft tie belt." },
  { piece: "The kurta set", print: "neela-jharokha", note: "Straight kurta, easy straight pants." },
  { piece: "The kaftan", print: "saanjh", note: "One size, endlessly forgiving." },
].map((p) => ({ ...p, product: getProduct(p.print) as Product }));

export default function BedToBodyPage() {
  return (
    <>
      <section className="under-header relative overflow-hidden bg-forest-950 text-ivory">
        <Image src={MEDIA.loungewearRed} alt="A woman in cotton pyjamas beside a bed" fill priority sizes="100vw" placeholder="blur" className="object-cover object-[50%_35%] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/70 to-transparent" />
        <div className="container-x relative flex min-h-[88svh] flex-col justify-center py-28">
          <p className="animate-fade-up eyebrow flex items-center gap-3 text-gold">
            <span className="rounded-full border border-gold/50 px-3 py-1 text-[0.6rem]">Coming soon</span> Vahnika Apparel
          </p>
          <h1 className="animate-fade-up display-xl mt-6 max-w-3xl font-light [animation-delay:150ms]">
            From bed <em className="text-gold-soft">to body.</em>
          </h1>
          <p className="animate-fade-up mt-7 max-w-xl text-[1.08rem] leading-relaxed text-ivory/75 [animation-delay:300ms]">
            The prints you sleep in, cut into easy cotton loungewear for the slowest hours of the day. Match your bed —
            or don&apos;t. Either way, it will be the softest thing you wear all week.
          </p>
          <div className="animate-fade-up mt-10 w-full max-w-md [animation-delay:450ms]">
            <Newsletter cta="Join the waitlist" success="You're on the list — we'll write the moment it lands." />
            <p className="mt-3 text-xs text-ivory/50">Waitlist members get first access and early pricing.</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32">
        <div className="container-x">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-gold-deep">The first edit</p>
              <h2 className="display-lg mt-4 font-light">Four pieces, <em className="text-forest-700">four prints</em></h2>
            </div>
            <p className="text-[1.03rem] leading-relaxed text-ink/70 lg:col-span-5">
              Cut from the same pure cotton as our bed linen, in the prints you already love. Breathable, unfussy and made
              for lounging, sleeping and the long, slow morning in between.
            </p>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {PIECES.map((p, i) => (
              <Reveal key={p.piece} delay={i * 110}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-t-full">
                  <Image src={p.product.images[p.product.images.length - 1]} alt={`${p.product.name} print`} fill sizes="(min-width:1024px) 22vw, 45vw" placeholder="blur" className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
                  <span className="absolute bottom-5 left-0 right-0 text-center text-[0.6rem] uppercase tracking-[0.24em] text-gold-soft">In {p.product.name}</span>
                </div>
                <p className="mt-5 font-display text-[1.8rem] leading-none">{p.piece}</p>
                <p className="mt-2 text-sm text-muted">{p.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-sand lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image src={MEDIA.pajamasTeal} alt="Two people in cotton pyjamas" fill sizes="(min-width:1024px) 50vw, 100vw" placeholder="blur" className="object-cover" />
        </div>
        <Reveal className="flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-20">
          <p className="eyebrow text-gold-deep">Why apparel?</p>
          <h2 className="display-md mt-5 font-light">
            Because comfort shouldn&apos;t stop <em className="text-forest-700">at the edge of the bed.</em>
          </h2>
          <p className="mt-6 text-[1.03rem] leading-[1.9] text-ink/72">
            Some prints feel too good to leave on the bed. So we&apos;re taking the cotton, colours and craft of Vahnika
            bed linen and cutting them into pieces you can live in — from the first chai of the morning to the last page
            of the night.
          </p>
        </Reveal>
      </section>
    </>
  );
}
