import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full mb-8" data-testid="progress-indicator">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200",
                  step < currentStep && "bg-primary text-primary-foreground",
                  step === currentStep && "bg-ring text-white ring-2 ring-ring ring-offset-2 ring-offset-background",
                  step > currentStep && "bg-secondary text-secondary-foreground border-2 border-border"
                )}
                data-testid={`progress-step-${step}`}
              >
                {step < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step
                )}
              </div>
              <span className="text-xs mt-2 text-muted-foreground hidden sm:block">
                Step {step}
              </span>
            </div>
            
            {/* Connecting Line */}
            {index < totalSteps - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-border relative">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 bg-primary transition-all duration-300",
                    step < currentStep ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
