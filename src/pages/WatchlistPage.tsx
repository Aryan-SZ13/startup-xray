import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Eye, Activity, X, Clock, AlertTriangle } from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { getCompanyById } from '../data';

const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useAppState();

  const handleRemove = (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromWatchlist(companyId);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'HIGH': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'MEDIUM': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'LOW': return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
      default: return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">YOUR RADAR</h1>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Companies you're watching and what's changed.</p>
        </header>

        {watchlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 px-6 border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-md"
          >
            <Activity className="w-16 h-16 text-zinc-700 mb-6" />
            <h2 className="text-2xl font-bold mb-3 text-white">Your radar is empty</h2>
            <p className="text-zinc-400 mb-8 text-center max-w-md">Start watching companies to track changes and receive signals on intelligence updates.</p>
            <Link to="/company/c_swiggy" className="px-6 py-3 bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff]/20 border border-[#00d4ff]/30 rounded-lg transition-colors font-mono text-sm font-bold flex items-center gap-2">
              <Search className="w-4 h-4" /> Try searching for Swiggy
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {watchlist.map((item: any, index: number) => {
                const company = getCompanyById(item.companyId);
                if (!company) return null;

                return (
                  <motion.div
                    key={item.companyId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-white/10 rounded-xl bg-[#0d0d14] p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl text-white/50">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{company.name}</h2>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-xs font-mono text-zinc-400">{company.industry}</span>
                            <span className="text-zinc-600">&bull;</span>
                            <span className="text-xs font-mono text-zinc-400">{company.stage}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                          onClick={() => navigate(`/company/${company.id}`)}
                          className="flex-1 md:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold transition-colors"
                        >
                          VIEW
                        </button>
                        <button 
                          onClick={() => navigate(`/xray/${company.id}`)}
                          className="flex-1 md:flex-none px-4 py-2 bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30 rounded-lg text-sm font-bold transition-colors"
                        >
                          X-RAY
                        </button>
                        <button 
                          onClick={(e) => handleRemove(company.id, e)}
                          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Remove from watchlist"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-500 mb-4">WHAT CHANGED SINCE YOU LAST LOOKED?</h3>
                      
                      {item.changes && item.changes.length > 0 ? (
                        <div className="space-y-3">
                          {item.changes.map((change: any, i: number) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                              <span className={`text-[10px] font-mono px-2 py-1 rounded border ${getImportanceColor(change.importance)}`}>
                                {change.importance}
                              </span>
                              <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded">
                                {change.type}
                              </span>
                              <p className="text-sm text-zinc-300 flex-1">{change.description}</p>
                              <span className="text-xs text-zinc-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {change.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-zinc-500 text-sm italic">
                          <AlertTriangle className="w-4 h-4" /> No new signals detected.
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase">
                      <span>Added: {item.addedAt ? new Date(item.addedAt).toLocaleDateString() : '—'}</span>
                      <span>Last checked: {item.lastChecked ? new Date(item.lastChecked).toLocaleDateString() : '—'}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
export default WatchlistPage;
