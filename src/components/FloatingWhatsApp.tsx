const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor">
    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.35 22.614c-.396 1.116-1.95 2.042-3.21 2.312-.864.182-1.99.328-5.786-1.244-4.856-2.012-7.978-6.93-8.22-7.252-.232-.322-1.95-2.6-1.95-4.96s1.234-3.516 1.672-3.996c.438-.48.956-.6 1.274-.6.318 0 .636.002.914.016.294.014.688-.112 1.076.822.396.954 1.352 3.314 1.472 3.554.12.24.198.52.038.842-.16.322-.24.52-.48.802-.24.282-.504.63-.72.846-.24.24-.49.5-.21.98.28.48 1.244 2.054 2.672 3.328 1.836 1.638 3.384 2.146 3.864 2.386.48.24.76.2 1.04-.12.28-.322 1.2-1.398 1.52-1.878.318-.48.638-.398 1.076-.238.438.16 2.794 1.318 3.274 1.558.48.24.798.358.918.558.12.198.12 1.156-.276 2.272z"/>
  </svg>
);

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/919270993102?text=Hi%2C%20I%20need%20help%20with%20my%20plant.%20Here%20is%20a%20photo."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
    >
      <div className="flex flex-col text-left leading-tight">
        <span className="font-bold text-sm">Get FREE Plant Diagnosis 🌿</span>
        <span className="text-[10px] opacity-90 hidden sm:block">Send your plant photo on WhatsApp</span>
      </div>
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
        <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
