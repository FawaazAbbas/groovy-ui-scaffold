export type OSChoice = 'slack' | 'teams' | 'lark' | 'groovy-space';

export type OnboardingStepId =
  | 'hey'
  | 'intro'
  | 'os-choice'
  | 'pricing'
  | 'two-click'
  | 'explore-marketplace'
  | 'workspace-setup'
  | 'tour';

export type OverlayPhase = 'idle' | 'intro' | 'transitioning' | 'tour' | 'complete';

export interface SignUpFormData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  companySize: string;
  industry: string;
  roleTitle: string;
  selectedPlan: string;
}

export interface OnboardingState {
  currentStepId: OnboardingStepId;
  overlayPhase: OverlayPhase;
  osChoice: OSChoice | null;
  tourStepIndex: number;
  isOnboardingComplete: boolean;
  userName: string;
  signUpData: SignUpFormData | null;
}

export interface TourStep {
  id: string;
  targetId: string | null;
  title: string;
  description: string;
  instruction?: string; // "Click the agent card" — shown instead of Next button
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  page: string;
  isFinal?: boolean;
  passthrough?: boolean; // also fire a real click on the target element so the page responds
  showContinue?: boolean; // show a "Continue →" button on center-modal steps that aren't the final step
}
