import SlideLayout from '../SlideLayout';

export default function ProductDemoSlide() {
  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0a0a12 0%, #0d1015 50%, #0a0a0f 100%)' }}>
        <div className="absolute top-[40%] left-[50%] w-[600px] h-[600px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.3) 0%, transparent 70%)', filter: 'blur(100px)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-[160px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Demo</span>
          <h2 className="text-[80px] font-bold leading-[1.05] text-white mb-6 tracking-tight text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Let's show you the <span style={{ color: '#F5C842' }}>workspace.</span>
          </h2>
          <p className="text-[24px] text-white/40 leading-relaxed max-w-[700px] mb-16 text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            A live walkthrough of the Groovy workspace — from agent deployment to real-time task execution.
          </p>

          {/* Browser chrome glass panel */}
          <div className="w-full max-w-[1200px] rounded-[24px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(40px) saturate(1.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,100,100,0.5)' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,200,50,0.5)' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(100,220,100,0.5)' }} />
              <span className="text-[13px] text-white/25 ml-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>groovy.ai/workspace</span>
            </div>
            <div className="flex items-center justify-center h-[360px]">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)' }}>
                  <span className="text-[28px]" style={{ color: '#F5C842' }}>▶</span>
                </div>
                <span className="text-[18px] text-white/25" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
