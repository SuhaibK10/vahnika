import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/Icons";

// Floating WhatsApp chat, on every page from the first screen. Hidden only while the mobile menu covers the page.
export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-fixed animate-fade-in grid h-12 w-12 in-[.menu-open]:hidden place-items-center rounded-full bg-[#25D366] text-white transition-[scale,bottom] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
