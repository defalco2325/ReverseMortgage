# Netlify Forms Testing Guide

## Important: Forms Only Work on Deployed Sites

**Netlify Forms do NOT work in development mode (localhost).** You must test on your actual deployed Netlify site.

## How to Test Form Submissions

### Step 1: Deploy to Netlify

1. Push your latest code to your Git repository
2. Netlify will automatically deploy (or manually trigger a deploy)
3. Wait for the deployment to complete

### Step 2: Test on the Live Site

1. **Go to your deployed Netlify URL** (e.g., `https://your-site-name.netlify.app`)
2. Fill out the calculator:
   - **Step 1**: Enter home value, age, mortgage balance
   - **Step 2**: Fill in contact information
   - Click "Get My Results"
3. **Check your browser's Network tab** (F12 → Network):
   - Look for a POST request to `/`
   - Status should be `200` or `303` (redirect)
   - If you see `404`, the form wasn't detected

### Step 3: Check Netlify Dashboard

1. Log into Netlify
2. Go to your site → **Forms** tab
3. Wait 1-2 minutes after submission
4. Refresh the page
5. Check both **"Verified"** and **"Spam"** tabs

## What Each Field Contains

When you submit the form, the following data is captured:

### Step 1 Data
- `homeValue`: Property value (e.g., 500000)
- `applicantAge`: Primary applicant's age (e.g., 65)
- `existingBalance`: Current mortgage balance (e.g., 100000)
- `spouseAge`: Co-borrower's age (optional)

### Step 2 Data
- `reason`: Reason for inquiry
- `firstName`: First name
- `lastName`: Last name
- `address`: Property address
- `city`: City
- `state`: State (2-letter code)
- `zipCode`: ZIP code (5 digits)
- `phone`: Phone number (10 digits)
- `email`: Email address

### Calculated Results
- `principalLimit`: Maximum loan amount available
- `netProceeds`: Available proceeds after paying off existing mortgage
- `outcome`: Eligibility status (e.g., "HECM Estimate", "Private Lending", etc.)

### Security
- `_botField`: Honeypot field (empty for legitimate submissions)
- `form-name`: "contact"

## Troubleshooting

### Form not detected at build time

**Check deploy logs for:**
```
Detected form fields: reason firstName lastName address city state zipCode phone email homeValue applicantAge spouseAge existingBalance principalLimit netProceeds outcome _botField
```

If you don't see this, the hidden form in `client/index.html` wasn't detected.

### Submissions showing as blank

This means field names don't match. Verify:
- Field names in `client/index.html` (hidden form)
- Field names in `Calculator.tsx` (submission code)
- Both must match **exactly** (case-sensitive)

### Getting 404 errors

1. Verify you're testing on the deployed site, not localhost
2. Re-deploy after making changes to the form
3. Check `netlify.toml` has `force = false` in the redirect rule

### Submissions going to Spam

Check the "Spam" tab in Netlify Forms dashboard. Common causes:
- Honeypot field filled in (bot detected)
- Rapid multiple submissions
- Suspicious patterns

## Setting Up Email Notifications

1. Go to Netlify Dashboard → Site Settings → Forms → Form notifications
2. Click "Add notification"
3. Choose "Email notification"
4. Add email: **IT@nwecorp.com** (or your production email)
5. Select the "contact" form
6. Save

Now you'll receive an email for each submission!

## Console Debugging

Open your browser console (F12) when submitting the form. You should see:

```
Step 2 data: {reason: "...", firstName: "...", ...}
Calculation result: {principalLimit: ..., netProceeds: ..., outcome: "..."}
Submitting to Netlify Forms with data: {form-name: "contact", homeValue: "...", ...}
Form submitted to Netlify Forms successfully
```

If you see an error message instead, that indicates a problem with the submission.

## Common Mistakes

❌ **Testing on localhost** - Forms only work on deployed Netlify sites
❌ **Not redeploying** - Changes to forms require a new deployment
❌ **Mismatched field names** - Hidden form and submission must match exactly
❌ **Using `force = true`** - This breaks form submissions in SPAs

✅ **Test on deployed site** - Use your actual Netlify URL
✅ **Redeploy after changes** - Trigger a new build
✅ **Verify field names match** - Check both files
✅ **Use `force = false`** - Allows Netlify to intercept form POSTs
