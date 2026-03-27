import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function AuthLayout() {
  const { overlayPhase, skipOnboarding } = useOnboarding();

  // If the user reaches the auth pages while an onboarding tour/overlay is active,
  // we must cancel it to prevent them from being blocked by the "tinted" screen
  // overlay since they cannot proceed without authenticating.
  useEffect(() => {
    if (overlayPhase !== 'idle' && overlayPhase !== 'complete') {
      skipOnboarding();
    }
  }, [overlayPhase, skipOnboarding]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-lg px-6">
        <Outlet />
      </div>
    </div>
  );
}

