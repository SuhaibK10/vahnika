# Vahnika — pitch website

A design-complete storefront prototype for Vahnika (Home & Apparel), built by Weblicate.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · TypeScript. No backend: the cart (localStorage), pincode check, newsletter and waitlist forms are front-end only.

## Pages

| Route | What it shows |
|---|---|
| `/` | Hero with arch slideshow, bedroom editorial, collection tabs, Print Library teaser, shop by palette, craft, Bed to Body, gifting, journal, reviews |
| `/shop` | Filterable collection (print family, palette, category, sort). Accepts `?palette=`, `?category=`, `?family=` |
| `/products/[slug]` | Product page: gallery with zoom, sizes, bag, pincode check, accordions, print story, reviews, cross-sells |
| `/prints` | The Print Library: every print's name, meaning and story |
| `/journal`, `/journal/[slug]` | Six long-form articles |
| `/our-story` | Brand story, emblem meaning, promises, process |
| `/bed-to-body` | Apparel teaser with waitlist |

## Where things live

- Design tokens (colours, type, arch shape, motion): `app/globals.css`
- Catalogue (names, stories, prices, colours): `lib/products.ts`
- Journal articles: `lib/journal.ts`
- Contact links and announcement bar: `lib/site.ts`
- Emblem (vector redraw of the logo): `components/Emblem.tsx`

## Placeholders to replace before launch

- **Reviews and testimonials** in `components/home/Testimonials.tsx` and `app/products/[slug]/page.tsx` are sample text.
- **Our Story copy** is a proposed narrative. Replace it with the founders' real story and the meaning of the name.
- **Prices, sizes and print names** other than Raat Rani (which mirrors the live listing) are proposals.
- **Contact details**: WhatsApp number, email, Instagram handle (`lib/site.ts`).
- **Checkout**: wire up Shopify Storefront API or Razorpay in the build phase.
- **Indexing**: `robots` is set to `noindex` in `app/layout.tsx` for the pitch. Remove at launch.

Image sources are in `CREDITS.md`.
