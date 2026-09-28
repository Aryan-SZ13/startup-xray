import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowUpRight } from 'lucide-react';

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
}

const UNIVERSE_NODES: UniverseNode[] = [
  // AI Cluster
  { id: 'u_openai', name: 'OpenAI', type: 'COMPANY', sector: 'AI Foundation', stage: 'Late Stage', signalStatus: 'Realtime Voice & Reasoning API', whyInteresting: 'Shifting from text models to autonomous multimodal edge agents.', x: 48, y: 32, size: 28, pulse: true, cluster: 'AI', color: '#00d4ff', companyId: 'c_openai' },
  { id: 'u_ai_infra', name: 'AI Infrastructure', type: 'SECTOR', sector: 'AI', signalStatus: 'Compute clusters saturated', whyInteresting: 'Massive capex moving to inference latency optimization.', x: 58, y: 22, size: 20, cluster: 'AI', color: '#38bdf8' },
  { id: 'u_altman', name: 'Sam Altman', type: 'FOUNDER', sector: 'AI', signalStatus: 'Compute Sovereign Deals', whyInteresting: 'Orchestrating global chip and energy syndicates.', x: 42, y: 20, size: 16, cluster: 'AI', color: '#818cf8' },

  // SpaceTech Cluster
  { id: 'u_agnikul', name: 'Agnikul Cosmos', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: 'Cryogenic 3D Engine Fired', whyInteresting: 'Single-piece 3D printed semi-cryogenic engine at Sriharikota.', x: 24, y: 55, size: 26, pulse: true, cluster: 'SPACE', color: '#10b981', companyId: 'c_agnikul' },
  { id: 'u_skyroot', name: 'Skyroot Aerospace', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: '4 European Launch Deals', whyInteresting: 'Vikram-1 carbon composite stage separation patent granted.', x: 16, y: 70, size: 24, pulse: true, cluster: 'SPACE', color: '#34d399', companyId: 'c_skyroot' },
  { id: 'u_isro', name: 'IN-SPACe / ISRO', type: 'ECOSYSTEM', sector: 'SpaceTech', signalStatus: 'Commercial deregulation', whyInteresting: 'Unlocking private launchpads and telemetry corridors.', x: 28, y: 74, size: 18, cluster: 'SPACE', color: '#059669' },

  // Consumer / Quick-Commerce Cluster
  { id: 'u_swiggy', name: 'Swiggy', type: 'COMPANY', sector: 'Consumer / Delivery', stage: 'Pre-IPO', signalStatus: 'SEBI DRHP Cleared ($1.4B)', whyInteresting: 'Filing confidential IPO; Instamart expanding into tier-2.', x: 74, y: 45, size: 30, pulse: true, cluster: 'CONSUMER', color: '#f59e0b', companyId: 'c_swiggy' },
  { id: 'u_zomato', name: 'Zomato', type: 'COMPANY', sector: 'Consumer / Delivery', stage: 'Public (BSE/NSE)', signalStatus: 'Blinkit EBITDA Positive', whyInteresting: 'Quick commerce surpassing core food delivery revenues.', x: 86, y: 38, size: 26, cluster: 'CONSUMER', color: '#ef4444', companyId: 'c_zomato' },
  { id: 'u_zepto', name: 'Zepto', type: 'COMPANY', sector: 'Quick Commerce', stage: 'Series F ($5B)', signalStatus: '700 Dark Store Surge', whyInteresting: 'Secured $450M mezzanine; aggressive dark-store land grab.', x: 82, y: 64, size: 26, pulse: true, cluster: 'CONSUMER', color: '#fbbf24', companyId: 'c_zepto' },
  { id: 'u_majety', name: 'Sriharsha Majety', type: 'FOUNDER', sector: 'Consumer', signalStatus: 'Anchor Roadshow Active', whyInteresting: 'Guiding Swiggy through SEBI public market clearance.', x: 68, y: 35, size: 15, cluster: 'CONSUMER', color: '#f97316' },

  // Robotics & Defense Cluster
  { id: 'u_robotics', name: 'Industrial Robotics', type: 'SECTOR', sector: 'Robotics', signalStatus: 'SLAM mini-sensors 2x', whyInteresting: 'Factories adopting edge-vision predictive telemetry.', x: 42, y: 76, size: 22, cluster: 'ROBOTICS', color: '#a855f7' },
  { id: 'u_defense', name: 'Tactical UAVs', type: 'SECTOR', sector: 'Defense', signalStatus: 'Family Offices $45M Deploy', whyInteresting: 'Indigenous defense micro-foundries replacing foreign imports.', x: 55, y: 80, size: 20, pulse: true, cluster: 'DEFENSE', color: '#c084fc' },

  // Ecosystem Hubs
  { id: 'u_srm', name: 'SRM Institute', type: 'ECOSYSTEM', sector: 'University', signalStatus: '350+ Alumni Founders', whyInteresting: 'Major engineering feeder for Swiggy early tech and deeptech labs.', x: 34, y: 40, size: 22, pulse: true, cluster: 'ECOSYSTEM', color: '#38bdf8' },
  { id: 'u_iitm', name: 'IIT Madras Research Park', type: 'ECOSYSTEM', sector: 'DeepTech Hub', signalStatus: 'Agnikul Birthplace', whyInteresting: 'Center of India’s proprietary aerospace and battery research.', x: 26, y: 42, size: 20, cluster: 'ECOSYSTEM', color: '#2dd4bf' },

  // Investors
  { id: 'u_prosus', name: 'Prosus / Accel', type: 'INVESTOR', sector: 'VC / Growth', signalStatus: 'Active Swiggy Exit/Hold', whyInteresting: 'Managing largest portfolio exposures in South Asian tech.', x: 66, y: 58, size: 18, cluster: 'INVESTOR', color: '#64748b' }
];

const CONNECTIONS = [
  { from: 'u_openai', to: 'u_ai_infra', strength: 0.8 },
  { from: 'u_openai', to: 'u_altman', strength: 0.9 },
  { from: 'u_agnikul', to: 'u_skyroot', strength: 0.6 },
  { from: 'u_agnikul', to: 'u_isro', strength: 0.9 },
  { from: 'u_skyroot', to: 'u_isro', strength: 0.85 },
  { from: 'u_agnikul', to: 'u_iitm', strength: 0.95 },
  { from: 'u_swiggy', to: 'u_zomato', strength: 0.7 },
  { from: 'u_swiggy', to: 'u_zepto', strength: 0.85 },
  { from: 'u_zomato', to: 'u_zepto', strength: 0.75 },
  { from: 'u_swiggy', to: 'u_majety', strength: 0.95 },
  { from: 'u_swiggy', to: 'u_prosus', strength: 0.8 },
  { from: 'u_swiggy', to: 'u_srm', strength: 0.7 },
  { from: 'u_agnikul', to: 'u_srm', strength: 0.65 },
  { from: 'u_robotics', to: 'u_defense', strength: 0.75 },
  { from: 'u_robotics', to: 'u_agnikul', strength: 0.5 },
  { from: 'u_iitm', to: 'u_srm', strength: 0.8 }
];

const CLUSTER_FILTERS = ['ALL', 'AI', 'SPACE', 'CONSUMER', 'ROBOTICS', 'DEFENSE'];

export const CompanyUniverseGraph: React.FC = () => {
  const navigate = useNavigate();
  const [activeCluster, setActiveCluster] = useState('ALL');
  const [hoveredNode, setHoveredNode] = useState<UniverseNode | null>(null);

  const filteredNodes = activeCluster === 'ALL' 
    ? UNIVERSE_NODES 
    : UNIVERSE_NODES.filter(n => n.cluster === activeCluster || n.type === 'ECOSYSTEM');

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
    <div className="relative w-full h-[480px] lg:h-[540px] bg-[#0c0d15] rounded-2xl border border-cyan-500/20 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col">
      {/* Top Terminal HUD Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#08080d]/90 border-b border-white/10 z-20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            COMPANY UNIVERSE // TOPOLOGICAL INTEL GRAPH
          </span>
          <span className="hidden sm:inline-block text-[9px] font-mono text-zinc-500 border border-white/10 px-1.5 py-0.5 rounded">
            16 NODES • 16 EDGES
          </span>
        </div>

        {/* Cluster Filter Pill Tags */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {CLUSTER_FILTERS.map(cluster => (
            <button
              key={cluster}
              onClick={() => setActiveCluster(cluster)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
                activeCluster === cluster 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,212,255,0.2)] font-bold'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden select-none bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        {/* Dynamic SVG Connections between Nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {CONNECTIONS.map((conn, idx) => {
            const fromNode = UNIVERSE_NODES.find(n => n.id === conn.from);
            const toNode = UNIVERSE_NODES.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isHovered = hoveredNode && (hoveredNode.id === fromNode.id || hoveredNode.id === toNode.id);
            const isInCluster = activeCluster === 'ALL' || fromNode.cluster === activeCluster || toNode.cluster === activeCluster;

            return (
              <line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isHovered ? '#00d4ff' : isInCluster ? '#334155' : '#1e293b'}
                strokeWidth={isHovered ? 2 : 1}
                strokeDasharray={isHovered ? '4 2' : 'none'}
                strokeOpacity={isHovered ? 0.9 : isInCluster ? 0.45 : 0.15}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes */}
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
              {/* Outer pulsing ring for new signal nodes */}
              {node.pulse && (
                <div 
                  className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
                  style={{ backgroundColor: node.color, transform: 'scale(1.6)' }}
                />
              )}

              {/* Node Body */}
              <div 
                className={`relative flex items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${
                  isHovered 
                    ? 'border-white scale-125 z-30 shadow-[0_0_25px_rgba(0,212,255,0.5)]' 
                    : isCompany
                    ? 'border-white/20 bg-[#11121d]/90 hover:border-cyan-400'
                    : 'border-white/10 bg-[#0d0e17]/80 hover:border-white/30'
                }`}
                style={{
                  width: `${node.size * 2.8}px`,
                  height: `${node.size * 1.5}px`,
                  borderColor: isHovered ? '#ffffff' : node.color + '60'
                }}
              >
                {/* Node Label */}
                <div className="flex flex-col items-center justify-center px-1 text-center">
                  <div className="flex items-center gap-1">
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: node.color }} 
                    />
                    <span className="text-[11px] font-bold text-white tracking-tight leading-tight truncate max-w-[80px]">
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

        {/* Hover Tooltip Dossier Card */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.15 }}
              style={{
                left: `${Math.min(Math.max(hoveredNode.x, 22), 78)}%`,
                top: `${hoveredNode.y > 60 ? hoveredNode.y - 34 : hoveredNode.y + 12}%`
              }}
              className="absolute -translate-x-1/2 z-40 w-72 p-3.5 bg-[#0f111a]/95 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.9)] pointer-events-none"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">{hoveredNode.name}</h4>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white/10 rounded text-zinc-300">
                      {hoveredNode.sector}
                    </span>
                  </div>
                  {hoveredNode.stage && (
                    <span className="text-[10px] font-mono text-cyan-400">{hoveredNode.stage}</span>
                  )}
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Signal Alert */}
              <div className="my-2 p-2 rounded bg-cyan-950/40 border border-cyan-500/30">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-300 mb-0.5">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>ACTIVE SIGNAL</span>
                </div>
                <p className="text-xs text-zinc-200 font-medium leading-snug">{hoveredNode.signalStatus}</p>
              </div>

              {/* Why Interesting */}
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
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
        <div className="absolute bottom-3 left-4 flex items-center gap-3 text-[10px] font-mono text-zinc-500 bg-[#0a0a10]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 pointer-events-none">
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
            <span>SRM/CHENNAI</span>
          </div>
        </div>

        {/* Bottom Right CTA */}
        <div className="absolute bottom-3 right-4">
          <button
            onClick={() => navigate('/graph')}
            className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-white bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-lg backdrop-blur-md hover:bg-cyan-500/20 transition-all cursor-pointer"
          >
            <span>FULL GRAPH</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
