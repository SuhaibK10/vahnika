"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type MouseEvent } from "react";

export function ProductGallery({ images, name }: { images: StaticImageData[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-5">
      <div className="no-scrollbar flex gap-3 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-visible">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-t-full transition-all lg:w-full ${
              i === active ? "ring-2 ring-forest-700 ring-offset-2 ring-offset-paper" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={img} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
      <div
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-[28px] bg-sand"
        onMouseMove={onMove}
        onMouseLeave={() => setZoom(null)}
      >
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={i === 0 ? `${name} — full set on a bed` : `${name} — print detail ${i}`}
            fill
            priority={i === 0}
            placeholder="blur"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className={`object-cover transition-[opacity,transform] duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
            style={
              i === active && zoom
                ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%`, transitionDuration: "300ms, 300ms" }
                : undefined
            }
          />
        ))}
        <span className="pointer-events-none absolute bottom-5 right-5 rounded-full bg-paper/85 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-ink/70 backdrop-blur">
          {active + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
