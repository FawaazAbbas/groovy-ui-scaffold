import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  MessageSquare, CheckSquare, Calendar, FolderOpen, Activity,
  Network, Puzzle, CreditCard, Search, Bell, ChevronLeft, ChevronRight,
  Menu, X, Command, Sun, Moon, Presentation, Store, ShieldCheck, ShieldAlert, Lock, Settings,
} from 'lucide-react';
import { useDarkMode } from '@/hooks/use-dark-mode';
import { mockSession } from '@/lib/mocks/session';
import { CommandPalette } from '@/components/CommandPalette';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const navItems = [
  { label: 'Tasks', icon: CheckSquare, path: '/space/tasks', tourId: 'nav-tasks' },
  { label: 'Files', icon: FolderOpen, path: '/space/files' },
  { label: 'Activity', icon: Activity, path: '/space/activity', tourId: 'nav-activity' },
  { label: 'Architecture', icon: Network, path: '/space/architecture' },
  { label: 'Marketplace', icon: Store, path: '/space/marketplace', tourId: 'nav-marketplace' },
  { label: 'Integrations', icon: Puzzle, path: '/space/integrations', tourId: 'nav-integrations' },
  { label: 'Permissions', icon: ShieldCheck, path: '/space/permissions' },
  { label: 'Guardrails', icon: ShieldAlert, path: '/space/guardrails' },
  { label: 'Billing', icon: CreditCard, path: '/space/billing' },
  { label: 'Settings', icon: Settings, path: '/space/settings' },
  { label: 'Chats', icon: MessageSquare, path: '/space/chats', tourId: 'nav-chats', locked: true },
  { label: 'Calendar', icon: Calendar, path: '/space/calendar', tourId: 'nav-calendar', locked: true },
];

export default function WorkspaceLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { isDark, toggle: toggleDark } = useDarkMode();
  const location = useLocation();
  const { user, profile, workspace, signOut } = useAuth();

  // Use real data if Supabase is configured, otherwise fall back to mock
  const displayName = isSupabaseConfigured && profile ? profile.full_name : mockSession.user.name;
  const displayRole = isSupabaseConfigured && profile ? profile.role : mockSession.user.role;
  const displayWorkspace = isSupabaseConfigured && workspace ? workspace.name : mockSession.workspace.name;
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase();

  const sidebarWidth = collapsed ? 'w-16' : 'w-[260px]';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar — liquid glass */}
      <aside
        className={`${sidebarWidth} fixed md:relative z-50 flex h-full flex-col glass-liquid transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Accent line */}
        <div className="retro-divider" />

        {/* Workspace header */}
        <div className="flex h-14 items-center gap-3 border-b border-black/[0.04] px-4">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-glass-sm">
            <span className="text-sm font-semibold text-white">{displayWorkspace[0]}</span>
            <span className="absolute -bottom-0.5 -right-0.5 neon-dot animate-pulse" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="truncate text-body-sm font-semibold tracking-tight text-text-primary block">{displayWorkspace}</span>
              <span className="retro-label text-primary/40">ONLINE</span>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive = !item.locked && location.pathname.startsWith(item.path);

            if (item.locked) {
              return (
                <div
                  key={item.path}
                  title="Coming soon"
                  className={`relative flex items-center gap-3 rounded-xl px-3 py-2 text-body-sm opacity-25 cursor-not-allowed select-none ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0 text-text-secondary/50" />
                  {!collapsed && (
                    <>
                      <span className="text-text-secondary/50">{item.label}</span>
                      <Lock className="h-3 w-3 text-text-secondary/40 ml-auto shrink-0" />
                    </>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                data-tour={item.tourId}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2 text-body-sm border border-transparent transition-all duration-200 ${
                  isActive
                    ? 'glass-liquid-item-active text-primary font-medium'
                    : 'text-text-secondary hover:glass-liquid-item hover:text-text-primary'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-primary neon-glow-sm" />
                )}
                <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-primary' : ''}`} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="border-t border-black/[0.04] p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`w-full flex items-center gap-3 rounded-xl px-2 py-2 text-left hover:glass-liquid-item transition-all ${collapsed ? 'justify-center' : ''} focus:outline-none`}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-white shadow-glass-sm ring-1 ring-white/50">
                  {initials}
                </div>
                {!collapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-body-sm font-medium text-text-primary">{displayName}</p>
                    <p className="truncate text-caption text-text-secondary capitalize">{displayRole}</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align={collapsed ? "center" : "start"} className="w-56 glass-modal border border-white/30 shadow-glass-large mb-1">
              <div className="px-2 py-1.5 border-b border-white/10 mb-1">
                <p className="text-body-sm font-medium text-text-primary truncate">{displayName}</p>
                <p className="text-caption text-text-secondary truncate">{profile?.email || mockSession.user.email}</p>
              </div>
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/40 focus:bg-white/40 rounded-lg">
                <Link to="/space/settings" className="w-full flex">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 rounded-lg">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Divider + version */}
        <div className="retro-divider" />
        {!collapsed && (
          <div className="flex items-center justify-between px-4 py-1.5">
            <span className="retro-label text-text-secondary/40">v2.4.1</span>
            <span className="retro-label text-primary/60">GROOVY</span>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-10 items-center justify-center border-t border-black/[0.04] text-text-secondary/40 hover:text-text-secondary transition-colors duration-200"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar — frosted glass */}
        <header className="flex h-12 shrink-0 items-center justify-between glass-liquid border-b border-white/20 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden md:flex items-center gap-1.5 text-body-sm text-text-secondary">
              <Link to="/space/chats" className="hover:text-text-primary transition-colors">Workspace</Link>
              <span className="text-primary/30 font-mono">//</span>
              <span className="font-mono text-text-primary font-medium capitalize tracking-wide">
                {location.pathname.split('/')[2] || 'chats'}
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 glass-button rounded-lg px-3 py-1.5 text-body-sm text-text-secondary"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md glass-badge px-1.5 py-0.5 text-caption font-mono text-text-secondary/60">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>
            <button
              onClick={toggleDark}
              className="glass-button rounded-lg p-1.5 text-text-secondary hover:text-text-primary"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <button className="relative glass-button rounded-lg p-1.5 text-text-secondary hover:text-text-primary">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white neon-glow-sm">
                3
              </span>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-white shadow-glass-sm ring-2 ring-white/40 hover:ring-white/70 transition-all focus:outline-none">
                  {initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end" className="w-56 glass-modal border border-white/30 shadow-glass-large mt-3">
                <div className="px-2 py-1.5 border-b border-white/10 mb-1">
                  <p className="text-body-sm font-medium text-text-primary truncate">{displayName}</p>
                  <p className="text-caption text-text-secondary truncate">{profile?.email || mockSession.user.email}</p>
                </div>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/40 focus:bg-white/40 rounded-lg">
                  <Link to="/space/settings" className="w-full flex">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 rounded-lg">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Command palette */}
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
}
