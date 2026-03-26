import SlideLayout from '../SlideLayout';

export default function ProblemSlide() {
  return (
    <SlideLayout className="bg-gradient-to-br from-background to-electric-dark">
      <div className="flex h-full">
        <div className="flex flex-col justify-center w-[55%] px-[160px]">
          <span className="text-[18px] font-semibold tracking-widest uppercase text-electric-bright mb-6">The Problem</span>
          <h2 className="text-[60px] font-bold leading-[1.1] text-text-primary mb-10">
            E-commerce SMEs are overwhelmed, under-skilled for AI, and priced out.
          </h2>
          <p className="text-[24px] text-text-secondary leading-relaxed max-w-[700px]">
            Small businesses are stuck in the past, using rigid tools and unable to upgrade their systems without massively increasing overhead. Narrow-spec AI solutions price them out entirely.
          </p>
        </div>
        <div className="flex flex-col justify-center w-[45%] pr-[120px] gap-8">
          {[
            { num: '$500+', label: 'typical cost to hire developers to build a single AI employee' },
            { num: '84%', label: 'of small business owners feel like a "jack of all trades," juggling multiple roles' },
          ].map((stat) => (
            <div key={stat.num} className="border-l-[3px] border-electric-bright/30 pl-8 py-4">
              <span className="text-[56px] font-bold text-electric-bright block leading-none">{stat.num}</span>
              <span className="text-[20px] text-text-secondary mt-3 block leading-relaxed">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
