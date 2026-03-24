import { useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { StepTransition } from './StepTransition';
import { GuidedSpotlight } from './GuidedSpotlight';
import { OnboardingProgress } from './OnboardingProgress';
import { HeyContent } from './steps/HeyContent';
import { IntroContent } from './steps/IntroContent';
import { OSChoiceContent } from './steps/OSChoiceContent';
import { TwoClickContent } from './steps/TwoClickContent';
import { PricingContent } from './steps/PricingContent';
import { WorkspaceSetupContent } from './steps/WorkspaceSetupContent';
import { ExploreMarketplaceContent } from './steps/ExploreMarketplaceContent';
import type { OnboardingStepId } from '@/types/onboarding';
import type { ReactNode } from 'react';

const stepComponents: Record<Exclude<OnboardingStepId, 'tour'>, ReactNode> = {
  'hey': <HeyContent />,
  'intro': <IntroContent />,
  'os-choice': <OSChoiceContent />,
  'pricing': <PricingContent />,
  'two-click': <TwoClickContent />,
  'workspace-setup': <WorkspaceSetupContent />,
  'explore-marketplace': <ExploreMarketplaceContent />,
};

export function OnboardingOverlay() {
  const {
    currentStepId,
    overlayPhase,
    isOnboardingComplete,
    currentStepIndex,
    totalSteps,
    skipOnboarding,
    prevStep,
  } = useOnboarding();

  // Add/remove onboarding-active class on body during tour to disable global transitions
  useEffect(() => {
    if (overlayPhase === 'tour') {
      document.body.classList.add('onboarding-active');
      return () => document.body.classList.remove('onboarding-active');
    }
    document.body.classList.remove('onboarding-active');
  }, [overlayPhase]);

  // Don't render anything when idle or complete
  if (overlayPhase === 'idle' || overlayPhase === 'complete' || isOnboardingComplete) return null;

  // Tour phase — hand off to spotlight
  if (overlayPhase === 'tour') {
    return <GuidedSpotlight />;
  }

  // Transitioning — quick fade
  if (overlayPhase === 'transitioning') {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-background"
        style={{
          animation: 'onb-fade-out 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}
      />
    );
  }

  // Intro phase — step content
  const showNav = currentStepId !== 'hey';
  const showProgress = currentStepId !== 'hey' && currentStepId !== 'tour';
  const isPricing = currentStepId === 'pricing';

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-background">
      {showNav && (
        <button
          onClick={skipOnboarding}
          className="fixed top-6 right-6 z-[10000] text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          Skip
        </button>
      )}

      {showNav && (
        <button
          onClick={prevStep}
          className="fixed top-6 left-6 z-[10000] text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          &larr; Back
        </button>
      )}

      {showProgress && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000]">
          <OnboardingProgress currentStep={currentStepIndex} totalSteps={totalSteps} />
        </div>
      )}

      <div className={`min-h-screen flex items-center justify-center ${isPricing ? 'px-4 py-16' : 'px-6'}`}>
        <div className={`w-full ${isPricing ? 'max-w-5xl' : 'max-w-2xl'}`}>
          <StepTransition stepKey={currentStepId}>
            {stepComponents[currentStepId as Exclude<OnboardingStepId, 'tour'>]}
          </StepTransition>
        </div>
      </div>
    </div>
  );
}
