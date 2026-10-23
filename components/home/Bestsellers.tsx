"use client";

import Link from "next/link";
import { useRef } from "react";
import { getProduct, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/Icons";
import { ScrollHint, useScrollHint } from "@/components/ScrollHint";

// Curated order for the pitch; swap for the real sales ranking once orders come in.
const BESTSELLERS = ["raat-rani", "mor-bagh", "gulabi-bagh", "kairi-jaal", "saanjh", "sarson-phool", "rangeen-tulip"].map(
  (s) => getProduct(s) as Product,
);

// Left edge of the site container, so the row starts in line with the heading and bleeds off the right edge
const INSET = "pl-5 scroll-pl-5 sm:pl-8 sm:scroll-pl-8 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:scroll-pl-[max(3rem,calc((100vw-1440px)/2+3rem))]";

export function Bestsellers() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = useScrollHint(track);

  // One card (plus the gap) per click
  function step(dir: 1 | -1) {
    const el = track.current!;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * (card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8), behavior: "smooth" });
  }

  const arrow = "grid h-11 w-11 place-items-center rounded-full border border-ink/15 transition-colors hover:border-forest-700 hover:bg-forest-800 hover:text-ivory disabled:pointer-events-none disabled:opacity-35";

  return (
    <section className="bg-ivory pb-10 pt-8 lg:pb-12 lg:pt-12">
      <div className="container-x flex items-center justify-between gap-6">
        <Reveal>
          <h2 className="eyebrow text-gold-deep">Bestsellers</h2>
        </Reveal>
        <div className="flex shrink-0 items-center gap-5">
          <Link href="/shop" className="link-underline hidden items-center gap-2 pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] sm:inline-flex">
            See all prints <ArrowIcon />
          </Link>
          <div className="hidden gap-2 lg:flex">
            <button onClick={() => step(-1)} disabled={scroll.start} aria-label="Previous prints" className={arrow}>
              <ArrowIcon className="rotate-180" />
            </button>
            <button onClick={() => step(1)} disabled={scroll.end} aria-label="Next prints" className={arrow}>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>

      {/* The row fades in as one piece: cards animating inside a scroller would stick out and make it scroll vertically */}
      <Reveal className="mt-3 lg:mt-5">
        <ul
          ref={track}
          tabIndex={0}
          aria-label="Bestsellers"
          className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-1 pt-1 outline-none sm:gap-6 ${INSET}`}
        >
          {BESTSELLERS.map((p) => (
            <li key={p.slug} className="w-[72vw] max-w-[320px] shrink-0 snap-start sm:w-[42vw] lg:w-[clamp(260px,22vw,330px)]">
              <ProductCard product={p} sizes="(min-width: 1024px) 330px, (min-width: 640px) 42vw, 72vw" />
            </li>
          ))}
          <li className="w-[72vw] max-w-[320px] shrink-0 snap-start sm:w-[42vw] lg:w-[clamp(260px,22vw,330px)]">
            <Link href="/shop" className="group flex h-full min-h-[380px] flex-col justify-end rounded-t-full bg-forest-800 p-8 text-ivory">
              <span className="eyebrow text-gold">The collection</span>
              <span className="mt-3 font-display text-[2rem] leading-tight">Every print, in one place.</span>
              <span className="mt-5 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-gold-soft">
                View all prints <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
          {/* Keeps a gutter after the last card; end padding on scroll containers isn't reliable everywhere */}
          <li aria-hidden className="w-1 shrink-0 sm:w-2 lg:w-6" />
        </ul>
      </Reveal>

      <div className="container-x mt-4 flex items-center gap-6">
        <ScrollHint left={scroll.left} width={scroll.width} className="flex-1" />
        <Link href="/shop" className="inline-flex shrink-0 items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] sm:hidden">
          See all <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
