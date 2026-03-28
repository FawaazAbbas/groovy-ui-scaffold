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
        <section className="relative overflow-hidden py-20 md:py-28">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-[#C800DF]/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C800DF]/[0.04] blur-3xl" />

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C800DF]/15 bg-[#C800DF]/[0.04] px-4 py-1.5 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-[#C800DF]" />
              <span className="text-xs font-medium tracking-wide text-[#C800DF] uppercase">AI Agent Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Discover <span className="gradient-text">Powerful</span> AI Agents
            </h1>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Install and deploy AI agents that automate your workflows in minutes — no code required.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search agents by name, category, or capability..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-13 rounded-xl pl-12 pr-4 text-base glass-input shadow-glass-sm"
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
      <div className="border-b border-border glass-panel">
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

      <div className="container mx-auto px-6 py-10">
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
                          <div className="mt-2">
                            <span className="inline-block glass-badge text-xs font-medium text-[#C800DF]">
                              {agent.category}
                            </span>
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
