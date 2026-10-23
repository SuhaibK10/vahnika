"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { getProduct, type Product } from "@/lib/products";
import { ArrowIcon } from "@/components/Icons";

const SLIDES = ["saanjh", "mor-bagh", "raat-rani", "gulabi-bagh"].map((s) => getProduct(s) as Product);

// Full-width product slideshow (~90% of the first screen) with a "swipe / scroll down" band beneath, on every
// screen size. The section slides up under the transparent header, so the photo starts at the very top.
export function Hero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => go((active + 1) % SLIDES.length), 3000);
    return () => clearTimeout(t);
  }, [active]);

  function go(n: number) {
    setPrev(active);
    setActive(n);
  }

  // Swipe (or mouse-drag) sideways to change slide; vertical gestures are left to the page scroll (touch-pan-y)
  const swipe = useRef<{ x: number; y: number } | null>(null);
  function endSwipe(e: PointerEvent) {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(e.clientY - start.y)) return;
    go((active + (dx < 0 ? 1 : SLIDES.length - 1)) % SLIDES.length);
  }

  const current = SLIDES[active];

  return (
    <section id="hero-section" className="relative -mt-[65px] flex flex-col overflow-hidden bg-forest-900 text-ivory lg:-mt-[77px]">
      {/* The hero has no visible headline; keep one for search engines and screen readers */}
      <h1 className="sr-only">Quiet elegance, woven into every day.</h1>

      <div
        onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={endSwipe}
        onPointerCancel={() => (swipe.current = null)}
        className="relative h-[calc(100svh-2.25rem-var(--mobile-nav-h)-4.5rem)] min-h-[420px] w-full touch-pan-y select-none overflow-hidden"
      >
        {SLIDES.map((p, n) => (
          <div
            key={p.slug}
            className={`absolute inset-0 transition-opacity duration-[1000ms] ease-[var(--ease-silk)] ${n === active ? "opacity-100" : "opacity-0"}`}
            aria-hidden={n !== active}
          >
            <Image
              src={p.images[0]}
              alt={`${p.name} bedsheet set`}
              fill
              priority={n === 0}
              draggable={false}
              sizes="100vw"
              placeholder="blur"
              className={`object-cover ${n === active || n === prev ? "kenburns" : ""}`}
            />
          </div>
        ))}
        {/* Neutral shading (not brand green, which tints the photos) keeps the header and caption legible */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-x flex items-end justify-between gap-6 pb-5 sm:pb-8 lg:pb-10">
            {/* A soft shadow on the text itself keeps it readable on pale prints without darkening the photo */}
            <div className="[text-shadow:0_1px_14px_rgba(0,0,0,.6),0_1px_3px_rgba(0,0,0,.45)]">
              <p className="eyebrow text-gold-soft">Now showing</p>
              <p key={current.slug} className="animate-fade-up mt-2 font-display text-[1.9rem] leading-none sm:text-[2.2rem]">
                {current.name} <span className="mt-1 block italic text-ivory/90">{current.meaning}</span>
              </p>
              <Link href={`/products/${current.slug}`} className="link-underline mt-3 inline-flex items-center gap-2 pb-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/85">
                Shop the print <ArrowIcon />
              </Link>
            </div>
            <div className="mb-2 flex shrink-0 items-center gap-2.5">
              {SLIDES.map((p, n) => (
                <button
                  key={p.slug}
                  onClick={() => go(n)}
                  aria-label={`Show ${p.name}`}
                  className={`h-0.5 transition-all duration-700 ${n === active ? "w-10 bg-gold" : "w-5 bg-ivory/40 hover:bg-ivory/70"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[4.5rem] shrink-0 items-start justify-center border-b border-ivory/10 bg-forest-950 pt-2">
        <ScrollCue
          label={
            <>
              <span className="lg:hidden">Swipe down</span>
              <span className="hidden lg:inline">Scroll</span> to begin the journey
            </>
          }
        />
      </div>
    </section>
  );
}

// Animated mouse with a falling wheel dot. Tapping it scrolls past whatever it sits in, clear of the sticky header.
function ScrollCue({ label }: { label: ReactNode }) {
  function next(e: MouseEvent<HTMLButtonElement>) {
    const below = e.currentTarget.parentElement!.getBoundingClientRect().bottom;
    const header = document.querySelector("header")?.offsetHeight ?? 0;
    window.scrollTo({ top: window.scrollY + below - header, behavior: "smooth" });
  }

  return (
    <button type="button" onClick={next} className="animate-fade-in flex flex-col items-center gap-2.5 text-ivory/80 transition-colors hover:text-ivory [animation-delay:900ms]">
      <span aria-hidden className="relative block h-[30px] w-[19px] rounded-full border-[1.5px] border-current">
        <span className="scroll-dot absolute left-1/2 top-[6px] h-[5px] w-[3px] -translate-x-1/2 rounded-full bg-gold" />
      </span>
      <span className="text-[0.62rem] font-medium uppercase tracking-[0.18em] sm:tracking-[0.24em]">{label}</span>
    </button>
  );
}
