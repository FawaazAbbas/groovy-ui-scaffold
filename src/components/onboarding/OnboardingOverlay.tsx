import { useOnboarding } from '@/contexts/OnboardingContext';
import { StepTransition } from './StepTransition';
import { GuidedSpotlight } from './GuidedSpotlight';
import { OnboardingProgress } from './OnboardingProgress';
import { HeyContent } from './steps/HeyContent';
import { IntroContent } from './steps/IntroContent';
import { OSChoiceContent } from './steps/OSChoiceContent';
import { TwoClickContent } from './steps/TwoClickContent';
import { SecondaryButton } from './SecondaryButton';
import type { ReactNode } from 'react';

export function OnboardingOverlay() {
  const { currentStep, overlayPhase, isOnboardingComplete, skipOnboarding, prevStep } = useOnboarding();

  // Don't render if onboarding is done
  if (isOnboardingComplete || overlayPhase === 'complete') return null;

  // PHASE 2: Guided tour
  if (overlayPhase === 'tour') {
    return <GuidedSpotlight />;
  }

  // PHASE TRANSITION: Parchment fading out
  if (overlayPhase === 'transitioning') {
    return (
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          background: 'var(--onb-parchment)',
          animation: 'onb-fade-out 600ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        }}
      />
    );
  }

  // PHASE 1: Intro steps
  const stepContent: Record<1 | 2 | 3 | 4, ReactNode> = {
    1: <HeyContent />,
    2: <IntroContent />,
    3: <OSChoiceContent />,
    4: <TwoClickContent />,
  };

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      style={{ background: 'var(--onb-parchment)' }}
    >
      {/* Skip button — top right, steps 2–4 */}
      {currentStep > 1 && (
        <button
          onClick={skipOnboarding}
          className="fixed top-6 right-6 z-[10000] text-[14px] font-medium transition-colors duration-200"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: 'var(--onb-warm-brown)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--onb-charcoal)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--onb-warm-brown)'; }}
        >
          Skip
        </button>
      )}

      {/* Back button — top left, steps 2–4 */}
      {currentStep > 1 && (
        <div className="fixed top-6 left-6 z-[10000]">
          <SecondaryButton onClick={prevStep}>
            ← Back
          </SecondaryButton>
        </div>
      )}

      {/* Progress dots — steps 2–4, top centre */}
      {currentStep >= 2 && currentStep <= 4 && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000]">
          <OnboardingProgress currentStep={currentStep} totalSteps={4} />
        </div>
      )}

      {/* Step content — centred */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          <StepTransition stepKey={currentStep}>
            {stepContent[currentStep as 1 | 2 | 3 | 4]}
          </StepTransition>
        </div>
      </div>
    </div>
  );
}
