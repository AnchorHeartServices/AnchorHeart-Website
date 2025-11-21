import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { z } from "zod";
import { storage } from "./storage";
import { 
  insertClientIntakeSchema,
  insertEmergencyContactSchema,
  insertMedicalInformationSchema,
  insertServiceAgreementSchema,
  insertSignatureSchema,
  insertPaymentSchema,
  insertVisitLogSchema,
  insertTaskCompletionSchema,
  insertVitalSignsSchema
} from "@shared/schema";

// Initialize Stripe - will work once API keys are provided
// From blueprint:javascript_stripe
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover",
  });
  console.log("[Stripe] Initialized successfully");
} else {
  console.warn("[Stripe] Not configured - STRIPE_SECRET_KEY missing");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint using Web3Forms
  app.post("/api/contact", async (req, res) => {
    try {
      console.log('[Contact Form] Received submission:', { name: req.body.name, email: req.body.email });
      
      const contactSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        message: z.string().min(1, "Message is required")
      });

      const { name, email, phone, message } = contactSchema.parse(req.body);
      console.log('[Contact Form] Validation passed');

      const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
      if (!web3formsKey) {
        throw new Error("Web3Forms access key not configured");
      }

      console.log('[Contact Form] Sending via Web3Forms...');
      
      // Prepare the form data for Web3Forms
      const formData = new URLSearchParams();
      formData.append('access_key', web3formsKey);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      if (phone) {
        formData.append('phone', phone);
      }
      formData.append('subject', `New Contact Form Submission from ${name}`);

      // Send to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      const result = await response.json();
      console.log('[Contact Form] Web3Forms result:', result);

      if (!result.success) {
        throw new Error(result.message || 'Failed to send email via Web3Forms');
      }

      console.log('[Contact Form] Email sent successfully via Web3Forms!');
      res.json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error: any) {
      console.error('[Contact Form Error] Full error:', error);
      console.error('[Contact Form Error] Error message:', error.message);
      console.error('[Contact Form Error] Error stack:', error.stack);
      res.status(500).json({ 
        error: "Failed to send message. Please try calling us directly at (707) 754-8049." 
      });
    }
  });

  // Create a new client and start onboarding
  app.post("/api/clients", async (req, res) => {
    try {
      const client = await storage.createClient({ status: "in_progress" });
      res.json(client);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get complete client packet
  app.get("/api/clients/:id", async (req, res) => {
    try {
      const packet = await storage.getCompleteClientPacket(req.params.id);
      if (!packet) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(packet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Save/update client intake information
  app.post("/api/clients/:id/intake", async (req, res) => {
    try {
      const validatedData = insertClientIntakeSchema.parse({
        ...req.body,
        clientId: req.params.id
      });

      const existing = await storage.getClientIntake(req.params.id);
      
      if (existing) {
        await storage.updateClientIntake(existing.id, validatedData);
        const updated = await storage.getClientIntake(req.params.id);
        res.json(updated);
      } else {
        const intake = await storage.createClientIntake(validatedData);
        res.json(intake);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Add emergency contact
  app.post("/api/clients/:id/emergency-contacts", async (req, res) => {
    try {
      const validatedData = insertEmergencyContactSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      
      const contact = await storage.createEmergencyContact(validatedData);
      res.json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete emergency contact
  app.delete("/api/clients/:id/emergency-contacts/:contactId", async (req, res) => {
    try {
      await storage.deleteEmergencyContact(req.params.contactId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all emergency contacts for a client
  app.get("/api/clients/:id/emergency-contacts", async (req, res) => {
    try {
      const contacts = await storage.getEmergencyContacts(req.params.id);
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Save/update medical information
  app.post("/api/clients/:id/medical-info", async (req, res) => {
    try {
      const validatedData = insertMedicalInformationSchema.parse({
        ...req.body,
        clientId: req.params.id
      });

      const existing = await storage.getMedicalInformation(req.params.id);
      
      if (existing) {
        await storage.updateMedicalInformation(existing.id, validatedData);
        const updated = await storage.getMedicalInformation(req.params.id);
        res.json(updated);
      } else {
        const medInfo = await storage.createMedicalInformation(validatedData);
        res.json(medInfo);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Save/update service agreement
  app.post("/api/clients/:id/service-agreement", async (req, res) => {
    try {
      const validatedData = insertServiceAgreementSchema.parse({
        ...req.body,
        clientId: req.params.id
      });

      const existing = await storage.getServiceAgreement(req.params.id);
      
      if (existing) {
        await storage.updateServiceAgreement(existing.id, validatedData);
        const updated = await storage.getServiceAgreement(req.params.id);
        res.json(updated);
      } else {
        const agreement = await storage.createServiceAgreement(validatedData);
        res.json(agreement);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all signatures for a client
  app.get("/api/clients/:id/signatures", async (req, res) => {
    try {
      const signatures = await storage.getSignatures(req.params.id);
      res.json(signatures);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Add signature
  app.post("/api/clients/:id/signatures", async (req, res) => {
    try {
      const validatedData = insertSignatureSchema.parse({
        ...req.body,
        clientId: req.params.id
      });
      
      const signature = await storage.createSignature(validatedData);
      res.json(signature);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Submit complete packet
  app.post("/api/clients/:id/submit", async (req, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      await storage.updateClientStatus(req.params.id, "completed", new Date());
      const packet = await storage.getCompleteClientPacket(req.params.id);
      
      res.json(packet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Payment routes - from blueprint:javascript_stripe
  
  // Create payment intent with ACH discount support
  app.post("/api/clients/:id/create-payment", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ 
          error: "Payment processing not configured. Stripe API keys required." 
        });
      }

      // Validate request payload with Zod schema
      const paymentRequestSchema = z.object({
        amount: z.number().int().positive(),
        paymentMethod: z.enum(["ach", "us_bank_account", "card"]),
        description: z.string().optional(),
        serviceDate: z.string().optional(),
        invoiceNumber: z.string().optional(),
      });

      const validatedRequest = paymentRequestSchema.parse(req.body);
      const { amount, paymentMethod, description, serviceDate, invoiceNumber } = validatedRequest;

      // Calculate discount for ACH payments ($2 off)
      const ACH_DISCOUNT = 200; // $2 in cents
      const isACH = paymentMethod === "ach" || paymentMethod === "us_bank_account";
      const discountAmount = isACH ? ACH_DISCOUNT : 0;
      const finalAmount = amount - discountAmount;

      if (finalAmount <= 0) {
        return res.status(400).json({ error: "Amount too small after discount" });
      }

      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: "usd",
        payment_method_types: isACH ? ["us_bank_account"] : ["card"],
        metadata: {
          clientId: req.params.id,
          serviceDate: serviceDate || "",
          invoiceNumber: invoiceNumber || "",
        },
      });

      // Save payment record to database
      const validatedPayment = insertPaymentSchema.parse({
        clientId: req.params.id,
        stripePaymentIntentId: paymentIntent.id,
        amount,
        discountAmount,
        finalAmount,
        currency: "usd",
        paymentMethod: isACH ? "ach" : "card",
        paymentStatus: "pending",
        description,
        serviceDate,
        invoiceNumber,
      });

      const payment = await storage.createPayment(validatedPayment);

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentId: payment.id,
        discount: discountAmount,
        finalAmount,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get payment history for a client
  app.get("/api/clients/:id/payments", async (req, res) => {
    try {
      const payments = await storage.getClientPayments(req.params.id);
      res.json(payments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Webhook to handle Stripe payment events
  // 
  // IMPORTANT SETUP REQUIRED: This endpoint requires raw body parsing for signature verification.
  // Before using this webhook in production, the Express server must be configured with:
  // 
  // app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));
  // 
  // This should be added BEFORE the express.json() middleware in server/index.ts.
  // Without raw body parsing, stripe.webhooks.constructEvent() will fail.
  // 
  // See: https://stripe.com/docs/webhooks/signatures#verify-official-libraries
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ error: "Stripe not configured" });
      }

      const sig = req.headers['stripe-signature'];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured - webhook verification disabled");
        return res.status(500).json({ error: "Webhook secret not configured" });
      }

      if (!sig) {
        return res.status(400).json({ error: "Missing stripe-signature header" });
      }

      // Verify webhook signature to prevent spoofing
      let event;
      try {
        // req.body should be the raw body string for signature verification
        // In production, ensure Express is configured with express.raw() for this route
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error('[Stripe Webhook] Signature verification failed:', err.message);
        return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
      }

      // Handle verified webhook events
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as any;
        
        // Update payment status in database
        const payment = await storage.getPaymentByStripeId(paymentIntent.id);
        if (payment) {
          await storage.updatePaymentStatus(
            payment.id,
            "succeeded",
            new Date()
          );
          console.log(`[Stripe Webhook] Payment ${payment.id} marked as succeeded`);
        }
      }

      // Handle payment intent failed
      if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object as any;
        
        const payment = await storage.getPaymentByStripeId(paymentIntent.id);
        if (payment) {
          await storage.updatePaymentStatus(
            payment.id,
            "failed",
            null,
            paymentIntent.last_payment_error?.message
          );
          console.log(`[Stripe Webhook] Payment ${payment.id} marked as failed`);
        }
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error('[Stripe Webhook] Error processing webhook:', error);
      res.status(400).json({ error: error.message });
    }
  });

  // ===== CAREGIVER MOBILE APP ROUTES =====

  // Get list of all clients (simplified - no auth for now)
  app.get("/api/caregiver/clients", async (req, res) => {
    try {
      // Get all completed clients with their intake information
      const clientsWithIntake = await storage.getCompleteClientPacket;
      // For now, return a simplified list - in production, filter by assigned clients
      res.json({ clients: [] }); // Will be populated as clients complete onboarding
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Start a new visit
  app.post("/api/caregiver/visits", async (req, res) => {
    try {
      const visitData = insertVisitLogSchema.parse({
        ...req.body,
        visitStatus: "in_progress",
      });
      
      const visit = await storage.createVisitLog(visitData);
      res.json(visit);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // End a visit
  app.put("/api/caregiver/visits/:id/end", async (req, res) => {
    try {
      const { timeOut, generalNotes, concernsReported, nextVisitConfirmed } = req.body;
      
      await storage.endVisit(
        req.params.id,
        new Date(timeOut),
        generalNotes,
        concernsReported,
        nextVisitConfirmed
      );
      
      const updatedVisit = await storage.getVisitLog(req.params.id);
      res.json(updatedVisit);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Add task completions
  app.post("/api/caregiver/tasks", async (req, res) => {
    try {
      const tasks = z.array(insertTaskCompletionSchema).parse(req.body.tasks);
      
      const completedTasks = await Promise.all(
        tasks.map(task => storage.createTaskCompletion(task))
      );
      
      res.json({ tasks: completedTasks });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Record vital signs
  app.post("/api/caregiver/vitals", async (req, res) => {
    try {
      const vitalsData = insertVitalSignsSchema.parse(req.body);
      
      const vitals = await storage.createVitalSigns(vitalsData);
      res.json(vitals);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // SEO: Sitemap for search engine indexing
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/rates</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/health-information</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/non-discrimination</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/onboarding</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
    
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // SEO: robots.txt to guide search engine crawlers
  app.get("/robots.txt", (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    
    const robotsTxt = `# AnchorHeart Services - Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /onboarding
Disallow: /caregiver

Sitemap: ${baseUrl}/sitemap.xml`;
    
    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);

  return httpServer;
}
