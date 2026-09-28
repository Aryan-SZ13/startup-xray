import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { intelligenceEvents } from '../data';

type EventFilter = 'All' | 'Funding' | 'Regulatory' | 'Hiring';

export const LiveIntelligenceFeed: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<EventFilter>('All');

  const getCompanyId = (name: string) => {
    const clean = name.toLowerCase().replace(/[\s\.\-]+/g, '');
    if (clean.includes('swiggy')) return 'c_swiggy';
    if (clean.includes('zomato')) return 'c_zomato';
    if (clean.includes('zepto')) return 'c_zepto';
    if (clean.includes('agnikul')) return 'c_agnikul';
    if (clean.includes('skyroot')) return 'c_skyroot';
    if (clean.includes('openai')) return 'c_openai';
    return null;
  };

  const filteredEvents = intelligenceEvents.filter(ev => {
    if (filter === 'All') return true;
    const t = ev.headline.toLowerCase();
    if (filter === 'Funding') return t.includes('raise') || t.includes('round') || t.includes('funding') || t.includes('mezzanine');
    if (filter === 'Regulatory') return t.includes('filing') || t.includes('sebi') || t.includes('drhp') || t.includes('disclosure');
    if (filter === 'Hiring') return t.includes('hire') || t.includes('team') || t.includes('scientists') || t.includes('poach');
    return true;
  });

  return (
    <div className="relative w-full h-[520px] lg:h-[580px] bg-[#0c0c0e]/80 rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-3xl flex flex-col">
      {/* Apple-style Top Bar */}
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ff453a] shadow-[0_0_8px_#ff453a]" />
          <span className="text-xs font-medium text-white/90 tracking-tight">
            Live Feed
          </span>
        </div>

        {/* Minimal Filters */}
        <div className="flex items-center p-0.5 rounded-full bg-white/[0.05] border border-white/[0.06]">
          {(['All', 'Funding', 'Regulatory', 'Hiring'] as EventFilter[]).map((f) => (
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
        <AnimatePresence>
          {filteredEvents.map((event, idx) => {
            const primaryCompany = event.affectedCompanies?.[0] || 'Entity';
            const companyId = getCompanyId(primaryCompany);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  if (companyId) {
                    navigate(`/company/${companyId}`);
                  } else {
                    navigate(`/search?q=${encodeURIComponent(primaryCompany)}`);
                  }
                }}
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.12] transition-all cursor-pointer group"
              >
                {/* Meta line */}
                <div className="flex items-center justify-between mb-1.5 text-[10px] text-[#86868b]">
                  <span className="text-[#2997ff] font-medium">{event.timeAgo || 'Recent'}</span>
                  <span className="truncate max-w-[120px]">{event.source.split('/')[0]}</span>
                </div>

                {/* Title */}
                <h4 className="text-xs font-medium text-white/90 group-hover:text-white leading-snug line-clamp-2 mb-2">
                  {event.headline}
                </h4>

                {/* Footer Entity & Domino */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
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
        <span>Primary verified data</span>
        <button
          onClick={() => navigate('/companies')}
          className="text-[#2997ff] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View all</span>
          <ArrowUpRight size={11} />
        </button>
      </div>
    </div>
  );
};
