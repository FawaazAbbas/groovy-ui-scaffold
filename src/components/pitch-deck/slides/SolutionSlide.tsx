import SlideLayout from '../SlideLayout';

export default function SolutionSlide() {
  return (
    <SlideLayout className="bg-[#1C1C1E]">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-[#F5C842] mb-6">The Solution</span>
        <h2 className="text-[72px] font-bold leading-[1.1] text-[#F5F5F7] mb-6 max-w-[1100px]">
          Autonomous agents that actually <span className="text-[#F5C842]">get things done.</span>
        </h2>
        <p className="text-[28px] text-[#98989D] leading-relaxed max-w-[900px] mb-16">
          Groovy deploys purpose-built AI agents into your existing workflows. They handle the grunt work while your team focuses on what matters.
        </p>

        <div className="grid grid-cols-3 gap-10">
          {[
            {
              icon: '⚡',
              title: 'Instant Deploy',
              desc: 'Agents spin up from a marketplace of pre-built skills. No custom training required.',
            },
            {
              icon: '🔗',
              title: 'Deep Integration',
              desc: 'Connects to Slack, Jira, Gmail, Notion, and 40+ tools your team already uses.',
            },
            {
              icon: '🛡️',
              title: 'Human in the Loop',
              desc: 'Agents escalate decisions. You approve, they execute. Full audit trail included.',
            },
          ].map((card) => (
            <div key={card.title} className="bg-[#2C2C2E]/60 rounded-2xl p-10 border border-[#3A3A3C]/50">
              <span className="text-[48px] block mb-6">{card.icon}</span>
              <h3 className="text-[28px] font-semibold text-[#F5F5F7] mb-3">{card.title}</h3>
              <p className="text-[20px] text-[#98989D] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
