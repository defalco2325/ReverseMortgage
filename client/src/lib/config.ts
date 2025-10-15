// Centralized configuration for easy editing
export const APP_CONFIG = {
  // Brand
  BRAND_NAME: import.meta.env.VITE_BRAND_NAME || "Nationwide Equities",
  
  // Contact
  PHONE_CTA: import.meta.env.VITE_PHONE_CTA || "tel:+1-800-000-0000",
  PHONE_DISPLAY: import.meta.env.VITE_PHONE_DISPLAY || "1-800-000-0000",
  
  // Legal
  NMLS_ID: import.meta.env.VITE_NMLS_ID || "123456",
  
  // Features
  USE_NETLIFY_FORMS: false,
};

// PLF (Principal Limit Factor) calculation model
export const PLF_CONFIG = {
  // Age thresholds
  MIN_AGE_PRIVATE: 55,
  MIN_AGE_ESTIMATE: 62,
  
  // PLF rates
  BASE_RATE_PRIVATE: 0.20,
  INCREMENT_PRIVATE: 0.01,
  
  BASE_RATE_ESTIMATE: 0.26,
  INCREMENT_ESTIMATE: 0.012,
  MAX_PLF: 0.60,
};

// Calculate PLF and estimate
export function calculateEstimate(
  homeValue: number,
  applicantAge: number,
  existingBalance: number,
  spouseAge?: number
) {
  const effectiveAge = spouseAge && spouseAge < applicantAge ? spouseAge : applicantAge;
  
  // No Match: Under 55
  if (effectiveAge < PLF_CONFIG.MIN_AGE_PRIVATE) {
    return {
      outcome: 'no-match' as const,
      effectiveAge,
    };
  }
  
  // Private: 55-61
  if (effectiveAge < PLF_CONFIG.MIN_AGE_ESTIMATE) {
    const plf = Math.min(
      PLF_CONFIG.BASE_RATE_PRIVATE + (effectiveAge - PLF_CONFIG.MIN_AGE_PRIVATE) * PLF_CONFIG.INCREMENT_PRIVATE,
      PLF_CONFIG.MAX_PLF
    );
    const principalLimit = homeValue * plf;
    const netProceeds = Math.max(0, principalLimit - existingBalance);
    
    return {
      outcome: 'private' as const,
      effectiveAge,
      plf,
      homeValue,
      existingBalance,
      principalLimit,
      netProceeds,
    };
  }
  
  // Full Estimate: 62+
  const plf = Math.min(
    PLF_CONFIG.BASE_RATE_ESTIMATE + (effectiveAge - PLF_CONFIG.MIN_AGE_ESTIMATE) * PLF_CONFIG.INCREMENT_ESTIMATE,
    PLF_CONFIG.MAX_PLF
  );
  const principalLimit = homeValue * plf;
  const netProceeds = Math.max(0, principalLimit - existingBalance);
  
  return {
    outcome: 'estimate' as const,
    effectiveAge,
    plf,
    homeValue,
    existingBalance,
    principalLimit,
    netProceeds,
  };
}

// Format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

// Legal copy
export const LEGAL_COPY = {
  FOOTER: "100% Secure Data • Terms of Use • Privacy Notice • Equal Housing Lender",
  PRIVACY_DISCLAIMER: "Your information is secure and will never be shared with third parties without your consent.",
};

// Dropdown options
export const REASON_OPTIONS = [
  { value: "eliminate-mortgage", label: "Eliminate Mortgage Payment" },
  { value: "supplement-income", label: "Supplement Retirement Income" },
  { value: "pay-healthcare", label: "Pay for Healthcare Expenses" },
  { value: "home-improvements", label: "Fund Home Improvements" },
  { value: "debt-consolidation", label: "Consolidate Debt" },
  { value: "other", label: "Other" },
];

export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];
