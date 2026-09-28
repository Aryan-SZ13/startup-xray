import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowUpRight, Layers, Eye, RefreshCw, ZoomIn, ZoomOut, Filter } from 'lucide-react';

export type FocusLayer = 'ALL' | 'CAPITAL' | 'PEOPLE' | 'MARKET' | 'SIGNALS' | 'ECOSYSTEM';

interface UniverseNode {
  id: string;
  name: string;
  type: 'COMPANY' | 'SECTOR' | 'FOUNDER' | 'INVESTOR' | 'ECOSYSTEM';
  sector: string;
  stage?: string;
  signalStatus: string;
  whyInteresting: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  pulse?: boolean;
  cluster: string;
  color: string;
  companyId?: string;
  layers: FocusLayer[];
}

const UNIVERSE_NODES: UniverseNode[] = [
  // AI Cluster
  { id: 'u_openai', name: 'OpenAI', type: 'COMPANY', sector: 'AI Foundation', stage: 'Late Stage', signalStatus: 'Realtime Voice & Reasoning API', whyInteresting: 'Transitioning from pure text LLMs to multimodal real-time reasoning agents.', x: 50, y: 30, size: 30, pulse: true, cluster: 'AI', color: '#00d4ff', companyId: 'c_openai', layers: ['ALL', 'CAPITAL', 'MARKET', 'SIGNALS'] },
  { id: 'u_ai_infra', name: 'AI Compute & ASIC', type: 'SECTOR', sector: 'AI', signalStatus: 'Compute cluster saturations', whyInteresting: 'Capex rotating into local edge inference and silicon accelerators.', x: 62, y: 20, size: 20, cluster: 'AI', color: '#38bdf8', layers: ['ALL', 'MARKET', 'SIGNALS'] },
  { id: 'u_altman', name: 'Sam Altman', type: 'FOUNDER', sector: 'AI', signalStatus: 'Sovereign Compute Deals', whyInteresting: 'Building sovereign infrastructure syndicates across energy and silicon.', x: 42, y: 18, size: 18, cluster: 'AI', color: '#818cf8', layers: ['ALL', 'PEOPLE', 'CAPITAL'] },

  // SpaceTech Cluster
  { id: 'u_agnikul', name: 'Agnikul Cosmos', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: 'Cryogenic 3D Engine Fired', whyInteresting: 'World-first single-piece 3D printed semi-cryogenic engine at Sriharikota.', x: 22, y: 55, size: 28, pulse: true, cluster: 'SPACE', color: '#10b981', companyId: 'c_agnikul', layers: ['ALL', 'CAPITAL', 'SIGNALS', 'ECOSYSTEM'] },
  { id: 'u_skyroot', name: 'Skyroot Aerospace', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: '4 European Rideshares', whyInteresting: 'Vikram-1 carbon composite stage separation patent granted.', x: 14, y: 72, size: 24, pulse: true, cluster: 'SPACE', color: '#34d399', companyId: 'c_skyroot', layers: ['ALL', 'CAPITAL', 'SIGNALS'] },
  { id: 'u_isro', name: 'IN-SPACe / ISRO', type: 'ECOSYSTEM', sector: 'SpaceTech', signalStatus: 'Orbital Corridor Clearances', whyInteresting: 'National deregulation unlocking private launchpads and telemetry networks.', x: 28, y: 78, size: 18, cluster: 'SPACE', color: '#059669', layers: ['ALL', 'ECOSYSTEM', 'MARKET'] },

  // Consumer / Quick-Commerce Cluster
  { id: 'u_swiggy', name: 'Swiggy', type: 'COMPANY', sector: 'Consumer Tech', stage: 'Pre-IPO', signalStatus: 'SEBI DRHP Cleared ($1.4B)', whyInteresting: 'Filing confidential IPO prospectus; Instamart scaling into tier-2.', x: 74, y: 44, size: 32, pulse: true, cluster: 'CONSUMER', color: '#f59e0b', companyId: 'c_swiggy', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'MARKET', 'ECOSYSTEM'] },
  { id: 'u_zomato', name: 'Zomato', type: 'COMPANY', sector: 'Consumer Tech', stage: 'Public', signalStatus: 'Blinkit Take-Rate High', whyInteresting: 'Quick commerce surpassing core restaurant delivery volumes.', x: 88, y: 36, size: 26, cluster: 'CONSUMER', color: '#ef4444', companyId: 'c_zomato', layers: ['ALL', 'CAPITAL', 'MARKET'] },
  { id: 'u_zepto', name: 'Zepto', type: 'COMPANY', sector: 'Quick Commerce', stage: 'Series F ($5B)', signalStatus: '700 Dark Store Cluster', whyInteresting: 'Raised $450M mezzanine to double warehouse density before Swiggy listing.', x: 84, y: 64, size: 26, pulse: true, cluster: 'CONSUMER', color: '#fbbf24', companyId: 'c_zepto', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'SIGNALS'] },
  { id: 'u_majety', name: 'Sriharsha Majety', type: 'FOUNDER', sector: 'Consumer', signalStatus: 'Roadshow Active', whyInteresting: 'Guiding anchor book allocations ahead of SEBI public listing.', x: 68, y: 32, size: 16, cluster: 'CONSUMER', color: '#f97316', layers: ['ALL', 'PEOPLE', 'CAPITAL'] },

  // Robotics & Defense
  { id: 'u_robotics', name: 'Edge Autonomy & SLAM', type: 'SECTOR', sector: 'Robotics', signalStatus: 'SLAM Vision Sensors 2x', whyInteresting: 'Factory floors deploying on-device neural vision without cloud latency.', x: 42, y: 78, size: 22, cluster: 'ROBOTICS', color: '#a855f7', layers: ['ALL', 'MARKET', 'SIGNALS'] },
  { id: 'u_defense', name: 'Tactical Micro-UAVs', type: 'SECTOR', sector: 'Defense', signalStatus: '$45M Syndicate Deployed', whyInteresting: 'Domestic family offices financing modular autonomous defense airframes.', x: 56, y: 82, size: 20, pulse: true, cluster: 'DEFENSE', color: '#c084fc', layers: ['ALL', 'CAPITAL', 'MARKET'] },

  // Ecosystem Hubs (SRM / IIT Madras)
  { id: 'u_srm', name: 'SRM Institute', type: 'ECOSYSTEM', sector: 'University Network', signalStatus: '350+ Alumni Startups', whyInteresting: 'Critical engineering feeder for Swiggy early platform and DeepTech founders.', x: 36, y: 40, size: 24, pulse: true, cluster: 'ECOSYSTEM', color: '#38bdf8', layers: ['ALL', 'ECOSYSTEM', 'PEOPLE'] },
  { id: 'u_iitm', name: 'IIT Madras Research Park', type: 'ECOSYSTEM', sector: 'DeepTech Hub', signalStatus: 'Agnikul Incubation Node', whyInteresting: 'Center of India’s proprietary aerospace and battery telemetry patents.', x: 26, y: 40, size: 22, cluster: 'ECOSYSTEM', color: '#2dd4bf', layers: ['ALL', 'ECOSYSTEM', 'PEOPLE'] },

  // Capital / Investors
  { id: 'u_prosus', name: 'Prosus / Accel', type: 'INVESTOR', sector: 'Growth Capital', signalStatus: 'Portfolio Rebalancing', whyInteresting: 'Largest institutional cap table stakeholder in Indian consumer technology.', x: 66, y: 58, size: 20, cluster: 'INVESTOR', color: '#94a3b8', layers: ['ALL', 'CAPITAL'] }
];

const CONNECTIONS = [
  { from: 'u_openai', to: 'u_ai_infra', layer: 'MARKET', strength: 0.8 },
  { from: 'u_openai', to: 'u_altman', layer: 'PEOPLE', strength: 0.9 },
  { from: 'u_agnikul', to: 'u_skyroot', layer: 'MARKET', strength: 0.6 },
  { from: 'u_agnikul', to: 'u_isro', layer: 'ECOSYSTEM', strength: 0.9 },
  { from: 'u_skyroot', to: 'u_isro', layer: 'ECOSYSTEM', strength: 0.85 },
  { from: 'u_agnikul', to: 'u_iitm', layer: 'ECOSYSTEM', strength: 0.95 },
  { from: 'u_swiggy', to: 'u_zomato', layer: 'MARKET', strength: 0.7 },
  { from: 'u_swiggy', to: 'u_zepto', layer: 'MARKET', strength: 0.85 },
  { from: 'u_zomato', to: 'u_zepto', layer: 'MARKET', strength: 0.75 },
  { from: 'u_swiggy', to: 'u_majety', layer: 'PEOPLE', strength: 0.95 },
  { from: 'u_swiggy', to: 'u_prosus', layer: 'CAPITAL', strength: 0.8 },
  { from: 'u_swiggy', to: 'u_srm', layer: 'ECOSYSTEM', strength: 0.7 },
  { from: 'u_agnikul', to: 'u_srm', layer: 'ECOSYSTEM', strength: 0.65 },
  { from: 'u_robotics', to: 'u_defense', layer: 'MARKET', strength: 0.75 },
  { from: 'u_robotics', to: 'u_agnikul', layer: 'SIGNALS', strength: 0.5 },
  { from: 'u_iitm', to: 'u_srm', layer: 'ECOSYSTEM', strength: 0.8 }
];

const FOCUS_LAYERS: { id: FocusLayer; label: string; desc: string }[] = [
  { id: 'ALL', label: 'ALL LAYERS', desc: 'Unified view across capital, founders, markets & signals' },
  { id: 'CAPITAL', label: 'CAPITAL', desc: 'Cap tables, funding tranches, investor syndicates' },
  { id: 'PEOPLE', label: 'PEOPLE', desc: 'Founders, executive migrations, engineering talent' },
  { id: 'MARKET', label: 'MARKET', desc: 'Competitors, market adjacency, pricing power' },
  { id: 'SIGNALS', label: 'SIGNALS', desc: 'Early anomalies, hiring raids, patent filings' },
  { id: 'ECOSYSTEM', label: 'ECOSYSTEM', desc: 'SRM, IIT Madras, Chennai DeepTech corridors' }
];

export const CompanyUniverseGraph: React.FC = () => {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState<FocusLayer>('ALL');
  const [hoveredNode, setHoveredNode] = useState<UniverseNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredNodes = activeLayer === 'ALL'
    ? UNIVERSE_NODES
    : UNIVERSE_NODES.filter(n => n.layers.includes(activeLayer));

  const handleNodeClick = (node: UniverseNode) => {
    if (node.companyId) {
      navigate(`/company/${node.companyId}`);
    } else if (node.type === 'SECTOR') {
      navigate(`/discover?sector=${encodeURIComponent(node.sector.toLowerCase())}`);
    } else if (node.type === 'ECOSYSTEM') {
      navigate('/ecosystem');
    } else {
      navigate(`/search?q=${encodeURIComponent(node.name)}`);
    }
  };

  return (
    <div className="relative w-full h-[540px] lg:h-[600px] bg-[#090a12] rounded-2xl border border-cyan-500/20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col">
      
      {/* 1. Terminal HUD Ribbon (Crucix / Osiris principle) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#06070b]/95 border-b border-white/10 z-20 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00d4ff]" />
            <span className="absolute w-4 h-4 rounded-full bg-cyan-400/30 animate-ping" />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            COMPANY UNIVERSE // GRAPH SURVEILLANCE
          </span>
          <span className="hidden sm:inline-flex text-[9px] font-mono text-zinc-500 border border-white/10 px-1.5 py-0.5 rounded">
            {filteredNodes.length} NODES • {CONNECTIONS.length} ACTIVE EDGES
          </span>
        </div>

        {/* Viewport Zoom & Reset Controls */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-lg p-0.5">
          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
            className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
            className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setZoomLevel(1)}
            className="p-1 text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Reset Perspective"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Intelligence Layer Switcher (Osiris layer principle) */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#0b0c16]/90 border-b border-white/5 z-20 overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-1 shrink-0">
          <Layers className="w-3 h-3 text-cyan-400 mr-1" />
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">FOCUS LENS:</span>
        </div>

        <div className="flex items-center gap-1">
          {FOCUS_LAYERS.map(layer => {
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                }`}
                title={layer.desc}
              >
                {layer.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Graph Canvas with Camera Transform */}
      <div className="relative flex-1 w-full h-full overflow-hidden select-none bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.04)_0%,transparent_70%)]">
        
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Scaled Graph Container */}
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Dynamic SVG Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {CONNECTIONS.map((conn, idx) => {
              const fromNode = UNIVERSE_NODES.find(n => n.id === conn.from);
              const toNode = UNIVERSE_NODES.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = hoveredNode && (hoveredNode.id === fromNode.id || hoveredNode.id === toNode.id);
              const isLayerMatch = activeLayer === 'ALL' || conn.layer === activeLayer;

              if (!isLayerMatch && !isHighlighted) return null;

              return (
                <line
                  key={idx}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={isHighlighted ? '#00d4ff' : isLayerMatch ? '#38bdf8' : '#1e293b'}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  strokeDasharray={isHighlighted ? '4 2' : conn.layer === 'SIGNALS' ? '3 3' : 'none'}
                  strokeOpacity={isHighlighted ? 1 : 0.35}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Universe Nodes */}
          {filteredNodes.map(node => {
            const isHovered = hoveredNode?.id === node.id;
            const isCompany = node.type === 'COMPANY';

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Subtle outer pulsing ring on signals */}
                {node.pulse && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none"
                    style={{ backgroundColor: node.color, transform: 'scale(1.7)' }}
                  />
                )}

                {/* Node Pill / Card */}
                <div 
                  className={`relative flex items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 shadow-xl ${
                    isHovered 
                      ? 'border-white scale-125 z-30 shadow-[0_0_30px_rgba(0,212,255,0.6)]' 
                      : isCompany
                      ? 'border-white/20 bg-[#10121d]/90 hover:border-cyan-400'
                      : 'border-white/10 bg-[#0c0d16]/80 hover:border-white/30'
                  }`}
                  style={{
                    width: `${node.size * 2.8}px`,
                    height: `${node.size * 1.55}px`,
                    borderColor: isHovered ? '#ffffff' : node.color + '60'
                  }}
                >
                  <div className="flex flex-col items-center justify-center px-1 text-center">
                    <div className="flex items-center gap-1">
                      <span 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: node.color }} 
                      />
                      <span className="text-[11px] font-bold text-white tracking-tight leading-tight truncate max-w-[85px]">
                        {node.name}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest leading-none mt-0.5">
                      {node.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Tooltip Dossier Preview (Graphistry traversal principle) */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.15 }}
              style={{
                left: `${Math.min(Math.max(hoveredNode.x, 24), 76)}%`,
                top: `${hoveredNode.y > 55 ? hoveredNode.y - 36 : hoveredNode.y + 12}%`
              }}
              className="absolute -translate-x-1/2 z-40 w-76 p-4 bg-[#0e101a]/95 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-[0_0_35px_rgba(0,0,0,0.95)] pointer-events-none"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">{hoveredNode.name}</h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white/10 rounded text-zinc-300">
                      {hoveredNode.sector}
                    </span>
                  </div>
                  {hoveredNode.stage && (
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">{hoveredNode.stage}</span>
                  )}
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Signal Alert */}
              <div className="my-2 p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-300 mb-0.5">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>ACTIVE SIGNAL</span>
                </div>
                <p className="text-xs text-zinc-100 font-medium leading-snug">{hoveredNode.signalStatus}</p>
              </div>

              {/* Why Interesting */}
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-2.5">
                <span className="text-zinc-500 font-mono">DILIGENCE:</span> {hoveredNode.whyInteresting}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>CLICK TO ENTER DOSSIER</span>
                <span className="text-cyan-400 font-bold">↵ DOSSIER</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Left Legend */}
        <div className="absolute bottom-3 left-4 flex items-center gap-3 text-[10px] font-mono text-zinc-400 bg-[#080910]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>SPACE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>CONSUMER</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>ROBOTICS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>SRM / CHENNAI</span>
          </div>
        </div>

        {/* Bottom Right CTA */}
        <div className="absolute bottom-3 right-4">
          <button
            onClick={() => navigate('/graph')}
            className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-white bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-lg backdrop-blur-md hover:bg-cyan-500/20 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.1)]"
          >
            <span>FULL GRAPH</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
