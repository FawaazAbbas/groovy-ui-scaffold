import SlideLayout from '../SlideLayout';
import { GroovyLogo } from '@/components/ui/GroovyLogo';

export default function CTASlide() {
  return (
    <SlideLayout className="bg-gradient-to-br from-comfort via-background to-background">
      <div className="flex flex-col items-center justify-center h-full text-center px-[200px]">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-electric-bright to-electric flex items-center justify-center mb-12 neon-glow-lg">
          <GroovyLogo className="h-10 w-10 text-background" />
        </div>
        <h2 className="text-[80px] font-bold leading-[1.05] text-text-primary mb-8">
          Invest in <span className="text-electric-bright">Groovy.</span>
        </h2>
        <p className="text-[32px] text-text-secondary leading-relaxed max-w-[800px] mb-4">
          Please.
        </p>
        <p className="text-[18px] text-text-secondary/60 mt-16">
          groovy.ai
        </p>
      </div>
    </SlideLayout>
  );
}
