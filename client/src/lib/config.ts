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

// HECM PLF (Principal Limit Factor) lookup table based on age
// Ages 55-61: Private Lending PLF values
// Ages 62-100: HECM PLF values (Updated: 2025-10-21 from HECM PLF 10-21-25.xlsx)
export const HECM_PLF_TABLE: Record<number, number> = {
  // Private Lending (55-61)
  55: 0.3599,
  56: 0.3618,
  57: 0.3638,
  58: 0.3657,
  59: 0.3696,
  60: 0.3725,
  61: 0.3754,
  // HECM (62-100) - Updated from official HECM PLF table
  62: 0.357,
  63: 0.364,
  64: 0.371,
  65: 0.378,
  66: 0.386,
  67: 0.394,
  68: 0.402,
  69: 0.41,
  70: 0.415,
  71: 0.415,
  72: 0.416,
  73: 0.425,
  74: 0.434,
  75: 0.443,
  76: 0.45,
  77: 0.46,
  78: 0.471,
  79: 0.477,
  80: 0.488,
  81: 0.499,
  82: 0.511,
  83: 0.524,
  84: 0.536,
  85: 0.549,
  86: 0.563,
  87: 0.577,
  88: 0.589,
  89: 0.603,
  90: 0.618,
  91: 0.634,
  92: 0.65,
  93: 0.667,
  94: 0.684,
  95: 0.701,
  96: 0.71,
  97: 0.716,
  98: 0.716,
  99: 0.716,
  100: 0.716,
};

// EquityPower PLF (Principal Limit Factor) lookup table based on age
// Ages 55-100: EquityPower proprietary PLF values (Updated: 2025-10-21)
export const EQUITYPOWER_PLF_TABLE: Record<number, number> = {
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
  78: 0.4889,
  79: 0.4986,
  80: 0.5083,
  81: 0.5199,
  82: 0.5442,
  83: 0.5529,
  84: 0.5626,
  85: 0.5655,
  86: 0.5684,
  87: 0.5704,
  88: 0.5723,
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

// Legacy PLF_TABLE for backwards compatibility (defaults to HECM)
export const PLF_TABLE = HECM_PLF_TABLE;

// State lending configuration
export const LENDING_STATES = [
  'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'ID', 'MD', 'MS', 
  'NC', 'NJ', 'NV', 'NY', 'OR', 'PA', 'SC', 'TX', 'VA', 'WA'
] as const;

export type LendingState = typeof LENDING_STATES[number];

// State-specific age requirements for EquityPower
export const STATE_AGE_REQUIREMENTS: Record<string, number> = {
  NY: 60,
  WA: 60,
  TX: 62,
  NC: 62,
  // All other states default to 55
};

// Get minimum age for EquityPower based on state
export function getEquityPowerMinAge(state?: string): number {
  if (!state) return 55;
  return STATE_AGE_REQUIREMENTS[state] || 55;
}

// PLF configuration
export const PLF_CONFIG = {
  MIN_AGE: 55,
  MIN_AGE_ESTIMATE: 62, // HECM always requires 62
  HECM_MAX_PLF: 0.716, // HECM PLF table maximum (ages 97-100)
  EQUITYPOWER_MAX_PLF: 0.5733, // EquityPower PLF table maximum (ages 89-100)
};

// Calculate PLF and estimate (now uses EquityPower by default)
export function calculateEstimate(
  homeValue: number,
  applicantAge: number,
  existingBalance: number,
  spouseAge?: number,
  state?: string
) {
  // Ensure existingBalance defaults to 0 if not provided
  const balance = existingBalance || 0;
  
  // Get state-specific minimum age for EquityPower
  const minAge = getEquityPowerMinAge(state);
  
  // If spouse exists and qualifies (meets min age), use younger age
  // If spouse exists but doesn't qualify, default to older borrower (applicant)
  // If no spouse, use applicant age
  let effectiveAge = applicantAge;
  if (spouseAge && spouseAge >= minAge && spouseAge < applicantAge) {
    effectiveAge = spouseAge;
  }
  
  // No Match: Under minimum age for state
  if (effectiveAge < minAge) {
    return {
      outcome: 'no-match' as const,
      effectiveAge,
      minAge,
    };
  }
  
  // Get PLF from EquityPower table (cap at 100 for ages over 100)
  const ageForLookup = Math.min(effectiveAge, 100);
  const plf = EQUITYPOWER_PLF_TABLE[ageForLookup] || PLF_CONFIG.EQUITYPOWER_MAX_PLF;
  
  const principalLimit = homeValue * plf;
  const netProceeds = Math.max(0, principalLimit - balance);
  
  // Private: 55-61
  if (effectiveAge < PLF_CONFIG.MIN_AGE_ESTIMATE) {
    return {
      outcome: 'private' as const,
      effectiveAge,
      plf,
      homeValue,
      existingBalance: balance,
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
    existingBalance: balance,
    principalLimit,
    netProceeds,
  };
}

// Calculate HECM estimate with HECM PLF table
export function calculateHECMEstimate(
  homeValue: number,
  applicantAge: number,
  existingBalance: number,
  spouseAge?: number
) {
  const balance = existingBalance || 0;
  
  // HECM requires minimum age of 62
  const minAge = PLF_CONFIG.MIN_AGE_ESTIMATE;
  
  // If spouse exists and qualifies (age 62+), use younger age
  // If spouse exists but doesn't qualify, default to older borrower (applicant)
  let effectiveAge = applicantAge;
  if (spouseAge && spouseAge >= minAge && spouseAge < applicantAge) {
    effectiveAge = spouseAge;
  }
  const ageForLookup = Math.min(effectiveAge, 100);
  const plf = HECM_PLF_TABLE[ageForLookup] || PLF_CONFIG.HECM_MAX_PLF;
  
  const principalLimit = homeValue * plf;
  const netProceeds = Math.max(0, principalLimit - balance);
  
  return {
    plf,
    principalLimit,
    netProceeds,
  };
}

// Calculate EquityPower estimate with EquityPower PLF table
export function calculateEquityPowerEstimate(
  homeValue: number,
  applicantAge: number,
  existingBalance: number,
  spouseAge?: number,
  state?: string
) {
  const balance = existingBalance || 0;
  
  // Get state-specific minimum age for EquityPower
  const minAge = getEquityPowerMinAge(state);
  
  // If spouse exists and qualifies (meets min age), use younger age
  // If spouse exists but doesn't qualify, default to older borrower (applicant)
  let effectiveAge = applicantAge;
  if (spouseAge && spouseAge >= minAge && spouseAge < applicantAge) {
    effectiveAge = spouseAge;
  }
  const ageForLookup = Math.min(effectiveAge, 100);
  const plf = EQUITYPOWER_PLF_TABLE[ageForLookup] || PLF_CONFIG.EQUITYPOWER_MAX_PLF;
  
  const principalLimit = homeValue * plf;
  const netProceeds = Math.max(0, principalLimit - balance);
  
  return {
    plf,
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
