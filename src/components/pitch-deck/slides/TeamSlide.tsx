import SlideLayout from '../SlideLayout';

export default function TeamSlide() {
  const team = [
    { name: 'Alex Chen', role: 'CEO & Co-founder', bg: 'Ex-Google AI, Stanford CS', initials: 'AC' },
    { name: 'Maya Patel', role: 'CTO & Co-founder', bg: 'Ex-Stripe, MIT EECS', initials: 'MP' },
    { name: 'Jordan Lee', role: 'VP Engineering', bg: 'Ex-Datadog, 15yr infra', initials: 'JL' },
    { name: 'Sarah Kim', role: 'VP Product', bg: 'Ex-Notion, Ex-Figma', initials: 'SK' },
    { name: 'David Okoro', role: 'Head of Sales', bg: 'Ex-Salesforce, $50M+ quota', initials: 'DO' },
    { name: 'Lena Müller', role: 'Head of Design', bg: 'Ex-Apple, Ex-Airbnb', initials: 'LM' },
  ];

  return (
    <SlideLayout className="bg-background">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Team</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-16">
          Built by operators, for operators.
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {team.map((t) => (
            <div key={t.name} className="glass-elevated rounded-2xl p-8 neon-border flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-electric-bright/15 border border-electric-bright/30 flex items-center justify-center shrink-0">
                <span className="text-[20px] font-bold text-electric-bright">{t.initials}</span>
              </div>
              <div>
                <span className="text-[22px] font-semibold text-text-primary block">{t.name}</span>
                <span className="text-[18px] text-electric-bright block mt-1">{t.role}</span>
                <span className="text-[16px] text-text-secondary block mt-2">{t.bg}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[18px] text-text-secondary mt-12">
          42 team members · Backed by Sequoia, a16z, and Y Combinator
        </p>
      </div>
    </SlideLayout>
  );
}
