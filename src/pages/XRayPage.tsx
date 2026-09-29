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
        className="bg-white border border-slate-200 shadow-xs rounded-xl overflow-hidden mb-4"
      >
        <button 
          onClick={() => toggleSection(id)}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold tracking-wider text-sm text-slate-900 uppercase">{title}</h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-5 h-5 text-slate-400" />
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
              <div className="p-4 pt-2 border-t border-slate-100">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 md:p-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-6xl mx-auto space-y-10"
      >
        {/* Company Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-200 no-scrollbar">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider shrink-0 mr-2 font-semibold">AUDIT TARGET:</span>
          {companies.map(c => (
            <button
              key={c.id}
              onClick={() => navigate(`/xray/${c.id}`)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-all cursor-pointer ${
                c.id === company.id
                  ? 'bg-orange-600 text-white font-bold shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase flex flex-wrap items-center gap-3">
              WHAT'S REALLY GOING ON?
              <span className="text-xl md:text-2xl text-blue-700 bg-blue-50 px-4 py-1 rounded-full border border-blue-200">
                {company.name}
              </span>
            </h1>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate(`/redteam?company=${company.id}`)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors text-xs font-bold uppercase cursor-pointer shadow-2xs"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Red Team
              </button>
              <button 
                onClick={() => navigate(`/analyst?company=${company.id}`)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors text-xs font-bold uppercase cursor-pointer shadow-2xs"
              >
                <Search className="w-3.5 h-3.5" />
                Investigate
              </button>
            </div>
          </div>
          <p className="text-base text-slate-600 max-w-3xl">
            Observable changes, hidden signals, and deep intelligence on {company.name}'s current operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main X-Ray Signals */}
          <div className="lg:col-span-2 space-y-2">
            <h2 className="text-xs font-bold text-slate-400 tracking-widest mb-4 uppercase">Intelligence Signals</h2>
            
            <ExpandableCard id="legal" title="LEGAL" icon={Scale}>
              {company.legalEvents && company.legalEvents.length > 0 ? (
                <div className="space-y-3">
                  {company.legalEvents.map((event: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="text-xs font-mono text-slate-500 mt-1 whitespace-nowrap">{event.date}</div>
                      <div>
                        <div className="font-bold text-slate-900">{event.title}</div>
                        <div className="text-sm text-slate-600 mt-1">{event.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 text-sm italic py-2">No significant legal events detected.</div>
              )}
            </ExpandableCard>

            <ExpandableCard id="regulatory" title="REGULATORY" icon={FileText}>
              <div className="text-slate-400 text-sm italic py-2">No regulatory events detected.</div>
            </ExpandableCard>

            <ExpandableCard id="market" title="MARKET &amp; COMPETITORS" icon={Activity}>
              <div className="space-y-6 py-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Operating Markets</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.markets?.map((m: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 rounded-md text-xs font-semibold text-slate-700 border border-slate-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Competitors</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.competitors?.map((c: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard id="founders" title="FOUNDER GRAPH" icon={Users}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
                {company.founders?.map((f: any, i: number) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">{f.name}</div>
                    <div className="text-xs text-slate-500">{f.background} • {f.education}</div>
                  </div>
                ))}
              </div>
            </ExpandableCard>

            <ExpandableCard id="operations" title="OPERATIONS SIGNALS" icon={TrendingUp}>
               <div className="space-y-2 py-2">
                  {company.operationSignals?.map((sig: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-sm font-medium text-slate-800">{sig.signal}</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold ${
                        sig.trend === 'up' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                        sig.trend === 'down' ? 'text-rose-700 bg-rose-50 border border-rose-200' :
                        'text-slate-600 bg-slate-200'
                      }`}>
                        {sig.trend.toUpperCase()}
                      </span>
                    </div>
                  ))}
               </div>
            </ExpandableCard>
          </div>

          {/* Sidebar - Risks & Unknowns */}
          <div className="space-y-6">
            
            {/* Story vs Signal */}
            <div className="bg-white border border-slate-200 shadow-xs rounded-xl p-6">
              <h2 className="text-xs font-bold text-slate-400 tracking-widest mb-4 flex items-center gap-2 uppercase">
                <Activity className="w-4 h-4 text-orange-600" /> Story vs Signal
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-lg">
                  <div className="text-xs text-emerald-800 font-bold mb-1">COMPANY CLAIM</div>
                  <div className="text-sm text-slate-700">"We are on path to profitability by next quarter."</div>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-4 bg-slate-300"></div>
                </div>
                <div className="p-4 bg-rose-50/70 border-l-4 border-rose-500 rounded-r-lg">
                  <div className="text-xs text-rose-800 font-bold mb-1">OBSERVABLE SIGNALS</div>
                  <div className="text-sm text-slate-700">Aggressive discounting observed in top 3 markets. Hiring freeze lifted only for sales team.</div>
                </div>
              </div>
            </div>

            {/* Blind Spots */}
            <div className="bg-amber-50/40 border border-amber-200 shadow-xs rounded-xl p-6">
              <h2 className="text-xs font-bold text-amber-700 tracking-widest mb-4 flex items-center gap-2 uppercase">
                <EyeOff className="w-4 h-4" /> What don't we know?
              </h2>
              <div className="space-y-3 mb-6">
                {company.blindSpots?.map((spot: any, i: number) => (
                  <div key={i} className="flex gap-3 items-start">
                    <XCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{spot.area}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{spot.importance} impact</div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate(`/analyst?company=${company.id}&q=blindspots`)}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors text-xs font-bold tracking-wider cursor-pointer shadow-2xs"
              >
                INVESTIGATE BLIND SPOTS
              </button>
            </div>

            {/* Capital Structure */}
            <div className="bg-white border border-slate-200 shadow-xs rounded-xl p-6">
              <h2 className="text-xs font-bold text-slate-400 tracking-widest mb-4 uppercase">Capital Structure</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500">Total Raised</span>
                  <span className="font-mono text-slate-900 font-bold">{company.totalFunding?.claim || (company as any).totalRaised || 'Unknown'}</span>
                </div>
                <div className="flex justify-between text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500">Latest Valuation</span>
                  <span className="font-mono text-slate-900 font-bold">{company.valuation?.claim || (company as any).valuation || 'Unknown'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
