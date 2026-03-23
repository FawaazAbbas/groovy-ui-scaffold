import SlideLayout from '../SlideLayout';

export default function HowItWorksSlide() {
  const steps = [
    {
      num: '01',
      title: 'Browse & Deploy',
      desc: 'Pick agents from the marketplace. Configure permissions and connect your tools.',
    },
    {
      num: '02',
      title: 'Orchestrate',
      desc: 'Chain agents together into workflows. Set triggers, conditions, and escalation rules.',
    },
    {
      num: '03',
      title: 'Monitor & Scale',
      desc: 'Track performance in real-time. Scale up agents as your team grows.',
    },
  ];

  return (
    <SlideLayout className="bg-gradient-to-br from-[#1C1C1E] via-[#1C1C1E] to-[#0F1A2E]">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-[#F5C842] mb-6">How It Works</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-[#F5F5F7] mb-20">
          Three steps to an autonomous team.
        </h2>

        <div className="flex items-start gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="flex-1 flex flex-col">
              {/* Connector line */}
              <div className="flex items-center mb-10">
                <div className="w-[72px] h-[72px] rounded-full bg-[#F5C842]/10 border-2 border-[#F5C842]/40 flex items-center justify-center">
                  <span className="text-[28px] font-bold text-[#F5C842]">{step.num}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#F5C842]/30 to-[#F5C842]/5 ml-4" />
                )}
              </div>
              <h3 className="text-[32px] font-semibold text-[#F5F5F7] mb-4">{step.title}</h3>
              <p className="text-[22px] text-[#98989D] leading-relaxed pr-8">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
