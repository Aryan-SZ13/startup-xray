import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowUpRight, Radio } from 'lucide-react';
import { intelligenceEvents } from '../data/intelligence';

export const LiveIntelligenceFeed: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(intelligenceEvents);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const getEventCategory = (evt: typeof intelligenceEvents[0]): string => {
    const m = (evt.market || '').toLowerCase();
    const h = (evt.headline || '').toLowerCase();
    if (m.includes('capital') || m.includes('ipo') || m.includes('funding') || h.includes('ipo') || h.includes('raises') || h.includes('listing')) return 'CAPITAL';
    if (m.includes('regulatory') || m.includes('ministry') || m.includes('defence') || h.includes('sebi') || h.includes('ministry') || h.includes('contract')) return 'REGULATORY';
    if (h.includes('hire') || h.includes('founder') || h.includes('talent') || h.includes('alumni')) return 'TALENT';
    return 'TECH';
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setEvents(prev => {
        const next = [...prev];
        const last = next.pop();
        if (last) {
          const updatedLast = {
            ...last,
            id: `evt_live_${Date.now()}`,
            timeAgo: 'Just now',
            date: 'Just now'
          };
          next.unshift(updatedLast);
        }
        return next;
      });
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const categories = ['ALL', 'CAPITAL', 'TECH', 'REGULATORY', 'TALENT'];

  const filteredEvents = activeFilter === 'ALL'
    ? events
    : events.filter(e => {
        const cat = getEventCategory(e);
        return cat === activeFilter;
      });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'CAPITAL': return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'TECHNOLOGY': return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'REGULATORY': return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'TALENT': return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'ECOSYSTEM': return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-[520px] lg:h-[580px]">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 bb-pulse" />
          <span className="font-mono font-bold text-[11px] text-slate-900 tracking-wider uppercase">
            LIVE INTELLIGENCE STREAM
          </span>
          <span className="font-mono text-[10px] text-slate-500 bg-slate-200/60 px-1.5 py-0.2 rounded">
            {events.length} SIGNALS
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                activeFilter === c
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-1">
        <AnimatePresence initial={false}>
          {filteredEvents.map((evt) => {
            const companyId = evt.affectedCompanies?.[0];
            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => {
                  if (companyId) navigate(`/company/${companyId}`);
                  else navigate('/domino');
                }}
                className="px-3.5 py-3 hover:bg-slate-50/80 transition-colors cursor-pointer group rounded-lg m-1"
              >
                {/* Meta row */}
                <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const cat = getEventCategory(evt);
                      return (
                        <span className={`px-1.5 py-0.5 rounded border text-[9px] font-semibold uppercase ${getCategoryBadge(cat)}`}>
                          {cat}
                        </span>
                      );
                    })()}
                    <span className="font-semibold text-slate-900">
                      {companyId ? companyId.replace(/^c_/, '').toUpperCase() : 'SECTOR'}
                    </span>
                  </div>
                  <span className="text-slate-400">{evt.timeAgo || evt.date}</span>
                </div>

                {/* Headline */}
                <h4 className="text-[12px] font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors mb-1">
                  {evt.headline}
                </h4>

                {/* Impact */}
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                  {evt.impact}
                </p>

                {/* Footer details */}
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span className="truncate max-w-[200px]">SRC: {evt.source}</span>
                  <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 font-semibold">
                    INSPECT <ArrowUpRight size={10} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between font-mono text-[10px] text-slate-500">
        <span>AUTO-REFRESHING (12S)</span>
        <button
          onClick={() => navigate('/domino')}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 cursor-pointer"
        >
          TRACE CAUSALITY <ChevronRight size={11} />
        </button>
      </div>
    </div>
  );
};
