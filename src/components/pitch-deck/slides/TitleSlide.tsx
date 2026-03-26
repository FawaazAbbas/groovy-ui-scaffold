import SlideLayout from '../SlideLayout';
import { GroovyLogo } from '@/components/ui/GroovyLogo';

export default function TitleSlide() {
  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #1a0a2e 0%, #0d0d1a 40%, #0a0a0f 100%)' }}>
        {/* Floating glass orbs */}
        <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(168,130,255,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(100,180,255,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[60%] left-[50%] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="w-20 h-20 rounded-[22px] flex items-center justify-center mb-8" style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.9), rgba(200,160,40,0.8))', boxShadow: '0 0 60px rgba(245,200,66,0.3)' }}>
            <GroovyLogo className="h-10 w-10 text-black" />
          </div>
          <span className="text-[15px] font-medium tracking-[0.3em] uppercase text-white/40 mb-12" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Groovy</span>
          <h1 className="text-[96px] font-bold leading-[1.05] text-white max-w-[1100px] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            AI employees, but better
            <br />
            and more <span style={{ color: '#F5C842' }}>accessible.</span>
          </h1>
        </div>
      </div>
    </SlideLayout>
  );
}
