import { ScrollText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-24">
      <div className="text-center mb-16">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#C800DF]/10">
          <ScrollText className="h-10 w-10 text-[#C800DF]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">Terms of Service</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Last updated: January 1, 2026
        </p>
      </div>

      <div className="glass-card glass-shimmer p-8 md:p-12 rounded-2xl">
        <div className="prose prose-invert max-w-none prose-p:text-text-secondary prose-headings:text-text-primary prose-a:text-[#C800DF]">
          <h2 className="text-2xl font-bold mt-0">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Groovy Platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>

          <h2 className="text-2xl font-bold">2. Provision of Services</h2>
          <p>
            Groovy Labs reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Groovy Labs shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
          </p>

          <h2 className="text-2xl font-bold">3. Acceptable Use</h2>
          <p>
            You agree not to use the Service to:
          </p>
          <ul>
            <li>Upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, or harassing.</li>
            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
          </ul>

          <h2 className="text-2xl font-bold">4. Intellectual Property</h2>
          <p>
            You acknowledge and agree that the Service and any necessary software used in connection with the Service contain proprietary and confidential information that is protected by applicable intellectual property and other laws.
          </p>
        </div>
      </div>
    </div>
  );
}
