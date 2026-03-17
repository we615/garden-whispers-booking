const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">🌿 EcoBloom</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Professional plant care & garden design services. We make spaces bloom with love, expertise, and organic practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#home" className="hover:text-primary-foreground transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-primary-foreground transition-colors">Pricing</a></li>
              <li><a href="#booking" className="hover:text-primary-foreground transition-colors">Book a Visit</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>📞 <a href="tel:+919270993102">9270993102</a> / <a href="tel:+919322084283">9322084283</a></li>
              <li>📧 <a href="mailto:ecobloomplantcare@gmail.com">ecobloomplantcare@gmail.com</a></li>
              <li>
                💬{" "}
                <a
                  href="https://wa.me/919270993102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} EcoBloom Plant Care. All rights reserved. 🌱
        </div>
      </div>
    </footer>
  );
};

export default Footer;
