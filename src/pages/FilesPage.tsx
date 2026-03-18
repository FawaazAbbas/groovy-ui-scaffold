import { useState, useRef, useEffect } from 'react';
import { mockFiles, FileItem } from '@/lib/mocks/files';
import { Folder, FileText, Image, Film, FileSpreadsheet, LayoutGrid, List, ChevronRight, Shield, Download, Pencil, Trash2 } from 'lucide-react';

const iconMap: Record<string, typeof FileText> = {
  'application/pdf': FileText,
  'image/png': Image,
  'image/jpeg': Image,
  'video/mp4': Film,
  'application/xlsx': FileSpreadsheet,
  'text/markdown': FileText,
};

function formatSize(bytes: number) {
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  return `${(bytes / 1e3).toFixed(0)} KB`;
}

interface ContextMenu {
  x: number;
  y: number;
  item: FileItem;
}

export default function FilesPage() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);

  const items = mockFiles.filter(f => f.parentId === currentFolder);
  const breadcrumbs = getBreadcrumbs(currentFolder);

  function getBreadcrumbs(folderId: string | null): FileItem[] {
    const crumbs: FileItem[] = [];
    let id = folderId;
    while (id) {
      const folder = mockFiles.find(f => f.id === id);
      if (folder) { crumbs.unshift(folder); id = folder.parentId; } else break;
    }
    return crumbs;
  }

  const handleClick = (item: FileItem) => {
    if (item.type === 'folder') setCurrentFolder(item.id);
  };

  const handleContextMenu = (e: React.MouseEvent, item: FileItem) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  useEffect(() => {
    const close = () => setContextMenu(null);
    if (contextMenu) {
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }
  }, [contextMenu]);

  const permissionColors: Record<string, string> = {
    owner: 'bg-primary/10 text-primary',
    editor: 'bg-comfort text-comfort-text',
    viewer: 'bg-white/50 text-text-secondary',
  };

  const menuItems = [
    { label: 'Manage Permissions', icon: Shield },
    { label: 'Rename', icon: Pencil },
    { label: 'Download', icon: Download },
    { label: 'Delete', icon: Trash2, destructive: true },
  ];

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-heading font-semibold text-text-primary">Files</h1>
          <nav className="flex items-center gap-1 mt-1 text-body-sm">
            <button onClick={() => setCurrentFolder(null)} className="text-text-secondary hover:text-primary transition-colors">Root</button>
            {breadcrumbs.map(b => (
              <span key={b.id} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3 text-text-secondary" />
                <button onClick={() => setCurrentFolder(b.id)} className="text-text-secondary hover:text-primary transition-colors">{b.name}</button>
              </span>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-border-solid bg-white/40 p-0.5">
          <button onClick={() => setViewMode('grid')} className={`rounded-lg p-1.5 transition-all duration-200 ${viewMode === 'grid' ? 'bg-primary text-white shadow-glass-sm' : 'text-text-secondary'}`}><LayoutGrid className="h-4 w-4" /></button>
          <button onClick={() => setViewMode('list')} className={`rounded-lg p-1.5 transition-all duration-200 ${viewMode === 'list' ? 'bg-primary text-white shadow-glass-sm' : 'text-text-secondary'}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map(item => {
            const Icon = item.type === 'folder' ? Folder : (iconMap[item.mimeType || ''] || FileText);
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                onContextMenu={e => handleContextMenu(e, item)}
                className="card-glass p-4 text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`h-8 w-8 ${item.type === 'folder' ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${permissionColors[item.permission]}`}>
                    <Shield className="inline h-2.5 w-2.5 mr-0.5" />{item.permission}
                  </span>
                </div>
                <p className="text-body-sm font-medium text-text-primary truncate">{item.name}</p>
                <p className="text-caption text-text-secondary mt-1">
                  {item.type === 'folder' ? `${item.children?.length || 0} items` : formatSize(item.size || 0)}
                </p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="card-glass overflow-hidden">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-border-solid bg-white/40">
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Name</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Size</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Modified</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Permission</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const Icon = item.type === 'folder' ? Folder : (iconMap[item.mimeType || ''] || FileText);
                return (
                  <tr key={item.id} onClick={() => handleClick(item)} onContextMenu={e => handleContextMenu(e, item)} className="border-b border-border/50 cursor-pointer hover:bg-white/30 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${item.type === 'folder' ? 'text-primary' : 'text-text-secondary'}`} />
                      <span className="text-text-primary">{item.name}</span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{item.type === 'folder' ? `${item.children?.length || 0} items` : formatSize(item.size || 0)}</td>
                    <td className="px-4 py-3 text-text-secondary">{new Date(item.updatedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-caption font-medium ${permissionColors[item.permission]}`}>{item.permission}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Custom Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-50 min-w-[180px] rounded-2xl border border-border glass py-1.5 shadow-glass-lg"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <p className="px-3 py-1.5 text-caption font-medium text-text-secondary truncate">{contextMenu.item.name}</p>
          <div className="my-1 h-px bg-border" />
          {menuItems.map(mi => (
            <button
              key={mi.label}
              onClick={() => setContextMenu(null)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-body-sm hover:bg-white/40 transition-colors rounded-lg mx-0.5 ${mi.destructive ? 'text-destructive' : 'text-text-primary'}`}
            >
              <mi.icon className="h-3.5 w-3.5" />
              {mi.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
