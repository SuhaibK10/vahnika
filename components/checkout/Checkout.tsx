"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Emblem } from "@/components/Emblem";
import { ChoiceCard, Field, PhoneField, SelectField, TextareaField } from "@/components/Field";
import { OrderLines, Totals } from "@/components/checkout/OrderLines";
import {
  ArrowIcon,
  BankIcon,
  CardIcon,
  CashIcon,
  CheckIcon,
  ChevronIcon,
  CloseIcon,
  GiftIcon,
  LockIcon,
  ReturnIcon,
  ShieldIcon,
  TruckIcon,
  UpiIcon,
} from "@/components/Icons";
import { STATES, lookupPincode } from "@/lib/india";
import { newOrderId, saveOrder } from "@/lib/orders";
import { COUPONS, STORAGE, couponDiscount, deliveryDate, formatINR } from "@/lib/site";

const EXPRESS_FEE = 149;
const PAYMENTS = [
  { id: "upi", label: "UPI", note: "Google Pay, PhonePe, Paytm or any UPI app", Icon: UpiIcon },
  { id: "card", label: "Credit or debit card", note: "Visa, Mastercard, RuPay and Amex", Icon: CardIcon },
  { id: "netbanking", label: "Net banking", note: "All major Indian banks", Icon: BankIcon },
  { id: "cod", label: "Cash on delivery", note: "Pay in cash or UPI at your door", Icon: CashIcon },
] as const;
type PaymentId = (typeof PAYMENTS)[number]["id"];
const UPI_APPS = ["Google Pay", "PhonePe", "Paytm", "BHIM"];
const BANKS = ["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Yes Bank"];
const OTHER_BANKS = ["Bank of Baroda", "Canara Bank", "IDFC First", "IndusInd", "Punjab National Bank", "Union Bank of India"];

// Front-end only for the pitch: payment is simulated and the order is saved to localStorage for the confirmation page.
export function Checkout() {
  const router = useRouter();
  const { lines, subtotal, count, ready, open, clear } = useCart();
  const [express, setExpress] = useState(false);
  const [payment, setPayment] = useState<PaymentId>("upi");
  const [upiApp, setUpiApp] = useState(UPI_APPS[0]);
  const [bank, setBank] = useState("HDFC");
  const [card, setCard] = useState({ number: "", expiry: "" });
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [gift, setGift] = useState(false);
  const [note, setNote] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [wonCode, setWonCode] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [placing, setPlacing] = useState(false);

  // A code won on the spin-to-win wheel is offered here, ready to apply
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE.wonCode);
      if (saved && COUPONS[saved]) setWonCode(saved);
    } catch {}
  }, []);

  const discount = couponDiscount(code, subtotal);
  const shipping = express ? EXPRESS_FEE : 0;
  const total = subtotal - discount + shipping;
  const pinValid = /^[1-9]\d{5}$/.test(pincode);

  function changePincode(value: string) {
    const pin = value.replace(/\D/g, "");
    setPincode(pin);
    const hit = lookupPincode(pin);
    if (hit.city) setCity(hit.city);
    if (hit.state) setState(hit.state);
  }

  function apply(raw: string) {
    const c = raw.trim().toUpperCase();
    if (!c) return;
    if (!COUPONS[c]) return setCodeError("That code isn't valid. Check the spelling and try again.");
    setCode(c);
    setCodeInput("");
    setCodeError("");
  }

  function placeOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "").trim();
    setPlacing(true);
    saveOrder({
      id: newOrderId(),
      placedAt: new Date().toISOString(),
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      address: [get("address"), get("address2")].filter(Boolean).join(", "),
      city,
      state,
      pincode,
      payment: PAYMENTS.find((p) => p.id === payment)!.label,
      express,
      gift,
      code,
      lines: lines.map(({ slug, sizeId, qty }) => ({ slug, sizeId, qty })),
      subtotal,
      discount,
      shipping,
      total,
    });
    // Build phase: open Razorpay here and confirm the order in its success callback.
    setTimeout(() => {
      router.push("/order-confirmed");
      clear();
      try {
        if (code) localStorage.removeItem(STORAGE.wonCode);
      } catch {}
    }, 1800);
  }

  if (!ready) return <div className="min-h-[70vh]" />;

  if (lines.length === 0 && !placing) {
    return (
      <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Emblem className="h-20 w-20" vColor="#1A4D3C" />
        <p className="eyebrow mt-10 text-gold-deep">Checkout</p>
        <h1 className="display-md mt-4 font-light">
          Your bag is <em className="text-forest-700">resting.</em>
        </h1>
        <p className="mt-4 text-ink/70">Add a print you love, and we&apos;ll bring you right back here.</p>
        <Link href="/shop" className="btn btn-forest mt-10">
          Shop the collection <ArrowIcon />
        </Link>
      </section>
    );
  }

  return (
    <>
      <div className="container-x flex flex-col gap-6 border-b border-sand pb-8 pt-10 sm:flex-row sm:items-end sm:justify-between lg:pt-14">
        <div className="animate-fade-up">
          <p className="eyebrow flex items-center gap-2 text-gold-deep">
            <LockIcon /> Secure checkout
          </p>
          <h1 className="display-md mt-3 font-light">
            Almost <em className="text-forest-700">yours.</em>
          </h1>
        </div>
        <ol className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted sm:gap-3">
          <li>
            <button type="button" onClick={open} className="hover:text-ink">Bag</button>
          </li>
          <li aria-hidden className="h-px w-5 bg-sand sm:w-8" />
          <li className="text-forest-700" aria-current="step">Details &amp; payment</li>
          <li aria-hidden className="h-px w-5 bg-sand sm:w-8" />
          <li>Confirmed</li>
        </ol>
      </div>

      <form onSubmit={placeOrder} className="container-x grid gap-10 pb-24 pt-8 lg:grid-cols-12 lg:gap-16 lg:pt-12">
        <div className="min-w-0 space-y-12 lg:col-span-7">
          {/* Order summary, collapsed, for phones */}
          <div className="rounded-2xl border border-sand bg-ivory lg:hidden">
            <button type="button" onClick={() => setSummaryOpen((o) => !o)} aria-expanded={summaryOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4">
              <span className="flex items-center gap-2 text-sm text-forest-700">
                {summaryOpen ? "Hide" : "Show"} order summary · {count} {count === 1 ? "piece" : "pieces"}
                <ChevronIcon className={`transition-transform duration-300 ${summaryOpen ? "rotate-180" : ""}`} />
              </span>
              <span className="font-display text-2xl">{formatINR(total)}</span>
            </button>
            {summaryOpen && <OrderLines lines={lines} className="border-t border-sand px-5" />}
          </div>

          <Step n="01" title="Contact" aside={<Link href="/account" className="text-xs text-muted underline underline-offset-4 hover:text-ink">Have an account? Sign in</Link>}>
            <div className="grid gap-4 sm:grid-cols-2">
              <PhoneField name="phone" required placeholder="98765 43210" hint="For delivery updates" />
              <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </div>
            <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-ink/75">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-forest-700" />
              Send order updates on WhatsApp
            </label>
          </Step>

          <Step n="02" title="Delivery address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" required className="sm:col-span-2" />
              <Field label="Flat, house no., building" name="address" autoComplete="address-line1" required className="sm:col-span-2" />
              <Field label="Area, street, landmark" name="address2" autoComplete="address-line2" hint="Optional" className="sm:col-span-2" />
              <div>
                <Field
                  label="Pincode"
                  name="pincode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={6}
                  pattern="[1-9][0-9]{5}"
                  title="A 6-digit pincode"
                  required
                  value={pincode}
                  onChange={(e) => changePincode(e.target.value)}
                />
                {pinValid && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-forest-700">
                    <CheckIcon width={14} height={14} /> We deliver here · COD available
                  </p>
                )}
              </div>
              <Field label="City" name="city" autoComplete="address-level2" required value={city} onChange={(e) => setCity(e.target.value)} />
              <SelectField label="State" name="state" autoComplete="address-level1" required value={state} onChange={(e) => setState(e.target.value)} className="sm:col-span-2">
                <option value="" disabled>Select your state</option>
                {STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </SelectField>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-2 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-muted">Save as</span>
              {["Home", "Work", "Other"].map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={addressType === t}
                  onClick={() => setAddressType(t)}
                  className={`rounded-full border px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.16em] transition-colors ${
                    addressType === t ? "border-forest-800 bg-forest-800 text-ivory" : "border-ink/15 text-ink/70 hover:border-forest-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Step>

          <Step n="03" title="Delivery">
            <div className="space-y-3">
              <ChoiceCard name="delivery" value="standard" checked={!express} onChange={() => setExpress(false)}>
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl">Standard</span>
                  <span className="text-sm text-forest-700">Free</span>
                </span>
                <span className="mt-0.5 block text-xs text-muted">Arrives by {deliveryDate(5, true)} · Ships in 48 hours</span>
              </ChoiceCard>
              <ChoiceCard name="delivery" value="express" checked={express} onChange={() => setExpress(true)}>
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl">Express</span>
                  <span className="text-sm">{formatINR(EXPRESS_FEE)}</span>
                </span>
                <span className="mt-0.5 block text-xs text-muted">Arrives by {deliveryDate(2, true)} · Metro cities</span>
              </ChoiceCard>
            </div>
          </Step>

          <Step n="04" title="Payment" aside={<span className="flex items-center gap-1.5 text-xs text-muted"><LockIcon /> Encrypted</span>}>
            <div className="space-y-3">
              {PAYMENTS.map(({ id, label, note: hint, Icon }) => (
                <ChoiceCard
                  key={id}
                  name="payment"
                  value={id}
                  checked={payment === id}
                  onChange={(v) => setPayment(v as PaymentId)}
                  detail={
                    id === "upi" ? (
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {UPI_APPS.map((app) => (
                            <button
                              key={app}
                              type="button"
                              aria-pressed={upiApp === app}
                              onClick={() => setUpiApp(app)}
                              className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                                upiApp === app ? "border-forest-700 bg-forest-800 text-ivory" : "border-ink/15 bg-paper hover:border-forest-600"
                              }`}
                            >
                              {app}
                            </button>
                          ))}
                        </div>
                        <Field label="Or pay with a UPI ID" placeholder="yourname@okhdfcbank" autoComplete="off" className="mt-4" />
                        <p className="mt-3 text-xs text-muted">You&apos;ll approve the payment in your UPI app. It takes a few seconds.</p>
                      </div>
                    ) : id === "card" ? (
                      <div className="grid grid-cols-2 gap-3">
                        <Field
                          label="Card number"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="1234 5678 9012 3456"
                          value={card.number}
                          onChange={(e) => setCard((c) => ({ ...c, number: e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ") }))}
                          className="col-span-2"
                        />
                        <Field
                          label="Expiry"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM / YY"
                          value={card.expiry}
                          onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1 / ") }))}
                        />
                        <Field label="CVV" type="password" inputMode="numeric" autoComplete="cc-csc" maxLength={4} placeholder="•••" />
                        <Field label="Name on card" autoComplete="cc-name" className="col-span-2" />
                        <p className="col-span-2 text-xs text-muted">Processed securely by Razorpay. Vahnika never stores your card details.</p>
                      </div>
                    ) : id === "netbanking" ? (
                      <div>
                        <div className="grid grid-cols-3 gap-2">
                          {BANKS.map((b) => (
                            <button
                              key={b}
                              type="button"
                              aria-pressed={bank === b}
                              onClick={() => setBank(b)}
                              className={`rounded-xl border px-2 py-3 text-xs transition-colors ${
                                bank === b ? "border-forest-700 bg-forest-800 text-ivory" : "border-ink/15 bg-paper hover:border-forest-600"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                        <SelectField label="Other banks" value={BANKS.includes(bank) ? "" : bank} onChange={(e) => setBank(e.target.value)} className="mt-4">
                          <option value="" disabled>Choose another bank</option>
                          {OTHER_BANKS.map((b) => (
                            <option key={b}>{b}</option>
                          ))}
                        </SelectField>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed text-ink/75">
                        Pay in cash or by UPI when your order arrives, at no extra charge. Our courier partner will call before delivery.
                      </p>
                    )
                  }
                >
                  <span className="flex items-center gap-4">
                    <Icon className="shrink-0 text-forest-700" />
                    <span className="min-w-0">
                      <span className="block font-display text-xl leading-tight">{label}</span>
                      <span className="block text-xs text-muted">{hint}</span>
                    </span>
                  </span>
                </ChoiceCard>
              ))}
            </div>
          </Step>

          <Step n="05" title="Make it a gift" aside={<span className="text-xs text-muted">Optional</span>}>
            <label className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 transition-colors ${gift ? "border-forest-700 bg-ivory" : "border-ink/15 hover:border-forest-600"}`}>
              <GiftIcon className="h-8 w-8 shrink-0 text-gold-deep" />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl leading-tight">Gift-box this order</span>
                <span className="block text-xs text-muted">Complimentary box and a handwritten note. Prices are left off the invoice.</span>
              </span>
              <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="peer sr-only" />
              <span aria-hidden className="relative h-6 w-11 shrink-0 rounded-full bg-ink/15 transition-colors peer-checked:bg-forest-700 peer-focus-visible:outline-2 peer-focus-visible:outline-gold after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-paper after:shadow after:transition-transform peer-checked:after:translate-x-5" />
            </label>
            {gift && (
              <div className="animate-fade-in mt-4">
                <TextareaField
                  label="Your note (we'll write it by hand)"
                  hint={`${note.length}/200`}
                  rows={3}
                  maxLength={200}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Happy griha pravesh! May every morning here be a slow one."
                />
              </div>
            )}
          </Step>
        </div>

        {/* Summary */}
        <aside className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="rounded-[28px] bg-ivory p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-[1.9rem] leading-none">Order summary</h2>
                <button type="button" onClick={open} className="text-xs text-muted underline underline-offset-4 hover:text-ink">
                  Edit bag
                </button>
              </div>
              <OrderLines lines={lines} className="mt-4 hidden border-b border-sand lg:block" />

              <div className="mt-6">
                {code ? (
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-forest-700/40 bg-paper px-5 py-3">
                    <span className="flex items-center gap-2 text-sm text-forest-700">
                      <CheckIcon /> <span className="font-medium tracking-[0.08em]">{code}</span> · {COUPONS[code].label}
                    </span>
                    <button type="button" onClick={() => setCode(null)} aria-label="Remove code" className="rounded-full p-1 text-muted hover:bg-sand/70 hover:text-ink">
                      <CloseIcon width={16} height={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    {wonCode && (
                      <button
                        type="button"
                        onClick={() => apply(wonCode)}
                        className="mb-3 flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed border-gold-deep/50 bg-paper px-5 py-3 text-left text-sm transition-colors hover:border-gold-deep"
                      >
                        <span>
                          You won <span className="font-medium tracking-[0.08em] text-forest-800">{wonCode}</span> on the wheel
                        </span>
                        <span className="shrink-0 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-gold-deep">Apply</span>
                      </button>
                    )}
                    <div className="flex gap-2">
                      <input
                        value={codeInput}
                        onChange={(e) => {
                          setCodeInput(e.target.value);
                          setCodeError("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            apply(codeInput);
                          }
                        }}
                        placeholder="Discount code"
                        aria-label="Discount code"
                        className="min-w-0 flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3 text-base uppercase outline-none placeholder:normal-case placeholder:text-muted/70 focus:border-forest-700 sm:text-sm"
                      />
                      <button type="button" onClick={() => apply(codeInput)} className="btn btn-ghost-dark !px-5 !py-3">
                        Apply
                      </button>
                    </div>
                    {codeError && <p className="mt-2 text-xs text-red-800">{codeError}</p>}
                  </>
                )}
              </div>

              <div className="mt-6">
                <Totals subtotal={subtotal} discount={discount} code={code} shipping={shipping} total={total} />
              </div>
              {discount > 0 && (
                <p className="mt-4 rounded-xl bg-forest-800 px-4 py-2.5 text-center text-xs text-ivory">
                  You&apos;re saving {formatINR(discount)} on this order
                </p>
              )}

              <button type="submit" disabled={placing} className="btn btn-gold mt-6 w-full disabled:opacity-70">
                {payment === "cod" ? `Place order · ${formatINR(total)}` : `Pay ${formatINR(total)}`} <ArrowIcon />
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.7rem] text-muted">
                <LockIcon width={13} height={13} /> Payments secured by Razorpay
              </p>
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-3 text-center text-[0.7rem] leading-snug text-ink/70">
              {[
                [TruckIcon, "Free shipping across India"],
                [ReturnIcon, "Easy 7-day returns"],
                [ShieldIcon, "Cash on delivery"],
              ].map(([Icon, text]) => {
                const I = Icon as typeof TruckIcon;
                return (
                  <li key={text as string} className="flex flex-col items-center gap-2">
                    <I className="h-7 w-7 text-forest-700" /> {text as string}
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-muted">
              By placing your order you agree to our{" "}
              <Link href="/policies/terms" className="underline underline-offset-2 hover:text-ink">terms</Link> and{" "}
              <Link href="/policies/privacy" className="underline underline-offset-2 hover:text-ink">privacy policy</Link>.
            </p>
          </div>
        </aside>
      </form>

      {placing && (
        <div role="status" className="animate-fade-in fixed inset-0 z-[95] grid place-items-center bg-paper/92 backdrop-blur-sm">
          <div className="flex flex-col items-center px-8 text-center">
            <Emblem className="h-20 w-20 animate-pulse" vColor="#1A4D3C" />
            <p className="mt-8 font-display text-3xl">{payment === "cod" ? "Confirming your order…" : "Securing your payment…"}</p>
            <p className="mt-2 text-sm text-muted">Please don&apos;t close this window.</p>
          </div>
        </div>
      )}
    </>
  );
}

function Step({ n, title, aside, children }: { n: string; title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 border-b border-sand pb-4">
        <h2 className="flex items-baseline gap-3 font-display text-[1.9rem] leading-none">
          <span className="font-display text-base italic text-gold-deep">{n}</span>
          {title}
        </h2>
        {aside}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
