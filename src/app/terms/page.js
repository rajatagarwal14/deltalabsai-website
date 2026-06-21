export const metadata = {
  title: 'Terms of Service — Delta Labs AI',
  description: 'Terms of Service governing your use of Delta Labs AI consulting, SmileCRM, and related automation services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L36 36H4L20 4Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
              <path d="M20 14L28 30H12L20 14Z" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
            </svg>
            Delta Labs AI
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: February 28, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services provided by A.G. Ventures, operating under the brand name
              <strong> Delta Labs AI</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), including but not limited to the SmileCRM platform,
              WhatsApp-based communication tools, and related services (collectively, the &quot;Services&quot;), you agree to
              be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Services</h2>
            <p>
              Delta Labs AI provides AI-powered operational tools for small and medium businesses, including:
              SmileCRM, a dental clinic management and WhatsApp communication platform; automated patient
              communication via WhatsApp Business API; appointment scheduling and clinic management tools;
              and health monitoring and operational analytics dashboards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts and Registration</h2>
            <p>
              To use certain features of our Services, you may need to register and create an account. You agree
              to provide accurate, current, and complete information during registration, maintain and update your
              information, keep your account credentials secure and confidential, and accept responsibility for all
              activities that occur under your account.
            </p>
            <p>
              You must notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. WhatsApp Business Platform Usage</h2>
            <p>
              Our Services integrate with the Meta WhatsApp Business Platform. By using WhatsApp-based features, you agree to
              comply with Meta&apos;s WhatsApp Business Policy and Commerce Policy, WhatsApp&apos;s Terms of Service, and all
              applicable Meta Platform Terms and Developer Policies.
            </p>
            <p>
              You shall not use the WhatsApp integration to send spam or unsolicited messages, transmit harmful,
              offensive, or illegal content, impersonate another person or entity, violate any applicable laws or
              regulations, or collect or harvest user data without proper consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Acceptable Use</h2>
            <p>
              You agree to use our Services only for lawful purposes and in accordance with these Terms. You shall not
              use the Services in any way that violates applicable laws or regulations, for fraudulent or deceptive purposes,
              to infringe upon the rights of others, to interfere with or disrupt the Services, or to attempt unauthorized
              access to any part of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data and Content</h2>
            <p>
              You retain ownership of all data and content you provide through our Services. By using our Services,
              you grant us a limited license to process, store, and transmit your data solely for the purpose of
              providing and improving our Services. You are responsible for ensuring you have proper consent to
              share any patient or third-party data through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p>
              The Services, including all software, designs, text, graphics, and other content, are owned by
              A.G. Ventures and are protected by intellectual property laws. You may not copy, modify, distribute,
              sell, or lease any part of our Services without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Service Availability</h2>
            <p>
              We strive to maintain high availability of our Services but do not guarantee uninterrupted or
              error-free operation. We may temporarily suspend access for maintenance, updates, or other
              operational reasons. We will make reasonable efforts to notify you of planned downtime in advance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Delta Labs AI shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including but not limited to
              loss of profits, data, or business opportunities, arising out of or in connection with your use
              of the Services. Our total liability for any claims arising from these Terms shall not exceed the
              amount paid by you for the Services in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless A.G. Ventures, its officers, directors,
              employees, and agents from any claims, damages, losses, or expenses arising from your use of
              the Services, your violation of these Terms, or your violation of any rights of a third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Termination</h2>
            <p>
              We may terminate or suspend your access to the Services at any time, with or without cause,
              with reasonable notice. You may terminate your account at any time by contacting us. Upon
              termination, your right to use the Services ceases immediately, and we may delete your account
              data in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
              arising from these Terms or your use of the Services shall be subject to the exclusive jurisdiction
              of the courts in Greater Noida, Uttar Pradesh, India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes
              by posting the updated Terms on this page with a revised &quot;Last updated&quot; date. Your continued
              use of the Services after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p>
              <strong>A.G. Ventures</strong> (d/b/a Delta Labs AI)<br />
              Email: <a href="mailto:deltalabsai@mail.deltalabsai.com" className="text-blue-600 hover:underline">deltalabsai@mail.deltalabsai.com</a><br />
              Phone: +91 7011402167
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 A.G. Ventures (Delta Labs AI). All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-900 transition-colors font-medium text-gray-900">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
