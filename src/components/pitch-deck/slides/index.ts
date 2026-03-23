import TitleSlide from './TitleSlide';
import ProblemSlide from './ProblemSlide';
import SolutionSlide from './SolutionSlide';
import HowItWorksSlide from './HowItWorksSlide';
import MarketSlide from './MarketSlide';
import ProductDemoSlide from './ProductDemoSlide';
import ArchitectureSlide from './ArchitectureSlide';
import UseCasesSlide from './UseCasesSlide';
import CompetitiveSlide from './CompetitiveSlide';
import BusinessModelSlide from './BusinessModelSlide';
import GoToMarketSlide from './GoToMarketSlide';
import TractionSlide from './TractionSlide';
import TeamSlide from './TeamSlide';
import RoadmapSlide from './RoadmapSlide';
import FinancialsSlide from './FinancialsSlide';
import CTASlide from './CTASlide';

export const slides = [
  { id: 'title', label: 'Title', component: TitleSlide },
  { id: 'problem', label: 'Problem', component: ProblemSlide },
  { id: 'solution', label: 'Solution', component: SolutionSlide },
  { id: 'how-it-works', label: 'How It Works', component: HowItWorksSlide },
  { id: 'market', label: 'Market', component: MarketSlide },
  { id: 'product-demo', label: 'Product', component: ProductDemoSlide },
  { id: 'architecture', label: 'Architecture', component: ArchitectureSlide },
  { id: 'use-cases', label: 'Use Cases', component: UseCasesSlide },
  { id: 'competitive', label: 'Competitive', component: CompetitiveSlide },
  { id: 'business-model', label: 'Business Model', component: BusinessModelSlide },
  { id: 'go-to-market', label: 'Go-to-Market', component: GoToMarketSlide },
  { id: 'traction', label: 'Traction', component: TractionSlide },
  { id: 'team', label: 'Team', component: TeamSlide },
  { id: 'roadmap', label: 'Roadmap', component: RoadmapSlide },
  { id: 'financials', label: 'Financials', component: FinancialsSlide },
  { id: 'cta', label: 'Get Started', component: CTASlide },
];
