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
      case 'COMPANY': return 'border-cyan-500/50 bg-cyan-950/30 text-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.2)]';
      case 'FOUNDER': return 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400 rounded-full';
      case 'INVESTOR': return 'border-amber-500/50 bg-amber-950/30 text-amber-400 rotate-45';
      case 'COMPETITOR': return 'border-red-500/50 bg-red-950/30 text-red-400';
      case 'UNIVERSITY': return 'border-purple-500/50 bg-purple-950/30 text-purple-400';
      default: return 'border-white/20 bg-white/5 text-gray-300';
    }
  };

  const getInnerStyle = () => {
    if (data.type === 'INVESTOR') return '-rotate-45 text-center flex flex-col items-center justify-center h-full w-full';
    return 'text-center flex flex-col items-center justify-center h-full w-full';
  };

  return (
    <div className={`px-4 py-2 border backdrop-blur-md cursor-pointer hover:border-white/50 transition-colors ${getStyle()} ${data.isCenter ? 'w-48 h-48 rounded-2xl text-xl' : 'w-32 h-32 text-sm'}`} onClick={() => data.onClick?.(data.id, data.type)}>
      <Handle type="target" position={Position.Top} className="!bg-white/20 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-white/20 !border-0" />
      <Handle type="source" position={Position.Left} className="!bg-white/20 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-white/20 !border-0" />
      
      <div className={getInnerStyle()}>
        <div className="font-bold whitespace-normal">{data.label}</div>
        <div className="text-[10px] mt-1 opacity-70 uppercase tracking-widest">{data.type}</div>
        {data.subtitle && <div className="text-xs mt-1 opacity-80">{data.subtitle}</div>}
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
        style: { stroke: '#4b5563', strokeWidth: 1 },
        label,
        labelStyle: { fill: '#9ca3af', fontSize: 10, fontWeight: 500 },
        labelBgStyle: { fill: '#111118', fillOpacity: 0.8 },
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
    <div className="h-screen w-full bg-[#0a0a0f] relative overflow-hidden flex flex-col">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 pointer-events-none flex justify-between items-start">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors pointer-events-auto mb-4 bg-[#111118]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">BACK</span>
          </button>
          
          <div className="bg-[#111118]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 pointer-events-auto max-w-sm">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Network className="w-5 h-5" />
              <h1 className="text-sm font-bold tracking-widest">COMPANY INTELLIGENCE GRAPH</h1>
            </div>
            <h2 className="text-2xl font-light text-white">{company?.name}</h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Interactive visualization of ecosystem connections, founders, capital flow, and competitive landscape.
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
          className="bg-[#0a0a0f]"
        >
          <Background color="rgba(255, 255, 255, 0.05)" gap={24} size={1} />
          <Controls 
            className="!bg-[#111118] !border-white/10 !rounded-lg overflow-hidden flex flex-col shadow-2xl"
            showInteractive={false}
          />
          <MiniMap 
            className="!bg-[#111118] !border-white/10 !rounded-xl overflow-hidden"
            maskColor="rgba(10, 10, 15, 0.7)"
            nodeColor={(node) => {
              switch (node.data?.type) {
                case 'COMPANY': return '#00d4ff';
                case 'FOUNDER': return '#10b981';
                case 'INVESTOR': return '#f59e0b';
                case 'COMPETITOR': return '#ef4444';
                case 'UNIVERSITY': return '#a855f7';
                default: return '#4b5563';
              }
            }}
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-10 bg-[#111118]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 pointer-events-auto">
        <div className="text-xs font-bold tracking-widest text-gray-500 mb-3">NODE LEGEND</div>
        <div className="flex flex-col gap-2 text-sm text-gray-300">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-cyan-950 border border-cyan-500"></div> Target Company</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-950 border border-emerald-500"></div> Founder</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rotate-45 bg-amber-950 border border-amber-500"></div> Investor</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-950 border border-red-500"></div> Competitor</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-950 border border-purple-500"></div> Ecosystem</div>
        </div>
      </div>
    </div>
  );
}
