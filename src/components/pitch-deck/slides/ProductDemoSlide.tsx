import SlideLayout from '../SlideLayout';

export default function ProductDemoSlide() {
  return (
    <SlideLayout className="bg-background">
      <div className="flex flex-col items-center justify-center h-full px-[200px] text-center">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Demo</span>
        <h2 className="text-[80px] font-bold leading-[1.05] text-text-primary mb-10">
          Let's show you the <span className="text-electric-bright">workspace.</span>
        </h2>
        <p className="text-[28px] text-text-secondary leading-relaxed max-w-[800px] mb-16">
          A live walkthrough of the Groovy workspace — from agent deployment to real-time task execution.
        </p>

        {/* Visual placeholder for live demo */}
        <div className="terminal-block rounded-2xl p-10 w-full max-w-[1200px] h-[400px] relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-6 left-8 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-electric-bright/40" />
            <span className="text-[14px] text-text-secondary ml-4 font-mono">groovy.ai/workspace</span>
          </div>
          <div className="text-center">
            <span className="text-[64px] block mb-4">▶</span>
            <span className="text-[24px] text-text-secondary font-mono">Live Demo</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
