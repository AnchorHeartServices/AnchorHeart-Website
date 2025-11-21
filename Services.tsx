import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Heart, CheckCircle2, Ambulance, Shield } from "lucide-react";
import heartOfCareLogo from "@assets/Heart of Care Logo_transparent.png";

export default function Services() {
  const [year, setYear] = useState("");
  const [expandedService, setExpandedService] = useState<string | null>("companion");
  useEffect(() => setYear(String(new Date().getFullYear())), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-50">
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
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Our Services</h1>
          <p className="mt-2 max-w-3xl text-lg text-slate-600">Professional, non-medical in-home care services tailored to meet your unique needs. From companionship to advanced personal care, we're here to support you. Click each service to learn more.</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-3">
          <div 
            onClick={() => setExpandedService(expandedService === "companion" ? null : "companion")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedService === "companion" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="service-companion"
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                expandedService === "companion" ? "bg-sky-700" : "bg-sky-100"
              }`}>
                <Heart className={`h-5 w-5 ${expandedService === "companion" ? "text-white" : "text-sky-700"}`}/>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">Companion Care & Light Support</h3>
                <p className="mt-1 text-sm text-slate-600">Perfect for clients who need social engagement, light assistance with daily tasks, and general monitoring to maintain independence at home.</p>
                {expandedService === "companion" && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Companionship & Conversation</div>
                      <div className="text-sm text-slate-600">Meaningful social interaction, reading together, games, and emotional support</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Meal Preparation</div>
                      <div className="text-sm text-slate-600">Planning, cooking, and serving nutritious meals according to dietary needs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Errands & Transportation</div>
                      <div className="text-sm text-slate-600">Grocery shopping, pharmacy pick-ups, and accompaniment to appointments</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Light Housekeeping</div>
                      <div className="text-sm text-slate-600">Tidying client spaces, laundry, dishes, and maintaining a clean environment</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Medication Reminders</div>
                      <div className="text-sm text-slate-600">Gentle reminders for prescribed medications (no administration)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Safety Monitoring</div>
                      <div className="text-sm text-slate-600">Fall prevention, safety checks, and general health observation</div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>

          <div 
            onClick={() => setExpandedService(expandedService === "personal" ? null : "personal")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedService === "personal" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="service-personal"
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                expandedService === "personal" ? "bg-sky-700" : "bg-sky-100"
              }`}>
                <Shield className={`h-5 w-5 ${expandedService === "personal" ? "text-white" : "text-sky-700"}`}/>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">Personal Care & ADL Assistance</h3>
                <p className="mt-1 text-sm text-slate-600">Hands-on support with activities of daily living for clients who need more than companionship—preserving dignity and comfort.</p>
                {expandedService === "personal" && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Bathing & Hygiene Assistance</div>
                      <div className="text-sm text-slate-600">Respectful support with showers, sponge baths, oral care, and grooming</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Dressing & Grooming</div>
                      <div className="text-sm text-slate-600">Assistance selecting clothes, getting dressed, and maintaining personal appearance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Toileting & Continence Care</div>
                      <div className="text-sm text-slate-600">Dignified support with bathroom needs and incontinence management</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Mobility & Transfer Support</div>
                      <div className="text-sm text-slate-600">Safe assistance with sitting, standing, walking, and using mobility aids</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Feeding & Nutrition</div>
                      <div className="text-sm text-slate-600">Assistance with eating, feeding support, and monitoring nutrition/hydration</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">All Companion Services</div>
                      <div className="text-sm text-slate-600">Includes all companion care services listed above</div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>

          <div 
            onClick={() => setExpandedService(expandedService === "specialized" ? null : "specialized")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedService === "specialized" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="service-specialized"
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                expandedService === "specialized" ? "bg-sky-700" : "bg-sky-100"
              }`}>
                <Ambulance className={`h-5 w-5 ${expandedService === "specialized" ? "text-white" : "text-sky-700"}`}/>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">Advanced & Specialized Care</h3>
                <p className="mt-1 text-sm text-slate-600">Comprehensive support for clients with complex needs—dementia, hospice, post-hospital, or those requiring higher acuity assistance.</p>
                {expandedService === "specialized" && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Dementia & Memory Care</div>
                      <div className="text-sm text-slate-600">Gentle redirection, routine maintenance, safety monitoring, and cognitive engagement</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Hospice & End-of-Life Support</div>
                      <div className="text-sm text-slate-600">Comfort measures, companionship, family respite, and coordination with hospice teams</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Post-Hospital Transition Care</div>
                      <div className="text-sm text-slate-600">Recovery support, wound observation, therapy reinforcement, and care plan adherence</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Complex Mobility Needs</div>
                      <div className="text-sm text-slate-600">Two-person assists, Hoyer lift operation, wheelchair transfers, and positioning</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">Overnight & Live-In Care</div>
                      <div className="text-sm text-slate-600">24/7 availability for clients requiring round-the-clock supervision and care</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600"/>
                    <div>
                      <div className="font-semibold text-slate-900">All Personal Care Services</div>
                      <div className="text-sm text-slate-600">Includes all companion and personal care services</div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-sky-200 bg-sky-50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-sky-700"/>
            <span className="text-slate-700">CNA-certified caregiver</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-sky-700"/>
            <span className="text-slate-700">Same-week availability</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-sky-700"/>
            <span className="text-slate-700">Personalized care plans</span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-sky-800" data-testid="button-get-started">
            Get Started
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-sm">
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
