import { useState } from 'react';
import { User, Building2, Bell, Shield, AlertTriangle, Camera } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { mockSession } from '@/lib/mocks/session';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: mockSession.user.name,
    email: mockSession.user.email,
    title: mockSession.user.title,
    department: mockSession.user.department,
  });

  const [workspace, setWorkspace] = useState({
    name: mockSession.workspace.name,
    timezone: 'Europe/London',
    language: 'en',
  });

  const [notifications, setNotifications] = useState({
    emailAgentCompletions: true,
    emailWeeklyDigest: true,
    emailBilling: false,
    inAppActivity: true,
    inAppTasks: true,
    inAppMentions: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-heading font-semibold text-text-primary">Settings</h1>
        <p className="text-body-sm text-text-secondary mt-1">Manage your profile, workspace, and preferences.</p>
      </div>

      <div className="space-y-8">
        {/* Profile */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-text-secondary" />
            <h2 className="text-body font-semibold text-text-primary">Profile</h2>
          </div>
          <div className="card-glass p-6 space-y-5">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary-dark text-lg font-semibold text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white border border-border shadow-sm hover:bg-surface-elevated transition-colors">
                  <Camera className="h-3.5 w-3.5 text-text-secondary" />
                </button>
              </div>
              <div>
                <p className="text-body-sm font-medium text-text-primary">{profile.name}</p>
                <p className="text-caption text-text-secondary">{profile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-caption font-medium text-text-secondary mb-1.5">Full name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-caption font-medium text-text-secondary mb-1.5">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-caption font-medium text-text-secondary mb-1.5">Role title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={e => setProfile(p => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-caption font-medium text-text-secondary mb-1.5">Department</label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={e => setProfile(p => ({ ...p, department: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <button className="rounded-xl bg-primary px-5 py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors">
              Save changes
            </button>
          </div>
        </section>

        {/* Workspace */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-text-secondary" />
            <h2 className="text-body font-semibold text-text-primary">Workspace</h2>
          </div>
          <div className="card-glass p-6 space-y-4">
            <div>
              <label className="block text-caption font-medium text-text-secondary mb-1.5">Workspace name</label>
              <input
                type="text"
                value={workspace.name}
                onChange={e => setWorkspace(w => ({ ...w, name: e.target.value }))}
                className="w-full max-w-sm rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-caption font-medium text-text-secondary mb-1.5">Timezone</label>
              <select
                value={workspace.timezone}
                onChange={e => setWorkspace(w => ({ ...w, timezone: e.target.value }))}
                className="w-full max-w-sm rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              >
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
                <option value="America/New_York">America/New York (EST)</option>
                <option value="America/Chicago">America/Chicago (CST)</option>
                <option value="America/Denver">America/Denver (MST)</option>
                <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
              </select>
            </div>
            <div>
              <label className="block text-caption font-medium text-text-secondary mb-1.5">Language</label>
              <select
                value={workspace.language}
                onChange={e => setWorkspace(w => ({ ...w, language: e.target.value }))}
                className="w-full max-w-sm rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
              </select>
            </div>
            <button className="rounded-xl bg-primary px-5 py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors">
              Save changes
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-text-secondary" />
            <h2 className="text-body font-semibold text-text-primary">Notifications</h2>
          </div>
          <div className="card-glass p-6 space-y-1">
            <p className="text-caption font-medium text-text-secondary mb-3">Email notifications</p>
            {([
              { key: 'emailAgentCompletions' as const, label: 'Agent completions', desc: 'Get notified when an agent finishes a task' },
              { key: 'emailWeeklyDigest' as const, label: 'Weekly digest', desc: 'Summary of agent activity and workspace metrics' },
              { key: 'emailBilling' as const, label: 'Billing alerts', desc: 'Credit usage warnings and invoice receipts' },
            ]).map(item => (
              <div key={item.key} className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-white/30 transition-colors">
                <div>
                  <p className="text-body-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-caption text-text-secondary">{item.desc}</p>
                </div>
                <Switch checked={notifications[item.key]} onCheckedChange={() => toggleNotification(item.key)} />
              </div>
            ))}

            <div className="border-t border-border my-3" />
            <p className="text-caption font-medium text-text-secondary mb-3">In-app notifications</p>
            {([
              { key: 'inAppActivity' as const, label: 'Agent activity', desc: 'Real-time updates when agents take actions' },
              { key: 'inAppTasks' as const, label: 'Task assignments', desc: 'When a task is assigned to you or your agents' },
              { key: 'inAppMentions' as const, label: 'Mentions', desc: 'When someone mentions you in a conversation' },
            ]).map(item => (
              <div key={item.key} className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-white/30 transition-colors">
                <div>
                  <p className="text-body-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-caption text-text-secondary">{item.desc}</p>
                </div>
                <Switch checked={notifications[item.key]} onCheckedChange={() => toggleNotification(item.key)} />
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-text-secondary" />
            <h2 className="text-body font-semibold text-text-primary">Security</h2>
          </div>
          <div className="card-glass p-6 space-y-5">
            <div>
              <p className="text-body-sm font-medium text-text-primary mb-3">Change password</p>
              <div className="space-y-3 max-w-sm">
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full rounded-xl border border-border bg-white/60 px-3 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
                <button className="rounded-xl border border-border-solid px-5 py-2.5 text-body-sm font-medium text-text-primary hover:bg-white/50 transition-colors">
                  Update password
                </button>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-sm font-medium text-text-primary">Two-factor authentication</p>
                  <p className="text-caption text-text-secondary">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={security.twoFactor} onCheckedChange={() => setSecurity(s => ({ ...s, twoFactor: !s.twoFactor }))} />
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-body font-semibold text-destructive">Danger Zone</h2>
          </div>
          <div className="rounded-2xl border border-destructive/20 bg-destructive/[0.02] p-6">
            <p className="text-body-sm text-text-primary font-medium mb-1">Delete account</p>
            <p className="text-caption text-text-secondary mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button className="rounded-xl border border-destructive py-2.5 px-5 text-body-sm font-medium text-destructive hover:bg-destructive/5 transition-colors">
              Delete account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
