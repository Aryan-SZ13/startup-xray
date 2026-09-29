import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Network, Building2, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10 pb-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">
            <Building2 size={14} /> INTELLIGENCE UNIVERSE
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">
            Company Directory
          </h1>
          <p className="text-slate-600 font-mono text-xs tracking-wider uppercase">
            Intelligence-grade entity registry across private & public capital markets.
          </p>
        </header>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search companies, descriptions, or tags..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select 
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3.5 pr-9 text-slate-800 focus:outline-none focus:border-blue-500 font-mono text-xs min-w-[150px] cursor-pointer"
              >
                {industries.map((ind: any) => (
                  <option key={ind} value={ind}>{ind === 'ALL' ? 'All Industries' : ind}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select 
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3.5 pr-9 text-slate-800 focus:outline-none focus:border-blue-500 font-mono text-xs min-w-[130px] cursor-pointer"
              >
                {stages.map((stg: any) => (
                  <option key={stg} value={stg}>{stg === 'ALL' ? 'All Stages' : stg}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Showing <strong className="text-slate-900 font-bold">{filteredCompanies.length}</strong> verified profiles</span>
          <span>SYSTEM READY</span>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="py-20 text-center border border-slate-200 rounded-xl bg-white shadow-xs">
            <p className="text-slate-500 font-mono text-sm">No companies match your search criteria.</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterIndustry('ALL'); setFilterStage('ALL'); }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-mono text-xs font-semibold cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company: any, i: number) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => navigate(`/company/${company.id}`)}
                className="group cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-lg text-slate-800 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors shrink-0">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                        {company.name}
                        <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                      </h2>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">{company.industry}</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-600 mb-5 line-clamp-2 leading-relaxed">
                    {company.tagline}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3.5 mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200/60">
                    <MapPin className="w-3 h-3 text-slate-400" /> {company.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold">
                      {company.stage}
                    </span>
                    {company.ecosystemConnections && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200/80 font-semibold flex items-center gap-1" title="Ecosystem Connections">
                        <Network className="w-3 h-3" /> {Array.isArray(company.ecosystemConnections) ? company.ecosystemConnections.length : company.ecosystemConnections}
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
