import { Fragment, useState } from 'react';
import { mockActivity } from '@/lib/mocks/activity';
import { mockApprovals, type TaskApproval } from '@/lib/mocks/approvals';
import { ChevronDown, ChevronRight, CheckCircle2, XCircle, Clock, AlertTriangle, ShieldAlert, DollarSign, Database, Globe, Monitor, MessageSquare } from 'lucide-react';

const actionTypeColors: Record<string, string> = {
  message_sent: 'bg-primary/10 text-primary',
  task_created: 'bg-comfort text-comfort-text',
  task_updated: 'bg-comfort text-comfort-text',
  file_accessed: 'bg-surface-elevated text-text-secondary',
  integration_called: 'bg-primary-muted text-primary',
  decision_made: 'bg-warning/10 text-warning',
  escalation: 'bg-destructive/10 text-destructive',
};

const statusColors: Record<string, string> = {
  success: 'bg-comfort text-comfort-text',
  failed: 'bg-destructive/10 text-destructive',
  pending: 'bg-warning/10 text-warning',
};

const riskConfig = {
  low: { label: 'Low', className: 'bg-comfort text-comfort-text' },
  medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
  high: { label: 'High', className: 'bg-destructive/10 text-destructive' },
} as const;

const categoryIcons = {
  financial: DollarSign,
  data: Database,
  external: Globe,
  system: Monitor,
  communication: MessageSquare,
} as const;

export default function ActivityPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterAgent, setFilterAgent] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [approvals, setApprovals] = useState(mockApprovals);

  const uniqueAgents = [...new Set(mockActivity.map(a => a.agentName))];
  const uniqueTypes = [...new Set(mockActivity.map(a => a.actionType))];

  const filtered = mockActivity.filter(a => {
    if (filterAgent !== 'all' && a.agentName !== filterAgent) return false;
    if (filterType !== 'all' && a.actionType !== filterType) return false;
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    return true;
  });

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    setApprovals(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-heading font-semibold text-text-primary">AI Activity Log</h1>
        <span className="retro-label cyan-text animate-pulse">● LIVE</span>
      </div>

      {/* Task Approvals */}
      {approvals.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-warning/10">
              <Clock className="h-4 w-4 text-warning" />
            </div>
            <div>
              <h2 className="text-body font-semibold text-text-primary">Pending Approvals</h2>
              <p className="text-caption text-text-secondary">{approvals.length} action{approvals.length !== 1 ? 's' : ''} waiting for your sign-off</p>
            </div>
          </div>

          <div className="space-y-3">
            {approvals.map(approval => {
              const risk = riskConfig[approval.risk];
              const CategoryIcon = categoryIcons[approval.category];

              return (
                <div key={approval.id} className="card-glass p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted text-primary font-bold text-sm font-mono">
                      {approval.agentName[0]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-body-sm font-semibold text-text-primary">{approval.action}</h3>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption font-medium ${risk.className}`}>
                          <AlertTriangle className="h-3 w-3" /> {risk.label} risk
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/50 px-2 py-0.5 text-caption font-medium text-text-secondary">
                          <CategoryIcon className="h-3 w-3" /> {approval.category}
                        </span>
                      </div>
                      <p className="text-caption text-text-secondary mb-2">{approval.description}</p>

                      <div className="flex items-center gap-4 text-caption text-text-secondary mb-3">
                        <span className="font-medium text-text-primary">{approval.agentName}</span>
                        <span>{new Date(approval.requestedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        {approval.triggeredGuardrail && (
                          <span className="inline-flex items-center gap-1 text-warning">
                            <ShieldAlert className="h-3 w-3" /> {approval.triggeredGuardrail}
                          </span>
                        )}
                      </div>

                      {/* Context details */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {Object.entries(approval.context).map(([key, value]) => (
                          <span key={key} className="rounded-md bg-white/50 px-2 py-0.5 text-[10px] font-mono text-text-secondary">
                            {key}: <span className="text-text-primary font-medium">{value}</span>
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproval(approval.id, 'approve')}
                          className="flex items-center gap-1.5 rounded-xl bg-comfort px-4 py-2 text-caption font-medium text-comfort-text hover:bg-comfort/80 transition-colors"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleApproval(approval.id, 'reject')}
                          className="flex items-center gap-1.5 rounded-xl border border-destructive/30 px-4 py-2 text-caption font-medium text-destructive hover:bg-destructive/5 transition-colors"
                        >
                          <XCircle className="h-3.5 w-3.5" /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select value={filterAgent} onChange={e => setFilterAgent(e.target.value)} className="rounded-xl border border-border-solid bg-white/60 px-3 py-2 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
          <option value="all">All Agents</option>
          {uniqueAgents.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="rounded-xl border border-border-solid bg-white/60 px-3 py-2 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
          <option value="all">All Types</option>
          {uniqueTypes.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-xl border border-border-solid bg-white/60 px-3 py-2 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="card-glass overflow-hidden">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-b border-border-solid bg-white/40">
              <th className="w-8 px-4 py-3"></th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Timestamp</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Agent</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Action</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Target</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Cost</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, index) => (
              <Fragment key={entry.id}>
                <tr
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                  data-tour={index === 0 ? 'first-activity-row' : undefined}
                  className="border-b border-border/50 cursor-pointer hover:bg-white/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    {expandedId === entry.id
                      ? <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />
                      : <ChevronRight className="h-3.5 w-3.5 text-text-secondary" />}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-text-secondary/60 whitespace-nowrap tracking-wider">
                    {new Date(entry.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-muted text-primary text-[10px] font-bold neon-glow-sm">
                        {entry.agentName[0]}
                      </div>
                      <span className="text-text-primary font-medium">{entry.agentName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-caption font-medium ${actionTypeColors[entry.actionType]}`}>
                      {entry.actionType.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-primary">{entry.target}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-caption font-medium ${statusColors[entry.status]}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-primary/60">{entry.creditCost} cr</td>
                </tr>
                {expandedId === entry.id && (
                  <tr data-tour={index === 0 ? 'expanded-activity-row' : undefined} className="border-b border-border/50 bg-white/20">
                    <td colSpan={7} className="px-8 py-4">
                      <p className="text-body-sm text-text-primary">{entry.details}</p>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
