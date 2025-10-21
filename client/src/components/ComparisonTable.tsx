import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/config";
import { CheckCircle, XCircle } from "lucide-react";

interface ComparisonTableProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    homeValue: number;
    principalLimit: number;
    netProceeds: number;
  };
}

export default function ComparisonTable({ open, onOpenChange, data }: ComparisonTableProps) {
  // Calculate values for each product
  const hecmTotalProceeds = data.netProceeds;
  const hecmAtClosing = data.netProceeds * 0.1; // 10% at closing for HECM
  
  const equityPowerTotalProceeds = data.netProceeds;
  const equityPowerAtClosing = data.netProceeds * 0.5; // 50% at closing for EquityPower

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto" data-testid="dialog-comparison">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Here's a quick snapshot of each product.
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-4 text-left font-semibold border border-border">PRODUCTS</th>
                <th className="p-4 text-center font-semibold border border-border">TRADITIONAL HECM</th>
                <th className="p-4 text-center font-semibold border border-border">EQUITYPOWER</th>
              </tr>
            </thead>
            <tbody>
              {/* Lending Limit */}
              <tr className="bg-card">
                <td className="p-4 font-medium border border-border" aria-label="Lending Limit">
                  Lending Limit<sup className="text-xs" aria-hidden="true">1</sup>
                </td>
                <td className="p-4 text-center border border-border" aria-label="Up to HECM loan limit">
                  Up to HECM loan limit<sup className="text-xs" aria-hidden="true">2</sup>
                </td>
                <td className="p-4 text-center border border-border" aria-label="Up to $4,000,000">
                  Up to {formatCurrency(4000000)}<sup className="text-xs" aria-hidden="true">2,3</sup>
                </td>
              </tr>

              {/* Estimated Total Proceeds */}
              <tr className="bg-muted/30">
                <td className="p-4 font-medium border border-border">Estimated total proceeds</td>
                <td className="p-4 text-center border border-border font-semibold">
                  {formatCurrency(hecmTotalProceeds)}
                </td>
                <td className="p-4 text-center border border-border font-semibold">
                  {formatCurrency(equityPowerTotalProceeds)}
                </td>
              </tr>

              {/* Estimated Proceeds Available at Closing */}
              <tr className="bg-card">
                <td className="p-4 font-medium border border-border" aria-label="Estimated proceeds available at closing">
                  Estimated proceeds available at closing<sup className="text-xs" aria-hidden="true">4</sup>
                </td>
                <td className="p-4 text-center border border-border font-semibold">
                  {formatCurrency(hecmAtClosing)}
                </td>
                <td className="p-4 text-center border border-border font-semibold">
                  {formatCurrency(equityPowerAtClosing)}
                </td>
              </tr>

              {/* Line of Credit Growth */}
              <tr className="bg-muted/30">
                <td className="p-4 font-medium border border-border" aria-label="Line of Credit growth">
                  Line of Credit growth<sup className="text-xs" aria-hidden="true">1,5</sup>
                </td>
                <td className="p-4 text-center border border-border">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" aria-hidden="true" />
                    <span>Yes (line of credit option only)</span>
                  </div>
                </td>
                <td className="p-4 text-center border border-border">
                  <div className="flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                    <span>No</span>
                  </div>
                </td>
              </tr>

              {/* Minimum Age */}
              <tr className="bg-card">
                <td className="p-4 font-medium border border-border">Minimum Age</td>
                <td className="p-4 text-center border border-border">62</td>
                <td className="p-4 text-center border border-border" data-testid="cell-min-age-equitypower">
                  55<sup className="text-xs ml-px">6</sup>
                </td>
              </tr>

              {/* Closing Costs */}
              <tr className="bg-muted/30">
                <td className="p-4 font-medium border border-border">Closing Costs</td>
                <td colSpan={2} className="p-4 border border-border text-sm text-card-foreground">
                  Closing costs can vary depending on the loan program you choose. 
                  Please contact one of our consultants to see which program best fits your needs.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footnotes */}
        <div className="mt-6 space-y-2 text-xs text-muted-foreground">
          <p><sup>1</sup> Based on current program guidelines and subject to change.</p>
          <p><sup>2</sup> Actual loan amounts depend on age, home value, and current interest rates.</p>
          <p><sup>3</sup> EquityPower is a proprietary reverse mortgage product with higher lending limits than traditional HECM.</p>
          <p><sup>4</sup> Traditional HECM allows 10% of principal limit at closing, with additional funds available after 12 months. EquityPower provides more immediate access.</p>
          <p><sup>5</sup> Line of credit growth features allow unused funds to grow over time, increasing available credit.</p>
          <p><sup>6</sup> Borrowers aged 55-61 may qualify for our private lending program with different terms.</p>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>All estimates are subject to verification and final underwriting approval. Consult with a Reverse Mortgage Specialist for personalized quotes.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
