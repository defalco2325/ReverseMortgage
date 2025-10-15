import { useState } from "react";
import { Card } from "@/components/ui/card";
import ProgressIndicator from "@/components/ProgressIndicator";
import Step1Form, { type Step1Data } from "@/components/Step1Form";
import Step2Form, { type Step2Data } from "@/components/Step2Form";
import Step3Results from "@/components/Step3Results";
import Footer from "@/components/Footer";
import { calculateEstimate, APP_CONFIG } from "@/lib/config";

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [estimate, setEstimate] = useState<ReturnType<typeof calculateEstimate> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleStep1Next = (data: Step1Data) => {
    console.log('Step 1 data:', data);
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
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

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Calculate estimate
    const result = calculateEstimate(
      step1Data!.homeValue,
      step1Data!.applicantAge,
      step1Data!.existingBalance,
      step1Data!.spouseAge || undefined
    );

    console.log('Calculation result:', result);
    setEstimate(result);
    setIsCalculating(false);
    setCurrentStep(3);

    // TODO: Submit to Netlify function
    // const payload = {
    //   step1: step1Data,
    //   step2: data,
    //   estimate: result,
    //   meta: {
    //     timestamp: new Date().toISOString(),
    //     userAgent: navigator.userAgent,
    //   }
    // };
    // await fetch('/.netlify/functions/lead-intake', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setStep1Data(null);
    setStep2Data(null);
    setEstimate(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {APP_CONFIG.BRAND_NAME}
            </h1>
            <p className="text-lg text-muted-foreground">
              Reverse Mortgage Calculator
            </p>
          </div>

          {/* Progress */}
          <ProgressIndicator currentStep={currentStep} totalSteps={3} />

          {/* Main Card */}
          <Card className="p-6 md:p-8 shadow-2xl">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Property & Age Information
                </h2>
                <p className="text-muted-foreground mb-6">
                  Let's start with some basic information about your property and age.
                </p>
                <Step1Form onNext={handleStep1Next} initialData={step1Data || undefined} />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-6">
                  We'll need your contact details to provide your personalized estimate.
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
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Your Results
                </h2>
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
                <p className="text-lg font-semibold">Calculating your estimate...</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
