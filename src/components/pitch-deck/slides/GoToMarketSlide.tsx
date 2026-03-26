import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
};

export default function GoToMarketSlide() {
  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(150deg, #0a0d18 0%, #0d1220 40%, #0a0a10 100%)' }}>
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(80,180,255,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex h-full">
          <div className="flex flex-col justify-center w-[48%] pl-[140px] pr-[40px]">
            <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Go-to-Market</span>
            <h2 className="text-[64px] font-bold leading-[1.05] text-white mb-8 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Vertical-first, then expand.
            </h2>
            <p className="text-[22px] text-white/40 leading-relaxed mb-12" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Begin vertically with marketing and finance agents for e-commerce SMEs, then broaden.
            </p>

            <div className="rounded-[24px] p-8" style={glass}>
              <h3 className="text-[20px] font-semibold text-white/70 mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Lead Generation</h3>
              <div className="space-y-4">
                <p className="text-[17px] text-white/35 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  → Top 22K Shopify websites with contact emails
                </p>
                <p className="text-[17px] text-white/35 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  → Scraping job descriptions for companies using high-synergy tools
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center w-[52%] pr-[120px] pl-[40px] gap-5">
            <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/25 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Growth Channels</span>
            {[
              { title: 'Waitlist Warm-Up', desc: 'Building demand before launch with targeted sign-up flows' },
              { title: 'Subreddit Engagement', desc: 'Organic community presence in e-commerce and SaaS subreddits' },
              { title: 'Paid Marketing', desc: 'Google Ads and LinkedIn Ads targeting SME decision-makers' },
            ].map((ch) => (
              <div key={ch.title} className="rounded-[20px] p-7" style={glass}>
                <h3 className="text-[20px] font-semibold text-white/70 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{ch.title}</h3>
                <p className="text-[16px] text-white/35 leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
