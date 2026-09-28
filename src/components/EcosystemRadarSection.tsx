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
    { id: 'IIT_MADRAS', name: 'IIT Madras' },
    { id: 'CHENNAI', name: 'Chennai Corridor' },
    { id: 'GLOBAL', name: 'Global Frontier' }
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
    <div className="relative w-full rounded-3xl border border-white/[0.08] bg-[#0c0c0e]/70 backdrop-blur-3xl shadow-xl p-6 lg:p-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-white/[0.06] gap-4">
        <div>
          <span className="text-[11px] font-medium text-[#2997ff] uppercase tracking-wider block mb-1">
            Institutional Corridor
          </span>
          <h3 className="text-xl font-semibold text-white tracking-tight">
            {activeEcosystemMeta.name} Network
          </h3>
          <p className="text-xs text-[#86868b] mt-1 max-w-lg">
            {activeEcosystemMeta.description}
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex items-center p-1 rounded-full bg-white/[0.05] border border-white/[0.06] self-start md:self-center">
          {ECOSYSTEM_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedEcosystem(tab.id)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedEcosystem === tab.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Corridor Connections Strip */}
      <div className="mb-6 px-4 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-wrap items-center justify-between text-xs text-[#86868b] gap-3">
        <div className="flex items-center gap-2">
          <span>SRM IST</span>
          <span className="text-[#3a3a3c]">⇄</span>
          <span>IIT Madras</span>
          <span className="text-[#3a3a3c]">⇄</span>
          <span>Anna Univ</span>
          <span className="text-[#3a3a3c]">⇄</span>
          <span>VIT</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>{activeEcosystemMeta.companyCount}+ Startups</span>
          <span>{activeEcosystemMeta.founderCount}+ Founders</span>
        </div>
      </div>

      {/* Companies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(filteredCompanies.length > 0 ? filteredCompanies : companies).slice(0, 3).map((comp) => {
          const conn = comp.ecosystemConnections?.find(ec => ec.ecosystem.toUpperCase() === selectedEcosystem.toUpperCase()) || comp.ecosystemConnections?.[0];

          return (
            <div
              key={comp.id}
              onClick={() => navigate(`/company/${comp.id}`)}
              className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.12] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#2997ff] transition-colors">
                    {comp.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#86868b]">
                    {comp.stage}
                  </span>
                </div>
                <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed mb-4">
                  {comp.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.05] text-[11px] text-[#2997ff] flex items-center justify-between">
                <span>{conn?.label || `${selectedEcosystem} Connection`}</span>
                <ArrowUpRight size={12} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#86868b]">
        <span>Verified institutional relationships</span>
        <button
          onClick={() => navigate('/ecosystem')}
          className="text-[#2997ff] hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-medium"
        >
          <span>Explore corridor</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
};
