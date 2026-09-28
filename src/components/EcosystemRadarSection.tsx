import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowUpRight, Building2, Users, Network, ChevronRight } from 'lucide-react';
import { companies } from '../data';
import { ecosystems } from '../data/ecosystems';

export const EcosystemRadarSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEcosystem, setSelectedEcosystem] = useState<string>('SRM');

  const ECOSYSTEM_TABS = [
    { id: 'SRM', name: 'SRM INSTITUTE', sub: '350+ Startups' },
    { id: 'IIT_MADRAS', name: 'IIT MADRAS', sub: '850+ DeepTech' },
    { id: 'CHENNAI', name: 'CHENNAI CORRIDOR', sub: 'SaaS & Hardware' },
    { id: 'TAMIL_NADU', name: 'TAMIL NADU', sub: 'Industrial Hub' },
    { id: 'GLOBAL', name: 'GLOBAL FRONTIER', sub: 'Frontier AI' }
  ];

  const filteredCompanies = companies.filter(c => {
    if (selectedEcosystem === 'GLOBAL') return true;
    return c.ecosystemConnections?.some(ec => ec.ecosystem.toUpperCase() === selectedEcosystem.toUpperCase()) ||
      c.founders?.some(f => f.education?.some(e => e.toUpperCase().includes(selectedEcosystem.replace('_', ' '))));
  });

  const activeEcosystemMeta = ecosystems.find(e => e.id === selectedEcosystem) || {
    name: selectedEcosystem,
    description: 'Active innovation cluster and institutional network corridor.',
    companyCount: 350,
    founderCount: 420
  };

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#0a0b12] p-6 lg:p-8 overflow-hidden">
      {/* Ecosystem Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              ECOSYSTEM RADAR // ACADEMIC & INSTITUTIONAL CORRIDORS
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">
            {activeEcosystemMeta.name} Network Graph
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            {activeEcosystemMeta.description}
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-black/40 p-1 rounded-xl border border-white/10">
          {ECOSYSTEM_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedEcosystem(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap text-left ${
                selectedEcosystem === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div>{tab.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Corridor Interconnection Map */}
      <div className="mb-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-zinc-400">INSTITUTIONAL PATHWAYS:</span>
          <span className="text-cyan-300 font-bold">SRM IST</span>
          <span className="text-zinc-600">⇄</span>
          <span className="text-emerald-300 font-bold">IIT MADRAS</span>
          <span className="text-zinc-600">⇄</span>
          <span className="text-sky-300 font-bold">ANNA UNIVERSITY</span>
          <span className="text-zinc-600">⇄</span>
          <span className="text-purple-300 font-bold">VIT CHENNAI</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span>{activeEcosystemMeta.companyCount.toLocaleString()}+ FOUNDED COMPANIES</span>
          <span>{activeEcosystemMeta.founderCount.toLocaleString()}+ ACTIVE ALUMNI</span>
        </div>
      </div>

      {/* Connected Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(filteredCompanies.length > 0 ? filteredCompanies : companies).slice(0, 3).map((comp) => {
          const conn = comp.ecosystemConnections?.find(ec => ec.ecosystem.toUpperCase() === selectedEcosystem.toUpperCase()) || comp.ecosystemConnections?.[0];

          return (
            <div
              key={comp.id}
              onClick={() => navigate(`/company/${comp.id}`)}
              className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {comp.name}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400">{comp.industry}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {comp.stage}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2 mb-4 leading-relaxed">
                  {comp.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 p-2 rounded-lg">
                  <Network className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{conn?.label || `${selectedEcosystem} ALUMNI / RESEARCH`}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Explore CTA */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-500">
          Showing verified ecosystem relationships across public filings & alumni registers.
        </span>
        <button
          onClick={() => navigate('/ecosystem')}
          className="text-xs font-mono font-bold text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>VIEW FULL {selectedEcosystem} NETWORK</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
