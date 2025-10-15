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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { REASON_OPTIONS, US_STATES } from "@/lib/config";

const step2Schema = z.object({
  reason: z.string().min(1, "Please select a reason"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Invalid email address"),
  _botField: z.string().optional(),
});

export type Step2Data = z.infer<typeof step2Schema>;

interface Step2FormProps {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
  initialData?: Partial<Step2Data>;
}

export default function Step2Form({ onNext, onBack, initialData }: Step2FormProps) {
  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      reason: initialData?.reason || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      address: initialData?.address || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      zipCode: initialData?.zipCode || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      _botField: "",
    },
  });

  const formatPhoneInput = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.slice(0, 10);
  };

  const displayPhone = (value: string) => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6" data-testid="form-step2">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          {...form.register("_botField")}
        />

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Primary Reason for Reverse Mortgage <span className="text-ring">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-reason">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REASON_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    First Name <span className="text-ring">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      data-testid="input-firstName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Last Name <span className="text-ring">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      data-testid="input-lastName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Property Address <span className="text-ring">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main Street"
                    data-testid="input-address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    City <span className="text-ring">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Springfield"
                      data-testid="input-city"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    State <span className="text-ring">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-state">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    ZIP Code <span className="text-ring">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12345"
                      maxLength={5}
                      data-testid="input-zipCode"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Phone Number <span className="text-ring">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      data-testid="input-phone"
                      value={displayPhone(field.value)}
                      onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Email Address <span className="text-ring">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      data-testid="input-email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormDescription className="text-xs text-muted-foreground">
            Your information is secure and will never be shared with third parties without your consent.
          </FormDescription>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
            className="flex-1 text-base font-semibold h-12"
            data-testid="button-back-step2"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 text-base font-semibold h-12"
            data-testid="button-calculate"
          >
            Calculate My Estimate
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
