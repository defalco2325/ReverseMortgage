# Nationwide Equities - Reverse Mortgage Calculator

A production-ready, fully responsive landing page and 3-step reverse mortgage calculator built for Nationwide Equities. Features include lead intake via Netlify Functions, comprehensive eligibility logic, and professional NWE branding.

## 🚀 Features

- **Full Landing Page**: Hero, About, Testimonials, CTA sections with smooth scroll navigation
- **3-Step Calculator**: Property info → Contact details → Results with dynamic outcomes
- **Eligibility Logic**: 
  - Ages <55: No Match
  - Ages 55-61: Private Lending (PLF 0.20-0.26)
  - Ages 62+: Full HECM Estimate (PLF 0.26-0.60 capped)
- **Netlify Functions**: Serverless lead intake with optional webhook forwarding
- **Mobile-First Design**: Fully responsive with sticky navigation and optimized touch targets
- **SEO Optimized**: Proper meta tags, semantic HTML, accessibility features
- **Security**: CORS protection, honeypot validation, secure data transmission

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Hosting**: Netlify (SPA routing configured)
- **Functions**: Netlify Serverless Functions

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploy on Netlify

### Step 1: Connect Repository

1. Push this repository to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Select your repository

### Step 2: Configure Build Settings

Netlify will auto-detect settings from `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

### Step 3: Set Environment Variables

Go to **Site settings** → **Environment variables** and add:

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `WEBHOOK_URL` | `https://hooks.zapier.com/...` | *Optional* - CRM/Zapier/Sheets webhook endpoint |
| `VITE_PHONE_CTA` | `tel:+1-855-523-4326` | Phone number link for CTAs |
| `VITE_PHONE_DISPLAY` | `855-523-4326` | Formatted phone number for display |
| `VITE_NMLS_ID` | `1408` | NMLS license number |
| `VITE_BRAND_NAME` | `Nationwide Equities` | Company name |

> **Note**: Variables prefixed with `VITE_` are exposed to the frontend. `WEBHOOK_URL` is server-side only.

### Step 4: Enable Functions

Netlify Functions are auto-detected from the `netlify.toml` configuration. No additional setup required.

### Step 5: Deploy

1. Click "Deploy site"
2. Wait for build to complete
3. Test the live site:
   - Navigate through all sections
   - Submit a test calculation
   - Verify SPA routing with hard refresh (`Cmd/Ctrl + Shift + R`)

### Step 6: Custom Domain (Optional)

1. Go to **Domain settings**
2. Add your custom domain
3. Configure DNS as instructed
4. Enable HTTPS (automatic with Netlify)

## 📁 Project Structure

```
├── client/
│   ├── index.html          # HTML template with SEO meta tags
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── NavBar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBadges.tsx
│   │   │   ├── About.tsx
│   │   │   ├── CalculatorSection.tsx
│   │   │   ├── Step1Form.tsx
│   │   │   ├── Step2Form.tsx
│   │   │   ├── Step3Results.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ui/         # Shadcn UI components
│   │   ├── pages/
│   │   │   └── Landing.tsx # Main landing page
│   │   ├── lib/
│   │   │   └── config.ts   # Centralized configuration
│   │   ├── App.tsx
│   │   └── index.css       # Global styles
│   └── ...
├── netlify/
│   └── functions/
│       └── lead-intake.js  # Serverless function for form submission
├── netlify.toml            # Netlify configuration
├── package.json
└── README.md
```

## ⚙️ Configuration

### PLF (Principal Limit Factor) Model

Edit `client/src/lib/config.ts` to modify the calculation logic:

```typescript
export const PLF_CONFIG = {
  MIN_AGE_PRIVATE: 55,
  MIN_AGE_ESTIMATE: 62,
  BASE_RATE_PRIVATE: 0.20,
  INCREMENT_PRIVATE: 0.01,
  BASE_RATE_ESTIMATE: 0.26,
  INCREMENT_ESTIMATE: 0.012,
  MAX_PLF: 0.60,
};
```

### Legal Copy & Disclaimers

Update footer legal text in `client/src/components/Footer.tsx`.

Update calculator disclaimers in `client/src/lib/config.ts`:

```typescript
export const LEGAL_COPY = {
  FOOTER: "100% Secure Data • Terms of Use • Privacy Notice • Equal Housing Lender",
  PRIVACY_DISCLAIMER: "Your information is secure...",
};
```

### Branding & Colors

Colors are configured in `client/src/index.css`:

- **Primary (Green)**: `--primary: 88 50% 53%` (matching green accent from design)
- **Background**: `--background: 222 47% 11%` (dark navy)
- **Card**: `--card: 0 0% 96%` (white card surfaces)
- **Accent**: `--accent: 210 77% 54%` (blue accent)

Hero gradient uses exact hex codes from spec:
- Primary: `#0B3A6E`
- Hover: `#1E5AA7`

## 🔧 Netlify Function Details

### Lead Intake Endpoint

**POST** `/.netlify/functions/lead-intake`

**Request Body**:
```json
{
  "step1": {
    "homeValue": 500000,
    "applicantAge": 68,
    "existingBalance": 150000,
    "spouseAge": 65
  },
  "step2": {
    "reason": "eliminate-mortgage",
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "Phoenix",
    "state": "AZ",
    "zipCode": "85001",
    "phone": "5551234567",
    "email": "john@example.com",
    "_botField": ""
  },
  "estimate": {
    "outcome": "estimate",
    "effectiveAge": 65,
    "plf": 0.362,
    "principalLimit": 181000,
    "netProceeds": 31000
  },
  "meta": {
    "timestamp": "2025-01-15T12:34:56.789Z",
    "userAgent": "Mozilla/5.0..."
  }
}
```

**Response**:
```json
{
  "ok": true
}
```

**Webhook Forwarding**: If `WEBHOOK_URL` environment variable is set, the function automatically forwards the payload to that endpoint. Failures are logged but don't block the user experience.

**Security Features**:
- Honeypot field validation (`_botField`)
- CORS headers configured
- Method validation (POST only)
- Error handling with graceful fallbacks

## 🧪 Testing

### Local Testing

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run with Netlify Dev (includes Functions)
netlify dev

# Access at http://localhost:8888
```

### Testing Calculator Logic

Test all three outcomes:

1. **No Match** (Age <55): Enter age 52
2. **Private Lending** (Age 55-61): Enter age 58
3. **Full Estimate** (Age 62+): Enter age 68

Verify calculations:
- Principal Limit = Home Value × PLF
- Net Proceeds = Principal Limit - Existing Balance

### Testing Form Submission

1. Complete all 3 steps
2. Check browser Network tab for POST to `/.netlify/functions/lead-intake`
3. Verify response `{ "ok": true }`
4. Check Netlify Function logs for submission data

## 📱 Mobile Optimization

- Sticky navigation bar
- Touch-friendly button sizes (min 48px height)
- Single-column layouts on mobile
- Optimized font sizes for readability
- Smooth scroll navigation

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast compliance
- Screen reader friendly

## 🔒 Security Headers (via netlify.toml)

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Permissions-Policy: geolocation=(), camera=(), microphone=()`
- `Strict-Transport-Security: max-age=63072000`

## 📊 Performance

- Lighthouse Score Target: 95+ across all categories
- Vite-optimized bundles
- Tree-shaking for minimal JS
- Asset caching headers (1 year for static assets)
- Lazy loading for images

## 🆘 Troubleshooting

### Functions not working locally

```bash
# Use Netlify Dev instead of vite dev
netlify dev
```

### SPA routing issues after deploy

1. Verify `netlify.toml` is in repository root
2. Check Netlify dashboard for redirect rules
3. Hard refresh browser (`Cmd/Ctrl + Shift + R`)

### Environment variables not updating

1. Redeploy after changing variables
2. Clear build cache in Netlify dashboard
3. Verify variable names have `VITE_` prefix for frontend

## 📄 License

© 2025 Nationwide Equities Corp. All rights reserved.

NMLS #1408 | Equal Housing Lender

---

**Need Help?** Contact development support or refer to [Netlify Documentation](https://docs.netlify.com)
