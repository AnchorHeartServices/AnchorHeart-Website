import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Phone, Heart, DollarSign, User, FileText, Mail, Shield, Clock, Calendar, Facebook, Instagram, Linkedin } from "lucide-react";
import Pill from "@/components/Pill";
import Stat from "@/components/Stat";
import RateEstimator from "@/components/RateEstimator";
import heartOfCareLogo from "@assets/Heart of Care Logo_1761679513770.png";
import heroLogo from "@assets/Heart of Care Logo_transparent.png";
import santaRosaBackground from "@assets/ChatGPT Image Oct 28, 2025, 12_07_54 PM_1761678490904.png";

export default function Home() {
  const [year, setYear] = useState("");
  useEffect(() => setYear(String(new Date().getFullYear())), []);

  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://anchorheart.services",
    "name": "AnchorHeart Services",
    "description": "Compassionate non-medical in-home care services in Sonoma County, California. CNA-certified caregiver providing companion care, personal care, dementia support, and specialized care.",
    "url": "https://anchorheart.services",
    "logo": "https://anchorheart.services/logo.png",
    "image": "https://anchorheart.services/logo.png",
    "telephone": "+17077548049",
    "email": "AnchorHeartServices@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Santa Rosa",
      "addressRegion": "CA",
      "postalCode": "95401",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.4404",
      "longitude": "-122.7141"
    },
    "areaServed": {
      "@type": "State",
      "name": "California",
      "containsPlace": [
        {"@type": "City", "name": "Santa Rosa"},
        {"@type": "City", "name": "Petaluma"},
        {"@type": "City", "name": "Rohnert Park"},
        {"@type": "City", "name": "Cotati"},
        {"@type": "City", "name": "Sebastopol"},
        {"@type": "City", "name": "Windsor"},
        {"@type": "City", "name": "Healdsburg"},
        {"@type": "City", "name": "Sonoma"}
      ]
    },
    "priceRange": "$32-$42",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Josue Figueroa",
      "jobTitle": "Certified Nursing Assistant (CNA)",
      "hasCredential": "California HCA Registry #7514120389"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does AnchorHeart Services provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide non-medical in-home care including companion care, personal care (ADL support), dementia and Alzheimer's care, hospice support, respite care, and specialized care for various conditions."
        }
      },
      {
        "@type": "Question",
        "name": "What are your rates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companion care starts at $32/hour, personal care at $37/hour, and advanced/specialized care at $42/hour. Overnight care is $240/night and live-in care is $400/day. We accept ACH/bank transfer (save $2/visit), credit/debit cards, checks, and cash."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve all of Sonoma County, California, including Santa Rosa, Petaluma, Rohnert Park, Cotati, Sebastopol, Windsor, Healdsburg, and Sonoma."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can care start?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Care can start as soon as this week! We offer same-week starts for families who need immediate support."
        }
      },
      {
        "@type": "Question",
        "name": "What are your caregiver credentials?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Josue Figueroa is a Certified Nursing Assistant (CNA) with California HCA Registry #7514120389, BLS-AHA certified (CPR & First Aid), and has extensive hospital experience."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-sky-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img 
              src={heartOfCareLogo} 
              alt="AnchorHeart Services" 
              className="h-16 w-16"
            />
            <div className="leading-tight">
              <div className="font-semibold text-slate-900">AnchorHeart Services</div>
              <div className="text-xs text-slate-500">Care that feels like family.</div>
            </div>
          </div>
          <a href="tel:17077548049" className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-800" data-testid="button-call-header">
            <Phone className="h-4 w-4"/> (707) 754-8049
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 to-sky-50" style={{ minHeight: '600px' }}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center">
              <img 
                src={heroLogo} 
                alt="Heart of Care" 
                className="h-40 w-40 mb-6"
              />
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl text-center">
                Compassionate in‑home care<br/>in <span className="text-sky-700">Sonoma County</span>
              </h1>
            </div>
            <p className="mt-4 text-xl leading-relaxed text-slate-700 max-w-3xl mx-auto">
              Personalized non‑medical care that preserves dignity and independence—on your schedule, in your home.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-sky-700 cursor-pointer" data-testid="button-free-consultation">
                <Calendar className="h-5 w-5" />
                Free Consultation
              </a>
              <a href="tel:17077548049" className="inline-flex items-center gap-2 rounded-xl border-2 border-sky-600 bg-white px-6 py-3 font-semibold text-sky-700 hover:bg-sky-50" data-testid="button-call-hero">
                <Phone className="h-5 w-5" />
                (707) 754-8049
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              ✓ Start care this week &nbsp;•&nbsp; ✓ No long-term contracts &nbsp;•&nbsp; ✓ CNA-certified care
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-3 shadow-sm ring-1 ring-slate-100">
                <Clock className="h-6 w-6 text-sky-700"/>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">Response time</div>
                  <div className="font-semibold text-slate-900">Same‑week starts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Explore our care</h2>
          <p className="text-lg text-slate-600 text-center mb-12">Click each bubble to learn more</p>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/services">
            <div className="group block rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-sky-600 hover:bg-sky-50 hover:shadow-xl cursor-pointer" data-testid="nav-bubble-services">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 group-hover:bg-sky-700 transition-colors">
                <Heart className="h-8 w-8 text-sky-700 group-hover:text-white transition-colors"/>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Services</h3>
              <p className="text-slate-600">Companion care, personal care, dementia support, and specialized services tailored to your needs.</p>
              <div className="mt-4 text-sky-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Learn more →
              </div>
            </div>
          </a>

          <a href="/rates">
            <div className="group block rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-sky-600 hover:bg-sky-50 hover:shadow-xl cursor-pointer" data-testid="nav-bubble-rates">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 group-hover:bg-sky-700 transition-colors">
                <DollarSign className="h-8 w-8 text-sky-700 group-hover:text-white transition-colors"/>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Rates</h3>
              <p className="text-slate-600">Simple, transparent pricing starting at $32/hour. No hidden fees, no surprises. See exactly what's included.</p>
              <div className="mt-4 text-sky-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                View pricing →
              </div>
            </div>
          </a>

          <a href="/about">
            <div className="group block rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-sky-600 hover:bg-sky-50 hover:shadow-xl cursor-pointer" data-testid="nav-bubble-about">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 group-hover:bg-sky-700 transition-colors">
                <User className="h-8 w-8 text-sky-700 group-hover:text-white transition-colors"/>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">About</h3>
              <p className="text-slate-600">Meet Josue Figueroa, CNA. 36 years in Santa Rosa, bringing faith, compassion, and family values to care.</p>
              <div className="mt-4 text-sky-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Our story →
              </div>
            </div>
          </a>

          <a href="/terms">
            <div className="group block rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-sky-600 hover:bg-sky-50 hover:shadow-xl cursor-pointer" data-testid="nav-bubble-terms">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 group-hover:bg-sky-700 transition-colors">
                <FileText className="h-8 w-8 text-sky-700 group-hover:text-white transition-colors"/>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Terms</h3>
              <p className="text-slate-600">Clear policies, payment options, and service agreements. No long-term contracts. 24-hour cancellation.</p>
              <div className="mt-4 text-sky-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Read terms →
              </div>
            </div>
          </a>

          <a href="/contact">
            <div className="group block rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-sky-600 hover:bg-sky-50 hover:shadow-xl cursor-pointer" data-testid="nav-bubble-contact">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 group-hover:bg-sky-700 transition-colors">
                <Mail className="h-8 w-8 text-sky-700 group-hover:text-white transition-colors"/>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Contact</h3>
              <p className="text-slate-600">Ready to start? Call, email, or fill out our contact form. We respond within the hour during business hours.</p>
              <div className="mt-4 text-sky-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Get in touch →
              </div>
            </div>
          </a>

          <a href="/onboarding">
            <div className="group block rounded-3xl border-2 border-sky-700 bg-sky-700 p-8 shadow-lg transition-all hover:bg-sky-800 hover:shadow-xl cursor-pointer" data-testid="nav-bubble-onboarding">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                <Calendar className="h-8 w-8 text-sky-700"/>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Start Care</h3>
              <p className="text-sky-50">Complete our simple digital onboarding and start receiving care as soon as this week!</p>
              <div className="mt-4 text-white font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Begin onboarding →
              </div>
            </div>
          </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 shadow-lg p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Estimate your care costs</h2>
              <p className="text-lg text-slate-600 mb-6">
                Use our interactive rate calculator to get an instant estimate based on your specific care needs. 
                All pricing is transparent and includes no hidden fees.
              </p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-sky-700"></div>
                  </div>
                  <span>Companion Care starting at $32/hour</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-sky-700"></div>
                  </div>
                  <span>Personal Care ADL support at $37/hour</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-sky-700"></div>
                  </div>
                  <span>Advanced/Specialized Care at $42/hour</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-sky-200 bg-white p-8 shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <img 
                  src={heartOfCareLogo} 
                  alt="AnchorHeart Services" 
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="text-lg font-semibold">AnchorHeart Services</div>
                  <div className="text-slate-500">Care that feels like family.</div>
                </div>
              </div>
              <RateEstimator/>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/90 backdrop-blur-sm py-8 text-sm mt-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <img 
                src={heartOfCareLogo} 
                alt="AnchorHeart Services" 
                className="h-8 w-8 rounded-full"
              />
              <span className="font-medium">AnchorHeart Services LLC</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/privacy" className="text-slate-600 hover:text-sky-700" data-testid="link-privacy">Privacy Policy</Link>
              <Link href="/health-information" className="text-slate-600 hover:text-sky-700" data-testid="link-health-info">Health Information</Link>
              <Link href="/non-discrimination" className="text-slate-600 hover:text-sky-700" data-testid="link-non-discrimination">Non-Discrimination</Link>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-4 text-slate-500">
            <a 
              href="https://www.facebook.com/people/AnchorHeart-Services/61571326113835/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              className="rounded-full p-2 hover:bg-slate-100 hover:text-sky-700 transition-colors"
              data-testid="link-facebook"
            >
              <Facebook className="h-5 w-5"/>
            </a>
            <a 
              href="https://www.instagram.com/anchorheartservices/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="rounded-full p-2 hover:bg-slate-100 hover:text-sky-700 transition-colors"
              data-testid="link-instagram"
            >
              <Instagram className="h-5 w-5"/>
            </a>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="rounded-full p-2 hover:bg-slate-100 hover:text-sky-700 transition-colors"
              data-testid="link-linkedin"
            >
              <Linkedin className="h-5 w-5"/>
            </a>
          </div>
          <div className="mt-4 text-center text-xs text-slate-500">
            <p>Certified Home Care Aide, California HCA Registry #7514120389</p>
          </div>
          <div className="mt-2 text-center text-slate-500">© {year} AnchorHeart Services • Non‑medical home care • Sonoma County, CA</div>
        </div>
      </footer>

      <a href="tel:17077548049" className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-sky-700 px-5 py-4 font-semibold text-white shadow-lg ring-1 ring-sky-600 hover:bg-sky-800" data-testid="button-call-sticky">
        <Phone className="h-5 w-5"/> Call now
      </a>
    </div>
  );
}
