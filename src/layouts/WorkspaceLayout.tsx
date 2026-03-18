import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  MessageSquare, CheckSquare, Calendar, FolderOpen, Activity,
  Network, Puzzle, CreditCard, Search, Bell, ChevronLeft, ChevronRight,
  Menu, X, Command,
} from 'lucide-react';
import { mockSession } from '@/lib/mocks/session';
import { CommandPalette } from '@/components/CommandPalette';

const navItems = [
  { label: 'Chats', icon: MessageSquare, path: '/chats' },
  { label: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { label: 'Calendar', icon: Calendar, path: '/calendar' },
  { label: 'Files', icon: FolderOpen, path: '/files' },
  { label: 'Activity', icon: Activity, path: '/activity' },
  { label: 'Architecture', icon: Network, path: '/architecture' },
  { label: 'Integrations', icon: Puzzle, path: '/integrations' },
  { label: 'Billing', icon: CreditCard, path: '/billing' },
];

export default function WorkspaceLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const location = useLocation();

  const sidebarWidth = collapsed ? 'w-16' : 'w-[260px]';

  return (
    <div className="flex h-screen overflow-hidden bg-background" style={{ background: 'linear-gradient(135deg, #F5F5F7 0%, #E8EAF0 30%, #F0F2F5 50%, #EDE8F5 70%, #F5F5F7 100%)' }}>
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
        {/* Workspace header */}
        <div className="flex h-14 items-center gap-3 border-b border-black/[0.04] px-4">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-primary to-[#005BB5] shadow-glass-sm">
            <span className="text-sm font-semibold text-white">A</span>
            <span className="absolute -bottom-0.5 -right-0.5 neon-dot animate-pulse" />
          </div>
          {!collapsed && (
            <span className="truncate text-body-sm font-semibold tracking-tight text-text-primary">{mockSession.workspace.name}</span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2 text-body-sm transition-all duration-200 ${
                  isActive
                    ? 'glass-liquid-item-active text-electric font-medium'
                    : 'text-text-secondary hover:glass-liquid-item hover:text-text-primary'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-electric neon-glow-sm" />
                )}
                <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-electric drop-shadow-[0_0_6px_rgba(57,255,20,0.5)]' : ''}`} />
                {!collapsed && <span className={isActive ? 'text-shadow-[0_0_8px_rgba(57,255,20,0.3)]' : ''}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="border-t border-black/[0.04] p-3">
          <div className={`flex items-center gap-3 rounded-xl px-2 py-2 glass-liquid-item ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary to-[#005BB5] text-xs font-medium text-white shadow-glass-sm">
              {mockSession.user.name.split(' ').map(n => n[0]).join('')}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-body-sm font-medium text-text-primary">{mockSession.user.name}</p>
                <p className="truncate text-caption text-text-secondary">{mockSession.user.role}</p>
              </div>
            )}
          </div>
        </div>

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
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-border glass px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden md:flex items-center gap-1.5 text-body-sm text-text-secondary">
              <Link to="/chats" className="hover:text-text-primary transition-colors">Workspace</Link>
              <span className="text-text-secondary/40">/</span>
              <span className="text-text-primary font-medium capitalize">
                {location.pathname.split('/')[1] || 'chats'}
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-white/50 px-3 py-1.5 text-body-sm text-text-secondary hover:bg-white/80 transition-all duration-200"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border-solid px-1.5 py-0.5 text-caption font-mono text-text-secondary/60">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>
            <button className="relative text-text-secondary hover:text-text-primary transition-colors">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-electric text-[10px] font-bold text-[#0a1f07] neon-glow-sm">
                3
              </span>
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-primary to-[#005BB5] text-[11px] font-medium text-white">
              {mockSession.user.name.split(' ').map(n => n[0]).join('')}
            </div>
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
