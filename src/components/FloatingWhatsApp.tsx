import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919270993102?text=Hi%2C%20I%20need%20help%20with%20my%20plant.%20Here%20is%20a%20photo."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
    >
      <div className="flex flex-col text-left leading-tight">
        <span className="font-bold text-sm">Get FREE Plant Diagnosis 🌿</span>
        <span className="text-[10px] opacity-90 hidden sm:block">Send your plant photo on WhatsApp</span>
      </div>
      <MessageCircle className="w-7 h-7 fill-white" />
    </a>
  );
};

export default FloatingWhatsApp;
