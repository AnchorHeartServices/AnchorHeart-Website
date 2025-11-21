import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Phone, Mail, MapPin, Printer } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import heartOfCareLogo from "@assets/Heart of Care Logo_transparent.png";

export default function Contact() {
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
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Let's talk care</h1>
          <p className="mt-2 text-lg text-slate-600">Tell us about your needs and schedule. We'll respond quickly with next steps and availability.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">Contact Us</h3>
                <div className="space-y-3 text-slate-700">
                  <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-sky-700"/> <a href="tel:17077548049" className="hover:underline" data-testid="link-phone">(707) 754-8049</a></div>
                  <div className="flex items-center gap-3"><Printer className="h-5 w-5 text-sky-700"/> <a href="tel:17078766932" className="hover:underline" data-testid="link-fax">(707) 876-6932</a> <span className="text-xs text-slate-500">(Fax)</span></div>
                  <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-sky-700"/> <a href="mailto:AnchorHeartServices@gmail.com" className="hover:underline" data-testid="link-email">AnchorHeartServices@gmail.com</a></div>
                  <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-sky-700"/> Santa Rosa, CA</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">Office Hours</h3>
                <div className="text-sm text-slate-700 space-y-1">
                  <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                  <p>Saturday: 8:00 AM - 6:00 PM</p>
                  <p className="text-sky-700 font-medium mt-2">Care Available: 7 days/week, all hours</p>
                  <p className="text-xs text-slate-600 mt-2">We respond to all inquiries within the hour during business hours</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">Service Area</h3>
                <div className="text-sm text-slate-700">
                  <p className="mb-1">Proudly serving Sonoma County:</p>
                  <p className="text-slate-600">Santa Rosa • Petaluma • Rohnert Park • Cotati • Sebastopol • Windsor • Healdsburg • Sonoma</p>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-6">
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">Quick Start</h3>
                <p className="text-sm text-slate-700 mb-4">Ready to begin? Here's what happens next:</p>
                <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
                  <li>Fill out the contact form or call us</li>
                  <li>We'll schedule a free consultation call</li>
                  <li>Complete our simple digital onboarding</li>
                  <li>Start care as soon as this week!</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Send us a message</h2>
            <ContactForm/>
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
