import SlideLayout from '../SlideLayout';

export default function TitleSlide() {
  return (
    <SlideLayout className="bg-background retro-grid">
      <div className="relative z-10 flex flex-col justify-center h-full px-[160px]">
        <div className="flex items-center gap-5 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-electric-bright to-electric flex items-center justify-center neon-glow-md">
            <span className="text-[32px] font-bold text-background">G</span>
          </div>
          <span className="text-[28px] font-semibold tracking-widest uppercase text-text-secondary">Groovy</span>
        </div>
        <h1 className="text-[96px] font-bold leading-[1.05] text-text-primary max-w-[1200px]">
          Your AI workforce,<br />
          <span className="text-electric-bright">orchestrated.</span>
        </h1>
        <p className="text-[32px] text-text-secondary mt-10 max-w-[800px] leading-relaxed">
          Deploy, manage, and scale autonomous agents from a single command center.
        </p>
        <div className="mt-16 flex items-center gap-6">
          <div className="px-10 py-5 rounded-xl bg-electric-bright text-background text-[24px] font-semibold neon-glow-sm">
            Get Started
          </div>
          <span className="text-[20px] text-text-secondary">Series A · 2025</span>
        </div>
      </div>
    </SlideLayout>
  );
}
