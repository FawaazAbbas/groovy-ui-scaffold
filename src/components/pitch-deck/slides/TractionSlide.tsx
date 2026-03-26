import SlideLayout from '../SlideLayout';

export default function TractionSlide() {
  return (
    <SlideLayout className="bg-background">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Progress</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-16">
          Building fast, validating faster.
        </h2>

        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          <div className="glass-elevated rounded-2xl p-8 neon-border">
            <span className="text-[20px] font-semibold text-electric-bright block mb-3">Clients</span>
            <span className="text-[48px] font-bold text-text-primary leading-none block mb-3">2 won, 3 engaged</span>
            <span className="text-[20px] text-text-secondary leading-relaxed">Two paying clients onboarded. Three more engaged as early testers.</span>
          </div>

          <div className="glass-elevated rounded-2xl p-8 neon-border">
            <span className="text-[20px] font-semibold text-electric-bright block mb-3">Waitlist</span>
            <span className="text-[48px] font-bold text-text-primary leading-none block mb-3">5,343 sign-ups</span>
            <span className="text-[20px] text-text-secondary leading-relaxed">Acquired via Reddit and paid marketing at <span className="text-electric-bright font-semibold">$0.14 per lead</span>. 3 free AI agents promised post sign-up.</span>
          </div>

          <div className="glass-elevated rounded-2xl p-8 neon-border">
            <span className="text-[20px] font-semibold text-electric-bright block mb-3">Architecture</span>
            <span className="text-[48px] font-bold text-text-primary leading-none block mb-3">Nearly complete</span>
            <span className="text-[20px] text-text-secondary leading-relaxed">Core orchestration built. Agents built for current clients. First client fully onboarded by start of next week.</span>
          </div>

          <div className="glass-elevated rounded-2xl p-8 neon-border">
            <span className="text-[20px] font-semibold text-electric-bright block mb-3">MVP</span>
            <span className="text-[48px] font-bold text-text-primary leading-none block mb-3">2 weeks out</span>
            <span className="text-[20px] text-text-secondary leading-relaxed">Fully working MVP with marketplace, agent deployment, and workspace integrations ready in 2 weeks.</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
