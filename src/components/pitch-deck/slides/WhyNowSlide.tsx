import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

export default function WhyNowSlide() {
  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0a1510 0%, #081210 40%, #0a0a0f 100%)' }}>
        <div className="absolute top-[20%] left-[60%] w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(80,200,140,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Why Now</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-16 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            The timing is <span style={{ color: '#F5C842' }}>perfect.</span>
          </h2>

          <div className="grid grid-cols-2 gap-8 max-w-[1400px]">
            <div className="rounded-[28px] p-12" style={glass}>
              <span className="text-[56px] block mb-6">📉</span>
              <h3 className="text-[30px] font-semibold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>AI costs are plummeting</h3>
              <p className="text-[20px] text-white/40 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                AI tokens are cheaper now than a year ago, and they'll keep getting cheaper as we scale. What was prohibitively expensive for SMEs is now within reach.
              </p>
            </div>
            <div className="rounded-[28px] p-12" style={glass}>
              <span className="text-[56px] block mb-6">⏳</span>
              <h3 className="text-[30px] font-semibold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SMEs haven't caught up</h3>
              <p className="text-[20px] text-white/40 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Small businesses need a tool like this and simply haven't kept pace with technical advancements. They're ready for a solution that meets them where they are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
