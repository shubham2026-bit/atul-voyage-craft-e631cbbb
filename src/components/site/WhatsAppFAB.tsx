import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function WhatsAppFAB() {
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  );
}
