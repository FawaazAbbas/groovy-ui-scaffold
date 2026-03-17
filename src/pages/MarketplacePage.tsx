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
      {/* Hero */}
      <section className="bg-sidebar py-16 text-sidebar-text">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-display-lg mb-4">AI Agent Marketplace</h1>
          <p className="text-body-lg text-sidebar-text/70 mb-8 max-w-2xl mx-auto">
            Discover, install, and deploy AI agents that automate your workflows in minutes.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search for agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 rounded-xl bg-surface pl-12 pr-4 text-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Category pills */}
      <div className="border-b border-border bg-surface">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {agentCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-surface-elevated text-text-secondary hover:bg-border'
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
              <button className="flex items-center gap-1 text-body-sm font-medium text-primary hover:text-primary-hover">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map(agent => (
                <Link
                  key={agent.id}
                  to={`/marketplace/${agent.id}`}
                  className="group rounded-xl border border-border bg-surface p-5 hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-electric-muted text-electric font-bold text-lg">
                      {agent.name[0]}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-body font-semibold text-text-primary group-hover:text-primary truncate">{agent.name}</h3>
                      <span className="inline-block rounded-full bg-surface-elevated px-2 py-0.5 text-caption text-text-secondary">{agent.category}</span>
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
                    <span className="font-medium text-primary">{agent.creditCost} credits/use</span>
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
                className="group rounded-xl border border-border bg-surface p-5 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric-muted text-electric font-bold">
                    {agent.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-body-sm font-semibold text-text-primary group-hover:text-primary truncate">{agent.name}</h3>
                    <span className="text-caption text-text-secondary">{agent.publisher}</span>
                  </div>
                </div>
                <p className="text-body-sm text-text-secondary mb-3 line-clamp-2">{agent.description}</p>
                <div className="flex items-center justify-between text-caption text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" /> {agent.rating}
                    <span className="text-text-secondary/50">({agent.reviewCount})</span>
                  </span>
                  <span className="font-medium text-primary">{agent.creditCost} cr</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
