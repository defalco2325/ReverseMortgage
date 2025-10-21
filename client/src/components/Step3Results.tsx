import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Phone, ArrowLeft } from "lucide-react";
import { formatCurrency, formatPercentage, APP_CONFIG } from "@/lib/config";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ComparisonTable from "./ComparisonTable";

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
  applicantAge: number;
  spouseAge?: number;
  onRestart: () => void;
}

export default function Step3Results({ outcome, data, applicantAge, spouseAge, onRestart }: Step3ResultsProps) {
  const [showComparison, setShowComparison] = useState(false);

  if (outcome === 'no-match') {
    return (
      <div className="space-y-6" data-testid="results-no-match">
        <Card className="p-8 border-l-4 border-l-destructive">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
            <div className="space-y-4 flex-1">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Not Eligible at This Time
                </h2>
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
                <div className="pt-2">
                  <Button asChild className="w-full sm:w-auto" data-testid="button-call-no-match">
                    <a href={APP_CONFIG.PHONE_CTA}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call {APP_CONFIG.PHONE_DISPLAY}
                    </a>
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
                  <h2 className="text-2xl font-bold">Private Lending Option Available</h2>
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
                <div className="pt-2">
                  <Button asChild className="w-full sm:w-auto" data-testid="button-call-private">
                    <a href={APP_CONFIG.PHONE_CTA}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call {APP_CONFIG.PHONE_DISPLAY}
                    </a>
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
  // Calculate chart data
  const mortgagePayoff = data.existingBalance || 0;
  const equityReserve = (data.homeValue || 0) - (data.principalLimit || 0);

  // EquityPower pie chart data - no line of credit, so all proceeds available at closing
  const equityPowerPieData = [
    { name: 'Mortgage Payoff', value: mortgagePayoff, color: '#EAB308' },
    { name: 'Available at Closing', value: (data.netProceeds || 0) * 0.5, color: '#22C55E' }, // 50% total (10% + 40%)
    { name: 'Equity Reserve', value: equityReserve, color: '#1e293b' },
  ];

  // Traditional HECM pie chart data - includes line of credit features
  const hecmPieData = [
    { name: 'Mortgage Payoff', value: mortgagePayoff, color: '#EAB308' },
    { name: 'Available at 12 Months', value: (data.netProceeds || 0) * 0.4, color: '#84CC16' },
    { name: 'Available at Closing', value: (data.netProceeds || 0) * 0.1, color: '#22C55E' },
    { name: 'Equity Reserve', value: equityReserve, color: '#1e293b' },
  ];

  // Projected credit line growth data
  const currentAge = data.effectiveAge;
  const lineChartData = [
    { age: `Age ${currentAge}`, value: data.netProceeds || 0 },
    { age: `Age ${currentAge + 5}`, value: ((data.netProceeds || 0) * 1.35) },
    { age: `Age ${currentAge + 10}`, value: ((data.netProceeds || 0) * 1.82) },
    { age: `Age ${currentAge + 15}`, value: ((data.netProceeds || 0) * 2.46) },
    { age: `Age ${currentAge + 20}`, value: ((data.netProceeds || 0) * 3.32) },
  ];

  return (
    <div className="space-y-6" data-testid="results-estimate">
      <Card className="p-8 border-l-4 border-l-chart-4">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-8 h-8 text-chart-4 flex-shrink-0 mt-1" />
          <div className="space-y-4 flex-1">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Congratulations! You Qualify</h2>
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
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <Card className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">Choose the option that's right for you.</h2>
          <p className="text-muted-foreground">
            Based on the value of your home, you may be eligible for the{' '}
            <span className="font-semibold">Traditional FHA HECM</span> or the{' '}
            <span className="font-semibold">Nationwide Equities EquityPower</span> reverse mortgage.
          </p>
          <Button 
            className="mt-4" 
            data-testid="button-compare-options"
            onClick={() => setShowComparison(true)}
          >
            COMPARE YOUR OPTIONS →
          </Button>
          
          <ComparisonTable
            open={showComparison}
            onOpenChange={setShowComparison}
            data={{
              homeValue: data.homeValue || 0,
              applicantAge: applicantAge,
              existingBalance: data.existingBalance || 0,
              spouseAge: spouseAge,
            }}
          />
        </div>

        <Tabs defaultValue="equitypower" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="equitypower">EQUITYPOWER</TabsTrigger>
            <TabsTrigger value="traditional">TRADITIONAL HECM</TabsTrigger>
          </TabsList>
          
          <TabsContent value="equitypower" className="space-y-8">
            {/* Pie Chart - EquityPower */}
            <div className="bg-card/50 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4 text-center">EquityPower Fund Distribution</h4>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={equityPowerPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {equityPowerPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {equityPowerPieData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-muted-foreground">
                      {entry.name} {formatCurrency(entry.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card/50 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-3">EquityPower Benefits</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>Flexible access to your home equity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>No monthly mortgage payments required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>Retain ownership of your home</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>Competitive rates and terms</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="traditional" className="space-y-8">
            <div className="bg-card/50 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4 text-center">Traditional HECM Fund Distribution</h4>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={hecmPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {hecmPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {hecmPieData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-muted-foreground">
                      {entry.name} {formatCurrency(entry.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Line Chart - Traditional HECM Credit Line Growth */}
            <div className="bg-card/50 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4 text-center">Traditional HECM Credit Line Growth</h4>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="age" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#84cc16" 
                    strokeWidth={3}
                    dot={{ fill: '#1e293b', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Traditional HECM credit line growth projections based on current rates and your PLF of {formatPercentage(data.plf || 0)}. 
                A Reverse Mortgage Consultant will provide detailed HECM illustrations.
              </p>
            </div>

            <div className="bg-card/50 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-3">Traditional HECM Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>FHA-insured reverse mortgage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>Government-backed program</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>Credit line grows over time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                  <span>Non-recourse loan protection</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Traditional HECM estimate based on current FHA guidelines and interest rates. 
              A Reverse Mortgage Consultant will provide an in-depth quote with exact numbers.
            </p>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Next Steps Card */}
      <Card className="p-8 bg-card/50">
        <h4 className="font-semibold text-lg mb-3">What Happens Next?</h4>
        <ul className="space-y-2 text-sm text-muted-foreground mb-4">
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
        <div>
          <Button asChild className="w-full sm:w-auto" data-testid="button-call-estimate">
            <a href={APP_CONFIG.PHONE_CTA}>
              <Phone className="mr-2 h-4 w-4" />
              Call {APP_CONFIG.PHONE_DISPLAY}
            </a>
          </Button>
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
