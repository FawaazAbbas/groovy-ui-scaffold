import SlideLayout from '../SlideLayout';

export default function TractionSlide() {
  const metrics = [
    { value: '2,400+', label: 'Active agents deployed', sub: 'across 180 teams' },
    { value: '94%', label: 'Task completion rate', sub: 'vs. 67% industry avg' },
    { value: '3.2x', label: 'Team productivity gain', sub: 'within first 30 days' },
    { value: '$4.2M', label: 'ARR', sub: '12x growth YoY' },
  ];

  return (
    <SlideLayout className="bg-[#1C1C1E]">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <span className="text-[18px] font-semibold tracking-widest uppercase text-[#F5C842] mb-6">Traction</span>
        <h2 className="text-[64px] font-bold leading-[1.1] text-[#F5F5F7] mb-20">
          Already proving the model.
        </h2>

        <div className="grid grid-cols-2 gap-x-20 gap-y-14">
          {metrics.map((m) => (
            <div key={m.label}>
              <span className="text-[72px] font-bold text-[#F5C842] leading-none block">{m.value}</span>
              <span className="text-[26px] font-medium text-[#F5F5F7] mt-3 block">{m.label}</span>
              <span className="text-[20px] text-[#98989D] mt-1 block">{m.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
