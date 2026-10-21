"use client";

import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "@/lib/site";
import { LeafIcon } from "@/components/Icons";

export function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ANNOUNCEMENTS.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative z-[60] flex h-9 items-center justify-center overflow-hidden bg-forest-950 text-gold-soft">
      {ANNOUNCEMENTS.map((msg, n) => (
        <p
          key={msg}
          aria-hidden={n !== i}
          className={`absolute flex items-center gap-2.5 text-[0.66rem] font-medium uppercase tracking-[0.26em] transition-all duration-700 ${
            n === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <LeafIcon className="h-3 w-3 text-gold" />
          {msg}
        </p>
      ))}
    </div>
  );
}
