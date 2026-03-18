import { Phone, Mail, MessageCircle, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <>
      {/* CTA Banner */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-4">
            Let's Stay Connected
          </h2>
          <p className="text-primary-foreground/70 text-base mb-6 font-medium">Reach us anytime through our social channels.</p>
          <div className="flex justify-center gap-4">
            <a href="tel:+919270993102" className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors">
              <Phone className="w-4 h-4" />
            </a>
            <a href="mailto:ecobloomplantcare@gmail.com" className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            <a href="https://wa.me/919270993102" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/ecobloom_plantcare?igsh=YnN5MWRjZXp6cTE1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-base">
            <div>
              <img src={logo} alt="EcoBloom Plant Care" className="h-12 w-auto mb-3" />
              <ul className="space-y-2 text-background/70">
                <li><a href="#home" className="hover:text-background transition-colors">Home</a></li>
                <li><a href="#why-us" className="hover:text-background transition-colors">About</a></li>
                <li><a href="#booking" className="hover:text-background transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-4 text-background/60">Services</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#services" className="hover:text-background transition-colors">Monthly Care</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">Annual Plans</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">Design Your Garden</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-4 text-background/60">Services</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#pricing" className="hover:text-background transition-colors">Pricing</a></li>
                <li><a href="#booking" className="hover:text-background transition-colors">Book a Visit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-widest mb-4 text-background/60">Contact</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="tel:+919270993102">9270993102</a></li>
                <li><a href="tel:+919322084283">9322084283</a></li>
                <li><a href="mailto:ecobloomplantcare@gmail.com" className="text-xs">ecobloomplantcare@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs text-background/40">
            EcoBloom © {new Date().getFullYear()}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
