import SlideLayout from '../SlideLayout';

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(40px) saturate(1.8)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
};

export default function TeamSlide() {
  const founders = [
    { name: 'Yunlan', role: 'Co-founder', bg: 'Ex-Citadel', initials: 'Y' },
    { name: 'Fawaaz', role: 'Co-founder', bg: 'Ex-Ecom', initials: 'F' },
  ];

  return (
    <SlideLayout>
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(145deg, #0d0a15 0%, #0a0d18 50%, #0a0a0f 100%)' }}>
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(140,100,255,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <span className="text-[14px] font-medium tracking-[0.2em] uppercase text-white/35 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Founders</span>
          <h2 className="text-[72px] font-bold leading-[1.05] text-white mb-20 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            The team behind Groovy.
          </h2>

          <div className="flex gap-10">
            {founders.map((f) => (
              <div key={f.name} className="rounded-[28px] p-12 flex flex-col items-center w-[340px]" style={glass}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8" style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)' }}>
                  <span className="text-[36px] font-bold" style={{ color: '#F5C842', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f.initials}</span>
                </div>
                <span className="text-[30px] font-semibold text-white block mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f.name}</span>
                <span className="text-[20px] block mb-3" style={{ color: '#F5C842', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f.role}</span>
                <span className="text-[18px] text-white/35" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{f.bg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
