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
export const HomeIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><path d="M4 10.5 12 4l8 6.5V20h-5v-5.5H9V20H4z" /></svg>
);
export const GridIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
);
export const ListIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><rect x="4" y="4" width="16" height="7" rx="1" /><rect x="4" y="13" width="16" height="7" rx="1" /></svg>
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
export const LockIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} {...base} {...p}><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" /></svg>
);
export const CardIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3 10h18M6.5 15h4" /></svg>
);
export const BankIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><path d="M3.5 9.5 12 4.5l8.5 5zM5.5 10v7M10 10v7M14 10v7M18.5 10v7M3.5 19.5h17" /></svg>
);
export const CashIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><rect x="2.5" y="6.5" width="19" height="11" rx="1.5" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9.5v5M18 9.5v5" /></svg>
);
// Generic "scan & pay" mark for UPI — not the NPCI logo
export const UpiIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10 18.5h4M9.5 7.5h2v2h-2zM12.5 10.5h2v2h-2zM9.5 12.5h1M13.5 7.5h1" /></svg>
);
export const PackageIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.3l8 4.5" /></svg>
);
export const PinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>
);
export const MailIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg>
);
export const ClockIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const LogoutIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...base} {...p}><path d="M14 4.5H6.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H14M10 12h10M16.5 8.5 20 12l-3.5 3.5" /></svg>
);
// Google's "G" mark in its own colours, for the "Continue with Google" button
export const GoogleIcon = (p: P) => (
  <svg viewBox="0 0 48 48" width={18} height={18} aria-hidden {...p}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);
export const HeartIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...p}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" /></svg>
);
