export const metadata = {
  title: 'Privacy Policy — Delta Labs AI',
  description: 'How Delta Labs AI collects, uses, and protects your data. Read our full privacy policy for our consulting and SmileCRM services.',
};

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: February 28, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              A.G. Ventures, operating under the brand name <strong>Delta Labs AI</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
              is committed to protecting the privacy and security of the personal information of our users and clients.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
              services, including the SmileCRM platform and related WhatsApp-based communication tools.
            </p>
            <p>
              By using our services, you consent to the data practices described in this policy. If you do not agree with
              the terms of this Privacy Policy, please do not access or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <p>
              <strong>Personal Information:</strong> Name, phone number, email address, business name, business address,
              and other contact details provided by clinic owners during onboarding.
            </p>
            <p>
              <strong>Patient Communication Data:</strong> Messages exchanged via WhatsApp between patients and clinics
              using our platform. This includes message content, timestamps, phone numbers, and message status (sent, delivered, read).
            </p>
            <p>
              <strong>Usage Data:</strong> Information about how you interact with our platform, including log data,
              device information, browser type, IP address, pages visited, and access times.
            </p>
            <p>
              <strong>Business Data:</strong> Clinic operating hours, appointment schedules, service listings, and other
              operational information entered into the SmileCRM system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <p>
              Provide, operate, and maintain our SmileCRM services; facilitate WhatsApp communication between clinics and their
              patients; send appointment reminders and clinic-related notifications; monitor service health and performance;
              improve and optimize our platform; comply with legal obligations and enforce our terms; and communicate with you
              about updates, support, and administrative matters.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. WhatsApp & Meta Platform Data</h2>
            <p>
              Our services integrate with the Meta WhatsApp Business Platform. When using WhatsApp-based features:
            </p>
            <p>
              Messages are transmitted through Meta&apos;s infrastructure and are subject to Meta&apos;s own privacy policies.
              We access WhatsApp messages solely to provide automated responses and clinic communication services.
              We do not sell, share, or use WhatsApp message data for advertising purposes.
              Message data is processed in accordance with Meta&apos;s Platform Terms and WhatsApp Business Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share information in the following circumstances:</p>
            <p>
              <strong>With Clinic Partners:</strong> Patient communication data is shared with the respective clinic
              that the patient is communicating with.
            </p>
            <p>
              <strong>Service Providers:</strong> We use trusted third-party services including Supabase (database hosting),
              Vercel (application hosting), Meta (WhatsApp API), and Resend (email notifications) to operate our platform.
              These providers access data only as necessary to perform their functions.
            </p>
            <p>
              <strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, legal process,
              or governmental request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information,
              including encryption in transit (HTTPS/TLS), secure authentication mechanisms, access controls, and regular
              security monitoring. However, no method of electronic transmission or storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
            <p>
              We retain personal information for as long as necessary to provide our services and fulfill the purposes
              described in this policy. Clinic owners may request deletion of their data at any time. Message logs are
              retained for operational and compliance purposes and may be deleted upon request, subject to any legal
              retention requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may request a copy of
              the data we hold about you. You can opt out of non-essential communications at any time. To exercise
              any of these rights, please contact us at the email address below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
              information from children. If we become aware that we have collected data from a minor, we will take
              steps to delete that information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by
              posting the updated policy on this page with a revised &quot;Last updated&quot; date. Your continued use of
              our services after changes are posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us:
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
            <a href="/privacy" className="hover:text-gray-900 transition-colors font-medium text-gray-900">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
