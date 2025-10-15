import { useRef } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import About from "@/components/About";
import CalculatorSection from "@/components/CalculatorSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      hero: heroRef,
      about: aboutRef,
      calculator: calculatorRef,
      footer: footerRef,
    };

    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onNavigate={scrollToSection} />
      
      <div ref={heroRef}>
        <Hero onScrollToCalculator={scrollToCalculator} />
      </div>
      
      <TrustBadges />
      
      <div ref={aboutRef}>
        <About />
      </div>
      
      <div ref={calculatorRef}>
        <CalculatorSection />
      </div>
      
      <Testimonials />
      
      <CTASection onScrollToCalculator={scrollToCalculator} />
      
      <div ref={footerRef}>
        <Footer />
      </div>

      <MobileBottomCTA onScrollToCalculator={scrollToCalculator} />
    </div>
  );
}
