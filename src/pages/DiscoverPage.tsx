import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, Zap, Target, TrendingUp, Users, SearchIcon } from 'lucide-react';
import { recommendations, getCompanyById, marketSectors } from '../data';
import { useAppState } from '../store/AppContext';

export default function DiscoverPage() {
  const navigate = useNavigate();
  const { investigatedCompanies } = useAppState();
  const hasHistory = investigatedCompanies && investigatedCompanies.length > 0;
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 p-8 pb-24">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2 text-cyan-400">
          <Compass className="w-8 h-8" />
          <h1 className="text-3xl font-light tracking-widest text-white">DISCOVER</h1>
        </div>
        <p className="text-gray-500 text-lg">Find what others miss.</p>
      </header>

      {hasHistory ? (
        <section className="mb-16">
          <h2 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase border-b border-white/5 pb-2">Because you investigated...</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, i) => {
              const company = getCompanyById(rec.companyId);
              if (!company) return null;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => navigate(`/company/${company.id}`)}
                  className="bg-[#111118] border border-white/5 rounded-xl p-5 hover:border-cyan-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium text-white group-hover:text-cyan-400 transition-colors">{company.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400">
                      {rec.type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 line-clamp-2">{company.description}</p>
                  </div>
                  
                  <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                    <div className="text-[10px] font-bold tracking-wider text-cyan-500 mb-1 flex items-center gap-1">
                      <Target className="w-3 h-3" /> WHY THIS
                    </div>
                    <ul className="space-y-1">
                      {((rec as any).reasons || [(rec as any).reason]).map((r: string, rIdx: number) => (
                        <li key={rIdx} className="text-xs text-gray-300 flex items-start gap-1">
                          <span className="text-cyan-400">•</span> {r}
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
        <section className="mb-16">
          <div className="bg-[#111118] border border-cyan-500/20 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <SearchIcon className="w-12 h-12 text-cyan-500/50 mx-auto mb-4" />
            <h2 className="text-xl text-white mb-2">Start by investigating a company</h2>
            <p className="text-sm text-gray-400 mb-6">Search for a company to generate personalized recommendations based on its network, sector, and characteristics.</p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm) {
                    navigate(`/company/${searchTerm.toLowerCase()}`);
                  }
                }}
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase border-b border-white/5 pb-2">Sector Explorer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketSectors.map((sector, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#111118] border border-white/5 hover:border-white/20 rounded-xl p-5 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-white font-medium">{sector.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {sector.subSectors.slice(0, 3).map((sub: any, j: number) => (
                  <span key={j} className="text-[10px] px-2 py-1 bg-[#0a0a0f] rounded text-gray-400 border border-white/5">
                    {typeof sub === 'string' ? sub : sub.name}
                  </span>
                ))}
                {sector.subSectors.length > 3 && (
                  <span className="text-[10px] px-2 py-1 bg-[#0a0a0f] rounded text-gray-500 border border-transparent">
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
