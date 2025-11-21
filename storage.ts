import { 
  type User, 
  type InsertUser,
  type Client,
  type InsertClient,
  type ClientIntake,
  type InsertClientIntake,
  type EmergencyContact,
  type InsertEmergencyContact,
  type MedicalInformation,
  type InsertMedicalInformation,
  type ServiceAgreement,
  type InsertServiceAgreement,
  type Signature,
  type InsertSignature,
  type Payment,
  type InsertPayment,
  type Caregiver,
  type InsertCaregiver,
  type ClientAssignment,
  type InsertClientAssignment,
  type VisitLog,
  type InsertVisitLog,
  type TaskCompletion,
  type InsertTaskCompletion,
  type VitalSigns,
  type InsertVitalSigns,
  users,
  clients,
  clientIntakes,
  emergencyContacts,
  medicalInformation,
  serviceAgreements,
  signatures,
  payments,
  caregivers,
  clientAssignments,
  visitLogs,
  taskCompletions,
  vitalSigns
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Client onboarding methods
  createClient(client: InsertClient): Promise<Client>;
  getClient(id: string): Promise<Client | undefined>;
  updateClientStatus(id: string, status: string, submittedAt?: Date): Promise<void>;
  
  createClientIntake(intake: InsertClientIntake): Promise<ClientIntake>;
  updateClientIntake(id: string, intake: Partial<InsertClientIntake>): Promise<void>;
  getClientIntake(clientId: string): Promise<ClientIntake | undefined>;
  
  createEmergencyContact(contact: InsertEmergencyContact): Promise<EmergencyContact>;
  getEmergencyContacts(clientId: string): Promise<EmergencyContact[]>;
  deleteEmergencyContact(id: string): Promise<void>;
  
  createMedicalInformation(medInfo: InsertMedicalInformation): Promise<MedicalInformation>;
  updateMedicalInformation(id: string, medInfo: Partial<InsertMedicalInformation>): Promise<void>;
  getMedicalInformation(clientId: string): Promise<MedicalInformation | undefined>;
  
  createServiceAgreement(agreement: InsertServiceAgreement): Promise<ServiceAgreement>;
  updateServiceAgreement(id: string, agreement: Partial<InsertServiceAgreement>): Promise<void>;
  getServiceAgreement(clientId: string): Promise<ServiceAgreement | undefined>;
  
  createSignature(signature: InsertSignature): Promise<Signature>;
  getSignatures(clientId: string): Promise<Signature[]>;
  
  createPayment(payment: InsertPayment): Promise<Payment>;
  getClientPayments(clientId: string): Promise<Payment[]>;
  getPaymentByStripeId(stripePaymentIntentId: string): Promise<Payment | undefined>;
  updatePaymentStatus(id: string, status: string, paidAt: Date | null, errorMessage?: string): Promise<void>;
  
  getCompleteClientPacket(clientId: string): Promise<{
    client: Client;
    intake: ClientIntake | null;
    emergencyContacts: EmergencyContact[];
    medicalInformation: MedicalInformation | null;
    serviceAgreement: ServiceAgreement | null;
    signatures: Signature[];
  } | undefined>;
  
  // Caregiver methods
  getCaregiverByEmail(email: string): Promise<Caregiver | undefined>;
  getCaregiverById(id: string): Promise<Caregiver | undefined>;
  createCaregiver(caregiver: InsertCaregiver): Promise<Caregiver>;
  
  getAssignedClients(caregiverId: string): Promise<Array<ClientAssignment & { clientName: string }>>;
  createAssignment(assignment: InsertClientAssignment): Promise<ClientAssignment>;
  
  createVisitLog(visitLog: InsertVisitLog): Promise<VisitLog>;
  getVisitLog(id: string): Promise<VisitLog | undefined>;
  updateVisitLog(id: string, data: Partial<InsertVisitLog>): Promise<void>;
  endVisit(id: string, timeOut: Date, generalNotes?: string, concernsReported?: string, nextVisitConfirmed?: string): Promise<void>;
  
  createTaskCompletion(task: InsertTaskCompletion): Promise<TaskCompletion>;
  getVisitTasks(visitLogId: string): Promise<TaskCompletion[]>;
  
  createVitalSigns(vitals: InsertVitalSigns): Promise<VitalSigns>;
  getVisitVitals(visitLogId: string): Promise<VitalSigns | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Client methods
  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db
      .insert(clients)
      .values(insertClient)
      .returning();
    return client;
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async updateClientStatus(id: string, status: string, submittedAt?: Date): Promise<void> {
    await db
      .update(clients)
      .set({ 
        status, 
        submittedAt: submittedAt || null,
        updatedAt: new Date()
      })
      .where(eq(clients.id, id));
  }

  // Client intake methods
  async createClientIntake(insertIntake: InsertClientIntake): Promise<ClientIntake> {
    const [intake] = await db
      .insert(clientIntakes)
      .values(insertIntake)
      .returning();
    return intake;
  }

  async updateClientIntake(id: string, updateData: Partial<InsertClientIntake>): Promise<void> {
    await db
      .update(clientIntakes)
      .set(updateData)
      .where(eq(clientIntakes.id, id));
  }

  async getClientIntake(clientId: string): Promise<ClientIntake | undefined> {
    const [intake] = await db
      .select()
      .from(clientIntakes)
      .where(eq(clientIntakes.clientId, clientId));
    return intake || undefined;
  }

  // Emergency contact methods
  async createEmergencyContact(insertContact: InsertEmergencyContact): Promise<EmergencyContact> {
    const [contact] = await db
      .insert(emergencyContacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getEmergencyContacts(clientId: string): Promise<EmergencyContact[]> {
    return await db
      .select()
      .from(emergencyContacts)
      .where(eq(emergencyContacts.clientId, clientId));
  }

  async deleteEmergencyContact(id: string): Promise<void> {
    await db
      .delete(emergencyContacts)
      .where(eq(emergencyContacts.id, id));
  }

  // Medical information methods
  async createMedicalInformation(insertMedInfo: InsertMedicalInformation): Promise<MedicalInformation> {
    const [medInfo] = await db
      .insert(medicalInformation)
      .values(insertMedInfo)
      .returning();
    return medInfo;
  }

  async updateMedicalInformation(id: string, updateData: Partial<InsertMedicalInformation>): Promise<void> {
    await db
      .update(medicalInformation)
      .set(updateData)
      .where(eq(medicalInformation.id, id));
  }

  async getMedicalInformation(clientId: string): Promise<MedicalInformation | undefined> {
    const [medInfo] = await db
      .select()
      .from(medicalInformation)
      .where(eq(medicalInformation.clientId, clientId));
    return medInfo || undefined;
  }

  // Service agreement methods
  async createServiceAgreement(insertAgreement: InsertServiceAgreement): Promise<ServiceAgreement> {
    const [agreement] = await db
      .insert(serviceAgreements)
      .values(insertAgreement)
      .returning();
    return agreement;
  }

  async updateServiceAgreement(id: string, updateData: Partial<InsertServiceAgreement>): Promise<void> {
    await db
      .update(serviceAgreements)
      .set(updateData)
      .where(eq(serviceAgreements.id, id));
  }

  async getServiceAgreement(clientId: string): Promise<ServiceAgreement | undefined> {
    const [agreement] = await db
      .select()
      .from(serviceAgreements)
      .where(eq(serviceAgreements.clientId, clientId));
    return agreement || undefined;
  }

  // Signature methods
  async createSignature(insertSignature: InsertSignature): Promise<Signature> {
    const [signature] = await db
      .insert(signatures)
      .values(insertSignature)
      .returning();
    return signature;
  }

  async getSignatures(clientId: string): Promise<Signature[]> {
    return await db
      .select()
      .from(signatures)
      .where(eq(signatures.clientId, clientId));
  }

  // Payment methods
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const [payment] = await db
      .insert(payments)
      .values(insertPayment)
      .returning();
    return payment;
  }

  async getClientPayments(clientId: string): Promise<Payment[]> {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.clientId, clientId));
  }

  async getPaymentByStripeId(stripePaymentIntentId: string): Promise<Payment | undefined> {
    const [payment] = await db
      .select()
      .from(payments)
      .where(eq(payments.stripePaymentIntentId, stripePaymentIntentId));
    return payment || undefined;
  }

  async updatePaymentStatus(id: string, status: string, paidAt: Date | null, errorMessage?: string): Promise<void> {
    await db
      .update(payments)
      .set({ 
        paymentStatus: status,
        paidAt,
        errorMessage,
        updatedAt: new Date()
      })
      .where(eq(payments.id, id));
  }

  // Complete packet retrieval
  async getCompleteClientPacket(clientId: string) {
    const client = await this.getClient(clientId);
    if (!client) return undefined;

    const [intake, emergencyContactsList, medInfo, agreement, signaturesList] = await Promise.all([
      this.getClientIntake(clientId),
      this.getEmergencyContacts(clientId),
      this.getMedicalInformation(clientId),
      this.getServiceAgreement(clientId),
      this.getSignatures(clientId)
    ]);

    return {
      client,
      intake: intake || null,
      emergencyContacts: emergencyContactsList,
      medicalInformation: medInfo || null,
      serviceAgreement: agreement || null,
      signatures: signaturesList
    };
  }

  // Caregiver methods
  async getCaregiverByEmail(email: string): Promise<Caregiver | undefined> {
    const [caregiver] = await db.select().from(caregivers).where(eq(caregivers.email, email));
    return caregiver || undefined;
  }

  async getCaregiverById(id: string): Promise<Caregiver | undefined> {
    const [caregiver] = await db.select().from(caregivers).where(eq(caregivers.id, id));
    return caregiver || undefined;
  }

  async createCaregiver(insertCaregiver: InsertCaregiver): Promise<Caregiver> {
    const [caregiver] = await db
      .insert(caregivers)
      .values(insertCaregiver)
      .returning();
    return caregiver;
  }

  async getAssignedClients(caregiverId: string): Promise<Array<ClientAssignment & { clientName: string }>> {
    const assignments = await db
      .select({
        id: clientAssignments.id,
        caregiverId: clientAssignments.caregiverId,
        clientId: clientAssignments.clientId,
        startDate: clientAssignments.startDate,
        endDate: clientAssignments.endDate,
        isActive: clientAssignments.isActive,
        notes: clientAssignments.notes,
        createdAt: clientAssignments.createdAt,
        firstName: clientIntakes.firstName,
        lastName: clientIntakes.lastName,
      })
      .from(clientAssignments)
      .innerJoin(clientIntakes, eq(clientAssignments.clientId, clientIntakes.clientId))
      .where(eq(clientAssignments.caregiverId, caregiverId));

    return assignments.map(a => ({
      id: a.id,
      caregiverId: a.caregiverId,
      clientId: a.clientId,
      startDate: a.startDate,
      endDate: a.endDate,
      isActive: a.isActive,
      notes: a.notes,
      createdAt: a.createdAt,
      clientName: `${a.firstName} ${a.lastName}`,
    }));
  }

  async createAssignment(assignment: InsertClientAssignment): Promise<ClientAssignment> {
    const [result] = await db
      .insert(clientAssignments)
      .values(assignment)
      .returning();
    return result;
  }

  async createVisitLog(insertVisitLog: InsertVisitLog): Promise<VisitLog> {
    const [visitLog] = await db
      .insert(visitLogs)
      .values(insertVisitLog)
      .returning();
    return visitLog;
  }

  async getVisitLog(id: string): Promise<VisitLog | undefined> {
    const [visitLog] = await db.select().from(visitLogs).where(eq(visitLogs.id, id));
    return visitLog || undefined;
  }

  async updateVisitLog(id: string, data: Partial<InsertVisitLog>): Promise<void> {
    await db
      .update(visitLogs)
      .set(data)
      .where(eq(visitLogs.id, id));
  }

  async endVisit(id: string, timeOut: Date, generalNotes?: string, concernsReported?: string, nextVisitConfirmed?: string): Promise<void> {
    await db
      .update(visitLogs)
      .set({
        timeOut,
        visitStatus: 'completed',
        generalNotes,
        concernsReported,
        nextVisitConfirmed,
        submittedAt: new Date()
      })
      .where(eq(visitLogs.id, id));
  }

  async createTaskCompletion(task: InsertTaskCompletion): Promise<TaskCompletion> {
    const [taskCompletion] = await db
      .insert(taskCompletions)
      .values(task)
      .returning();
    return taskCompletion;
  }

  async getVisitTasks(visitLogId: string): Promise<TaskCompletion[]> {
    return await db
      .select()
      .from(taskCompletions)
      .where(eq(taskCompletions.visitLogId, visitLogId));
  }

  async createVitalSigns(vitals: InsertVitalSigns): Promise<VitalSigns> {
    const [result] = await db
      .insert(vitalSigns)
      .values(vitals)
      .returning();
    return result;
  }

  async getVisitVitals(visitLogId: string): Promise<VitalSigns | undefined> {
    const [result] = await db
      .select()
      .from(vitalSigns)
      .where(eq(vitalSigns.visitLogId, visitLogId));
    return result || undefined;
  }
}

export const storage = new DatabaseStorage();
