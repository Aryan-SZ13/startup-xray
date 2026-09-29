import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export type FocusLayer = 'ALL' | 'CAPITAL' | 'PEOPLE' | 'MARKET' | 'SIGNALS' | 'ECOSYSTEM';

interface UniverseNode {
  id: string;
  name: string;
  type: 'COMPANY' | 'SECTOR' | 'FOUNDER' | 'INVESTOR' | 'ECOSYSTEM';
  sector: string;
  stage?: string;
  signalStatus: string;
  whyInteresting: string;
  x: number;
  y: number;
  size: number;
  zDepth: number;
  cluster: string;
  companyId?: string;
  layers: FocusLayer[];
}

const UNIVERSE_NODES: UniverseNode[] = [
  { id: 'u_openai', name: 'OpenAI', type: 'COMPANY', sector: 'AI Foundation', stage: 'Late Stage', signalStatus: 'Realtime Voice & Multimodal Agents', whyInteresting: 'Shifting from text completion to low-latency agent reasoning.', x: 48, y: 26, size: 28, zDepth: 20, cluster: 'AI', companyId: 'c_openai', layers: ['ALL', 'CAPITAL', 'MARKET', 'SIGNALS'] },
  { id: 'u_sarvam', name: 'Sarvam AI', type: 'COMPANY', sector: 'Indic AI', stage: 'Series A', signalStatus: 'Sarvam-1 Sovereign 2B Model', whyInteresting: 'Highest token throughput for Indic languages with sovereign compute clusters.', x: 38, y: 22, size: 24, zDepth: 15, cluster: 'AI', companyId: 'c_sarvam', layers: ['ALL', 'CAPITAL', 'SIGNALS', 'ECOSYSTEM'] },
  { id: 'u_ai_infra', name: 'AI Compute', type: 'SECTOR', sector: 'AI', signalStatus: 'Edge Inference Capex', whyInteresting: 'Capex accelerating toward dedicated on-device silicon.', x: 58, y: 16, size: 18, zDepth: -10, cluster: 'AI', layers: ['ALL', 'MARKET', 'SIGNALS'] },
  { id: 'u_altman', name: 'Sam Altman', type: 'FOUNDER', sector: 'AI', signalStatus: 'Global Energy Syndicates', whyInteresting: 'Direct partnerships with sovereign energy grids for compute clusters.', x: 42, y: 12, size: 15, zDepth: 10, cluster: 'AI', layers: ['ALL', 'PEOPLE', 'CAPITAL'] },
  { id: 'u_postman', name: 'Postman', type: 'COMPANY', sector: 'Dev Tools', stage: 'Series D ($5.6B)', signalStatus: 'AI Copilot v2 Launched', whyInteresting: '30M+ developers; BITS Pilani alumni founders Abhinav Asthana & Abhijit Kane.', x: 60, y: 34, size: 28, zDepth: 25, cluster: 'DEVTOOLS', companyId: 'c_postman', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'MARKET'] },
  { id: 'u_agnikul', name: 'Agnikul Cosmos', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: '3D Semi-Cryogenic Test', whyInteresting: 'Single-piece 3D printed rocket engine fired successfully; IIT Madras incubated.', x: 18, y: 52, size: 28, zDepth: 25, cluster: 'SPACE', companyId: 'c_agnikul', layers: ['ALL', 'CAPITAL', 'SIGNALS', 'ECOSYSTEM'] },
  { id: 'u_skyroot', name: 'Skyroot Aerospace', type: 'COMPANY', sector: 'SpaceTech', stage: 'Series B', signalStatus: '4 European Sat Contracts', whyInteresting: 'Patented carbon-composite stage separation on Vikram-1; ex-ISRO founders.', x: 12, y: 70, size: 24, zDepth: 5, cluster: 'SPACE', companyId: 'c_skyroot', layers: ['ALL', 'CAPITAL', 'SIGNALS'] },
  { id: 'u_isro', name: 'IN-SPACe / ISRO', type: 'ECOSYSTEM', sector: 'SpaceTech', signalStatus: 'Commercial Clearances', whyInteresting: 'Federal deregulation unlocking private orbital corridors.', x: 26, y: 74, size: 18, zDepth: -15, cluster: 'SPACE', layers: ['ALL', 'ECOSYSTEM', 'MARKET'] },
  { id: 'u_ather', name: 'Ather Energy', type: 'COMPANY', sector: 'CleanTech EV', stage: 'Pre-IPO ($1.3B)', signalStatus: 'Filed $500M SEBI DRHP', whyInteresting: 'Incubated at IIT Madras Research Park; Rizta driving volume surge.', x: 38, y: 64, size: 28, zDepth: 20, cluster: 'CLEANTECH', companyId: 'c_ather', layers: ['ALL', 'CAPITAL', 'ECOSYSTEM', 'SIGNALS'] },
  { id: 'u_torus', name: 'Torus Robotics', type: 'COMPANY', sector: 'Defense Robotics', stage: 'Seed ($12M)', signalStatus: 'Indian Army UGV Contract', whyInteresting: 'SRMIST Mechatronics alumni founders; all-electric military UGVs for Ladakh.', x: 50, y: 82, size: 24, zDepth: 25, cluster: 'DEFENSE', companyId: 'c_torus', layers: ['ALL', 'ECOSYSTEM', 'SIGNALS', 'MARKET'] },
  { id: 'u_stage', name: 'STAGE', type: 'COMPANY', sector: 'Consumer Media', stage: 'Series A ($15M+)', signalStatus: '3M+ Dialect Subscribers', whyInteresting: 'SRM alumni founders Vinay Singhal & Shashank Vaishnav; dialect OTT streaming.', x: 64, y: 60, size: 24, zDepth: 18, cluster: 'CONSUMER', companyId: 'c_stage', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'ECOSYSTEM', 'SIGNALS'] },
  { id: 'u_defense', name: 'Tactical UAVs', type: 'SECTOR', sector: 'Defense', signalStatus: '$45M Defense Fundings', whyInteresting: 'Indigenous micro-foundries scaling autonomous tactical airframes.', x: 62, y: 85, size: 18, zDepth: 10, cluster: 'DEFENSE', layers: ['ALL', 'CAPITAL', 'MARKET'] },
  { id: 'u_swiggy', name: 'Swiggy', type: 'COMPANY', sector: 'Consumer', stage: 'Pre-IPO', signalStatus: 'SEBI DRHP Cleared ($1.4B)', whyInteresting: 'Filing confidential IPO; BITS Pilani & IIT Kharagpur founders.', x: 78, y: 44, size: 32, zDepth: 30, cluster: 'CONSUMER', companyId: 'c_swiggy', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'MARKET'] },
  { id: 'u_zomato', name: 'Zomato', type: 'COMPANY', sector: 'Consumer', stage: 'Public', signalStatus: 'Blinkit Expansion', whyInteresting: 'Quick-commerce revenue now outpacing food delivery; IIT Delhi founders.', x: 90, y: 34, size: 26, zDepth: 0, cluster: 'CONSUMER', companyId: 'c_zomato', layers: ['ALL', 'CAPITAL', 'MARKET'] },
  { id: 'u_zepto', name: 'Zepto', type: 'COMPANY', sector: 'Quick Commerce', stage: 'Series F ($5B)', signalStatus: '700 Dark Store Surge', whyInteresting: 'Closed $450M mezzanine before Swiggy capital hits the street.', x: 86, y: 62, size: 26, zDepth: 15, cluster: 'CONSUMER', companyId: 'c_zepto', layers: ['ALL', 'CAPITAL', 'PEOPLE', 'SIGNALS'] },
  { id: 'u_srm', name: 'SRM Institute', type: 'ECOSYSTEM', sector: 'Talent Network', signalStatus: 'Torus & STAGE Founders', whyInteresting: 'Feeder of defense robotics (Torus) and vernacular media (STAGE) founders.', x: 54, y: 52, size: 24, zDepth: 20, cluster: 'ECOSYSTEM', companyId: 'c_torus', layers: ['ALL', 'ECOSYSTEM', 'PEOPLE'] },
  { id: 'u_iitm', name: 'IIT Madras Park', type: 'ECOSYSTEM', sector: 'DeepTech Hub', signalStatus: 'Agnikul & Ather Birthplace', whyInteresting: 'Premier research park driving aerospace, EV, and Indic AI IP.', x: 28, y: 42, size: 24, zDepth: 18, cluster: 'ECOSYSTEM', companyId: 'c_ather', layers: ['ALL', 'ECOSYSTEM', 'PEOPLE'] }
];

const CONNECTIONS = [
  { from: 'u_openai', to: 'u_ai_infra', layer: 'MARKET' },
  { from: 'u_openai', to: 'u_sarvam', layer: 'MARKET' },
  { from: 'u_sarvam', to: 'u_iitm', layer: 'ECOSYSTEM' },
  { from: 'u_postman', to: 'u_openai', layer: 'MARKET' },
  { from: 'u_agnikul', to: 'u_skyroot', layer: 'MARKET' },
  { from: 'u_agnikul', to: 'u_isro', layer: 'ECOSYSTEM' },
  { from: 'u_agnikul', to: 'u_iitm', layer: 'ECOSYSTEM' },
  { from: 'u_ather', to: 'u_iitm', layer: 'ECOSYSTEM' },
  { from: 'u_torus', to: 'u_srm', layer: 'ECOSYSTEM' },
  { from: 'u_stage', to: 'u_srm', layer: 'ECOSYSTEM' },
  { from: 'u_torus', to: 'u_defense', layer: 'MARKET' },
  { from: 'u_swiggy', to: 'u_zomato', layer: 'MARKET' },
  { from: 'u_swiggy', to: 'u_zepto', layer: 'MARKET' },
  { from: 'u_iitm', to: 'u_srm', layer: 'ECOSYSTEM' }
];

const FOCUS_LAYERS: { id: FocusLayer; label: string }[] = [
  { id: 'ALL', label: 'ALL' },
  { id: 'CAPITAL', label: 'CAPITAL' },
  { id: 'PEOPLE', label: 'PEOPLE' },
  { id: 'MARKET', label: 'MARKET' },
  { id: 'SIGNALS', label: 'SIGNALS' },
  { id: 'ECOSYSTEM', label: 'ECOSYSTEM' }
];

const clusterColor = (cluster: string) => {
  switch (cluster) {
    case 'AI': return '#2563eb';
    case 'SPACE': return '#059669';
    case 'DEVTOOLS': return '#ea580c';
    case 'CLEANTECH': return '#10b981';
    case 'DEFENSE': return '#7c3aed';
    case 'CONSUMER': return '#e11d48';
    case 'ECOSYSTEM': return '#d97706';
    default: return '#64748b';
  }
};

export const CompanyUniverseGraph: React.FC = () => {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState<FocusLayer>('ALL');
  const [hoveredNode, setHoveredNode] = useState<UniverseNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredNodes = activeLayer === 'ALL'
    ? UNIVERSE_NODES
    : UNIVERSE_NODES.filter(n => n.layers.includes(activeLayer));

  const handleNodeClick = (node: UniverseNode) => {
    if (node.companyId) navigate(`/company/${node.companyId}`);
    else if (node.type === 'SECTOR') navigate(`/discover?sector=${encodeURIComponent(node.sector.toLowerCase())}`);
    else if (node.type === 'ECOSYSTEM') navigate('/ecosystem');
    else navigate(`/search?q=${encodeURIComponent(node.name)}`);
  };

  return (
    <div className="relative w-full h-[520px] lg:h-[580px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 bb-pulse" />
          <span className="font-mono font-bold text-[11px] text-slate-900 tracking-wider uppercase">
            ENTITY INTELLIGENCE MAP
          </span>
          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
            {filteredNodes.length} NODES
          </span>
        </div>

        {/* Focus Layer Tabs */}
        <div className="flex items-center gap-1">
          {FOCUS_LAYERS.map(l => (
            <button
              key={l.id}
              onClick={() => setActiveLayer(l.id)}
              className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded transition-colors cursor-pointer ${
                activeLayer === l.id
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Zoom */}
        <div className="hidden sm:flex items-center gap-1">
          <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.3))} className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:text-slate-900 shadow-2xs cursor-pointer">
            <ZoomIn size={12} />
          </button>
          <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.9))} className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:text-slate-900 shadow-2xs cursor-pointer">
            <ZoomOut size={12} />
          </button>
          <button onClick={() => setZoomLevel(1)} className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:text-slate-900 shadow-2xs cursor-pointer">
            <RotateCcw size={11} />
          </button>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden select-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
        <div
          className="relative w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* SVG Connections */}
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
                  x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                  stroke={isHighlighted ? '#2563eb' : '#94a3b8'}
                  strokeWidth={isHighlighted ? 2 : 0.8}
                  strokeDasharray={isHighlighted ? '4 3' : 'none'}
                  strokeOpacity={isHighlighted ? 1 : 0.4}
                  className="transition-all duration-200"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {filteredNodes.map(node => {
            const isHovered = hoveredNode?.id === node.id;
            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                className="absolute z-10 cursor-pointer"
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-150 ${
                  isHovered
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20 scale-105'
                    : 'bg-white/95 border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs'
                }`}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: clusterColor(node.cluster) }} />
                  <span className="font-mono text-[11px] font-semibold text-slate-800 whitespace-nowrap">{node.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover Detail Card */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12 }}
              style={{
                left: `${Math.min(Math.max(hoveredNode.x, 20), 80)}%`,
                top: `${hoveredNode.y > 55 ? hoveredNode.y - 28 : hoveredNode.y + 10}%`
              }}
              className="absolute -translate-x-1/2 z-40 w-68 bg-white border border-slate-200 rounded-xl p-3.5 pointer-events-none shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900">{hoveredNode.name}</h4>
                  <p className="font-mono text-[10px] text-slate-500">{hoveredNode.sector} {hoveredNode.stage ? `// ${hoveredNode.stage}` : ''}</p>
                </div>
                <ArrowUpRight size={13} className="text-blue-600" />
              </div>
              <div className="py-1.5 px-2.5 bg-blue-50/60 border border-blue-100 rounded-md mb-2">
                <span className="font-mono text-[9px] text-blue-700 uppercase tracking-wider block font-semibold mb-0.5">CURRENT SIGNAL</span>
                <p className="text-[11px] text-slate-700 leading-snug">{hoveredNode.signalStatus}</p>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{hoveredNode.whyInteresting}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend Bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-white/95 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-600">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600" />AI</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-600" />DevTools</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-600" />Space/EV</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-600" />Defense</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-600" />Consumer</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-600" />Corridor</span>
          </div>
          <button
            onClick={() => navigate('/graph')}
            className="font-mono text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            EXPAND FULL GRAPH <ArrowUpRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};
