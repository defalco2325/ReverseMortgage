import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { leadSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = leadSubmissionSchema.parse(req.body);
      
      // Honeypot check
      if (validatedData.step2._botField) {
        console.warn('Bot detected via honeypot field');
        return res.status(400).json({ ok: false, error: 'Invalid submission' });
      }

      // Store the lead submission
      const lead = await storage.createLeadSubmission(validatedData);
      
      console.log('Lead submission received and stored:', {
        id: lead.id,
        email: lead.step2.email,
        outcome: lead.estimate.outcome,
      });

      res.json({ ok: true, id: lead.id });
    } catch (error) {
      console.error('Error processing lead submission:', error);
      res.status(500).json({ ok: false, error: 'Internal server error' });
    }
  });

  // Get all lead submissions (for admin/viewing)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeadSubmissions();
      res.json(leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
