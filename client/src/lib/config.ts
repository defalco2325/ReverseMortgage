// Centralized configuration for easy editing
export const APP_CONFIG = {
  // Brand
  BRAND_NAME: import.meta.env.VITE_BRAND_NAME || "Nationwide Equities",
  
  // Contact
  PHONE_CTA: import.meta.env.VITE_PHONE_CTA || "tel:+1-866-312-4370",
  PHONE_DISPLAY: import.meta.env.VITE_PHONE_DISPLAY || "866-312-4370",
  
  // Legal
  NMLS_ID: import.meta.env.VITE_NMLS_ID || "1408",
  
  // Features
  USE_NETLIFY_FORMS: false,
};

// PLF (Principal Limit Factor) lookup table based on age
export const PLF_TABLE: Record<number, number> = {
  55: 0.3599,
  56: 0.3618,
  57: 0.3638,
  58: 0.3657,
  59: 0.3696,
  60: 0.3725,
  61: 0.3754,
  62: 0.3783,
  63: 0.3822,
  64: 0.3870,
  65: 0.3919,
  66: 0.3967,
  67: 0.4026,
  68: 0.4074,
  69: 0.4132,
  70: 0.4200,
  71: 0.4268,
  72: 0.4346,
  73: 0.4433,
  74: 0.4530,
  75: 0.4627,
  76: 0.4734,
  77: 0.4811,
  78: 0.4839,
  79: 0.4888,
  80: 0.5088,
  81: 0.5189,
  82: 0.5492,
  83: 0.5529,
  84: 0.5626,
  85: 0.5635,
  86: 0.5685,
  87: 0.5704,
  88: 0.5733,
  89: 0.5733,
  90: 0.5733,
  91: 0.5733,
  92: 0.5733,
  93: 0.5733,
  94: 0.5733,
  95: 0.5733,
  96: 0.5733,
  97: 0.5733,
  98: 0.5733,
  99: 0.5733,
  100: 0.5733,
};

// PLF configuration
export const PLF_CONFIG = {
  MIN_AGE: 55,
  MIN_AGE_ESTIMATE: 62,
  MAX_PLF: 0.5733,
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
  if (effectiveAge < PLF_CONFIG.MIN_AGE) {
    return {
      outcome: 'no-match' as const,
      effectiveAge,
    };
  }
  
  // Get PLF from table (cap at 100 for ages over 100)
  const ageForLookup = Math.min(effectiveAge, 100);
  const plf = PLF_TABLE[ageForLookup] || PLF_CONFIG.MAX_PLF;
  
  const principalLimit = homeValue * plf;
  const netProceeds = Math.max(0, principalLimit - existingBalance);
  
  // Private: 55-61
  if (effectiveAge < PLF_CONFIG.MIN_AGE_ESTIMATE) {
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
