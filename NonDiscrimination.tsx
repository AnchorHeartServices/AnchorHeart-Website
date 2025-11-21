import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NonDiscrimination() {
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
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Notice of Non-Discrimination</h1>
        <p className="text-sm text-slate-600 mb-8">Effective Date: November 1, 2024</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Equal Opportunity Provider</h2>
            <p>
              AnchorHeart Services LLC is committed to providing care with dignity, respect, and compassion to all individuals, 
              regardless of personal characteristics or background. We do not discriminate in the provision of services or 
              employment opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Non-Discrimination Policy</h2>
            <p>
              AnchorHeart Services does not discriminate on the basis of:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Race, color, or ethnicity</li>
              <li>National origin or ancestry</li>
              <li>Religion or creed</li>
              <li>Sex, gender identity, or gender expression</li>
              <li>Sexual orientation</li>
              <li>Age</li>
              <li>Disability or medical condition</li>
              <li>Marital status</li>
              <li>Veteran or military status</li>
              <li>Genetic information</li>
              <li>Source of payment (private pay, insurance, etc.)</li>
              <li>Any other characteristic protected by federal, state, or local law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Service Provision</h2>
            <p>
              Our non-discrimination commitment applies to all aspects of service delivery, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Initial consultation and assessment</li>
              <li>Development of care plans</li>
              <li>Assignment of caregivers</li>
              <li>Quality of care provided</li>
              <li>Scheduling and availability</li>
              <li>Billing and payment practices</li>
              <li>Communication and customer service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Employment Practices</h2>
            <p>
              We are an equal opportunity employer. Our hiring, training, compensation, and advancement decisions are based 
              on qualifications, performance, and business needs, not on protected characteristics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Accessibility and Accommodations</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Americans with Disabilities Act (ADA) Compliance</h3>
            <p>
              AnchorHeart Services complies with the Americans with Disabilities Act (ADA) and California's Unruh Civil Rights Act. 
              We provide reasonable accommodations to ensure that individuals with disabilities can access our services.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Reasonable Accommodations Include:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Accessible communication methods (large print, verbal explanations, TTY/TDD services)</li>
              <li>Flexible scheduling to accommodate medical appointments or treatments</li>
              <li>Modifications to service delivery to meet individual needs</li>
              <li>Language assistance services (interpreters, translated materials)</li>
            </ul>

            <p className="mt-4">
              If you require an accommodation to access our services, please contact us at{" "}
              <a href="tel:17077548049" className="text-sky-700 hover:underline">(707) 754-8049</a> or{" "}
              <a href="mailto:AnchorHeartServices@gmail.com" className="text-sky-700 hover:underline">AnchorHeartServices@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Language Assistance</h2>
            <p>
              If you or someone you are assisting has difficulty communicating in English, language assistance services are 
              available free of charge. We can provide:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Interpretation services by phone or in person</li>
              <li>Translation of key documents</li>
              <li>Assistance from bilingual staff when available</li>
            </ul>
            <p className="mt-4">
              <strong>ATENCIÓN:</strong> Si habla español, tiene a su disposición servicios gratuitos de asistencia lingüística. 
              Llame al <a href="tel:17077548049" className="text-sky-700 hover:underline">(707) 754-8049</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Cultural Competency</h2>
            <p>
              We strive to provide culturally competent care that respects the diverse backgrounds, beliefs, and preferences 
              of our clients. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Honoring religious and spiritual practices</li>
              <li>Respecting dietary customs and preferences</li>
              <li>Accommodating cultural traditions and customs</li>
              <li>Providing care in a manner that aligns with individual values and beliefs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Filing a Complaint</h2>
            <p>
              If you believe you have been subjected to discrimination, you have the right to file a complaint. You may file 
              a complaint with:
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">AnchorHeart Services</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="font-semibold text-slate-900">Josue Figueroa, Owner</p>
              <p>Phone: <a href="tel:17077548049" className="text-sky-700 hover:underline">(707) 754-8049</a></p>
              <p>Fax: <a href="tel:17078766932" className="text-sky-700 hover:underline">(707) 876-6932</a></p>
              <p>Email: <a href="mailto:AnchorHeartServices@gmail.com" className="text-sky-700 hover:underline">AnchorHeartServices@gmail.com</a></p>
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">External Agencies</h3>
            <p>You may also file a complaint with:</p>
            
            <div className="mt-4 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900">California Department of Fair Employment and Housing (DFEH)</p>
                <p>Phone: (800) 884-1684</p>
                <p>Website: <a href="https://www.dfeh.ca.gov" className="text-sky-700 hover:underline" target="_blank" rel="noopener noreferrer">www.dfeh.ca.gov</a></p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900">U.S. Department of Health and Human Services Office for Civil Rights</p>
                <p>Phone: (800) 368-1019</p>
                <p>Website: <a href="https://www.hhs.gov/ocr" className="text-sky-700 hover:underline" target="_blank" rel="noopener noreferrer">www.hhs.gov/ocr</a></p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900">U.S. Equal Employment Opportunity Commission (EEOC)</p>
                <p>Phone: (800) 669-4000</p>
                <p>Website: <a href="https://www.eeoc.gov" className="text-sky-700 hover:underline" target="_blank" rel="noopener noreferrer">www.eeoc.gov</a></p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">No Retaliation</h2>
            <p>
              AnchorHeart Services will not retaliate, threaten, intimidate, or coerce anyone for filing a complaint, 
              participating in an investigation, or opposing discriminatory practices. Your rights are protected by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Our Commitment</h2>
            <p>
              At AnchorHeart Services, we believe that love, respect, and dignity should never fade with time. This belief 
              extends to every individual we serve and every person we employ. We are committed to fostering an environment 
              of inclusion, respect, and equal opportunity for all.
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
