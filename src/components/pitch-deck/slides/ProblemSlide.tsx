import SlideLayout from '../SlideLayout';

export default function ProblemSlide() {
  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(150deg, #2a0f0f 0%, #1a0a0a 40%, #0d0d0f 100%)' }}>
        <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle, rgba(255,80,60,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex h-full px-[140px]">
          <div className="flex flex-col justify-center flex-1">
            <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>The Problem</span>
            <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-12 max-w-[900px] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              E-commerce SMEs are overwhelmed, under-skilled for AI, and priced out.
            </h2>

            {/* Single glass panel with stats inline */}
            <div className="rounded-[28px] p-10 max-w-[1000px]" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(40px) saturate(1.8)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              <p className="text-[22px] text-white/50 leading-relaxed mb-10" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Small businesses are stuck in the past, using rigid tools and unable to upgrade their systems without massively increasing overhead.
              </p>
              <div className="flex gap-16">
                <div>
                  <span className="text-[64px] font-bold text-white block leading-none tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>$500+</span>
                  <span className="text-[16px] text-white/35 mt-2 block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>cost to build a single AI employee</span>
                </div>
                <div>
                  <span className="text-[64px] font-bold text-white block leading-none tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>84%</span>
                  <span className="text-[16px] text-white/35 mt-2 block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>feel like a "jack of all trades"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
