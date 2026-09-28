import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ShieldAlert, ArrowRight, Zap, Target } from 'lucide-react';
import { companies } from '../data';

export const SplitAttentionMatrix: React.FC = () => {
  const navigate = useNavigate();
  const [activeSide, setActiveSide] = useState<'WATCHING' | 'MISSING' | null>(null);

  const mainstreamCompanies = companies.filter(c => c.visibility === 'HIGH' || ['c_swiggy', 'c_zomato', 'c_openai'].includes(c.id));
  const underTheRadarCompanies = companies.filter(c => c.visibility === 'LOW' || c.signalDensity === 'HIGH' || ['c_agnikul', 'c_skyroot', 'c_zepto'].includes(c.id));

  return (
    <div className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-[#090a10]">
      {/* Header */}
      <div className="px-6 py-4 bg-[#0c0d15] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono tracking-widest text-white uppercase">
              ATTENTION DIVERGENCE ENGINE
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Hover between panels to compare mainstream venture consensus against early signal alpha.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
          <span>ACTIVE COMPARISON LENS</span>
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        
        {/* Left Side: Everybody Is Watching */}
        <div
          onMouseEnter={() => setActiveSide('WATCHING')}
          onMouseLeave={() => setActiveSide(null)}
          className={`p-6 transition-all duration-300 ${
            activeSide === 'WATCHING' 
              ? 'bg-cyan-500/[0.04]' 
              : activeSide === 'MISSING' 
              ? 'opacity-60' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold font-mono text-cyan-300 tracking-wider uppercase">
                EVERYBODY IS WATCHING
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              HIGH CONSENSUS // PRICED IN
            </span>
          </div>

          <p className="text-xs text-zinc-400 mb-4">
            Heavily covered late-stage companies. Valuations reflect public market speculation and high headline volume.
          </p>

          <div className="space-y-3">
            {mainstreamCompanies.slice(0, 3).map((comp) => (
              <div
                key={comp.id}
                onClick={() => navigate(`/company/${comp.id}`)}
                className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {comp.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {comp.stage}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-300">
                    {comp.valuation?.claim || comp.totalFunding?.claim}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-1">{comp.tagline}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                  <span className="text-cyan-400">SIGNALS: {comp.signals.length} ACTIVE</span>
                  <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>X-RAY</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: You May Be Missing */}
        <div
          onMouseEnter={() => setActiveSide('MISSING')}
          onMouseLeave={() => setActiveSide(null)}
          className={`p-6 transition-all duration-300 ${
            activeSide === 'MISSING' 
              ? 'bg-emerald-500/[0.04]' 
              : activeSide === 'WATCHING' 
              ? 'opacity-60' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold font-mono text-emerald-300 tracking-wider uppercase">
                YOU MAY BE MISSING
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              LOW NOISE // HIGH SIGNAL ALPHA
            </span>
          </div>

          <p className="text-xs text-zinc-400 mb-4">
            Deep-tech, capital-efficient, or quiet movers experiencing sudden acceleration before institutional coverage.
          </p>

          <div className="space-y-3">
            {underTheRadarCompanies.slice(0, 3).map((comp) => (
              <div
                key={comp.id}
                onClick={() => navigate(`/company/${comp.id}`)}
                className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {comp.name}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      SIGNAL DENSE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    VISIBILITY: {comp.visibility || 'LOW'}
                  </span>
                </div>
                
                {comp.whyNow ? (
                  <p className="text-xs text-zinc-300 line-clamp-1">
                    <span className="text-emerald-400 font-mono">CATALYST:</span> {comp.whyNow.whatChanged}
                  </p>
                ) : (
                  <p className="text-xs text-zinc-400 line-clamp-1">{comp.tagline}</p>
                )}

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    <span>RECENT VELOCITY HIGH</span>
                  </span>
                  <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>INVESTIGATE</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
