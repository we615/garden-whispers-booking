import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#booking" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Non-hash route (like /about) — let browser handle
      if (!href.includes("#")) return;

      e.preventDefault();
      const hash = href.split("#")[1];

      if (location.pathname === "/") {
        // Already on home — just scroll
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate to home, then scroll after render
        navigate("/");
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    },
    [location.pathname, navigate]
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "/#home")}
          className="font-display text-xl font-bold text-primary flex items-center gap-2"
        >
          🌿 EcoBloom
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <a href="/#booking" onClick={(e) => handleNavClick(e, "/#booking")}>Book Now</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
                setOpen(false);
              }}
              className="block text-sm font-medium text-foreground/70 hover:text-primary py-2"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="rounded-full bg-accent text-accent-foreground w-full font-semibold">
            <a href="/#booking" onClick={(e) => { handleNavClick(e, "/#booking"); setOpen(false); }}>Book Now</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
