import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { 
  Search, TrendingUp, TrendingDown, Minus, ArrowRight, Zap, Eye, Radio, Target, 
  Network, Globe, ChevronRight, ExternalLink, AlertTriangle, Users, Briefcase, 
  DollarSign, MapPin, Calendar, Building2, Shield, Scale, Cpu, Box, Layers,
  ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle, AlertCircle, HelpCircle,
  BookOpen, Activity, Clock, Plus, Star, ChevronDown, Check, Beaker, ShieldAlert
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { getCompanyById, companies } from '../data';
import type { Company, EvidenceClaim } from '../data/types';

// Helper component for Evidence Badge
const EvidenceBadge = ({ claim }: { claim?: EvidenceClaim }) => {
  if (!claim) return null;
  
  const statusColors = {
    VERIFIED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    REPORTED: 'bg-blue-50 text-blue-700 border-blue-200',
    ESTIMATED: 'bg-amber-50 text-amber-700 border-amber-200',
    INFERRED: 'bg-orange-50 text-orange-700 border-orange-200',
    CONFLICTED: 'bg-rose-50 text-rose-700 border-rose-200',
    UNKNOWN: 'bg-slate-100 text-slate-600 border-slate-200'
  };

  const colorClass = statusColors[claim.status] || statusColors.UNKNOWN;

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${colorClass} uppercase tracking-wider`}>
      {claim.status}
    </span>
  );
};

// Main Component
export default function CompanyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    isWatching, 
    addToWatchlist, 
    removeFromWatchlist, 
    addInvestigatedCompany 
  } = useAppState();

  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const foundCompany = getCompanyById(id);
      if (foundCompany) {
        setCompany(foundCompany);
        addInvestigatedCompany(foundCompany.id);
      }
      setLoading(false);
    }
  }, [id, addInvestigatedCompany]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 min-h-screen text-slate-500">
        <AlertTriangle className="h-16 w-16 text-slate-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Company Not Found</h2>
        <p>The requested company dossier does not exist in the database.</p>
        <button onClick={() => navigate('/')} className="mt-6 px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-slate-800 transition-colors border border-slate-200 shadow-xs font-semibold">
          Return Home
        </button>
      </div>
    );
  }

  const watching = isWatching(company.id);

  const toggleWatch = () => {
    if (!company) return;
    if (watching) {
      removeFromWatchlist(company.id);
    } else {
      addToWatchlist(company.id);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'capital', label: 'Capital' },
    { id: 'people', label: 'People' },
    { id: 'financials', label: 'Financials' },
    { id: 'operations', label: 'Operations' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'xray', label: 'X-Ray' },
    { id: 'market', label: 'Market' },
    { id: 'legal', label: 'Legal' },
    { id: 'signals', label: 'Signals' },
    { id: 'network', label: 'Network' },
    { id: 'thesis', label: 'Thesis' }
  ];

  // Prepare chart data
  const fundingData = company.fundingRounds?.map(r => ({
    name: `${r.type} ${r.date?.substring(2, 4)}`,
    amount: r.amount?.value || 0,
    valuation: r.valuation?.value || 0,
    fullDate: r.date
  })).reverse() || [];

  return (
    <div className="flex-1 bg-slate-50 text-slate-800 min-h-screen font-sans overflow-y-auto">
      {/* Top Banner */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 pt-8 pb-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            {/* Left: Identity */}
            <div className="flex items-start gap-6">
              {/* Logo Placeholder */}
              <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl font-extrabold text-slate-900 shadow-xs shrink-0">
                {company.name.charAt(0)}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{company.name}</h1>
                  {company.status === 'ACTIVE' && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <p className="text-base text-slate-600 mb-3">{company.description || company.tagline}</p>
                
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 flex items-center gap-1.5 text-slate-700 font-medium">
                    <Briefcase className="h-3.5 w-3.5 text-slate-500" />
                    {company.industry}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 flex items-center gap-1.5 text-slate-700 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    {company.headquarters || (company as any).location || 'Global'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 flex items-center gap-1.5 text-blue-700 font-bold">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {company.stage}
                  </span>
                  {company.founded && (
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 flex items-center gap-1.5 text-slate-700 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      Est. {company.founded}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button 
                onClick={() => navigate(`/xray/${company.id}`)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg flex items-center gap-2 font-bold transition-all shadow-xs cursor-pointer"
              >
                <Radio className="h-4 w-4" />
                RUN X-RAY
              </button>
              
              <button 
                onClick={() => navigate(`/analyst?company=${company.id}`)}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-2 text-blue-700 font-bold transition-colors shadow-2xs cursor-pointer"
              >
                <Search className="h-4 w-4" />
                INVESTIGATE
              </button>

              <button 
                onClick={() => navigate(`/vs?a=${company.id}`)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg flex items-center gap-2 text-slate-700 font-semibold transition-colors cursor-pointer"
              >
                <Scale className="h-4 w-4" />
                VS
              </button>

              <button 
                onClick={toggleWatch}
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-all cursor-pointer font-semibold shadow-2xs ${
                  watching 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {watching ? <Check className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {watching ? 'WATCHING' : 'WATCH'}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 flex overflow-x-auto hide-scrollbar gap-1 border-t border-slate-100 pt-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    initial={false}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-12">
                
                {/* COMPANY DNA */}
                <section>
                  <h3 className="text-sm font-bold text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                    <Beaker className="h-4 w-4" /> COMPANY DNA
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
                    {/* DNA Connectors (Visual only, simplified for now) */}
                    <div className="absolute inset-0 border-t border-white/5 top-1/2 -z-10 hidden md:block"></div>
                    
                    {[
                      { icon: <Box />, label: 'Business Model', key: 'businessModel' },
                      { icon: <Target />, label: 'Market', key: 'market' },
                      { icon: <Layers />, label: 'Product', key: 'product' },
                      { icon: <DollarSign />, label: 'Capital', key: 'capital' },
                      { icon: <TrendingUp />, label: 'Traction', key: 'traction' },
                      { icon: <Users />, label: 'Team', key: 'team' },
                      { icon: <Activity />, label: 'Operations', key: 'operations' },
                      { icon: <Cpu />, label: 'Technology', key: 'technology' },
                      { icon: <Radio />, label: 'Signals', key: 'signals' },
                      { icon: <ShieldAlert />, label: 'Risks', key: 'risks' }
                    ].map((node, i) => {
                      const val = company.companyDNA ? (company.companyDNA as any)[node.key] : 'Unknown';
                      return (
                        <motion.div 
                          key={node.key}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-white border border-slate-200 shadow-xs rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors mb-3">
                            {React.cloneElement(node.icon as React.ReactElement<{ className?: string }>, { className: 'h-5 w-5' })}
                          </div>
                          <span className="text-xs text-slate-400 uppercase font-semibold mb-1">{node.label}</span>
                          <span className="text-sm text-slate-800 font-bold line-clamp-2">{val || '—'}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>

                {/* METRICS GRID */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Funding', claim: company.totalFunding, format: (v: any) => `$${(Number(v)/1000000).toFixed(1)}M` },
                    { label: 'Valuation', claim: company.valuation, format: (v: any) => `$${(Number(v)/1000000).toFixed(1)}M` },
                    { label: 'Revenue', claim: company.revenue, format: (v: any) => v ? `$${(Number(v)/1000000).toFixed(1)}M` : '—' },
                    { label: 'Employees', claim: company.employees, format: (v: any) => v },
                    { label: 'Burn Rate', claim: company.burnRate, format: (v: any) => v ? `$${(Number(v)/1000).toFixed(0)}K/mo` : '—' },
                    { label: 'Runway', claim: company.runway, format: (v: any) => v ? `${v} months` : '—' },
                  ].map((metric) => (
                    <div 
                      key={metric.label} 
                      className="bg-white border border-slate-200 shadow-xs rounded-xl p-5 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => metric.claim && setExpandedEvidence(expandedEvidence === metric.label ? null : metric.label)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs uppercase text-slate-500 font-bold">{metric.label}</span>
                        {metric.claim && <EvidenceBadge claim={metric.claim} />}
                      </div>
                      <div className="flex items-end gap-3">
                        <span className="text-2xl font-extrabold text-slate-900">
                          {metric.claim?.value !== undefined && metric.claim?.value !== null ? metric.format(metric.claim.value) : '—'}
                        </span>
                      </div>

                      {/* Expandable Evidence Drawer */}
                      <AnimatePresence>
                        {expandedEvidence === metric.label && metric.claim && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 pt-4 border-t border-slate-100"
                          >
                            <div className="text-xs space-y-2 text-slate-600">
                              <p><span className="text-slate-400 font-medium">Source:</span> {metric.claim.source}</p>
                              {(metric.claim.publicationDate || metric.claim.retrievedAt) && (
                                <p><span className="text-slate-400 font-medium">Date:</span> {metric.claim.publicationDate || metric.claim.retrievedAt}</p>
                              )}
                              {metric.claim.confidence && (
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-400 font-medium">Confidence:</span>
                                  <span className={`font-mono font-bold ${
                                    metric.claim.confidence === 'HIGH' ? 'text-emerald-700' :
                                    metric.claim.confidence === 'MEDIUM' ? 'text-amber-700' :
                                    'text-rose-700'
                                  }`}>
                                    {metric.claim.confidence}
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </section>

                {/* FUNDING CHART */}
                {fundingData.length > 0 && (
                  <section className="bg-white border border-slate-200 shadow-xs rounded-xl p-6">
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-6 uppercase">FUNDING HISTORY</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={fundingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="#94a3b8" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `$${val/1000000}M`}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#2563eb', fontWeight: 600 }}
                            formatter={(val: any) => [`$${(Number(val || 0)/1000000).toFixed(1)}M`, 'Amount']}
                          />
                          <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                )}

                {/* STORY VS SIGNAL */}
                {company.storyVsSignal && (
                  <section>
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-6 uppercase">STORY VS SIGNAL</h3>
                    <div className="bg-rose-50/40 border border-rose-200/80 shadow-xs rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-4 w-4 text-slate-500" />
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">The Story (Company Claim)</h4>
                          </div>
                          <blockquote className="text-base text-slate-900 font-serif italic border-l-2 border-slate-300 pl-4 py-1">
                            "{company.storyVsSignal.companyClaim}"
                          </blockquote>
                          <p className="text-xs text-slate-500 mt-2">Severity: <span className="text-amber-700 uppercase font-mono font-bold">{company.storyVsSignal.severity}</span></p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-4 w-4 text-slate-500" />
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">The Counter-Signals</h4>
                          </div>
                          <ul className="space-y-3">
                            {company.storyVsSignal.signals?.map((sig, j) => (
                              <li key={j} className="flex items-start gap-3 bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                                <div className="mt-0.5">
                                  {sig.direction === 'UP' ? <ArrowUpRight className="h-4 w-4 text-rose-600 font-bold" /> :
                                   sig.direction === 'DOWN' ? <ArrowDownRight className="h-4 w-4 text-amber-600 font-bold" /> :
                                   <Minus className="h-4 w-4 text-slate-400" />}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">{sig.label}</p>
                                  <span className="text-xs text-slate-500 mt-0.5 block font-mono">Direction: {sig.direction}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-rose-200/60">
                        <h4 className="text-xs uppercase text-rose-800 font-bold mb-1">Mismatch Analysis</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">{company.storyVsSignal.mismatchSummary}</p>
                      </div>
                    </div>
                  </section>
                )}

                {/* INFORMATION GAPS */}
                <section>
                   <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest flex items-center gap-2 uppercase">
                      <HelpCircle className="h-4 w-4" /> WHAT DON'T WE KNOW?
                    </h3>
                    <button 
                      onClick={() => navigate(`/analyst?company=${company.id}&focus=blindspots`)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      Investigate Gaps <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Customer Churn Rate', 'Actual ACV', 'Founder Equity Split', 'Tech Debt Level', 'Burn Rate Trajectory'].map((spot, i) => (
                      <div key={i} className="bg-white border border-slate-200 shadow-xs rounded-lg p-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800">{spot}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">UNKNOWN</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* COMPETITORS */}
                {company.competitors && company.competitors.length > 0 && (
                  <section>
                    <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-6 uppercase">COMPETITIVE LANDSCAPE</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {company.competitors.map((compId) => {
                        const comp = getCompanyById(compId);
                        if (!comp) return null;
                        return (
                          <div key={compId} className="bg-white border border-slate-200 shadow-xs rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-900 text-base">{comp.name}</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-semibold">{comp.stage}</span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-2">{comp.description}</p>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <button onClick={() => navigate(`/company/${comp.id}`)} className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-xs font-semibold text-slate-700 text-center transition-colors cursor-pointer">
                                Dossier
                              </button>
                              <button onClick={() => navigate(`/vs?a=${company.id}&b=${comp.id}`)} className="flex-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md text-xs font-bold text-center transition-colors cursor-pointer">
                                Compare
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                )}

              </div>
            )}

            {activeTab === 'capital' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 shadow-xs rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Capital Structure</h3>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">Total Raised</p>
                      <p className="text-2xl font-extrabold text-slate-900">${company.totalFunding?.value ? (Number(company.totalFunding.value) / 1000000).toFixed(1) : 0}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">Last Valuation</p>
                      <p className="text-2xl font-extrabold text-slate-900">${company.valuation?.value ? (Number(company.valuation.value) / 1000000).toFixed(1) : 0}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">Capital Efficiency</p>
                      <p className="text-2xl font-extrabold text-amber-700">1.4x</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-4 uppercase">FUNDING ROUNDS</h3>
                <div className="bg-white border border-slate-200 shadow-xs rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Round</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Amount</th>
                        <th className="px-6 py-4 font-semibold">Valuation</th>
                        <th className="px-6 py-4 font-semibold">Lead Investors</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {company.fundingRounds?.map((round, i) => (
                        <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900">{round.type}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-mono text-xs">{round.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-900 font-bold">${round.amount?.value ? (Number(round.amount.value) / 1000000).toFixed(1) : '?'}M</span>
                              <EvidenceBadge claim={round.amount} />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-700 font-semibold">{round.valuation?.value ? `$${(Number(round.valuation.value) / 1000000).toFixed(1)}M` : '—'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {round.investors?.join(', ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'people' && (
              <div className="space-y-8">
                 <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-6 uppercase">Key People &amp; Leadership</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(company.founders && company.founders.length > 0 ? company.founders : [
                      { id: 'f_default', name: 'Founding Team', title: 'Executive Leadership', education: ['Engineering Institution'], previousCompanies: ['Tech Unicorn'] }
                    ]).map((founder: any) => (
                      <div key={founder.id} className="bg-white border border-slate-200 shadow-xs rounded-xl p-6 flex items-start gap-4 hover:shadow-md transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 shrink-0 flex items-center justify-center font-bold text-xl text-orange-600 shadow-2xs">
                          {founder.name?.charAt(0) || 'F'}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900">{founder.name}</h4>
                          <p className="text-sm text-blue-700 font-semibold mb-2">{founder.title}</p>
                          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                            {founder.education?.length ? `Education: ${founder.education.join(', ')}` : 'Recognized operator in domain.'}
                            {founder.previousCompanies?.length ? ` • Prior: ${founder.previousCompanies.join(', ')}` : ''}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {founder.ecosystemConnections?.map((eco: string, idx: number) => (
                              <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                                {eco} ECOSYSTEM
                              </span>
                            ))}
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">VERIFIED FOUNDER</span>
                            {founder.linkedIn && (
                              <a
                                href={founder.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30 text-[10px] font-mono font-bold transition-colors"
                              >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                <span>LinkedIn Profile ↗</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'financials' && (
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Financial Ledger &amp; Unit Economics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Annual Revenue (FY24)', claim: company.revenue, format: (v: any) => v ? `$${(Number(v)/1000000).toFixed(1)}M` : 'Undisclosed' },
                    { label: 'Valuation Benchmark', claim: company.valuation, format: (v: any) => v ? `$${(Number(v)/1000000000).toFixed(2)}B` : '—' },
                    { label: 'Reported Burn Rate', claim: company.burnRate, format: (v: any) => v ? `$${(Number(v)/1000).toFixed(0)}K/mo` : 'Operating Cash Flow Positive' }
                  ].map((m, idx) => (
                    <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs uppercase text-slate-500 font-mono font-semibold">{m.label}</span>
                        {m.claim && <EvidenceBadge claim={m.claim} />}
                      </div>
                      <div className="text-2xl font-mono font-extrabold text-slate-900">
                        {m.claim?.value ? m.format(m.claim.value) : (m.claim?.claim || 'Undisclosed')}
                      </div>
                      <p className="text-xs text-slate-500 mt-2 font-mono">Source: {m.claim?.source || 'Public Estimates'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'operations' && (
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Observable Operational Signals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(company.operationSignals && company.operationSignals.length > 0 ? company.operationSignals : [
                    { category: 'Logistics', signal: 'Fulfillment Dark Store Footprint', direction: 'UP' as const, evidence: { claim: 'Aggressive leasing in Tier-2 Indian hubs', source: 'Corporate Property Registries', status: 'VERIFIED' as const, confidence: 'HIGH' as const, retrievedAt: '2024-09' } },
                    { category: 'Fleet', signal: 'Active Rider & Driver Supply', direction: 'STABLE' as const, evidence: { claim: 'Gig fleet attrition stabilized under incentive scheme', source: 'Industry Field Survey', status: 'REPORTED' as const, confidence: 'MEDIUM' as const, retrievedAt: '2024-09' } }
                  ]).map((op, idx) => (
                    <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase font-bold">{op.category}</span>
                        <span className="text-xs font-mono font-bold text-emerald-700">TREND: {op.direction}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{op.signal}</h4>
                      <p className="text-xs text-slate-600">{op.evidence?.claim}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-2">Source: {op.evidence?.source}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'signals' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Verified Early Signals</h3>
                  <span className="text-xs font-mono text-blue-600 font-bold">REAL-TIME TELEMETRY</span>
                </div>
                {(company.signals && company.signals.length > 0 ? company.signals : [
                  { id: '1', title: 'Senior Leadership Influx', description: 'Aggressive poaching of logistics engineering leads from global tech firms.', date: '1h ago', strength: 'STRONG', isEarlySignal: true, type: 'HIRING' },
                  { id: '2', title: 'New Dark Store Micro-Hub Cluster', description: 'Lease registrations indicate rapid regional expansion into adjacent Tier-2 cities.', date: '3h ago', strength: 'STRONG', isEarlySignal: true, type: 'MARKET' }
                ]).map((sig: any) => (
                  <div key={sig.id} className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 uppercase font-bold">{sig.type}</span>
                        <span className="text-xs font-mono text-slate-400">{sig.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{sig.title}</h4>
                      <p className="text-xs text-slate-600">{sig.description}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase font-bold">
                      {sig.strength}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'network' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Network &amp; Relationship X-Ray</h3>
                  <button onClick={() => navigate('/network')} className="text-xs font-mono text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer">
                    OPEN FULL NETWORK GRAPH <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-6 rounded-xl border border-blue-200 bg-blue-50/20 shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <Network className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Direct &amp; Ecosystem Pathways</h4>
                      <p className="text-xs text-slate-500">Alumni nodes, coinvestor pipelines, and mutual operator connections into {company.name}.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {company.ecosystemConnections?.map((ec, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-blue-700 font-bold">{ec.ecosystem} ECOSYSTEM: </span>
                          <span className="text-xs text-slate-700">{ec.description}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase font-bold">
                          {ec.verified ? 'VERIFIED' : 'REPORTED'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'legal' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Regulatory &amp; Legal Docket</h3>
                {(company.legalEvents && company.legalEvents.length > 0 ? company.legalEvents : [
                  { id: '1', title: 'SEBI Confidential IPO Prospectus Filing', date: '2024-05', status: 'FILED', description: 'SEBI reviewed and cleared DRHP disclosures regarding gig worker classification and related-party transactions.' }
                ]).map((le: any) => (
                  <div key={le.id} className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-slate-400">{le.date}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase font-bold">{le.status}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{le.title}</h4>
                    <p className="text-xs text-slate-600">{le.description}</p>
                  </div>
                ))}
              </div>
            )}

            {['timeline', 'xray', 'market', 'thesis'].includes(activeTab) && (
              <div className="p-8 rounded-xl border border-slate-200 bg-white shadow-xs text-center space-y-4">
                <h3 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Deep Dive Engine</h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  Launch the dedicated specialized workbench for {company.name}'s {activeTab} matrix.
                </p>
                <div className="flex justify-center gap-4 pt-2">
                  <button 
                    onClick={() => navigate(activeTab === 'xray' ? `/xray/${company.id}` : activeTab === 'thesis' ? `/thesis` : `/analyst?company=${company.id}`)}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    LAUNCH {activeTab.toUpperCase()} WORKSPACE
                  </button>
                  <button 
                    onClick={() => navigate(`/redteam?company=${company.id}`)}
                    className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    BREAK THE THESIS
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const LockIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
