import SlideLayout from '../SlideLayout';

export default function CTASlide() {
  return (
    <SlideLayout className="bg-gradient-to-br from-comfort via-background to-background">
      <div className="flex flex-col items-center justify-center h-full text-center px-[200px]">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-electric-bright to-electric flex items-center justify-center mb-12 neon-glow-lg">
          <span className="text-[40px] font-bold text-background">G</span>
        </div>
        <h2 className="text-[80px] font-bold leading-[1.05] text-text-primary mb-8">
          Ready to put your<br />
          team on <span className="text-electric-bright">autopilot?</span>
        </h2>
        <p className="text-[28px] text-text-secondary leading-relaxed max-w-[800px] mb-14">
          Join 180+ teams already using Groovy to reclaim thousands of hours every quarter.
        </p>
        <div className="flex items-center gap-8">
          <div className="px-12 py-5 rounded-xl bg-electric-bright text-background text-[24px] font-semibold neon-glow-sm">
            Request a Demo
          </div>
          <div className="px-12 py-5 rounded-xl neon-border text-electric-bright text-[24px] font-semibold">
            View Docs
          </div>
        </div>
        <p className="text-[18px] text-text-secondary/60 mt-16">
          hello@groovy.ai · groovy.ai
        </p>
      </div>
    </SlideLayout>
  );
}
