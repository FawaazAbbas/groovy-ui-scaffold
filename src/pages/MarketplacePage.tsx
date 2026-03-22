import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Download, ChevronRight } from 'lucide-react';
import { mockAgents, agentCategories } from '@/lib/mocks/agents';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = mockAgents.filter(a => a.featured);
  const filtered = mockAgents.filter(a => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero — frosted dark + retro grid */}
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

      {/* Category pills */}
      <div className="border-b border-border glass">
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
        {/* Featured */}
        {selectedCategory === 'All' && !searchQuery && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading font-semibold text-text-primary">Featured Agents</h2>
              <button className="flex items-center gap-1 text-body-sm font-medium text-primary hover:text-primary-hover transition-colors">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map(agent => (
                <Link
                  key={agent.id}
                  to={`/marketplace/${agent.id}`}
                  className="group card-glass p-5 hover:neon-border retro-corners transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-electric-muted text-electric-bright font-bold text-lg font-mono neon-glow-sm group-hover:neon-glow-md transition-all">
                      {agent.name[0]}
                    </div>
                    <div className="min-w-0">
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
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Agent grid */}
        <section>
          <h2 className="text-heading font-semibold text-text-primary mb-6">
            {selectedCategory === 'All' ? 'All Agents' : selectedCategory} ({filtered.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map(agent => (
              <Link
                key={agent.id}
                to={`/marketplace/${agent.id}`}
                className="group card-glass p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-muted text-electric-bright font-bold">
                    {agent.name[0]}
                  </div>
                  <div className="min-w-0">
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
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
