import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap, Controls, Background, Node, Edge, useNodesState, useEdgesState,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { mockArchNodes, mockArchEdges } from '@/lib/mocks/architecture';
import { X, Building2, Users, UserCircle, Bot } from 'lucide-react';

const nodeTypeStyles: Record<string, { bg: string; border: string; text: string }> = {
  company: { bg: 'bg-sidebar-solid', border: 'border-sidebar-solid', text: 'text-sidebar-text' },
  department: { bg: 'bg-primary/10', border: 'border-primary/20', text: 'text-primary' },
  team: { bg: 'bg-white/70', border: 'border-border-solid', text: 'text-text-primary' },
  human: { bg: 'bg-comfort', border: 'border-comfort', text: 'text-comfort-text' },
  agent: { bg: 'bg-electric-muted', border: 'border-electric/30', text: 'text-electric-bright' },
};

const nodeIcons: Record<string, typeof Building2> = {
  company: Building2,
  department: Building2,
  team: Users,
  human: UserCircle,
  agent: Bot,
};

// Layout nodes in a tree
function layoutNodes() {
  const levels: Record<string, number> = {};
  const childrenMap: Record<string, string[]> = {};

  mockArchNodes.forEach(n => {
    if (n.parentId) {
      if (!childrenMap[n.parentId]) childrenMap[n.parentId] = [];
      childrenMap[n.parentId].push(n.id);
    }
  });

  function setLevel(id: string, level: number) {
    levels[id] = level;
    (childrenMap[id] || []).forEach(c => setLevel(c, level + 1));
  }

  const root = mockArchNodes.find(n => n.type === 'company');
  if (root) setLevel(root.id, 0);

  const levelGroups: Record<number, string[]> = {};
  Object.entries(levels).forEach(([id, l]) => {
    if (!levelGroups[l]) levelGroups[l] = [];
    levelGroups[l].push(id);
  });

  const nodes: Node[] = mockArchNodes.map(n => {
    const level = levels[n.id] || 0;
    const group = levelGroups[level] || [];
    const idx = group.indexOf(n.id);
    const totalWidth = group.length * 200;
    const startX = -totalWidth / 2;

    return {
      id: n.id,
      position: { x: startX + idx * 200, y: level * 140 },
      data: { label: n.label, nodeType: n.type, title: n.title },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };
  });

  return nodes;
}

function CustomNode({ data }: { data: { label: string; nodeType: string; title?: string } }) {
  const style = nodeTypeStyles[data.nodeType] || nodeTypeStyles.team;
  const Icon = nodeIcons[data.nodeType] || Users;
  return (
    <div className={`rounded-2xl border ${style.border} ${style.bg} px-4 py-2.5 shadow-glass-sm min-w-[140px]`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${style.text}`} />
        <span className={`text-body-sm font-medium ${style.text}`}>{data.label}</span>
      </div>
      {data.title && <p className="text-caption text-text-secondary mt-0.5">{data.title}</p>}
    </div>
  );
}

const nodeTypes = { default: CustomNode };

export default function ArchitecturePage() {
  const initialNodes = useMemo(() => layoutNodes(), []);
  const initialEdges = useMemo<Edge[]>(() =>
    mockArchEdges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
      style: e.type === 'permission' ? { strokeDasharray: '5 5', stroke: 'var(--electric)' } : { stroke: 'var(--border)' },
      animated: e.type === 'permission',
    })), []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onNodeClick = useCallback((_: any, node: Node) => {
    const archNode = mockArchNodes.find(n => n.id === node.id);
    setSelectedNode(archNode);
  }, []);

  return (
    <div className="h-full flex">
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Controls className="!bg-white/70 !border-border-solid !shadow-glass-sm !rounded-xl" />
          <MiniMap className="!bg-white/70 !border-border-solid !rounded-xl" nodeStrokeColor="var(--border-solid)" nodeColor="var(--surface-elevated)" />
          <Background color="var(--border)" gap={20} size={1} />
        </ReactFlow>
      </div>

      {/* Side panel */}
      {selectedNode && (
        <div className="w-80 shrink-0 border-l border-border glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-body font-semibold text-text-primary">Node Details</h3>
            <button onClick={() => setSelectedNode(null)} className="text-text-secondary hover:text-text-primary transition-colors"><X className="h-4 w-4" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-caption text-text-secondary">Name</p>
              <p className="text-body-sm font-medium text-text-primary">{selectedNode.label}</p>
            </div>
            <div>
              <p className="text-caption text-text-secondary">Type</p>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-caption font-medium capitalize ${
                selectedNode.type === 'agent' ? 'bg-electric-muted text-electric' :
                selectedNode.type === 'human' ? 'bg-comfort text-comfort-text' :
                'bg-white/50 text-text-secondary'
              }`}>{selectedNode.type}</span>
            </div>
            {selectedNode.title && (
              <div>
                <p className="text-caption text-text-secondary">Title</p>
                <p className="text-body-sm text-text-primary">{selectedNode.title}</p>
              </div>
            )}
            {selectedNode.parentId && (
              <div>
                <p className="text-caption text-text-secondary">Reports To</p>
                <p className="text-body-sm text-text-primary">{mockArchNodes.find(n => n.id === selectedNode.parentId)?.label}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
