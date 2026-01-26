import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import patChrisLogo from "@/assets/pat-chris-logo.png";

interface HeaderProps {
  hideNavAndCta?: boolean;
}

const Header = ({ hideNavAndCta = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Coaching", path: "/coaching-program" },
    { name: "Podcast", path: "/podcast" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-elegant"
          : "bg-transparent"
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          {hideNavAndCta ? (
            <div className="flex items-center">
              <img
                src={patChrisLogo}
                alt="Pat & Chris Coaching"
                className="h-16 w-auto"
              />
            </div>
          ) : (
            <Link to="/#top" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img
                src={patChrisLogo}
                alt="Pat & Chris Coaching"
                className="h-16 w-auto"
              />
            </Link>
          )}

          {/* Desktop Navigation */}
          {!hideNavAndCta && (
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-lg font-bold transition-colors hover:text-accent ${
                    location.pathname === item.path
                      ? "text-accent"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* CTA Button */}
          {!hideNavAndCta && (
            <div className="hidden lg:block">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-gold text-background font-bold hover:shadow-glow transition-all duration-300"
                asChild
              >
                <Link to="/coaching-program" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Start Your Transformation</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!hideNavAndCta && (
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {!hideNavAndCta && isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-lg">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 text-lg font-bold hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full bg-gradient-gold text-background font-bold hover:shadow-glow transition-all duration-300"
                  asChild
                >
                  <Link to="/coaching-program" onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Start Your Transformation
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;