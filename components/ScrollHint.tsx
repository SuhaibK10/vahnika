"use client";

import { useEffect, useState, type RefObject } from "react";

// Tracks a horizontal scroller: the visible slice as fractions of its full width, and whether it's at either end
export function useScrollHint(ref: RefObject<HTMLElement | null>) {
  const [state, setState] = useState({ left: 0, width: 1, start: true, end: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setState({ left: el.scrollLeft / el.scrollWidth, width: el.clientWidth / el.scrollWidth, start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return state;
}

// Thin line whose thumb mirrors a horizontal scroller, hinting that there is more to swipe to
export function ScrollHint({ left, width, className = "" }: { left: number; width: number; className?: string }) {
  return (
    <div aria-hidden className={`relative h-px bg-sand ${className}`}>
      <span
        className="absolute -top-px h-[3px] rounded-full bg-forest-700 transition-[left,width] duration-300"
        style={{ left: `${left * 100}%`, width: `${width * 100}%` }}
      />
    </div>
  );
}
