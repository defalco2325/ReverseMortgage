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
import { ArrowRight } from "lucide-react";

const step1Schema = z.object({
  homeValue: z.number().min(50000, "Home value must be at least $50,000"),
  applicantAge: z.number().min(18, "Age must be at least 18").max(120, "Age must be valid"),
  existingBalance: z.number().min(0, "Balance cannot be negative"),
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
      homeValue: initialData?.homeValue || 0,
      applicantAge: initialData?.applicantAge || 0,
      existingBalance: initialData?.existingBalance || 0,
      spouseAge: initialData?.spouseAge || 0,
    },
  });

  const formatCurrencyInput = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers ? parseInt(numbers, 10) : 0;
  };

  const displayCurrency = (value: number) => {
    return value ? `$${value.toLocaleString()}` : "";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6" data-testid="form-step1">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="homeValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Home Value <span className="text-ring">*</span>
                </FormLabel>
                <FormDescription className="text-sm text-muted-foreground">
                  Estimated current market value of your home
                </FormDescription>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="$500,000"
                    className="text-lg font-semibold"
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
                <FormLabel className="text-base font-semibold">
                  Your Age <span className="text-ring">*</span>
                </FormLabel>
                <FormDescription className="text-sm text-muted-foreground">
                  Age of the youngest borrower
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="65"
                    className="text-lg"
                    data-testid="input-applicantAge"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
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
                <FormLabel className="text-base font-semibold">
                  Existing Mortgage Balance <span className="text-ring">*</span>
                </FormLabel>
                <FormDescription className="text-sm text-muted-foreground">
                  Current balance on your mortgage (enter 0 if paid off)
                </FormDescription>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="$150,000"
                    className="text-lg font-semibold"
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
                <FormLabel className="text-base font-semibold">
                  Spouse/Partner Age (Optional)
                </FormLabel>
                <FormDescription className="text-sm text-muted-foreground">
                  If applicable, enter your spouse or partner's age
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="62"
                    className="text-lg"
                    data-testid="input-spouseAge"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full text-base font-semibold h-12"
          data-testid="button-next-step1"
        >
          Continue to Contact Information
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
}
