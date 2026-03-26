import TitleSlide from './TitleSlide';
import ProblemSlide from './ProblemSlide';
import SolutionSlide from './SolutionSlide';
import MarketSlide from './MarketSlide';
import GoToMarketSlide from './GoToMarketSlide';
import TractionSlide from './TractionSlide';
import ProductDemoSlide from './ProductDemoSlide';
import CompetitiveSlide from './CompetitiveSlide';
import WhyNowSlide from './WhyNowSlide';
import TeamSlide from './TeamSlide';
import CTASlide from './CTASlide';

export const slides = [
  { id: 'title', label: 'Title', component: TitleSlide },
  { id: 'problem', label: 'Problem', component: ProblemSlide },
  { id: 'solution', label: 'Solution', component: SolutionSlide },
  { id: 'market', label: 'TAM / SAM / SOM', component: MarketSlide },
  { id: 'go-to-market', label: 'Go-to-Market', component: GoToMarketSlide },
  { id: 'traction', label: 'Progress', component: TractionSlide },
  { id: 'demo', label: 'Demo', component: ProductDemoSlide },
  { id: 'competitive', label: 'Why Us', component: CompetitiveSlide },
  { id: 'why-now', label: 'Why Now', component: WhyNowSlide },
  { id: 'team', label: 'Founders', component: TeamSlide },
  { id: 'cta', label: 'Invest', component: CTASlide },
];
