import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

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
  { id: 'u_openai', name: 'OpenAI', type: 'COMPANY', sector: 'AI Foundation', stage: 'Late Stage', signalStatus: 'Realtime Voice & Multimodal Agents', whyInteresting: 'Shifting from text completion to low-latency agent reasoning.', x: 50, y: 32, size: 30, zDepth: 20, cluster: 'AI', companyId: 'c_openai', layers: ['ALL', 'CAPITAL', 'MARKET', 'SIGNALS'] },
  { id: 'u_ai_infra', name: 'AI Compute', type: 'SECTOR', sector: 'AI', signalStatus: 'Edge Inference Capex', whyInteresting: 'Capex accelerating toward dedicated on-device silicon.', x: 62, y: 22, size: 18, zDepth: -10, cluster: 'AI', layers: ['ALL', 'MARKET', 'SIGNALS'] },
  { id: 'u_altman', name: 'Sam Altman', type: 'FOUNDER', sector: 'AI', signalStatus: 'Global Energy Syndicates', whyInteresting: 'Direct partnerships with sovereign energy grids for compute clusters.', x: 42, y: 20, size: 16, zDepth: 10, cluster: 'AI', layers: ['ALL', 'PEOPLE', 'CAPITAL'] },

  // SpaceTech Cluster
  { id: 'u_agnikul', name: 'Agnikul Cosmos', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: '3D Semi-Cryogenic Test', whyInteresting: 'Single-piece 3D printed rocket engine fired successfully.', x: 22, y: 54, size: 28, zDepth: 25, cluster: 'SPACE', companyId: 'c_agnikul', layers: ['ALL', 'CAPITAL', 'SIGNALS', 'ECOSYSTEM'] },
  { id: 'u_skyroot', name: 'Skyroot Aerospace', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: '4 European Sat Contracts', whyInteresting: 'Patented carbon-composite stage separation on Vikram-1.', x: 14, y: 72, size: 24, zDepth: 5, cluster: 'SPACE', companyId: 'c_skyroot', layers: ['ALL', 'CAPITAL', 'SIGNALS'] },
  { id: 'u_isro', name: 'IN-SPACe / ISRO', type: 'ECOSYSTEM', sector: 'SpaceTech', signalStatus: 'Commercial Clearances', whyInteresting: 'Federal deregulation unlocking private orbital corridors.', x: 28, y: 76, size: 18, zDepth: -15, cluster: 'SPACE', layers: ['ALL', 'ECOSYSTEM', 'MARKET'] },

  // Consumer / Delivery
  { id: 'u_swiggy', name: 'Swiggy', type: 'COMPANY', sector: 'Consumer', stage: 'Pre-IPO', signalStatus: 'SEBI DRHP Cleared ($1.4B)', whyInteresting: 'Filing confidential IPO; quick-commerce scale-up.', x: 74, y: 44, size: 32, zDepth: 30, cluster: 'CONSUMER', companyId: 'c_swiggy', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'MARKET', 'ECOSYSTEM'] },
  { id: 'u_zomato', name: 'Zomato', type: 'COMPANY', sector: 'Consumer', stage: 'Public', signalStatus: 'Blinkit Expansion', whyInteresting: 'Quick-commerce revenue now outpacing food delivery.', x: 88, y: 36, size: 26, zDepth: 0, cluster: 'CONSUMER', companyId: 'c_zomato', layers: ['ALL', 'CAPITAL', 'MARKET'] },
  { id: 'u_zepto', name: 'Zepto', type: 'COMPANY', sector: 'Quick Commerce', stage: 'Series F ($5B)', signalStatus: '700 Dark Store Surge', whyInteresting: 'Closed $450M mezzanine before Swiggy capital hits the street.', x: 84, y: 64, size: 26, zDepth: 15, cluster: 'CONSUMER', companyId: 'c_zepto', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'SIGNALS'] },
  { id: 'u_majety', name: 'Sriharsha Majety', type: 'FOUNDER', sector: 'Consumer', signalStatus: 'IPO Roadshow Active', whyInteresting: 'Orchestrating anchor book allocations for Swiggy public debut.', x: 68, y: 32, size: 16, zDepth: 5, cluster: 'CONSUMER', layers: ['ALL', 'PEOPLE', 'CAPITAL'] },

  // Robotics & Defense
  { id: 'u_robotics', name: 'Edge Autonomy', type: 'SECTOR', sector: 'Robotics', signalStatus: 'Industrial Vision Deployments', whyInteresting: 'Zero-latency on-device SLAM replacing cloud architectures.', x: 42, y: 78, size: 22, zDepth: -5, cluster: 'ROBOTICS', layers: ['ALL', 'MARKET', 'SIGNALS'] },
  { id: 'u_defense', name: 'Tactical UAVs', type: 'SECTOR', sector: 'Defense', signalStatus: '$45M Defense Fundings', whyInteresting: 'Indigenous micro-foundries scaling autonomous tactical airframes.', x: 56, y: 82, size: 20, zDepth: 10, cluster: 'DEFENSE', layers: ['ALL', 'CAPITAL', 'MARKET'] },

  // Ecosystem Hubs
  { id: 'u_srm', name: 'SRM Institute', type: 'ECOSYSTEM', sector: 'Talent Network', signalStatus: '350+ Founded Startups', whyInteresting: 'Key engineering feeder for Swiggy early platform and deeptech labs.', x: 36, y: 40, size: 24, zDepth: 20, cluster: 'ECOSYSTEM', companyId: 'c_swiggy', layers: ['ALL', 'ECOSYSTEM', 'PEOPLE'] },
  { id: 'u_iitm', name: 'IIT Madras Park', type: 'ECOSYSTEM', sector: 'DeepTech Hub', signalStatus: 'Agnikul Birthplace', whyInteresting: 'Leading incubator for indigenous space and battery IP.', x: 26, y: 40, size: 22, zDepth: 15, cluster: 'ECOSYSTEM', companyId: 'c_agnikul', layers: ['ALL', 'ECOSYSTEM', 'PEOPLE'] },

  // Capital
  { id: 'u_prosus', name: 'Prosus / Accel', type: 'INVESTOR', sector: 'Growth Capital', signalStatus: 'Swiggy DRHP Rebalance', whyInteresting: 'Core institutional shareholder across Indian internet infrastructure.', x: 66, y: 58, size: 20, zDepth: 0, cluster: 'INVESTOR', layers: ['ALL', 'CAPITAL'] }
];

const CONNECTIONS = [
  { from: 'u_openai', to: 'u_ai_infra', layer: 'MARKET' },
  { from: 'u_openai', to: 'u_altman', layer: 'PEOPLE' },
  { from: 'u_agnikul', to: 'u_skyroot', layer: 'MARKET' },
  { from: 'u_agnikul', to: 'u_isro', layer: 'ECOSYSTEM' },
  { from: 'u_skyroot', to: 'u_isro', layer: 'ECOSYSTEM' },
  { from: 'u_agnikul', to: 'u_iitm', layer: 'ECOSYSTEM' },
  { from: 'u_swiggy', to: 'u_zomato', layer: 'MARKET' },
  { from: 'u_swiggy', to: 'u_zepto', layer: 'MARKET' },
  { from: 'u_zomato', to: 'u_zepto', layer: 'MARKET' },
  { from: 'u_swiggy', to: 'u_majety', layer: 'PEOPLE' },
  { from: 'u_swiggy', to: 'u_prosus', layer: 'CAPITAL' },
  { from: 'u_swiggy', to: 'u_srm', layer: 'ECOSYSTEM' },
  { from: 'u_agnikul', to: 'u_srm', layer: 'ECOSYSTEM' },
  { from: 'u_robotics', to: 'u_defense', layer: 'MARKET' },
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
      {/* Apple-style Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] z-20 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#2997ff] shadow-[0_0_8px_#2997ff]" />
          <span className="text-xs font-medium text-white/90 tracking-tight">
            Company Universe
          </span>
          <span className="text-[10px] text-[#86868b] px-2 py-0.5 rounded-full bg-white/[0.04]">
            {filteredNodes.length} Entities
          </span>
        </div>

        {/* Minimal Focus Segmented Control */}
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
        
        {/* Ambient Radial Spotlight following subtle cursor motion */}
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
          {/* Subtle SVG Connection Threads */}
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
                        node.cluster === 'CONSUMER' ? '#ff9f0a' :
                        node.cluster === 'ECOSYSTEM' ? '#5e5ce6' : '#a2845e'
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

        {/* Apple-esque Minimal Inspection Card */}
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

        {/* Minimal Legend Pill */}
        <div className="absolute bottom-3 left-4 flex items-center gap-3 text-[10px] text-[#86868b] px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.06]">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" /> AI</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" /> Space</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a]" /> Consumer</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#5e5ce6]" /> Ecosystem</span>
        </div>

        {/* Direct Link to Full 3D Visualizer */}
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
