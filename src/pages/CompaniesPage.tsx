import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Network, Building2, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Cpu } from 'lucide-react';
import { companies } from '../data';
import { vectorEngine } from '../services/vectorEngine';

const PAGE_SIZE = 24;

const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [filterIndustry, setFilterIndustry] = useState('ALL');
  const [filterStage, setFilterStage] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [isVectorMode, setIsVectorMode] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchTerm(q);
      setCurrentPage(1);
    }
  }, [searchParams]);

  const industries = ['ALL', ...Array.from(new Set(companies.map((c: any) => c.industry))).sort()];
  const stages = ['ALL', ...Array.from(new Set(companies.map((c: any) => c.stage))).sort()];

  const filteredCompanies = useMemo(() => {
    if (isVectorMode && searchTerm.trim().length > 1) {
      const vectorResults = vectorEngine.search(searchTerm, {
        topK: 120,
        minScore: 0.05,
        sector: filterIndustry,
        stage: filterStage
      });
      return vectorResults.map(vr => ({
        ...vr.company,
        vectorScore: vr.percentage,
        matchedFeatures: vr.matchedFeatures
      }));
    }

    return companies.filter((company: any) => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            company.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (company.sector && company.sector.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (company.headquarters && company.headquarters.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesIndustry = filterIndustry === 'ALL' || company.industry === filterIndustry;
      const matchesStage = filterStage === 'ALL' || company.stage === filterStage;
      return matchesSearch && matchesIndustry && matchesStage;
    });
  }, [searchTerm, filterIndustry, filterStage, isVectorMode]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterIndustry, filterStage, isVectorMode]);

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCompanies.slice(start, start + PAGE_SIZE);
  }, [filteredCompanies, currentPage]);



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
              placeholder={isVectorMode ? "Semantic Vector Query (e.g. 'defense robotics powertrain SRM alumni', 'real-time database latency')..." : "Search companies, descriptions, or tags..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Vector Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-lg font-mono text-xs">
              <button
                type="button"
                onClick={() => setIsVectorMode(false)}
                className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${!isVectorMode ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                KEYWORD
              </button>
              <button
                type="button"
                onClick={() => setIsVectorMode(true)}
                className={`px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 transition-all cursor-pointer ${isVectorMode ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Sparkles size={13} className={isVectorMode ? 'text-amber-300' : ''} />
                <span>VECTOR RAG</span>
              </button>
            </div>

            <div className="relative">
              <select 
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3.5 pr-9 text-slate-800 focus:outline-none focus:border-blue-500 font-mono text-xs min-w-[140px] cursor-pointer"
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
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3.5 pr-9 text-slate-800 focus:outline-none focus:border-blue-500 font-mono text-xs min-w-[120px] cursor-pointer"
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
          <span>Showing <strong className="text-slate-900 font-bold">{filteredCompanies.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredCompanies.length)}</strong> of <strong className="text-slate-900 font-bold">{filteredCompanies.length}</strong> verified profiles {isVectorMode && <strong className="text-blue-600 font-bold ml-1">• VECTOR RERANKED</strong>}</span>
          <span>PAGE {currentPage} OF {totalPages}</span>
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCompanies.map((company: any, i: number) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3) }}
                  onClick={() => navigate(`/company/${company.id}`)}
                  className="group cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3.5 mb-3.5">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-lg text-slate-800 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors shrink-0">
                        {company.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5 truncate">
                            <span className="truncate">{company.name}</span>
                            <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600 shrink-0" />
                          </h2>
                          {company.vectorScore && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold shrink-0 flex items-center gap-1">
                              <Sparkles size={10} className="text-blue-600" /> {company.vectorScore}%
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">{company.industry}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {company.tagline}
                    </p>

                    {company.matchedFeatures && company.matchedFeatures.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {company.matchedFeatures.slice(0, 3).map((f: string) => (
                          <span key={f} className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200/50">
                            #{f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3.5 mt-auto">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200/60 truncate max-w-[180px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> <span className="truncate">{company.headquarters || company.location || 'Global'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {company.valuation?.claim && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold">
                          {company.valuation.claim}
                        </span>
                      )}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold">
                        {company.stage.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <div className="text-xs font-mono text-slate-500">
                  Showing profiles <span className="font-bold text-slate-800">{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span className="font-bold text-slate-800">{Math.min(currentPage * PAGE_SIZE, filteredCompanies.length)}</span> of <span className="font-bold text-slate-800">{filteredCompanies.length}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    title="Previous Page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex items-center gap-1 font-mono text-xs">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                      let pageNum = idx + 1;
                      if (totalPages > 5 && currentPage > 3) {
                        pageNum = Math.min(currentPage - 2 + idx, totalPages - (4 - idx));
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className={`w-8 h-8 rounded-lg font-bold transition-colors ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    title="Next Page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default CompaniesPage;
