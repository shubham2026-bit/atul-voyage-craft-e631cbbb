import whatsappAsset from "@/assets/whatsapp-icon.asset.json";

export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <img
      src={whatsappAsset.url}
      alt="WhatsApp"
      className={`${className} object-contain`}
      loading="lazy"
    />
  );
}
