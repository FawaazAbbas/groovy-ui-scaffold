import { useState } from 'react';
import { Search, Star, Download, ChevronRight, Plus, Check } from 'lucide-react';
import { mockAgents, agentCategories } from '@/lib/mocks/agents';

interface MarketplaceContentProps {
  variant: 'marketing' | 'workspace';
  onInstall?: (agentId: string) => void;
  installedAgents?: Set<string>;
}

export function MarketplaceContent({ variant, onInstall, installedAgents = new Set() }: MarketplaceContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = mockAgents.filter(a => a.featured);
  const filtered = mockAgents.filter(a => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const isMarketing = variant === 'marketing';

  return (
    <div className={isMarketing ? 'min-h-screen' : 'h-full overflow-y-auto'}>
      {isMarketing && (
        <section className="glass-sidebar py-16 text-sidebar-text relative retro-grid scanlines overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <p className="retro-label cyan-text mb-3 tracking-[0.2em]">◆ AGENT NETWORK v2.4</p>
            <h1 className="text-display-lg mb-4">AI Agent <span className="neon-text">Marketplace</span></h1>
            <p className="text-body-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Discover, install, and deploy AI agents that automate your workflows in minutes.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search for agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 rounded-2xl bg-white/90 backdrop-blur-sm pl-12 pr-4 text-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-electric/30 focus:neon-glow-md shadow-glass-lg transition-all"
              />
            </div>
          </div>
        </section>
      )}

      {!isMarketing && (
        <div className="p-6 border-b border-border glass">
          <h1 className="text-heading-lg font-semibold text-text-primary mb-2">Agent Marketplace</h1>
          <p className="text-body text-text-secondary">Discover and install AI agents for your workspace.</p>
          <div className="relative mt-4 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-lg border border-border bg-white/60 pl-10 pr-4 text-body-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      )}

      <div className={isMarketing ? 'border-b border-border glass' : 'border-b border-border bg-white/30'}>
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {agentCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-body-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-glass-sm'
                    : 'bg-white/50 text-text-secondary hover:bg-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {selectedCategory === 'All' && !searchQuery && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading font-semibold text-text-primary">Featured Agents</h2>
              <button className="flex items-center gap-1 text-body-sm font-medium text-primary hover:text-primary-hover transition-colors">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map(agent => {
                const isInstalled = installedAgents.has(agent.id);
                return (
                  <div
                    key={agent.id}
                    className={`group card-glass p-5 transition-all ${isMarketing ? 'hover:neon-border retro-corners' : ''}`}
                    data-tour={agent === featured[0] ? 'featured-agent-card' : undefined}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-electric-muted text-electric-bright font-bold text-lg font-mono neon-glow-sm group-hover:neon-glow-md transition-all">
                        {agent.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-body font-semibold text-text-primary group-hover:text-electric truncate transition-colors">{agent.name}</h3>
                        <span className="inline-block rounded-md bg-white/50 px-2 py-0.5 retro-label text-text-secondary">{agent.category}</span>
                      </div>
                    </div>
                    <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">{agent.description}</p>
                    <div className="flex items-center justify-between text-caption text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {agent.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" /> {(agent.installCount / 1000).toFixed(1)}k
                      </span>
                      <span className="font-mono font-medium text-electric text-[10px]">{agent.creditCost} cr/use</span>
                    </div>
                    {!isMarketing && (
                      <div className="mt-4 pt-4 border-t border-border">
                        {isInstalled ? (
                          <div className="flex items-center justify-center gap-2 rounded-lg bg-electric/10 py-2 text-body-sm font-medium text-electric">
                            <Check className="h-4 w-4" /> Installed
                          </div>
                        ) : (
                          <button
                            onClick={() => onInstall?.(agent.id)}
                            data-tour={agent === featured[0] ? 'leadscout-install-btn' : undefined}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors"
                          >
                            <Plus className="h-4 w-4" /> Install
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-heading font-semibold text-text-primary mb-6">
            {selectedCategory === 'All' ? 'All Agents' : selectedCategory} ({filtered.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map(agent => {
              const isInstalled = installedAgents.has(agent.id);
              return (
                <div key={agent.id} className="group card-glass p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-muted text-electric-bright font-bold">
                      {agent.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-body-sm font-semibold text-text-primary group-hover:text-primary truncate transition-colors">{agent.name}</h3>
                      <span className="text-caption text-text-secondary">{agent.publisher}</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-text-secondary mb-3 line-clamp-2">{agent.description}</p>
                  <div className="flex items-center justify-between text-caption text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" /> {agent.rating}
                      <span className="text-text-secondary/50">({agent.reviewCount})</span>
                    </span>
                    <span className="font-mono font-medium text-electric text-[10px]">{agent.creditCost} cr</span>
                  </div>
                  {!isMarketing && (
                    <div className="mt-3 pt-3 border-t border-border">
                      {isInstalled ? (
                        <div className="flex items-center justify-center gap-2 rounded-lg bg-electric/10 py-1.5 text-caption font-medium text-electric">
                          <Check className="h-3.5 w-3.5" /> Installed
                        </div>
                      ) : (
                        <button
                          onClick={() => onInstall?.(agent.id)}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-1.5 text-caption font-medium text-white hover:bg-primary-hover transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" /> Install
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
