"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Emblem } from "@/components/Emblem";
import { ArrowIcon, CheckIcon, CloseIcon } from "@/components/Icons";
import { STORAGE } from "@/lib/site";

// Spin-to-win popup. Opens OPEN_AFTER_MS after landing, once per visitor:
// spinning retires it for good, closing it keeps it away for DISMISS_DAYS.
const OPEN_AFTER_MS = 4000;
const DISMISS_DAYS = 3;
const SPIN_MS = 5200;
const STORE = "vahnika-spin";
// Never interrupt a purchase
const QUIET_PATHS = ["/checkout", "/order-confirmed"];

// Slices alternate win / no-win. Weights are the odds of landing on each (they sum to 100).
const SEGMENTS: { label: string; code?: string; weight: number }[] = [
  { label: "₹100 off", code: "VAHNIKA100", weight: 26 },
  { label: "Sorry.", weight: 2 },
  { label: "5% off", code: "VAHNIKA5", weight: 36 },
  { label: "Almost there", weight: 2 },
  { label: "₹150 off", code: "VAHNIKA150", weight: 10 },
  { label: "No luck today", weight: 2 },
  { label: "10% off", code: "VAHNIKA10", weight: 14 },
  { label: "Sorry.", weight: 2 },
  { label: "15% off", code: "VAHNIKA15", weight: 4 },
  { label: "Next time", weight: 2 },
];
const SLICE = 360 / SEGMENTS.length;
const WIN_FILLS = ["#E6CB7A", "#F5EFE6"];
const LOSE_FILLS = ["#1A4D3C", "#143D31"];

function shouldShow() {
  try {
    const v = localStorage.getItem(STORE);
    if (!v) return true;
    if (v === "spun") return false;
    return Date.now() - Number(v) > DISMISS_DAYS * 864e5;
  } catch {
    return true;
  }
}

function remember(value: string, key = STORE) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function pickSegment() {
  let r = Math.random() * SEGMENTS.reduce((sum, s) => sum + s.weight, 0);
  return SEGMENTS.findIndex((s) => (r -= s.weight) < 0);
}

export function SpinToWin() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"form" | "spinning" | "result">("form");
  const [rotation, setRotation] = useState(0);
  const [duration, setDuration] = useState(SPIN_MS);
  const [result, setResult] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (QUIET_PATHS.includes(pathname) || !shouldShow()) return;
    const t = setTimeout(() => setOpen(true), OPEN_AFTER_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    dialog.current?.focus({ preventScroll: true });
    document.documentElement.classList.add("modal-open");
    return () => document.documentElement.classList.remove("modal-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, phase]);

  function close() {
    if (phase === "form") remember(String(Date.now()));
    setOpen(false);
  }

  function spin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email")).trim();
    const phone = String(data.get("phone")).replace(/\D/g, "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setError("Please enter a valid email address.");
    if (phone && !/^[6-9]\d{9}$/.test(phone)) return setError("Please enter a 10-digit Indian mobile number.");
    setError("");
    // Pitch build: nothing is sent yet — post { email, phone, optIn: data.has("optIn") } to the CRM here.

    const index = pickSegment();
    const jitter = (Math.random() - 0.5) * SLICE * 0.6;
    const ms = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : SPIN_MS;
    setResult(index);
    setDuration(ms);
    // Six full turns, then stop with the chosen slice under the pointer at 12 o'clock
    setRotation((r) => r - (r % 360) + 360 * 6 + (360 - (index * SLICE + SLICE / 2) + jitter));
    setPhase("spinning");
    remember("spun");
    // Checkout offers the won code, ready to apply
    if (SEGMENTS[index].code) remember(SEGMENTS[index].code!, STORAGE.wonCode);
    setTimeout(() => setPhase("result"), ms + 300);
  }

  function copy(code: string) {
    navigator.clipboard?.writeText(code).then(() => setCopied(true), () => {});
  }

  if (!open) return null;
  const prize = SEGMENTS[result];

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto">
      <div onClick={close} className="animate-fade-in fixed inset-0 bg-forest-950/65 backdrop-blur-sm" />
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="animate-fade-up relative grid w-full max-w-[880px] overflow-hidden rounded-[28px] bg-paper shadow-[0_40px_90px_-30px_rgba(0,0,0,.7)] outline-none md:grid-cols-[1.08fr_1fr]"
        >
          <button onClick={close} aria-label="Close" className="absolute right-3 top-3 z-20 rounded-full p-2 text-ivory hover:bg-ivory/10 md:text-ink md:hover:bg-sand/60">
            <CloseIcon />
          </button>

          {/* Wheel */}
          <div className="grain relative flex items-center justify-center overflow-hidden bg-forest-900 px-6 pb-5 pt-10 md:p-10">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,#245f4b_0%,#143d31_45%,#0a211b_100%)]" />
            <div className="relative aspect-square w-[min(52vw,210px)] md:w-full md:max-w-[380px]">
              <div
                className="absolute inset-0 rounded-full shadow-[0_26px_50px_-18px_rgba(0,0,0,.7)]"
                style={{ transform: `rotate(${rotation}deg)`, transition: `transform ${duration}ms cubic-bezier(0.12, 0.8, 0.1, 1)` }}
              >
                <Wheel />
              </div>
              <div className="absolute left-1/2 top-1/2 grid h-[19%] w-[19%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-forest-900 shadow-lg">
                <Emblem ring={false} className="h-[58%] w-[58%]" vColor="#F5EFE6" />
              </div>
              <svg viewBox="0 0 40 52" aria-hidden className="absolute left-1/2 top-0 w-[11%] -translate-x-1/2 -translate-y-[38%] drop-shadow-[0_4px_6px_rgba(0,0,0,.45)]">
                <path d="M20 51C12 40 2 30 2 19a18 18 0 1 1 36 0c0 11-10 21-18 32z" fill="#D4AF37" stroke="#0a211b" strokeWidth="1.5" />
                <circle cx="20" cy="19" r="6.5" fill="#F5EFE6" />
              </svg>
            </div>
          </div>

          {/* Form, then the result */}
          <div className="flex flex-col justify-center p-6 sm:p-9 md:p-10" aria-live="polite">
            {phase === "result" ? (
              prize.code ? (
                <div>
                  <p className="eyebrow text-gold-deep">The wheel has spoken</p>
                  <h2 id={titleId} className="mt-4 font-display text-5xl leading-none text-forest-800">
                    {prize.label} <em className="block text-[0.55em] text-ink/70">your first order</em>
                  </h2>
                  <p className="mt-6 text-sm text-ink/70">Here&apos;s your code. We&apos;ll have it ready at checkout.</p>
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-dashed border-gold-deep/50 bg-ivory py-2 pl-5 pr-2">
                    <span className="font-display text-2xl tracking-[0.12em] text-forest-800">{prize.code}</span>
                    <button onClick={() => copy(prize.code!)} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-forest-700 hover:bg-sand/70">
                      {copied ? <><CheckIcon /> Copied</> : "Copy"}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-muted">Valid for 7 days on your first order. One use per customer.</p>
                  <Link href="/shop" onClick={close} className="btn btn-gold mt-8 w-full">
                    Shop the collection <ArrowIcon />
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="eyebrow text-gold-deep">Not this time</p>
                  <h2 id={titleId} className="mt-4 font-display text-5xl leading-none text-forest-800">{prize.label}</h2>
                  <p className="mt-6 text-[0.95rem] leading-relaxed text-ink/70">
                    The wheel wasn&apos;t kind today, but every order still ships free, with cash on delivery and easy 7-day returns.
                  </p>
                  <Link href="/shop" onClick={close} className="btn btn-forest mt-8 w-full">
                    Browse the collection <ArrowIcon />
                  </Link>
                </div>
              )
            ) : (
              <form onSubmit={spin} noValidate>
                <p className="eyebrow text-gold-deep">A welcome gift</p>
                <h2 id={titleId} className="mt-3 font-display text-[2.1rem] leading-[1.02] text-ink sm:mt-4 sm:text-[2.6rem]">
                  Spin to win <em className="text-forest-700">a discount</em>
                </h2>
                <p className="mt-3 text-sm text-ink/70 sm:mt-4">Enter your email to spin the wheel.</p>

                <fieldset disabled={phase === "spinning"} className="mt-5 space-y-3 sm:mt-6">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    aria-label="Email address"
                    className="w-full rounded-full border border-ink/15 bg-paper px-5 py-3 text-base outline-none transition-colors placeholder:text-muted focus:border-forest-700 sm:py-3.5 sm:text-sm"
                  />
                  <div className="flex items-center rounded-full border border-ink/15 bg-paper transition-colors focus-within:border-forest-700">
                    <span className="flex shrink-0 items-center gap-1.5 border-r border-ink/15 py-3 pl-5 pr-3 text-sm text-ink/80 sm:py-3.5">🇮🇳 +91</span>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="Phone (optional)"
                      aria-label="Phone number"
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base outline-none sm:py-3.5 sm:text-sm placeholder:text-muted"
                    />
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 pt-2 text-sm text-ink/75">
                    <input name="optIn" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-forest-700" />
                    Keep me up to date on new prints and offers
                  </label>
                </fieldset>

                {error && <p className="mt-4 text-xs text-red-800">{error}</p>}

                <button className="btn btn-forest mt-5 w-full disabled:opacity-70 sm:mt-6" disabled={phase === "spinning"}>
                  {phase === "spinning" ? "Spinning…" : "Spin the wheel"}
                </button>
                <p className="mt-3 text-[0.68rem] leading-relaxed text-muted sm:mt-4">
                  We use your details only to send your code and, if you opt in, the occasional letter. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// The wheel face: slices with radial labels, a gold rim and a ring of bulbs. Rotated as one piece.
function Wheel() {
  const c = 200;
  const r = 178;
  const point = (deg: number, radius: number) => {
    const a = (deg * Math.PI) / 180;
    return `${c + radius * Math.cos(a)},${c + radius * Math.sin(a)}`;
  };

  return (
    <svg viewBox="0 0 400 400" aria-hidden className="h-full w-full">
      <circle cx={c} cy={c} r="196" fill="#0a211b" stroke="#D4AF37" strokeWidth="4" />
      {SEGMENTS.map((s, i) => {
        const start = -90 + i * SLICE;
        const win = i % 2 === 0;
        const fill = win ? WIN_FILLS[(i / 2) % 2] : LOSE_FILLS[((i - 1) / 2) % 2];
        return (
          <g key={i}>
            <path d={`M${c},${c} L${point(start, r)} A${r},${r} 0 0 1 ${point(start + SLICE, r)} Z`} fill={fill} stroke="#0a211b" strokeOpacity=".3" />
            <text
              x={c + r - 16}
              y={c}
              transform={`rotate(${start + SLICE / 2} ${c} ${c})`}
              textAnchor="end"
              dominantBaseline="central"
              fontSize="12.5"
              fontWeight="500"
              letterSpacing="1.4"
              fill={win ? "#0f2e25" : "#F5EFE6"}
              className="font-sans"
            >
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })}
      <circle cx={c} cy={c} r={r} fill="none" stroke="#D4AF37" strokeWidth="1.5" />
      {Array.from({ length: 20 }, (_, i) => {
        const [x, y] = point(i * 18 + 9, 187).split(",");
        return <circle key={i} cx={x} cy={y} r="3.2" fill={i % 2 ? "#E6CB7A" : "#F5EFE6"} />;
      })}
    </svg>
  );
}
