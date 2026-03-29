import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap, Controls, Background, Node, Edge, Connection, useNodesState, useEdgesState,
  Position, Handle, addEdge, MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

/* Strip ReactFlow's default node wrapper border/outline */
const rfOverrides = `
.react-flow__node {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
}
.react-flow__node.selected,
.react-flow__node:focus,
.react-flow__node:focus-visible {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}
`;
import { mockArchNodes, mockArchEdges, ArchEdge } from '@/lib/mocks/architecture';
import { X, Building2, Users, UserCircle, Bot, Link2 } from 'lucide-react';

const nodeTypeStyles: Record<string, { ring: string; text: string; iconBg: string }> = {
  company: { ring: 'ring-sidebar-solid/20', text: 'text-sidebar-text', iconBg: 'bg-sidebar-solid/10' },
  department: { ring: 'ring-primary/20', text: 'text-primary', iconBg: 'bg-primary/10' },
  team: { ring: 'ring-border-solid', text: 'text-text-primary', iconBg: 'bg-border-solid/20' },
  human: { ring: 'ring-comfort/30', text: 'text-comfort-text', iconBg: 'bg-comfort/10' },
  agent: { ring: 'ring-electric/30', text: 'text-electric', iconBg: 'bg-electric/10' },
};

const nodeIcons: Record<string, typeof Building2> = {
  company: Building2,
  department: Building2,
  team: Users,
  human: UserCircle,
  agent: Bot,
};

function getEdgeStyle(type: string) {
  switch(type) {
    case 'permission':
      return { style: { strokeDasharray: '5 5', stroke: 'var(--electric)' }, animated: true };
    case 'context':
      return { style: { strokeDasharray: '2 4', stroke: 'var(--cyan)' }, animated: true };
    case 'guardrail':
      return { style: { stroke: 'var(--destructive)', strokeWidth: 2 }, animated: false };
    case 'reporting':
    default:
      return { style: { stroke: 'var(--border-solid)' }, animated: false };
  }
}

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
      position: { x: startX + idx * 240, y: level * 160 },
      data: { label: n.label, nodeType: n.type, title: n.title },
    };
  });

  return nodes;
}

function CustomNode({ data }: { data: { label: string; nodeType: string; title?: string } }) {
  const style = nodeTypeStyles[data.nodeType] || nodeTypeStyles.team;
  const Icon = nodeIcons[data.nodeType] || Users;
  return (
    <div className={`group relative bg-white/40 backdrop-blur-2xl border border-white/60 shadow-glass-large !rounded-3xl px-5 py-4 min-w-[180px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white/50 ring-1 ${style.ring}`}>
      {/* Top Handle */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-white !border-2 !border-primary opacity-0 group-hover:opacity-100 transition-opacity !-top-1.5" 
      />
      
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${style.iconBg}`}>
          <Icon className={`h-5 w-5 ${style.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`block text-body-sm font-bold tracking-tight ${style.text} truncate`}>{data.label}</span>
          {data.title && <p className="text-[11px] font-medium text-text-secondary truncate mt-0.5">{data.title}</p>}
        </div>
      </div>
      
      {/* Bottom Handle */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !bg-white !border-2 !border-primary opacity-0 group-hover:opacity-100 transition-opacity !-bottom-1.5" 
      />
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
      data: { type: e.type },
      ...getEdgeStyle(e.type),
    })), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  const onNodeClick = useCallback((_: any, node: Node) => {
    const archNode = mockArchNodes.find(n => n.id === node.id) || node;
    setSelectedNode(archNode);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((_: any, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    const newEdgeData = { type: 'reporting' };
    const newEdge = { 
      ...connection, 
      id: `e_${Date.now()}`, 
      data: newEdgeData,
      ...getEdgeStyle('reporting')
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const updateEdgeType = (newType: string) => {
    if (!selectedEdge) return;
    setEdges(eds => eds.map(e => {
      if (e.id === selectedEdge.id) {
        const updated = { ...e, data: { ...e.data, type: newType }, ...getEdgeStyle(newType) };
        setSelectedEdge(updated);
        return updated;
      }
      return e;
    }));
  };

  return (
    <div className="h-full flex overflow-hidden">
      <style>{rfOverrides}</style>
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background/50"
          defaultEdgeOptions={{ type: 'default', markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--border-solid)' } }}
        >
          <Controls className="!bg-white/70 !border-border-solid !shadow-glass-sm !rounded-xl overflow-hidden" />
          <MiniMap className="!bg-white/70 !border-border-solid !rounded-xl !shadow-glass-sm" nodeStrokeColor="var(--border-solid)" nodeColor="var(--surface-elevated)" maskColor="rgba(255,255,255,0.4)" />
          <Background color="var(--border)" gap={24} size={1} />
        </ReactFlow>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 glass-card p-4 space-y-3 z-10">
          <p className="text-caption font-semibold text-text-primary uppercase tracking-wider mb-1">Connections</p>
          <div className="flex items-center gap-2"><div className="w-6 h-0.5 bg-border-solid" /> <span className="text-caption text-text-secondary">Hierarchy</span></div>
          <div className="flex items-center gap-2"><div className="w-6 h-0 border-t-2 border-dashed border-electric" /> <span className="text-caption text-text-secondary">Permission</span></div>
          <div className="flex items-center gap-2"><div className="w-6 h-0 border-t-2 border-dotted border-cyan" /> <span className="text-caption text-text-secondary">Context Share</span></div>
          <div className="flex items-center gap-2"><div className="w-6 h-0.5 bg-destructive" /> <span className="text-caption text-text-secondary">Guardrail</span></div>
        </div>
      </div>

      {/* Side panel */}
      {(selectedNode || selectedEdge) && (
        <div className="w-80 shrink-0 border-l border-white/20 glass-liquid p-6 overflow-y-auto animate-in slide-in-from-right-8 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-body font-semibold text-text-primary">
              {selectedNode ? 'Node Details' : 'Connection Details'}
            </h3>
            <button onClick={onPaneClick} className="glass-button p-1.5 rounded-lg text-text-secondary hover:text-text-primary transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {selectedNode && (
            <div className="space-y-5">
              <div>
                <p className="text-caption text-text-secondary mb-1">Name</p>
                <div className="glass-input px-3 py-2 text-body-sm font-medium text-text-primary">
                  {selectedNode.label || selectedNode.data?.label}
                </div>
              </div>
              <div>
                <p className="text-caption text-text-secondary mb-1">Type</p>
                <span className={`inline-block glass-badge px-2.5 py-1 text-caption font-semibold capitalize ${
                  (selectedNode.type || selectedNode.data?.nodeType) === 'agent' ? 'text-primary' :
                  (selectedNode.type || selectedNode.data?.nodeType) === 'human' ? 'text-comfort-text' :
                  'text-text-secondary'
                }`}>
                  {selectedNode.type || selectedNode.data?.nodeType || 'Node'}
                </span>
              </div>
              {(selectedNode.title || selectedNode.data?.title) && (
                <div>
                  <p className="text-caption text-text-secondary mb-1">Title</p>
                  <p className="text-body-sm text-text-primary">{selectedNode.title || selectedNode.data?.title}</p>
                </div>
              )}
            </div>
          )}

          {selectedEdge && (
            <div className="space-y-5">
              <div className="glass-card p-4 space-y-3 bg-white/30 text-center">
                <Link2 className="h-6 w-6 text-primary mx-auto opacity-50 mb-2" />
                <div className="text-body-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">{nodes.find(n => n.id === selectedEdge.source)?.data?.label || 'Source'}</span>
                  <br/>to<br/>
                  <span className="font-semibold text-text-primary">{nodes.find(n => n.id === selectedEdge.target)?.data?.label || 'Target'}</span>
                </div>
              </div>

              <div>
                <p className="text-caption text-text-secondary mb-2">Connection Type</p>
                <select 
                  className="w-full glass-input px-3 py-2 text-body-sm cursor-pointer appearance-none"
                  value={selectedEdge.data?.type || 'reporting'}
                  onChange={(e) => updateEdgeType(e.target.value)}
                >
                  <option value="reporting">Hierarchy (Reporting)</option>
                  <option value="permission">Permission Grant</option>
                  <option value="context">Context Sharing</option>
                  <option value="guardrail">Guardrail Rule</option>
                </select>
                <p className="text-caption text-text-secondary/60 mt-2">
                  Change how these two entities relate to each other.
                </p>
              </div>
              
              <button 
                className="w-full glass-button !border-destructive/30 text-destructive py-2 text-body-sm font-medium mt-4"
                onClick={() => {
                  setEdges(eds => eds.filter(e => e.id !== selectedEdge.id));
                  setSelectedEdge(null);
                }}
              >
                Remove Connection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
