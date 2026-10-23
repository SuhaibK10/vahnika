import { PRODUCTS } from "./products";
import { STORAGE } from "./site";

export type OrderLine = { slug: string; sizeId: string; qty: number };

export type Order = {
  id: string;
  placedAt: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment: string;
  express: boolean;
  gift: boolean;
  code: string | null;
  lines: OrderLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

export type OrderStatus = "Confirmed" | "Packed" | "In transit" | "Delivered";

export const STATUSES: OrderStatus[] = ["Confirmed", "Packed", "In transit", "Delivered"];

export function newOrderId() {
  return `VAH-${Math.floor(10000 + Math.random() * 90000)}`;
}

export function saveOrder(order: Order) {
  try {
    localStorage.setItem(STORAGE.lastOrder, JSON.stringify(order));
  } catch {}
}

export function loadOrder(): Order | null {
  try {
    const saved = localStorage.getItem(STORAGE.lastOrder);
    return saved ? (JSON.parse(saved) as Order) : null;
  } catch {
    return null;
  }
}

function daysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

// PLACEHOLDER order — shown on the confirmation page when it is opened directly, so the pitch never lands on a blank screen.
export const SAMPLE_ORDER: Order = {
  id: "VAH-24817",
  placedAt: daysAgo(0),
  name: "Ananya Rao",
  phone: "98450 12345",
  email: "ananya@example.com",
  address: "12, Jasmine Lane, Indiranagar",
  city: "Bengaluru",
  state: "Karnataka",
  pincode: "560038",
  payment: "UPI",
  express: false,
  gift: true,
  code: "VAHNIKA10",
  lines: [
    { slug: "mor-bagh", sizeId: "king", qty: 1 },
    { slug: "neela-jharokha", sizeId: "queen", qty: 1 },
  ],
  subtotal: 2500,
  discount: 250,
  shipping: 0,
  total: 2250,
};

// PLACEHOLDER order history for the account page
export const PAST_ORDERS: (Pick<Order, "id" | "placedAt" | "lines" | "total"> & { status: OrderStatus })[] = [
  { id: "VAH-23544", placedAt: daysAgo(3), status: "In transit", lines: [{ slug: "neela-jharokha", sizeId: "queen", qty: 1 }], total: 1050 },
  {
    id: "VAH-21907",
    placedAt: daysAgo(41),
    status: "Delivered",
    lines: [
      { slug: "gulabi-bagh", sizeId: "king", qty: 1 },
      { slug: "rangeen-tulip", sizeId: "double", qty: 1 },
    ],
    total: 3700,
  },
];

export function formatOrderDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

// Joins saved lines back to the catalogue, in the same shape as the bag's lines
export function resolveLines(lines: OrderLine[]) {
  return lines.flatMap((l) => {
    const product = PRODUCTS.find((p) => p.slug === l.slug);
    const size = product?.sizes.find((s) => s.id === l.sizeId);
    return product && size ? [{ ...l, product, size, lineTotal: size.price * l.qty }] : [];
  });
}
