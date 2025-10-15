import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react";
import { formatCurrency, formatPercentage, APP_CONFIG } from "@/lib/config";

type Outcome = 'no-match' | 'private' | 'estimate';

interface Step3ResultsProps {
  outcome: Outcome;
  data: {
    effectiveAge: number;
    homeValue?: number;
    existingBalance?: number;
    principalLimit?: number;
    netProceeds?: number;
    plf?: number;
  };
  onRestart: () => void;
}

export default function Step3Results({ outcome, data, onRestart }: Step3ResultsProps) {
  if (outcome === 'no-match') {
    return (
      <div className="space-y-6" data-testid="results-no-match">
        <Card className="p-8 border-l-4 border-l-destructive">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Not Eligible at This Time
                </h3>
                <p className="text-muted-foreground">
                  Based on the information provided, you do not currently qualify for a traditional reverse mortgage. 
                  The minimum age requirement is 55 years old.
                </p>
              </div>
              
              <div className="bg-card/50 rounded-xl p-6 space-y-3">
                <h4 className="font-semibold text-lg">We're Here to Help</h4>
                <p className="text-sm text-muted-foreground">
                  While you may not qualify at this time, our team can discuss alternative financing options 
                  that may be suitable for your situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild className="flex-1" data-testid="button-call-no-match">
                    <a href={APP_CONFIG.PHONE_CTA}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call {APP_CONFIG.PHONE_DISPLAY}
                    </a>
                  </Button>
                  <Button variant="secondary" className="flex-1" data-testid="button-email-no-match">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Button
          variant="outline"
          onClick={onRestart}
          className="w-full"
          data-testid="button-restart-no-match"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
    );
  }

  if (outcome === 'private') {
    return (
      <div className="space-y-6" data-testid="results-private">
        <Card className="p-8 border-l-4 border-l-chart-5">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-chart-5/20 flex items-center justify-center flex-shrink-0 mt-1">
              <AlertCircle className="w-5 h-5 text-chart-5" />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">Private Lending Option Available</h3>
                  <Badge variant="secondary" className="text-xs">Ages 55-61</Badge>
                </div>
                <p className="text-muted-foreground">
                  You qualify for our private reverse mortgage program designed for borrowers aged 55-61.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Home Value</p>
                  <p className="text-2xl font-bold tracking-tight tabular-nums">
                    {formatCurrency(data.homeValue || 0)}
                  </p>
                </div>
                <div className="bg-card/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Existing Balance</p>
                  <p className="text-2xl font-bold tracking-tight tabular-nums">
                    {formatCurrency(data.existingBalance || 0)}
                  </p>
                </div>
                <div className="bg-card/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Principal Limit Factor</p>
                  <p className="text-2xl font-bold tracking-tight tabular-nums">
                    {formatPercentage(data.plf || 0)}
                  </p>
                </div>
                <div className="bg-card/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Net Proceeds</p>
                  <p className="text-2xl font-bold tracking-tight tabular-nums text-chart-5">
                    {formatCurrency(data.netProceeds || 0)}
                  </p>
                </div>
              </div>

              <div className="bg-card/50 rounded-xl p-6 space-y-3">
                <h4 className="font-semibold text-lg">Next Steps</h4>
                <p className="text-sm text-muted-foreground">
                  Our private lending specialists will contact you to discuss terms, rates, and complete your application. 
                  This program offers flexible options tailored to your unique situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild className="flex-1" data-testid="button-call-private">
                    <a href={APP_CONFIG.PHONE_CTA}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call {APP_CONFIG.PHONE_DISPLAY}
                    </a>
                  </Button>
                  <Button variant="secondary" className="flex-1" data-testid="button-email-private">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Button
          variant="outline"
          onClick={onRestart}
          className="w-full"
          data-testid="button-restart-private"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
    );
  }

  // Full Estimate (62+)
  return (
    <div className="space-y-6" data-testid="results-estimate">
      <Card className="p-8 border-l-4 border-l-chart-4">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-8 h-8 text-chart-4 flex-shrink-0 mt-1" />
          <div className="space-y-4 flex-1">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">Congratulations! You Qualify</h3>
                <Badge className="text-xs bg-chart-4 hover:bg-chart-4">Eligible</Badge>
              </div>
              <p className="text-muted-foreground">
                Based on your information, here's your estimated reverse mortgage benefit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Home Value</p>
                <p className="text-2xl font-bold tracking-tight tabular-nums">
                  {formatCurrency(data.homeValue || 0)}
                </p>
              </div>
              <div className="bg-card/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Existing Balance</p>
                <p className="text-2xl font-bold tracking-tight tabular-nums">
                  {formatCurrency(data.existingBalance || 0)}
                </p>
              </div>
              <div className="bg-card/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Principal Limit</p>
                <p className="text-2xl font-bold tracking-tight tabular-nums">
                  {formatCurrency(data.principalLimit || 0)}
                </p>
              </div>
              <div className="bg-card/50 rounded-xl p-4 ring-2 ring-chart-4 ring-offset-2 ring-offset-background">
                <p className="text-sm text-muted-foreground mb-1">Estimated Net Proceeds</p>
                <p className="text-3xl font-bold tracking-tight tabular-nums text-chart-4">
                  {formatCurrency(data.netProceeds || 0)}
                </p>
              </div>
            </div>

            <div className="bg-card/50 rounded-xl p-6 space-y-3">
              <h4 className="font-semibold text-lg">What Happens Next?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>A licensed reverse mortgage specialist will contact you within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>Review your personalized options and ask any questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>Complete your application with guidance every step of the way</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="flex-1" data-testid="button-call-estimate">
                  <a href={APP_CONFIG.PHONE_CTA}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call {APP_CONFIG.PHONE_DISPLAY}
                  </a>
                </Button>
                <Button variant="secondary" className="flex-1" data-testid="button-email-estimate">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Questions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Button
        variant="outline"
        onClick={onRestart}
        className="w-full"
        data-testid="button-restart-estimate"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Calculate Another Estimate
      </Button>
    </div>
  );
}
