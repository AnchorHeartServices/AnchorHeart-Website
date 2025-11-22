import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import heartOfCareLogo from "@assets/Heart of Care Logo_transparent.png";

export default function Terms() {
  const [year, setYear] = useState("");
  const [expandedTerm, setExpandedTerm] = useState<string | null>("service");
  useEffect(() => setYear(String(new Date().getFullYear())), []);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-3 hover:opacity-80">
            <img src={heartOfCareLogo} alt="AnchorHeart Services" className="h-10 w-10 rounded-full"/>
            <div className="leading-tight">
              <div className="font-semibold text-slate-900">AnchorHeart Services</div>
              <div className="text-xs text-slate-500">Care that feels like family.</div>
            </div>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-sky-700" data-testid="link-back-home">
            <ArrowLeft className="h-4 w-4"/> Back to Home
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Service Agreement & Terms</h1>
          <p className="mt-2 text-lg text-slate-600">Clear, transparent policies to ensure quality care and mutual understanding. Click each section to learn more.</p>
        </div>
        
        <div className="mx-auto max-w-4xl space-y-3">
          <div 
            onClick={() => setExpandedTerm(expandedTerm === "service" ? null : "service")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedTerm === "service" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="term-card-service"
          >
            <h3 className="text-xl font-semibold text-slate-900">Service Terms</h3>
            {expandedTerm === "service" && (
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Non-Medical Care</h4>
                  <p>All services provided by AnchorHeart Services are non-medical in nature. We provide companion care and personal care assistance under the supervision of family, physicians, or hospice teams. We do not provide skilled nursing, therapy, or medical treatment.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Visit Minimums</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Companion Care / Personal Care: 3-hour minimum</li>
                    <li>Advanced / Specialized Care: 4-hour minimum</li>
                    <li>Short visits under 4 hours: $40 flat minimum</li>
                    <li>Overnight Care: 10-12 hour shift ($240/night)</li>
                    <li>Live-In Care: 24-hour day ($400/day)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Scheduling</h4>
                  <p>Services are available days, evenings, overnights, and weekends based on caregiver availability. We make every effort to accommodate preferred schedules and will work with families to establish consistent routines.</p>
                </div>
              </div>
            )}
          </div>

          <div 
            onClick={() => setExpandedTerm(expandedTerm === "payment" ? null : "payment")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedTerm === "payment" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="term-card-payment"
          >
            <h3 className="text-xl font-semibold text-slate-900">Payment & Billing</h3>
            {expandedTerm === "payment" && (
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Payment at Time of Service</h4>
                  <p>We believe in simple, transparent billing. Payment is due at the completion of each visit, making it easy to budget and avoid surprise bills. We accept ACH/Bank Transfer (preferred — save $2/visit!), credit/debit cards (small processing fee applies), checks, and cash.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Why Payment at Service?</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Start care immediately — no insurance approvals or delays</li>
                    <li>Control your budget — know exactly what you're paying each visit</li>
                    <li>Transparent pricing — no hidden charges or surprise bills</li>
                    <li>Flexible payment options — choose what works best for you</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Auto-Pay Available</h4>
                  <p>Set up automatic ACH payments and never worry about bills. Get the $2/visit discount and the convenience of hands-free billing!</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Insurance Reimbursement</h4>
                  <p>While we do not bill insurance directly, we provide detailed superbills for possible reimbursement through long-term care insurance policies. Contact your insurance provider to verify coverage.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Holiday Rates</h4>
                  <p>Major holidays (Thanksgiving, Christmas, New Year's Day, etc.) incur a 50% premium on the hourly rate to compensate caregivers for holiday work.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Mileage Fees</h4>
                  <p>Visits beyond 10 miles (one-way) from Santa Rosa incur a mileage charge billed at the current IRS standard rate.</p>
                </div>
              </div>
            )}
          </div>

          <div 
            onClick={() => setExpandedTerm(expandedTerm === "cancellation" ? null : "cancellation")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedTerm === "cancellation" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="term-card-cancellation"
          >
            <h3 className="text-xl font-semibold text-slate-900">Policies & Flexibility</h3>
            {expandedTerm === "cancellation" && (
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Cancellation Policy</h4>
                  <p>24-hour advance notice required for cancellations or schedule changes. Cancellations with less than 24 hours notice may be subject to a minimum visit charge.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">No Long-Term Contracts</h4>
                  <p>We do not require long-term contracts. Services operate under a simple service agreement with visit minimums and our cancellation policy. Either party may discontinue services with appropriate notice.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Scope Changes</h4>
                  <p>If care needs change significantly, we will work with the family to reassess service requirements and adjust the plan accordingly. Rate adjustments may apply if acuity level increases.</p>
                </div>
              </div>
            )}
          </div>

          <div 
            onClick={() => setExpandedTerm(expandedTerm === "credentials" ? null : "credentials")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedTerm === "credentials" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="term-card-credentials"
          >
            <h3 className="text-xl font-semibold text-slate-900">Credentials & Insurance</h3>
            {expandedTerm === "credentials" && (
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Professional Credentials</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Certified Nursing Assistant (CNA) with hospital experience</li>
                    <li>BLS-AHA Certified (CPR & First Aid)</li>
                    <li>Certified Home Care Aide, California HCA Registry #7514120389</li>
                    <li>Background checked and insured</li>
                  </ul>
                  <p className="mt-3 text-xs text-slate-600 italic">
                    Josue Figueroa, CNA - All credentials and insurance certificates available for review upon request.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Confidentiality</h4>
                  <p>All client information, medical records, and personal details are kept strictly confidential in accordance with HIPAA privacy standards and California state law.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-sky-200 bg-sky-50 p-6 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Agreement Summary</h3>
          <div className="text-sm text-slate-700 space-y-3">
            <p className="font-medium">By engaging AnchorHeart Services, clients acknowledge and agree to the following:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All services are provided on a non-medical basis and do not include skilled nursing, therapy, or medical treatment</li>
              <li>Rates are as published and subject to holiday premiums, overnight differentials, and mileage fees as specified</li>
              <li>Minimum visit times apply based on service level selected (3 hours for Companion/Personal, 4 hours for Advanced)</li>
              <li>24-hour advance cancellation notice is required to avoid minimum visit charges</li>
              <li>Payment is due at time of service unless alternative arrangements have been made in writing</li>
              <li>AnchorHeart Services maintains all required certifications</li>
              <li>Either party may discontinue services with appropriate notice as outlined in the service agreement</li>
              <li>All client information will be kept confidential in accordance with privacy laws</li>
              <li>Families are responsible for coordinating with physicians, hospice, or home health agencies for medical care needs</li>
              <li>Care plans may be adjusted as needs change, with rate changes applied if acuity level increases</li>
            </ul>
            <p className="mt-4 text-xs text-slate-600">Complete terms are presented during digital onboarding and require electronic signature before services begin.</p>
          </div>
        </div>

        <div className="mt-10 max-w-4xl mx-auto">
          <div className="rounded-2xl border-2 border-sky-700 bg-white p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Request Service & Accept Agreement</h3>
              <p className="mt-2 text-slate-600">Complete this form to formally request care services and indicate your agreement to the terms above. You'll then be guided through our secure digital onboarding process.</p>
            </div>
            <ServiceRequestForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-sm mt-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <img src={heartOfCareLogo} alt="AnchorHeart Services" className="h-8 w-8 rounded-full"/>
              <span className="font-medium">AnchorHeart Services LLC</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/privacy" className="text-slate-600 hover:text-sky-700">Privacy Policy</Link>
              <Link href="/health-information" className="text-slate-600 hover:text-sky-700">Health Information</Link>
              <Link href="/non-discrimination" className="text-slate-600 hover:text-sky-700">Non-Discrimination</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-slate-500">
            <p>Certified Home Care Aide, California HCA Registry #7514120389</p>
          </div>
          <div className="mt-2 text-center text-slate-500">© {year} AnchorHeart Services • Non‑medical home care • Sonoma County, CA</div>
        </div>
      </footer>
    </div>
  );
}
