import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { companies } from '../data';
import { ecosystems } from '../data/ecosystems';

export const EcosystemRadarSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEcosystem, setSelectedEcosystem] = useState<string>('SRM');

  const ECOSYSTEM_TABS = [
    { id: 'SRM', name: 'SRM' },
    { id: 'IIT_MADRAS', name: 'IIT MADRAS' },
    { id: 'CHENNAI', name: 'CHENNAI' },
    { id: 'GLOBAL', name: 'GLOBAL' }
  ];

  const filteredCompanies = companies.filter(c => {
    if (selectedEcosystem === 'GLOBAL') return true;
    return c.ecosystemConnections?.some(ec => ec.ecosystem.toUpperCase() === selectedEcosystem.toUpperCase()) ||
      c.founders?.some(f => f.education?.some(e => e.toUpperCase().includes(selectedEcosystem.replace('_', ' '))));
  });

  const activeEcosystemMeta = ecosystems.find(e => e.id === selectedEcosystem) || {
    name: selectedEcosystem,
    description: 'Active institutional talent and deeptech incubation cluster.',
    companyCount: 350,
    founderCount: 420
  };

  return (
    <div className="w-full bg-white border border-slate-200 shadow-xs rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">ECOSYSTEM CORRIDOR</span>
          <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{activeEcosystemMeta.companyCount}+ STARTUPS</span>
          <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{activeEcosystemMeta.founderCount}+ FOUNDERS</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {ECOSYSTEM_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedEcosystem(tab.id)}
              className={`px-2.5 py-1 text-[10px] font-mono font-bold transition-all rounded cursor-pointer ${
                selectedEcosystem === tab.id
                  ? 'text-orange-600 bg-orange-50 border border-orange-200 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Description Bar */}
      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/40 flex items-center justify-between">
        <p className="text-[11px] text-slate-600">{activeEcosystemMeta.description}</p>
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
          <span className="font-semibold text-slate-700">SRM IST</span><span className="text-slate-300">⇄</span>
          <span className="font-semibold text-slate-700">IIT Madras</span><span className="text-slate-300">⇄</span>
          <span className="font-semibold text-slate-700">Anna Univ</span><span className="text-slate-300">⇄</span>
          <span className="font-semibold text-slate-700">VIT</span>
        </div>
      </div>

      {/* Companies Table */}
      <div>
        {/* Table Header */}
        <div className="grid grid-cols-12 px-4 py-2 border-b border-slate-200 bg-slate-50/80 font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
          <div className="col-span-3">ENTITY</div>
          <div className="col-span-3">TAGLINE</div>
          <div className="col-span-2">STAGE</div>
          <div className="col-span-3">CONNECTION</div>
          <div className="col-span-1 text-right">LINK</div>
        </div>

        {filteredCompanies.slice(0, 5).map((comp) => {
          const conn = comp.ecosystemConnections?.find(ec => ec.ecosystem.toUpperCase() === selectedEcosystem.toUpperCase()) || comp.ecosystemConnections?.[0];
          return (
            <div
              key={comp.id}
              onClick={() => navigate(`/company/${comp.id}`)}
              className="grid grid-cols-12 px-4 py-2.5 border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors items-center"
            >
              <div className="col-span-3 text-[12px] font-bold text-slate-900">{comp.name}</div>
              <div className="col-span-3 text-[11px] text-slate-500 truncate">{comp.tagline}</div>
              <div className="col-span-2 font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded w-fit">{comp.stage}</div>
              <div className="col-span-3 text-[11px] text-orange-600 font-semibold">{conn?.label || `${selectedEcosystem} Link`}</div>
              <div className="col-span-1 text-right">
                <ArrowUpRight size={13} className="text-blue-600 inline" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
        <span className="font-mono text-[10px] text-slate-500 font-medium">VERIFIED INSTITUTIONAL RELATIONSHIPS</span>
        <button
          onClick={() => navigate('/ecosystem')}
          className="font-mono text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          EXPLORE <ChevronRight size={10} />
        </button>
      </div>
    </div>
  );
};
