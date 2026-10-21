"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  mask?: boolean;
  style?: CSSProperties;
};

// Fades/lifts content in once it scrolls into view. Pure CSS transition, one observer per element.
export function Reveal({ children, as: Tag = "div", className = "", delay = 0, mask = false, style }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${mask ? "reveal-mask" : "reveal"} ${className}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
