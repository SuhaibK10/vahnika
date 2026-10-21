"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { getProduct, type Product } from "@/lib/products";
import { Emblem } from "@/components/Emblem";
import { ArrowIcon, LeafIcon } from "@/components/Icons";

const SLIDES = ["mor-bagh", "azure-heritage", "raat-rani", "gulabi-bagh"].map((s) => getProduct(s) as Product);

export function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const pathId = useId().replace(/:/g, "");

  useEffect(() => {
    const t = setTimeout(() => go((active + 1) % SLIDES.length), 6500);
    return () => clearTimeout(t);
  }, [active]);

  function go(n: number) {
    setPrev(active);
    setActive(n);
  }

  const current = SLIDES[active];

  return (
    <section className="under-header grain relative overflow-hidden bg-forest-900 text-ivory">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_38%,#235e4a_0%,#143d31_38%,#0a211b_100%)]" />
      <Emblem
        className="pointer-events-none absolute -bottom-48 -left-48 -z-10 h-[44rem] w-[44rem] opacity-[0.045]"
        vColor="#F5EFE6"
        leafLight="#F5EFE6"
        leafDark="#F5EFE6"
        ringColor="#F5EFE6"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 top-[72px] border border-gold/25 lg:bottom-6 lg:left-6 lg:right-6 lg:top-[88px]" />

      <div className="container-x relative grid items-center gap-14 pb-20 pt-10 lg:min-h-[calc(100svh-112px)] lg:grid-cols-12 lg:gap-8 lg:py-16">
        {/* Copy */}
        <div className="lg:col-span-6 lg:pl-6">
          <p className="animate-fade-up eyebrow flex items-center gap-3 text-gold-soft">
            <LeafIcon className="h-3.5 w-3.5 text-gold" />
            Pure cotton · Jaipuri prints · Designed in India
          </p>
          <h1 className="display-xl mt-7 font-light">
            <span className="animate-fade-up block [animation-delay:120ms]">Quiet elegance,</span>
            <em className="animate-fade-up block font-normal text-gold-soft [animation-delay:240ms]">woven into</em>
            <span className="animate-fade-up block [animation-delay:360ms]">every day.</span>
          </h1>
          <p className="animate-fade-up mt-8 max-w-[31rem] text-[1.05rem] leading-relaxed text-ivory/72 [animation-delay:480ms]">
            Pure cotton bed linen in prints drawn from India&apos;s gardens, palaces and printing towns — made for slow
            mornings and deep, unhurried sleep.
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap gap-3 [animation-delay:600ms]">
            <Link href="/shop" className="btn btn-gold">
              Shop the collection <ArrowIcon />
            </Link>
            <Link href="/prints" className="btn btn-ghost-light">
              Explore the prints
            </Link>
          </div>
          <dl className="animate-fade-up mt-14 grid max-w-md grid-cols-3 border-t border-ivory/15 pt-6 [animation-delay:720ms]">
            {[
              ["100%", "Pure cotton"],
              ["200", "Thread count"],
              ["108″", "King size"],
            ].map(([v, l], i) => (
              <div key={l} className={i ? "border-l border-ivory/15 pl-5" : ""}>
                <dt className="font-display text-3xl text-gold-soft">{v}</dt>
                <dd className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-ivory/55">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Arch slideshow */}
        <div className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:col-start-8">
          <div className="absolute inset-0 translate-x-4 -translate-y-4 rounded-t-full border border-gold/45 lg:translate-x-6 lg:-translate-y-6" />
          <div className="arch relative aspect-[4/5.15] bg-forest-800 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]">
            {SLIDES.map((p, n) => (
              <div
                key={p.slug}
                className={`absolute inset-0 transition-opacity duration-[1600ms] ease-[var(--ease-silk)] ${n === active ? "opacity-100" : "opacity-0"}`}
                aria-hidden={n !== active}
              >
                <Image
                  src={p.images[0]}
                  alt={`${p.name} bedsheet set`}
                  fill
                  priority={n === 0}
                  sizes="(min-width: 1024px) 460px, 90vw"
                  placeholder="blur"
                  className={`object-cover ${n === active || n === prev ? "kenburns" : ""}`}
                />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-forest-950/85 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="eyebrow text-gold-soft">Now showing</p>
              <p key={current.slug} className="animate-fade-up mt-2 font-display text-[2.1rem] leading-none">
                {current.name} <span className="block text-[1.5rem] italic text-ivory/70 sm:inline sm:text-[2.1rem]">— {current.meaning}</span>
              </p>
              <Link href={`/products/${current.slug}`} className="link-underline mt-3 inline-flex items-center gap-2 pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/85">
                Shop the print <ArrowIcon />
              </Link>
            </div>
          </div>

          {/* Rotating seal */}
          <div className="absolute -left-2 -top-4 grid h-24 w-24 place-items-center rounded-full border border-gold/30 bg-forest-950/80 backdrop-blur-md sm:-left-14 sm:top-[18%] sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <path id={pathId} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
              </defs>
              <text fill="#E6CB7A" fontSize="14" letterSpacing="3" className="font-sans uppercase">
                <textPath href={`#${pathId}`} textLength="474" lengthAdjust="spacing">
                  Pure cotton • Designed in India • Quiet elegance •
                </textPath>
              </text>
            </svg>
            <Emblem ring={false} className="h-10 w-10 lg:h-12 lg:w-12" vColor="#F5EFE6" />
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {SLIDES.map((p, n) => (
              <button
                key={p.slug}
                onClick={() => go(n)}
                aria-label={`Show ${p.name}`}
                className={`h-px transition-all duration-700 ${n === active ? "w-12 bg-gold" : "w-6 bg-ivory/30 hover:bg-ivory/60"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-ivory/45">Scroll</span>
        <span className="scroll-cue block h-10 w-px bg-gold/70" />
      </div>
    </section>
  );
}
