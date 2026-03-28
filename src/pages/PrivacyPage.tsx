import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-24">
      <div className="text-center mb-16">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#C800DF]/10">
          <ShieldCheck className="h-10 w-10 text-[#C800DF]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">Privacy Policy</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          We take your privacy and data security seriously.
        </p>
      </div>

      <div className="glass-card glass-shimmer p-8 md:p-12 rounded-2xl">
        <div className="prose prose-invert max-w-none prose-p:text-text-secondary prose-headings:text-text-primary prose-a:text-[#C800DF]">
          <h2 className="text-2xl font-bold mt-0">Introduction</h2>
          <p>
            At Groovy Labs, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          <h2 className="text-2xl font-bold">Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2 className="text-2xl font-bold">How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="text-2xl font-bold">Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. Data processed by Groovy AI Agents remains strictly within your enterprise tenant and is not used to train our base models.
          </p>
        </div>
      </div>
    </div>
  );
}
