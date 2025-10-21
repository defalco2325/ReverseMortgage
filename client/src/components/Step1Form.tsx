import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import InfoTooltip from "./InfoTooltip";

const step1Schema = z.object({
  homeValue: z.number().min(50000, "Home value must be at least $50,000"),
  applicantAge: z.number().min(18, "Age must be at least 18").max(120, "Age must be valid"),
  existingBalance: z.number().min(0, "Balance cannot be negative").optional().or(z.literal(0)),
  spouseAge: z.number().min(18, "Age must be at least 18").max(120, "Age must be valid").optional().or(z.literal(0)),
});

export type Step1Data = z.infer<typeof step1Schema>;

interface Step1FormProps {
  onNext: (data: Step1Data) => void;
  initialData?: Partial<Step1Data>;
}

export default function Step1Form({ onNext, initialData }: Step1FormProps) {
  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      homeValue: initialData?.homeValue || undefined,
      applicantAge: initialData?.applicantAge || undefined,
      existingBalance: initialData?.existingBalance || undefined,
      spouseAge: initialData?.spouseAge || undefined,
    },
  });

  const formatCurrencyInput = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers === "") return undefined;
    return parseInt(numbers, 10);
  };

  const displayCurrency = (value: number | undefined) => {
    return value ? `$${value.toLocaleString()}` : "";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-4" data-testid="form-step1">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="homeValue"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-2">
                  <FormLabel className="text-sm font-normal text-card-foreground">
                    Your estimated home value<span className="text-destructive">*</span>
                  </FormLabel>
                  <InfoTooltip content="Enter the current market value of your home. This is an estimate and will be verified during the application process." />
                </div>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
                    className="h-12 text-base border-input"
                    data-testid="input-homeValue"
                    value={displayCurrency(field.value)}
                    onChange={(e) => field.onChange(formatCurrencyInput(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applicantAge"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-2">
                  <FormLabel className="text-sm font-normal text-card-foreground">
                    Your age<span className="text-destructive">*</span>
                  </FormLabel>
                  <InfoTooltip content="Age of the youngest borrower. You must be at least 55 years old to qualify for a reverse mortgage." />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder=""
                    className="h-12 text-base border-input"
                    data-testid="input-applicantAge"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="existingBalance"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-2">
                  <FormLabel className="text-sm font-normal text-card-foreground">
                    Existing mortgage balance (If applicable)
                  </FormLabel>
                  <InfoTooltip content="Current outstanding balance on your mortgage. Leave blank if your home is paid off." />
                </div>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
                    className="h-12 text-base border-input"
                    data-testid="input-existingBalance"
                    value={displayCurrency(field.value)}
                    onChange={(e) => field.onChange(formatCurrencyInput(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spouseAge"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-2">
                  <FormLabel className="text-sm font-normal text-card-foreground">
                    Age of younger spouse on title (optional)
                  </FormLabel>
                  <InfoTooltip content="If your spouse or partner will be on the title and is younger than you, enter their age here. This may affect your loan amount." />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder=""
                    className="h-12 text-base border-input"
                    data-testid="input-spouseAge"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-4">
            Co-op properties, rental homes, and rental apartments do not typically qualify. Contact a specialist for more information.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            <span className="text-destructive">*</span> Indicates required field
          </p>
          
          <Button 
            type="submit" 
            className="w-full text-base font-semibold h-12 uppercase tracking-wide"
            data-testid="button-next-step1"
          >
            <Lock className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </div>
      </form>
    </Form>
  );
}
