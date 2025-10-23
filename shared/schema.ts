import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leadSubmissionSchema = z.object({
  step1: z.object({
    homeValue: z.number(),
    applicantAge: z.number(),
    existingBalance: z.number().optional(),
    spouseAge: z.number().optional(),
    state: z.string(),
  }),
  step2: z.object({
    reason: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    phone: z.string(),
    email: z.string(),
    _botField: z.string().optional(),
  }),
  estimate: z.object({
    outcome: z.string(),
    effectiveAge: z.number().optional(),
    plf: z.number().optional(),
    principalLimit: z.number().optional(),
    netProceeds: z.number().optional(),
  }),
  meta: z.object({
    timestamp: z.string(),
    userAgent: z.string(),
  }),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema> & {
  id: string;
};
