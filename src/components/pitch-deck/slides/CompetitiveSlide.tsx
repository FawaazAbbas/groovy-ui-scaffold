import SlideLayout from '../SlideLayout';

export default function CompetitiveSlide() {
  return (
    <SlideLayout className="bg-gradient-to-br from-background to-electric-dark">
      <div className="flex h-full">
        {/* Left: Why we're the best */}
        <div className="flex flex-col justify-center w-[50%] px-[160px]">
          <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Why We're the Best</span>
          <h2 className="text-[56px] font-bold leading-[1.1] text-text-primary mb-12">
            Built different.
          </h2>

          <div className="space-y-5">
            {[
              '2-click solution to integrate with Slack',
              'Narrow-spec AI agents — precision over generality',
              'Unlimited context per agent',
              'Integration with any agent framework',
              'Works with Slack, Teams, Lark, and Groovy Space',
              'LLM model switching based on task complexity',
            ].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <span className="text-electric-bright text-[22px] mt-0.5 shrink-0">✓</span>
                <span className="text-[22px] text-text-secondary leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Competition */}
        <div className="flex flex-col justify-center w-[50%] pr-[120px]">
          <span className="text-[18px] font-semibold tracking-widest uppercase text-text-secondary mb-8">Competition</span>

          <div className="space-y-6">
            <div>
              <span className="text-[16px] font-semibold tracking-widest uppercase text-electric-bright/60 block mb-4">Direct</span>
              <div className="space-y-4">
                <div className="glass-elevated rounded-xl p-6 neon-border">
                  <h4 className="text-[22px] font-semibold text-text-primary mb-2">Paperclip</h4>
                  <p className="text-[18px] text-text-secondary leading-relaxed">Built for technical users with very small companies. Not targeting the SME market we serve.</p>
                </div>
                <div className="glass-elevated rounded-xl p-6 neon-border">
                  <h4 className="text-[22px] font-semibold text-text-primary mb-2">Motion</h4>
                  <p className="text-[18px] text-text-secondary leading-relaxed">Broad-spec agents that are internally simple workflows. Lacks the depth of narrow-spec specialisation.</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[16px] font-semibold tracking-widest uppercase text-electric-bright/60 block mb-4">Indirect</span>
              <div className="space-y-4">
                <div className="glass-elevated rounded-xl p-6 neon-border">
                  <h4 className="text-[22px] font-semibold text-text-primary mb-2">Claude</h4>
                  <p className="text-[18px] text-text-secondary leading-relaxed">Brilliant tool, but can't run multiple tasks simultaneously, holds limited context, and isn't designed for company-wide use.</p>
                </div>
                <div className="glass-elevated rounded-xl p-6 neon-border">
                  <h4 className="text-[22px] font-semibold text-text-primary mb-2">n8n</h4>
                  <p className="text-[18px] text-text-secondary leading-relaxed">Business owners have to learn how to build and optimise AI agents themselves. Hard to get right without domain expertise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
