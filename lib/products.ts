import type { StaticImageData } from "next/image";

import morBagh1 from "@/public/images/products/mor-bagh-1.jpg";
import morBagh2 from "@/public/images/products/mor-bagh-2.jpg";
import morBagh3 from "@/public/images/products/mor-bagh-3.jpg";
import raatRani1 from "@/public/images/products/raat-rani-1.jpg";
import raatRani2 from "@/public/images/products/raat-rani-2.jpg";
import raatRani3 from "@/public/images/products/raat-rani-3.jpg";
import neela1 from "@/public/images/products/neela-jharokha-1.jpg";
import neela2 from "@/public/images/products/neela-jharokha-2.jpg";
import neela3 from "@/public/images/products/neela-jharokha-3.jpg";
import gulabi1 from "@/public/images/products/gulabi-bagh-1.jpg";
import gulabi2 from "@/public/images/products/gulabi-bagh-2.jpg";
import gulabi3 from "@/public/images/products/gulabi-bagh-3.jpg";
import kairi1 from "@/public/images/products/kairi-jaal-1.jpg";
import kairi2 from "@/public/images/products/kairi-jaal-2.jpg";
import kairi3 from "@/public/images/products/kairi-jaal-3.jpg";
import sarson1 from "@/public/images/products/sarson-phool-1.jpg";
import sarson2 from "@/public/images/products/sarson-phool-2.jpg";
import sarson3 from "@/public/images/products/sarson-phool-3.jpg";
import saanjh1 from "@/public/images/products/saanjh-1.jpg";
import saanjh2 from "@/public/images/products/saanjh-2.jpg";
import saanjh3 from "@/public/images/products/saanjh-3.jpg";
import tulip1 from "@/public/images/products/rangeen-tulip-1.jpg";
import tulip2 from "@/public/images/products/rangeen-tulip-2.jpg";
import tulip3 from "@/public/images/products/rangeen-tulip-3.jpg";

export type PrintFamily = "Mughal Garden" | "Jaipuri Classics" | "Modern Folk";
export type Palette = "Ivory" | "Indigo" | "Rose" | "Earth" | "Charcoal";
export type Category = "Bedsheet Sets" | "Quilts";

export type Size = { id: string; label: string; dims: string; price: number };

export type Product = {
  slug: string;
  name: string;
  meaning: string;
  family: PrintFamily;
  category: Category;
  badge?: "Signature" | "New" | "Bestseller" | "Limited";
  palette: Palette[];
  colours: { name: string; hex: string }[];
  sizes: Size[];
  images: StaticImageData[];
  short: string;
  story: string;
  print: string;
  contents: string;
};

const KING = { id: "king", label: "King", dims: "108 × 108 in · 274 × 274 cm" };
const QUEEN = { id: "queen", label: "Queen", dims: "90 × 100 in · 228 × 254 cm" };
const SET = "1 flat bedsheet + 2 matching pillow covers";

// Sample catalogue for the pitch. Raat Rani mirrors the live listing on vahnika.com;
// names, stories and prices for the other prints are proposals to confirm with the client.
export const PRODUCTS: Product[] = [
  {
    slug: "mor-bagh",
    name: "Mor Bagh",
    meaning: "The peacock garden",
    family: "Mughal Garden",
    category: "Bedsheet Sets",
    badge: "Signature",
    palette: ["Ivory", "Earth"],
    colours: [
      { name: "Ivory", hex: "#EFE6D2" },
      { name: "Rust", hex: "#A4452F" },
      { name: "Sage", hex: "#8C9A78" },
      { name: "Walnut", hex: "#5A4434" },
    ],
    sizes: [
      { ...KING, price: 1450 },
      { ...QUEEN, price: 1250 },
    ],
    images: [morBagh1, morBagh2, morBagh3],
    short: "Peacocks in procession through curling vines of ivory, rust and sage.",
    story:
      "In the old gardens of Rajputana, it was said the peacocks danced only when rain was near. Mor Bagh follows their slow procession through curling vines and tiny buds, on an ivory ground that keeps a room light, with rust and sage that warm it like late-afternoon sun on sandstone.",
    print: "Jaipuri print",
    contents: SET,
  },
  {
    slug: "raat-rani",
    name: "Raat Rani",
    meaning: "Queen of the night",
    family: "Mughal Garden",
    category: "Bedsheet Sets",
    badge: "Bestseller",
    palette: ["Charcoal", "Rose"],
    colours: [
      { name: "Charcoal", hex: "#4A4A50" },
      { name: "Rose", hex: "#C4497F" },
      { name: "Lagoon", hex: "#4C8C95" },
    ],
    sizes: [{ ...KING, price: 1250 }],
    images: [raatRani1, raatRani2, raatRani3],
    short: "Night-blooming florals in rose and lagoon on a soft charcoal ground.",
    story:
      "Raat Rani is the jasmine that only opens after dark, filling courtyards with its scent long after the house has gone quiet. We printed it the way the night looks: rose and lagoon blooms glowing against charcoal. The deep ground is made possible by discharge printing, where colour is lifted from dyed cotton to let the flowers bloom through.",
    print: "Discharge print, 200 thread count",
    contents: SET,
  },
  {
    slug: "saanjh",
    name: "Saanjh",
    meaning: "Dusk",
    family: "Modern Folk",
    category: "Bedsheet Sets",
    palette: ["Rose"],
    colours: [
      { name: "Mauve", hex: "#B07AA6" },
      { name: "Blush", hex: "#E9B7B5" },
      { name: "Slate", hex: "#7B8796" },
    ],
    sizes: [
      { ...KING, price: 1250 },
      { ...QUEEN, price: 1050 },
    ],
    images: [saanjh1, saanjh2, saanjh3],
    short: "Soft medallions in mauve and blush, the colour of the sky just after sunset.",
    story:
      "Saanjh is the hour between day and night, when the sky turns mauve and the first lamp is lit. Its medallions are drawn in blush and slate on a dusky mauve ground: romantic without being loud, and easy to pair with plain white or grey.",
    print: "Jaipuri print",
    contents: SET,
  },
  {
    slug: "gulabi-bagh",
    name: "Gulabi Bagh",
    meaning: "The rose garden",
    family: "Mughal Garden",
    category: "Bedsheet Sets",
    palette: ["Ivory", "Rose"],
    colours: [
      { name: "Chalk", hex: "#F7F1EA" },
      { name: "Rose", hex: "#D88A97" },
      { name: "Maroon", hex: "#6E2A2A" },
      { name: "Moss", hex: "#6F7A55" },
    ],
    sizes: [
      { ...KING, price: 1250 },
      { ...QUEEN, price: 1050 },
    ],
    images: [gulabi1, gulabi2, gulabi3],
    short: "Scattered rose florals with a Mughal buta border on a chalk-white ground.",
    story:
      "Mughal gardens were planned as paradise on earth: four quarters, flowing water, and flowers in every season. Gulabi Bagh scatters tiny roses across a chalk-white ground and anchors them with a border of upright buta flowers, each one standing like a cypress at the edge of a garden path.",
    print: "Jaipuri print",
    contents: SET,
  },
  {
    slug: "kairi-jaal",
    name: "Kairi Jaal",
    meaning: "The paisley lattice",
    family: "Jaipuri Classics",
    category: "Bedsheet Sets",
    palette: ["Ivory", "Indigo", "Rose"],
    colours: [
      { name: "Ivory", hex: "#F1E4CD" },
      { name: "Coral", hex: "#D46A6A" },
      { name: "Indigo", hex: "#2F4F86" },
    ],
    sizes: [
      { ...KING, price: 1250 },
      { ...QUEEN, price: 1050 },
    ],
    images: [kairi1, kairi2, kairi3],
    short: "Coral and indigo kairi motifs in an ogee lattice, edged in deep blue.",
    story:
      "Kairi is the raw mango, and the teardrop motif that the world later called paisley began in India as its shape. Kairi Jaal sets the motif inside a flowing ogee lattice of coral and indigo, the kind of pattern you could trace with a finger for an entire lazy Sunday.",
    print: "Jaipuri print",
    contents: SET,
  },
  {
    slug: "sarson-phool",
    name: "Sarson Phool",
    meaning: "The mustard bloom",
    family: "Modern Folk",
    category: "Bedsheet Sets",
    palette: ["Earth"],
    colours: [
      { name: "Mustard", hex: "#8A6B1E" },
      { name: "Coral", hex: "#E5775A" },
      { name: "Cream", hex: "#F1E2B8" },
    ],
    sizes: [
      { ...KING, price: 1250 },
      { ...QUEEN, price: 1050 },
    ],
    images: [sarson1, sarson2, sarson3],
    short: "Coral and white blooms on a warm mustard ground, finished with a striped border.",
    story:
      "In late winter, the fields of the north turn completely yellow with mustard in flower, as far as you can see. Sarson Phool carries that warmth indoors: coral and white blossoms on an olive-mustard ground, with a striped border that feels like a handwoven dhurrie.",
    print: "Jaipuri print",
    contents: SET,
  },
  {
    slug: "neela-jharokha",
    name: "Neela Jharokha",
    meaning: "The blue window",
    family: "Jaipuri Classics",
    category: "Bedsheet Sets",
    palette: ["Indigo"],
    colours: [
      { name: "Azure", hex: "#3FA0DA" },
      { name: "Royal", hex: "#1D3FA8" },
      { name: "Chalk", hex: "#F4F7FA" },
    ],
    sizes: [{ ...QUEEN, price: 1050 }],
    images: [neela1, neela2, neela3],
    short: "Arched jharokha windows in azure and royal blue, cool as a summer morning.",
    story:
      "A jharokha is the carved window of a Rajasthani palace, built so the women of the house could watch the street without being seen, and so the breeze could always find its way in. Neela Jharokha lines its border with those arches in azure and royal blue: the coolest print in the collection, made for the hottest months.",
    print: "Jaipuri print",
    contents: SET,
  },
  {
    slug: "rangeen-tulip",
    name: "Rangeen Tulip",
    meaning: "The patchwork tulip",
    family: "Modern Folk",
    category: "Quilts",
    badge: "Limited",
    palette: ["Earth", "Ivory"],
    colours: [
      { name: "Crimson", hex: "#B3262E" },
      { name: "Saffron", hex: "#E39A2B" },
      { name: "Ivory", hex: "#F2E8D2" },
      { name: "Plum", hex: "#4D2A3E" },
    ],
    sizes: [{ id: "double", label: "Double", dims: "90 × 100 in · 228 × 254 cm", price: 2450 }],
    images: [tulip1, tulip2, tulip3],
    short: "A joyful patchwork of block-print squares and appliqué tulips.",
    story:
      "Every Indian home has a patchwork quilt made from leftover fabric, with a little history stitched into every square. Rangeen Tulip is our tribute: crimson, saffron and plum print squares, with tulips cut from the same prints and laid across an ivory ground.",
    print: "Printed patchwork",
    contents: "1 quilted bedcover + 2 pillow covers",
  },
];

export const FAMILIES: { name: PrintFamily; description: string }[] = [
  {
    name: "Mughal Garden",
    description: "Florals, vines and peacocks, drawn from the walled gardens of the Mughal and Rajput courts.",
  },
  {
    name: "Jaipuri Classics",
    description: "Lattices, arches and kairi motifs from the printing towns around Jaipur.",
  },
  {
    name: "Modern Folk",
    description: "Familiar folk motifs, redrawn in the colours of an Indian day.",
  },
];

export const PALETTES: { name: Palette; hex: string; swatch: StaticImageData }[] = [
  { name: "Ivory", hex: "#EFE6D2", swatch: gulabi3 },
  { name: "Indigo", hex: "#2E3F8F", swatch: neela2 },
  { name: "Rose", hex: "#C4497F", swatch: saanjh3 },
  { name: "Earth", hex: "#8A6B1E", swatch: sarson3 },
  { name: "Charcoal", hex: "#4A4A50", swatch: raatRani3 },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function fromPrice(p: Product) {
  return Math.min(...p.sizes.map((s) => s.price));
}
