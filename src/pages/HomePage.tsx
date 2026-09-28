import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, TrendingUp, TrendingDown, Minus, ArrowRight, Zap, 
  Eye, Radio, Target, Network, Globe, ChevronRight, 
  ExternalLink, ShieldAlert, Briefcase, Activity, ShieldCheck,
  Compass, Terminal, ArrowUpRight
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { 
  companies, marketSectors, intelligenceEvents, 
  opportunities, recommendations, earlySignals,
  getContextualRecommendations 
} from '../data';
import { CompanyUniverseGraph } from '../components/CompanyUniverseGraph';
import { LiveIntelligenceFeed } from '../components/LiveIntelligenceFeed';
import { MarketTicker } from '../components/MarketTicker';
import { SplitAttentionMatrix } from '../components/SplitAttentionMatrix';
import { CausalDominoCascade } from '../components/CausalDominoCascade';
import { EcosystemRadarSection } from '../components/EcosystemRadarSection';

export default function HomePage() {
  const navigate = useNavigate();
  const context = useAppState();
  const linkedInConnected = context?.linkedInConnected || false;
  const setLinkedInConnected = context?.setLinkedInConnected || (() => {});
  const investigatedCompanies = context?.investigatedCompanies || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentEcosystem, setCurrentEcosystem] = useState('SRM');

  // Dynamic contextual recommendations based on user research history, ecosystem, and network
  const activeRecommendations = getContextualRecommendations({
    investigatedCompanies,
    linkedInConnected,
    activeEcosystem: currentEcosystem,
    allCompanies: companies
  });

  const searchSuggestions = [
    { label: "Swiggy", type: "COMPANY", meta: "Pre-IPO // Consumer Tech" },
    { label: "Agnikul Cosmos", type: "DEEPTECH", meta: "3D Cryogenic // SpaceTech" },
    { label: "Zepto", type: "GROWTH", meta: "$450M Mezzanine // 700 Dark Stores" },
    { label: "Find Indian robotics startups under $20M funding", type: "QUERY", meta: "Autonomous Systems Filter" },
    { label: "Where are the opportunities in AI infrastructure?", type: "THESIS", meta: "Compute & Inference Analysis" }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const exactMatch = (companies as any[] || []).find(
      (c) => c.name?.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (exactMatch) {
      navigate(`/company/${exactMatch.id}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-zinc-300 font-sans selection:bg-cyan-500/30 selection:text-white pt-14">
      
      {/* 1. TOP SUBTLE TICKER STRIP */}
      <MarketTicker />

      {/* 2. LIVE VC COMMAND CENTER — ABOVE THE FOLD */}
      <section className="relative px-4 lg:px-8 pt-6 pb-12 border-b border-white/10 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-indigo-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-[1720px] mx-auto">
          
          {/* Status HUD Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                LIVE VC INTELLIGENCE OPERATING SYSTEM
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-400 hidden sm:inline">RADAR ACTIVE // DISPATCH UPDATED 12 SEC AGO</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>DATA INTEGRITY: 99.4% VERIFIED</span>
              </span>
              <span className="hidden md:inline text-zinc-600">|</span>
              <span className="hidden md:inline text-zinc-500 font-mono">Ecosystem: {currentEcosystem}</span>
            </div>
          </div>

          {/* MAIN 3-COLUMN VIEWPORT LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Compact Asymmetric Hero + Search Surface + Quick Launchers (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              
              {/* Asymmetric Compact Headline */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300 mb-3 tracking-wider">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>VENTURE SURVEILLANCE & ATTRIBUTION</span>
                </div>

                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.08] uppercase">
                  SEE THE COMPANY <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                    BEHIND THE STORY.
                  </span>
                </h1>

                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  Surpass corporate PR. Inspect audited cap tables, track quiet executive raiding, analyze why-now inflection catalysts, and stress-test core venture hypotheses.
                </p>
              </div>

              {/* Control Surface: Command Search */}
              <div className="relative">
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="relative flex items-center bg-[#0d0e17] border border-cyan-500/30 rounded-xl py-3 px-4 shadow-xl transition-all focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                    <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                      placeholder="Search company, founder, investor, market or ask anything..."
                      className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-600 font-medium"
                    />
                    <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                      ⌘K
                    </kbd>
                  </div>
                </form>

                {/* Suggestions Dropdown */}
                {searchFocused && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#0c0d16]/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-2 z-50 shadow-2xl space-y-1"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/5">
                      DIRECT INTELLIGENCE SUGGESTIONS
                    </div>
                    {searchSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(item.label);
                          setTimeout(() => {
                            const evt = { preventDefault: () => {} } as React.FormEvent;
                            handleSearchSubmit(evt);
                          }, 0);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-cyan-500/10 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-cyan-400 opacity-60" />
                          <span className="text-xs font-semibold">{item.label}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 group-hover:text-cyan-400">
                          {item.meta}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Immediate Quick Actions */}
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2.5">
                  OPERATIONAL LAUNCHERS
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate('/xray/c_swiggy')}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300">X-RAY A COMPANY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 block">Audit core claims & signals</span>
                  </button>

                  <button
                    onClick={() => navigate('/discover')}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-300">FIND OPPORTUNITY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 block">Pre-consensus tailwinds</span>
                  </button>

                  <button
                    onClick={() => navigate('/network')}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-sky-500/40 hover:bg-sky-500/10 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white group-hover:text-sky-300">MY CONNECTIONS</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 block">Trace warm referral paths</span>
                  </button>

                  <button
                    onClick={() => navigate('/thesis')}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white group-hover:text-purple-300">SCAN MY THESIS</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 block">Match genome against universe</span>
                  </button>
                </div>
              </div>

              {/* Personal Watch Count Desk */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#0c0d16] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span className="text-zinc-300">WATCHED: 12 CO</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-500">
                  <span className="text-emerald-400">4 MATCHES</span>
                  <span>•</span>
                  <span className="text-cyan-400">3 SIGNALS</span>
                </div>
                <button
                  onClick={() => navigate('/radar')}
                  className="text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>RADAR</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

            </div>

            {/* CENTER COLUMN: Large Interactive Company Universe Graph (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <CompanyUniverseGraph />
            </div>

            {/* RIGHT COLUMN: Realtime Live Intelligence Stream (3 cols) */}
            <div className="lg:col-span-3 w-full">
              <LiveIntelligenceFeed />
            </div>

          </div>
        </div>
      </section>

      {/* 3. YOUR RADAR // PERSONAL VC DESK (COMPACT & HIGH VALUE) */}
      <section className="py-12 px-4 lg:px-8 border-b border-white/10 bg-[#080910]">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-mono font-bold tracking-widest text-white uppercase">
                YOUR RADAR // PERSONAL CONTEXT MATRIX
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span>{activeRecommendations.length} ACTIVE CANDIDATES</span>
              <button 
                onClick={() => navigate('/radar')}
                className="text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>OPEN DESK</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeRecommendations.slice(0, 3).map((rec) => (
              <div 
                key={rec.companyId}
                onClick={() => navigate(`/company/${rec.companyId}`)}
                className="p-5 rounded-xl border border-white/10 bg-[#0d0e17] hover:border-cyan-500/40 hover:bg-cyan-500/[0.02] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {rec.companyName || rec.companyId}
                    </h3>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase font-bold">
                      {rec.type}
                    </span>
                  </div>

                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                    WHY YOU ARE SEEING THIS
                  </p>

                  <ul className="space-y-1.5 mb-4">
                    {(rec.reasons || []).slice(0, 2).map((r: string, j: number) => (
                      <li key={j} className="text-xs text-zinc-300 flex items-start gap-1.5">
                        <span className="text-cyan-400 font-mono text-xs">↳</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">AFFINITY SCORE: {Math.round(rec.score * 100)}%</span>
                  <span className="text-cyan-400 group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>X-RAY</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SPLIT ATTENTION ENGINE ("EVERYBODY IS WATCHING" VS "YOU MAY BE MISSING") */}
      <section className="py-16 px-4 lg:px-8 border-b border-white/10 bg-[#07080e]">
        <div className="max-w-[1720px] mx-auto">
          <SplitAttentionMatrix />
        </div>
      </section>

      {/* 5. UNDER THE RADAR // LOW VISIBILITY + HIGH SIGNAL DENSITY */}
      <section className="py-16 px-4 lg:px-8 border-b border-white/10 bg-[#090a12]">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  UNDER THE RADAR // SMALL PROFILE. BIG DISRUPTION.
                </h2>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Low Visibility + Sudden Signal Density
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SCREENER: VISIBILITY == LOW && SIGNAL_DENSITY &gt;= HIGH</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.filter(c => c.visibility === 'LOW' || c.signalDensity === 'HIGH').slice(0, 2).map((comp) => (
              <div 
                key={comp.id}
                className="p-6 rounded-2xl border border-white/10 bg-[#0d0e17] hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {comp.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {comp.sector}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">{comp.tagline}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-mono text-zinc-500 block">SIGNAL DENSITY</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">HIGH (98th %ile)</span>
                    </div>
                  </div>

                  {/* Why Now Catalyst */}
                  {comp.whyNow && (
                    <div className="my-4 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-400 mb-1">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-emerald-400" />
                          <span>WHY NOW CATALYST</span>
                        </span>
                        <span className="text-zinc-500">{comp.whyNow.catalystTimestamp}</span>
                      </div>
                      <p><span className="text-zinc-500 font-mono">BEFORE:</span> <span className="text-zinc-400">{comp.whyNow.before}</span></p>
                      <p><span className="text-cyan-400 font-mono">WHAT CHANGED:</span> <span className="text-zinc-200">{comp.whyNow.whatChanged}</span></p>
                      <p><span className="text-emerald-400 font-mono">WHY IT MATTERS:</span> <span className="text-zinc-200">{comp.whyNow.whyItMatters}</span></p>
                    </div>
                  )}

                  {/* Signal Stack */}
                  {comp.signalStack && (
                    <div className="space-y-1.5 mb-4">
                      {comp.signalStack.map((s, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5 text-xs">
                          <span className="text-zinc-300 truncate max-w-[340px]">
                            <span className="text-[9px] font-mono text-cyan-400 mr-2">[{s.category}]</span>
                            {s.headline}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500 shrink-0">{s.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <button
                    onClick={() => navigate(`/company/${comp.id}`)}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors text-center border border-white/10 cursor-pointer"
                  >
                    OPEN DOSSIER
                  </button>
                  <button
                    onClick={() => navigate(`/xray/${comp.id}`)}
                    className="flex-1 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold text-emerald-400 transition-colors text-center border border-emerald-500/30 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  >
                    RUN X-RAY DILIGENCE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ECOSYSTEM RADAR (SRM / CHENNAI / IIT MADRAS / GLOBAL) */}
      <section className="py-16 px-4 lg:px-8 border-b border-white/10 bg-[#07080e]">
        <div className="max-w-[1720px] mx-auto">
          <EcosystemRadarSection />
        </div>
      </section>

      {/* 7. CAUSAL DOMINO MAP (2ND & 3RD ORDER EFFECTS) */}
      <section className="py-16 px-4 lg:px-8 border-b border-white/10 bg-[#080911]">
        <div className="max-w-[1720px] mx-auto">
          <CausalDominoCascade />
        </div>
      </section>

      {/* 8. OPPORTUNITY RADAR // PRE-CONSENSUS TAILWINDS */}
      <section className="py-16 px-4 lg:px-8 border-b border-white/10 bg-[#07080e]">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  OPPORTUNITY RADAR // STRUCTURAL ARBITRAGE
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Opportunities Before They Are Obvious
              </h3>
            </div>

            <button
              onClick={() => navigate('/discover')}
              className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>EXPLORE ALL OPPORTUNITY CLUSTERS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-6 rounded-2xl border border-white/10 bg-[#0d0e17] hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase font-bold">
                      {opp.sector}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      SIGNAL STRENGTH: HIGH
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {opp.title}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {opp.description}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 mb-4">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                      WHY DETECTED
                    </span>
                    {(opp.whyDetected || opp.signals.map((s: any) => s.signal)).slice(0, 2).map((sig: any, sIdx: number) => (
                      <div key={sIdx} className="text-xs text-zinc-300 flex items-start gap-1.5">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{typeof sig === 'string' ? sig : sig?.signal || String(sig)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/analyst?q=${encodeURIComponent(opp.title)}`)}
                  className="w-full py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                >
                  <span>INVESTIGATE IN ANALYST LAB</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NETWORK X-RAY // WARM INTRO PATHS */}
      <section className="py-16 px-4 lg:px-8 border-b border-white/10 bg-[#0a0b12]">
        <div className="max-w-[1720px] mx-auto">
          <div className="p-8 lg:p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e0f1a] to-[#07080e] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Network className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  NETWORK X-RAY // VERIFIED REFERRAL PATHWAYS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Find Your 2nd-Degree Pathway Into Any Company
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Map SRM alumni networks, investor syndicates, and former engineering colleagues to generate direct warm intro sequences.
              </p>

              {/* Pathway chain preview */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex flex-wrap items-center gap-3 text-xs font-mono mb-6">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">YOU</span>
                <span className="text-zinc-600">→</span>
                <span className="text-zinc-300">SRM ALUMNI COUNCIL</span>
                <span className="text-zinc-600">→</span>
                <span className="text-cyan-300">EARLY SWIGGY ENG TEAM</span>
                <span className="text-zinc-600">→</span>
                <span className="text-white font-bold">SWIGGY LEADERSHIP</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/network')}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center gap-1.5"
                >
                  <span>MAP MY NETWORK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setLinkedInConnected(true);
                    navigate('/network');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  IMPORT DEMO NETWORK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. EVIDENCE & PROVENANCE LEDGER */}
      <section className="py-16 px-4 lg:px-8 border-b border-white/10 bg-[#07080e]">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  EVIDENCE & PROVENANCE LEDGER // DON'T TRUST. VERIFY.
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Every Claim Cross-Referenced Against Primary Sources
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { status: 'VERIFIED', count: '14,280', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', desc: 'Direct regulatory filings & contracts' },
              { status: 'REPORTED', count: '8,410', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10', desc: 'Credible financial journalists & press' },
              { status: 'ESTIMATED', count: '3,290', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10', desc: 'Institutional markups & metrics' },
              { status: 'INFERRED', count: '2,140', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10', desc: 'Cross-node network calculations' },
              { status: 'CONFLICTED', count: '412', color: 'text-red-400 border-red-500/30 bg-red-500/10', desc: 'Contradictory source statements' },
              { status: 'UNKNOWN', count: '1,890', color: 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10', desc: 'Flagged diligence blind spots' }
            ].map((ledger, lIdx) => (
              <div key={lIdx} className={`p-4 rounded-xl border ${ledger.color} flex flex-col justify-between`}>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">{ledger.status}</span>
                <span className="text-2xl font-mono font-bold text-white my-2">{ledger.count}</span>
                <p className="text-[10px] text-zinc-400 leading-snug">{ledger.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 text-center text-xs font-mono text-zinc-600">
        <p>STARTUP X-RAY // HIGH-CONVICTION VENTURE SURVEILLANCE & ATTRIBUTION ENGINE</p>
      </footer>

    </div>
  );
}
