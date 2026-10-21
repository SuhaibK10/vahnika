// Site-wide constants. Contact details are placeholders until the client confirms them.
export const SITE = {
  name: "Vahnika",
  tagline: "Designed in India, for everyday comfort and quiet elegance.",
  description:
    "Pure cotton bed linen in prints drawn from India's gardens, palaces and printing towns. Designed in India, for everyday comfort and quiet elegance.",
  email: "hello@vahnika.com",
  whatsapp: "https://wa.me/?text=Hello%20Vahnika%2C%20I%27d%20love%20some%20help%20choosing%20bed%20linen.",
  instagram: "https://instagram.com/",
  freeShippingNote: "Complimentary shipping across India",
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
  "New in — Azure Heritage, a Jaipuri classic",
];

export function formatINR(value: number) {
  return "₹" + value.toLocaleString("en-IN");
}
