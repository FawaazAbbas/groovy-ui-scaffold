import SlideLayout from '../SlideLayout';

export default function MarketSlide() {
  return (
    <SlideLayout className="bg-background retro-grid">
      <div className="relative z-10 flex h-full">
        <div className="flex flex-col justify-center w-[50%] px-[160px]">
          <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">Market Opportunity</span>
          <h2 className="text-[64px] font-bold leading-[1.1] text-text-primary mb-10">
            A massive, expanding market.
          </h2>
          <p className="text-[24px] text-text-secondary leading-relaxed max-w-[600px]">
            Enterprise AI automation is projected to grow 38% CAGR through 2030, driven by labour shortages and rising operational costs.
          </p>
        </div>

        <div className="flex items-center justify-center w-[50%] pr-[120px]">
          <div className="relative flex items-center justify-center">
            {/* TAM */}
            <div className="w-[420px] h-[420px] rounded-full border-2 border-electric-bright/15 bg-electric-bright/5 flex items-center justify-center">
              {/* SAM */}
              <div className="w-[280px] h-[280px] rounded-full border-2 border-electric-bright/25 bg-electric-bright/10 flex items-center justify-center">
                {/* SOM */}
                <div className="w-[140px] h-[140px] rounded-full border-2 border-electric-bright/50 bg-electric-bright/20 flex items-center justify-center neon-glow-md">
                  <div className="text-center">
                    <span className="text-[28px] font-bold text-electric-bright block">$2.4B</span>
                    <span className="text-[14px] text-text-secondary block mt-1">SOM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-16 text-right">
              <span className="text-[36px] font-bold text-text-primary block">$180B</span>
              <span className="text-[16px] text-text-secondary">TAM</span>
            </div>
            <div className="absolute bottom-24 right-8 text-right">
              <span className="text-[28px] font-bold text-text-primary block">$32B</span>
              <span className="text-[16px] text-text-secondary">SAM</span>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
