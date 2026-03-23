import { useOnboarding } from '@/contexts/OnboardingContext';
import { StepTransition } from './StepTransition';
import { GuidedSpotlight } from './GuidedSpotlight';
import { OnboardingProgress } from './OnboardingProgress';
import { HeyContent } from './steps/HeyContent';
import { IntroContent } from './steps/IntroContent';
import { OSChoiceContent } from './steps/OSChoiceContent';
import { TwoClickContent } from './steps/TwoClickContent';
import type { ReactNode } from 'react';

export function OnboardingOverlay() {
  const { currentStep, overlayPhase, isOnboardingComplete, skipOnboarding, prevStep } = useOnboarding();

  if (isOnboardingComplete || overlayPhase === 'complete') return null;

  if (overlayPhase === 'tour') {
    return <GuidedSpotlight />;
  }

  if (overlayPhase === 'transitioning') {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-background"
        style={{
          animation: 'onb-fade-out 600ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        }}
      />
    );
  }

  const stepContent: Record<1 | 2 | 3 | 4, ReactNode> = {
    1: <HeyContent />,
    2: <IntroContent />,
    3: <OSChoiceContent />,
    4: <TwoClickContent />,
  };

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto bg-background"
    >
      {currentStep > 1 && (
        <button
          onClick={skipOnboarding}
          className="fixed top-6 right-6 z-[10000] text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          Skip
        </button>
      )}

      {currentStep > 1 && (
        <button
          onClick={prevStep}
          className="fixed top-6 left-6 z-[10000] text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          ← Back
        </button>
      )}

      {currentStep >= 2 && currentStep <= 4 && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000]">
          <OnboardingProgress currentStep={currentStep} totalSteps={4} />
        </div>
      )}

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
