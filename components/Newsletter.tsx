"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon, CheckIcon } from "@/components/Icons";

type Props = { tone?: "dark" | "light"; cta?: string; placeholder?: string; success?: string };

// Front-end only for the pitch: validates and shows a thank-you state.
export function Newsletter({
  tone = "dark",
  cta = "Subscribe",
  placeholder = "Your email address",
  success = "Thank you — your first letter is on its way.",
}: Props) {
  const [done, setDone] = useState(false);
  const dark = tone === "dark";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className={`flex items-center gap-3 py-3 font-display text-xl italic ${dark ? "text-gold-soft" : "text-forest-700"}`}>
        <CheckIcon className="h-5 w-5" /> {success}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={`flex w-full items-center rounded-full border p-1.5 pl-6 ${dark ? "border-ivory/25" : "border-ink/15 bg-paper"}`}>
      <input
        type="email"
        required
        placeholder={placeholder}
        aria-label="Email address"
        className={`min-w-0 flex-1 bg-transparent text-sm outline-none ${dark ? "text-ivory placeholder:text-ivory/45" : "text-ink placeholder:text-muted"}`}
      />
      <button className={`btn shrink-0 !px-5 !py-3 ${dark ? "btn-gold" : "btn-forest"}`}>
        <span className="hidden sm:inline">{cta}</span>
        <ArrowIcon />
      </button>
    </form>
  );
}
