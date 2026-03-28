import { useState, useEffect } from 'react';
import { User, Building2, Bell, Shield, AlertTriangle, Camera, Users, CreditCard, Plus, MoreHorizontal, Check, Trash2, Mail, Copy, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const TABS = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'workspace', label: 'General', icon: Building2 },
  { id: 'members', label: 'User Management', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
] as const;

export default function SettingsPage() {
  const { user, profile: authProfile, workspace: authWorkspace } = useAuth();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('profile');

  const [profile, setProfile] = useState({
    name: authProfile?.full_name || 'Anonymous User',
    email: authProfile?.email || user?.email || '',
    title: 'Product Engineer',
    department: 'Engineering',
  });

  const [workspace, setWorkspace] = useState({
    name: authWorkspace?.name || 'My Workspace',
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

  const [workspaceUsers, setWorkspaceUsers] = useState<any[]>([]);
  const [copiedPin, setCopiedPin] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Sync local state when auth data loads
    if (authProfile) {
      setProfile(p => ({ ...p, name: authProfile.full_name, email: authProfile.email }));
    }
    if (authWorkspace) {
      setWorkspace(w => ({ ...w, name: authWorkspace.name }));
    }
  }, [authProfile, authWorkspace]);

  useEffect(() => {
    // Fetch real workspace users
    if (!isSupabaseConfigured || !authWorkspace?.id) return;
    
    supabase
      .from('user_profiles')
      .select('*')
      .eq('workspace_id', authWorkspace.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setWorkspaceUsers(data);
      });
  }, [authWorkspace?.id]);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyPin = () => {
    if (authWorkspace?.invite_code) {
      navigator.clipboard.writeText(authWorkspace.invite_code);
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setSaving(true);
    const { error } = await supabase
      .from('user_profiles')
      .update({
        full_name: profile.name,
        job_title: profile.title,
      })
      .eq('user_id', user.id);
    
    setSaving(false);
    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully');
    }
  };

  const handleSaveWorkspace = async () => {
    if (!authWorkspace?.id) return;
    setSaving(true);
    const { error } = await supabase
      .from('company_workspaces')
      .update({
        name: workspace.name,
      })
      .eq('id', authWorkspace.id);
    
    setSaving(false);
    if (error) {
      toast.error('Failed to update workspace');
    } else {
      toast.success('Workspace updated successfully');
    }
  };

  // If Supabase not connected or loading, show dummy users
  const displayUsers = workspaceUsers.length > 0 ? workspaceUsers.map(u => ({
    id: u.id,
    name: u.full_name,
    email: u.email,
    role: u.role === 'admin' ? 'Admin' : 'Member',
    status: 'Active',
    avatar: u.full_name ? u.full_name.charAt(0).toUpperCase() : 'U'
  })) : [
    { id: '1', name: profile.name, email: profile.email, role: 'Admin', status: 'Active', avatar: profile.name.charAt(0).toUpperCase() || 'U' },
  ];

  return (
    <div className="p-6 w-full max-w-[1200px] mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-heading font-semibold text-text-primary">Settings & Admin</h1>
        <p className="text-body-sm text-text-secondary mt-1">Manage your professional identity, workspace configuration, and billing.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1 overflow-y-auto pr-2 pb-8">
          <p className="text-caption font-semibold text-text-secondary uppercase tracking-widest pl-3 mb-2">Personal</p>
          {TABS.slice(0, 1).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-body-sm font-medium transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]' 
                  : 'text-text-secondary hover:bg-white/40 hover:text-text-primary'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-primary' : 'text-text-secondary/70'}`} />
              {tab.label}
            </button>
          ))}
          
          <p className="text-caption font-semibold text-text-secondary uppercase tracking-widest pl-3 mt-6 mb-2">Workspace</p>
          {TABS.slice(1, 4).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-body-sm font-medium transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]' 
                  : 'text-text-secondary hover:bg-white/40 hover:text-text-primary'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-primary' : 'text-text-secondary/70'}`} />
              {tab.label}
            </button>
          ))}

          <p className="text-caption font-semibold text-text-secondary uppercase tracking-widest pl-3 mt-6 mb-2">Account</p>
          {TABS.slice(4).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-body-sm font-medium transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]' 
                  : 'text-text-secondary hover:bg-white/40 hover:text-text-primary'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-primary' : 'text-text-secondary/70'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-12 pr-2 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <div className="glass-card shadow-glass-large ring-1 ring-white/60 p-8">
                <h2 className="text-heading-sm font-semibold text-text-primary mb-6">Profile Details</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/20">
                  <div className="relative group cursor-pointer">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-electric text-3xl font-semibold text-white shadow-glass-sm shrink-0 transition-transform group-hover:scale-105">
                      {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-text-primary mb-1">Your Photo</h3>
                    <p className="text-caption text-text-secondary max-w-sm mb-3">This will be displayed on your profile and visibly across team workspaces.</p>
                    <div className="flex gap-3">
                      <button className="glass-button px-4 py-1.5 text-body-sm font-medium text-text-primary">Upload new</button>
                      <button className="text-body-sm font-medium text-destructive hover:opacity-80 transition-opacity">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                      className="w-full glass-input text-body-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full glass-input text-body-sm opacity-60 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Role Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={e => setProfile(p => ({ ...p, title: e.target.value }))}
                      className="w-full glass-input text-body-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Department</label>
                    <input
                      type="text"
                      value={profile.department}
                      onChange={e => setProfile(p => ({ ...p, department: e.target.value }))}
                      className="w-full glass-input text-body-sm"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button onClick={handleSaveProfile} disabled={saving} className="rounded-xl flex items-center justify-center gap-2 bg-primary px-6 py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Workspace */}
          {activeTab === 'workspace' && (
            <div className="space-y-6 max-w-2xl">
              <div className="glass-card shadow-glass-large ring-1 ring-white/60 p-8">
                <h2 className="text-heading-sm font-semibold text-text-primary mb-2">Workspace Preferences</h2>
                <p className="text-body-sm text-text-secondary mb-8">Manage how your organizational workspace looks and behaves.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Workspace Name</label>
                    <input
                      type="text"
                      value={workspace.name}
                      onChange={e => setWorkspace(w => ({ ...w, name: e.target.value }))}
                      className="w-full max-w-md glass-input text-body-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Default Timezone</label>
                    <select
                      value={workspace.timezone}
                      onChange={e => setWorkspace(w => ({ ...w, timezone: e.target.value }))}
                      className="w-full max-w-md glass-input text-body-sm"
                    >
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="Europe/Paris">Europe/Paris (CET)</option>
                      <option value="America/New_York">America/New York (EST)</option>
                      <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                      <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Primary Language</label>
                    <select
                      value={workspace.language}
                      onChange={e => setWorkspace(w => ({ ...w, language: e.target.value }))}
                      className="w-full max-w-md glass-input text-body-sm"
                    >
                      <option value="en">English (US)</option>
                      <option value="en-gb">English (UK)</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button onClick={handleSaveWorkspace} disabled={saving} className="rounded-xl flex items-center justify-center gap-2 bg-primary px-6 py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover transition-colors shadow-glass-sm disabled:opacity-50">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="glass-card shadow-glass-large ring-1 ring-white/60 p-8">
                
                {/* Magic PIN Banner */}
                {authWorkspace?.invite_code && (
                  <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-electric/5 border border-primary/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-body font-semibold text-primary mb-1">Workspace Magic PIN</h3>
                      <p className="text-caption text-text-secondary">Share this secure pin with your team so they can instantly join your workspace without needing a tailored email invite.</p>
                    </div>
                    <div className="flex items-center gap-3 glass-card px-4 py-2 bg-white/50">
                      <span className="font-mono text-xl font-bold text-text-primary tracking-[0.2em]">{authWorkspace.invite_code}</span>
                      <button 
                        onClick={handleCopyPin}
                        className="glass-button p-2.5 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                        title="Copy Magic PIN"
                      >
                        {copiedPin ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-heading-sm font-semibold text-text-primary mb-1">Active Members</h2>
                    <p className="text-body-sm text-text-secondary">Manage {displayUsers.length} total users sharing this environment.</p>
                  </div>
                </div>
                
                <div className="overflow-hidden rounded-2xl ring-1 ring-white/40">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/40 backdrop-blur-md">
                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-white/20">Member</th>
                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-white/20">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-white/20">Status</th>
                        <th className="px-6 py-4 border-b border-white/20 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                      {displayUsers.map(u => (
                        <tr key={u.id} className="bg-white/20 hover:bg-white/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-electric text-white font-medium text-sm shadow-sm shrink-0">
                                {u.avatar}
                              </div>
                              <div>
                                <p className="text-body-sm font-semibold text-text-primary">{u.name}</p>
                                <p className="text-caption text-text-secondary">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-body-sm font-medium text-text-primary px-3 py-1 rounded-full bg-white/40 ring-1 ring-white/50">
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${u.status === 'Active' ? 'bg-comfort-text' : 'bg-amber-400'}`} />
                              <span className="text-body-sm text-text-secondary">{u.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {u.id !== authProfile?.id && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-2 rounded-xl hover:bg-white/40 text-text-secondary transition-colors">
                                    <MoreHorizontal className="h-5 w-5" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 glass-modal border border-white/30 shadow-glass-large">
                                  <DropdownMenuItem className="text-body-sm py-2 cursor-pointer hover:bg-white/40 focus:bg-white/40">
                                    Change Role
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-body-sm py-2 cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10">
                                    Remove User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-2xl">
              <div className="glass-card shadow-glass-large ring-1 ring-white/60 p-8">
                <h2 className="text-heading-sm font-semibold text-text-primary mb-2">Notification Preferences</h2>
                <p className="text-body-sm text-text-secondary mb-8">Choose what updates you want to receive and where.</p>
                
                <h3 className="text-[13px] font-semibold text-text-primary uppercase tracking-wider mb-4">Email Communications</h3>
                <div className="space-y-3 mb-8">
                  {[
                    { key: 'emailAgentCompletions' as const, label: 'Agent Task Completions', desc: 'Alerts when complex agents finish long-running jobs.' },
                    { key: 'emailWeeklyDigest' as const, label: 'Weekly Performance Digest', desc: 'A beautiful summary of your workspace token usage.' },
                    { key: 'emailBilling' as const, label: 'Billing & Invoices', desc: 'Account alerts and monthly receipts.' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between glass-card p-4 hover:bg-white/60 transition-colors">
                      <div>
                        <p className="text-body-sm font-semibold text-text-primary mb-0.5">{item.label}</p>
                        <p className="text-caption text-text-secondary">{item.desc}</p>
                      </div>
                      <Switch checked={notifications[item.key]} onCheckedChange={() => toggleNotification(item.key)} />
                    </div>
                  ))}
                </div>

                <h3 className="text-[13px] font-semibold text-text-primary uppercase tracking-wider mb-4">In-App Alerts</h3>
                <div className="space-y-3">
                  {[
                    { key: 'inAppActivity' as const, label: 'Agent Activity Stream', desc: 'Real-time updates in the dashboard when agents decide actions.' },
                    { key: 'inAppTasks' as const, label: 'Human-in-the-loop Tasks', desc: 'When an agent explicitly pauses to request your approval.' },
                    { key: 'inAppMentions' as const, label: 'Workspace Mentions', desc: 'When team members mention you in architecture context.' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between glass-card p-4 hover:bg-white/60 transition-colors">
                      <div>
                        <p className="text-body-sm font-semibold text-text-primary mb-0.5">{item.label}</p>
                        <p className="text-caption text-text-secondary">{item.desc}</p>
                      </div>
                      <Switch checked={notifications[item.key]} onCheckedChange={() => toggleNotification(item.key)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div className="glass-card shadow-glass-large ring-1 ring-white/60 p-8">
                <h2 className="text-heading-sm font-semibold text-text-primary mb-8">Security Configuration</h2>
                
                <div className="mb-10">
                  <h3 className="text-[13px] font-semibold text-text-primary uppercase tracking-wider mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <input type="password" placeholder="Current password" className="w-full glass-input text-body-sm" />
                    <input type="password" placeholder="New password" className="w-full glass-input text-body-sm" />
                    <input type="password" placeholder="Confirm new password" className="w-full glass-input text-body-sm" />
                    <button className="glass-button px-5 py-2.5 text-body-sm font-medium text-text-primary mt-2">Update Password</button>
                  </div>
                </div>

                <div className="mb-10 pt-8 border-t border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[13px] font-semibold text-text-primary uppercase tracking-wider mb-1">Two-Factor Authentication (2FA)</h3>
                      <p className="text-caption text-text-secondary max-w-md">Require a secure code from an authenticator app each time you sign in to protect your sensitive agent architectures.</p>
                    </div>
                    <Switch checked={security.twoFactor} onCheckedChange={() => setSecurity(s => ({ ...s, twoFactor: !s.twoFactor }))} />
                  </div>
                  {security.twoFactor && (
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-body-sm font-semibold text-primary mb-1">2FA is currently enabled</p>
                        <p className="text-caption text-primary/80">Your account is secured. You can manage your recovery codes or disable 2FA from this panel.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <h3 className="text-[13px] font-semibold text-destructive uppercase tracking-wider">Danger Zone</h3>
                  </div>
                  <div className="glass-card bg-destructive/5 !border-destructive/20 p-6 flex items-center justify-between">
                    <div>
                      <p className="text-body-sm font-semibold text-text-primary mb-1">Delete Account</p>
                      <p className="text-caption text-text-secondary max-w-md">Permanently execute a hard deletion of your identity and all personal data. This cannot be undone.</p>
                    </div>
                    <button className="glass-button text-destructive border border-destructive/30 hover:bg-destructive/10 px-5 py-2.5 text-body-sm font-medium shrink-0">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="glass-card shadow-glass-large ring-1 ring-white/60 p-8 max-w-4xl">
                <div className="flex flex-col md:flex-row gap-8 justify-between">
                  <div className="flex-1">
                    <h2 className="text-heading-sm font-semibold text-text-primary mb-2">Current Subscription</h2>
                    <p className="text-body-sm text-text-secondary mb-6">You are currently operating on the Team plan, paying annually.</p>
                    
                    <div className="flex items-end gap-3 mb-8">
                      <span className="text-4xl font-bold text-text-primary">$49</span>
                      <span className="text-body text-text-secondary mb-1">/ user / mo</span>
                    </div>

                    <div className="flex gap-4">
                      <button className="rounded-xl bg-primary px-6 py-2.5 text-body-sm font-medium text-white hover:bg-primary-hover shadow-glass-sm">
                        Upgrade to Enterprise
                      </button>
                      <button className="glass-button px-6 py-2.5 text-body-sm font-medium text-text-primary">
                        Manage Payment Methods
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-80 glass-card p-6 space-y-5 bg-white/30 backdrop-blur-xl shrink-0">
                    <h3 className="text-body-sm font-semibold text-text-primary">Token Usage</h3>
                    <div>
                      <div className="flex justify-between text-caption mb-2">
                        <span className="text-text-secondary">GPT-4 Inference</span>
                        <span className="font-semibold text-primary">7.2M / 10M limits</span>
                      </div>
                      <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                        <div className="h-full bg-electric rounded-full" style={{ width: '72%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-caption mb-2">
                        <span className="text-text-secondary">Claude 3.5 Context</span>
                        <span className="font-semibold text-primary">12M / ∞ limits</span>
                      </div>
                      <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/20">
                  <h3 className="text-body font-semibold text-text-primary mb-4">Billing History</h3>
                  <div className="overflow-hidden rounded-xl border border-white/40 bg-white/20">
                    <table className="w-full text-left text-body-sm">
                      <thead className="bg-white/40">
                        <tr>
                          <th className="px-5 py-3 font-semibold text-text-secondary">Invoice</th>
                          <th className="px-5 py-3 font-semibold text-text-secondary">Date</th>
                          <th className="px-5 py-3 font-semibold text-text-secondary">Status</th>
                          <th className="px-5 py-3 font-semibold text-text-secondary text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/20">
                        {[
                          { id: 'INV-2026-03', date: 'Mar 1, 2026', status: 'Paid', amount: '$147.00' },
                          { id: 'INV-2026-02', date: 'Feb 1, 2026', status: 'Paid', amount: '$147.00' },
                          { id: 'INV-2026-01', date: 'Jan 1, 2026', status: 'Paid', amount: '$147.00' },
                        ].map((inv) => (
                          <tr key={inv.id} className="hover:bg-white/30 transition-colors">
                            <td className="px-5 py-3 font-medium text-text-primary">{inv.id}</td>
                            <td className="px-5 py-3 text-text-secondary">{inv.date}</td>
                            <td className="px-5 py-3">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-comfort/20 text-comfort-text text-[11px] font-semibold tracking-wide">
                                <Check className="h-3 w-3" /> {inv.status}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right font-medium text-text-primary">{inv.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
