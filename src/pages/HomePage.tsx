import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ArrowUpRight, Eye, ChevronRight } from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { companies, opportunities, getContextualRecommendations } from '../data';
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

  const activeRecommendations = getContextualRecommendations({
    investigatedCompanies,
    linkedInConnected,
    activeEcosystem: currentEcosystem,
    allCompanies: companies
  });

  const searchSuggestions = [
    { label: 'Torus Robotics', meta: 'SRM Alumni // Defense UGV' },
    { label: 'STAGE', meta: 'SRM Alumni // Dialect OTT' },
    { label: 'Postman', meta: 'BITS Pilani // $5.6B' },
    { label: 'Ather Energy', meta: 'IIT Madras // IPO' },
    { label: 'Sarvam AI', meta: 'Indic LLM // 2B' },
    { label: 'Agnikul Cosmos', meta: 'SpaceTech // IITM' }
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
    <div className="min-h-screen bg-[#0a0e17] text-[#e8edf3] font-sans pt-9">

      {/* 1. Market Ticker */}
      <MarketTicker />

      {/* 2. Main Command Viewport */}
      <section className="px-3 lg:px-6 pt-4 pb-6 border-b border-[#1e2d3d]">
        <div className="max-w-[1800px] mx-auto">

          {/* Top Bar: Title + Search + Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-[14px] font-semibold text-[#e8edf3] tracking-tight">
                  VENTURE INTELLIGENCE TERMINAL
                </h1>
                <p className="font-mono text-[10px] text-[#4a5a6d] mt-0.5">
                  Multi-sector coverage: AI · SpaceTech · CleanTech · Defense · Enterprise DevTools
                </p>
              </div>
            </div>

            {/* Inline Status Bar */}
            <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-[#4a5a6d]">
              <div className="flex items-center gap-1.5">
                <Eye size={11} className="text-[#2196f3]" />
                <span className="text-[#8899aa]">12 WATCHED</span>
              </div>
              <span className="text-[#1e2d3d]">|</span>
              <span className="text-[#00c853]">6 CLUSTERS</span>
              <span className="text-[#1e2d3d]">|</span>
              <span>4 LIVE SIGNALS</span>
              <span className="text-[#1e2d3d]">|</span>
              <button
                onClick={() => navigate('/radar')}
                className="text-[#2196f3] hover:text-[#e8edf3] transition-colors cursor-pointer"
              >
                RADAR →
              </button>
            </div>
          </div>

          {/* Search + Action Row */}
          <div className="flex items-start gap-3 mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center bg-[#0f1823] border border-[#1e2d3d] focus-within:border-[#2a3a4d] rounded px-3 py-1.5 transition-colors">
                  <Search className="w-3.5 h-3.5 text-[#4a5a6d] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    placeholder="Search entity, founder, or signal..."
                    className="w-full bg-transparent border-none outline-none text-[#e8edf3] text-[12px] font-mono placeholder:text-[#4a5a6d]"
                  />
                  <kbd className="hidden sm:inline font-mono text-[9px] text-[#4a5a6d]">⌘K</kbd>
                </div>
              </form>

              {/* Suggestions Dropdown */}
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#141e2d] border border-[#2a3a4d] rounded z-50 shadow-lg">
                  <div className="px-3 py-1 font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider border-b border-[#1e2d3d]">
                    SUGGESTED ENTITIES
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
                      className="w-full text-left px-3 py-1.5 text-[#8899aa] hover:text-[#e8edf3] hover:bg-[#1a2636] transition-colors flex items-center justify-between cursor-pointer border-b border-[#1e2d3d] last:border-b-0"
                    >
                      <span className="font-mono text-[11px] font-medium">{item.label}</span>
                      <span className="font-mono text-[10px] text-[#4a5a6d]">{item.meta}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="hidden md:flex items-center gap-1.5">
              {[
                { label: 'X-RAY', path: '/xray/c_postman', color: 'text-[#2196f3]' },
                { label: 'SIMULATE', path: '/scenario', color: 'text-[#00c853]' },
                { label: 'COMPARE', path: '/vs', color: 'text-[#ff8c00]' },
                { label: 'ANALYST', path: '/analyst', color: 'text-[#b388ff]' }
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => navigate(act.path)}
                  className={`px-2.5 py-1 bg-[#0f1823] border border-[#1e2d3d] hover:border-[#2a3a4d] hover:bg-[#141e2d] rounded font-mono text-[10px] font-semibold ${act.color} transition-all cursor-pointer`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main 3-Column Grid: Graph + Feed + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

            {/* LEFT: Entity Map (7 cols) */}
            <div className="lg:col-span-7 w-full">
              <CompanyUniverseGraph />
            </div>

            {/* RIGHT: Live Intelligence Feed (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <LiveIntelligenceFeed />
            </div>
          </div>
        </div>
      </section>

      {/* 3. YOUR RADAR */}
      <section className="px-3 lg:px-6 py-4 border-b border-[#1e2d3d] bg-[#0a0e17]">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">YOUR RADAR</span>
              <span className="font-mono text-[10px] text-[#4a5a6d]">PERSONALIZED</span>
            </div>
            <button
              onClick={() => navigate('/radar')}
              className="font-mono text-[10px] text-[#2196f3] hover:text-[#e8edf3] flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              VIEW ALL <ChevronRight size={10} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeRecommendations.slice(0, 3).map((rec) => (
              <div
                key={rec.companyId}
                onClick={() => navigate(`/company/${rec.companyId}`)}
                className="bg-[#0f1823] border border-[#1e2d3d] rounded p-3 cursor-pointer hover:bg-[#141e2d] hover:border-[#2a3a4d] transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[13px] font-semibold text-[#e8edf3]">
                    {rec.companyName || rec.companyId}
                  </h3>
                  <span className="font-mono text-[9px] text-[#4a5a6d] uppercase">{rec.type}</span>
                </div>

                <div className="font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider mb-1.5">
                  WHY YOU SEE THIS
                </div>

                <ul className="space-y-1 mb-3">
                  {(rec.reasons || []).slice(0, 2).map((r: string, j: number) => (
                    <li key={j} className="text-[11px] text-[#6b7c93] flex items-start gap-1.5">
                      <span className="text-[#ff8c00]">▸</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-[#1e2d3d] flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#4a5a6d]">AFFINITY: {Math.round(rec.score * 100)}%</span>
                  <span className="text-[#ff8c00] flex items-center gap-0.5">
                    X-RAY <ArrowRight size={9} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ATTENTION DIVERGENCE */}
      <section className="px-3 lg:px-6 py-4 border-b border-[#1e2d3d]">
        <div className="max-w-[1800px] mx-auto">
          <SplitAttentionMatrix />
        </div>
      </section>

      {/* 5. UNDER THE RADAR */}
      <section className="px-3 lg:px-6 py-4 border-b border-[#1e2d3d] bg-[#0a0e17]">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-[11px] text-[#00c853] tracking-wider uppercase">UNDER THE RADAR</span>
              <span className="font-mono text-[10px] text-[#4a5a6d]">VIS &lt;30% · SIGNAL VEL &gt;85%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {companies.filter(c => ['c_torus', 'c_sarvam'].includes(c.id)).map((comp) => (
              <div
                key={comp.id}
                className="bg-[#0f1823] border border-[#1e2d3d] rounded overflow-hidden"
              >
                {/* Company Header */}
                <div className="px-3 py-2 border-b border-[#1e2d3d] flex items-center justify-between">
                  <div>
                    <h4 className="text-[13px] font-semibold text-[#e8edf3]">{comp.name}</h4>
                    <span className="font-mono text-[10px] text-[#4a5a6d]">{comp.tagline}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#00c853] font-semibold">HIGH SIGNAL</span>
                </div>

                {/* Why Now */}
                {comp.whyNow && (
                  <div className="px-3 py-2 bg-[#0a0e17] border-b border-[#1e2d3d] text-[11px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] text-[#00c853] uppercase tracking-wider font-semibold">
                        CATALYST {comp.whyNow.catalystTimestamp}
                      </span>
                    </div>
                    <p><span className="text-[#4a5a6d]">Before:</span> <span className="text-[#6b7c93]">{comp.whyNow.before}</span></p>
                    <p><span className="text-[#e8edf3]">Changed:</span> <span className="text-[#8899aa] font-medium">{comp.whyNow.whatChanged}</span></p>
                    <p><span className="text-[#4a5a6d]">Why:</span> <span className="text-[#6b7c93]">{comp.whyNow.whyItMatters}</span></p>
                  </div>
                )}

                {/* Actions */}
                <div className="px-3 py-2 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/company/${comp.id}`)}
                    className="flex-1 py-1.5 bg-[#141e2d] border border-[#2a3a4d] hover:bg-[#1a2636] rounded font-mono text-[10px] font-medium text-[#8899aa] hover:text-[#e8edf3] transition-colors cursor-pointer text-center"
                  >
                    DOSSIER
                  </button>
                  <button
                    onClick={() => navigate(`/xray/${comp.id}`)}
                    className="flex-1 py-1.5 bg-[#ff8c00] hover:bg-[#ffa940] rounded font-mono text-[10px] font-bold text-[#0a0e17] transition-colors cursor-pointer text-center"
                  >
                    RUN X-RAY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ECOSYSTEM RADAR */}
      <section className="px-3 lg:px-6 py-4 border-b border-[#1e2d3d]">
        <div className="max-w-[1800px] mx-auto">
          <EcosystemRadarSection />
        </div>
      </section>

      {/* 7. CAUSAL DOMINO */}
      <section className="px-3 lg:px-6 py-4 border-b border-[#1e2d3d] bg-[#0a0e17]">
        <div className="max-w-[1800px] mx-auto">
          <CausalDominoCascade />
        </div>
      </section>

      {/* 8. OPPORTUNITIES */}
      <section className="px-3 lg:px-6 py-4 border-b border-[#1e2d3d]">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">MARKET INFLECTIONS</span>
              <span className="font-mono text-[10px] text-[#4a5a6d]">OPPORTUNITIES BEFORE OBVIOUS</span>
            </div>
            <button
              onClick={() => navigate('/discover')}
              className="font-mono text-[10px] text-[#2196f3] hover:text-[#e8edf3] flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              EXPLORE <ChevronRight size={10} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-[#0f1823] border border-[#1e2d3d] rounded p-3 hover:bg-[#141e2d] hover:border-[#2a3a4d] transition-all cursor-pointer"
                onClick={() => navigate(`/analyst?q=${encodeURIComponent(opp.title)}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#4a5a6d] uppercase">{opp.sector}</span>
                  <span className="font-mono text-[10px] text-[#00c853]">HIGH SIGNAL</span>
                </div>
                <h4 className="text-[12px] font-semibold text-[#e8edf3] mb-1.5">{opp.title}</h4>
                <p className="text-[11px] text-[#6b7c93] leading-relaxed mb-3">{opp.description}</p>
                <button className="w-full py-1.5 bg-[#141e2d] border border-[#2a3a4d] hover:bg-[#1a2636] rounded font-mono text-[10px] font-medium text-[#2196f3] hover:text-[#e8edf3] flex items-center justify-center gap-1 transition-all cursor-pointer">
                  INVESTIGATE <ArrowRight size={9} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NETWORK X-RAY */}
      <section className="px-3 lg:px-6 py-4 border-b border-[#1e2d3d] bg-[#0a0e17]">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-[#0f1823] border border-[#1e2d3d] rounded overflow-hidden">
            <div className="px-3 py-2 border-b border-[#2a3a4d] flex items-center justify-between">
              <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">NETWORK PATHWAYS</span>
              <span className="font-mono text-[10px] text-[#4a5a6d]">WARM INTRO MAPPING</span>
            </div>

            <div className="p-4">
              <h3 className="text-[13px] font-semibold text-[#e8edf3] mb-1">
                Find Your Pathway Into Any Entity
              </h3>
              <p className="text-[11px] text-[#6b7c93] mb-4">
                Map SRM alumni networks (Torus Robotics, STAGE OTT), IIT Madras incubations (Ather, Agnikul), and BITS Pilani corridors (Postman, Swiggy).
              </p>

              {/* Path Visualization */}
              <div className="px-3 py-2 bg-[#0a0e17] border border-[#1e2d3d] rounded mb-4 flex items-center gap-2 font-mono text-[11px] text-[#4a5a6d] flex-wrap">
                <span className="px-1.5 py-0.5 bg-[#ff8c00] text-[#0a0e17] font-bold text-[10px] rounded">YOU (SRMIST)</span>
                <span>→</span>
                <span>AIC-SRMIST Corridor</span>
                <span>→</span>
                <span className="text-[#e8edf3] font-medium">Torus Robotics / STAGE</span>
                <span>→</span>
                <span className="text-[#ff8c00]">Founders & Leadership</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/network')}
                  className="px-4 py-1.5 bg-[#ff8c00] hover:bg-[#ffa940] rounded font-mono text-[10px] font-bold text-[#0a0e17] transition-colors cursor-pointer flex items-center gap-1"
                >
                  MAP NETWORK <ArrowRight size={10} />
                </button>
                <button
                  onClick={() => {
                    setLinkedInConnected(true);
                    navigate('/network');
                  }}
                  className="px-4 py-1.5 bg-[#141e2d] border border-[#2a3a4d] hover:bg-[#1a2636] rounded font-mono text-[10px] font-medium text-[#8899aa] hover:text-[#e8edf3] transition-colors cursor-pointer"
                >
                  IMPORT DEMO DATA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. EVIDENCE LEDGER */}
      <section className="px-3 lg:px-6 py-4 border-b border-[#1e2d3d]">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono font-semibold text-[11px] text-[#4a5a6d] tracking-wider uppercase">EVIDENCE & PROVENANCE LEDGER</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 bg-[#0f1823] border border-[#1e2d3d] rounded overflow-hidden">
            {[
              { status: 'VERIFIED', count: '14,280', desc: 'Direct regulatory filings', color: 'text-[#00c853]' },
              { status: 'REPORTED', count: '8,410', desc: 'Credible financial media', color: 'text-[#2196f3]' },
              { status: 'ESTIMATED', count: '3,290', desc: 'Institutional markups', color: 'text-[#ffd700]' },
              { status: 'INFERRED', count: '2,140', desc: 'Network calculations', color: 'text-[#ff8c00]' },
              { status: 'CONFLICTED', count: '412', desc: 'Contradictory records', color: 'text-[#ff3d3d]' },
              { status: 'UNKNOWN', count: '1,890', desc: 'Blind spots flagged', color: 'text-[#4a5a6d]' }
            ].map((ledger, lIdx) => (
              <div key={lIdx} className="p-3 border-r border-b border-[#1e2d3d] last:border-r-0">
                <span className="font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider block">{ledger.status}</span>
                <span className={`font-mono text-[18px] font-bold ${ledger.color} block my-1`}>{ledger.count}</span>
                <p className="font-mono text-[9px] text-[#4a5a6d] leading-snug">{ledger.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-3 px-3 text-center font-mono text-[10px] text-[#4a5a6d]">
        STARTUP X-RAY · VENTURE INTELLIGENCE TERMINAL
      </footer>
    </div>
  );
}
