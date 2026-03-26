import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

const glassBright = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
};

export default function CompetitiveSlide() {
  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(150deg, #0f0a18 0%, #0d0d18 40%, #0a0a0f 100%)' }}>
        <div className="absolute top-[30%] left-[50%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(200,100,255,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex h-full">
          {/* Left: our strengths */}
          <div className="flex flex-col justify-center w-[48%] pl-[140px] pr-[40px]">
            <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Why Us</span>
            <h2 className="text-[64px] font-bold leading-[1.05] text-white mb-12 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Built different.
            </h2>
            <div className="rounded-[28px] p-10" style={glassBright}>
              <div className="space-y-5">
                {[
                  '2-click Slack integration',
                  'Narrow-spec AI agents — precision over generality',
                  'Unlimited context per agent',
                  'Integration with any agent framework',
                  'Works with Slack, Teams, Lark & Groovy Space',
                  'LLM model switching by task complexity',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="text-[18px] mt-0.5 shrink-0" style={{ color: '#F5C842' }}>✓</span>
                    <span className="text-[18px] text-white/50 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: competitors */}
          <div className="flex flex-col justify-center w-[52%] pr-[120px] pl-[40px]">
            <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/25 mb-8" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Competition</span>
            <div className="space-y-4">
              {[
                { name: 'Paperclip', note: 'Built for technical users with very small companies. Not targeting the SME market we serve.' },
                { name: 'Motion', note: 'Broad-spec agents that are internally simple workflows. Lacks depth of narrow-spec specialisation.' },
                { name: 'Claude', note: 'Brilliant tool, but can\'t run multiple tasks simultaneously and isn\'t designed for company-wide use.' },
                { name: 'n8n', note: 'Business owners have to learn how to build and optimise AI agents themselves.' },
              ].map((c) => (
                <div key={c.name} className="rounded-[20px] p-6" style={glass}>
                  <h4 className="text-[20px] font-semibold text-white/70 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{c.name}</h4>
                  <p className="text-[16px] text-white/30 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
