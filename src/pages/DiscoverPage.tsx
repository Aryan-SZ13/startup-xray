import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, Zap, Target, TrendingUp, Users, SearchIcon } from 'lucide-react';
import { recommendations, getCompanyById, marketSectors, companies } from '../data';
import { useAppState } from '../store/AppContext';

export default function DiscoverPage() {
  const navigate = useNavigate();
  const { investigatedCompanies } = useAppState();
  const hasHistory = investigatedCompanies && investigatedCompanies.length > 0;
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10 pb-24">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">
          <Compass size={14} /> OPPORTUNITY DISCOVERY
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">Market & Alpha Radar</h1>
        <p className="text-slate-600 font-mono text-xs tracking-wider uppercase">Uncover hidden comparables, supply chain adjacencies, and cross-sector shifts.</p>
      </header>

      {hasHistory ? (
        <section className="mb-12">
          <h2 className="text-xs font-mono font-bold tracking-wider text-slate-500 mb-4 uppercase border-b border-slate-200 pb-2">Because you investigated...</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, i) => {
              const company = getCompanyById(rec.companyId);
              if (!company) return null;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => navigate(`/company/${company.id}`)}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group shadow-xs"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{company.name}</h3>
                    <span className="text-[10px] uppercase font-mono font-semibold tracking-wider px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700">
                      {rec.type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{company.description}</p>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                    <div className="text-[10px] font-mono font-bold tracking-wider text-blue-700 mb-1.5 flex items-center gap-1">
                      <Target className="w-3 h-3" /> CATALYTIC RATIONALE
                    </div>
                    <ul className="space-y-1">
                      {((rec as any).reasons || [(rec as any).reason]).map((r: string, rIdx: number) => (
                        <li key={rIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">•</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="mb-12">
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-xs">
            <SearchIcon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Screen Any Entity Across The Ecosystem</h2>
            <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto">Input an entity identifier to trace relationship vectors, market adjacencies, and cross-sector comparisons.</p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search companies (e.g. Swiggy, Postman, Ather)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    const match = companies.find(c => 
                      c.name.toLowerCase() === searchTerm.trim().toLowerCase() ||
                      c.id.toLowerCase() === searchTerm.trim().toLowerCase()
                    );
                    if (match) {
                      navigate(`/company/${match.id}`);
                    } else {
                      navigate(`/companies?q=${encodeURIComponent(searchTerm.trim())}`);
                    }
                  }
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xs font-mono font-bold tracking-wider text-slate-500 mb-4 uppercase border-b border-slate-200 pb-2">Sector Topologies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketSectors.map((sector, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-xl p-5 cursor-pointer transition-all shadow-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-slate-900 font-bold text-sm">{sector.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mt-3">
                {sector.subSectors.slice(0, 3).map((sub: any, j: number) => (
                  <span key={j} className="text-[10px] font-mono px-2 py-0.5 bg-slate-50 rounded text-slate-600 border border-slate-200">
                    {typeof sub === 'string' ? sub : sub.name}
                  </span>
                ))}
                {sector.subSectors.length > 3 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-500">
                    +{sector.subSectors.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
