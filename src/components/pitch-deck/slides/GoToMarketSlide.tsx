import SlideLayout from '../SlideLayout';

export default function GoToMarketSlide() {
  return (
    <SlideLayout className="bg-gradient-to-br from-background via-background to-cyan-muted">
      <div className="flex h-full">
        <div className="flex flex-col justify-center w-[50%] px-[160px]">
          <span className="text-[18px] font-semibold tracking-widest uppercase text-cyan mb-6">Go-to-Market</span>
          <h2 className="text-[56px] font-bold leading-[1.1] text-text-primary mb-10">
            Vertical-first, then expand.
          </h2>
          <p className="text-[24px] text-text-secondary leading-relaxed max-w-[600px] mb-12">
            Begin vertically with marketing and finance agents for e-commerce SMEs, then broaden.
          </p>

          <div className="glass-elevated rounded-2xl p-8 neon-border mb-8">
            <h3 className="text-[22px] font-semibold text-electric-bright mb-4">Lead Generation</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-electric-bright text-[20px] mt-0.5">→</span>
                <p className="text-[20px] text-text-secondary leading-relaxed">
                  A list of the top 22K Shopify websites with their contact emails
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-electric-bright text-[20px] mt-0.5">→</span>
                <p className="text-[20px] text-text-secondary leading-relaxed">
                  Scraping job descriptions for companies that use high-synergy tools — these are companies most likely to convert
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-[50%] pr-[120px] gap-6">
          <span className="text-[18px] font-semibold tracking-widest uppercase text-cyan mb-2">Growth Channels</span>
          {[
            { icon: '📋', title: 'Waitlist Warm-Up', desc: 'Building demand before launch with targeted sign-up flows' },
            { icon: '💬', title: 'Subreddit Engagement', desc: 'Organic community presence in e-commerce and SaaS subreddits' },
            { icon: '📢', title: 'Paid Marketing', desc: 'Google Ads and LinkedIn Ads targeting SME decision-makers' },
          ].map((ch) => (
            <div key={ch.title} className="glass-elevated rounded-2xl p-6 neon-border flex items-start gap-5">
              <span className="text-[36px]">{ch.icon}</span>
              <div>
                <h3 className="text-[22px] font-semibold text-text-primary mb-1">{ch.title}</h3>
                <p className="text-[18px] text-text-secondary leading-relaxed">{ch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
