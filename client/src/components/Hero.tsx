import { Button } from "@/components/ui/button";
import { Phone, Calculator } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

interface HeroProps {
  onScrollToCalculator: () => void;
}

export default function Hero({ onScrollToCalculator }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B3A6E] via-[#1E5AA7] to-[#0B3A6E]">
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse" />
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Unlock the Power of Your Home Equity with {APP_CONFIG.BRAND_NAME}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
          See how much you could qualify for with our simple Reverse Mortgage Calculator.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto"
            onClick={onScrollToCalculator}
            data-testid="button-hero-calculate"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate My Estimate
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            asChild
            data-testid="button-hero-call"
          >
            <a href={APP_CONFIG.PHONE_CTA}>
              <Phone className="mr-2 h-5 w-5" />
              Call {APP_CONFIG.PHONE_DISPLAY}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
