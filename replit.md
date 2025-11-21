# AnchorHeart Services - In-Home Care Application

## Overview
AnchorHeart Services is a web application providing non-medical in-home care services in Sonoma County, California. It features a public-facing marketing website to showcase services, pricing, and contact information, and a multi-step digital intake system for comprehensive client onboarding. The application emphasizes a healthcare-focused design language to convey trust and accessibility, suitable for elder care services. The business vision is to provide high-quality, transparent in-home care with an efficient digital client intake process.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with **React 18** and **TypeScript**, using **Vite** for development and **Wouter** for routing. Styling is managed with **TailwindCSS** and **Shadcn/ui** (New York variant) built on Radix UI primitives, featuring a healthcare-inspired color palette. State management leverages **TanStack Query** for server state and React hooks for local UI state, with **React Hook Form** and **Zod** for form validation. Key features include an interactive rate estimator, a multi-step onboarding wizard, and a canvas-based `SignatureCapture` component.

### Backend Architecture
The backend uses **Express.js** with **Node.js** (ESM modules) and **TypeScript**, providing a RESTful API. Endpoints are structured around client onboarding (e.g., `/api/clients`, `/api/clients/:id/intake`, `/api/clients/:id/medical-info`). A storage abstraction layer separates business logic from database operations. **Zod** schemas are used for request validation, ensuring type-safe data flow.

### Data Storage
Data is stored in **Neon Serverless Postgres** using **Drizzle ORM** with a PostgreSQL dialect. The schema is normalized, including tables for `clients`, `client_intakes`, `emergency_contacts`, `medical_information`, `service_agreements`, and `signatures`. UUID primary keys, cascade deletes, and JSON columns for flexible data storage are key design decisions. **Drizzle Kit** manages schema migrations.

### Payment Processing Strategy
AnchorHeart Services employs a two-tier payment strategy:
- **Primary**: ACH/Bank Transfer, offering lower fees and a client incentive ($2 off per visit).
- **Secondary**: Credit/Debit Cards, available for convenience with a small processing fee.
**Stripe** is integrated to support both ACH and card payments, with a focus on clear client communication regarding preferred payment methods and associated incentives/fees.

## External Dependencies

- **Database Service**: Neon Serverless Postgres (`@neondatabase/serverless` driver)
- **Email Service**: Web3Forms API for contact form submissions (sends to anchorheartservices@gmail.com)
- **UI Component Library**: Shadcn/ui (built on Radix UI primitives)
- **Form Management**: React Hook Form, Zod, @hookform/resolvers
- **Styling Framework**: TailwindCSS, PostCSS, Autoprefixer
- **Development Tools**: Vite, @replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer, tsx, esbuild
- **Icon Library**: Lucide React
- **Date Handling**: date-fns
- **Third-party Service Integrations**: Google Fonts (DM Sans, Architects Daughter, Fira Code, Geist Mono)
- **Type Safety Utilities**: drizzle-zod, class-variance-authority, clsx, tailwind-merge