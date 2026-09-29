import React, { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, type Node, type Edge, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import { getCompanyById, companies } from '../data';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize, Network } from 'lucide-react';

const CustomNode = ({ data }: any) => {
  const getStyle = () => {
    switch (data.type) {
      case 'COMPANY': return 'border-blue-500 bg-white text-blue-900 shadow-md ring-2 ring-blue-500/20';
      case 'FOUNDER': return 'border-emerald-500 bg-emerald-50 text-emerald-900 rounded-full shadow-xs';
      case 'INVESTOR': return 'border-amber-500 bg-amber-50 text-amber-900 rotate-45 shadow-xs';
      case 'COMPETITOR': return 'border-rose-400 bg-rose-50 text-rose-900 shadow-xs';
      case 'UNIVERSITY': return 'border-purple-400 bg-purple-50 text-purple-900 shadow-xs';
      default: return 'border-slate-200 bg-white text-slate-800 shadow-xs';
    }
  };

  const getInnerStyle = () => {
    if (data.type === 'INVESTOR') return '-rotate-45 text-center flex flex-col items-center justify-center h-full w-full';
    return 'text-center flex flex-col items-center justify-center h-full w-full';
  };

  return (
    <div className={`px-4 py-2 border cursor-pointer hover:border-blue-600 hover:shadow-lg transition-all ${getStyle()} ${data.isCenter ? 'w-48 h-48 rounded-2xl text-xl' : 'w-32 h-32 text-sm'}`} onClick={() => data.onClick?.(data.id, data.type)}>
      <Handle type="target" position={Position.Top} className="!bg-slate-300 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-slate-300 !border-0" />
      <Handle type="source" position={Position.Left} className="!bg-slate-300 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-slate-300 !border-0" />
      
      <div className={getInnerStyle()}>
        <div className="font-bold whitespace-normal leading-tight">{data.label}</div>
        <div className="text-[10px] mt-1 font-mono uppercase tracking-wider font-semibold opacity-70">{data.type}</div>
        {data.subtitle && <div className="text-xs mt-1 font-mono text-slate-500">{data.subtitle}</div>}
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function GraphPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const companyId = id || '1'; // Default to 1 if no id
  const company = useMemo(() => getCompanyById(companyId) || companies[0], [companyId]);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const addNode = (id: string, label: string, type: string, x: number, y: number, isCenter = false, subtitle?: string) => {
      const nodeData = {
        id: id,
        type: 'custom',
        position: { x, y },
        data: { id, label, type, isCenter, subtitle, onClick: (id: string, type: string) => {
          if (type === 'COMPANY' || type === 'COMPETITOR') {
            navigate(`/company/${id}`);
          } else if (type === 'UNIVERSITY') {
            navigate('/ecosystem');
          } else if (type === 'FOUNDER') {
            navigate('/network');
          }
        } }
      };
      nodes.push(nodeData);
      return id;
    };

    const addEdge = (source: string, target: string, label?: string) => {
      edges.push({
        id: `e-${source}-${target}`,
        source,
        target,
        animated: true,
        style: { stroke: '#94a3b8', strokeWidth: 1.5 },
        label,
        labelStyle: { fill: '#475569', fontSize: 10, fontWeight: 600, fontFamily: 'monospace' },
        labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95, rx: 4, stroke: '#e2e8f0' },
      });
    };

    if (company) {
      // Center node
      const centerId = addNode(company.id, company.name, 'COMPANY', 400, 300, true);

      let angle = 0;
      const foundersCount = company.founders?.length || 0;
      const investorsCount = company.investors?.length || 0;
      const competitorsCount = company.competitors?.length || 0;
      const totalPrimaryNodes = foundersCount + investorsCount + competitorsCount;
      const angleStep = (2 * Math.PI) / (totalPrimaryNodes || 1);
      const radius = 250;

      // Founders
      company.founders?.forEach((founder) => {
        const x = 400 + radius * Math.cos(angle);
        const y = 300 + radius * Math.sin(angle);
        const founderId = addNode(`founder-${founder.id}`, founder.name, 'FOUNDER', x, y, false, founder.title);
        addEdge(centerId, founderId, 'FOUNDED_BY');
        
        // Add university
        if (founder.education && founder.education.length > 0) {
          const eduRadius = 350;
          const edX = 400 + eduRadius * Math.cos(angle);
          const edY = 300 + eduRadius * Math.sin(angle);
          const firstSchool = founder.education[0];
          const eduId = addNode(`edu-${founder.id}`, firstSchool, 'UNIVERSITY', edX, edY);
          addEdge(founderId, eduId, 'ALUMNI');
        }
        angle += angleStep;
      });

      // Investors
      company.investors?.forEach((investor, i) => {
        const x = 400 + radius * Math.cos(angle);
        const y = 300 + radius * Math.sin(angle);
        const investorId = addNode(`inv-${i}`, investor.name, 'INVESTOR', x, y, false, investor.type);
        addEdge(investorId, centerId, 'INVESTED_IN');
        angle += angleStep;
      });

      // Competitors
      company.competitors?.forEach((comp, i) => {
        const x = 400 + radius * Math.cos(angle);
        const y = 300 + radius * Math.sin(angle);
        // Find if competitor is in our DB
        const compInDb = companies.find(c => c.name.toLowerCase() === comp.toLowerCase());
        const compId = addNode(compInDb ? compInDb.id : `comp-${i}`, comp, 'COMPETITOR', x, y);
        addEdge(centerId, compId, 'COMPETES_WITH');
        angle += angleStep;
      });
    }

    return { initialNodes: nodes, initialEdges: edges };
  }, [company, navigate]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-screen w-full bg-slate-50 relative overflow-hidden flex flex-col">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 pointer-events-none flex justify-between items-start">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors pointer-events-auto mb-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-mono font-bold tracking-wide">BACK</span>
          </button>
          
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-xl border border-slate-200 pointer-events-auto max-w-sm shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 mb-1.5">
              <Network className="w-4 h-4" />
              <h1 className="text-xs font-mono font-bold tracking-wider uppercase">ENTITY RELATION MATRIX</h1>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{company?.name}</h2>
            <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
              Interactive visualization of ecosystem nodes, verified founders, investor syndicates, and market competitors.
            </p>
          </div>
        </div>
      </div>

      {/* React Flow Container */}
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          maxZoom={1.5}
          className="bg-slate-50"
        >
          <Background color="#cbd5e1" gap={24} size={1} />
          <Controls 
            className="!bg-white !border-slate-200 !rounded-lg overflow-hidden flex flex-col shadow-sm !text-slate-700"
            showInteractive={false}
          />
          <MiniMap 
            className="!bg-white !border-slate-200 !rounded-xl overflow-hidden shadow-sm"
            maskColor="rgba(248, 250, 252, 0.7)"
            nodeColor={(node) => {
              switch (node.data?.type) {
                case 'COMPANY': return '#2563eb';
                case 'FOUNDER': return '#10b981';
                case 'INVESTOR': return '#f59e0b';
                case 'COMPETITOR': return '#f43f5e';
                case 'UNIVERSITY': return '#a855f7';
                default: return '#94a3b8';
              }
            }}
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-10 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 pointer-events-auto shadow-sm">
        <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 mb-2.5 uppercase">NODE TAXONOMY</div>
        <div className="flex flex-col gap-2 text-xs font-medium text-slate-700">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-100 border border-blue-500"></div> Target Company</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-500"></div> Founder</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rotate-45 bg-amber-100 border border-amber-500"></div> Investor</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-rose-100 border border-rose-500"></div> Competitor</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-100 border border-purple-500"></div> Ecosystem</div>
        </div>
      </div>
    </div>
  );
}
