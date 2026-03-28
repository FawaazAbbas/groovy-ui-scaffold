import { useState } from 'react';
import { mockIntegrations, Integration } from '@/lib/mocks/integrations';
import { Search, Plus, X, Check, ExternalLink } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { IntegrationLogo } from '@/components/ui/IntegrationLogo';

const categories = ['All', 'Communication', 'Calendar', 'Storage', 'Developer', 'Custom'];

export default function IntegrationsPage() {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filtered = mockIntegrations.filter(i => {
    if (filterCategory !== 'All' && i.category !== filterCategory) return false;
    if (searchQuery && !i.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const grouped = filtered.reduce<Record<string, Integration[]>>((acc, i) => {
    if (!acc[i.category]) acc[i.category] = [];
    acc[i.category].push(i);
    return acc;
  }, {});

  return (
    <div className="p-6 w-full max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-heading font-semibold text-text-primary">Integrations</h1>
        <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm">
          <Plus className="h-4 w-4" /> Add Integration
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-body-sm font-medium transition-all duration-200 ${
              filterCategory === cat ? 'bg-primary text-white shadow-glass-sm neon-glow-sm' : 'glass-button text-text-secondary'
            }`}
          >{cat}</button>
        ))}
      </div>

      {/* Integration grid by category */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-body font-semibold text-text-primary mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(integration => {
              return (
                <button
                  key={integration.id}
                  onClick={() => setSelectedIntegration(integration)}
                  className="glass-card glass-shimmer p-5 text-left"
                  data-tour={integration.connected ? 'integration-status-card' : undefined}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl glass-badge">
                      <IntegrationLogo name={integration.name} className="h-7 w-7" />
                    </div>
                    <span className={`glass-badge px-2.5 py-0.5 text-caption font-medium ${
                      integration.connected ? 'text-comfort-text' : 'text-text-secondary'
                    }`}>
                      {integration.connected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                  <h3 className="text-body-sm font-semibold text-text-primary">{integration.name}</h3>
                  <p className="text-caption text-text-secondary mt-1 line-clamp-2">{integration.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Detail sheet */}
      <Sheet open={!!selectedIntegration} onOpenChange={() => setSelectedIntegration(null)}>
        <SheetContent className="w-[400px] glass-modal">
          {selectedIntegration && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-badge">
                  <IntegrationLogo name={selectedIntegration.name} className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-heading-sm font-semibold text-text-primary">{selectedIntegration.name}</h2>
                  <span className={`glass-badge px-2.5 py-0.5 text-caption font-medium ${selectedIntegration.connected ? 'text-comfort-text' : 'text-text-secondary'}`}>
                    {selectedIntegration.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
              </div>
              <p className="text-body-sm text-text-secondary">{selectedIntegration.description}</p>
              {selectedIntegration.connected && (
                <div className="space-y-3 glass-card p-4">
                  <div>
                    <p className="text-caption text-text-secondary">Connected on</p>
                    <p className="text-body-sm text-text-primary">{new Date(selectedIntegration.connectedAt!).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-caption text-text-secondary">Connected by</p>
                    <p className="text-body-sm text-text-primary">{selectedIntegration.connectedBy}</p>
                  </div>
                </div>
              )}
              <button className={`w-full rounded-xl py-2.5 text-body-sm font-medium transition-colors ${
                selectedIntegration.connected ? 'glass-button !border-destructive/30 text-destructive' : 'bg-primary text-white hover:bg-primary-hover shadow-glass-sm'
              }`}>
                {selectedIntegration.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add integration modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-lg glass-modal shadow-glass-xl rounded-2xl">
          <h2 className="text-heading-sm font-semibold text-text-primary mb-4">Add Integration</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full glass-input pl-9"
            />
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {mockIntegrations.filter(i => !searchQuery || i.name.toLowerCase().includes(searchQuery.toLowerCase())).map(i => {
              return (
                <button key={i.id} className="flex w-full items-center gap-3 rounded-xl p-3 glass-button">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg glass-badge">
                    <IntegrationLogo name={i.name} className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-body-sm font-medium text-text-primary">{i.name}</p>
                    <p className="text-caption text-text-secondary">{i.category}</p>
                  </div>
                  {i.connected && <Check className="h-4 w-4 text-comfort-text" />}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
