# Deployment Guide - Nationwide Equities Reverse Mortgage Calculator

## Netlify Deployment Steps

### 1. Connect Repository to Netlify
- Log in to your Netlify account
- Click "Add new site" > "Import an existing project"
- Connect your Git provider (GitHub, GitLab, etc.)
- Select this repository

### 2. Build Configuration
The build settings are pre-configured in `netlify.toml`:
- **Build command:** `npm run build`
- **Publish directory:** `dist/public`
- **Functions directory:** `netlify/functions`

### 3. Configure Environment Variables

Go to **Site settings > Environment variables** and add:

#### Required Variables:
```
VITE_BRAND_NAME = Nationwide Equities
VITE_PHONE_CTA = tel:+1-866-312-4370
VITE_PHONE_DISPLAY = 866-312-4370
VITE_NMLS_ID = 1408
```

### 4. Set Up Form Submission Email Notifications

**Option A: Netlify Notifications (Recommended)**
1. Go to **Site settings > Notifications**
2. Click **Add notification** > **Outgoing webhook**
3. Choose **Form submission** as the event
4. Configure webhook to forward to Salesmanager@nwecorp.com via:
   - Zapier webhook → Send email action
   - Make (Integromat) → Email module
   - Custom email service

**Option B: Direct Webhook Integration**
1. Set up a webhook endpoint that sends emails (e.g., via SendGrid, Mailgun, or AWS SES)
2. Add environment variable:
   ```
   WEBHOOK_URL = https://your-webhook-endpoint.com/send-email
   ```

**Option C: Zapier Integration (Easiest)**
1. Create a free Zapier account
2. Create a new Zap:
   - **Trigger:** Webhooks by Zapier - Catch Hook
   - **Action:** Gmail/Outlook - Send Email
     - **To:** Salesmanager@nwecorp.com
     - **Subject:** New Reverse Mortgage Lead
     - **Body:** Map the form fields from the webhook payload
3. Copy the Zapier webhook URL
4. Add to Netlify environment variables:
   ```
   WEBHOOK_URL = https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID
   ```

### 5. Form Submission Data Structure

When a user submits the calculator, the following data is sent to the webhook:

```json
{
  "step1": {
    "homeValue": 500000,
    "applicantAge": 70,
    "spouseAge": 68,
    "existingBalance": 100000
  },
  "step2": {
    "reason": "Eliminate Mortgage Payment",
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "Park Ridge",
    "state": "NJ",
    "zipCode": "07656",
    "phone": "2015551234",
    "email": "john.doe@example.com"
  },
  "estimate": {
    "outcome": "HECM",
    "plfPercentage": 0.42,
    "principalLimit": 210000,
    "netProceeds": 110000,
    "ageUsed": 68,
    "message": "Congratulations! Based on your information..."
  },
  "meta": {
    "timestamp": "2024-10-16T20:30:45.123Z",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### 6. Deploy
- Click **Deploy site**
- Netlify will build and deploy your application
- Your site will be live at `https://your-site-name.netlify.app`

### 7. Custom Domain (Optional)
1. Go to **Site settings > Domain management**
2. Click **Add custom domain**
3. Follow the instructions to configure DNS

## Testing Email Notifications

After deployment:
1. Visit your live site
2. Complete the calculator with test data
3. Verify email arrives at Salesmanager@nwecorp.com
4. Check the webhook logs in Netlify Functions dashboard

## Troubleshooting

### Email notifications not arriving
- Check Netlify Functions logs: **Functions > lead-intake > View logs**
- Verify WEBHOOK_URL is set correctly in environment variables
- Test webhook endpoint independently
- Check spam/junk folder

### Build errors
- Ensure all environment variables are set
- Check build logs in Netlify dashboard
- Verify Node.js version compatibility

## Security Notes

- Email address (Salesmanager@nwecorp.com) is **not displayed** on the website
- All form submissions include honeypot spam protection
- HTTPS is enforced automatically by Netlify
- Security headers are configured in `netlify.toml`

## Support

For additional help:
- Netlify Documentation: https://docs.netlify.com
- Contact: 866-312-4370
