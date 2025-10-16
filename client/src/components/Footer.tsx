import { ShieldCheck, Home } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import logoImage from "@assets/Reverse Mortgage Logo_1760557741341.png";

export default function Footer() {
  return (
    <footer id="footer" className="w-full py-12 px-4 border-t border-gray-200 bg-white" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        {/* Logo and Company Info */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={logoImage} 
              alt={APP_CONFIG.BRAND_NAME}
              className="h-[109px] w-auto"
            />
          </div>
          <p className="text-gray-700 font-medium mb-2">
            225 Brae Blvd. Suite 202, Park Ridge, NJ 07656
          </p>
          <p className="text-gray-600 mb-4">
            Helping homeowners unlock their home equity since 2003
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-gray-600">
            <a href={APP_CONFIG.PHONE_CTA} className="hover-elevate px-2 py-1 rounded font-medium text-gray-700">
              {APP_CONFIG.PHONE_DISPLAY}
            </a>
            <span className="hidden sm:inline">•</span>
            <span>NMLS #{APP_CONFIG.NMLS_ID}</span>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8 text-sm">
          <a href="#" className="text-gray-600 hover-elevate px-2 py-1 rounded transition-colors">
            Terms of Use
          </a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-gray-600 hover-elevate px-2 py-1 rounded transition-colors">
            Privacy Notice
          </a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-gray-600 hover-elevate px-2 py-1 rounded transition-colors">
            Licensing
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>100% Secure Data</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-primary" />
            <span>Equal Housing Lender</span>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="max-w-4xl mx-auto text-center space-y-4 text-xs text-gray-600 leading-relaxed">
          <p>
            <strong className="text-gray-800">Equal Housing Lender | Nationwide Equities Corp. | NMLS #{APP_CONFIG.NMLS_ID}</strong>
          </p>
          <p>
            © {new Date().getFullYear()} Nationwide Equities. All Rights Reserved.
          </p>
          <p>
            This calculator provides estimates only and does not constitute a loan offer or approval.
            Actual loan amounts and terms will vary based on property appraisal, creditworthiness,
            and other factors. A reverse mortgage increases the principal mortgage loan amount and
            decreases home equity. Most reverse mortgages have origination fees and closing costs.
            Charges may be higher than for a home equity loan. The amount of money you may receive
            may vary according to the specific lender and your own circumstances. Consult a financial
            advisor and appropriate government agencies for additional details. Licensed in all 50 states.
          </p>
          <p className="font-medium text-gray-700">
            We value your privacy. Your information is secure and will never be shared with third
            parties without your consent.
          </p>
        </div>
      </div>
    </footer>
  );
}
