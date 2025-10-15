import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface MobileBottomCTAProps {
  onScrollToCalculator: () => void;
}

export default function MobileBottomCTA({ onScrollToCalculator }: MobileBottomCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past hero section (approx 600px)
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-secondary/95 backdrop-blur-sm shadow-2xl p-3">
      <Button
        size="lg"
        className="w-full text-base font-semibold h-12"
        onClick={onScrollToCalculator}
        data-testid="button-mobile-bottom-cta"
      >
        <Calculator className="mr-2 h-5 w-5" />
        Start Estimate
      </Button>
    </div>
  );
}
