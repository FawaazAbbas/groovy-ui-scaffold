import TitleSlide from './TitleSlide';
import ProblemSlide from './ProblemSlide';
import SolutionSlide from './SolutionSlide';
import HowItWorksSlide from './HowItWorksSlide';
import TractionSlide from './TractionSlide';
import CTASlide from './CTASlide';

export const slides = [
  { id: 'title', label: 'Title', component: TitleSlide },
  { id: 'problem', label: 'Problem', component: ProblemSlide },
  { id: 'solution', label: 'Solution', component: SolutionSlide },
  { id: 'how-it-works', label: 'How It Works', component: HowItWorksSlide },
  { id: 'traction', label: 'Traction', component: TractionSlide },
  { id: 'cta', label: 'Get Started', component: CTASlide },
];
