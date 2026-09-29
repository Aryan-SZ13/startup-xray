import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { intelligenceEvents } from '../data';

type EventFilter = 'All' | 'Funding' | 'Regulatory' | 'Hiring' | 'Tech';

export const LiveIntelligenceFeed: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<EventFilter>('All');
  const [events, setEvents] = useState(intelligenceEvents);
  const [newHighlightId, setNewHighlightId] = useState<string | null>(null);

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
    <div className="relative w-full h-[520px] lg:h-[580px] bg-[#0f1823] border border-[#1e2d3d] rounded overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#2a3a4d] flex items-center justify-between bg-[#0f1823]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d3d] bb-pulse" />
          <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">
            LIVE INTELLIGENCE
          </span>
          <span className="font-mono text-[10px] text-[#00c853] font-medium">
            STREAM
          </span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-0">
          {(['All', 'Funding', 'Regulatory', 'Tech'] as EventFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer border-b-2 ${
                filter === f
                  ? 'text-[#ff8c00] border-[#ff8c00]'
                  : 'text-[#4a5a6d] hover:text-[#8899aa] border-transparent'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence initial={false}>
          {filteredEvents.map((event) => {
            const primaryCompany = event.affectedCompanies?.[0] || 'Entity';
            const companyId = getCompanyId(primaryCompany);
            const isFresh = newHighlightId === event.id;

            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  if (companyId) navigate(`/company/${companyId}`);
                  else navigate(`/search?q=${encodeURIComponent(primaryCompany)}`);
                }}
                className={`px-3 py-2 border-b border-[#1e2d3d] cursor-pointer hover:bg-[#141e2d] transition-colors ${
                  isFresh ? 'border-l-2 border-l-[#ff8c00] bg-[#141e2d]' : ''
                }`}
              >
                {/* Row 1: Time + Source */}
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      event.impactLevel === 'HIGH' ? 'bg-[#00c853]' :
                      event.impactLevel === 'MEDIUM' ? 'bg-[#ffd700]' : 'bg-[#ff3d3d]'
                    }`} />
                    <span className={`font-mono text-[10px] ${isFresh ? 'text-[#ff8c00] font-semibold' : 'text-[#4a5a6d]'}`}>
                      {event.timeAgo || 'Recent'}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#4a5a6d] truncate max-w-[140px]">
                    {event.source.split('/')[0]}
                  </span>
                </div>

                {/* Row 2: Headline */}
                <p className="text-[12px] text-[#e8edf3] font-medium leading-snug line-clamp-2 mb-1">
                  {event.headline}
                </p>

                {/* Row 3: Tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {event.affectedCompanies.slice(0, 2).map(c => (
                      <span key={c} className="font-mono text-[10px] text-[#ff8c00]">{c}</span>
                    ))}
                  </div>
                  {event.hasDominoMap && (
                    <span
                      onClick={(e) => { e.stopPropagation(); navigate('/domino'); }}
                      className="font-mono text-[10px] text-[#2196f3] hover:text-[#e8edf3] flex items-center gap-0.5 cursor-pointer"
                    >
                      DOMINO <ChevronRight size={9} />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-[#2a3a4d] bg-[#0a0e17] flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#4a5a6d]">AUTO-REFRESH 12S</span>
        <button
          onClick={() => navigate('/companies')}
          className="font-mono text-[10px] text-[#2196f3] hover:text-[#e8edf3] flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          ALL COMPANIES <ArrowUpRight size={10} />
        </button>
      </div>
    </div>
  );
};
