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
    <div className="w-full bg-[#0f1823] border border-[#1e2d3d] rounded overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#2a3a4d] flex items-center justify-between bg-[#0f1823]">
        <div className="flex items-center gap-3">
          <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">ECOSYSTEM CORRIDOR</span>
          <span className="font-mono text-[10px] text-[#4a5a6d]">{activeEcosystemMeta.companyCount}+ STARTUPS</span>
          <span className="font-mono text-[10px] text-[#4a5a6d]">{activeEcosystemMeta.founderCount}+ FOUNDERS</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0">
          {ECOSYSTEM_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedEcosystem(tab.id)}
              className={`px-2 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer border-b-2 ${
                selectedEcosystem === tab.id
                  ? 'text-[#ff8c00] border-[#ff8c00]'
                  : 'text-[#4a5a6d] hover:text-[#8899aa] border-transparent'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Description Bar */}
      <div className="px-3 py-1.5 border-b border-[#1e2d3d] bg-[#0a0e17] flex items-center justify-between">
        <p className="text-[11px] text-[#6b7c93]">{activeEcosystemMeta.description}</p>
        <div className="flex items-center gap-3 font-mono text-[10px] text-[#4a5a6d]">
          <span>SRM IST</span><span className="text-[#2a3a4d]">⇄</span>
          <span>IIT Madras</span><span className="text-[#2a3a4d]">⇄</span>
          <span>Anna Univ</span><span className="text-[#2a3a4d]">⇄</span>
          <span>VIT</span>
        </div>
      </div>

      {/* Companies Table */}
      <div>
        {/* Table Header */}
        <div className="grid grid-cols-12 px-3 py-1 border-b border-[#2a3a4d] bg-[#0f1823] font-mono text-[10px] text-[#4a5a6d] uppercase tracking-wider">
          <div className="col-span-3">ENTITY</div>
          <div className="col-span-3">TAGLINE</div>
          <div className="col-span-2">STAGE</div>
          <div className="col-span-3">CONNECTION</div>
          <div className="col-span-1 text-right">LINK</div>
        </div>

        {(filteredCompanies.length > 0 ? filteredCompanies : companies).slice(0, 5).map((comp) => {
          const conn = comp.ecosystemConnections?.find(ec => ec.ecosystem.toUpperCase() === selectedEcosystem.toUpperCase()) || comp.ecosystemConnections?.[0];
          return (
            <div
              key={comp.id}
              onClick={() => navigate(`/company/${comp.id}`)}
              className="grid grid-cols-12 px-3 py-2 border-b border-[#1e2d3d] cursor-pointer hover:bg-[#141e2d] transition-colors items-center"
            >
              <div className="col-span-3 text-[12px] font-medium text-[#e8edf3]">{comp.name}</div>
              <div className="col-span-3 text-[11px] text-[#6b7c93] truncate">{comp.tagline}</div>
              <div className="col-span-2 font-mono text-[10px] text-[#4a5a6d]">{comp.stage}</div>
              <div className="col-span-3 text-[11px] text-[#ff8c00]">{conn?.label || `${selectedEcosystem} Link`}</div>
              <div className="col-span-1 text-right">
                <ArrowUpRight size={11} className="text-[#2196f3] inline" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-[#2a3a4d] bg-[#0a0e17] flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#4a5a6d]">VERIFIED INSTITUTIONAL RELATIONSHIPS</span>
        <button
          onClick={() => navigate('/ecosystem')}
          className="font-mono text-[10px] text-[#2196f3] hover:text-[#e8edf3] flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          EXPLORE <ChevronRight size={10} />
        </button>
      </div>
    </div>
  );
};
