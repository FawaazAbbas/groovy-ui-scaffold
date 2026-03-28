import { mockDailyUsage, mockInvoices, mockActiveAgents, mockPlan } from '@/lib/mocks/billing';
import { PRICING_PLANS } from '@/lib/pricing-data';
import { PricingCard } from '@/components/PricingCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';

export default function BillingPage() {
  const usagePercent = (mockPlan.creditsUsed / mockPlan.creditsIncluded) * 100;
  const gaugeColor = usagePercent > 80 ? 'var(--destructive)' : usagePercent > 60 ? 'var(--warning)' : 'var(--electric)';

  return (
    <div className="p-6 space-y-6 w-full max-w-[1400px] mx-auto">
      <h1 className="text-heading font-semibold text-text-primary">Credits & Billing</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit gauge */}
        <div className="glass-card glass-shimmer p-6 flex flex-col items-center">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120" style={{ filter: usagePercent <= 60 ? 'drop-shadow(0 0 6px rgba(200,0,223,0.3))' : 'none' }}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-solid)" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={gaugeColor} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${usagePercent * 3.14} ${314 - usagePercent * 3.14}`} />
          </svg>
          <div className="text-center mt-4">
            <p className="text-display-sm font-bold text-text-primary font-mono">{mockPlan.creditsIncluded - mockPlan.creditsUsed}</p>
            <p className="retro-label text-text-secondary/60 mt-1">of {mockPlan.creditsIncluded.toLocaleString()} credits remaining</p>
          </div>
        </div>

        {/* Plan card */}
        <div className="lg:col-span-2 glass-card glass-shimmer p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-heading-sm font-semibold text-text-primary">{mockPlan.name} Plan</h3>
              <p className="text-body-sm text-text-secondary">${mockPlan.price}/month · Next billing: {mockPlan.nextBillingDate}</p>
            </div>
            <button className="glass-button rounded-xl px-4 py-2 text-body-sm font-medium text-text-secondary">
              Manage Plan
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockPlan.features.map(f => (
              <span key={f} className="glass-badge px-3 py-1 retro-label text-primary neon-glow-sm">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Compare Plans */}
      <div>
        <h3 className="text-body font-semibold text-text-primary mb-4">Compare Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING_PLANS.map(plan => (
            <PricingCard
              key={plan.id}
              plan={plan}
              variant="billing"
              currentPlanId={mockPlan.id}
            />
          ))}
        </div>
      </div>

      {/* Usage chart */}
      <div className="glass-card glass-shimmer p-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-body font-semibold text-text-primary">Usage</h3>
          <span className="retro-label text-cyan/50">// LAST 30 DAYS</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockDailyUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-solid)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} tickFormatter={v => new Date(v).getDate().toString()} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-solid)', borderRadius: '12px', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }} />
              <Area type="monotone" dataKey="credits" stroke="var(--electric)" fill="var(--electric)" fillOpacity={0.06} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active agents */}
      <div className="glass-card glass-shimmer p-6">
        <h3 className="text-body font-semibold text-text-primary mb-4">Active Agents</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-border-solid text-left glass-panel">
                <th className="pb-3 font-medium text-text-secondary">Agent</th>
                <th className="pb-3 font-medium text-text-secondary">Today</th>
                <th className="pb-3 font-medium text-text-secondary">This Month</th>
                <th className="pb-3 font-medium text-text-secondary">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {mockActiveAgents.map(a => (
                <tr key={a.agentId} className="border-b border-border/50 hover:glass-liquid-item transition-all">
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
      <div className="glass-card glass-shimmer p-6">
        <h3 className="text-body font-semibold text-text-primary mb-4">Invoice History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-border-solid text-left glass-panel">
                <th className="pb-3 font-medium text-text-secondary">Date</th>
                <th className="pb-3 font-medium text-text-secondary">Description</th>
                <th className="pb-3 font-medium text-text-secondary">Amount</th>
                <th className="pb-3 font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map(inv => (
                <tr key={inv.id} className="border-b border-border/50 hover:glass-liquid-item transition-all">
                  <td className="py-3 text-text-secondary">{inv.date}</td>
                  <td className="py-3 text-text-primary">{inv.description}</td>
                  <td className="py-3 text-text-primary font-medium">${inv.amount.toFixed(2)}</td>
                  <td className="py-3">
                    <span className={`glass-badge px-2.5 py-0.5 text-caption font-medium ${
                      inv.status === 'paid' ? 'text-comfort-text' :
                      inv.status === 'pending' ? 'text-warning' :
                      'text-destructive'
                    }`}>{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="glass-card p-4 flex items-start gap-3 !border-warning/20">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="text-body-sm font-medium text-text-primary">Credit usage alert</p>
          <p className="text-caption text-text-secondary">You've used {usagePercent.toFixed(0)}% of your monthly credits. Consider upgrading your plan or purchasing additional credits.</p>
        </div>
      </div>
    </div>
  );
}
