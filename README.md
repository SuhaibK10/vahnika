# Vahnika — pitch website

A design-complete storefront prototype for Vahnika (Home & Apparel), built by Weblicate.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · TypeScript. No backend: every flow (bag, checkout, payment, account sign-in, order tracking, forms) is front-end only, built to look and behave like the finished store. State lives in localStorage.

## Pages

| Route | What it shows |
|---|---|
| `/` | Hero with arch slideshow, bedroom editorial, collection tabs, Print Library teaser, shop by palette, Bed to Body, gifting, journal, reviews |
| `/shop` | Filterable collection (print family, palette, category, sort). Accepts `?palette=`, `?category=`, `?family=` |
| `/products/[slug]` | Product page: gallery with zoom, sizes, bag, pincode check, accordions, print story, reviews, cross-sells |
| `/prints` | The Print Library: every print's name, meaning and story |
| `/journal`, `/journal/[slug]` | Six long-form articles |
| `/our-story` | Brand story, emblem meaning, promises, process |
| `/bed-to-body` | Apparel teaser with waitlist |
| `/checkout` | Contact, address (pincode fills city/state), delivery speed, UPI/card/net banking/COD, gift box, discount codes (offers the spin-to-win code) |
| `/order-confirmed` | Thank-you page with delivery timeline; shows a sample order if opened directly |
| `/track-order` | Order lookup with timeline and courier scans. Accepts `?order=` |
| `/account` | Phone + OTP sign-in (any 6 digits), then orders, saved addresses and profile |
| `/help` | Help centre: quick links, FAQs, contact form |
| `/policies/[slug]` | Shipping, returns, privacy and terms |

The header search opens a full-screen overlay with live results across prints and journal articles.

## Where things live

- Design tokens (colours, type, arch shape, motion): `app/globals.css`
- Catalogue (names, stories, prices, colours): `lib/products.ts`
- Journal articles: `lib/journal.ts`
- Contact links and announcement bar: `lib/site.ts`
- Emblem (vector redraw of the logo): `components/Emblem.tsx`

## Placeholders to replace before launch

- **Order history, tracking scans and the confirmation fallback** are sample data in `lib/orders.ts` and `components/account/TrackOrder.tsx`.
- **Policy text and FAQ answers** (`lib/policies.ts`, `lib/help.ts`) match the site's promises but need the client's confirmation and a legal review.
- **Discount codes** are the spin-to-win codes listed in `lib/site.ts`.
- **Reviews and testimonials** in `components/home/Testimonials.tsx` and `app/products/[slug]/page.tsx` are sample text.
- **Our Story copy** is a proposed narrative. Replace it with the founders' real story and the meaning of the name.
- **Prices, sizes and print names** other than Raat Rani (which mirrors the live listing) are proposals.
- **Contact details**: email and Instagram handle (`lib/site.ts`). WhatsApp is set to +91 98991 88409.
- **Checkout**: payment is simulated. Wire up Razorpay (and Shopify Storefront API or an order backend) in the build phase; the hand-off point is marked in `components/checkout/Checkout.tsx`.
- **Indexing**: `robots` is set to `noindex` in `app/layout.tsx` for the pitch. Remove at launch.

Image sources are in `CREDITS.md`.
