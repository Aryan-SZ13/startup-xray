import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Network } from 'lucide-react';
import { companies } from '../data';

const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [filterIndustry, setFilterIndustry] = useState('ALL');
  const [filterStage, setFilterStage] = useState('ALL');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const industries = ['ALL', ...Array.from(new Set(companies.map((c: any) => c.industry)))];
  const stages = ['ALL', ...Array.from(new Set(companies.map((c: any) => c.stage)))];

  const filteredCompanies = useMemo(() => {
    return companies.filter((company: any) => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            company.tagline.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = filterIndustry === 'ALL' || company.industry === filterIndustry;
      const matchesStage = filterStage === 'ALL' || company.stage === filterStage;
      return matchesSearch && matchesIndustry && matchesStage;
    });
  }, [searchTerm, filterIndustry, filterStage]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">COMPANIES</h1>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Intelligence-grade company directory.</p>
        </header>

        <div className="mb-8 flex flex-col md:flex-row gap-4 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search companies, descriptions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-all font-mono text-sm"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <select 
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="appearance-none bg-black/50 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-white focus:outline-none focus:border-white/30 font-mono text-sm min-w-[140px]"
              >
                {industries.map((ind: any) => (
                  <option key={ind} value={ind}>{ind === 'ALL' ? 'All Industries' : ind}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
            <div className="relative">
              <select 
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="appearance-none bg-black/50 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-white focus:outline-none focus:border-white/30 font-mono text-sm min-w-[140px]"
              >
                {stages.map((stg: any) => (
                  <option key={stg} value={stg}>{stg === 'ALL' ? 'All Stages' : stg}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="mb-6 text-sm font-mono text-zinc-500">
          Showing {filteredCompanies.length} result{filteredCompanies.length !== 1 ? 's' : ''}
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="py-20 text-center border border-white/5 rounded-xl bg-white/[0.02]">
            <p className="text-zinc-400 font-mono">No companies match your filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterIndustry('ALL'); setFilterStage('ALL'); }}
              className="mt-4 text-[#00d4ff] hover:underline font-mono text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company: any, i: number) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/company/${company.id}`)}
                className="group cursor-pointer p-6 rounded-xl bg-[#111118] border border-white/5 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00d4ff]/10 transition-colors"></div>
                
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center font-bold text-xl text-white group-hover:border-[#00d4ff]/30 transition-colors">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold group-hover:text-[#00d4ff] transition-colors">{company.name}</h2>
                    <p className="text-xs text-zinc-500 font-mono mt-1">{company.industry}</p>
                  </div>
                </div>
                
                <p className="text-sm text-zinc-300 mb-6 line-clamp-2 h-10 relative z-10">
                  {company.tagline}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-4 relative z-10">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded">
                    <MapPin className="w-3 h-3" /> {company.location}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
                      {company.stage}
                    </span>
                    {company.ecosystemConnections && company.ecosystemConnections > 0 && (
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1" title={`${company.ecosystemConnections} Ecosystem Connections`}>
                        <Network className="w-3 h-3" /> {company.ecosystemConnections}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CompaniesPage;
