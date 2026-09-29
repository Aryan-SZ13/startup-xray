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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-9">

      {/* 1. Market Ticker */}
      <MarketTicker />

      {/* 2. Main Command Viewport */}
      <section className="px-3 lg:px-6 pt-4 pb-6 border-b border-slate-200 bg-white">
        <div className="max-w-[1800px] mx-auto">

          {/* Top Bar: Title + Search + Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-[15px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>VENTURE INTELLIGENCE TERMINAL</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">LIVE</span>
                </h1>
                <p className="font-mono text-[11px] text-slate-500 mt-0.5">
                  Multi-sector coverage: AI · SpaceTech · CleanTech · Defense · Enterprise DevTools
                </p>
              </div>
            </div>

            {/* Inline Status Bar */}
            <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Eye size={12} className="text-blue-600" />
                <span className="text-slate-700 font-medium">12 WATCHED</span>
              </div>
              <span className="text-slate-200">|</span>
              <span className="text-emerald-700 font-medium">6 CLUSTERS</span>
              <span className="text-slate-200">|</span>
              <span className="text-slate-700 font-medium">4 LIVE SIGNALS</span>
              <span className="text-slate-200">|</span>
              <button
                onClick={() => navigate('/radar')}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer flex items-center gap-1"
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
                <div className="flex items-center bg-slate-50/80 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white rounded-md px-3 py-1.5 transition-all shadow-xs">
                  <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                    placeholder="Search entity, founder, or signal..."
                    className="w-full bg-transparent border-none outline-none text-slate-900 text-[12px] font-mono placeholder:text-slate-400"
                  />
                  <kbd className="hidden sm:inline font-mono text-[9px] text-slate-400 bg-white border border-slate-200 px-1 py-0.5 rounded shadow-2xs">⌘K</kbd>
                </div>
              </form>

              {/* Suggestions Dropdown */}
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg z-50 shadow-xl overflow-hidden">
                  <div className="px-3 py-1.5 font-mono text-[9px] text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-200">
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
                      className="w-full text-left px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-between cursor-pointer border-b border-slate-100 last:border-b-0"
                    >
                      <span className="font-mono text-[11px] font-semibold text-slate-900">{item.label}</span>
                      <span className="font-mono text-[10px] text-slate-400">{item.meta}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="hidden md:flex items-center gap-1.5">
              {[
                { label: 'X-RAY', path: '/xray/c_postman', color: 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100' },
                { label: 'SIMULATE', path: '/scenario', color: 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
                { label: 'COMPARE', path: '/vs', color: 'text-orange-700 bg-orange-50 border-orange-200 hover:bg-orange-100' },
                { label: 'ANALYST', path: '/analyst', color: 'text-purple-700 bg-purple-50 border-purple-200 hover:bg-purple-100' }
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => navigate(act.path)}
                  className={`px-3 py-1.5 border rounded-md font-mono text-[10px] font-bold ${act.color} transition-all cursor-pointer shadow-2xs`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Grid: Graph + Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

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
      <section className="px-3 lg:px-6 py-6 border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">YOUR RADAR</span>
              <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">PERSONALIZED</span>
            </div>
            <button
              onClick={() => navigate('/radar')}
              className="font-mono text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              VIEW ALL <ChevronRight size={10} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {activeRecommendations.slice(0, 3).map((rec) => (
              <div
                key={rec.companyId}
                onClick={() => navigate(`/company/${rec.companyId}`)}
                className="bg-white border border-slate-200 shadow-xs rounded-lg p-3.5 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[13px] font-bold text-slate-900">
                    {rec.companyName || rec.companyId}
                  </h3>
                  <span className="font-mono text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase font-medium">{rec.type}</span>
                </div>

                <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-1.5 font-semibold">
                  WHY YOU SEE THIS
                </div>

                <ul className="space-y-1 mb-3">
                  {(rec.reasons || []).slice(0, 2).map((r: string, j: number) => (
                    <li key={j} className="text-[11px] text-slate-600 flex items-start gap-1.5 leading-snug">
                      <span className="text-orange-500 font-bold">▸</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-500 font-medium">AFFINITY: <span className="text-slate-900 font-bold">{Math.round(rec.score * 100)}%</span></span>
                  <span className="text-orange-600 font-bold flex items-center gap-0.5">
                    X-RAY <ArrowRight size={9} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ATTENTION DIVERGENCE */}
      <section className="px-3 lg:px-6 py-6 border-b border-slate-200 bg-white">
        <div className="max-w-[1800px] mx-auto">
          <SplitAttentionMatrix />
        </div>
      </section>

      {/* 5. UNDER THE RADAR */}
      <section className="px-3 lg:px-6 py-6 border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-[11px] text-emerald-700 tracking-wider uppercase">UNDER THE RADAR</span>
              <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">VIS &lt;30% · SIGNAL VEL &gt;85%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {companies.filter(c => ['c_torus', 'c_sarvam'].includes(c.id)).map((comp) => (
              <div
                key={comp.id}
                className="bg-white border border-slate-200 shadow-xs rounded-lg overflow-hidden"
              >
                {/* Company Header */}
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-900">{comp.name}</h4>
                    <span className="font-mono text-[10px] text-slate-500">{comp.tagline}</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">HIGH SIGNAL</span>
                </div>

                {/* Why Now */}
                {comp.whyNow && (
                  <div className="px-4 py-3 bg-white border-b border-slate-100 text-[11px] space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                        CATALYST {comp.whyNow.catalystTimestamp}
                      </span>
                    </div>
                    <p><span className="text-slate-400 font-medium">Before:</span> <span className="text-slate-600">{comp.whyNow.before}</span></p>
                    <p><span className="text-slate-900 font-semibold">Changed:</span> <span className="text-slate-700">{comp.whyNow.whatChanged}</span></p>
                    <p><span className="text-slate-400 font-medium">Why:</span> <span className="text-slate-600">{comp.whyNow.whyItMatters}</span></p>
                  </div>
                )}

                {/* Actions */}
                <div className="px-4 py-2.5 bg-slate-50/60 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/company/${comp.id}`)}
                    className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-md font-mono text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer text-center shadow-2xs"
                  >
                    DOSSIER
                  </button>
                  <button
                    onClick={() => navigate(`/xray/${comp.id}`)}
                    className="flex-1 py-1.5 bg-orange-600 hover:bg-orange-500 rounded-md font-mono text-[10px] font-bold text-white transition-colors cursor-pointer text-center shadow-2xs"
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
      <section className="px-3 lg:px-6 py-6 border-b border-slate-200 bg-white">
        <div className="max-w-[1800px] mx-auto">
          <EcosystemRadarSection />
        </div>
      </section>

      {/* 7. CAUSAL DOMINO */}
      <section className="px-3 lg:px-6 py-6 border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-[1800px] mx-auto">
          <CausalDominoCascade />
        </div>
      </section>

      {/* 8. OPPORTUNITIES */}
      <section className="px-3 lg:px-6 py-6 border-b border-slate-200 bg-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">MARKET INFLECTIONS</span>
              <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">OPPORTUNITIES BEFORE OBVIOUS</span>
            </div>
            <button
              onClick={() => navigate('/discover')}
              className="font-mono text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              EXPLORE <ChevronRight size={10} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white border border-slate-200 shadow-xs rounded-lg p-3.5 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
                onClick={() => navigate(`/analyst?q=${encodeURIComponent(opp.title)}`)}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">{opp.sector}</span>
                    <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">HIGH SIGNAL</span>
                  </div>
                  <h4 className="text-[12px] font-bold text-slate-900 mb-1.5 leading-snug">{opp.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{opp.description}</p>
                </div>
                <button className="w-full py-1.5 bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-md font-mono text-[10px] font-semibold text-slate-700 flex items-center justify-center gap-1 transition-all cursor-pointer">
                  INVESTIGATE <ArrowRight size={9} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NETWORK X-RAY */}
      <section className="px-3 lg:px-6 py-6 border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-white border border-slate-200 shadow-xs rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">NETWORK PATHWAYS</span>
              <span className="font-mono text-[10px] text-slate-500">WARM INTRO MAPPING</span>
            </div>

            <div className="p-4">
              <h3 className="text-[13px] font-bold text-slate-900 mb-1">
                Find Your Pathway Into Any Entity
              </h3>
              <p className="text-[11px] text-slate-600 mb-4">
                Map SRM alumni networks (Torus Robotics, STAGE OTT), IIT Madras incubations (Ather, Agnikul), and BITS Pilani corridors (Postman, Swiggy).
              </p>

              {/* Path Visualization */}
              <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md mb-4 flex items-center gap-2 font-mono text-[11px] text-slate-500 flex-wrap">
                <span className="px-1.5 py-0.5 bg-orange-600 text-white font-bold text-[10px] rounded">YOU (SRMIST)</span>
                <span>→</span>
                <span className="text-slate-700 font-medium">AIC-SRMIST Corridor</span>
                <span>→</span>
                <span className="text-slate-900 font-semibold">Torus Robotics / STAGE</span>
                <span>→</span>
                <span className="text-orange-600 font-semibold">Founders & Leadership</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/network')}
                  className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 rounded-md font-mono text-[10px] font-bold text-white transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  MAP NETWORK <ArrowRight size={10} />
                </button>
                <button
                  onClick={() => {
                    setLinkedInConnected(true);
                    navigate('/network');
                  }}
                  className="px-4 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded-md font-mono text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  IMPORT DEMO DATA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. EVIDENCE LEDGER */}
      <section className="px-3 lg:px-6 py-6 border-b border-slate-200 bg-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono font-bold text-[11px] text-slate-500 tracking-wider uppercase">EVIDENCE & PROVENANCE LEDGER</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 bg-white border border-slate-200 shadow-xs rounded-lg overflow-hidden">
            {[
              { status: 'VERIFIED', count: '14,280', desc: 'Direct regulatory filings', color: 'text-emerald-700' },
              { status: 'REPORTED', count: '8,410', desc: 'Credible financial media', color: 'text-blue-700' },
              { status: 'ESTIMATED', count: '3,290', desc: 'Institutional markups', color: 'text-amber-700' },
              { status: 'INFERRED', count: '2,140', desc: 'Network calculations', color: 'text-orange-700' },
              { status: 'CONFLICTED', count: '412', desc: 'Contradictory records', color: 'text-rose-700' },
              { status: 'UNKNOWN', count: '1,890', desc: 'Blind spots flagged', color: 'text-slate-500' }
            ].map((ledger, lIdx) => (
              <div key={lIdx} className="p-3 border-r border-b border-slate-200 last:border-r-0 bg-white">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block font-semibold">{ledger.status}</span>
                <span className={`font-mono text-[18px] font-extrabold ${ledger.color} block my-1`}>{ledger.count}</span>
                <p className="font-mono text-[9px] text-slate-500 leading-snug">{ledger.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="py-4 px-3 text-center font-mono text-[10px] text-slate-400">
        STARTUP X-RAY · VENTURE INTELLIGENCE TERMINAL · CONFIDENTIAL &amp; PROPRIETARY
      </footer>
    </div>
  );
}
