// Site-wide constants. The WhatsApp number is confirmed; email and Instagram are placeholders until the client confirms them.
export const SITE = {
  name: "Vahnika",
  tagline: "Designed in India, for everyday comfort and quiet elegance.",
  description:
    "Pure cotton bed linen in prints drawn from India's gardens, palaces and printing towns. Designed in India, for everyday comfort and quiet elegance.",
  email: "hello@vahnika.com",
  whatsapp: "https://wa.me/919899188409?text=Hello%20Vahnika%2C%20I%27d%20love%20some%20help%20choosing%20bed%20linen.",
  whatsappNumber: "+91 98991 88409",
  instagram: "https://instagram.com/",
  freeShippingNote: "Complimentary shipping across India",
  hours: "Monday to Saturday, 10am to 7pm IST",
};

// localStorage keys shared by the front-end-only flows
export const STORAGE = {
  wonCode: "vahnika-code",
  lastOrder: "vahnika-last-order",
  account: "vahnika-account",
  wishlist: "vahnika-wishlist",
};

export const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/prints", label: "Print Library" },
  { href: "/bed-to-body", label: "Bed to Body" },
  { href: "/journal", label: "Journal" },
] as const;

export const ANNOUNCEMENTS = [
  "Complimentary shipping across India",
  "Cash on delivery available",
  "Easy 7-day returns & exchanges",
  "Every set comes with matching pillow covers",
];

export function formatINR(value: number) {
  return "₹" + value.toLocaleString("en-IN");
}

export function deliveryDate(days: number, short = false) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", short ? { weekday: "short", day: "numeric", month: "short" } : { weekday: "long", day: "numeric", month: "long" });
}

// Codes the spin-to-win wheel hands out. Checkout validates against this list until the real discount engine is wired up.
export const COUPONS: Record<string, { label: string; flat?: number; percent?: number }> = {
  VAHNIKA100: { label: "₹100 off", flat: 100 },
  VAHNIKA150: { label: "₹150 off", flat: 150 },
  VAHNIKA5: { label: "5% off", percent: 5 },
  VAHNIKA10: { label: "10% off", percent: 10 },
  VAHNIKA15: { label: "15% off", percent: 15 },
};

export function couponDiscount(code: string | null, subtotal: number) {
  const c = code ? COUPONS[code] : undefined;
  if (!c) return 0;
  return Math.min(subtotal, c.flat ?? Math.round((subtotal * (c.percent ?? 0)) / 100));
}
