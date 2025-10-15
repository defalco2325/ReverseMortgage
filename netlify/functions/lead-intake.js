// Netlify serverless function for lead intake
exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  // Handle OPTIONS for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const payload = JSON.parse(event.body);
    
    // Honeypot check
    if (payload.step2?._botField) {
      console.log('Bot detected via honeypot field');
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ok: false, error: 'Invalid submission' }),
      };
    }

    // Log the submission
    console.log('Lead intake submission:', {
      timestamp: new Date().toISOString(),
      email: payload.step2?.email,
      outcome: payload.estimate?.outcome,
      netProceeds: payload.estimate?.netProceeds,
    });

    // Forward to webhook if WEBHOOK_URL is set
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!webhookResponse.ok) {
          console.error('Webhook forwarding failed:', webhookResponse.statusText);
          // Don't fail the main request if webhook fails
        } else {
          console.log('Successfully forwarded to webhook');
        }
      } catch (webhookError) {
        console.error('Error forwarding to webhook:', webhookError);
        // Don't fail the main request if webhook fails
      }
    } else {
      console.log('No WEBHOOK_URL configured, storing to logs only');
    }

    // Return success
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ok: true }),
    };

  } catch (error) {
    console.error('Error processing lead intake:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        ok: false, 
        error: 'Internal server error' 
      }),
    };
  }
};
