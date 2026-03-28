import { useState } from 'react';
import { Search, Shield, ShieldCheck, ShieldAlert, Bot, ChevronRight, Eye, Pencil, Zap, Clock, ToggleLeft, ToggleRight, Ban, AlertTriangle, FileText } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAgents } from '@/hooks/use-agents';
import { Loader2 } from 'lucide-react';
import { mockAgentPermissions, type AgentPermissions, type AgentCapability } from '@/lib/mocks/permissions';
import { mockIntegrations } from '@/lib/mocks/integrations';
import { mockGuardrails } from '@/lib/mocks/guardrails';

type FilterLevel = 'All' | 'Full Access' | 'Limited' | 'Approval Required';
const filterOptions: FilterLevel[] = ['All', 'Full Access', 'Limited', 'Approval Required'];

function getPermissionLevel(perms: AgentPermissions): 'full' | 'limited' | 'approval' {
  if (perms.requireApproval) return 'approval';
  const enabledCount = perms.capabilities.filter(c => c.enabled).length;
  return enabledCount >= 4 ? 'full' : 'limited';
}

function PermissionBadge({ level }: { level: 'full' | 'limited' | 'approval' }) {
  const config = {
    full: { label: 'Full Access', icon: ShieldCheck, className: 'bg-comfort text-comfort-text' },
    limited: { label: 'Limited', icon: Shield, className: 'bg-warning/10 text-warning' },
    approval: { label: 'Approval Required', icon: ShieldAlert, className: 'bg-primary/10 text-primary' },
  }[level];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 glass-badge px-2.5 py-0.5 text-caption font-medium ${config.className}`}>
      <Icon className="h-3 w-3" /> {config.label}
    </span>
  );
}

const scopeIcons = { read: Eye, write: Pencil, execute: Zap } as const;

export default function PermissionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('All');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [localPerms, setLocalPerms] = useState(mockAgentPermissions);
  const { agents, loading } = useAgents();

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C800DF]" />
      </div>
    );
  }
  const agentsWithPerms = localPerms.map(perms => ({
    agent: agents.find(a => a.id === perms.agentId)!,
    perms,
    level: getPermissionLevel(perms),
  })).filter(item => item.agent);

  const filtered = agentsWithPerms.filter(({ agent, level }) => {
    if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterLevel === 'Full Access' && level !== 'full') return false;
    if (filterLevel === 'Limited' && level !== 'limited') return false;
    if (filterLevel === 'Approval Required' && level !== 'approval') return false;
    return true;
  });

  const selectedItem = selectedAgentId
    ? agentsWithPerms.find(i => i.agent.id === selectedAgentId)
    : null;

  const toggleCapability = (agentId: string, capId: string) => {
    setLocalPerms(prev => prev.map(p => {
      if (p.agentId !== agentId) return p;
      return {
        ...p,
        capabilities: p.capabilities.map(c =>
          c.id === capId ? { ...c, enabled: !c.enabled } : c
        ),
      };
    }));
  };

  const toggleApproval = (agentId: string) => {
    setLocalPerms(prev => prev.map(p => {
      if (p.agentId !== agentId) return p;
      return { ...p, requireApproval: !p.requireApproval };
    }));
  };

  const toggleScope = (agentId: string, integrationId: string, scope: 'read' | 'write' | 'execute') => {
    setLocalPerms(prev => prev.map(p => {
      if (p.agentId !== agentId) return p;
      return {
        ...p,
        integrationAccess: p.integrationAccess.map(ia => {
          if (ia.integrationId !== integrationId) return ia;
          const has = ia.scopes.includes(scope);
          return {
            ...ia,
            scopes: has ? ia.scopes.filter(s => s !== scope) : [...ia.scopes, scope],
          };
        }),
      };
    }));
  };

  return (
    <div className="p-6 w-full max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-heading font-semibold text-text-primary">Permissions</h1>
          <p className="text-body-sm text-text-secondary mt-1">Control what your AI agents can access and do.</p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full glass-input pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filterOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setFilterLevel(opt)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-body-sm font-medium transition-all duration-200 ${
                filterLevel === opt
                  ? 'bg-primary text-white shadow-glass-sm neon-glow-sm'
                  : 'glass-button text-text-secondary'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card glass-shimmer p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-badge">
              <ShieldCheck className="h-5 w-5 text-comfort-text" />
            </div>
            <div>
              <p className="text-heading-sm font-semibold text-text-primary">
                {agentsWithPerms.filter(i => i.level === 'full').length}
              </p>
              <p className="text-caption text-text-secondary">Full Access</p>
            </div>
          </div>
        </div>
        <div className="glass-card glass-shimmer p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-badge">
              <Shield className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-heading-sm font-semibold text-text-primary">
                {agentsWithPerms.filter(i => i.level === 'limited').length}
              </p>
              <p className="text-caption text-text-secondary">Limited Access</p>
            </div>
          </div>
        </div>
        <div className="glass-card glass-shimmer p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl glass-badge">
              <ShieldAlert className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-heading-sm font-semibold text-text-primary">
                {agentsWithPerms.filter(i => i.level === 'approval').length}
              </p>
              <p className="text-caption text-text-secondary">Approval Required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent permission cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(({ agent, perms, level }) => {
          const integrationNames = perms.integrationAccess
            .map(ia => mockIntegrations.find(i => i.id === ia.integrationId)?.name)
            .filter(Boolean);
          const enabledCaps = perms.capabilities.filter(c => c.enabled).length;

          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className="glass-card glass-shimmer p-5 text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted text-primary font-bold text-sm font-mono">
                      {agent.name[0]}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-agent">
                      <Bot className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-body-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-caption text-text-secondary">{agent.category}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-text-secondary/40 group-hover:text-text-secondary transition-colors" />
              </div>

              <div className="mb-3">
                <PermissionBadge level={level} />
              </div>

              <div className="space-y-2 text-caption text-text-secondary">
                <div className="flex items-center justify-between">
                  <span>Capabilities</span>
                  <span className="font-medium text-text-primary">{enabledCaps}/{perms.capabilities.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Integrations</span>
                  <span className="font-medium text-text-primary">{integrationNames.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rate limit</span>
                  <span className="font-mono text-text-primary">{perms.rateLimit}/hr</span>
                </div>
              </div>

              {integrationNames.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {integrationNames.map(name => (
                      <span key={name} className="glass-badge px-2 py-0.5 text-[10px] font-medium text-text-secondary">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Shield className="h-10 w-10 text-text-secondary/30 mx-auto mb-3" />
          <p className="text-body-sm text-text-secondary">No agents match your search.</p>
        </div>
      )}

      {/* Detail sheet */}
      <Sheet open={!!selectedItem} onOpenChange={() => setSelectedAgentId(null)}>
        <SheetContent className="w-[440px] glass-modal overflow-y-auto">
          {selectedItem && (() => {
            const { agent, perms, level } = selectedItem;
            return (
              <div className="space-y-6 pt-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-muted text-primary font-bold text-lg font-mono">
                      {agent.name[0]}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-agent">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-heading-sm font-semibold text-text-primary">{agent.name}</h2>
                    <PermissionBadge level={level} />
                  </div>
                </div>

                <p className="text-body-sm text-text-secondary">{agent.description}</p>

                {/* Human-in-the-loop toggle */}
                <div className="glass-card p-4">
                  <button
                    onClick={() => toggleApproval(agent.id)}
                    className="flex w-full items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="text-body-sm font-medium text-text-primary">Require approval</p>
                        <p className="text-caption text-text-secondary">Actions need human sign-off before executing</p>
                      </div>
                    </div>
                    {perms.requireApproval ? (
                      <ToggleRight className="h-6 w-6 text-primary shrink-0" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-text-secondary/40 shrink-0" />
                    )}
                  </button>
                </div>

                {/* Rate limit */}
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-text-secondary" />
                    <div>
                      <p className="text-body-sm font-medium text-text-primary">Rate limit</p>
                      <p className="text-caption text-text-secondary">{perms.rateLimit} actions per hour</p>
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div>
                  <h3 className="text-body-sm font-semibold text-text-primary mb-3">Capabilities</h3>
                  <div className="space-y-1">
                    {perms.capabilities.map(cap => (
                      <button
                        key={cap.id}
                        onClick={() => toggleCapability(agent.id, cap.id)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 hover:glass-liquid-item transition-all"
                      >
                        <div className="text-left">
                          <p className="text-body-sm font-medium text-text-primary">{cap.label}</p>
                          <p className="text-caption text-text-secondary">{cap.description}</p>
                        </div>
                        {cap.enabled ? (
                          <ToggleRight className="h-5 w-5 text-primary shrink-0 ml-3" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-text-secondary/40 shrink-0 ml-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Integration access */}
                {perms.integrationAccess.length > 0 && (
                  <div>
                    <h3 className="text-body-sm font-semibold text-text-primary mb-3">Integration Access</h3>
                    <div className="space-y-3">
                      {perms.integrationAccess.map(ia => {
                        const integration = mockIntegrations.find(i => i.id === ia.integrationId);
                        if (!integration) return null;
                        return (
                          <div key={ia.integrationId} className="glass-card p-4">
                            <p className="text-body-sm font-medium text-text-primary mb-2">{integration.name}</p>
                            <div className="flex gap-2">
                              {(['read', 'write', 'execute'] as const).map(scope => {
                                const Icon = scopeIcons[scope];
                                const active = ia.scopes.includes(scope);
                                return (
                                  <button
                                    key={scope}
                                    onClick={() => toggleScope(agent.id, ia.integrationId, scope)}
                                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-caption font-medium transition-all ${
                                      active
                                        ? 'glass-badge text-primary'
                                        : 'glass-button text-text-secondary/50'
                                    }`}
                                  >
                                    <Icon className="h-3 w-3" />
                                    {scope.charAt(0).toUpperCase() + scope.slice(1)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Guardrails */}
                {(() => {
                  const agentGuardrails = mockGuardrails.filter(g =>
                    g.appliesTo === 'all' || (Array.isArray(g.appliesTo) && g.appliesTo.includes(agent.id))
                  );
                  if (agentGuardrails.length === 0) return null;

                  const severityIcon = { block: Ban, warn: AlertTriangle, log: FileText } as const;
                  const severityClass = {
                    block: 'bg-destructive/10 text-destructive',
                    warn: 'bg-warning/10 text-warning',
                    log: 'bg-primary/10 text-primary',
                  } as const;

                  return (
                    <div>
                      <h3 className="text-body-sm font-semibold text-text-primary mb-3">Active Guardrails</h3>
                      <div className="space-y-2">
                        {agentGuardrails.map(g => {
                          const SevIcon = severityIcon[g.severity];
                          return (
                            <div key={g.id} className={`glass-card !rounded-xl p-3 ${!g.enabled ? 'opacity-50' : ''}`}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-body-sm font-medium text-text-primary">{g.name}</span>
                                <span className={`inline-flex items-center gap-1 glass-badge px-2 py-0.5 text-[10px] font-medium ${severityClass[g.severity]}`}>
                                  <SevIcon className="h-2.5 w-2.5" /> {g.severity}
                                </span>
                              </div>
                              <p className="text-caption text-text-secondary line-clamp-1">{g.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Last audit */}
                <div className="pt-4 border-t border-border">
                  <p className="text-caption text-text-secondary">
                    Last audit: {new Date(perms.lastAudit).toLocaleDateString()} at{' '}
                    {new Date(perms.lastAudit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })()}
        </SheetContent>
      </Sheet>
    </div>
  );
}
