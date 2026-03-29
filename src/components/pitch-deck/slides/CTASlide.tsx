import SlideLayout from '../SlideLayout';
import { GroovyLogo } from '@/components/ui/GroovyLogo';

export default function CTASlide() {
  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0d0a18 0%, #0a0a12 50%, #080808 100%)' }}>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.25) 0%, transparent 70%)', filter: 'blur(100px)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="mb-10">
            <GroovyLogo className="h-16 w-16" style={{ color: '#C800DF', filter: 'drop-shadow(0 0 25px rgba(200,0,223,0.3))' }} />
          </div>
          <h2 className="text-[96px] font-bold leading-[1.05] text-white mb-6 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Invest in <span style={{ color: '#F5C842' }}>Groovy.</span>
          </h2>
          <p className="text-[28px] text-white/30 mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Please.
          </p>
          <p className="text-[16px] text-white/15 mt-20" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            groovy.ai
          </p>
        </div>
      </div>
    </SlideLayout>
  );
}
