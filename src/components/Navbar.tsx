import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo-full.png";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about", isRoute: true },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/#booking" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hash = href.split("#")[1];
      if (!hash) return;

      if (location.pathname === "/") {
        // Already on home page — just scroll
        e.preventDefault();
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // On a different page — navigate to home with hash
        e.preventDefault();
        navigate("/?scrollTo=" + hash);
      }
    },
    [location.pathname, navigate]
  );

  const renderLink = (link: typeof navLinks[0], onClick?: () => void) => {
    const className = "text-sm font-medium text-foreground/70 hover:text-primary transition-colors";
    if (link.isRoute) {
      return (
        <Link to={link.href} onClick={onClick} className={className}>
          {link.label}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        onClick={(e) => {
          handleHashClick(e, link.href);
          onClick?.();
        }}
        className={className}
      >
        {link.label}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="EcoBloom Plant Care" className="h-9 sm:h-10 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <span key={link.href}>{renderLink(link)}</span>
          ))}
          <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <a href="/#booking" onClick={(e) => handleHashClick(e, "/#booking")}>Book Now</a>
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
            <div key={link.href} className="block py-2">
              {renderLink(link, () => setOpen(false))}
            </div>
          ))}
          <Button asChild className="rounded-full bg-accent text-accent-foreground w-full font-semibold">
            <a href="/#booking" onClick={(e) => { handleHashClick(e, "/#booking"); setOpen(false); }}>Book Now</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
