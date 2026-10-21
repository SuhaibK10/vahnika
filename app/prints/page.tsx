import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAMILIES, PRODUCTS, fromPrice } from "@/lib/products";
import { MEDIA } from "@/lib/media";
import { formatINR } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, LeafIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "The Print Library",
  description: "Every Vahnika print is named, never numbered. Discover the stories behind our Mughal Garden, Jaipuri Classics and Modern Folk prints.",
};

const anchor = (s: string) => s.toLowerCase().replace(/ /g, "-");

export default function PrintsPage() {
  return (
    <>
      <section className="under-header grain relative overflow-hidden bg-forest-950 text-ivory">
        <Image src={MEDIA.arches} alt="" fill priority sizes="100vw" placeholder="blur" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/40 to-forest-950" />
        <div className="container-x relative flex min-h-[78svh] flex-col items-center justify-center py-24 text-center">
          <p className="animate-fade-up eyebrow flex items-center gap-3 text-gold"><LeafIcon className="text-gold" /> The Print Library</p>
          <h1 className="animate-fade-up display-xl mt-6 max-w-5xl font-light [animation-delay:150ms]">
            Named, <em className="text-gold-soft">never numbered.</em>
          </h1>
          <p className="animate-fade-up mt-7 max-w-2xl text-[1.08rem] leading-relaxed text-ivory/75 [animation-delay:300ms]">
            Every Vahnika print begins with a place, a season or a memory — a Rajput garden, a jasmine that blooms after
            dark, the arched window of a Jaipur palace. Here are their stories.
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap justify-center gap-3 [animation-delay:450ms]">
            {FAMILIES.map((f) => (
              <a key={f.name} href={`#${anchor(f.name)}`} className="btn btn-ghost-light">{f.name}</a>
            ))}
          </div>
        </div>
      </section>

      {FAMILIES.map((family, fi) => {
        const prints = PRODUCTS.filter((p) => p.family === family.name);
        return (
          <section key={family.name} id={anchor(family.name)} className={`scroll-mt-20 py-24 lg:py-32 ${fi % 2 ? "bg-ivory" : "bg-paper"}`}>
            <div className="container-x">
              <Reveal className="mx-auto max-w-3xl text-center">
                <p className="eyebrow text-gold-deep">Chapter 0{fi + 1}</p>
                <h2 className="display-lg mt-4 font-light">{family.name}</h2>
                <p className="mt-5 font-display text-2xl italic text-muted">{family.description}</p>
              </Reveal>

              <div className="mt-20 space-y-24 lg:space-y-32">
                {prints.map((p, i) => (
                  <article key={p.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <Reveal mask className={`relative lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                      <div className="relative mx-auto aspect-[3/4] max-w-[460px] overflow-hidden rounded-t-full">
                        <Image src={p.images[p.images.length - 1]} alt={`${p.name} print detail`} fill sizes="(min-width:1024px) 34vw, 90vw" placeholder="blur" className="object-cover" />
                      </div>
                      <div className="absolute -bottom-6 right-4 h-28 w-28 overflow-hidden rounded-full border-[6px] border-paper shadow-xl sm:right-10 lg:h-36 lg:w-36">
                        <Image src={p.images[0]} alt="" fill sizes="144px" className="object-cover" />
                      </div>
                    </Reveal>
                    <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`} delay={150}>
                      <p className="font-display text-xl italic text-gold-deep">{p.meaning}</p>
                      <h3 className="mt-2 font-display text-[3.4rem] font-light leading-none lg:text-[4.5rem]">{p.name}</h3>
                      <p className="mt-7 text-[1.06rem] leading-[1.9] text-ink/75">{p.story}</p>
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        {p.colours.map((c) => (
                          <span key={c.name} className="flex items-center gap-2 rounded-full border border-ink/10 py-1.5 pl-1.5 pr-4 text-xs text-ink/70">
                            <span className="h-5 w-5 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
                            {c.name}
                          </span>
                        ))}
                      </div>
                      <Link href={`/products/${p.slug}`} className="btn btn-forest mt-9">
                        Shop {p.name} · from {formatINR(fromPrice(p))} <ArrowIcon />
                      </Link>
                    </Reveal>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
