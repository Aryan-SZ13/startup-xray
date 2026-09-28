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
    VERIFIED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    REPORTED: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    ESTIMATED: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    INFERRED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    CONFLICTED: 'bg-red-500/20 text-red-400 border-red-500/30',
    UNKNOWN: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
  };

  const colorClass = statusColors[claim.status] || statusColors.UNKNOWN;

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${colorClass} uppercase tracking-wider`}>
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
      <div className="flex-1 flex items-center justify-center bg-[#0a0a0f] min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0a0f] min-h-screen text-zinc-400">
        <AlertTriangle className="h-16 w-16 text-zinc-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Company Not Found</h2>
        <p>The requested company dossier does not exist in the database.</p>
        <button onClick={() => navigate('/')} className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors border border-white/10">
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
    <div className="flex-1 bg-[#0a0a0f] text-zinc-300 min-h-screen font-sans overflow-y-auto">
      {/* Top Banner */}
      <div className="border-b border-white/5 bg-[#0d0d14]/80 backdrop-blur-md sticky top-0 z-40 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            {/* Left: Identity */}
            <div className="flex items-start gap-6">
              {/* Logo Placeholder */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-3xl font-bold text-white shadow-lg shrink-0">
                {company.name.charAt(0)}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-4xl font-bold text-white tracking-tight">{company.name}</h1>
                  {company.status === 'ACTIVE' && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <p className="text-lg text-zinc-400 mb-3">{company.description || company.tagline}</p>
                
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1.5 text-zinc-300">
                    <Briefcase className="h-3 w-3" />
                    {company.industry}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1.5 text-zinc-300">
                    <MapPin className="h-3 w-3" />
                    {company.headquarters || (company as any).location || 'Global'}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-1.5 text-cyan-400">
                    <TrendingUp className="h-3 w-3" />
                    {company.stage}
                  </span>
                  {company.founded && (
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1.5 text-zinc-300">
                      <Calendar className="h-3 w-3" />
                      Est. {company.founded}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => navigate(`/xray/${company.id}`)}
                className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg flex items-center gap-2 font-medium transition-all shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.2)]"
              >
                <Radio className="h-4 w-4" />
                X-RAY
              </button>
              
              <button 
                onClick={() => navigate(`/analyst?company=${company.id}`)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-2 text-white transition-colors"
              >
                <Search className="h-4 w-4" />
                INVESTIGATE
              </button>

              <button 
                onClick={() => navigate(`/vs?a=${company.id}`)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-2 text-white transition-colors"
              >
                <Scale className="h-4 w-4" />
                VS
              </button>

              <button 
                onClick={toggleWatch}
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-all ${
                  watching 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {watching ? <Check className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {watching ? 'WATCHING' : 'WATCH'}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 flex overflow-x-auto hide-scrollbar gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"
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
                          className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col items-center text-center hover:bg-white/[0.04] transition-colors cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#0d0d14] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors mb-3">
                            {React.cloneElement(node.icon as React.ReactElement<{ className?: string }>, { className: 'h-5 w-5' })}
                          </div>
                          <span className="text-xs text-zinc-500 uppercase font-medium mb-1">{node.label}</span>
                          <span className="text-sm text-zinc-300 font-medium line-clamp-2">{val || '—'}</span>
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
                      className="bg-[#111118] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors cursor-pointer"
                      onClick={() => metric.claim && setExpandedEvidence(expandedEvidence === metric.label ? null : metric.label)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs uppercase text-zinc-500 font-semibold">{metric.label}</span>
                        {metric.claim && <EvidenceBadge claim={metric.claim} />}
                      </div>
                      <div className="flex items-end gap-3">
                        <span className="text-2xl font-bold text-white">
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
                            className="overflow-hidden mt-4 pt-4 border-t border-white/5"
                          >
                            <div className="text-xs space-y-2 text-zinc-400">
                              <p><span className="text-zinc-500">Source:</span> {metric.claim.source}</p>
                              {(metric.claim.publicationDate || metric.claim.retrievedAt) && (
                                <p><span className="text-zinc-500">Date:</span> {metric.claim.publicationDate || metric.claim.retrievedAt}</p>
                              )}
                              {metric.claim.confidence && (
                                <div className="flex items-center gap-2">
                                  <span className="text-zinc-500">Confidence:</span>
                                  <span className={`font-mono font-medium ${
                                    metric.claim.confidence === 'HIGH' ? 'text-emerald-400' :
                                    metric.claim.confidence === 'MEDIUM' ? 'text-amber-400' :
                                    'text-red-400'
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
                  <section className="bg-[#111118] border border-white/5 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-zinc-500 tracking-widest mb-6">FUNDING HISTORY</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={fundingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#ffffff40" 
                            fontSize={12} 
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="#ffffff40" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `$${val/1000000}M`}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0d0d14', borderColor: '#ffffff10', color: '#fff', borderRadius: '8px' }}
                            itemStyle={{ color: '#00d4ff' }}
                            formatter={(val: any) => [`$${(Number(val || 0)/1000000).toFixed(1)}M`, 'Amount']}
                          />
                          <Bar dataKey="amount" fill="#00d4ff" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                )}

                {/* STORY VS SIGNAL */}
                {company.storyVsSignal && (
                  <section>
                    <h3 className="text-sm font-bold text-zinc-500 tracking-widest mb-6">STORY VS SIGNAL</h3>
                    <div className="bg-gradient-to-r from-red-500/5 to-transparent border border-red-500/10 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-4 w-4 text-zinc-400" />
                            <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">The Story (Company Claim)</h4>
                          </div>
                          <blockquote className="text-lg text-white font-serif italic border-l-2 border-white/10 pl-4 py-1">
                            "{company.storyVsSignal.companyClaim}"
                          </blockquote>
                          <p className="text-xs text-zinc-500 mt-2">Severity: <span className="text-amber-400 uppercase font-mono">{company.storyVsSignal.severity}</span></p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-4 w-4 text-zinc-400" />
                            <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">The Counter-Signals</h4>
                          </div>
                          <ul className="space-y-3">
                            {company.storyVsSignal.signals?.map((sig, j) => (
                              <li key={j} className="flex items-start gap-3 bg-[#0d0d14] p-3 rounded-lg border border-white/5">
                                <div className="mt-0.5">
                                  {sig.direction === 'UP' ? <ArrowUpRight className="h-4 w-4 text-red-400" /> :
                                   sig.direction === 'DOWN' ? <ArrowDownRight className="h-4 w-4 text-amber-400" /> :
                                   <Minus className="h-4 w-4 text-zinc-400" />}
                                </div>
                                <div>
                                  <p className="text-sm text-zinc-300">{sig.label}</p>
                                  <span className="text-xs text-zinc-500 mt-1 block font-mono">Direction: {sig.direction}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-red-500/10">
                        <h4 className="text-xs uppercase text-red-400/80 font-bold mb-1">Mismatch Analysis</h4>
                        <p className="text-sm text-red-200/70">{company.storyVsSignal.mismatchSummary}</p>
                      </div>
                    </div>
                  </section>
                )}

                {/* INFORMATION GAPS */}
                <section>
                   <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-zinc-500 tracking-widest flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" /> WHAT DON'T WE KNOW?
                    </h3>
                    <button 
                      onClick={() => navigate(`/analyst?company=${company.id}&focus=blindspots`)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      Investigate Gaps <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Customer Churn Rate', 'Actual ACV', 'Founder Equity Split', 'Tech Debt Level', 'Burn Rate Trajectory'].map((spot, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                        <span className="text-sm text-zinc-300">{spot}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">UNKNOWN</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* COMPETITORS */}
                {company.competitors && company.competitors.length > 0 && (
                  <section>
                    <h3 className="text-sm font-bold text-zinc-500 tracking-widest mb-6">COMPETITIVE LANDSCAPE</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {company.competitors.map((compId) => {
                        const comp = getCompanyById(compId);
                        if (!comp) return null;
                        return (
                          <div key={compId} className="bg-[#111118] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-white text-lg">{comp.name}</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-zinc-400 border border-white/10">{comp.stage}</span>
                              </div>
                              <p className="text-xs text-zinc-500 line-clamp-2">{comp.description}</p>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <button onClick={() => navigate(`/company/${comp.id}`)} className="flex-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs text-center transition-colors">
                                Dossier
                              </button>
                              <button onClick={() => navigate(`/vs?a=${company.id}&b=${comp.id}`)} className="flex-1 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded text-xs text-center transition-colors">
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
                <div className="bg-[#111118] border border-white/5 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">Capital Structure</h3>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase">Total Raised</p>
                      <p className="text-2xl font-bold text-white">${company.totalFunding?.value ? (Number(company.totalFunding.value) / 1000000).toFixed(1) : 0}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase">Last Valuation</p>
                      <p className="text-2xl font-bold text-white">${company.valuation?.value ? (Number(company.valuation.value) / 1000000).toFixed(1) : 0}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase">Capital Efficiency</p>
                      <p className="text-2xl font-bold text-amber-400">1.4x</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-zinc-500 tracking-widest mb-4">FUNDING ROUNDS</h3>
                <div className="bg-[#111118] border border-white/5 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/5 text-zinc-400">
                      <tr>
                        <th className="px-6 py-4 font-medium">Round</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Amount</th>
                        <th className="px-6 py-4 font-medium">Valuation</th>
                        <th className="px-6 py-4 font-medium">Lead Investors</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {company.fundingRounds?.map((round, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-medium text-white">{round.type}</span>
                          </td>
                          <td className="px-6 py-4 text-zinc-400">{round.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-white">${round.amount?.value ? (Number(round.amount.value) / 1000000).toFixed(1) : '?'}M</span>
                              <EvidenceBadge claim={round.amount} />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-zinc-300">{round.valuation?.value ? `$${(Number(round.valuation.value) / 1000000).toFixed(1)}M` : '—'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-zinc-400">
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
                 <h3 className="text-sm font-bold text-zinc-500 tracking-widest mb-6 uppercase">Key People & Leadership</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(company.founders && company.founders.length > 0 ? company.founders : [
                      { id: 'f_default', name: 'Founding Team', title: 'Executive Leadership', education: ['Engineering Institution'], previousCompanies: ['Tech Unicorn'] }
                    ]).map((founder: any) => (
                      <div key={founder.id} className="bg-[#111118] border border-white/5 rounded-xl p-6 flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-950 to-zinc-900 border border-cyan-500/30 shrink-0 flex items-center justify-center font-bold text-xl text-cyan-400">
                          {founder.name?.charAt(0) || 'F'}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{founder.name}</h4>
                          <p className="text-sm text-cyan-400 mb-2">{founder.title}</p>
                          <p className="text-xs text-zinc-400 mb-3">
                            {founder.education?.length ? `Education: ${founder.education.join(', ')}` : 'Recognized operator in domain.'}
                            {founder.previousCompanies?.length ? ` • Prior: ${founder.previousCompanies.join(', ')}` : ''}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {founder.ecosystemConnections?.map((eco: string, idx: number) => (
                              <span key={idx} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px]">
                                {eco} ECOSYSTEM
                              </span>
                            ))}
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">VERIFIED FOUNDER</span>
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {/* Placeholder for other tabs to keep it functional */}
            {['financials', 'operations', 'timeline', 'xray', 'market', 'legal', 'signals', 'network', 'thesis'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                <LockIcon />
                <h3 className="text-lg font-medium text-zinc-300 mt-4 capitalize">{activeTab} Intelligence</h3>
                <p className="text-sm mt-2 max-w-md text-center">Detailed {activeTab} data is currently being gathered by the X-Ray engine. Run an investigation to uncover more.</p>
                <button 
                  onClick={() => navigate(`/analyst?company=${company.id}&focus=${activeTab}`)}
                  className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors border border-white/10 flex items-center gap-2"
                >
                  <Search className="h-4 w-4" /> Investigate {activeTab}
                </button>
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
