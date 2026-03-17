import { mockDailyUsage, mockInvoices, mockActiveAgents, mockPlan } from '@/lib/mocks/billing';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';

export default function BillingPage() {
  const usagePercent = (mockPlan.creditsUsed / mockPlan.creditsIncluded) * 100;
  const gaugeColor = usagePercent > 80 ? 'var(--destructive)' : usagePercent > 60 ? 'var(--warning)' : 'var(--electric)';

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      <h1 className="text-heading font-semibold text-text-primary">Credits & Billing</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit gauge */}
        <div className="rounded-xl border border-border bg-surface p-6 flex flex-col items-center">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={gaugeColor} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${usagePercent * 3.14} ${314 - usagePercent * 3.14}`} />
          </svg>
          <div className="text-center mt-4">
            <p className="text-display-sm font-bold text-text-primary">{mockPlan.creditsIncluded - mockPlan.creditsUsed}</p>
            <p className="text-caption text-text-secondary">of {mockPlan.creditsIncluded.toLocaleString()} credits remaining</p>
          </div>
        </div>

        {/* Plan card */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-surface p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-heading-sm font-semibold text-text-primary">{mockPlan.name} Plan</h3>
              <p className="text-body-sm text-text-secondary">${mockPlan.price}/month · Next billing: {mockPlan.nextBillingDate}</p>
            </div>
            <button className="rounded-lg border border-border px-4 py-2 text-body-sm font-medium text-text-secondary hover:bg-surface-elevated">
              Manage Plan
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockPlan.features.map(f => (
              <span key={f} className="rounded-full bg-comfort px-3 py-1 text-caption font-medium text-comfort-text">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Usage chart */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="text-body font-semibold text-text-primary mb-4">Usage — Last 30 Days</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockDailyUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} tickFormatter={v => new Date(v).getDate().toString()} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="credits" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active agents */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="text-body font-semibold text-text-primary mb-4">Active Agents</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-text-secondary">Agent</th>
                <th className="pb-3 font-medium text-text-secondary">Today</th>
                <th className="pb-3 font-medium text-text-secondary">This Month</th>
                <th className="pb-3 font-medium text-text-secondary">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {mockActiveAgents.map(a => (
                <tr key={a.agentId} className="border-b border-border/50">
                  <td className="py-3 font-medium text-text-primary">{a.agentName}</td>
                  <td className="py-3 text-text-secondary">{a.creditsUsedToday} credits</td>
                  <td className="py-3 text-text-secondary">{a.creditsUsedMonth} credits</td>
                  <td className="py-3 text-text-secondary">{new Date(a.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoices */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <h3 className="text-body font-semibold text-text-primary mb-4">Invoice History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-text-secondary">Date</th>
                <th className="pb-3 font-medium text-text-secondary">Description</th>
                <th className="pb-3 font-medium text-text-secondary">Amount</th>
                <th className="pb-3 font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map(inv => (
                <tr key={inv.id} className="border-b border-border/50">
                  <td className="py-3 text-text-secondary">{inv.date}</td>
                  <td className="py-3 text-text-primary">{inv.description}</td>
                  <td className="py-3 text-text-primary font-medium">${inv.amount.toFixed(2)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-caption font-medium ${
                      inv.status === 'paid' ? 'bg-comfort text-comfort-text' :
                      inv.status === 'pending' ? 'bg-warning/10 text-warning' :
                      'bg-destructive/10 text-destructive'
                    }`}>{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="text-body-sm font-medium text-text-primary">Credit usage alert</p>
          <p className="text-caption text-text-secondary">You've used {usagePercent.toFixed(0)}% of your monthly credits. Consider upgrading your plan or purchasing additional credits.</p>
        </div>
      </div>
    </div>
  );
}
