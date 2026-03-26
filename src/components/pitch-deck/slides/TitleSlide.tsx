import SlideLayout from '../SlideLayout';
import { GroovyLogo } from '@/components/ui/GroovyLogo';

export default function TitleSlide() {
  return (
    <SlideLayout className="bg-background retro-grid">
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-[200px]">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-b from-electric-bright to-electric flex items-center justify-center neon-glow-lg mb-10">
          <GroovyLogo className="h-12 w-12 text-background" />
        </div>
        <span className="text-[36px] font-semibold tracking-widest uppercase text-text-secondary mb-8">Groovy</span>
        <h1 className="text-[80px] font-bold leading-[1.1] text-text-primary max-w-[1200px]">
          AI employees, but better<br />
          and more <span className="text-electric-bright">accessible.</span>
        </h1>
      </div>
    </SlideLayout>
  );
}
