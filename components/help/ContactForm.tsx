"use client";

import { useState, type FormEvent } from "react";
import { Field, SelectField, TextareaField } from "@/components/Field";
import { ArrowIcon, CheckIcon } from "@/components/Icons";

// Front-end only for the pitch: validates and shows a thank-you state.
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => setSent(true), 800);
  }

  if (sent) {
    return (
      <div className="animate-fade-up flex min-h-[420px] flex-col items-center justify-center rounded-[28px] bg-paper p-8 text-center text-ink">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-forest-800 text-gold">
          <CheckIcon width={28} height={28} />
        </span>
        <p className="mt-6 font-display text-4xl leading-tight">Thank you.</p>
        <p className="mt-3 max-w-xs text-sm text-ink/70">Your message is with us. We reply to every note within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-paper p-6 text-ink sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <SelectField label="Topic" name="topic" defaultValue="" required>
          <option value="" disabled>Choose a topic</option>
          {["An order I've placed", "Returns & exchanges", "Choosing a print or size", "Gifting & bulk orders", "Something else"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </SelectField>
        <Field label="Order number" name="order" hint="Optional" placeholder="VAH-24817" />
        <TextareaField label="Message" name="message" rows={5} required className="sm:col-span-2" />
      </div>
      <button disabled={busy} className="btn btn-forest mt-6 w-full disabled:opacity-70 sm:w-auto">
        {busy ? "Sending…" : <>Send message <ArrowIcon /></>}
      </button>
    </form>
  );
}
