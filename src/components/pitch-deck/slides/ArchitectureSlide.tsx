import SlideLayout from '../SlideLayout';

const glassBar = (opacity: number) => ({
  background: `rgba(255,255,255,${opacity})`,
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
});

export default function ArchitectureSlide() {
  const layers = [
    { label: 'Integrations', items: ['Slack', 'Jira', 'Gmail', 'Notion', 'GitHub', 'Salesforce'], opacity: 0.03 },
    { label: 'Orchestration Engine', items: ['Task Router', 'Priority Queue', 'Escalation Logic'], opacity: 0.05 },
    { label: 'Agent Runtime', items: ['Scheduling', 'Data Pipeline', 'Support', 'Analytics', 'Compliance'], opacity: 0.04 },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(150deg, #080d1a 0%, #0a1020 50%, #0a0a10 100%)' }}>
        <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(80,140,255,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex flex-col justify-center h-full px-[140px]">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Architecture</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-16 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Built for reliability at scale.
          </h2>

          <div className="flex flex-col gap-5">
            {layers.map((layer) => (
              <div key={layer.label}>
                <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-white/25 mb-3 block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{layer.label}</span>
                <div className="flex gap-3 rounded-[20px] p-5" style={glassBar(layer.opacity)}>
                  {layer.items.map((item) => (
                    <div key={item} className="flex-1 rounded-[14px] px-5 py-4 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-[16px] font-medium text-white/60" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-10">
            <div className="w-2 h-2 rounded-full" style={{ background: '#F5C842', boxShadow: '0 0 10px rgba(245,200,66,0.4)' }} />
            <span className="text-[14px] text-white/30" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SOC 2 Type II compliant · 99.99% SLA · End-to-end encryption</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
