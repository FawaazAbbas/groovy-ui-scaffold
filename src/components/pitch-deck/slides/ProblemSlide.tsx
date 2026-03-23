import SlideLayout from '../SlideLayout';

export default function ProblemSlide() {
  return (
    <SlideLayout className="bg-gradient-to-br from-background to-electric-dark">
      <div className="flex h-full">
        <div className="flex flex-col justify-center w-[55%] px-[160px]">
          <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">The Problem</span>
          <h2 className="text-[72px] font-bold leading-[1.1] text-text-primary mb-10">
            Teams are drowning in manual work.
          </h2>
          <p className="text-[28px] text-text-secondary leading-relaxed max-w-[700px]">
            80% of knowledge work is repetitive coordination — scheduling, status updates, data entry, follow-ups. It doesn't have to be.
          </p>
        </div>
        <div className="flex flex-col justify-center w-[45%] pr-[120px] gap-8">
          {[
            { num: '4.5h', label: 'per day lost to context-switching' },
            { num: '67%', label: 'of meetings could be async' },
            { num: '$1.8M', label: 'annual cost per 50-person team in wasted effort' },
          ].map((stat) => (
            <div key={stat.num} className="border-l-[3px] border-electric-bright/30 pl-8 py-4">
              <span className="text-[56px] font-bold text-electric-bright block leading-none">{stat.num}</span>
              <span className="text-[22px] text-text-secondary mt-2 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
