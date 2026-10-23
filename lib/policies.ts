// PLACEHOLDER policy text for the pitch, written to match the promises made across the site.
// Have it reviewed (and the numbers confirmed by the client) before launch.
export type Policy = {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string[]; list?: string[] }[];
};

export const POLICIES_UPDATED = "21 October 2026";

export const POLICIES: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping & delivery",
    intro: "Every Vahnika order ships free, anywhere in India. Here's how your linen makes its way from our studio to your door.",
    sections: [
      {
        heading: "Dispatch",
        body: [
          "Orders are folded, wrapped and dispatched within 48 hours, Monday to Saturday. Orders placed on a Sunday or a public holiday leave us the next working day.",
          "As soon as your parcel is picked up, you'll get a tracking link on WhatsApp and by email.",
        ],
      },
      {
        heading: "Delivery times",
        body: ["Delivery times are counted from dispatch:"],
        list: ["Metro cities: 2–4 working days", "Rest of India: 4–7 working days", "North-East, Jammu & Kashmir, Ladakh and island territories: 7–10 working days"],
      },
      {
        heading: "Charges",
        body: [
          "Standard delivery is complimentary on every order, with no minimum.",
          "Express delivery is available in metro cities for ₹149 and usually arrives within 1–2 working days of dispatch.",
        ],
      },
      {
        heading: "Cash on delivery",
        body: ["Cash on delivery is available on most pincodes at no extra charge. You can pay the courier in cash or by UPI. Checkout will tell you if COD isn't available for your pincode."],
      },
      {
        heading: "Gift orders",
        body: ["Gift-boxed orders ship in our signature box with your note handwritten inside. Prices are left off the invoice, and the parcel can be sent straight to the person you're gifting."],
      },
      {
        heading: "If something goes wrong",
        body: [
          "If your parcel is delayed beyond the times above, or the tracking hasn't moved in three days, message us on WhatsApp with your order number. We'll chase the courier for you.",
          "If a parcel arrives damaged, please photograph it before opening and write to us within 48 hours. We'll send a replacement at no cost.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & exchanges",
    intro: "If something isn't right, we'll make it right. You have 7 days from delivery to return or exchange any piece.",
    sections: [
      {
        heading: "What can be returned",
        body: ["You can return or exchange any piece within 7 days of delivery, as long as it is:"],
        list: ["Unused and unwashed", "In its original packaging, with the tags attached", "Not a custom-size order or marked final sale"],
      },
      {
        heading: "How to start a return",
        body: [
          "Message us on WhatsApp or email hello@vahnika.com with your order number and a line on what you'd like to do. We'll arrange a free reverse pickup from your address, usually within two working days.",
        ],
      },
      {
        heading: "Exchanges",
        body: ["Want a different size or print? Exchanges are free. We'll ship the new piece as soon as the original is picked up, subject to stock."],
      },
      {
        heading: "Refunds",
        body: [
          "Once your return reaches us and passes a quick quality check, we'll refund you within 5–7 working days.",
          "Prepaid orders are refunded to the original payment method. For cash-on-delivery orders, we'll refund to your bank account or UPI ID.",
        ],
      },
      {
        heading: "Damaged or incorrect items",
        body: ["If a piece arrives damaged, defective or isn't what you ordered, tell us within 48 hours of delivery with a photo. We'll replace it at no cost, or refund you in full if you'd prefer."],
      },
      {
        heading: "A note on block prints",
        body: ["Small variations in colour and print alignment are part of the character of printed cotton, not a defect. Colours may also look slightly different on different screens."],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    intro: "We collect only what we need to deliver your order and look after you, and we never sell your details.",
    sections: [
      {
        heading: "What we collect",
        body: ["When you shop with us, create an account or write to us, we may collect:"],
        list: [
          "Your name, mobile number, email and delivery address",
          "Your order history and preferences",
          "Payment status (card and UPI details are handled by our payment partner, not stored by us)",
          "Basic, anonymised information about how you use the site",
        ],
      },
      {
        heading: "How we use it",
        body: ["To process and deliver your orders, send order updates, answer your questions and, only if you've opted in, send our monthly letter and offers."],
      },
      {
        heading: "Who we share it with",
        body: ["Only with the partners who help us serve you: our payment gateway (Razorpay), courier partners for delivery, and our email and WhatsApp messaging providers. Each is bound to use your data only for that purpose."],
      },
      {
        heading: "Cookies",
        body: ["We use a small number of cookies to keep your bag, remember your preferences and understand which pages are useful. You can clear or block cookies in your browser settings."],
      },
      {
        heading: "Your choices",
        body: [
          "You can update your details from your account at any time, unsubscribe from any email, or ask us to delete your account and data by writing to hello@vahnika.com.",
          "We handle personal data in line with India's Digital Personal Data Protection Act, 2023.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    intro: "These terms apply when you browse vahnika.com or place an order with us. By using the site, you agree to them.",
    sections: [
      {
        heading: "Products & colours",
        body: ["We photograph every print as faithfully as we can, but colours vary slightly between screens, and printed cotton carries small, natural variations from piece to piece."],
      },
      {
        heading: "Prices & payment",
        body: [
          "All prices are in Indian rupees and include GST. Shipping is free unless you choose express delivery.",
          "We accept UPI, debit and credit cards, net banking and cash on delivery. Prepaid payments are processed securely by Razorpay.",
        ],
      },
      {
        heading: "Orders",
        body: ["Your order is confirmed once you receive our confirmation message. We may cancel an order if an item is out of stock or a price was listed in error; if so, we'll refund you in full straight away."],
      },
      {
        heading: "Offers & discount codes",
        body: ["Codes are valid for the period stated, one per order, and can't be combined or exchanged for cash. Codes won on the spin-to-win wheel apply to a first order only."],
      },
      {
        heading: "Our designs",
        body: ["All prints, photographs, text and the Vahnika name and emblem belong to Vahnika and may not be reproduced without our written permission."],
      },
      {
        heading: "Governing law",
        body: ["These terms are governed by the laws of India. Write to hello@vahnika.com with any question; we'd always rather talk it through."],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return POLICIES.find((p) => p.slug === slug);
}
