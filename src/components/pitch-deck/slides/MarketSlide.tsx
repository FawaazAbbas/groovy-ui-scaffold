import SlideLayout from '../SlideLayout';

export default function MarketSlide() {
  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(150deg, #15082a 0%, #0d0d20 40%, #080810 100%)' }}>
        <div className="absolute top-[20%] left-[60%] w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(140,80,255,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex h-full">
          <div className="flex flex-col justify-center w-[48%] pl-[140px] pr-[60px]">
            <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Market Opportunity</span>
            <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-10 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              TAM / SAM / SOM
            </h2>
            <p className="text-[22px] text-white/40 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              E-commerce stores with $500K–$5M in revenue using e-commerce builder platforms.
            </p>
          </div>

          <div className="flex items-center justify-center w-[52%] pr-[100px]">
            <div className="relative flex items-center justify-center">
              {/* TAM */}
              <div className="w-[420px] h-[420px] rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
                {/* SAM */}
                <div className="w-[280px] h-[280px] rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                  {/* SOM */}
                  <div className="w-[140px] h-[140px] rounded-full flex items-center justify-center" style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', boxShadow: '0 0 40px rgba(245,200,66,0.1)' }}>
                    <div className="text-center">
                      <span className="text-[24px] font-bold block leading-none" style={{ color: '#F5C842', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>$29M</span>
                      <span className="text-[11px] text-white/35 block mt-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SOM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-8 text-right">
                <span className="text-[36px] font-bold text-white block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>$1.6B</span>
                <span className="text-[14px] text-white/35" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>TAM · 760K stores</span>
              </div>
              <div className="absolute bottom-20 right-0 text-right">
                <span className="text-[28px] font-bold text-white block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>$288M</span>
                <span className="text-[14px] text-white/35" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SAM · 134K in Europe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
