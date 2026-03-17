import { useState } from 'react';
import { mockFiles, FileItem } from '@/lib/mocks/files';
import { mockUsers } from '@/lib/mocks/users';
import { Folder, FileText, Image, Film, FileSpreadsheet, LayoutGrid, List, ChevronRight, Shield } from 'lucide-react';

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

export default function FilesPage() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const permissionColors: Record<string, string> = {
    owner: 'bg-primary/10 text-primary',
    editor: 'bg-comfort text-comfort-text',
    viewer: 'bg-surface-elevated text-text-secondary',
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-heading font-semibold text-text-primary">Files</h1>
          <nav className="flex items-center gap-1 mt-1 text-body-sm">
            <button onClick={() => setCurrentFolder(null)} className="text-text-secondary hover:text-primary">Root</button>
            {breadcrumbs.map(b => (
              <span key={b.id} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3 text-text-secondary" />
                <button onClick={() => setCurrentFolder(b.id)} className="text-text-secondary hover:text-primary">{b.name}</button>
              </span>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
          <button onClick={() => setViewMode('grid')} className={`rounded-md p-1.5 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary'}`}><LayoutGrid className="h-4 w-4" /></button>
          <button onClick={() => setViewMode('list')} className={`rounded-md p-1.5 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary'}`}><List className="h-4 w-4" /></button>
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
                onContextMenu={e => e.preventDefault()}
                className="rounded-xl border border-border bg-surface p-4 text-left hover:shadow-md hover:border-primary/30 transition-all group"
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
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-border bg-surface-elevated">
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
                  <tr key={item.id} onClick={() => handleClick(item)} className="border-b border-border/50 cursor-pointer hover:bg-surface-elevated/50">
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
    </div>
  );
}
