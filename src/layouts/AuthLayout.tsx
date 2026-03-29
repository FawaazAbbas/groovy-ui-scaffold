import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background overflow-y-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      {/* Subtle background glow */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] rounded-full opacity-20 bg-[radial-gradient(circle,rgba(200,0,223,0.12)_0%,transparent_70%)] filter blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] rounded-full opacity-20 bg-[radial-gradient(circle,rgba(0,183,255,0.10)_0%,transparent_70%)] filter blur-3xl mix-blend-multiply" />
      </div>
      <div className="relative z-10 w-full max-w-[420px] sm:max-w-md md:max-w-lg">
        <Outlet />
      </div>
    </div>
  );
}

