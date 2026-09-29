import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../data';

export const SplitAttentionMatrix: React.FC = () => {
  const navigate = useNavigate();
  const [activeSide, setActiveSide] = useState<'WATCHING' | 'MISSING' | null>(null);

  const mainstreamCompanies = companies.filter(c => ['c_swiggy', 'c_postman', 'c_zomato', 'c_ather'].includes(c.id));
  const underTheRadarCompanies = companies.filter(c => ['c_sarvam', 'c_torus', 'c_agnikul', 'c_skyroot'].includes(c.id));

  return (
    <div className="w-full bg-white border border-slate-200 shadow-xs rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">ATTENTION DIVERGENCE</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500 font-medium">COMPARATIVE VIEW</span>
      </div>

      {/* 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left: Everybody Watching */}
        <div
          onMouseEnter={() => setActiveSide('WATCHING')}
          onMouseLeave={() => setActiveSide(null)}
          className={`transition-all ${
            activeSide === 'WATCHING' ? 'bg-slate-50/50' : activeSide === 'MISSING' ? 'opacity-60' : ''
          }`}
        >
          <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
            <span className="font-mono text-[10px] text-slate-900 font-bold uppercase tracking-wide">EVERYBODY IS WATCHING</span>
            <span className="font-mono text-[10px] text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded font-medium">HIGH VIS</span>
          </div>
          {mainstreamCompanies.map((comp) => (
            <div
              key={comp.id}
              onClick={() => navigate(`/company/${comp.id}`)}
              className="px-4 py-2.5 border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="text-[12px] font-bold text-slate-900">{comp.name}</span>
                <span className="text-[11px] text-slate-500 ml-2">{comp.tagline}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-700 font-semibold">{comp.valuation?.claim || comp.totalFunding?.claim}</span>
            </div>
          ))}
        </div>

        {/* Right: You May Be Missing */}
        <div
          onMouseEnter={() => setActiveSide('MISSING')}
          onMouseLeave={() => setActiveSide(null)}
          className={`transition-all ${
            activeSide === 'MISSING' ? 'bg-orange-50/20' : activeSide === 'WATCHING' ? 'opacity-60' : ''
          }`}
        >
          <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between bg-orange-50/40">
            <span className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-wide">YOU MAY BE MISSING</span>
            <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">HIGH SIGNAL</span>
          </div>
          {underTheRadarCompanies.map((comp) => (
            <div
              key={comp.id}
              onClick={() => navigate(`/company/${comp.id}`)}
              className="px-4 py-2.5 border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-slate-900">{comp.name}</span>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{comp.sector}</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-700 font-bold">SIGNAL+</span>
              </div>
              {comp.whyNow ? (
                <p className="text-[11px] text-slate-600 leading-snug">
                  <span className="text-slate-400 font-medium">Catalyst:</span> {comp.whyNow.whatChanged}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500">{comp.tagline}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
