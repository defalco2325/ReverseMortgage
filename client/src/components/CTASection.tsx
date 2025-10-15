import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

interface CTASectionProps {
  onScrollToCalculator: () => void;
}

export default function CTASection({ onScrollToCalculator }: CTASectionProps) {
  return (
    <section
      className="py-20 bg-gradient-to-br from-[#0B3A6E] to-[#1E5AA7] relative overflow-hidden"
      data-testid="section-cta"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Your Home Equity Could Work for You
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Discover how much cash you could access. There's no obligation, and it only takes a few
          minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto"
            onClick={onScrollToCalculator}
            data-testid="button-cta-estimate"
          >
            Start My Estimate
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            asChild
            data-testid="button-cta-call"
          >
            <a href={APP_CONFIG.PHONE_CTA}>
              <Phone className="mr-2 h-5 w-5" />
              Call to Speak with an Expert
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
