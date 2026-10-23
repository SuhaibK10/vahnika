import type { StaticImageData } from "next/image";
import { MEDIA } from "./media";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "image"; image: StaticImageData; caption: string };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: "Living" | "Fabric" | "Craft" | "Care" | "Rituals";
  date: string;
  readTime: string;
  cover: StaticImageData;
  related: string[];
  body: Block[];
};

export const ARTICLES: Article[] = [
  {
    slug: "the-most-lived-in-room",
    title: "The Most Lived-In Room",
    dek: "Why the bedroom has quietly become the heart of the Indian home, and why it deserves to be dressed with care.",
    category: "Living",
    date: "14 October 2026",
    readTime: "5 min read",
    cover: MEDIA.familyBed,
    related: ["mor-bagh", "gulabi-bagh", "kairi-jaal"],
    body: [
      { type: "p", text: "Think about where your day actually happens. Not the room you show guests, but the one you live in. For most of us, it is the bedroom. The first cup of chai, balanced on a pillow. The phone call that runs an hour longer than it should. The children who wander in on a Sunday morning and somehow never leave." },
      { type: "p", text: "The drawing room was built for visitors. The bedroom was built for us. And slowly, without anyone announcing it, it has become the most lived-in room in the house." },
      { type: "h2", text: "A room that does everything" },
      { type: "p", text: "In smaller city homes, the bedroom is office, reading nook, cinema and playroom by turns. Laptops balance on knees. Homework spreads across the duvet. Weekend films are watched from under a dohar, with snacks that are definitely not allowed in bed." },
      { type: "p", text: "When one room carries this much of your life, what you surround yourself with starts to matter. The sheet is no longer just something you sleep on. It is the largest piece of fabric in your home, the backdrop to more of your hours than any sofa." },
      { type: "quote", text: "The sheet is the largest piece of fabric in your home, the backdrop to more of your hours than any sofa." },
      { type: "h2", text: "Dress it like you mean it" },
      { type: "p", text: "Dressing a bedroom well is less about money than intention. A few principles we return to:" },
      { type: "ul", items: [
        "Let the bed be the hero. One beautiful print does more than five busy accessories.",
        "Choose fabric that feels good on bare skin. Pure cotton breathes through Indian summers in a way synthetics never will.",
        "Keep a calm palette around a patterned bed: plain walls, wood, cane, brass, a single plant.",
        "Layer for the season: a light dohar in winter, nothing but a crisp sheet in May.",
      ] },
      { type: "image", image: MEDIA.readingPrintedBed, caption: "A printed bed sets the mood of the whole room, so everything else can stay quiet." },
      { type: "h2", text: "Where the day softens" },
      { type: "p", text: "The bedroom is where the day begins in half-light and ends in a whisper. It deserves the same thought we once saved for the room with the good crockery. Not because anyone else will see it, but because you will, every single day." },
    ],
  },
  {
    slug: "thread-count-decoded",
    title: "Thread Count, Decoded",
    dek: "What 200 TC really means, why higher isn't always better, and how to choose sheets for Indian weather.",
    category: "Fabric",
    date: "2 October 2026",
    readTime: "4 min read",
    cover: MEDIA.sheetFoldsWarm,
    related: ["raat-rani", "neela-jharokha", "kairi-jaal"],
    body: [
      { type: "p", text: "Thread count is the most quoted number in bed linen, and the most misunderstood. It simply counts the threads woven into one square inch of fabric: the lengthwise threads plus the crosswise ones. A 200 thread count sheet has roughly 200 threads in every square inch." },
      { type: "p", text: "That number tells you how tightly a fabric is woven. It does not, on its own, tell you how soft, cool or durable it will be." },
      { type: "h2", text: "Why higher isn't always better" },
      { type: "p", text: "Past a point, there is only so much room in a square inch. To reach very high numbers, some manufacturers twist several thin, weaker yarns together and count each one separately. The label looks impressive; the sheet often feels heavier, traps more heat, and wears out sooner." },
      { type: "quote", text: "A well-made 200 thread count cotton will outlive a badly made 1,000 thread count sheet." },
      { type: "h2", text: "The sweet spot for Indian homes" },
      { type: "p", text: "For most of the year in most of India, you want a sheet that lets air move. Cotton in the 180–300 thread count range does exactly that: tight enough to feel smooth and hold a print crisply, open enough to breathe on a humid night." },
      { type: "ul", items: [
        "180–250 TC: light, airy and quick to dry. Ideal for summers and for printed sheets, where the colour sits beautifully on the surface.",
        "250–400 TC: smoother and slightly heavier, good for air-conditioned rooms and cooler months.",
        "Above 400 TC: check the yarn. Single-ply, long-staple cotton is worth it; multi-ply inflation is not.",
      ] },
      { type: "h2", text: "What matters more than the number" },
      { type: "p", text: "Fibre and finish. Pure cotton, rather than a polyester blend, is what keeps you cool and gets softer with every wash. The weave changes the feel too: crisp and matte, or smooth with a gentle sheen. When in doubt, trust your hand over the label: good cotton feels cool, soft and quietly substantial." },
    ],
  },
  {
    slug: "a-short-story-of-the-jaipuri-print",
    title: "A Short Story of the Jaipuri Print",
    dek: "From the riverbanks of Sanganer and Bagru to the bed in your home: the printing tradition behind our patterns.",
    category: "Craft",
    date: "18 September 2026",
    readTime: "6 min read",
    cover: MEDIA.printingBlocks,
    related: ["neela-jharokha", "kairi-jaal", "gulabi-bagh"],
    body: [
      { type: "p", text: "Drive out of Jaipur and within an hour you reach two small towns that changed the way the world dressed its homes. Sanganer and Bagru have been printing cloth for centuries, and the families who do it, the Chhipa printers, have passed the craft from parent to child for generations." },
      { type: "h2", text: "Two towns, two signatures" },
      { type: "p", text: "Sanganer became known for delicate florals on bright white grounds: tiny buds, trailing vines and fine outlines that look almost drawn by hand. Bagru, a little further away, is known for earthier colours (indigo, rust and black from natural dyes) and for dabu, a mud-resist technique that gives prints their soft, crackled edges." },
      { type: "image", image: MEDIA.blockPrintingHands, caption: "Printing by hand, one impression at a time." },
      { type: "h2", text: "Patterns that travelled the world" },
      { type: "p", text: "By the seventeenth century, Indian printed cottons were so prized in Europe that they shaped fashion from London to Amsterdam. The words chintz and calico both came from India. The motifs we still love, from the buta and the jaal to the kairi the world later called paisley, were refined in workshops like these." },
      { type: "quote", text: "The kairi, the buta, the jaal: the motifs we still love were refined in the printing towns around Jaipur." },
      { type: "h2", text: "How we use the tradition" },
      { type: "p", text: "Vahnika's prints are drawn from this vocabulary: the Mughal garden florals of Sanganer, the lattices and arches of Rajasthani architecture, the bold borders of a well-loved bedspread. We redraw them for modern homes, in colourways that sit calmly in a room, and print them on pure cotton so they feel as good as they look." },
      { type: "p", text: "Every print in our library has a name and a story, because a pattern that has travelled this far deserves more than a product code." },
    ],
  },
  {
    slug: "dressing-the-bed-for-an-indian-summer",
    title: "Dressing the Bed for an Indian Summer",
    dek: "Pale grounds, breathable cotton and the art of sleeping cool when the ceiling fan isn't quite enough.",
    category: "Living",
    date: "28 August 2026",
    readTime: "4 min read",
    cover: MEDIA.leafShadowPillow,
    related: ["neela-jharokha", "gulabi-bagh", "saanjh"],
    body: [
      { type: "p", text: "There is a particular kind of tired that only comes from an Indian summer night: the fan turning slowly, the sheet sticking to your back, the pillow you keep flipping in search of the cool side. Most of the fix is in what you sleep on." },
      { type: "h2", text: "Start with the fibre" },
      { type: "p", text: "Pure cotton absorbs moisture and lets air pass through. Polyester blends do the opposite. They feel smooth in the shop and clammy at 2 am. If a sheet is labelled 100% cotton, you are already halfway there." },
      { type: "h2", text: "Choose lighter grounds" },
      { type: "p", text: "Pale, chalky backgrounds with cool blues and greens make a room feel several degrees calmer, even if the thermometer disagrees. Save deep grounds like charcoal and mustard for the cooler months." },
      { type: "ul", items: [
        "Swap the quilt for a single cotton sheet on top, or nothing at all.",
        "Keep a second set ready, so you can change sheets twice a week in peak summer.",
        "Dry sheets in shade and fold them warm. They stay fresh and crisp longer.",
        "Pillow covers matter most: your face spends all night on them. Change them often.",
      ] },
      { type: "quote", text: "Pale grounds, cool blues and a single cotton sheet. Summer sleep is mostly a matter of subtraction." },
      { type: "p", text: "Summer bedrooms are about subtraction. Fewer layers, lighter colours, more air. Let the print do the decorating, and let the cotton do the cooling." },
    ],
  },
  {
    slug: "how-to-care-for-printed-cotton",
    title: "How to Care for Printed Cotton",
    dek: "Simple habits that keep colours true and cotton soft, wash after wash, for years.",
    category: "Care",
    date: "12 August 2026",
    readTime: "3 min read",
    cover: MEDIA.sheetsDrying,
    related: ["raat-rani", "sarson-phool", "kairi-jaal"],
    body: [
      { type: "p", text: "Good cotton gets better with time. It softens, relaxes and starts to feel like yours. A little care in the first few washes keeps the print vivid for years." },
      { type: "h2", text: "The first wash" },
      { type: "p", text: "Wash new printed linen on its own the first two or three times. Any excess dye from the printing process can loosen in early washes, and washing separately keeps it off your whites." },
      { type: "h2", text: "Every wash after" },
      { type: "ul", items: [
        "Use cold or lukewarm water (up to 30°C) on a gentle cycle.",
        "Choose a mild liquid detergent. Skip bleach entirely; it eats colour and weakens fibres.",
        "Turn pillow covers inside out to protect the print.",
        "Don't overload the machine. Sheets need room to move to come out clean.",
      ] },
      { type: "image", image: MEDIA.whiteSheets, caption: "Pure cotton softens and relaxes with every wash." },
      { type: "h2", text: "Drying and ironing" },
      { type: "p", text: "Dry in shade. The Indian sun is a wonderful disinfectant and a terrible thing for colour, so a shaded line or a breezy balcony is ideal. Iron on the reverse while slightly damp, on a medium setting, and fold while still warm for that freshly made-bed feeling." },
      { type: "quote", text: "Dry in shade: the Indian sun is a wonderful disinfectant and a terrible thing for colour." },
    ],
  },
  {
    slug: "the-ritual-of-slow-mornings",
    title: "The Ritual of Slow Mornings",
    dek: "Five small habits that make the first hour of the day gentler. No 5 am alarm required.",
    category: "Rituals",
    date: "30 July 2026",
    readTime: "4 min read",
    cover: MEDIA.teaBookBed,
    related: ["saanjh", "mor-bagh", "raat-rani"],
    body: [
      { type: "p", text: "Morning advice usually involves waking earlier. This isn't that. A slow morning is not about the hour on the clock; it is about refusing to let the day grab you the moment your eyes open." },
      { type: "h2", text: "1. Leave the phone in another room" },
      { type: "p", text: "The single biggest change. If the first thing you see is a screen, the day starts on someone else's terms. Let the first thing be the light through the window." },
      { type: "h2", text: "2. Open the curtains before anything else" },
      { type: "p", text: "Morning light tells your body it is time to wake up, gently. Even five minutes of daylight near a window makes the rest of the morning feel less like a rush." },
      { type: "h2", text: "3. Make your chai the slow way" },
      { type: "p", text: "Ginger crushed, leaves simmered, milk boiled up twice. Ten minutes of attention, and you have your first small ritual of the day." },
      { type: "h2", text: "4. Make the bed, beautifully" },
      { type: "p", text: "Smooth the sheet, plump the pillows, fold the dohar at the foot. A made bed is a small promise that the day has a shape. Coming home to it in the evening is a gift you gave yourself that morning." },
      { type: "quote", text: "A made bed is a small promise that the day has a shape." },
      { type: "h2", text: "5. Read one page" },
      { type: "p", text: "Not a news headline, but a page of a real book. Poetry, a novel, anything that asks your mind to slow down rather than speed up. One page is enough." },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
