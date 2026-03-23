import SlideLayout from '../SlideLayout';

export default function CTASlide() {
  return (
    <SlideLayout className="bg-gradient-to-br from-[#2A1F0A] via-[#1C1C1E] to-[#1C1C1E]">
      <div className="flex flex-col items-center justify-center h-full text-center px-[200px]">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-[#F5C842] to-[#946800] flex items-center justify-center mb-12">
          <span className="text-[40px] font-bold text-[#1C1C1E]">G</span>
        </div>
        <h2 className="text-[80px] font-bold leading-[1.05] text-[#F5F5F7] mb-8">
          Ready to put your<br />
          team on <span className="text-[#F5C842]">autopilot?</span>
        </h2>
        <p className="text-[28px] text-[#98989D] leading-relaxed max-w-[800px] mb-14">
          Join 180+ teams already using Groovy to reclaim thousands of hours every quarter.
        </p>
        <div className="flex items-center gap-8">
          <div className="px-12 py-5 rounded-xl bg-[#F5C842] text-[#1C1C1E] text-[24px] font-semibold">
            Request a Demo
          </div>
          <div className="px-12 py-5 rounded-xl border-2 border-[#F5C842]/30 text-[#F5C842] text-[24px] font-semibold">
            View Docs
          </div>
        </div>
        <p className="text-[18px] text-[#98989D]/60 mt-16">
          hello@groovy.ai · groovy.ai
        </p>
      </div>
    </SlideLayout>
  );
}
