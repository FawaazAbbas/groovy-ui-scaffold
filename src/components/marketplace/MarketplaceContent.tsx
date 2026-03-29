import { useState } from 'react';
import { Search, Star, Download, ChevronRight, Plus, Check, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { agentCategories } from '@/lib/mocks/agents';
import { useAgents } from '@/hooks/use-agents';

interface MarketplaceContentProps {
  variant: 'marketing' | 'workspace';
  onInstall?: (agentId: string) => void;
  installedAgents?: Set<string>;
}

const SlackIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" fill="#ECB22E"/>
  </svg>
);

const TeamsIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M20.625 6.547h-5.578c.126.404.203.83.203 1.278v8.35a3.14 3.14 0 0 1-.834 2.137h4.209A2.375 2.375 0 0 0 21 15.937V8.922a2.375 2.375 0 0 0-2.375-2.375h2z" fill="#5059C9"/>
    <path d="M19.5 5.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5z" fill="#5059C9"/>
    <path d="M13.125 5.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="#7B83EB"/>
    <path d="M16.5 7.825a2.575 2.575 0 0 0-2.575-2.575H8.075A2.575 2.575 0 0 0 5.5 7.825v8.35a2.575 2.575 0 0 0 2.575 2.575h5.85A2.575 2.575 0 0 0 16.5 16.175v-8.35z" fill="#7B83EB"/>
    <path d="M13.875 7.825v8.35a2.58 2.58 0 0 1-1.774 2.45 2.56 2.56 0 0 1-.801.125H6.45A5.226 5.226 0 0 1 5.5 16.175v-8.35A2.575 2.575 0 0 1 8.075 5.25h3.225a2.575 2.575 0 0 1 2.575 2.575z" fill="url(#teams-grad)" opacity="0.1"/>
    <defs><linearGradient id="teams-grad" x1="5.5" y1="5.25" x2="13.875" y2="18.75" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs>
  </svg>
);

function PlatformBadges({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const iconClass = size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3';
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1 rounded-md bg-white/60 border border-black/[0.06] px-1.5 py-0.5" title="Available on Slack">
        <SlackIcon className={iconClass} />
      </div>
      <div className="flex items-center gap-1 rounded-md bg-white/60 border border-black/[0.06] px-1.5 py-0.5" title="Available on Teams">
        <TeamsIcon className={iconClass} />
      </div>
    </div>
  );
}

export function MarketplaceContent({ variant, onInstall, installedAgents = new Set() }: MarketplaceContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { agents, loading } = useAgents();

  const featured = agents.filter(a => a.featured);
  const filtered = agents.filter(a => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const isMarketing = variant === 'marketing';

  if (loading) {
    return (
      <div className={`flex w-full items-center justify-center ${isMarketing ? 'min-h-screen' : 'h-full p-20'}`}>
        <Loader2 className="h-8 w-8 animate-spin text-[#C800DF]" />
      </div>
    );
  }

  return (
    <div className={isMarketing ? 'min-h-screen' : 'h-full overflow-y-auto'}>
      {/* Hero */}
      {isMarketing && (
        <section className="relative overflow-visible py-16 md:py-20">
          {/* Fixed parallax background layer */}
          <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
            <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full opacity-25 bg-[radial-gradient(circle,rgba(200,0,223,0.15)_0%,transparent_70%)] filter blur-3xl mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-[10%] left-[15%] w-[350px] h-[350px] rounded-full opacity-25 bg-[radial-gradient(circle,rgba(0,183,255,0.12)_0%,transparent_70%)] filter blur-3xl mix-blend-multiply" />
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
              style={{
                fontFamily: '"Monoton", display',
                fontSize: '28em',
                lineHeight: 1,
                color: 'rgba(200, 0, 223, 0.2)',
                filter: 'blur(30px)',
              }}
            >
              G
            </span>
          </div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-xs font-medium tracking-wide uppercase">AI Agent Marketplace</span>
            </div>
            <h1 className="text-[32px] md:text-[44px] font-bold tracking-tight leading-[1.1] mb-4">
              Discover <span className="text-primary">Powerful</span> AI Agents
            </h1>
            <p className="text-base md:text-lg text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
              Install and deploy AI agents that automate your workflows in minutes — no code required.
            </p>
            <div className="relative max-w-lg mx-auto">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 pointer-events-none">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <input
                type="text"
                placeholder="Search agents by name, category, or capability..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 rounded-xl pl-14 pr-4 text-sm bg-white/50 backdrop-blur-lg border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] placeholder:text-text-secondary/60 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all"
              />
            </div>
          </div>
        </section>
      )}

      {/* Workspace header */}
      {!isMarketing && (
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Agent Marketplace</h1>
          <p className="text-sm text-text-secondary">Discover and install AI agents for your workspace.</p>
          <div className="relative mt-4 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-lg border border-border bg-surface-solid pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-[#C800DF]/25"
            />
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="border-b border-border glass-panel relative z-10 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {agentCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#C800DF] text-white shadow-sm neon-glow-sm'
                    : 'glass-button text-text-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 relative z-10 bg-background">
        {/* Featured — Bento Grid */}
        {selectedCategory === 'All' && !searchQuery && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">Featured Agents</h2>
              <button className="flex items-center gap-1 text-sm font-medium text-[#C800DF] hover:text-[#D420EF] transition-colors">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="bento-grid">
              {featured.map((agent, i) => {
                const isInstalled = installedAgents.has(agent.id);
                const isHero = i === 0;
                return (
                  <Link
                    to={isMarketing ? `/marketplace/${agent.id}` : '#'}
                    key={agent.id}
                    className={`group glass-card glass-shimmer ${isHero ? 'p-8' : 'p-5'} flex flex-col justify-between`}
                    data-tour={agent === featured[0] ? 'featured-agent-card' : undefined}
                  >
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`flex shrink-0 items-center justify-center rounded-2xl bg-[#C800DF]/[0.08] text-[#C800DF] font-bold ${isHero ? 'h-16 w-16 text-2xl' : 'h-12 w-12 text-lg'}`}>
                          {agent.name[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className={`font-semibold text-text-primary group-hover:text-[#C800DF] truncate transition-colors ${isHero ? 'text-xl' : 'text-base'}`}>
                            {agent.name}
                          </h3>
                          <span className="text-sm text-text-secondary">{agent.publisher}</span>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="inline-block glass-badge text-xs font-medium text-[#C800DF]">
                              {agent.category}
                            </span>
                            <PlatformBadges size={isHero ? 'md' : 'sm'} />
                          </div>
                        </div>
                      </div>
                      <p className={`text-text-secondary mb-4 leading-relaxed ${isHero ? 'text-base line-clamp-4' : 'text-sm line-clamp-2'}`}>
                        {isHero ? agent.longDescription : agent.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {agent.rating}
                          <span className="text-text-secondary/60">({agent.reviewCount})</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" /> {(agent.installCount / 1000).toFixed(1)}k
                        </span>
                        <span className="ml-auto font-mono text-xs font-medium text-[#C800DF]">
                          {agent.creditCost === 0 ? 'Free' : `${agent.creditCost} cr/use`}
                        </span>
                      </div>
                      {!isMarketing && (
                        <div className="mt-4 pt-4 border-t border-border">
                          {isInstalled ? (
                            <div className="flex items-center justify-center gap-2 rounded-lg glass-badge py-2 text-sm font-medium text-[#16A34A]">
                              <Check className="h-4 w-4" /> Installed
                            </div>
                          ) : (
                            <button
                              onClick={(e) => { e.preventDefault(); onInstall?.(agent.id); }}
                              data-tour={agent === featured[0] ? 'featured-install-btn' : undefined}
                              className="flex w-full items-center justify-center gap-2 rounded-lg btn-gradient py-2.5 text-sm font-medium"
                            >
                              <Plus className="h-4 w-4" /> Install
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* All Agents */}
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-6">
            {selectedCategory === 'All' ? 'All Agents' : selectedCategory} ({filtered.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(agent => {
              const isInstalled = installedAgents.has(agent.id);
              return (
                <Link
                  to={isMarketing ? `/marketplace/${agent.id}` : '#'}
                  key={agent.id}
                  className="group glass-card glass-shimmer p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C800DF]/[0.08] text-[#C800DF] font-bold">
                        {agent.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-text-primary group-hover:text-[#C800DF] truncate transition-colors">
                          {agent.name}
                        </h3>
                        <span className="text-xs text-text-secondary">{agent.publisher}</span>
                      </div>
                      <span className="shrink-0 glass-badge px-2 py-0.5 text-[10px] font-medium text-[#C800DF]">
                        {agent.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <PlatformBadges size="sm" />
                    </div>
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2 leading-relaxed">{agent.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {agent.rating}
                      <span className="text-text-secondary/50">({agent.reviewCount})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" /> {(agent.installCount / 1000).toFixed(1)}k
                    </span>
                    <span className="font-mono font-medium text-[#C800DF]">
                      {agent.creditCost === 0 ? 'Free' : `${agent.creditCost} cr`}
                    </span>
                  </div>
                  {!isMarketing && (
                    <div className="mt-3 pt-3 border-t border-border">
                      {isInstalled ? (
                        <div className="flex items-center justify-center gap-2 rounded-lg glass-badge py-1.5 text-xs font-medium text-[#16A34A]">
                          <Check className="h-3.5 w-3.5" /> Installed
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.preventDefault(); onInstall?.(agent.id); }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg btn-gradient py-1.5 text-xs font-medium"
                        >
                          <Plus className="h-3.5 w-3.5" /> Install
                        </button>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
