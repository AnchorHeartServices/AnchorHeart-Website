import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import FAQItem from "@/components/FAQItem";
import josuePhoto from "@assets/20251023_120706_1761251636669.jpg";
import heartOfCareLogo from "@assets/Heart of Care Logo_transparent.png";

export default function About() {
  const [year, setYear] = useState("");
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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900">AnchorHeart Services — Where Care Feels Like Family</h1>
        </div>
        
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[300px_1fr]">
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <img 
              src={josuePhoto} 
              alt="Josue Figueroa, Founder and CNA"
              className="w-full rounded-2xl border-2 border-sky-200 shadow-lg"
              data-testid="img-josue-photo"
            />
            <div className="mt-4 text-center">
              <p className="font-semibold text-slate-900">Josue Figueroa</p>
              <p className="text-sm text-slate-600">Founder & CNA</p>
            </div>
          </div>
          
          <div className="space-y-6 leading-relaxed text-slate-700">
            <p>
              My name is <span className="font-semibold text-slate-900">Josue Figueroa</span>, and I founded AnchorHeart Services with one simple belief — that love, respect, and dignity should never fade with time.
            </p>
            
            <p>
              I began this journey guided by compassion, to bring heartfelt care to families who feel their world growing smaller each day. As a Certified Nursing Assistant, husband, and proud father, I understand the weight and worry that come with caring for those we love most. Life can become overwhelming when the roles of child, parent, and caregiver start to blend. That's why I choose to stand beside you — to bring calm, comfort, and companionship when it's needed most.
            </p>
            
            <p>
              My background spans hospital care, skilled nursing, hospice, and specialized in-home support — and through it all, one truth has guided me: every person deserves to be seen, heard, and cared for like family.
            </p>
            
            <p>
              Every client has a story to tell, and I consider it a gift to listen — to share a laugh, a memory, or a moment of peace. I'm an old soul with a caring heart.
            </p>
            
            <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-6 text-center">
              <p className="text-lg font-semibold text-slate-900">
                At AnchorHeart Services, we believe that family is everything.
              </p>
              <p className="mt-2 text-slate-700">
                And when you trust us with your loved one's care, we bring more than help — we bring heart, presence, and a sense of home.
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Credentials & Service Area</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-700"/> Certified Nursing Assistant with hospital experience (BLS-AHA)</li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-700"/> 
                  <span>
                    Certified Home Care Aide, CA HCA Registry #7514120389
                    <br />
                    <a 
                      href="https://www.ccld.dss.ca.gov/hcsregistry/registrysearch.aspx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-sky-700 hover:text-sky-800 hover:underline"
                      data-testid="link-verify-credentials"
                    >
                      Verify credentials on CA Registry →
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-700"/> Serving Santa Rosa and surrounding Sonoma County</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Frequently asked</h3>
            <div className="space-y-3">
              <FAQItem q="Are you a home health agency?" a={<span>AnchorHeart provides non‑medical home care. For skilled nursing or therapy, we coordinate with your chosen home health or hospice team.</span>} />
              <FAQItem q="Do you accept insurance?" a={<span>AnchorHeart Services operates on a private-pay basis. Payment is due upon receipt of a weekly invoice, typically issued at the end of each service week. We can also provide superbills for potential reimbursement through long-term care insurance.</span>} />
              <FAQItem q="Is there a contract?" a={<span>No long‑term contract. Only a simple service agreement, visit minimums, and a 24‑hour cancellation policy.</span>} />
            </div>
          </div>
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
            <p>
              Certified Home Care Aide, California HCA Registry #7514120389
              {" • "}
              <a 
                href="https://www.ccld.dss.ca.gov/hcsregistry/registrysearch.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sky-700 hover:text-sky-800 hover:underline"
                data-testid="link-verify-footer"
              >
                Verify Credentials
              </a>
            </p>
          </div>
          <div className="mt-2 text-center text-slate-500">© {year} AnchorHeart Services • Non‑medical home care • Sonoma County, CA</div>
        </div>
      </footer>
    </div>
  );
}
