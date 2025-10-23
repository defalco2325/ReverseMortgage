import { type User, type InsertUser, type LeadSubmission, leadSubmissionSchema } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLeadSubmission(lead: Omit<LeadSubmission, 'id'>): Promise<LeadSubmission>;
  getAllLeadSubmissions(): Promise<LeadSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, LeadSubmission>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLeadSubmission(lead: Omit<LeadSubmission, 'id'>): Promise<LeadSubmission> {
    const id = randomUUID();
    const leadWithId: LeadSubmission = { ...lead, id };
    this.leads.set(id, leadWithId);
    console.log('Lead submission stored:', {
      id,
      email: lead.step2.email,
      timestamp: lead.meta.timestamp,
    });
    return leadWithId;
  }

  async getAllLeadSubmissions(): Promise<LeadSubmission[]> {
    return Array.from(this.leads.values()).sort((a, b) => 
      new Date(b.meta.timestamp).getTime() - new Date(a.meta.timestamp).getTime()
    );
  }
}

export const storage = new MemStorage();
