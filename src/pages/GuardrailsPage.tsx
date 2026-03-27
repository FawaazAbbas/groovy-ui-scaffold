import { useState } from 'react';
import { Search, ShieldBan, ShieldAlert, ScrollText, Plus, ToggleLeft, ToggleRight, AlertTriangle, Ban, FileText, Bot, DollarSign, Scale, Database, Brain } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { mockGuardrails, type Guardrail } from '@/lib/mocks/guardrails';
import { mockAgents } from '@/lib/mocks/agents';

const severityConfig = {
  block: { label: 'Block', icon: Ban, className: 'bg-destructive/10 text-destructive' },
  warn: { label: 'Warn', icon: AlertTriangle, className: 'bg-warning/10 text-warning' },
  log: { label: 'Log only', icon: FileText, className: 'bg-primary/10 text-primary' },
} as const;

const sectionConfig: Record<string, { label: string; description: string; icon: typeof ShieldAlert }> = {
  Safety: { label: 'Safety & Reliability', description: 'Prevent hallucinations, enforce rate limits, and keep agents operating within safe bounds.', icon: ShieldAlert },
  Compliance: { label: 'Legal & Compliance', description: 'GDPR, SOC 2, and regulatory requirements that agents must follow.', icon: Scale },
  Budget: { label: 'Spending & Budgets', description: 'Control costs with spending caps and transaction limits.', icon: DollarSign },
  Data: { label: 'Data Protection', description: 'Prevent data leaks, PII exposure, and unauthorized access to sensitive files.', icon: Database },
  Behaviour: { label: 'Agent Behaviour', description: 'Tone, language, and operational boundaries for agent interactions.', icon: Brain },
};

function SeverityBadge({ severity }: { severity: Guardrail['severity'] }) {
  const cfg = severityConfig[severity];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-caption font-medium ${cfg.className}`}>
      <Icon className="h-3 w-3" /> {cfg.label}
    </span>
  );
}

export default function GuardrailsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuardrail, setSelectedGuardrail] = useState<Guardrail | null>(null);
  const [localGuardrails, setLocalGuardrails] = useState(mockGuardrails);

  const filtered = localGuardrails.filter(g => {
    if (searchQuery && !g.name.toLowerCase().includes(searchQuery.toLowerCase()) && !g.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const grouped = Object.keys(sectionConfig).reduce<Record<string, Guardrail[]>>((acc, cat) => {
    const items = filtered.filter(g => g.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const toggleEnabled = (id: string) => {
    setLocalGuardrails(prev => prev.map(g =>
      g.id === id ? { ...g, enabled: !g.enabled } : g
    ));
    if (selectedGuardrail?.id === id) {
      setSelectedGuardrail(prev => prev ? { ...prev, enabled: !prev.enabled } : null);
    }
  };

  const setSeverity = (id: string, severity: Guardrail['severity']) => {
    setLocalGuardrails(prev => prev.map(g =>
      g.id === id ? { ...g, severity } : g
    ));
    if (selectedGuardrail?.id === id) {
      setSelectedGuardrail(prev => prev ? { ...prev, severity } : null);
    }
  };

  const enabledCount = localGuardrails.filter(g => g.enabled).length;
  const blockCount = localGuardrails.filter(g => g.enabled && g.severity === 'block').length;
  const totalTriggers = localGuardrails.reduce((sum, g) => sum + g.triggeredCount, 0);

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-heading font-semibold text-text-primary">Guardrails</h1>
          <p className="text-body-sm text-text-secondary mt-1">Safety rules that govern how your AI agents operate.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm">
          <Plus className="h-4 w-4" /> Add Rule
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search guardrails..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-white/60 pl-9 pr-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card-glass p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-comfort/20">
              <ShieldAlert className="h-5 w-5 text-comfort-text" />
            </div>
            <div>
              <p className="text-heading-sm font-semibold text-text-primary">{enabledCount}</p>
              <p className="text-caption text-text-secondary">Active Rules</p>
            </div>
          </div>
        </div>
        <div className="card-glass p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <ShieldBan className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-heading-sm font-semibold text-text-primary">{blockCount}</p>
              <p className="text-caption text-text-secondary">Blocking Rules</p>
            </div>
          </div>
        </div>
        <div className="card-glass p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
              <ScrollText className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-heading-sm font-semibold text-text-primary">{totalTriggers}</p>
              <p className="text-caption text-text-secondary">Total Triggers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grouped sections */}
      {Object.entries(grouped).map(([category, rules]) => {
        const section = sectionConfig[category];
        const SectionIcon = section.icon;

        return (
          <section key={category} className="mb-10">
            <div className="flex items-center gap-3 mb-1">
              <SectionIcon className="h-5 w-5 text-text-secondary" />
              <h2 className="text-body font-semibold text-text-primary">{section.label}</h2>
              <span className="rounded-full bg-white/50 px-2 py-0.5 text-caption text-text-secondary">{rules.length}</span>
            </div>
            <p className="text-caption text-text-secondary mb-4 ml-8">{section.description}</p>

            <div className="space-y-3">
              {rules.map(guardrail => {
                const agentNames = guardrail.appliesTo === 'all'
                  ? null
                  : (guardrail.appliesTo as string[]).map(id => mockAgents.find(a => a.id === id)?.name).filter(Boolean);

                return (
                  <div
                    key={guardrail.id}
                    onClick={() => setSelectedGuardrail(guardrail)}
                    className={`card-glass p-5 text-left group transition-all cursor-pointer ${
                      !guardrail.enabled ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        className="shrink-0 mt-0.5"
                        onClick={e => { e.stopPropagation(); toggleEnabled(guardrail.id); }}
                      >
                        {guardrail.enabled ? (
                          <ToggleRight className="h-6 w-6 text-primary" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-text-secondary/40" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-body-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                            {guardrail.name}
                          </h3>
                          <SeverityBadge severity={guardrail.severity} />
                        </div>
                        <p className="text-caption text-text-secondary line-clamp-1 mb-2">{guardrail.description}</p>
                        <div className="flex items-center gap-4 text-caption text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Bot className="h-3 w-3" />
                            {agentNames ? `${agentNames.length} agent${agentNames.length !== 1 ? 's' : ''}` : 'All agents'}
                          </span>
                          {guardrail.triggeredCount > 0 && (
                            <span>Triggered {guardrail.triggeredCount}x</span>
                          )}
                          {guardrail.lastTriggered && (
                            <span>Last: {new Date(guardrail.lastTriggered).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-16">
          <ShieldAlert className="h-10 w-10 text-text-secondary/30 mx-auto mb-3" />
          <p className="text-body-sm text-text-secondary">No guardrails match your search.</p>
        </div>
      )}

      {/* Detail sheet */}
      <Sheet open={!!selectedGuardrail} onOpenChange={() => setSelectedGuardrail(null)}>
        <SheetContent className="w-[440px] glass overflow-y-auto">
          {selectedGuardrail && (() => {
            const g = localGuardrails.find(r => r.id === selectedGuardrail.id) ?? selectedGuardrail;
            const agentNames = g.appliesTo === 'all'
              ? null
              : (g.appliesTo as string[]).map(id => mockAgents.find(a => a.id === id)?.name).filter(Boolean);

            return (
              <div className="space-y-6 pt-6">
                <div>
                  <h2 className="text-heading-sm font-semibold text-text-primary mb-2">{g.name}</h2>
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={g.severity} />
                    <span className="rounded-md bg-white/50 px-2 py-0.5 text-[10px] font-medium text-text-secondary">
                      {sectionConfig[g.category]?.label ?? g.category}
                    </span>
                  </div>
                </div>

                <p className="text-body-sm text-text-secondary">{g.description}</p>

                {/* Enable/disable */}
                <div className="rounded-2xl bg-white/40 p-4">
                  <button onClick={() => toggleEnabled(g.id)} className="flex w-full items-center justify-between">
                    <div>
                      <p className="text-body-sm font-medium text-text-primary">Enabled</p>
                      <p className="text-caption text-text-secondary">
                        {g.enabled ? 'This rule is actively enforced' : 'This rule is currently disabled'}
                      </p>
                    </div>
                    {g.enabled ? (
                      <ToggleRight className="h-6 w-6 text-primary shrink-0" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-text-secondary/40 shrink-0" />
                    )}
                  </button>
                </div>

                {/* Severity */}
                <div className="rounded-2xl bg-white/40 p-4">
                  <p className="text-body-sm font-medium text-text-primary mb-3">Enforcement level</p>
                  <div className="flex gap-2">
                    {(['log', 'warn', 'block'] as const).map(sev => {
                      const cfg = severityConfig[sev];
                      const Icon = cfg.icon;
                      const active = g.severity === sev;
                      return (
                        <button
                          key={sev}
                          onClick={() => setSeverity(g.id, sev)}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-caption font-medium transition-all ${
                            active ? cfg.className : 'bg-white/30 text-text-secondary/50 hover:bg-white/50'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Applies to */}
                <div className="rounded-2xl bg-white/40 p-4">
                  <p className="text-body-sm font-medium text-text-primary mb-2">Applies to</p>
                  {agentNames ? (
                    <div className="flex flex-wrap gap-2">
                      {agentNames.map(name => (
                        <span key={name} className="inline-flex items-center gap-1.5 rounded-lg bg-primary-muted px-2.5 py-1 text-caption font-medium text-primary">
                          <Bot className="h-3 w-3" /> {name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-body-sm text-text-secondary">All agents in the workspace</p>
                  )}
                </div>

                {/* Configuration */}
                <div className="rounded-2xl bg-white/40 p-4">
                  <p className="text-body-sm font-medium text-text-primary mb-3">Configuration</p>
                  <div className="space-y-2">
                    {Object.entries(g.config).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-caption text-text-secondary">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                        </span>
                        <span className="text-caption font-medium text-text-primary font-mono">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="rounded-2xl bg-white/40 p-4">
                  <p className="text-body-sm font-medium text-text-primary mb-3">Activity</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-caption text-text-secondary">Times triggered</span>
                      <span className="text-caption font-medium text-text-primary">{g.triggeredCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-caption text-text-secondary">Last triggered</span>
                      <span className="text-caption font-medium text-text-primary">
                        {g.lastTriggered ? new Date(g.lastTriggered).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full rounded-xl border border-destructive py-2.5 text-body-sm font-medium text-destructive hover:bg-destructive/5 transition-colors">
                  Delete Rule
                </button>
              </div>
            );
          })()}
        </SheetContent>
      </Sheet>
    </div>
  );
}
