export type OSChoice = 'slack' | 'teams' | 'lark' | 'groovy-space';

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;

export type OverlayPhase = 'intro' | 'transitioning' | 'tour' | 'complete';

export interface OnboardingState {
  currentStep: OnboardingStep;
  overlayPhase: OverlayPhase;
  osChoice: OSChoice | null;
  tourStepIndex: number;
  isOnboardingComplete: boolean;
  userName: string;
}

export interface TourStep {
  id: string;
  targetId: string | null;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  page: string;
  isFinal?: boolean;
}
