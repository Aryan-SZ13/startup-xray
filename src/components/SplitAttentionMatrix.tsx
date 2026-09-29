import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../data';

export const SplitAttentionMatrix: React.FC = () => {
  const navigate = useNavigate();
  const [activeSide, setActiveSide] = useState<'WATCHING' | 'MISSING' | null>(null);

  const mainstreamCompanies = companies.filter(c => ['c_swiggy', 'c_postman', 'c_zomato', 'c_ather'].includes(c.id));
  const underTheRadarCompanies = companies.filter(c => ['c_sarvam', 'c_torus', 'c_agnikul', 'c_skyroot'].includes(c.id));

  return (
    <div className="w-full bg-[#0f1823] border border-[#1e2d3d] rounded overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#2a3a4d] flex items-center justify-between bg-[#0f1823]">
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">ATTENTION DIVERGENCE</span>
        </div>
        <span className="font-mono text-[10px] text-[#4a5a6d]">COMPARATIVE VIEW</span>
      </div>

      {/* 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Everybody Watching */}
        <div
          onMouseEnter={() => setActiveSide('WATCHING')}
          onMouseLeave={() => setActiveSide(null)}
          className={`border-r border-[#1e2d3d] transition-all ${
            activeSide === 'WATCHING' ? 'bg-[#141e2d]' : activeSide === 'MISSING' ? 'opacity-50' : ''
          }`}
        >
          <div className="px-3 py-1.5 border-b border-[#1e2d3d] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#e8edf3] font-semibold uppercase">EVERYBODY IS WATCHING</span>
            <span className="font-mono text-[10px] text-[#4a5a6d]">HIGH VIS</span>
          </div>
          {mainstreamCompanies.map((comp) => (
            <div
              key={comp.id}
              onClick={() => navigate(`/company/${comp.id}`)}
              className="px-3 py-2 border-b border-[#1e2d3d] cursor-pointer hover:bg-[#1a2636] transition-colors flex items-center justify-between"
            >
              <div>
                <span className="text-[12px] font-medium text-[#e8edf3]">{comp.name}</span>
                <span className="text-[10px] text-[#4a5a6d] ml-2">{comp.tagline}</span>
              </div>
              <span className="font-mono text-[11px] text-[#6b7c93]">{comp.valuation?.claim || comp.totalFunding?.claim}</span>
            </div>
          ))}
        </div>

        {/* Right: You May Be Missing */}
        <div
          onMouseEnter={() => setActiveSide('MISSING')}
          onMouseLeave={() => setActiveSide(null)}
          className={`transition-all ${
            activeSide === 'MISSING' ? 'bg-[#141e2d]' : activeSide === 'WATCHING' ? 'opacity-50' : ''
          }`}
        >
          <div className="px-3 py-1.5 border-b border-[#1e2d3d] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#ff8c00] font-semibold uppercase">YOU MAY BE MISSING</span>
            <span className="font-mono text-[10px] text-[#00c853] font-medium">HIGH SIGNAL</span>
          </div>
          {underTheRadarCompanies.map((comp) => (
            <div
              key={comp.id}
              onClick={() => navigate(`/company/${comp.id}`)}
              className="px-3 py-2 border-b border-[#1e2d3d] cursor-pointer hover:bg-[#1a2636] transition-colors"
            >
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-[#e8edf3]">{comp.name}</span>
                  <span className="font-mono text-[10px] text-[#4a5a6d]">{comp.sector}</span>
                </div>
                <span className="font-mono text-[10px] text-[#00c853]">SIGNAL+</span>
              </div>
              {comp.whyNow ? (
                <p className="text-[11px] text-[#6b7c93]">
                  <span className="text-[#4a5a6d]">Catalyst:</span> {comp.whyNow.whatChanged}
                </p>
              ) : (
                <p className="text-[11px] text-[#4a5a6d]">{comp.tagline}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
