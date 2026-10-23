"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Field, PhoneField, SelectField } from "@/components/Field";
import { ArrowIcon, CheckIcon, CloseIcon, GiftIcon, GoogleIcon, LogoutIcon, PackageIcon, PinIcon, PlusIcon, UserIcon } from "@/components/Icons";
import { STATES } from "@/lib/india";
import { MEDIA } from "@/lib/media";
import { PAST_ORDERS, SAMPLE_ORDER, formatOrderDate, loadOrder, resolveLines, type OrderStatus } from "@/lib/orders";
import { STORAGE, formatINR } from "@/lib/site";

type User = { name: string; phone: string; email: string; since: string; whatsapp: boolean; letters: boolean };
type Address = { id: number; label: string; name: string; line: string; city: string; state: string; pincode: string };
type Tab = "orders" | "addresses" | "profile";

const TABS: { id: Tab; label: string; Icon: typeof UserIcon }[] = [
  { id: "orders", label: "Orders", Icon: PackageIcon },
  { id: "addresses", label: "Addresses", Icon: PinIcon },
  { id: "profile", label: "Profile", Icon: UserIcon },
];

function loadUser(): User | null {
  try {
    const saved = localStorage.getItem(STORAGE.account);
    return saved ? (JSON.parse(saved) as User) : null;
  } catch {
    return null;
  }
}

function saveUser(user: User | null) {
  try {
    if (user) localStorage.setItem(STORAGE.account, JSON.stringify(user));
    else localStorage.removeItem(STORAGE.account);
  } catch {}
}

// Front-end only for the pitch: any 6-digit code signs in, and the account lives in localStorage.
export function Account() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(loadUser());
    setReady(true);
  }, []);

  function update(next: User | null) {
    saveUser(next);
    setUser(next);
    window.scrollTo({ top: 0 });
  }

  if (!ready) return <div className="min-h-[80vh]" />;
  return user ? <Dashboard user={user} onUpdate={update} /> : <SignIn onDone={update} />;
}

// PLACEHOLDER identity for the pitch: with real Google sign-in, the name and email come back from Google.
const GOOGLE_DEMO = { name: "Ananya Rao", email: "ananya.rao@gmail.com" };

/* ─────────────── Sign in: phone → OTP → name, or Google → mobile number ─────────────── */
function SignIn({ onDone }: { onDone: (user: User) => void }) {
  const [step, setStep] = useState<"phone" | "otp" | "name" | "google">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [seconds, setSeconds] = useState(30);
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== "otp") return;
    boxes.current[0]?.focus();
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [step]);

  // Short pause so each step feels like a round trip
  function next(e: FormEvent, then: () => void) {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      then();
    }, 700);
  }

  // Stands in for Google's consent popup
  function continueWithGoogle() {
    setGoogleBusy(true);
    setTimeout(() => {
      setGoogleBusy(false);
      setStep("google");
    }, 900);
  }

  function typeDigit(i: number, value: string) {
    const digits = value.replace(/\D/g, "");
    const filled = [...otp];
    digits
      .slice(0, 6 - i)
      .split("")
      .forEach((d, k) => (filled[i + k] = d));
    if (!digits) filled[i] = "";
    setOtp(filled);
    if (digits) boxes.current[Math.min(5, i + digits.length)]?.focus();
  }

  const masked = `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;

  return (
    <section className="grid lg:min-h-[calc(100svh-7rem)] lg:grid-cols-2">
      <div className="grain relative hidden overflow-hidden bg-forest-950 text-ivory lg:block">
        <Image src={MEDIA.sunlightBedShadow} alt="" fill priority sizes="50vw" placeholder="blur" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
        <div className="absolute inset-x-12 bottom-14">
          <p className="display-md max-w-md font-display font-light">
            Your bed, <em className="text-gold-soft">remembered.</em>
          </p>
          <Perks className="mt-8 text-ivory/80" />
        </div>
      </div>

      <div className="flex items-center justify-center px-5 pb-16 pt-6 sm:px-8 lg:px-16 lg:py-16">
        <div className="w-full max-w-md">
          {step === "phone" && (
            <form onSubmit={(e) => next(e, () => setStep("otp"))} className="animate-fade-up">
              <p className="eyebrow text-gold-deep">Your Vahnika account</p>
              <h1 className="display-md mt-4 font-light">
                Welcome <em className="text-forest-700">home.</em>
              </h1>
              <p className="mt-4 text-ink/70">Sign in or create an account with your mobile number. No passwords to remember.</p>
              <PhoneField className="mt-8" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="98765 43210" />
              <button disabled={busy || googleBusy} className="btn btn-forest mt-5 w-full disabled:opacity-70">
                {busy ? "Sending code…" : <>Send OTP <ArrowIcon /></>}
              </button>
              <div className="my-6 flex items-center gap-4 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-muted">
                <span className="h-px flex-1 bg-sand" /> or <span className="h-px flex-1 bg-sand" />
              </div>
              <button
                type="button"
                onClick={continueWithGoogle}
                disabled={busy || googleBusy}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-ink/20 bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-forest-700 hover:bg-ivory disabled:opacity-70"
              >
                <GoogleIcon /> {googleBusy ? "Connecting to Google…" : "Continue with Google"}
              </button>
              <p className="mt-5 text-center text-xs leading-relaxed text-muted">
                By continuing you agree to our <Link href="/policies/terms" className="underline underline-offset-2">terms</Link> and{" "}
                <Link href="/policies/privacy" className="underline underline-offset-2">privacy policy</Link>.
              </p>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={(e) => next(e, () => setStep("name"))} className="animate-fade-up">
              <p className="eyebrow text-gold-deep">Verify your number</p>
              <h1 className="display-md mt-4 font-light">
                Enter the <em className="text-forest-700">code</em>
              </h1>
              <p className="mt-4 text-ink/70">
                We&apos;ve sent a 6-digit code to {masked}.{" "}
                <button type="button" onClick={() => setStep("phone")} className="text-forest-700 underline underline-offset-4">
                  Change
                </button>
              </p>
              <div className="mt-8 grid grid-cols-6 gap-2 sm:gap-3">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      boxes.current[i] = el;
                    }}
                    value={d}
                    onChange={(e) => typeDigit(i, e.target.value)}
                    onKeyDown={(e) => e.key === "Backspace" && !d && i > 0 && boxes.current[i - 1]?.focus()}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    aria-label={`Digit ${i + 1}`}
                    className="h-14 w-full rounded-2xl border border-ink/15 bg-paper text-center font-display text-2xl outline-none transition-colors focus:border-forest-700 sm:h-16"
                  />
                ))}
              </div>
              <button disabled={busy || otp.join("").length < 6} className="btn btn-forest mt-6 w-full disabled:opacity-50">
                {busy ? "Verifying…" : "Verify & continue"}
              </button>
              <p className="mt-5 text-center text-sm text-muted">
                {seconds > 0 ? (
                  <>Resend code in 0:{String(seconds).padStart(2, "0")}</>
                ) : (
                  <button type="button" onClick={() => setSeconds(30)} className="text-forest-700 underline underline-offset-4">
                    Resend code
                  </button>
                )}
              </p>
            </form>
          )}

          {step === "name" && (
            <form
              onSubmit={(e) => {
                const data = new FormData(e.currentTarget);
                next(e, () =>
                  onDone({
                    name: String(data.get("name")).trim(),
                    email: String(data.get("email")).trim(),
                    phone,
                    since: new Date().toISOString(),
                    whatsapp: true,
                    letters: true,
                  }),
                );
              }}
              className="animate-fade-up"
            >
              <p className="eyebrow flex items-center gap-2 text-gold-deep">
                <CheckIcon /> Number verified
              </p>
              <h1 className="display-md mt-4 font-light">
                What should we <em className="text-forest-700">call you?</em>
              </h1>
              <div className="mt-8 space-y-4">
                <Field label="Your name" name="name" autoComplete="name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" hint="For order receipts" />
              </div>
              <button disabled={busy} className="btn btn-forest mt-6 w-full disabled:opacity-70">
                {busy ? "Setting things up…" : <>Create my account <ArrowIcon /></>}
              </button>
            </form>
          )}

          {step === "google" && (
            <form
              onSubmit={(e) =>
                next(e, () =>
                  onDone({ ...GOOGLE_DEMO, phone, since: new Date().toISOString(), whatsapp: true, letters: true }),
                )
              }
              className="animate-fade-up"
            >
              <p className="eyebrow flex items-center gap-2 text-gold-deep">
                <GoogleIcon width={14} height={14} /> Connected with Google
              </p>
              <h1 className="display-md mt-4 font-light">
                One last <em className="text-forest-700">detail.</em>
              </h1>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-sand bg-ivory px-5 py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-800 font-display text-xl text-gold">
                  {GOOGLE_DEMO.name[0]}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{GOOGLE_DEMO.name}</span>
                  <span className="block truncate text-xs text-muted">{GOOGLE_DEMO.email}</span>
                </span>
                <button type="button" onClick={() => setStep("phone")} className="ml-auto shrink-0 text-xs text-muted underline underline-offset-4 hover:text-ink">
                  Not you?
                </button>
              </div>
              <p className="mt-6 text-sm text-ink/70">Add your mobile number for delivery updates and cash on delivery.</p>
              <PhoneField className="mt-4" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="98765 43210" />
              <button disabled={busy} className="btn btn-forest mt-6 w-full disabled:opacity-70">
                {busy ? "Setting things up…" : <>Finish <ArrowIcon /></>}
              </button>
            </form>
          )}

          <Perks className="mt-14 border-t border-sand pt-8 text-ink/75 lg:hidden" />
        </div>
      </div>
    </section>
  );
}

function Perks({ className = "" }: { className?: string }) {
  return (
    <ul className={`space-y-3 text-sm ${className}`}>
      {["Track every order in one place", "Faster checkout with saved addresses", "Early access to new prints", "A little something on your birthday"].map((p) => (
        <li key={p} className="flex items-center gap-3">
          <CheckIcon className="shrink-0 text-gold" /> {p}
        </li>
      ))}
    </ul>
  );
}

/* ─────────────── Dashboard ─────────────── */
function Dashboard({ user, onUpdate }: { user: User; onUpdate: (user: User | null) => void }) {
  const [tab, setTab] = useState<Tab>("orders");
  const last = loadOrder();
  const orders = [
    ...(last ? [{ id: last.id, placedAt: last.placedAt, lines: last.lines, total: last.total, status: "Confirmed" as OrderStatus }] : []),
    ...PAST_ORDERS,
  ];
  const first = user.name.split(" ")[0];
  const since = new Date(user.since).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <>
      <section className="grain relative overflow-hidden bg-forest-900 text-ivory">
        <div className="container-x flex flex-col gap-8 py-14 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div className="animate-fade-up">
            <p className="eyebrow text-gold">My account</p>
            <h1 className="display-lg mt-4 font-light">
              Namaste, <em className="text-gold-soft">{first}.</em>
            </h1>
            <p className="mt-4 text-sm text-ivory/60">Member since {since}</p>
          </div>
          <dl className="animate-fade-up flex gap-10 [animation-delay:150ms]">
            {[
              [orders.length, "Orders"],
              [orders.filter((o) => o.status === "Delivered").length, "Delivered"],
              [orders.reduce((n, o) => n + o.lines.reduce((m, l) => m + l.qty, 0), 0), "Pieces"],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="font-display text-4xl leading-none text-gold-soft">{value}</dd>
                <dt className="eyebrow mt-2 text-ivory/55">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-paper pb-28 pt-8 lg:pt-14">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-14">
          <nav aria-label="Account" className="flex flex-wrap gap-2 lg:col-span-3 lg:flex-col lg:flex-nowrap lg:gap-1">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={tab === id ? "page" : undefined}
                className={`flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors lg:rounded-2xl ${
                  tab === id ? "bg-forest-800 text-ivory" : "border border-ink/15 text-ink/70 hover:border-forest-700 lg:border-transparent lg:hover:bg-ivory"
                }`}
              >
                <Icon width={18} height={18} /> {label}
              </button>
            ))}
            <button
              onClick={() => onUpdate(null)}
              className="flex shrink-0 items-center gap-3 rounded-full border border-ink/15 px-5 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-forest-700 lg:mt-6 lg:rounded-2xl lg:border-transparent lg:hover:bg-ivory"
            >
              <LogoutIcon /> Sign out
            </button>
          </nav>

          <div key={tab} className="animate-fade-up min-w-0 lg:col-span-9">
            {tab === "orders" && <Orders orders={orders} />}
            {tab === "addresses" && <Addresses name={user.name} />}
            {tab === "profile" && <Profile user={user} onSave={onUpdate} />}
          </div>
        </div>
      </section>
    </>
  );
}

function Panel({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-sand pb-5">
        <h2 className="font-display text-[2.1rem] leading-none">{title}</h2>
        {aside}
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

const STATUS_TONE: Record<OrderStatus, string> = {
  Confirmed: "bg-gold/20 text-gold-deep",
  Packed: "bg-gold/20 text-gold-deep",
  "In transit": "bg-forest-800 text-ivory",
  Delivered: "bg-forest-700/10 text-forest-700",
};

function Orders({ orders }: { orders: (typeof PAST_ORDERS)[number][] }) {
  const { add } = useCart();

  return (
    <Panel title="Your orders" aside={<span className="text-sm text-muted">{orders.length} orders</span>}>
      <div className="space-y-5">
        {orders.map((o) => {
          const lines = resolveLines(o.lines);
          const pieces = lines.reduce((n, l) => n + l.qty, 0);
          return (
            <article key={o.id} className="rounded-[24px] border border-sand p-5 sm:p-7">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="eyebrow text-muted">Order {o.id}</p>
                  <p className="mt-1.5 font-display text-2xl leading-none">{formatOrderDate(o.placedAt)}</p>
                </div>
                <span className={`rounded-full px-3.5 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] ${STATUS_TONE[o.status]}`}>{o.status}</span>
              </header>
              <ul className="mt-6 flex flex-wrap gap-5">
                {lines.map((l) => (
                  <li key={l.slug + l.sizeId} className="flex items-center gap-4">
                    <Link href={`/products/${l.slug}`} className="relative h-20 w-16 shrink-0 overflow-hidden rounded-t-full bg-sand">
                      <Image src={l.product.images[0]} alt={l.product.name} fill sizes="64px" className="object-cover" />
                    </Link>
                    <div>
                      <p className="font-display text-xl leading-tight">{l.product.name}</p>
                      <p className="text-xs text-muted">
                        {l.size.label} · Qty {l.qty}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-sand pt-5">
                <p className="text-sm text-muted">
                  {pieces} {pieces === 1 ? "piece" : "pieces"} · <span className="text-ink">{formatINR(o.total)}</span>
                </p>
                <div className="flex gap-2">
                  {o.status === "Delivered" ? (
                    <button onClick={() => o.lines.forEach((l) => add(l.slug, l.sizeId, l.qty))} className="btn btn-forest !px-5 !py-2.5">
                      Buy again
                    </button>
                  ) : (
                    <Link href={`/track-order?order=${o.id}`} className="btn btn-forest !px-5 !py-2.5">
                      Track order
                    </Link>
                  )}
                  <Link href="/help" className="btn btn-ghost-dark !px-5 !py-2.5">
                    Get help
                  </Link>
                </div>
              </footer>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}

function Addresses({ name }: { name: string }) {
  const base = loadOrder() ?? SAMPLE_ORDER;
  const [list, setList] = useState<Address[]>([
    { id: 1, label: "Home", name, line: base.address, city: base.city, state: base.state, pincode: base.pincode },
  ]);
  const [defaultId, setDefaultId] = useState(1);
  const [adding, setAdding] = useState(false);

  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k)).trim();
    setList((l) => [...l, { id: Date.now(), label: get("label") || "Other", name: get("name"), line: get("line"), city: get("city"), state: get("state"), pincode: get("pincode") }]);
    setAdding(false);
  }

  return (
    <Panel title="Saved addresses">
      <div className="grid gap-5 sm:grid-cols-2">
        {list.map((a) => (
          <div key={a.id} className={`rounded-[24px] border p-6 ${a.id === defaultId ? "border-forest-700 bg-ivory" : "border-sand"}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow text-forest-700">{a.label}</p>
              {a.id === defaultId && <span className="rounded-full bg-forest-800 px-3 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-ivory">Default</span>}
            </div>
            <div className="mt-4 space-y-0.5 text-sm leading-relaxed text-ink/75">
              <p className="font-medium text-ink">{a.name}</p>
              <p>{a.line}</p>
              <p>
                {a.city}, {a.state} {a.pincode}
              </p>
            </div>
            <div className="mt-5 flex gap-5 text-xs text-muted">
              {a.id !== defaultId && (
                <button onClick={() => setDefaultId(a.id)} className="underline underline-offset-4 hover:text-ink">Set as default</button>
              )}
              {list.length > 1 && (
                <button onClick={() => setList((l) => l.filter((x) => x.id !== a.id))} className="underline underline-offset-4 hover:text-ink">Remove</button>
              )}
            </div>
          </div>
        ))}
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-ink/25 text-sm text-muted transition-colors hover:border-forest-700 hover:text-forest-700"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ivory">
              <PlusIcon />
            </span>
            Add a new address
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={save} className="animate-fade-up mt-8 rounded-[24px] bg-ivory p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl">New address</p>
            <button type="button" onClick={() => setAdding(false)} aria-label="Cancel" className="rounded-full p-2 hover:bg-sand/70">
              <CloseIcon />
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" defaultValue={name} required />
            <Field label="Label" name="label" placeholder="Home, Work, Parents'…" />
            <Field label="Address" name="line" required className="sm:col-span-2" />
            <Field label="City" name="city" required />
            <Field label="Pincode" name="pincode" inputMode="numeric" maxLength={6} pattern="[1-9][0-9]{5}" required />
            <SelectField label="State" name="state" required defaultValue="" className="sm:col-span-2">
              <option value="" disabled>Select your state</option>
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </SelectField>
          </div>
          <button className="btn btn-forest mt-6">Save address</button>
        </form>
      )}
    </Panel>
  );
}

function Profile({ user, onSave }: { user: User; onSave: (user: User) => void }) {
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState({ whatsapp: user.whatsapp, letters: user.letters });

  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    onSave({ ...user, ...prefs, name: String(d.get("name")).trim() || user.name, email: String(d.get("email")).trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  }

  return (
    <Panel title="Profile">
      <form onSubmit={save} className="max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" defaultValue={user.name} required />
          <Field label="Email" name="email" type="email" defaultValue={user.email} placeholder="you@example.com" />
          <PhoneField label="Mobile number" hint="Verified" value={user.phone} readOnly className="opacity-80" />
          <Field label="Birthday" type="date" hint="For a little surprise" />
        </div>

        <div className="mt-10">
          <p className="eyebrow text-muted">Keep in touch</p>
          <div className="mt-4 divide-y divide-sand rounded-[24px] border border-sand">
            {[
              { key: "whatsapp" as const, title: "Order updates on WhatsApp", note: "Dispatch, delivery and anything we need from you." },
              { key: "letters" as const, title: "Letters from Vahnika", note: "One letter a month: new prints, stories and early access." },
            ].map((p) => (
              <label key={p.key} className="flex cursor-pointer items-center gap-4 px-6 py-5">
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{p.title}</span>
                  <span className="block text-xs text-muted">{p.note}</span>
                </span>
                <input
                  type="checkbox"
                  checked={prefs[p.key]}
                  onChange={(e) => setPrefs((x) => ({ ...x, [p.key]: e.target.checked }))}
                  className="peer sr-only"
                />
                <span aria-hidden className="relative h-6 w-11 shrink-0 rounded-full bg-ink/15 transition-colors peer-checked:bg-forest-700 peer-focus-visible:outline-2 peer-focus-visible:outline-gold after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-paper after:shadow after:transition-transform peer-checked:after:translate-x-5" />
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-5">
          <button className="btn btn-forest">Save changes</button>
          {saved && (
            <p className="animate-fade-in flex items-center gap-2 text-sm text-forest-700">
              <CheckIcon /> Saved
            </p>
          )}
        </div>
      </form>

      <div className="mt-14 flex items-center gap-5 rounded-[24px] bg-forest-800 p-6 text-ivory sm:p-8">
        <GiftIcon className="h-10 w-10 shrink-0 text-gold" />
        <div>
          <p className="font-display text-2xl leading-tight">Refer a friend, both get ₹200</p>
          <p className="mt-1 text-sm text-ivory/65">Share your code <span className="tracking-[0.12em] text-gold-soft">{user.name.split(" ")[0].toUpperCase().slice(0, 8)}200</span>. It works on their first order.</p>
        </div>
      </div>
    </Panel>
  );
}
