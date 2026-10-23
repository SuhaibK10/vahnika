"use client";

import { useEffect, useState } from "react";
import { Emblem } from "@/components/Emblem";
import { StarIcon } from "@/components/Icons";

// PLACEHOLDER reviews for the pitch — replace with verified customer reviews before launch.
const QUOTES = [
  {
    text: "The print looks even better in person, like something from a heritage hotel. And it's soft enough that my kids refuse to get out of bed.",
    name: "Ananya R.",
    place: "Bengaluru",
    product: "Mor Bagh, King",
  },
  {
    text: "Finally a cotton sheet that stays cool through a Delhi summer. The colours haven't faded after a dozen washes.",
    name: "Rohit & Megha",
    place: "Gurugram",
    product: "Neela Jharokha, Queen",
  },
  {
    text: "I bought it as a griha pravesh gift and ended up ordering one for myself. The box, the note, the fabric: everything felt considered.",
    name: "Farah S.",
    place: "Mumbai",
    product: "Gulabi Bagh, King",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % QUOTES.length), 7000);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="container-x flex flex-col items-center text-center">
        <Emblem className="h-14 w-14" vColor="#1A4D3C" />
        <div className="mt-6 flex gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, n) => <StarIcon key={n} />)}
        </div>
        <div className="relative mt-8 grid w-full max-w-4xl">
          {QUOTES.map((q, n) => (
            <figure
              key={q.name}
              aria-hidden={n !== i}
              className={`col-start-1 row-start-1 transition-all duration-1000 ease-[var(--ease-silk)] ${n === i ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
            >
              <blockquote className="font-display text-[1.75rem] font-light italic leading-snug text-forest-800 sm:text-[2.4rem] lg:text-[2.9rem]">
                “{q.text}”
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="font-medium">{q.name}</span>
                <span className="text-muted"> · {q.place} · {q.product}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 flex gap-3">
          {QUOTES.map((q, n) => (
            <button key={q.name} onClick={() => setI(n)} aria-label={`Review ${n + 1}`} className={`h-px transition-all duration-700 ${n === i ? "w-12 bg-forest-700" : "w-6 bg-ink/25"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
