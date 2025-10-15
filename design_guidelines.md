# Design Guidelines: NWE Reverse Mortgage Calculator

## Design Approach: Financial Product System (Stripe/Linear-Inspired)

**Justification**: This is a utility-focused financial calculator requiring trust, clarity, and efficiency. Drawing from Stripe's financial UI patterns and Linear's modern forms, we prioritize data legibility, progressive disclosure, and professional credibility over marketing flair.

**Core Principle**: Build confidence through clarity. Every element should reinforce trust and guide users seamlessly through the 3-step process.

---

## Color System

### Brand Colors (Provided)
- **Primary**: `207 80% 23%` (#0B3A6E) - Main actions, headers, active states
- **Primary Hover**: `210 70% 38%` (#1E5AA7) - Interactive hover states
- **Accent**: `210 77% 54%` (#2E8AE6) - Progress indicators, focus rings, highlights

### Surface & Background
- **Canvas**: `222 47% 11%` (Slate-900) - Main background
- **Card Surface**: `217 33% 17%` (Slate-800) - Elevated panels, form containers
- **Card Border**: `215 25% 27%` (Slate-700) - Subtle separation, input borders

### Text Hierarchy
- **Primary Text**: `210 40% 98%` (Slate-100) - Headers, labels, important values
- **Secondary Text**: `214 32% 91%` (Slate-200) - Body copy, helper text
- **Muted Text**: `215 20% 65%` (Slate-400) - Placeholder text, footnotes

### Semantic Colors
- **Success**: `142 76% 36%` - Successful estimate outcome
- **Warning**: `38 92% 50%` - Private lending path (55-61 age range)
- **Error**: `0 84% 60%` - No Match outcome, validation errors
- **Info**: Accent color reused for informational states

---

## Typography

**Font Stack**: `Inter, system-ui, -apple-system, sans-serif` (via Google Fonts CDN - weights: 400, 500, 600, 700)

### Type Scale
- **Display (Step Headers)**: `text-3xl md:text-4xl font-bold tracking-tight` - "Step 1: Property & Age Information"
- **Section Headers**: `text-xl md:text-2xl font-semibold` - Form section groupings
- **Body/Labels**: `text-base font-medium` - Input labels, descriptions
- **Helper Text**: `text-sm text-slate-400` - Field hints, validation messages
- **Legal/Footer**: `text-xs text-slate-400` - Footer disclaimers, NMLS info

### Emphasis
- **Currency/Numbers**: `font-semibold tracking-tight` with tabular-nums for alignment
- **CTAs**: `font-semibold text-base` - Consistent button text weight

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm (p-2, gap-4, mb-6, py-8, space-y-12, mt-16)

### Container Strategy
- **Max Width**: `max-w-3xl mx-auto` - Optimal form reading width (672px)
- **Section Padding**: `px-4 md:px-6 py-8 md:py-12` - Responsive breathing room
- **Card Internal**: `p-6 md:p-8` - Form card padding

### Grid Patterns
- **Single Column Forms**: Default stack for mobile-first (Step 1 & 2)
- **Two-Column Desktop**: `grid grid-cols-1 md:grid-cols-2 gap-4` for paired inputs (e.g., First/Last Name)
- **Results Layout**: `grid gap-6` with stacked stat cards, no forced multi-column

---

## Component Library

### Progress Indicator
- **Style**: Horizontal stepped bar with 3 segments
- **Active State**: Accent color fill, bold step number
- **Completed**: Primary color fill with checkmark icon
- **Upcoming**: Slate-700 outline, muted text
- **Position**: Sticky top or fixed to card top with backdrop-blur

### Input Fields
- **Container**: `rounded-xl` with `border-2 border-slate-700` default
- **Focus State**: `border-accent ring-2 ring-accent/20` with smooth transition
- **Label**: Floating or top-aligned, `text-sm font-medium text-slate-200`, required asterisk in accent color
- **Currency Inputs**: Right-aligned text, `$` prefix visible, monospace tabular numbers
- **Error State**: `border-error` with inline error message below in `text-sm text-error`

### Buttons
- **Primary CTA**: `bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-3.5 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl`
- **Disabled**: `opacity-50 cursor-not-allowed` with no hover effects
- **Secondary/Back**: `bg-slate-700 hover:bg-slate-600 text-slate-100` same sizing
- **Full Width Mobile**: `w-full md:w-auto` for responsive stacking

### Cards
- **Surface**: `bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl`
- **Elevation**: Subtle `shadow-2xl` for depth, no excessive glow
- **Nested Cards** (Results): `bg-slate-700/50 rounded-xl p-6` for stat groupings

### Outcome Panels (Step 3)
- **Success Panel**: Border-l-4 with `border-success`, icon in success color, large numbers emphasized
- **Private Panel**: Border-l-4 with `border-warning`, clear messaging about alternative path
- **No Match Panel**: Border-l-4 with `border-error`, supportive tone with phone CTA prominently displayed

### Footer
- **Layout**: Centered text block, `max-w-4xl mx-auto`
- **Content**: Separator dots between items, icons for security badge and equal housing
- **Styling**: `text-xs text-slate-400 leading-relaxed` with spaced-out link separation

---

## Key Interactions

### Form Validation
- **Real-time**: Validate on blur, show success checkmark icon for valid fields
- **Submit Prevention**: Keep CTAs disabled with clear messaging until all required fields valid
- **Focus Management**: Auto-focus first field on step load, smooth scroll to errors

### Transitions
- **Step Changes**: Fade transition (300ms) with slight vertical slide
- **Loading States**: Spinner on submit button, overlay with "Calculating..." text
- **Toast Notifications**: Top-right slide-in for webhook failures, auto-dismiss after 4s

### Accessibility
- **Focus Rings**: `ring-2 ring-accent ring-offset-2 ring-offset-slate-900` visible on all interactive elements
- **ARIA**: Proper `aria-label`, `aria-required`, `aria-invalid`, `aria-describedby` for errors
- **Keyboard**: Tab order follows visual flow, Enter submits forms, Escape dismisses overlays

---

## Images

**No Hero Image**: This is a calculator tool, not a marketing page. Users land directly on Step 1 form interface.

**Optional Trust Indicators**: Small 32x32px icons for security badges and Equal Housing Lender logo in footer - use SVG placeholders via Heroicons (ShieldCheckIcon, HomeIcon).

---

## Mobile Optimizations

- **Single Column**: All inputs stack vertically on mobile
- **Touch Targets**: Minimum 48px height for buttons and inputs
- **Fixed Navigation**: Progress bar sticks to top on scroll with backdrop blur
- **Bottom CTA**: Primary button fixed to bottom on mobile for thumb reach
- **Spacing**: Reduce padding to `p-4` and `gap-4` on small screens

---

## Animation Budget

**Minimal & Purposeful**:
- Input focus transitions (200ms)
- Button hover scale (0.98 on active press)
- Step transition fade (300ms)
- Success confetti burst ONLY on successful estimate (one-time celebration)

Avoid: Parallax, scroll-triggered animations, excessive micro-interactions