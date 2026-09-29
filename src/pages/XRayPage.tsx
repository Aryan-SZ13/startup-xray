import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, ShieldAlert, TrendingUp, Users, Scale, FileText,
  Activity, MapPin, EyeOff, Search, Rocket, ChevronRight, XCircle, Info, BrainCircuit
} from 'lucide-react';
import { companies, getCompanyById } from '../data';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function XRayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const company = getCompanyById(id || '') || getCompanyById('c_torus') || companies[0];

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(prev => prev === sectionId ? null : sectionId);
  };

  const ExpandableCard = ({ title, icon: Icon, children, id }: { title: string, icon: any, children: React.ReactNode, id: string }) => {
    const isExpanded = expandedSection === id;
    
    return (
      <motion.div 
        layout
        className="bg-[#111118] border border-white/5 rounded-lg overflow-hidden mb-4"
      >
        <button 
          onClick={() => toggleSection(id)}
          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-[#00d4ff]" />
            <h3 className="font-semibold tracking-wider text-sm">{title}</h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-white/5">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 font-sans p-6 md:p-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-6xl mx-auto space-y-12"
      >
        {/* Company Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider shrink-0 mr-2">AUDIT TARGET:</span>
          {companies.map(c => (
            <button
              key={c.id}
              onClick={() => navigate(`/xray/${c.id}`)}
              className={`px-3 py-1 text-xs font-mono rounded whitespace-nowrap transition-colors cursor-pointer ${
                c.id === company.id
                  ? 'bg-[#ff8c00] text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase flex flex-wrap items-center gap-3">
              WHAT'S REALLY GOING ON?
              <span className="text-xl md:text-2xl text-[#00d4ff] bg-[#00d4ff]/10 px-4 py-1 rounded-full border border-[#00d4ff]/20">
                {company.name}
              </span>
            </h1>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate(`/redteam?company=${company.id}`)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded transition-colors text-xs font-semibold uppercase cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Red Team
              </button>
              <button 
                onClick={() => navigate(`/analyst?company=${company.id}`)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff]/20 border border-[#00d4ff]/20 rounded transition-colors text-xs font-semibold uppercase cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                Investigate
              </button>
            </div>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl">
            Observable changes, hidden signals, and deep intelligence on {company.name}'s current operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main X-Ray Signals */}
          <div className="lg:col-span-2 space-y-2">
            <h2 className="text-sm font-bold text-gray-500 tracking-widest mb-6 uppercase">Intelligence Signals</h2>
            
            <ExpandableCard id="legal" title="LEGAL" icon={Scale}>
              {company.legalEvents && company.legalEvents.length > 0 ? (
                <div className="space-y-4">
                  {company.legalEvents.map((event: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded border border-white/5">
                      <div className="text-xs text-gray-400 mt-1 whitespace-nowrap">{event.date}</div>
                      <div>
                        <div className="font-semibold text-white">{event.title}</div>
                        <div className="text-sm text-gray-400 mt-1">{event.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm italic">No significant legal events detected.</div>
              )}
            </ExpandableCard>

            <ExpandableCard id="regulatory" title="REGULATORY" icon={FileText}>
              <div className="text-gray-500 text-sm italic">No regulatory events detected.</div>
            </ExpandableCard>

            <ExpandableCard id="market" title="MARKET & COMPETITORS" icon={Activity}>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Operating Markets</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.markets?.map((m: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded text-sm text-gray-300 border border-white/10">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Competitors</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.competitors?.map((c: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-[#00d4ff]/5 text-[#00d4ff] rounded text-sm border border-[#00d4ff]/20">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard id="founders" title="FOUNDER GRAPH" icon={Users}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.founders?.map((f: any, i: number) => (
                  <div key={i} className="bg-white/5 p-4 rounded border border-white/5">
                    <div className="font-bold text-white mb-1">{f.name}</div>
                    <div className="text-xs text-gray-400">{f.background} • {f.education}</div>
                  </div>
                ))}
              </div>
            </ExpandableCard>

            <ExpandableCard id="operations" title="OPERATIONS SIGNALS" icon={TrendingUp}>
               <div className="space-y-3">
                  {company.operationSignals?.map((sig: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                      <span className="text-sm">{sig.signal}</span>
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        sig.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' :
                        sig.trend === 'down' ? 'text-red-400 bg-red-400/10' :
                        'text-gray-400 bg-white/10'
                      }`}>
                        {sig.trend.toUpperCase()}
                      </span>
                    </div>
                  ))}
               </div>
            </ExpandableCard>
          </div>

          {/* Sidebar - Risks & Unknowns */}
          <div className="space-y-8">
            
            {/* Story vs Signal */}
            <div className="bg-[#111118] border border-white/5 rounded-lg p-6">
              <h2 className="text-sm font-bold text-gray-500 tracking-widest mb-4 flex items-center gap-2 uppercase">
                <Activity className="w-4 h-4" /> Story vs Signal
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border-l-2 border-emerald-500 rounded-r">
                  <div className="text-xs text-emerald-500 font-bold mb-1">COMPANY CLAIM</div>
                  <div className="text-sm text-gray-300">"We are on path to profitability by next quarter."</div>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-4 bg-gray-600"></div>
                </div>
                <div className="p-4 bg-red-500/10 border-l-2 border-red-500 rounded-r">
                  <div className="text-xs text-red-500 font-bold mb-1">OBSERVABLE SIGNALS</div>
                  <div className="text-sm text-gray-300">Aggressive discounting observed in top 3 markets. Hiring freeze lifted only for sales team.</div>
                </div>
              </div>
            </div>

            {/* Blind Spots */}
            <div className="bg-amber-950/10 border border-amber-500/20 rounded-lg p-6">
              <h2 className="text-sm font-bold text-amber-500/70 tracking-widest mb-4 flex items-center gap-2 uppercase">
                <EyeOff className="w-4 h-4" /> What don't we know?
              </h2>
              <div className="space-y-4 mb-6">
                {company.blindSpots?.map((spot: any, i: number) => (
                  <div key={i} className="flex gap-3 items-start">
                    <XCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-gray-200">{spot.area}</div>
                      <div className="text-xs text-gray-400 mt-1">{spot.importance} impact</div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate(`/analyst?company=${company.id}&q=blindspots`)}
                className="w-full py-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20 rounded transition-colors text-xs font-bold tracking-wider cursor-pointer"
              >
                INVESTIGATE BLIND SPOTS
              </button>
            </div>

            {/* Capital Structure */}
            <div className="bg-[#111118] border border-white/5 rounded-lg p-6">
              <h2 className="text-sm font-bold text-gray-500 tracking-widest mb-4 uppercase">Capital Structure</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                  <span className="text-gray-400">Total Raised</span>
                  <span className="font-mono text-white">{company.totalFunding?.claim || (company as any).totalRaised || 'Unknown'}</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                  <span className="text-gray-400">Latest Valuation</span>
                  <span className="font-mono text-white">{company.valuation?.claim || (company as any).valuation || 'Unknown'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
