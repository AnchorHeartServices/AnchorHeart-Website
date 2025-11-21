import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, DollarSign } from "lucide-react";
import heartOfCareLogo from "@assets/Heart of Care Logo_transparent.png";

export default function Rates() {
  const [year, setYear] = useState("");
  const [expandedRate, setExpandedRate] = useState<string | null>("personal");
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
          <h1 className="text-4xl font-bold text-slate-900">Simple, transparent rates</h1>
          <p className="mt-2 text-lg text-slate-600">Click each rate to see what's included. No hidden fees, no surprises.</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-3">
          <div 
            onClick={() => setExpandedRate(expandedRate === "companion" ? null : "companion")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedRate === "companion" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="rate-card-companion"
          >
            <div className="text-sm font-semibold text-sky-700">Companion Care / Light Support</div>
            <div className="mt-1 text-2xl font-extrabold">$32<span className="text-sm font-medium text-slate-500">/hr</span></div>
            {expandedRate === "companion" && (
              <>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">What's Included:</div>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Light conversation and companionship</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Meal preparation (simple meals)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Errands and grocery shopping</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Light housekeeping (client areas)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Safety checks and monitoring</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Medication reminders (no administration)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Appointment accompaniment</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">3‑hour visit minimum</div>
              </>
            )}
          </div>

          <div 
            onClick={() => setExpandedRate(expandedRate === "personal" ? null : "personal")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedRate === "personal" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="rate-card-personal"
          >
            <div className="text-sm font-semibold text-sky-700">Personal Care / ADL Assistance</div>
            <div className="mt-1 text-2xl font-extrabold">$37<span className="text-sm font-medium text-slate-500">/hr</span></div>
            {expandedRate === "personal" && (
              <>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">What's Included:</div>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Bathing, showering, hygiene assistance</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Dressing and grooming support</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Toileting and continence care</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Mobility and transfer assistance</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Feeding and nutrition support</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> All companion care services</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">3‑hour visit minimum</div>
              </>
            )}
          </div>

          <div 
            onClick={() => setExpandedRate(expandedRate === "specialized" ? null : "specialized")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedRate === "specialized" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="rate-card-specialized"
          >
            <div className="text-sm font-semibold text-sky-700">Advanced / Specialized Care</div>
            <div className="mt-1 text-2xl font-extrabold">$42<span className="text-sm font-medium text-slate-500">/hr</span></div>
            {expandedRate === "specialized" && (
              <>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">What's Included:</div>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Dementia and memory care</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Hospice support and coordination</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Post-hospital recovery assistance</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Complex mobility (2-person, lifts)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Higher acuity monitoring</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> All personal & companion care</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">4‑hour visit minimum</div>
              </>
            )}
          </div>

          <div 
            onClick={() => setExpandedRate(expandedRate === "overnight" ? null : "overnight")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedRate === "overnight" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="rate-card-overnight"
          >
            <div className="text-sm font-semibold text-sky-700">Overnight Care</div>
            <div className="mt-1 text-2xl font-extrabold">$240<span className="text-sm font-medium text-slate-500">/night</span></div>
            {expandedRate === "overnight" && (
              <>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">What's Included:</div>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> 10‑12 hour overnight shift</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Sleep monitoring and safety checks</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Toileting and repositioning as needed</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Light assistance during waking hours</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Emergency response and family alerts</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">Flat rate for 10-12 hrs • Sleeping period allowed</div>
              </>
            )}
          </div>

          <div 
            onClick={() => setExpandedRate(expandedRate === "livein" ? null : "livein")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedRate === "livein" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="rate-card-livein"
          >
            <div className="text-sm font-semibold text-sky-700">Live‑In Care</div>
            <div className="mt-1 text-2xl font-extrabold">$400<span className="text-sm font-medium text-slate-500">/day</span></div>
            {expandedRate === "livein" && (
              <>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">What's Included:</div>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> 24‑hour presence in the home</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> All personal and companion care as needed</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Meal preparation (3 meals/day)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Nighttime monitoring and assistance</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Continuous safety and peace of mind</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">Requires private bedroom • 5‑8 hrs sleep time</div>
              </>
            )}
          </div>

          <div 
            onClick={() => setExpandedRate(expandedRate === "shortshift" ? null : "shortshift")}
            className={`rounded-2xl border-2 cursor-pointer transition-all ${
              expandedRate === "shortshift" 
                ? "border-sky-600 bg-sky-50 shadow-lg" 
                : "border-slate-200 bg-white shadow-sm hover:border-sky-300"
            } p-5`}
            data-testid="rate-card-shortshift"
          >
            <div className="text-sm font-semibold text-sky-700">Short‑Shift (under 4 hrs)</div>
            <div className="mt-1 text-2xl font-extrabold">$40<span className="text-sm font-medium text-slate-500">/visit</span></div>
            {expandedRate === "shortshift" && (
              <>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">What's Included:</div>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Quick wellness check-ins (30-90 min)</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Medication reminders only</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Safety and fall hazard checks</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Simple meal prep or reheating</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600"/> Light assistance (no bathing/transfers)</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">$40 flat rate • Max 2 tasks per visit • Not for bathing or heavy care</div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-600 max-w-4xl mx-auto">
          Holiday +50%. Mileage billed at IRS rate beyond 10 miles per visit. Sliding scale considered case‑by‑case. Visit minimums: 3 hrs (Companion/Personal), 4 hrs (Advanced). Overnight is a flat nightly rate; Live‑In is per day.
        </div>

        <div className="mt-10 text-center">
          <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-sky-800" data-testid="button-get-started">
            Get Started
          </a>
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
