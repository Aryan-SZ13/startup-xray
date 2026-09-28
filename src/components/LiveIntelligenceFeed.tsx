import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowUpRight, Radio } from 'lucide-react';
import { intelligenceEvents } from '../data';

type EventFilter = 'All' | 'Funding' | 'Regulatory' | 'Hiring' | 'Tech';

export const LiveIntelligenceFeed: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<EventFilter>('All');
  const [events, setEvents] = useState(intelligenceEvents);
  const [newHighlightId, setNewHighlightId] = useState<string | null>(null);

  // Live real-time incoming ticker simulation: every 14 seconds, a new dynamic intelligence event shifts into feed
  useEffect(() => {
    const liveIncomingPool = [
      {
        id: `live_${Date.now()}_1`,
        headline: 'Sarvam AI Completes Pilot Integration with National Payments Corporation (NPCI)',
        date: 'Just now',
        timeAgo: 'Just now',
        source: 'NPCI Sandbox / FinTech Desk',
        sourceUrl: 'https://npci.org.in',
        affectedCompanies: ['Sarvam AI'],
        market: 'Sovereign Indic Voice Banking',
        impact: 'Voice-based conversational UPI payments enabled across 12 Indian regional dialects.',
        impactLevel: 'HIGH' as const,
        hasDominoMap: false
      },
      {
        id: `live_${Date.now()}_2`,
        headline: 'Torus Robotics Demonstrates Heavy Electric UGV in -28°C Siachen Military Trials',
        date: 'Just now',
        timeAgo: 'Just now',
        source: 'MoD Telemetry / iDEX Bulletin',
        sourceUrl: 'https://idex.gov.in',
        affectedCompanies: ['Torus Robotics'],
        market: 'Military Unmanned Vehicles',
        impact: 'Proprietary axial flux powertrain cleared 1,200kg tactical payload climb at 16,000 ft altitude.',
        impactLevel: 'HIGH' as const,
        hasDominoMap: true
      },
      {
        id: `live_${Date.now()}_3`,
        headline: 'Postman Surpasses 35 Million Registered Developers as AI Agent Workspace Usage Surges 140%',
        date: 'Just now',
        timeAgo: 'Just now',
        source: 'Postman State of API 2026',
        sourceUrl: 'https://postman.com',
        affectedCompanies: ['Postman'],
        market: 'API Infrastructure',
        impact: 'SRM alumni-founded unicorn establishes market dominance as runtime validation layer for autonomous LLM coders.',
        impactLevel: 'MEDIUM' as const,
        hasDominoMap: false
      },
      {
        id: `live_${Date.now()}_4`,
        headline: 'Ather Energy Grid Crosses 3,500 Fast Charging Hubs Ahead of SEBI Roadshow',
        date: 'Just now',
        timeAgo: 'Just now',
        source: 'Vahan Portal Registry',
        sourceUrl: 'https://vahan.parivahan.gov.in',
        affectedCompanies: ['Ather Energy'],
        market: 'EV Fast Charging Infrastructure',
        impact: 'Public charging utilization climbs 42% YoY, lifting software subscription take-rates.',
        impactLevel: 'HIGH' as const,
        hasDominoMap: true
      }
    ];

    let poolIndex = 0;
    const interval = setInterval(() => {
      const incoming = liveIncomingPool[poolIndex % liveIncomingPool.length];
      poolIndex++;

      setEvents(prev => {
        // Prepend new event
        const updated = [incoming, ...prev.slice(0, 15)];
        return updated;
      });

      setNewHighlightId(incoming.id);
      setTimeout(() => setNewHighlightId(null), 3000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const getCompanyId = (name: string) => {
    const clean = name.toLowerCase().replace(/[\s\.\-]+/g, '');
    if (clean.includes('swiggy')) return 'c_swiggy';
    if (clean.includes('zomato')) return 'c_zomato';
    if (clean.includes('zepto')) return 'c_zepto';
    if (clean.includes('agnikul')) return 'c_agnikul';
    if (clean.includes('skyroot')) return 'c_skyroot';
    if (clean.includes('openai')) return 'c_openai';
    if (clean.includes('postman')) return 'c_postman';
    if (clean.includes('ather')) return 'c_ather';
    if (clean.includes('sarvam')) return 'c_sarvam';
    if (clean.includes('torus')) return 'c_torus';
    return null;
  };

  const filteredEvents = events.filter(ev => {
    if (filter === 'All') return true;
    const t = ev.headline.toLowerCase();
    if (filter === 'Funding') return t.includes('raise') || t.includes('round') || t.includes('funding') || t.includes('mezzanine');
    if (filter === 'Regulatory') return t.includes('filing') || t.includes('sebi') || t.includes('drhp') || t.includes('disclosure') || t.includes('contract');
    if (filter === 'Hiring') return t.includes('hire') || t.includes('team') || t.includes('scientists') || t.includes('poach');
    if (filter === 'Tech') return t.includes('model') || t.includes('api') || t.includes('engine') || t.includes('ugv') || t.includes('charging');
    return true;
  });

  return (
    <div className="relative w-full h-[520px] lg:h-[580px] bg-[#0c0c0e]/80 rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-3xl flex flex-col">
      {/* Apple-style Top Bar */}
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#ff453a] shadow-[0_0_8px_#ff453a]" />
            <span className="absolute w-4 h-4 rounded-full bg-[#ff453a]/30 animate-ping" />
          </div>
          <span className="text-xs font-medium text-white/90 tracking-tight">
            Live Intelligence
          </span>
          <span className="text-[10px] text-[#30d158] font-mono px-2 py-0.5 rounded-full bg-[#30d158]/10 font-semibold">
            STREAMING
          </span>
        </div>

        {/* Minimal Filters */}
        <div className="flex items-center p-0.5 rounded-full bg-white/[0.05] border border-white/[0.06]">
          {(['All', 'Funding', 'Regulatory', 'Tech'] as EventFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                filter === f
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {filteredEvents.map((event, idx) => {
            const primaryCompany = event.affectedCompanies?.[0] || 'Entity';
            const companyId = getCompanyId(primaryCompany);
            const isFresh = newHighlightId === event.id;

            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  if (companyId) {
                    navigate(`/company/${companyId}`);
                  } else {
                    navigate(`/search?q=${encodeURIComponent(primaryCompany)}`);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                  isFresh 
                    ? 'bg-[#2997ff]/15 border-[#2997ff]/40 shadow-[0_0_20px_rgba(41,151,255,0.25)]' 
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.05] hover:border-white/[0.12]'
                }`}
              >
                {/* Meta line */}
                <div className="flex items-center justify-between mb-1.5 text-[10px] text-[#86868b]">
                  <span className={`font-medium ${isFresh ? 'text-[#30d158] font-bold' : 'text-[#2997ff]'}`}>
                    {event.timeAgo || 'Recent'}
                  </span>
                  <span className="truncate max-w-[120px]">{event.source.split('/')[0]}</span>
                </div>

                {/* Title */}
                <h4 className="text-xs font-medium text-white/90 group-hover:text-white leading-snug line-clamp-2 mb-2">
                  {event.headline}
                </h4>

                {/* Footer Entity & Domino */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {event.affectedCompanies.slice(0, 2).map(c => (
                      <span
                        key={c}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#d2d2d7]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {event.hasDominoMap && (
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/domino');
                      }}
                      className="text-[10px] text-[#2997ff] hover:text-white flex items-center gap-0.5"
                    >
                      <span>Domino Map</span>
                      <ChevronRight size={10} />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Minimal Footer */}
      <div className="px-5 py-2.5 border-t border-white/[0.06] bg-black/20 flex items-center justify-between text-[11px] text-[#86868b]">
        <span>Auto-refreshing live ledger</span>
        <button
          onClick={() => navigate('/companies')}
          className="text-[#2997ff] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>All companies</span>
          <ArrowUpRight size={11} />
        </button>
      </div>
    </div>
  );
};
