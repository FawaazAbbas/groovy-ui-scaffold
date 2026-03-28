import { useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { StepTransition } from './StepTransition';
import { GuidedSpotlight } from './GuidedSpotlight';
import { OnboardingProgress } from './OnboardingProgress';
import { HeyContent } from './steps/HeyContent';
import { ValuePropsContent } from './steps/ValuePropsContent';
import { OSChoiceContent } from './steps/OSChoiceContent';
import { PricingContent } from './steps/PricingContent';
import { SignUpContent } from './steps/SignUpContent';
import { WorkspaceSetupContent } from './steps/WorkspaceSetupContent';
import { ConnectIntegrationContent } from './steps/ConnectIntegrationContent';
import type { OnboardingStepId } from '@/types/onboarding';
import type { ReactNode } from 'react';

const stepComponents: Record<Exclude<OnboardingStepId, 'tour'>, ReactNode> = {
  'hey': <HeyContent />,
  'value-props': <ValuePropsContent />,
  'pricing': <PricingContent />,
  'sign-up': <SignUpContent />,
  'workspace-setup': <WorkspaceSetupContent />,
  'os-choice': <OSChoiceContent />,
  'connect-integration': <ConnectIntegrationContent />,
};

const wideSteps = new Set<OnboardingStepId>(['pricing']);
const mediumSteps = new Set<OnboardingStepId>([]);

function getMaxWidth(stepId: OnboardingStepId): string {
  if (wideSteps.has(stepId)) return 'max-w-5xl';
  if (mediumSteps.has(stepId)) return 'max-w-3xl';
  return 'max-w-2xl';
}

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
  const isHey = currentStepId === 'hey';
  const showProgress = !isHey && currentStepId !== 'tour';
  const isPricing = currentStepId === 'pricing';
  const maxWidth = getMaxWidth(currentStepId);

  // Progress index excludes 'hey' — shift index by 1
  const progressIndex = currentStepIndex > 0 ? currentStepIndex - 1 : 0;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-background">
      <button
        onClick={skipOnboarding}
        className="fixed top-6 right-6 z-[10000] flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-all duration-200"
        aria-label="Skip onboarding"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="4" y1="4" x2="12" y2="12" />
          <line x1="12" y1="4" x2="4" y2="12" />
        </svg>
      </button>

      {!isHey && (
        <button
          onClick={prevStep}
          className="fixed top-6 left-6 z-[10000] text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          &larr; Back
        </button>
      )}

      {showProgress && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000]">
          <OnboardingProgress currentStep={progressIndex} totalSteps={totalSteps} />
        </div>
      )}

      <div className={`min-h-screen flex items-center justify-center ${isPricing ? 'px-4 py-16' : 'px-6'}`}>
        <div className={`w-full ${maxWidth}`}>
          <StepTransition stepKey={currentStepId}>
            {stepComponents[currentStepId as Exclude<OnboardingStepId, 'tour'>]}
          </StepTransition>
        </div>
      </div>
    </div>
  );
}
