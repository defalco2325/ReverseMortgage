import { Card } from "@/components/ui/card";
import { useState, useRef } from "react";
import ProgressIndicator from "./ProgressIndicator";
import Step1Form, { type Step1Data } from "./Step1Form";
import Step2Form, { type Step2Data } from "./Step2Form";
import Step3Results from "./Step3Results";
import { calculateEstimate } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";

export default function CalculatorSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [estimate, setEstimate] = useState<ReturnType<typeof calculateEstimate> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleStep1Next = (data: Step1Data) => {
    console.log('Step 1 data:', data);
    setStep1Data(data);
    setCurrentStep(2);
    scrollToTop();
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
    scrollToTop();
  };

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStep2Next = async (data: Step2Data) => {
    console.log('Step 2 data:', data);
    
    // Honeypot check
    if (data._botField) {
      console.warn('Bot detected via honeypot field');
      return;
    }
    
    setStep2Data(data);
    setIsCalculating(true);

    // Calculate estimate
    const result = calculateEstimate(
      step1Data!.homeValue,
      step1Data!.applicantAge,
      step1Data!.existingBalance,
      step1Data!.spouseAge || undefined
    );

    console.log('Calculation result:', result);

    // Submit to Netlify function
    try {
      const payload = {
        step1: step1Data,
        step2: data,
        estimate: result,
        meta: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }
      };

      const response = await fetch('/.netlify/functions/lead-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      console.log('Lead submitted successfully');
    } catch (error) {
      console.error('Failed to submit lead:', error);
      // Show non-intrusive toast but don't block the user
      toast({
        title: "Submission Notice",
        description: "Your estimate was calculated successfully. Our team will contact you shortly.",
        variant: "default",
      });
    }

    setEstimate(result);
    setIsCalculating(false);
    setCurrentStep(3);
    scrollToTop();
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setStep1Data(null);
    setStep2Data(null);
    setEstimate(null);
    scrollToTop();
  };

  return (
    <section
      id="calculator"
      ref={sectionRef}
      className="py-20 bg-background scroll-mt-16"
      data-testid="section-calculator"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Reverse Mortgage Calculator
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get your personalized estimate in 3 simple steps
          </p>
          
          {/* Progress */}
          <div className="flex justify-center">
            <ProgressIndicator currentStep={currentStep} totalSteps={3} />
          </div>
        </div>

        {/* Main Card */}
        <Card className="p-8 md:p-12 shadow-2xl border-t-4 border-t-primary">
          {currentStep === 1 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-center text-card-foreground">
                Step 1: Property & Age Information
              </h3>
              <p className="text-center text-muted-foreground mb-8">
                Page 1 of 2
              </p>
              <Step1Form onNext={handleStep1Next} initialData={step1Data || undefined} />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-center text-card-foreground">
                Step 2: Contact Information
              </h3>
              <p className="text-center text-muted-foreground mb-8">
                Page 2 of 2
              </p>
              <Step2Form
                onNext={handleStep2Next}
                onBack={handleStep2Back}
                initialData={step2Data || undefined}
              />
            </div>
          )}

          {currentStep === 3 && estimate && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-8 text-center text-card-foreground">
                Your Results
              </h3>
              <Step3Results
                outcome={estimate.outcome}
                data={estimate}
                onRestart={handleRestart}
              />
            </div>
          )}

          {isCalculating && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
              <p className="text-lg font-semibold text-card-foreground">Calculating your estimate...</p>
            </div>
          )}
        </Card>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary rounded-full">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">100% Secure Data</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ShieldCheck } from "lucide-react";
