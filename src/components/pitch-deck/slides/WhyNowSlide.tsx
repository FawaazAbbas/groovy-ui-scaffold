import SlideLayout from '../SlideLayout';

export default function WhyNowSlide() {
  return (
    <SlideLayout className="bg-background retro-grid">
      <div className="relative z-10 flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Why Now</span>
        <h2 className="text-[72px] font-bold leading-[1.1] text-text-primary mb-16">
          The timing is <span className="text-electric-bright">perfect.</span>
        </h2>

        <div className="grid grid-cols-2 gap-12 max-w-[1400px]">
          <div className="glass-elevated rounded-2xl p-10 neon-border">
            <span className="text-[48px] block mb-6">📉</span>
            <h3 className="text-[32px] font-semibold text-text-primary mb-4">AI costs are plummeting</h3>
            <p className="text-[22px] text-text-secondary leading-relaxed">
              AI tokens are cheaper now than a year ago, and they'll keep getting cheaper as we scale. What was prohibitively expensive for SMEs is now within reach.
            </p>
          </div>

          <div className="glass-elevated rounded-2xl p-10 neon-border">
            <span className="text-[48px] block mb-6">⏳</span>
            <h3 className="text-[32px] font-semibold text-text-primary mb-4">SMEs haven't caught up</h3>
            <p className="text-[22px] text-text-secondary leading-relaxed">
              Small businesses need a tool like this and simply haven't kept pace with technical advancements. They're ready for a solution that meets them where they are.
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
