import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919270993102?text=Hi%20EcoBloom%2C%20I%20want%20a%20free%20plant%20diagnosis!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 w-64 bg-card border border-border rounded-xl p-4 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <p className="font-display font-bold text-sm text-foreground mb-1">Get FREE Plant Diagnosis 🌿</p>
        <p className="text-xs text-muted-foreground leading-relaxed">Send your plant photo on WhatsApp and get expert advice instantly.</p>
      </div>
      {/* Button */}
      <div className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-full pl-5 pr-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <span className="text-sm font-semibold hidden sm:inline">Book free plants inspection visit</span>
        <MessageCircle className="w-6 h-6" fill="white" strokeWidth={0} />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
