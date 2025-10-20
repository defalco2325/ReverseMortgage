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
      step1Data!.existingBalance || 0,
      step1Data!.spouseAge || undefined
    );

    console.log('Calculation result:', result);
    setEstimate(result);
    setIsCalculating(false);
    setCurrentStep(3);

    // Submit to Netlify Forms
    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'contact');
      
      // Step 1 data
      formData.append('homeValue', step1Data!.homeValue.toString());
      formData.append('applicantAge', step1Data!.applicantAge.toString());
      formData.append('existingBalance', (step1Data!.existingBalance || 0).toString());
      if (step1Data!.spouseAge) {
        formData.append('spouseAge', step1Data!.spouseAge.toString());
      }
      
      // Step 2 data
      formData.append('reason', data.reason);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('zipCode', data.zipCode);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('_botField', data._botField || '');
      
      // Results data
      formData.append('principalLimit', (result.principalLimit || 0).toString());
      formData.append('netProceeds', (result.netProceeds || 0).toString());
      formData.append('outcome', result.outcome);
      
      console.log('Submitting to Netlify Forms with data:', Object.fromEntries(formData));
      
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      
      console.log('Form submitted to Netlify Forms successfully');
    } catch (error) {
      console.error('Error submitting to Netlify Forms:', error);
      // Don't block the user experience if submission fails
    }
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
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
          {/* Progress */}
          {currentStep > 1 && <ProgressIndicator currentStep={currentStep} totalSteps={3} />}

          {/* Main Card */}
          <Card className="p-8 md:p-12 shadow-2xl border-t-4 border-t-primary">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-card-foreground">
                  Reverse Mortgage Calculator
                </h2>
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
