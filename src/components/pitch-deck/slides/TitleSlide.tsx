import SlideLayout from '../SlideLayout';

export default function TitleSlide() {
  return (
    <SlideLayout className="bg-[#1C1C1E]">
      <div className="flex flex-col justify-center h-full px-[160px]">
        <div className="flex items-center gap-5 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#F5C842] to-[#946800] flex items-center justify-center">
            <span className="text-[32px] font-bold text-[#1C1C1E]">G</span>
          </div>
          <span className="text-[28px] font-semibold tracking-widest uppercase text-[#98989D]">Groovy</span>
        </div>
        <h1 className="text-[96px] font-bold leading-[1.05] text-[#F5F5F7] max-w-[1200px]">
          Your AI workforce,<br />
          <span className="text-[#F5C842]">orchestrated.</span>
        </h1>
        <p className="text-[32px] text-[#98989D] mt-10 max-w-[800px] leading-relaxed">
          Deploy, manage, and scale autonomous agents from a single command center.
        </p>
        <div className="mt-16 flex items-center gap-6">
          <div className="px-10 py-5 rounded-xl bg-[#F5C842] text-[#1C1C1E] text-[24px] font-semibold">
            Get Started
          </div>
          <span className="text-[20px] text-[#98989D]">Series A · 2025</span>
        </div>
      </div>
    </SlideLayout>
  );
}
