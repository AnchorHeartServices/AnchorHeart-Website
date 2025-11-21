import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
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

// Client onboarding tables
export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  status: text("status").notNull().default("in_progress"), // in_progress, completed, archived
  submittedAt: timestamp("submitted_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const clientIntakes = pgTable("client_intakes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  
  // Personal Information
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  ssn: text("ssn"),
  
  // Contact Information
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  
  // Demographics
  gender: text("gender"),
  maritalStatus: text("marital_status"),
  livingArrangement: text("living_arrangement"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const emergencyContacts = pgTable("emergency_contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  
  name: text("name").notNull(),
  relationship: text("relationship").notNull(),
  phone: text("phone").notNull(),
  alternatePhone: text("alternate_phone"),
  address: text("address"),
  isPrimary: boolean("is_primary").notNull().default(false),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const medicalInformation = pgTable("medical_information", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  
  // Medical History
  primaryPhysician: text("primary_physician"),
  physicianPhone: text("physician_phone"),
  diagnoses: text("diagnoses").array(),
  medications: text("medications").array(),
  allergies: text("allergies").array(),
  
  // Care Needs
  mobilityLevel: text("mobility_level"),
  assistanceNeeded: text("assistance_needed").array(),
  cognitiveStatus: text("cognitive_status"),
  specialNeeds: text("special_needs"),
  
  // Preferences
  dietaryRestrictions: text("dietary_restrictions"),
  religiousCultural: text("religious_cultural"),
  preferredLanguage: text("preferred_language"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const serviceAgreements = pgTable("service_agreements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  
  // Service Details
  serviceType: text("service_type").notNull(),
  hoursPerWeek: integer("hours_per_week"),
  schedulePreference: text("schedule_preference"),
  startDate: text("start_date"),
  
  // Payment
  paymentMethod: text("payment_method"),
  billingAddress: text("billing_address"),
  
  // Agreement
  agreedToTerms: boolean("agreed_to_terms").notNull().default(false),
  agreedAt: timestamp("agreed_at"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const signatures = pgTable("signatures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  
  signatureType: text("signature_type").notNull(), // client, representative, witness
  signatureData: text("signature_data").notNull(), // base64 encoded image
  signerName: text("signer_name").notNull(),
  signerRelationship: text("signer_relationship"),
  signedAt: timestamp("signed_at").notNull().defaultNow(),
});

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  
  // Stripe Information
  stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
  stripePaymentMethodId: text("stripe_payment_method_id"),
  
  // Payment Details
  amount: integer("amount").notNull(), // Amount in cents
  discountAmount: integer("discount_amount").default(0), // Discount in cents (e.g., 200 for $2 ACH discount)
  finalAmount: integer("final_amount").notNull(), // Final amount after discount in cents
  currency: text("currency").notNull().default("usd"),
  
  // Payment Method & Status
  paymentMethod: text("payment_method").notNull(), // ach, card
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, succeeded, failed, refunded
  
  // Invoice/Description
  invoiceNumber: text("invoice_number"),
  description: text("description"),
  serviceDate: text("service_date"), // Date of service this payment is for
  
  // Metadata
  errorMessage: text("error_message"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relations
export const clientsRelations = relations(clients, ({ one, many }) => ({
  intake: one(clientIntakes, {
    fields: [clients.id],
    references: [clientIntakes.clientId],
  }),
  emergencyContacts: many(emergencyContacts),
  medicalInformation: one(medicalInformation, {
    fields: [clients.id],
    references: [medicalInformation.clientId],
  }),
  serviceAgreement: one(serviceAgreements, {
    fields: [clients.id],
    references: [serviceAgreements.clientId],
  }),
  signatures: many(signatures),
  payments: many(payments),
}));

export const clientIntakesRelations = relations(clientIntakes, ({ one }) => ({
  client: one(clients, {
    fields: [clientIntakes.clientId],
    references: [clients.id],
  }),
}));

export const emergencyContactsRelations = relations(emergencyContacts, ({ one }) => ({
  client: one(clients, {
    fields: [emergencyContacts.clientId],
    references: [clients.id],
  }),
}));

export const medicalInformationRelations = relations(medicalInformation, ({ one }) => ({
  client: one(clients, {
    fields: [medicalInformation.clientId],
    references: [clients.id],
  }),
}));

export const serviceAgreementsRelations = relations(serviceAgreements, ({ one }) => ({
  client: one(clients, {
    fields: [serviceAgreements.clientId],
    references: [clients.id],
  }),
}));

export const signaturesRelations = relations(signatures, ({ one }) => ({
  client: one(clients, {
    fields: [signatures.clientId],
    references: [clients.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  client: one(clients, {
    fields: [payments.clientId],
    references: [clients.id],
  }),
}));

// Insert schemas
export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientIntakeSchema = createInsertSchema(clientIntakes).omit({
  id: true,
  createdAt: true,
});

export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts).omit({
  id: true,
  createdAt: true,
});

export const insertMedicalInformationSchema = createInsertSchema(medicalInformation).omit({
  id: true,
  createdAt: true,
});

export const insertServiceAgreementSchema = createInsertSchema(serviceAgreements).omit({
  id: true,
  createdAt: true,
}).extend({
  agreedAt: z.string().datetime().transform(val => new Date(val)).nullable().optional(),
});

export const insertSignatureSchema = createInsertSchema(signatures).omit({
  id: true,
  signedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type ClientIntake = typeof clientIntakes.$inferSelect;
export type InsertClientIntake = z.infer<typeof insertClientIntakeSchema>;
export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;
export type MedicalInformation = typeof medicalInformation.$inferSelect;
export type InsertMedicalInformation = z.infer<typeof insertMedicalInformationSchema>;
export type ServiceAgreement = typeof serviceAgreements.$inferSelect;
export type InsertServiceAgreement = z.infer<typeof insertServiceAgreementSchema>;
export type Signature = typeof signatures.$inferSelect;
export type InsertSignature = z.infer<typeof insertSignatureSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

// Caregiver mobile app tables
export const caregivers = pgTable("caregivers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  password: text("password").notNull(), // hashed password
  certifications: text("certifications").array(), // CNA, BLS, etc.
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const clientAssignments = pgTable("client_assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caregiverId: varchar("caregiver_id").notNull().references(() => caregivers.id, { onDelete: "cascade" }),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isActive: boolean("is_active").notNull().default(true),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const visitLogs = pgTable("visit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  caregiverId: varchar("caregiver_id").notNull().references(() => caregivers.id),
  clientId: varchar("client_id").notNull().references(() => clients.id),
  timeIn: timestamp("time_in").notNull(),
  timeOut: timestamp("time_out"),
  visitDate: text("visit_date").notNull(), // YYYY-MM-DD format
  visitStatus: text("visit_status").notNull().default("in_progress"), // in_progress, completed, cancelled
  generalNotes: text("general_notes"),
  concernsReported: text("concerns_reported"),
  nextVisitConfirmed: text("next_visit_confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  submittedAt: timestamp("submitted_at"),
});

export const taskCompletions = pgTable("task_completions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  visitLogId: varchar("visit_log_id").notNull().references(() => visitLogs.id, { onDelete: "cascade" }),
  category: text("category").notNull(), // personal_care, daily_living, observation, companionship, end_visit
  taskName: text("task_name").notNull(), // e.g., "bathing", "grooming", "meal_prep"
  completed: boolean("completed").notNull().default(true),
  notes: text("notes"),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const vitalSigns = pgTable("vital_signs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  visitLogId: varchar("visit_log_id").notNull().references(() => visitLogs.id, { onDelete: "cascade" }),
  pulse: integer("pulse"), // beats per minute
  respirations: integer("respirations"), // breaths per minute
  temperature: text("temperature"), // e.g., "98.6"
  bloodPressureSystolic: integer("blood_pressure_systolic"),
  bloodPressureDiastolic: integer("blood_pressure_diastolic"),
  painLevel: integer("pain_level"), // 0-10 scale
  notes: text("notes"),
  recordedAt: timestamp("recorded_at").notNull().defaultNow(),
});

// Caregiver relations
export const caregiversRelations = relations(caregivers, ({ many }) => ({
  assignments: many(clientAssignments),
  visits: many(visitLogs),
}));

export const clientAssignmentsRelations = relations(clientAssignments, ({ one }) => ({
  caregiver: one(caregivers, {
    fields: [clientAssignments.caregiverId],
    references: [caregivers.id],
  }),
  client: one(clients, {
    fields: [clientAssignments.clientId],
    references: [clients.id],
  }),
}));

export const visitLogsRelations = relations(visitLogs, ({ one, many }) => ({
  caregiver: one(caregivers, {
    fields: [visitLogs.caregiverId],
    references: [caregivers.id],
  }),
  client: one(clients, {
    fields: [visitLogs.clientId],
    references: [clients.id],
  }),
  tasks: many(taskCompletions),
  vitals: many(vitalSigns),
}));

export const taskCompletionsRelations = relations(taskCompletions, ({ one }) => ({
  visit: one(visitLogs, {
    fields: [taskCompletions.visitLogId],
    references: [visitLogs.id],
  }),
}));

export const vitalSignsRelations = relations(vitalSigns, ({ one }) => ({
  visit: one(visitLogs, {
    fields: [vitalSigns.visitLogId],
    references: [visitLogs.id],
  }),
}));

// Caregiver insert schemas
export const insertCaregiverSchema = createInsertSchema(caregivers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClientAssignmentSchema = createInsertSchema(clientAssignments).omit({
  id: true,
  createdAt: true,
});

export const insertVisitLogSchema = createInsertSchema(visitLogs).omit({
  id: true,
  createdAt: true,
  submittedAt: true,
}).extend({
  timeIn: z.string().datetime().transform(val => new Date(val)),
  timeOut: z.string().datetime().transform(val => new Date(val)).nullable().optional(),
});

export const insertTaskCompletionSchema = createInsertSchema(taskCompletions).omit({
  id: true,
  completedAt: true,
});

export const insertVitalSignsSchema = createInsertSchema(vitalSigns).omit({
  id: true,
  recordedAt: true,
});

// Caregiver types
export type Caregiver = typeof caregivers.$inferSelect;
export type InsertCaregiver = z.infer<typeof insertCaregiverSchema>;
export type ClientAssignment = typeof clientAssignments.$inferSelect;
export type InsertClientAssignment = z.infer<typeof insertClientAssignmentSchema>;
export type VisitLog = typeof visitLogs.$inferSelect;
export type InsertVisitLog = z.infer<typeof insertVisitLogSchema>;
export type TaskCompletion = typeof taskCompletions.$inferSelect;
export type InsertTaskCompletion = z.infer<typeof insertTaskCompletionSchema>;
export type VitalSigns = typeof vitalSigns.$inferSelect;
export type InsertVitalSigns = z.infer<typeof insertVitalSignsSchema>;
