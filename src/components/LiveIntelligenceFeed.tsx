import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radio, ArrowRight, ShieldCheck, AlertCircle, FileText, DollarSign, Users, ChevronRight } from 'lucide-react';
import { intelligenceEvents } from '../data';

export const LiveIntelligenceFeed: React.FC = () => {
  const navigate = useNavigate();

  const getEventIcon = (headline: string) => {
    const text = headline.toLowerCase();
    if (text.includes('filing') || text.includes('drhp') || text.includes('sebi')) return <FileText className="w-3.5 h-3.5 text-cyan-400" />;
    if (text.includes('raise') || text.includes('round') || text.includes('funding')) return <DollarSign className="w-3.5 h-3.5 text-amber-400" />;
    if (text.includes('hire') || text.includes('poach') || text.includes('team')) return <Users className="w-3.5 h-3.5 text-emerald-400" />;
    return <Radio className="w-3.5 h-3.5 text-cyan-400" />;
  };

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

  return (
    <div className="relative w-full h-[480px] lg:h-[540px] bg-[#0c0d15] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header */}
      <div className="px-4 py-3 bg-[#08080d]/90 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span className="absolute w-4 h-4 rounded-full bg-red-500/30 animate-ping" />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-widest text-white uppercase">
            LIVE INTELLIGENCE STREAM
          </span>
        </div>
        <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
          STREAM ACTIVE
        </span>
      </div>

      {/* Feed list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar divide-y divide-white/5">
        {intelligenceEvents.map((event, idx) => {
          const primaryCompany = event.affectedCompanies?.[0] || 'Entity';
          const companyId = getCompanyId(primaryCompany);

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => {
                if (companyId) {
                  navigate(`/company/${companyId}`);
                } else {
                  navigate(`/search?q=${encodeURIComponent(primaryCompany)}`);
                }
              }}
              className="pt-2.5 first:pt-0 group cursor-pointer"
            >
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all">
                {/* Meta line */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {getEventIcon(event.headline)}
                    <span className="text-[10px] font-mono font-bold text-cyan-400">
                      {event.timeAgo || 'Recent'}
                    </span>
                    <span className="text-zinc-600 font-mono text-[9px]">•</span>
                    <span className="text-[9px] font-mono text-zinc-400 truncate max-w-[110px]">
                      {event.source.split('/')[0]}
                    </span>
                  </div>

                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                    event.impactLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                  }`}>
                    {event.impactLevel}
                  </span>
                </div>

                {/* Headline */}
                <h4 className="text-xs font-semibold text-zinc-100 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-1.5">
                  {event.headline}
                </h4>

                {/* Affected Entities & Domino CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {event.affectedCompanies.slice(0, 2).map(c => (
                      <span
                        key={c}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 group-hover:border-cyan-500/30"
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
                      className="text-[9px] font-mono text-cyan-400 hover:text-white flex items-center gap-0.5 ml-2 whitespace-nowrap bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20"
                    >
                      <span>DOMINO</span>
                      <ChevronRight className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-[#08080d] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>PROVENANCE VERIFIED</span>
        </span>
        <button
          onClick={() => navigate('/companies')}
          className="text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>ALL SIGNALS</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>
  );
};
