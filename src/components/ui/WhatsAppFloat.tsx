import { MessageCircle } from "lucide-react";

interface WhatsAppFloatProps {
  href?: string;
  className?: string;
}

export function WhatsAppFloat({
  href = "https://wa.me/5500000000000?text=Quero%20falar%20com%20um%20especialista%20da%20BlockURB",
  className
}: WhatsAppFloatProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={"hidden sm:flex fixed bottom-6 right-24 z-50 items-center justify-center size-12 rounded-full bg-accent text-accent-foreground shadow-lg transition-transform duration-200 hover:scale-105 " + (className ?? "")}
    >
      <MessageCircle />
    </a>
  );
}
