import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white py-4">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-800" data-testid="link-back-home">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-600 mb-8">Effective Date: November 1, 2024 | Last Updated: October 28, 2025</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Introduction</h2>
            <p>
              AnchorHeart Services LLC ("we," "us," or "our") is committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services 
              or visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name, address, phone number, and email address</li>
              <li>Date of birth and emergency contact information</li>
              <li>Payment and billing information</li>
              <li>Information about your care needs and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Health Information</h3>
            <p>
              To provide appropriate non-medical care services, we collect limited health-related information including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Medical conditions, allergies, and medications</li>
              <li>Mobility limitations and assistive device needs</li>
              <li>Dietary restrictions and preferences</li>
              <li>Cognitive or memory support needs</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages viewed and time spent on our website</li>
              <li>Referring website and search terms used</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our care services</li>
              <li>Schedule and coordinate caregiver visits</li>
              <li>Process payments and billing</li>
              <li>Communicate with you about services and appointments</li>
              <li>Respond to inquiries and customer service requests</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Ensure the safety and security of our clients and caregivers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Information Sharing and Disclosure</h2>
            <p>We do not sell, rent, or share your personal information except:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>With Your Consent:</strong> We may share information with family members or authorized representatives you designate</li>
              <li><strong>Service Providers:</strong> We may share information with trusted third-party vendors (payment processors, background check services) who assist in our operations</li>
              <li><strong>Healthcare Coordination:</strong> With your permission, we may communicate with your physicians, hospice teams, or home health agencies</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or to protect safety</li>
              <li><strong>Emergency Situations:</strong> We may share necessary information with emergency responders if your health or safety is at risk</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">HIPAA Compliance</h2>
            <p>
              While AnchorHeart Services provides non-medical home care and is not a covered entity under HIPAA (Health Insurance 
              Portability and Accountability Act), we voluntarily follow HIPAA privacy and security standards to protect your 
              health information. We implement reasonable safeguards to maintain the confidentiality, integrity, and security of 
              your personal and health information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical security measures to protect your information from 
              unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet 
              or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide services and comply with legal obligations. 
              Client care records are typically retained for a minimum of 7 years as required by California law, or longer if 
              required for legal or business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate or incomplete information</li>
              <li>Request deletion of your information (subject to legal retention requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent for information sharing (where applicable)</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at <a href="mailto:AnchorHeartServices@gmail.com" className="text-sky-700 hover:underline">AnchorHeartServices@gmail.com</a> or call <a href="tel:17077548049" className="text-sky-700 hover:underline">(707) 754-8049</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">California Privacy Rights</h2>
            <p>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The right to know what personal information we collect, use, disclose, or sell</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to opt out of the sale of personal information (we do not sell personal information)</li>
              <li>The right to non-discrimination for exercising your privacy rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information 
              from children. If you become aware that a child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new 
              Privacy Policy on our website and updating the "Last Updated" date. Your continued use of our services after changes 
              are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="font-semibold text-slate-900">AnchorHeart Services LLC</p>
              <p>Santa Rosa, California</p>
              <p>Phone: <a href="tel:17077548049" className="text-sky-700 hover:underline">(707) 754-8049</a></p>
              <p>Fax: <a href="tel:17078766932" className="text-sky-700 hover:underline">(707) 876-6932</a></p>
              <p>Email: <a href="mailto:AnchorHeartServices@gmail.com" className="text-sky-700 hover:underline">AnchorHeartServices@gmail.com</a></p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 mt-16">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-slate-500">
          <p>© 2025 AnchorHeart Services LLC • All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
