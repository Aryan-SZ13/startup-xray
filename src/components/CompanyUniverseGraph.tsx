import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

export type FocusLayer = 'ALL' | 'CAPITAL' | 'PEOPLE' | 'MARKET' | 'SIGNALS' | 'ECOSYSTEM';

interface UniverseNode {
  id: string;
  name: string;
  type: 'COMPANY' | 'SECTOR' | 'FOUNDER' | 'INVESTOR' | 'ECOSYSTEM';
  sector: string;
  stage?: string;
  signalStatus: string;
  whyInteresting: string;
  x: number; // percentage
  y: number; // percentage
  size: number;
  zDepth: number; // for 3D depth layering
  cluster: string;
  companyId?: string;
  layers: FocusLayer[];
}

const UNIVERSE_NODES: UniverseNode[] = [
  // AI Cluster
  { id: 'u_openai', name: 'OpenAI', type: 'COMPANY', sector: 'AI Foundation', stage: 'Late Stage', signalStatus: 'Realtime Voice & Multimodal Agents', whyInteresting: 'Shifting from text completion to low-latency agent reasoning.', x: 48, y: 26, size: 28, zDepth: 20, cluster: 'AI', companyId: 'c_openai', layers: ['ALL', 'CAPITAL', 'MARKET', 'SIGNALS'] },
  { id: 'u_sarvam', name: 'Sarvam AI', type: 'COMPANY', sector: 'Indic AI', stage: 'Series A', signalStatus: 'Sarvam-1 Sovereign 2B Model', whyInteresting: 'Highest token throughput for Indic languages with sovereign compute clusters.', x: 38, y: 22, size: 24, zDepth: 15, cluster: 'AI', companyId: 'c_sarvam', layers: ['ALL', 'CAPITAL', 'SIGNALS', 'ECOSYSTEM'] },
  { id: 'u_ai_infra', name: 'AI Compute', type: 'SECTOR', sector: 'AI', signalStatus: 'Edge Inference Capex', whyInteresting: 'Capex accelerating toward dedicated on-device silicon.', x: 58, y: 16, size: 18, zDepth: -10, cluster: 'AI', layers: ['ALL', 'MARKET', 'SIGNALS'] },
  { id: 'u_altman', name: 'Sam Altman', type: 'FOUNDER', sector: 'AI', signalStatus: 'Global Energy Syndicates', whyInteresting: 'Direct partnerships with sovereign energy grids for compute clusters.', x: 42, y: 12, size: 15, zDepth: 10, cluster: 'AI', layers: ['ALL', 'PEOPLE', 'CAPITAL'] },

  // Developer Platform (Postman - SRM connection)
  { id: 'u_postman', name: 'Postman', type: 'COMPANY', sector: 'Dev Tools', stage: 'Series D ($5.6B)', signalStatus: 'AI Copilot v2 Launched', whyInteresting: '30M+ developers; SRM alumni founder Abhinav Asthana.', x: 60, y: 34, size: 28, zDepth: 25, cluster: 'DEVTOOLS', companyId: 'c_postman', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'ECOSYSTEM', 'MARKET'] },

  // SpaceTech Cluster
  { id: 'u_agnikul', name: 'Agnikul Cosmos', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: '3D Semi-Cryogenic Test', whyInteresting: 'Single-piece 3D printed rocket engine fired successfully.', x: 18, y: 52, size: 28, zDepth: 25, cluster: 'SPACE', companyId: 'c_agnikul', layers: ['ALL', 'CAPITAL', 'SIGNALS', 'ECOSYSTEM'] },
  { id: 'u_skyroot', name: 'Skyroot Aerospace', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: '4 European Sat Contracts', whyInteresting: 'Patented carbon-composite stage separation on Vikram-1.', x: 12, y: 70, size: 24, zDepth: 5, cluster: 'SPACE', companyId: 'c_skyroot', layers: ['ALL', 'CAPITAL', 'SIGNALS'] },
  { id: 'u_isro', name: 'IN-SPACe / ISRO', type: 'ECOSYSTEM', sector: 'SpaceTech', signalStatus: 'Commercial Clearances', whyInteresting: 'Federal deregulation unlocking private orbital corridors.', x: 26, y: 74, size: 18, zDepth: -15, cluster: 'SPACE', layers: ['ALL', 'ECOSYSTEM', 'MARKET'] },

  // CleanTech & EV (Ather - IIT Madras)
  { id: 'u_ather', name: 'Ather Energy', type: 'COMPANY', sector: 'CleanTech EV', stage: 'Pre-IPO ($1.3B)', signalStatus: 'Filed $500M SEBI DRHP', whyInteresting: 'Incubated at IIT Madras; Rizta scooter driving 32% volume surge.', x: 38, y: 64, size: 28, zDepth: 20, cluster: 'CLEANTECH', companyId: 'c_ather', layers: ['ALL', 'CAPITAL', 'ECOSYSTEM', 'SIGNALS'] },

  // Defense & Robotics (Torus - SRM)
  { id: 'u_torus', name: 'Torus Robotics', type: 'COMPANY', sector: 'Defense Robotics', stage: 'Seed ($12M)', signalStatus: 'Indian Army UGV Contract', whyInteresting: 'SRM alumni founder M. Vignesh; all-electric military UGVs for Ladakh.', x: 50, y: 82, size: 24, zDepth: 25, cluster: 'DEFENSE', companyId: 'c_torus', layers: ['ALL', 'ECOSYSTEM', 'SIGNALS', 'MARKET'] },
  { id: 'u_defense', name: 'Tactical UAVs', type: 'SECTOR', sector: 'Defense', signalStatus: '$45M Defense Fundings', whyInteresting: 'Indigenous micro-foundries scaling autonomous tactical airframes.', x: 62, y: 85, size: 18, zDepth: 10, cluster: 'DEFENSE', layers: ['ALL', 'CAPITAL', 'MARKET'] },

  // Consumer / Delivery
  { id: 'u_swiggy', name: 'Swiggy', type: 'COMPANY', sector: 'Consumer', stage: 'Pre-IPO', signalStatus: 'SEBI DRHP Cleared ($1.4B)', whyInteresting: 'Filing confidential IPO; quick-commerce scale-up.', x: 78, y: 44, size: 32, zDepth: 30, cluster: 'CONSUMER', companyId: 'c_swiggy', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'MARKET', 'ECOSYSTEM'] },
  { id: 'u_zomato', name: 'Zomato', type: 'COMPANY', sector: 'Consumer', stage: 'Public', signalStatus: 'Blinkit Expansion', whyInteresting: 'Quick-commerce revenue now outpacing food delivery.', x: 90, y: 34, size: 26, zDepth: 0, cluster: 'CONSUMER', companyId: 'c_zomato', layers: ['ALL', 'CAPITAL', 'MARKET'] },
  { id: 'u_zepto', name: 'Zepto', type: 'COMPANY', sector: 'Quick Commerce', stage: 'Series F ($5B)', signalStatus: '700 Dark Store Surge', whyInteresting: 'Closed $450M mezzanine before Swiggy capital hits the street.', x: 86, y: 62, size: 26, zDepth: 15, cluster: 'CONSUMER', companyId: 'c_zepto', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'SIGNALS'] },

  // Academic Ecosystem Nodes
  { id: 'u_srm', name: 'SRM Institute', type: 'ECOSYSTEM', sector: 'Talent Network', signalStatus: 'Postman & Torus Founders', whyInteresting: 'Feeder of enterprise software and defense robotics founders.', x: 52, y: 52, size: 24, zDepth: 20, cluster: 'ECOSYSTEM', companyId: 'c_postman', layers: ['ALL', 'ECOSYSTEM', 'PEOPLE'] },
  { id: 'u_iitm', name: 'IIT Madras Park', type: 'ECOSYSTEM', sector: 'DeepTech Hub', signalStatus: 'Agnikul & Ather Birthplace', whyInteresting: 'Premier research park driving aerospace, EV, and Indic AI IP.', x: 28, y: 42, size: 24, zDepth: 18, cluster: 'ECOSYSTEM', companyId: 'c_agnikul', layers: ['ALL', 'ECOSYSTEM', 'PEOPLE'] }
];

const CONNECTIONS = [
  { from: 'u_openai', to: 'u_ai_infra', layer: 'MARKET' },
  { from: 'u_openai', to: 'u_sarvam', layer: 'MARKET' },
  { from: 'u_sarvam', to: 'u_iitm', layer: 'ECOSYSTEM' },
  { from: 'u_postman', to: 'u_srm', layer: 'ECOSYSTEM' },
  { from: 'u_postman', to: 'u_openai', layer: 'MARKET' },
  { from: 'u_agnikul', to: 'u_skyroot', layer: 'MARKET' },
  { from: 'u_agnikul', to: 'u_isro', layer: 'ECOSYSTEM' },
  { from: 'u_agnikul', to: 'u_iitm', layer: 'ECOSYSTEM' },
  { from: 'u_ather', to: 'u_iitm', layer: 'ECOSYSTEM' },
  { from: 'u_torus', to: 'u_srm', layer: 'ECOSYSTEM' },
  { from: 'u_torus', to: 'u_defense', layer: 'MARKET' },
  { from: 'u_swiggy', to: 'u_zomato', layer: 'MARKET' },
  { from: 'u_swiggy', to: 'u_zepto', layer: 'MARKET' },
  { from: 'u_swiggy', to: 'u_srm', layer: 'ECOSYSTEM' },
  { from: 'u_iitm', to: 'u_srm', layer: 'ECOSYSTEM' }
];

const FOCUS_LAYERS: { id: FocusLayer; label: string }[] = [
  { id: 'ALL', label: 'All' },
  { id: 'CAPITAL', label: 'Capital' },
  { id: 'PEOPLE', label: 'People' },
  { id: 'MARKET', label: 'Market' },
  { id: 'SIGNALS', label: 'Signals' },
  { id: 'ECOSYSTEM', label: 'Ecosystem' }
];

export const CompanyUniverseGraph: React.FC = () => {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState<FocusLayer>('ALL');
  const [hoveredNode, setHoveredNode] = useState<UniverseNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

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
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-[520px] lg:h-[580px] bg-[#0c0c0e]/80 rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-3xl flex flex-col perspective-1000"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] z-20 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#2997ff] shadow-[0_0_8px_#2997ff]" />
          <span className="text-xs font-medium text-white/90 tracking-tight">
            Company Universe
          </span>
          <span className="text-[10px] text-[#86868b] px-2 py-0.5 rounded-full bg-white/[0.04]">
            {filteredNodes.length} Verified Entities
          </span>
        </div>

        {/* Focus Segmented Control */}
        <div className="flex items-center p-0.5 rounded-full bg-white/[0.05] border border-white/[0.06]">
          {FOCUS_LAYERS.map(l => (
            <button
              key={l.id}
              onClick={() => setActiveLayer(l.id)}
              className={`px-3 py-0.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                activeLayer === l.id
                  ? 'bg-white text-black shadow-sm font-semibold'
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Minimal Zoom Controls */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.3))}
            className="p-1 rounded-full text-[#86868b] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <ZoomIn size={13} />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.9))}
            className="p-1 rounded-full text-[#86868b] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <ZoomOut size={13} />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 rounded-full text-[#86868b] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* 3D Immersive Graph Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden select-none">
        
        {/* Ambient Radial Spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            background: `radial-gradient(circle 350px at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, rgba(41, 151, 255, 0.08), transparent 70%)`
          }}
        />

        {/* 3D Tilt Plane */}
        <div 
          className="relative w-full h-full preserve-3d transition-transform duration-500 ease-out"
          style={{
            transform: `scale(${zoomLevel}) rotateX(${-mousePos.y * 12}deg) rotateY(${mousePos.x * 12}deg)`
          }}
        >
          {/* SVG Connection Threads */}
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
                  stroke={isHighlighted ? '#2997ff' : 'rgba(255, 255, 255, 0.12)'}
                  strokeWidth={isHighlighted ? 1.8 : 0.8}
                  strokeDasharray={isHighlighted ? '4 3' : 'none'}
                  strokeOpacity={isHighlighted ? 1 : 0.4}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* 3D Depth Placed Nodes */}
          {filteredNodes.map(node => {
            const isHovered = hoveredNode?.id === node.id;
            const isCompany = node.type === 'COMPANY';

            return (
              <div
                key={node.id}
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y}%`,
                  transform: `translate(-50%, -50%) translateZ(${node.zDepth}px)`
                }}
                className="absolute z-10 cursor-pointer"
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Pill */}
                <div 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 ${
                    isHovered
                      ? 'bg-white/20 border-white/60 shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-110'
                      : isCompany
                      ? 'bg-white/[0.08] border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.25]'
                      : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.08]'
                  }`}
                  style={{
                    boxShadow: isHovered ? '0 10px 25px -5px rgba(0,0,0,0.5)' : 'none'
                  }}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full shrink-0" 
                    style={{
                      backgroundColor: node.cluster === 'AI' ? '#2997ff' :
                        node.cluster === 'SPACE' ? '#30d158' :
                        node.cluster === 'DEVTOOLS' ? '#ff9f0a' :
                        node.cluster === 'CLEANTECH' ? '#32d74b' :
                        node.cluster === 'DEFENSE' ? '#bf5af2' :
                        node.cluster === 'CONSUMER' ? '#ff453a' : '#5e5ce6'
                    }}
                  />
                  <span className="text-[11px] font-medium text-white tracking-tight whitespace-nowrap">
                    {node.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Inspection Card */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 6 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: `${Math.min(Math.max(hoveredNode.x, 20), 80)}%`,
                top: `${hoveredNode.y > 55 ? hoveredNode.y - 28 : hoveredNode.y + 12}%`
              }}
              className="absolute -translate-x-1/2 z-40 w-72 p-4 rounded-2xl bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/[0.12] shadow-2xl pointer-events-none"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">{hoveredNode.name}</h4>
                  <p className="text-[10px] text-[#86868b]">{hoveredNode.sector} {hoveredNode.stage ? `• ${hoveredNode.stage}` : ''}</p>
                </div>
                <ArrowUpRight size={14} className="text-[#2997ff]" />
              </div>

              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-2.5">
                <span className="text-[9px] font-semibold text-[#2997ff] uppercase tracking-wider block mb-0.5">
                  Signal Trigger
                </span>
                <p className="text-xs text-[#d2d2d7] leading-snug">{hoveredNode.signalStatus}</p>
              </div>

              <p className="text-[11px] text-[#86868b] leading-relaxed mb-3">
                {hoveredNode.whyInteresting}
              </p>

              <div className="text-[10px] text-right font-medium text-[#2997ff]">
                Tap to open dossier ↗
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Legend */}
        <div className="absolute bottom-3 left-4 flex items-center gap-3 text-[10px] text-[#86868b] px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.06]">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" /> AI</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a]" /> DevTools</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" /> Space/EV</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#bf5af2]" /> Defense</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#5e5ce6]" /> SRM/IITM</span>
        </div>

        {/* Link to Full Graph */}
        <div className="absolute bottom-3 right-4">
          <button
            onClick={() => navigate('/graph')}
            className="flex items-center gap-1 text-[11px] font-medium text-white/80 hover:text-white px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer"
          >
            <span>Full Map</span>
            <ArrowUpRight size={12} />
          </button>
        </div>

      </div>
    </div>
  );
};
