import SlideLayout from '../SlideLayout';

export default function TeamSlide() {
  const founders = [
    {
      name: 'Yunlan',
      role: 'Co-founder',
      bg: 'Ex-Citadel',
      initials: 'Y',
    },
    {
      name: 'Fawaaz',
      role: 'Co-founder',
      bg: 'Ex-Ecom',
      initials: 'F',
    },
  ];

  return (
    <SlideLayout className="bg-background">
      <div className="flex flex-col items-center justify-center h-full px-[200px] text-center">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Founders</span>
        <h2 className="text-[72px] font-bold leading-[1.1] text-text-primary mb-20">
          The team behind Groovy.
        </h2>

        <div className="flex gap-16 justify-center">
          {founders.map((f) => (
            <div key={f.name} className="glass-elevated rounded-2xl p-12 neon-border flex flex-col items-center w-[360px]">
              <div className="w-24 h-24 rounded-full bg-electric-bright/15 border-2 border-electric-bright/30 flex items-center justify-center mb-8">
                <span className="text-[40px] font-bold text-electric-bright">{f.initials}</span>
              </div>
              <span className="text-[32px] font-semibold text-text-primary block mb-2">{f.name}</span>
              <span className="text-[24px] text-electric-bright block mb-3">{f.role}</span>
              <span className="text-[20px] text-text-secondary">{f.bg}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
