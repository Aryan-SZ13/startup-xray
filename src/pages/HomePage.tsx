import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, ArrowRight, Eye, ShieldCheck, ChevronRight, 
  ArrowUpRight, Play, Sparkles
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { 
  companies, opportunities, getContextualRecommendations 
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

  // Dynamic recommendations
  const activeRecommendations = getContextualRecommendations({
    investigatedCompanies,
    linkedInConnected,
    activeEcosystem: currentEcosystem,
    allCompanies: companies
  });

  const searchSuggestions = [
    { label: "Postman", meta: "SRM Alumni // $5.6B Val" },
    { label: "Ather Energy", meta: "IIT Madras // $500M IPO" },
    { label: "Sarvam AI", meta: "Indic Foundation // 2B LLM" },
    { label: "Torus Robotics", meta: "Defense UGVs // Ladakh Order" },
    { label: "Agnikul Cosmos", meta: "SpaceTech // Cryogenic" },
    { label: "Swiggy", meta: "Pre-IPO // SEBI DRHP" }
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
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-[#2997ff]/30 selection:text-white pt-12">
      
      {/* 1. Market Ticker Strip */}
      <MarketTicker />

      {/* 2. Apple-grade Immersive Hero + Command Viewport */}
      <section className="relative px-4 lg:px-8 pt-8 pb-14 border-b border-white/[0.06] overflow-hidden">
        
        {/* Soft Ambient Radial Lights (Apple Glow) */}
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(41,151,255,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(94,92,230,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1720px] mx-auto">
          
          {/* Main 3-Column Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: Headline + Search + Quick Actions (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              
              {/* Apple-esque Headline */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-[#86868b] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
                  <span>Venture Intelligence OS</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
                  See the company <br />
                  <span className="apple-gradient-text">
                    behind the story.
                  </span>
                </h1>

                <p className="text-sm text-[#86868b] mt-3 leading-relaxed max-w-md">
                  Multi-sector venture intelligence across AI Foundation, SpaceTech, CleanTech EVs, Defense Robotics, and Enterprise DevTools.
                </p>
              </div>

              {/* Minimal Search Surface */}
              <div className="relative">
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <div className="relative flex items-center bg-white/[0.04] hover:bg-white/[0.06] focus-within:bg-white/[0.08] border border-white/[0.08] focus-within:border-white/[0.2] rounded-2xl py-3 px-4 shadow-lg backdrop-blur-2xl transition-all">
                    <Search className="w-4 h-4 text-[#86868b] mr-3 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                      placeholder="Search company, founder, or question..."
                      className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-[#6e6e73] font-normal"
                    />
                    <kbd className="hidden sm:inline-flex h-5 items-center px-1.5 rounded bg-white/[0.06] border border-white/[0.08] font-mono text-[10px] text-[#86868b]">
                      ⌘K
                    </kbd>
                  </div>
                </form>

                {/* Suggestions Dropdown */}
                {searchFocused && (
                  <motion.div 
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-2 z-50 shadow-2xl space-y-0.5"
                  >
                    <div className="px-3 py-1.5 text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">
                      Featured Entity Suggestions
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
                        className="w-full text-left px-3 py-2 rounded-xl text-[#d2d2d7] hover:text-white hover:bg-white/[0.08] transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="text-xs font-medium">{item.label}</span>
                        <span className="text-[10px] text-[#86868b] group-hover:text-[#2997ff]">
                          {item.meta}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Minimal Action Cards with Direct Runners */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Run X-Ray Diligence", desc: "Audit core claims", path: "/xray/c_postman", color: "text-[#2997ff]" },
                  { label: "Simulate Scenario", desc: "Run war-game stress test", path: "/scenario", color: "text-[#30d158]" },
                  { label: "Compare VS", desc: "Ather vs Swiggy", path: "/vs", color: "text-[#ff9f0a]" },
                  { label: "AI Analyst Lab", desc: "Autonomous deep-dive", path: "/analyst", color: "text-[#bf5af2]" }
                ].map((act, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(act.path)}
                    className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.14] text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium text-white/95 group-hover:${act.color} transition-colors`}>
                        {act.label}
                      </span>
                      <ArrowUpRight size={12} className="text-[#86868b] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[11px] text-[#86868b] block">{act.desc}</span>
                  </button>
                ))}
              </div>

              {/* Radar Status Bar */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs text-[#86868b]">
                <div className="flex items-center gap-2">
                  <Eye size={13} className="text-[#2997ff]" />
                  <span className="text-white/90">Watched: 12 Entities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#30d158]">6 Clusters</span>
                  <span>•</span>
                  <span>4 Live Signals</span>
                </div>
                <button
                  onClick={() => navigate('/radar')}
                  className="text-[#2997ff] hover:text-white transition-colors cursor-pointer font-medium"
                >
                  Radar ↗
                </button>
              </div>

            </div>

            {/* CENTER: 3D Immersive Graph Universe (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <CompanyUniverseGraph />
            </div>

            {/* RIGHT: Continuous Live Intelligence Feed (3 cols) */}
            <div className="lg:col-span-3 w-full">
              <LiveIntelligenceFeed />
            </div>

          </div>
        </div>
      </section>

      {/* 3. YOUR RADAR // CONTEXTUAL INTELLIGENCE */}
      <section className="py-14 px-4 lg:px-8 border-b border-white/[0.06] bg-[#070709]">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-medium text-[#2997ff] uppercase tracking-wider block mb-0.5">
                Personalized
              </span>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Your Radar
              </h2>
            </div>
            <button 
              onClick={() => navigate('/radar')}
              className="text-xs font-medium text-[#2997ff] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View all recommendations</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeRecommendations.slice(0, 3).map((rec) => (
              <div 
                key={rec.companyId}
                onClick={() => navigate(`/company/${rec.companyId}`)}
                className="p-5 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.14] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold text-white group-hover:text-[#2997ff] transition-colors">
                      {rec.companyName || rec.companyId}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#86868b]">
                      {rec.type}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold mb-2">
                    Why you are seeing this
                  </p>

                  <ul className="space-y-1.5 mb-4">
                    {(rec.reasons || []).slice(0, 2).map((r: string, j: number) => (
                      <li key={j} className="text-xs text-[#d2d2d7] flex items-start gap-1.5">
                        <span className="text-[#2997ff]">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-[#86868b]">
                  <span>Affinity: {Math.round(rec.score * 100)}%</span>
                  <span className="text-[#2997ff] group-hover:text-white flex items-center gap-1 transition-colors font-medium">
                    <span>X-Ray</span>
                    <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ATTENTION DIVERGENCE ENGINE */}
      <section className="py-14 px-4 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-[1720px] mx-auto">
          <SplitAttentionMatrix />
        </div>
      </section>

      {/* 5. UNDER THE RADAR // DIVERSE HIGH SIGNAL DENSITY */}
      <section className="py-14 px-4 lg:px-8 border-b border-white/[0.06] bg-[#070709]">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <span className="text-[11px] font-medium text-[#30d158] uppercase tracking-wider block mb-0.5">
                Discovery Screener
              </span>
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Under the Radar
              </h2>
              <p className="text-xs text-[#86868b] mt-0.5">
                Low public visibility paired with high observable signal velocity
              </p>
            </div>
            <div className="text-xs text-[#86868b] px-3 py-1 rounded-full bg-white/[0.04] self-start sm:self-center">
              Visibility &lt; 30% • Signal Velocity &gt; 85%
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.filter(c => ['c_torus', 'c_sarvam'].includes(c.id)).map((comp) => (
              <div 
                key={comp.id}
                className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.14] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white group-hover:text-[#30d158] transition-colors">
                        {comp.name}
                      </h4>
                      <p className="text-xs text-[#86868b] mt-0.5">{comp.tagline}</p>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#30d158]/10 text-[#30d158] font-medium">
                      High Signal
                    </span>
                  </div>

                  {/* Why Now */}
                  {comp.whyNow && (
                    <div className="my-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-xs space-y-1.5">
                      <span className="text-[10px] font-medium text-[#30d158] uppercase tracking-wider block mb-1">
                        Catalyst ({comp.whyNow.catalystTimestamp})
                      </span>
                      <p><span className="text-[#86868b]">Before:</span> <span className="text-[#d2d2d7]">{comp.whyNow.before}</span></p>
                      <p><span className="text-white">What Changed:</span> <span className="text-[#f5f5f7] font-medium">{comp.whyNow.whatChanged}</span></p>
                      <p><span className="text-[#86868b]">Why It Matters:</span> <span className="text-[#d2d2d7]">{comp.whyNow.whyItMatters}</span></p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                  <button
                    onClick={() => navigate(`/company/${comp.id}`)}
                    className="flex-1 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-xs font-medium text-white transition-colors cursor-pointer text-center"
                  >
                    Open Dossier
                  </button>
                  <button
                    onClick={() => navigate(`/xray/${comp.id}`)}
                    className="flex-1 py-2 rounded-full bg-white text-black hover:bg-white/90 text-xs font-semibold transition-colors cursor-pointer text-center shadow-sm"
                  >
                    Run X-Ray
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ECOSYSTEM RADAR */}
      <section className="py-14 px-4 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-[1720px] mx-auto">
          <EcosystemRadarSection />
        </div>
      </section>

      {/* 7. CAUSAL DOMINO MAP */}
      <section className="py-14 px-4 lg:px-8 border-b border-white/[0.06] bg-[#070709]">
        <div className="max-w-[1720px] mx-auto">
          <CausalDominoCascade />
        </div>
      </section>

      {/* 8. OPPORTUNITY RADAR */}
      <section className="py-14 px-4 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-medium text-[#2997ff] uppercase tracking-wider block mb-0.5">
                Market Inflections
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                Opportunities Before They Are Obvious
              </h3>
            </div>
            <button
              onClick={() => navigate('/discover')}
              className="text-xs font-medium text-[#2997ff] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explore all</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.14] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[#86868b] font-medium">
                      {opp.sector}
                    </span>
                    <span className="text-[10px] text-[#30d158] font-medium">
                      High Signal
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white mb-2 group-hover:text-[#2997ff] transition-colors">
                    {opp.title}
                  </h4>

                  <p className="text-xs text-[#86868b] leading-relaxed mb-4">
                    {opp.description}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/analyst?q=${encodeURIComponent(opp.title)}`)}
                  className="w-full py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Investigate</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NETWORK X-RAY */}
      <section className="py-14 px-4 lg:px-8 border-b border-white/[0.06] bg-[#070709]">
        <div className="max-w-[1720px] mx-auto">
          <div className="p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <span className="text-[11px] font-medium text-[#2997ff] uppercase tracking-wider block mb-1">
                Warm Pathways
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">
                Find Your Pathway Into Any Entity
              </h3>
              <p className="text-xs text-[#86868b] leading-relaxed mb-6">
                Map SRM alumni networks (Postman, Torus Robotics), IIT Madras incubations (Ather, Agnikul), and investor syndicates.
              </p>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] flex flex-wrap items-center gap-2.5 text-xs text-[#86868b] mb-6">
                <span className="px-2 py-0.5 rounded-full bg-white text-black font-semibold text-[10px]">You</span>
                <span>→</span>
                <span>SRM Alumni Network</span>
                <span>→</span>
                <span className="text-white font-medium">Postman Engineering / Torus Robotics</span>
                <span>→</span>
                <span className="text-[#2997ff]">Leadership</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/network')}
                  className="px-5 py-2 rounded-full bg-white text-black hover:bg-white/90 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Map Network</span>
                  <ArrowRight size={12} />
                </button>
                <button
                  onClick={() => {
                    setLinkedInConnected(true);
                    navigate('/network');
                  }}
                  className="px-5 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] text-white text-xs font-medium border border-white/[0.08] transition-all cursor-pointer"
                >
                  Import Demo Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Minimal Evidence Ledger */}
      <section className="py-14 px-4 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-[1720px] mx-auto">
          <div className="mb-6">
            <span className="text-[11px] font-medium text-[#86868b] uppercase tracking-wider block mb-0.5">
              Integrity
            </span>
            <h3 className="text-xl font-semibold text-white tracking-tight">
              Evidence & Provenance Ledger
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { status: 'Verified', count: '14,280', desc: 'Direct regulatory filings' },
              { status: 'Reported', count: '8,410', desc: 'Credible financial media' },
              { status: 'Estimated', count: '3,290', desc: 'Institutional markups' },
              { status: 'Inferred', count: '2,140', desc: 'Network calculations' },
              { status: 'Conflicted', count: '412', desc: 'Contradictory records' },
              { status: 'Unknown', count: '1,890', desc: 'Blind spots flagged' }
            ].map((ledger, lIdx) => (
              <div key={lIdx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between">
                <span className="text-[10px] font-medium text-[#86868b] uppercase tracking-wider">{ledger.status}</span>
                <span className="text-xl font-semibold text-white my-2">{ledger.count}</span>
                <p className="text-[10px] text-[#86868b] leading-snug">{ledger.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-4 text-center text-xs text-[#6e6e73]">
        <p>Startup X-Ray • Venture Intelligence Operating System</p>
      </footer>

    </div>
  );
}
