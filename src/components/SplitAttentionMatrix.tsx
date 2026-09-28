import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../data';

export const SplitAttentionMatrix: React.FC = () => {
  const navigate = useNavigate();
  const [activeSide, setActiveSide] = useState<'WATCHING' | 'MISSING' | null>(null);

  // Diverse mainstream
  const mainstreamCompanies = companies.filter(c => ['c_swiggy', 'c_postman', 'c_zomato', 'c_ather'].includes(c.id));
  // Diverse unpriced / quiet alpha
  const underTheRadarCompanies = companies.filter(c => ['c_sarvam', 'c_torus', 'c_agnikul', 'c_skyroot'].includes(c.id));

  return (
    <div className="relative w-full rounded-3xl border border-white/[0.08] overflow-hidden bg-[#0c0c0e]/70 backdrop-blur-3xl shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white/90 tracking-tight">
            Attention Divergence
          </h3>
          <p className="text-xs text-[#86868b] mt-0.5">
            Consensus venture holdings vs. early unpriced signal alpha
          </p>
        </div>
        <div className="text-[10px] text-[#86868b] px-3 py-1 rounded-full bg-white/[0.04]">
          Comparative View
        </div>
      </div>

      {/* 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
        
        {/* Left Side */}
        <div
          onMouseEnter={() => setActiveSide('WATCHING')}
          onMouseLeave={() => setActiveSide(null)}
          className={`p-6 transition-all duration-300 ${
            activeSide === 'WATCHING' 
              ? 'bg-white/[0.03]' 
              : activeSide === 'MISSING' 
              ? 'opacity-60' 
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-white/90">
              Everybody is Watching
            </span>
            <span className="text-[10px] text-[#86868b] px-2 py-0.5 rounded-full bg-white/[0.05]">
              High Visibility
            </span>
          </div>

          <div className="space-y-2.5">
            {mainstreamCompanies.map((comp) => (
              <div
                key={comp.id}
                onClick={() => navigate(`/company/${comp.id}`)}
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.12] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white group-hover:text-[#2997ff] transition-colors">
                    {comp.name}
                  </span>
                  <span className="text-xs font-mono text-[#86868b]">
                    {comp.valuation?.claim || comp.totalFunding?.claim}
                  </span>
                </div>
                <p className="text-xs text-[#86868b] line-clamp-1">{comp.tagline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div
          onMouseEnter={() => setActiveSide('MISSING')}
          onMouseLeave={() => setActiveSide(null)}
          className={`p-6 transition-all duration-300 ${
            activeSide === 'MISSING' 
              ? 'bg-white/[0.03]' 
              : activeSide === 'WATCHING' 
              ? 'opacity-60' 
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#2997ff]">
              You May Be Missing
            </span>
            <span className="text-[10px] text-[#30d158] px-2 py-0.5 rounded-full bg-[#30d158]/10 font-medium">
              High Signal Alpha
            </span>
          </div>

          <div className="space-y-2.5">
            {underTheRadarCompanies.map((comp) => (
              <div
                key={comp.id}
                onClick={() => navigate(`/company/${comp.id}`)}
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.12] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white group-hover:text-[#30d158] transition-colors">
                      {comp.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/[0.05] text-[#86868b]">
                      {comp.sector}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#30d158] font-medium">
                    Signal Dense
                  </span>
                </div>
                {comp.whyNow ? (
                  <p className="text-xs text-[#d2d2d7] line-clamp-1">
                    <span className="text-[#86868b]">Catalyst:</span> {comp.whyNow.whatChanged}
                  </p>
                ) : (
                  <p className="text-xs text-[#86868b] line-clamp-1">{comp.tagline}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
