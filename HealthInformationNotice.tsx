import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function HealthInformationNotice() {
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
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Notice of Health Information Practices</h1>
        <p className="text-sm text-slate-600 mb-8">Effective Date: November 1, 2024</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Our Commitment to Your Privacy</h2>
            <p>
              AnchorHeart Services LLC is committed to protecting the privacy and confidentiality of your health information. 
              This notice describes how we collect, use, and safeguard your medical and personal health information when 
              providing non-medical home care services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">HIPAA Voluntary Compliance</h2>
            <p>
              While AnchorHeart Services is not a "covered entity" under the Health Insurance Portability and Accountability Act 
              (HIPAA) because we provide non-medical companion and personal care services (not skilled medical care), we 
              <strong> voluntarily adhere to HIPAA privacy and security standards</strong> as a best practice to protect your information.
            </p>
            <p className="mt-4">
              This means we implement the same safeguards and protections that hospitals, doctors, and medical facilities are 
              legally required to follow, even though we are not legally obligated to do so.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">What Health Information We Collect</h2>
            <p>To provide safe and appropriate care, we collect limited health-related information including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Medical diagnoses and conditions (e.g., diabetes, dementia, heart disease)</li>
              <li>Current medications and allergies</li>
              <li>Dietary restrictions and nutritional needs</li>
              <li>Mobility limitations and fall risks</li>
              <li>Cognitive status and memory care needs</li>
              <li>Emergency contact and physician information</li>
              <li>Insurance and payment information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">How We Use Your Health Information</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">For Treatment and Care Coordination</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Develop personalized care plans tailored to your needs</li>
              <li>Train and inform caregivers about your specific requirements</li>
              <li>Coordinate with your family, physicians, hospice, or home health teams (with your permission)</li>
              <li>Ensure caregiver safety when assisting with transfers, mobility, or personal care</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">For Operations and Quality Improvement</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Match you with caregivers who have appropriate training and experience</li>
              <li>Monitor and improve the quality of our services</li>
              <li>Conduct internal audits and quality assessments</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">For Payment and Billing</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process payments and manage billing</li>
              <li>Provide superbills for long-term care insurance reimbursement</li>
              <li>Verify eligibility for services</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">For Legal and Safety Reasons</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Comply with California state regulations for home care providers</li>
              <li>Report suspected abuse, neglect, or exploitation as required by law</li>
              <li>Respond to legal proceedings or government investigations</li>
              <li>Prevent or address serious threats to health and safety</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">When We Share Your Information</h2>
            <p>We will not share your health information without your written authorization, except in the following situations:</p>
            
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">With Your Permission</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Family members or authorized representatives you designate</li>
              <li>Your physician, nurse, or healthcare team for coordination of care</li>
              <li>Hospice or home health agencies providing concurrent services</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Without Your Permission (As Allowed or Required by Law)</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To emergency responders in life-threatening situations</li>
              <li>To Adult Protective Services if we suspect abuse or neglect</li>
              <li>In response to court orders, subpoenas, or legal proceedings</li>
              <li>To public health authorities for disease reporting or investigations</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Service Providers (Business Associates)</h3>
            <p>
              We may share limited information with third-party vendors who provide services on our behalf (e.g., billing, 
              background checks, payroll). These vendors are required to protect your information and may only use it for 
              the specific purposes we authorize.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Your Rights Regarding Your Health Information</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to Access</h3>
            <p>You have the right to inspect and obtain a copy of your health information. We will respond to your request within 30 days.</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to Request Corrections</h3>
            <p>If you believe information in your records is incorrect or incomplete, you may request that we amend it.</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to Request Restrictions</h3>
            <p>You may ask us to limit how we use or disclose your information. While we will consider your request, we are not required to agree in all cases.</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to Confidential Communications</h3>
            <p>You may request that we contact you in a specific way (e.g., only by phone, not by mail) or at a specific location.</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to an Accounting of Disclosures</h3>
            <p>You may request a list of certain disclosures we have made of your health information.</p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to Revoke Authorization</h3>
            <p>If you have authorized us to share your information for a specific purpose, you may revoke that authorization at any time in writing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">How We Protect Your Information</h2>
            <p>We implement multiple layers of security to protect your health information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Physical Safeguards:</strong> Locked filing cabinets, secure storage, and restricted access to records</li>
              <li><strong>Technical Safeguards:</strong> Encrypted digital records, password protection, and secure data transmission</li>
              <li><strong>Administrative Safeguards:</strong> Staff training on confidentiality, written policies and procedures, and limited access to information on a "need to know" basis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Breach Notification</h2>
            <p>
              In the unlikely event of a breach of your health information, we will notify you and, if applicable, relevant 
              authorities in accordance with California law and HIPAA standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Questions or Complaints</h2>
            <p>
              If you have questions about this notice or believe your privacy rights have been violated, you may contact us at:
            </p>
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="font-semibold text-slate-900">AnchorHeart Services LLC</p>
              <p>Privacy Officer: Josue Figueroa</p>
              <p>Phone: <a href="tel:17077548049" className="text-sky-700 hover:underline">(707) 754-8049</a></p>
              <p>Fax: <a href="tel:17078766932" className="text-sky-700 hover:underline">(707) 876-6932</a></p>
              <p>Email: <a href="mailto:AnchorHeartServices@gmail.com" className="text-sky-700 hover:underline">AnchorHeartServices@gmail.com</a></p>
            </div>
            <p className="mt-4">
              You may also file a complaint with the California Department of Social Services or the U.S. Department of Health 
              and Human Services Office for Civil Rights. <strong>We will not retaliate against you for filing a complaint.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Changes to This Notice</h2>
            <p>
              We reserve the right to change this notice and our privacy practices. If we make material changes, we will provide 
              you with a revised notice and post the updated version on our website.
            </p>
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
