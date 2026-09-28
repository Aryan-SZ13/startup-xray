import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import { 
  Search, TrendingUp, TrendingDown, Minus, ArrowRight, Zap, 
  Eye, Radio, Target, Network, Globe, ChevronRight, 
  ExternalLink, AlertTriangle, Link as LinkIcon, Map, ShieldAlert,
  Briefcase, Activity
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { 
  companies, marketSectors, intelligenceEvents, 
  opportunities, recommendations, earlySignals,
  getContextualRecommendations 
} from '../data';

// --- Helper Components ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const CountUp = ({ to, duration = 2 }: { to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [to, duration, inView]);
  return <span ref={nodeRef}>0</span>;
};

// --- Main Page Component ---

export default function HomePage() {
  const navigate = useNavigate();
  // Safe extraction of state assuming a standard context structure
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

  // Hardcoded suggestions for the cinematic effect
  const searchSuggestions = [
    "Swiggy", 
    "Find Indian robotics startups under $20M funding", 
    "Companies like Agnikul", 
    "What changed at Zepto?", 
    "Find my connections to this company", 
    "Where are the opportunities in AI infrastructure?"
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Check for exact company match
    const exactMatch = (companies as any[] || []).find(
      (c) => c.name?.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (exactMatch) {
      navigate(`/company/${exactMatch.id}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const srmCompanies = (companies as any[] || []).filter(c => 
    c.ecosystemConnections?.some((ec: any) => ec.ecosystem === currentEcosystem)
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-300 font-sans selection:bg-[#00d4ff]/30 selection:text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
        {/* Subtle grid/dot pattern with ambient glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Breaking Intel Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,212,255,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00d4ff]"></span>
            </span>
            <span className="tracking-wide">RADAR ACTIVE // REAL-TIME VC RESEARCH ENGINE</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6 uppercase">
              See the company <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300 drop-shadow-[0_0_35px_rgba(0,212,255,0.4)]">
                behind the story.
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
          >
            Deep diligence on private & public unicorns. Trace capital pipelines, follow executive departures, audit balance sheet claims, and uncover early signal shifts.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-full max-w-2xl relative"
          >
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/20 to-emerald-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl py-4 px-6 backdrop-blur-md transition-all focus-within:border-[#00d4ff]/50 focus-within:bg-white/10">
                <Search className="w-6 h-6 text-zinc-400 mr-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  placeholder="Search a company, founder, investor, market or ask a question..."
                  className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-zinc-600"
                />
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {searchFocused && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#0d0d14]/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 z-50 shadow-2xl"
              >
                {searchSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setTimeout(() => {
                        const evt = { preventDefault: () => {} } as React.FormEvent;
                        handleSearchSubmit(evt);
                      }, 0);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors flex items-center"
                  >
                    <Search className="w-4 h-4 mr-3 opacity-50" />
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. COMPANY GRAPH COVERAGE */}
      <section className="py-24 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-16">
              <Network className="w-6 h-6 text-[#00d4ff]" />
              <h2 className="text-xl font-bold tracking-widest text-white uppercase">The Intelligence Graph</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 relative">
            {/* Connecting lines for desktop */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 hidden md:block -z-10" />
            
            {[
              { label: 'Tracked Entities', value: 12400, change: '+14% MoM' },
              { label: 'Verified Founders', value: 34200, change: '+28% MoM' },
              { label: 'Active Institutional VCs', value: 8100, change: '+8% MoM' },
              { label: 'Audited Funding Events', value: 45600, change: '+21% MoM' },
              { label: 'Node-Edge Relationships', value: 128000, change: '+35% MoM' },
              { label: 'Court & Legal Actions', value: 5200, change: '+12% MoM' },
              { label: 'EBITDA / Financial Filings', value: 18900, change: '+19% MoM' },
              { label: 'Cross-Source Data Points', value: 940000, change: '+44% MoM' }
            ].map((metric, i) => (
              <FadeIn key={metric.label} delay={i * 0.04} className="flex flex-col relative group">
                <div className="p-5 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl lg:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-cyan-300 tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all">
                      <CountUp to={metric.value} />+
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                      {metric.change}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono tracking-wider uppercase">{metric.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SRM CONNECT */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#00d4ff]/5 to-transparent relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center border border-[#00d4ff]/30">
                    <Briefcase className="w-4 h-4 text-[#00d4ff]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-wide uppercase">{currentEcosystem} Connect</h2>
                </div>
                <p className="text-zinc-400 max-w-xl">
                  Companies connected to the {currentEcosystem} ecosystem through alumni, funding, or hiring patterns.
                </p>
              </div>
              <button 
                className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 w-fit"
                onClick={() => setCurrentEcosystem(prev => prev === 'SRM' ? 'IIT' : 'SRM')}
              >
                <Radio className="w-4 h-4" /> Switch Ecosystem
              </button>
            </div>
          </FadeIn>

          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 gap-6 snap-x hide-scrollbar">
            {(srmCompanies.length > 0 ? srmCompanies : [
              { id: '1', name: 'Agnikul Cosmos', tagline: 'Making space accessible', industry: 'Aerospace', ecosystemConnections: [{ label: 'SRM ALUMNI FOUNDER' }] },
              { id: '2', name: 'Zepto', tagline: '10-minute grocery delivery', industry: 'Consumer', ecosystemConnections: [{ label: 'HIRING SRM' }] },
              { id: '3', name: 'Postman', tagline: 'API platform for developers', industry: 'SaaS', ecosystemConnections: [{ label: 'SRM ALUMNI FOUNDER' }] }
            ]).map((company: any, i: number) => (
              <FadeIn key={company.id} delay={i * 0.1} className="min-w-[320px] max-w-[320px] snap-start">
                <div 
                  onClick={() => navigate(`/company/${company.id}`)}
                  className="h-full p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#00d4ff]/30 hover:bg-white/10 transition-all cursor-pointer group flex flex-col relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#00d4ff]/20 transition-all" />
                  
                  <div className="mb-6 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00d4ff] transition-colors">{company.name}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-3">{company.tagline}</p>
                    <span className="text-xs px-2 py-1 bg-zinc-800/50 rounded text-zinc-300">{company.industry}</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00d4ff] bg-[#00d4ff]/10 px-3 py-2 rounded-lg w-fit">
                      <LinkIcon className="w-3 h-3" />
                      {company.ecosystemConnections?.[0]?.label || `${currentEcosystem} CONNECTION`}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. YOUR NETWORK X-RAY */}
      <section className="py-24 px-6 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <Globe className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-bold tracking-widest text-white uppercase">Your Network X-Ray</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>
          </FadeIn>

          {!linkedInConnected ? (
            <FadeIn>
              <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden flex flex-col items-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_60%)] pointer-events-none" />
                <Network className="w-12 h-12 text-emerald-500 mb-6 opacity-80" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Unlock your professional network intelligence</h3>
                <p className="text-zinc-400 max-w-xl mx-auto mb-10">
                  Connect your network to see warm intro paths, alumni connections, and hidden relationships with companies you research.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-2">
                    <Network className="w-5 h-5" /> Connect LinkedIn
                  </button>
                  <button 
                    onClick={() => setLinkedInConnected(true)}
                    className="px-8 py-3 rounded-xl bg-white/5 text-white border border-white/10 font-bold hover:bg-white/10 transition-colors"
                  >
                    Import Demo Network
                  </button>
                </div>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Direct Connections", value: "4", icon: <Network className="w-5 h-5 text-emerald-400" /> },
                { title: "Alumni Paths", value: "12", icon: <Briefcase className="w-5 h-5 text-emerald-400" /> },
                { title: "Warm Intros", value: "3", icon: <Zap className="w-5 h-5 text-emerald-400" /> }
              ].map((stat, i) => (
                <FadeIn key={stat.title} delay={i * 0.1}>
                  <div className="bg-white/5 border border-emerald-500/20 p-8 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors" onClick={() => navigate('/network')}>
                    <div>
                      <p className="text-sm text-zinc-400 mb-2 uppercase tracking-wider">{stat.title}</p>
                      <p className="text-4xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. MARKET PULSE */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
                  <ActivityPulse /> Market Pulse
                </h2>
                <p className="text-zinc-500 mt-2">Sector momentum signals based on real-time activity</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(marketSectors as any[] || [
              { name: 'AI & Foundation Models', trend: 'up', signalStrength: 'high', change: '+38%' },
              { name: 'Robotics & Embodied AI', trend: 'up', signalStrength: 'high', change: '+24%' },
              { name: 'Fintech & Lending Infrastructure', trend: 'down', signalStrength: 'medium', change: '-5%' },
              { name: 'Enterprise SaaS Copilots', trend: 'stable', signalStrength: 'low', change: '+2%' },
              { name: 'Commercial SpaceTech', trend: 'up', signalStrength: 'high', change: '+52%' },
              { name: 'Climate & Grid Scale Energy', trend: 'up', signalStrength: 'medium', change: '+18%' },
              { name: 'Biotech & Genomics', trend: 'stable', signalStrength: 'low', change: '+4%' },
              { name: 'Defense & Autonomous Systems', trend: 'up', signalStrength: 'high', change: '+41%' },
              { name: 'Advanced Semiconductors', trend: 'up', signalStrength: 'high', change: '+33%' },
              { name: 'Quick Commerce & D2C', trend: 'up', signalStrength: 'high', change: '+29%' }
            ]).map((sector, i) => (
              <FadeIn key={sector.name} delay={i * 0.04}>
                <div 
                  onClick={() => navigate(`/discover?sector=${sector.name.toLowerCase()}`)}
                  className="p-4 rounded-xl border border-white/5 bg-gradient-to-b from-[#111118] to-[#0a0a0f] hover:border-cyan-500/40 hover:bg-cyan-500/[0.03] hover:shadow-[0_0_20px_rgba(0,212,255,0.06)] transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors block">{sector.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{sector.change || '+12%'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {sector.trend === 'up' && (
                      <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {sector.trend === 'down' && (
                      <span className="p-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                        <TrendingDown className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {sector.trend === 'stable' && (
                      <span className="p-1 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">
                        <Minus className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTELLIGENCE EVENTS & 7. OPPORTUNITY RADAR */}
      <section className="py-24 px-6 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Intelligence Events */}
          <div>
            <FadeIn>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]" />
                    <span className="absolute w-5 h-5 bg-red-500/30 rounded-full animate-ping" />
                  </div>
                  BREAKING INTELLIGENCE DISPATCH
                </h2>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
                  UPDATED LIVE
                </span>
              </div>
            </FadeIn>
            <div className="space-y-4">
              {(intelligenceEvents as any[] || []).map((event, i) => (
                <FadeIn key={event.id} delay={i * 0.08}>
                  <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-[#12121c] to-[#0a0a0f] hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)] transition-all group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                          {event.timeAgo || event.date}
                        </span>
                        {i === 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 uppercase tracking-widest animate-pulse">
                            JUST IN
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                        event.impactLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 
                        event.impactLevel === 'MEDIUM' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                        'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>
                        {event.impactLevel} IMPACT
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                      {event.headline}
                    </h3>

                    {event.impact && (
                      <p className="text-xs text-zinc-400 mb-4 leading-relaxed line-clamp-2">
                        {event.impact}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-1">Entities:</span>
                      {(event.affectedCompanies || []).map((c: string) => (
                        <span 
                          key={c} 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/company/${c.toLowerCase()}`);
                          }}
                          className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-zinc-300 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 cursor-pointer transition-all"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-zinc-500 flex items-center gap-1.5 font-mono">
                        <Radio className="w-3.5 h-3.5 text-cyan-400/70" /> {event.source}
                      </span>
                      {event.hasDominoMap && (
                        <button 
                          onClick={() => navigate('/domino')}
                          className="text-xs font-bold text-cyan-400 hover:text-white transition-colors flex items-center gap-1 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-lg shadow-[0_0_12px_rgba(0,212,255,0.15)] cursor-pointer"
                        >
                          VIEW DOMINO MAP <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Opportunity Radar */}
          <div>
            <FadeIn>
              <h2 className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-3 mb-10">
                <Target className="w-5 h-5 text-[#00d4ff]" /> Opportunities Before They're Obvious
              </h2>
            </FadeIn>
            <div className="space-y-6">
              {(opportunities as any[] || [
                { id: '1', title: "AI × Industrial Maintenance", whyDetected: ["Surge in manufacturing job postings requiring AI skills", "3 legacy players showing declining R&D spend", "Recent seed rounds in adjacent predictive maintenance tech"] },
                { id: '2', title: "Space-grade Edge Computing", whyDetected: ["Satellite launch costs down 40% year-over-year", "Increase in earth-observation data generation", "Bottleneck in downlink bandwidth forcing on-orbit processing"] }
              ]).map((opp, i) => (
                <FadeIn key={opp.id} delay={i * 0.1}>
                  <div className="p-6 rounded-xl border border-[#00d4ff]/20 bg-gradient-to-br from-[#00d4ff]/5 to-transparent relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/10 rounded-full blur-3xl group-hover:bg-[#00d4ff]/20 transition-colors" />
                    
                    <h3 className="text-xl font-bold text-white mb-4 relative z-10">{opp.title}</h3>
                    
                    <div className="mb-6 relative z-10">
                      <p className="text-xs font-bold text-[#00d4ff] uppercase tracking-wider mb-3">Why Detected</p>
                      <ul className="space-y-2">
                        {(opp.whyDetected || opp.signals?.map((s: any) => s.signal) || [opp.description]).map((reason: string, j: number) => (
                          <li key={j} className="text-sm text-zinc-400 flex items-start gap-2">
                            <span className="text-[#00d4ff] mt-1">•</span> {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => navigate(`/analyst?q=${encodeURIComponent(opp.title)}`)}
                      className="w-full py-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-sm font-bold text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-2 relative z-10 shadow-[0_0_15px_rgba(0,212,255,0.1)] cursor-pointer"
                    >
                      Investigate Opportunity <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. YOUR RADAR */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <Eye className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-bold tracking-widest text-white uppercase">Your Radar</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>
          </FadeIn>

          {investigatedCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeRecommendations.slice(0, 3).map((rec, i) => (
                <FadeIn key={rec.companyId} delay={i * 0.1}>
                  <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white">{rec.companyName || rec.companyId}</h3>
                      <span className="text-[10px] font-bold px-2 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded uppercase">{rec.type}</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Why you are seeing this</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {(rec.reasons || []).map((r: string, j: number) => (
                        <li key={j} className="text-sm text-zinc-400 flex items-start gap-2">
                          <span className="text-indigo-400 mt-1">↳</span> {r}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => navigate(`/company/${rec.companyId}`)}
                      className="text-sm font-bold text-indigo-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      View Company <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="p-12 rounded-xl border border-white/10 bg-white/5 text-center flex flex-col items-center">
                <Radio className="w-10 h-10 text-zinc-600 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Radar is empty</h3>
                <p className="text-zinc-400 mb-6">Start investigating companies to receive personalized signal recommendations.</p>
                <button 
                  onClick={() => setSearchFocused(true)}
                  className="px-6 py-2 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                >
                  Try searching for a company
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* 9. UNDER THE RADAR */}
      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-[#0a0a0f] via-[#0e0d16] to-[#0a0a0f] relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <Radio className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-wide uppercase">Under The Radar</h2>
                </div>
                <p className="text-zinc-400 max-w-xl">
                  Companies you may not know — low public visibility combined with sudden observable signal density.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FILTER: LOW VISIBILITY + HIGH SIGNAL DENSITY</span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companies.filter(c => c.visibility === 'LOW' || c.signalDensity === 'HIGH').slice(0, 2).map((comp, idx) => (
              <FadeIn key={comp.id} delay={idx * 0.1}>
                <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#12111a] to-[#0a0a0f] hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(0,212,255,0.08)] transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{comp.name}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                            RESEARCH CANDIDATE
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400">{comp.tagline}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono block text-zinc-500">VISIBILITY</span>
                        <span className="text-xs font-mono font-bold text-amber-400">{comp.visibility || 'LOW'}</span>
                      </div>
                    </div>

                    {/* WHY NOW MODULE */}
                    {comp.whyNow && (
                      <div className="my-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-cyan-400" /> WHY NOW?
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">{comp.whyNow.catalystTimestamp}</span>
                        </div>
                        <div className="space-y-1.5 text-xs text-zinc-300">
                          <p><span className="text-zinc-500 font-mono">BEFORE:</span> {comp.whyNow.before}</p>
                          <p><span className="text-cyan-400/90 font-mono">WHAT CHANGED:</span> {comp.whyNow.whatChanged}</p>
                          <p><span className="text-emerald-400/90 font-mono">WHY IT MATTERS:</span> {comp.whyNow.whyItMatters}</p>
                        </div>
                      </div>
                    )}

                    {/* SIGNAL STACK */}
                    {comp.signalStack && comp.signalStack.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">SIGNAL STACK</span>
                        {comp.signalStack.map((sig, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase">
                                {sig.category}
                              </span>
                              <span className="text-zinc-300 truncate max-w-[280px]">{sig.headline}</span>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500">{sig.timestamp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => navigate(`/company/${comp.id}`)}
                      className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors text-center border border-white/10"
                    >
                      OPEN DOSSIER
                    </button>
                    <button 
                      onClick={() => navigate(`/xray/${comp.id}`)}
                      className="flex-1 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-bold text-cyan-400 transition-colors text-center border border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                    >
                      RUN X-RAY
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 10. QUIET MOVERS MATRIX */}
      <section className="py-24 px-6 border-t border-white/5 relative bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
                  <Activity className="w-5 h-5 text-indigo-400" /> Quiet Movers Matrix
                </h2>
                <p className="text-zinc-500 mt-2">Visibility vs Signal Density quadrant analysis</p>
              </div>
              <button 
                onClick={() => navigate('/discover')}
                className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                EXPLORE ALL UNIVERSE <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Agnikul Cosmos',
                sector: 'Commercial Space',
                status: 'QUIET → ACTIVE',
                signals: '3D Cryogenic Engine Fire • Private Spaceport Access',
                id: 'c_agnikul',
                badge: 'HIGH SIGNAL / LOW NOISE'
              },
              {
                title: 'Skyroot Aerospace',
                sector: 'Satellite Launch',
                status: 'QUIET → ACTIVE',
                signals: '4 European Rideshare Contracts • Carbon Composite Stage-3 Patent',
                id: 'c_skyroot',
                badge: 'ORBITAL MANIFEST'
              },
              {
                title: 'Zepto',
                sector: 'Quick Commerce',
                status: 'EMERGING → MASSIVE',
                signals: '$450M Pre-IPO Mezzanine • 700 Dark Store Cluster',
                id: 'c_zepto',
                badge: 'CAPITAL DENSITY'
              }
            ].map((mover, mIdx) => (
              <FadeIn key={mIdx} delay={mIdx * 0.1}>
                <div 
                  onClick={() => navigate(`/company/${mover.id}`)}
                  className="p-6 rounded-xl border border-white/5 bg-[#111118] hover:border-indigo-500/40 hover:bg-indigo-500/[0.02] transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase">
                      {mover.badge}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">{mover.status}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{mover.title}</h3>
                  <p className="text-xs text-zinc-500 mb-4">{mover.sector}</p>
                  <p className="text-xs text-zinc-300 leading-relaxed pt-3 border-t border-white/5">{mover.signals}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 11. EARLY SIGNAL RADAR */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Radar subtle bg effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-16 justify-center text-center flex-col">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-2 relative">
                <ShieldAlert className="w-6 h-6 text-amber-500 relative z-10" />
                <div className="absolute inset-0 rounded-full border border-amber-500/50 animate-ping opacity-20" />
              </div>
              <h2 className="text-2xl font-bold tracking-widest text-white uppercase">Early Signal Radar</h2>
              <p className="text-zinc-400 max-w-lg mx-auto">Anomalies and quiet developments detected across the intelligence graph before they hit the news.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(earlySignals as any[] || []).map((signal, i) => (
              <FadeIn key={signal.id} delay={i * 0.08}>
                <div 
                  onClick={() => navigate(`/analyst?q=${encodeURIComponent(signal.title)}`)}
                  className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-[#13111c] to-[#0a0a0f] hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] transition-all h-full flex flex-col relative group cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-amber-400 m-4 shadow-[0_0_8px_#f59e0b] group-hover:animate-ping" />
                  
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
                      {signal.isEarlySignal ? 'EARLY SIGNAL' : (signal.type || 'CONFIRMED')}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">{signal.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {signal.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-4">{signal.description}</p>

                  <div className="flex items-center text-xs font-mono text-amber-400/80 group-hover:text-amber-300 pt-3 border-t border-white/5 transition-colors gap-1">
                    <span>Investigate anomaly</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 12. EVIDENCE WALL */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-emerald-400" /> Evidence & Provenance Ledger
                </h2>
                <p className="text-zinc-500 mt-2">Don't tell me the story. Show me the evidence behind the story.</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { status: 'VERIFIED', count: '14,280', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', desc: 'Direct regulatory filings & contracts' },
              { status: 'REPORTED', count: '8,410', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10', desc: 'Credible financial journalists & press' },
              { status: 'ESTIMATED', count: '3,290', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10', desc: 'Institutional markups & metrics' },
              { status: 'INFERRED', count: '2,140', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10', desc: 'Cross-node network calculations' },
              { status: 'CONFLICTED', count: '412', color: 'text-red-400 border-red-500/30 bg-red-500/10', desc: 'Contradictory source statements' },
              { status: 'UNKNOWN', count: '1,890', color: 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10', desc: 'Flagged diligence blind spots' }
            ].map((ledger, lIdx) => (
              <FadeIn key={lIdx} delay={lIdx * 0.04}>
                <div className={`p-4 rounded-xl border ${ledger.color} flex flex-col justify-between h-full`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase">{ledger.status}</span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-white mb-1">{ledger.count}</span>
                  <p className="text-[10px] text-zinc-400 leading-snug">{ledger.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FOOTER SPACER */}
      <footer className="py-12 border-t border-white/5 text-center text-zinc-600 text-sm">
        <p>STARTUP X-RAY INTELLIGENCE PLATFORM // CLASSIFIED ACCESS ONLY</p>
      </footer>
    </div>
  );
}

// Custom small pulse indicator for market section
const ActivityPulse = () => (
  <div className="relative flex items-center justify-center w-4 h-4">
    <div className="absolute inset-0 bg-[#00d4ff] rounded-full opacity-40 animate-ping" />
    <div className="w-2 h-2 bg-[#00d4ff] rounded-full relative z-10" />
  </div>
);
