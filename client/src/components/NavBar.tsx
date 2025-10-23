import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import logoImage from "@assets/Reverse Mortgage Logo_1760557741341.png";

interface NavBarProps {
  onNavigate: (section: string) => void;
}

export default function NavBar({ onNavigate }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", section: "hero" },
    { label: "About", section: "about" },
    { label: "Calculator", section: "calculator" },
    { label: "Contact", section: "footer" },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0 -ml-[1%]">
            <button
              onClick={() => handleNavClick("hero")}
              className="hover-elevate p-2 rounded-md transition-colors"
              data-testid="link-logo"
              aria-label={`Go to ${APP_CONFIG.BRAND_NAME} homepage`}
            >
              <img 
                src={logoImage} 
                alt={APP_CONFIG.BRAND_NAME}
                className="h-[95px] w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover-elevate rounded-md transition-colors"
                data-testid={`link-${link.section}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild size="default" data-testid="button-nav-cta">
              <a href={APP_CONFIG.PHONE_CTA} className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Speak with an Expert
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              className="text-gray-700"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover-elevate rounded-md transition-colors"
                data-testid={`link-mobile-${link.section}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full" data-testid="button-mobile-cta">
                <a href={APP_CONFIG.PHONE_CTA} className="flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Speak with an Expert
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
