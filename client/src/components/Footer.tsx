import { ShieldCheck, Home } from "lucide-react";
import { APP_CONFIG, LEGAL_COPY } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 border-t border-border bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-6 text-xs text-muted-foreground flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Secure Data</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover-elevate px-2 py-1 rounded transition-colors">
              Terms of Use
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover-elevate px-2 py-1 rounded transition-colors">
              Privacy Notice
            </a>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Equal Housing Lender</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <span className="font-semibold">{APP_CONFIG.BRAND_NAME}</span> • NMLS #{APP_CONFIG.NMLS_ID}
            </p>
            <p className="max-w-2xl leading-relaxed">
              This calculator provides estimates only and does not constitute a loan offer or approval. 
              Actual loan amounts and terms will vary based on property appraisal, creditworthiness, and other factors. 
              Licensed in all 50 states.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
