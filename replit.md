# Nationwide Equities - Reverse Mortgage Calculator

## Overview

This is a production-ready, mobile-first reverse mortgage calculator and landing page built for Nationwide Equities. The application features a comprehensive 3-step calculator that determines eligibility and estimates potential proceeds based on age, home value, and existing mortgage balance. The system implements industry-specific logic for HECM (Home Equity Conversion Mortgage) calculations and private lending alternatives.

The platform is designed as a lead generation tool with serverless lead intake functionality, featuring a full marketing landing page with hero section, about information, testimonials, and call-to-action sections, all built with a focus on trust, clarity, and conversion.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with Vite as the build tool, providing fast development and optimized production builds.

**UI Component System**: Utilizes Radix UI primitives with custom styled components following a consistent design system. The component library includes form controls, dialogs, cards, tooltips, and navigation elements that are fully accessible and themeable.

**Styling Approach**: Tailwind CSS with a custom design system based on financial product UI patterns (Stripe/Linear-inspired). The color system uses HSL values with CSS custom properties for dynamic theming:
- Primary brand colors (#0B3A6E, #1E5AA7, #2E8AE6)
- Dark mode optimized with slate-based surface colors
- Semantic colors for success/warning/error states

**Form Management**: React Hook Form with Zod schema validation provides type-safe form handling across the 3-step calculator flow. Each step maintains its own schema and validation rules.

**State Management**: Component-local state for calculator flow management. The calculator progresses through three steps:
1. Property & Age Information (home value, ages, existing balance)
2. Contact Details (personal information, reason for inquiry)
3. Results Display (eligibility outcome with estimates)

**Routing**: Wouter for lightweight client-side routing with SPA configuration for Netlify deployment.

### Calculation Logic Architecture

**Eligibility Tiers**:
- Under 55: No Match (ineligible)
- Ages 55-61: Private Lending (PLF 35.99%-37.54%)
- Ages 62+: HECM Estimate (PLF 37.83%-57.33% capped at age 88+)

**PLF (Principal Limit Factor) Calculation**: Uses an exact age-based lookup table with precise PLF values for each age from 55-100. The system accounts for spouse age (using the younger age when applicable) and retrieves the corresponding PLF from the table to determine principal limits and net proceeds. The PLF table is based on industry-standard HECM calculation rates, starting at 35.99% for age 55 and capping at 57.33% for ages 88 and above.

### Backend Architecture

**Server Framework**: Express.js providing API routes and static file serving in production.

**Development Mode**: Vite middleware integration for hot module replacement during development. The server conditionally serves either Vite's dev middleware or static production builds.

**Storage Layer**: In-memory storage implementation with a defined interface (`IStorage`) that can be swapped for persistent storage. Currently implements basic user CRUD operations but is architected for extension.

**Lead Processing**: Serverless function architecture designed for Netlify Functions deployment (`netlify/functions/lead-intake.js`):
- POST endpoint for form submission
- Honeypot field validation for bot detection
- Email notifications configured to send to: IT@nwecorp.com (for testing - change to production email later, not displayed on website)
- Optional webhook forwarding to external CRM/automation tools (Zapier, Make, etc.)
- CORS configuration for secure cross-origin requests
- Detailed deployment guide available in DEPLOYMENT.md

### Design System

**Typography**: Inter font family (weights 400-700) with a defined type scale for hierarchical content display. Currency and numeric values use tabular figures for proper alignment.

**Component Patterns**:
- Progress indicators for multi-step flows
- Card-based layouts for elevated content
- Mobile-first responsive design with sticky navigation
- Touch-optimized targets (minimum 44px) for mobile usability

**Accessibility**: Semantic HTML structure, ARIA labels, keyboard navigation support, and screen reader compatibility throughout.

### Build & Deployment Architecture

**Build Process**:
- Client: Vite bundles React application to `dist/public`
- Server: esbuild bundles Express server to `dist/index.js`
- Assets are fingerprinted and optimized for caching

**Netlify Configuration** (`netlify.toml`):
- SPA redirect rules (all routes to index.html)
- Security headers (X-Frame-Options, CSP, etc.)
- Cache headers for static assets
- Functions directory configuration

**Environment Variables**:
- `VITE_BRAND_NAME`: Customizable brand name (default: "Nationwide Equities")
- `VITE_PHONE_CTA`: Contact phone number link (default: "tel:+1-866-312-4370")
- `VITE_PHONE_DISPLAY`: Display phone number (default: "866-312-4370")
- `VITE_NMLS_ID`: NMLS licensing number (default: "1408")
- `WEBHOOK_URL`: Optional CRM integration endpoint (Zapier/Make webhook to email IT@nwecorp.com)
- `DATABASE_URL`: PostgreSQL connection (configured but not actively used)

**Lead Notification Setup**:
- Form submissions are configured to be sent to IT@nwecorp.com (for testing purposes - change to production email later)
- Email address is NOT displayed anywhere on the website (secure backend configuration only)
- Implementation via Netlify webhook → Zapier/Make → Email service
- See DEPLOYMENT.md for detailed setup instructions

## External Dependencies

### Core Framework & Build Tools
- **React 18**: UI framework with concurrent rendering features
- **Vite**: Modern build tool with ESM-based dev server
- **TypeScript**: Type safety across client and server code
- **Tailwind CSS**: Utility-first CSS framework with custom configuration

### UI Component Libraries
- **Radix UI**: Headless accessible component primitives (accordions, dialogs, dropdowns, forms, etc.)
- **Lucide React**: Icon library for consistent iconography
- **Recharts**: Data visualization library for charts in results display
- **cmdk**: Command menu component
- **Embla Carousel**: Touch-friendly carousel implementation

### Form & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between RHF and Zod

### Server & API
- **Express**: Web server framework
- **Drizzle ORM**: Type-safe SQL ORM (configured for PostgreSQL via Neon)
- **@neondatabase/serverless**: Serverless Postgres driver

### Deployment Platform
- **Netlify**: Hosting platform with serverless functions support
- **Netlify Functions**: Serverless function execution for lead intake

### Database (Configured but Optional)
- **PostgreSQL** (via Neon): Configured through Drizzle but application currently uses in-memory storage. Database schema exists for user management but can be extended for lead storage.

### Development Tools
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production server
- **@replit/vite-plugin-***: Replit-specific development plugins (cartographer, error overlay, dev banner)

### Query & State Management
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library

### Styling Utilities
- **class-variance-authority**: Type-safe component variants
- **clsx** & **tailwind-merge**: Conditional className utilities
- **tailwindcss-animate**: Animation utilities for Tailwind

### External Services Integration Points
- **Webhook Support**: Generic webhook endpoint for CRM integration (Zapier, Make, Google Sheets, etc.)
- **Phone System**: Click-to-call integration via tel: protocol
- **Email**: mailto: links for contact options