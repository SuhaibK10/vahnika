import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);
export const UserIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c1.4-3.6 4.2-5.4 7.5-5.4s6.1 1.8 7.5 5.4" /></svg>
);
export const BagIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><path d="M5 8h14l-1.2 12H6.2z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
);
export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...p}><path d="M3.5 8h17M3.5 16h11" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const ArrowIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} {...base} {...p}><path d="M4 12h15M14 7l5 5-5 5" /></svg>
);
export const PlusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} {...base} {...p}><path d="M5 12h14" /></svg>
);
export const ChevronIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const StarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" {...p}><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8z" /></svg>
);
export const LeafIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" {...p}><path d="M4 20C4 10.5 10.5 4 20 4c0 9.5-6.5 16-16 16z" /><path d="M4 20 13.5 10.5" stroke="var(--color-paper, #faf6ef)" strokeOpacity=".55" strokeWidth="1.3" strokeLinecap="round" /></svg>
);
export const CottonIcon = (p: P) => (
  <svg viewBox="0 0 32 32" width={28} height={28} {...base} {...p}><path d="M16 9.5a4 4 0 0 1 7.6 1.6 3.8 3.8 0 0 1 .4 7.4 4 4 0 0 1-8 1.6 4 4 0 0 1-8-1.6 3.8 3.8 0 0 1 .4-7.4A4 4 0 0 1 16 9.5z" /><path d="M16 20v8M12 26l4 2 4-2" /></svg>
);
export const TruckIcon = (p: P) => (
  <svg viewBox="0 0 32 32" width={28} height={28} {...base} {...p}><path d="M3 9h16v13H3zM19 13h5.5l4.5 5v4h-10" /><circle cx="8.5" cy="23.5" r="2.3" /><circle cx="23.5" cy="23.5" r="2.3" /></svg>
);
export const ReturnIcon = (p: P) => (
  <svg viewBox="0 0 32 32" width={28} height={28} {...base} {...p}><path d="M9 12h12a6 6 0 0 1 0 12h-7" /><path d="m13 8-4 4 4 4" /></svg>
);
export const ShieldIcon = (p: P) => (
  <svg viewBox="0 0 32 32" width={28} height={28} {...base} {...p}><path d="M16 4 6 8v7c0 6.5 4.3 11 10 13 5.7-2 10-6.5 10-13V8z" /><path d="m11.5 16 3.2 3.2 6-6.4" /></svg>
);
export const GiftIcon = (p: P) => (
  <svg viewBox="0 0 32 32" width={28} height={28} {...base} {...p}><path d="M5 12h22v5H5zM7 17h18v11H7zM16 12v16" /><path d="M16 12c-2-4.5-7-5.5-7-2.5S13 12 16 12zM16 12c2-4.5 7-5.5 7-2.5S19 12 16 12z" /></svg>
);
export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}><path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.8L2.4 21.8l4.9-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.4-.2z" /></svg>
);
export const InstagramIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...base} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
