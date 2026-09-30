import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Eye, Activity, X, Clock, AlertTriangle, Sparkles, Cpu, Radio, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppState } from '../store/AppContext';
import { getCompanyById } from '../data';
import { IntelligenceAPI, RankedSignal } from '../services/api';

const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useAppState();
  const [activeTab, setActiveTab] = useState<'WATCHLIST' | 'ML_SIGNALS'>('ML_SIGNALS');

  const rankedSignals = useMemo(() => {
    return IntelligenceAPI.getRankedSignals(30);
  }, []);

  const handleRemove = (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromWatchlist(companyId);
  };


  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'HIGH': return 'text-rose-700 border-rose-200 bg-rose-50';
      case 'MEDIUM': return 'text-amber-700 border-amber-200 bg-amber-50';
      case 'LOW': return 'text-slate-600 border-slate-200 bg-slate-100';
      default: return 'text-slate-600 border-slate-200 bg-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10 pb-24">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">
            <Eye size={14} /> SURVEILLANCE DESK
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">
            Watchlist & Delta Radar
          </h1>
          <p className="text-slate-600 font-mono text-xs tracking-wider uppercase">
            Active entity monitoring: delta tracking, newly observed signals, and state mutations.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <button
                onClick={() => setActiveTab('ML_SIGNALS')}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'ML_SIGNALS'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles size={14} className={activeTab === 'ML_SIGNALS' ? 'text-amber-300' : 'text-blue-600'} />
                <span>ML-RANKED ALPHA SIGNALS</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${activeTab === 'ML_SIGNALS' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {rankedSignals.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('WATCHLIST')}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'WATCHLIST'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Eye size={14} />
                <span>MY RADAR DESK</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${activeTab === 'WATCHLIST' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {watchlist.length}
                </span>
              </button>
            </div>

            <div className="text-xs font-mono text-slate-500">
              {activeTab === 'ML_SIGNALS' ? '5-Factor Model: Recency (30%) • Confidence (25%) • Impact (20%) • Source (15%) • Early Alpha (10%)' : 'Active entity tracking across corporate filings & delta logs'}
            </div>
          </div>
        </header>

        {activeTab === 'ML_SIGNALS' ? (
          <div className="space-y-4">
            {rankedSignals.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      item.tier === 'ALPHA' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      item.tier === 'HIGH_CONVICTION' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.tier === 'SURGING' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {item.tier} • SCORE {item.compositeScore}
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold">
                      {item.signal.type}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400">
                      {item.signal.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.signal.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.signal.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-100">
                    <span>Recency: <strong className="text-slate-700">{item.breakdown.recencyScore}</strong></span>
                    <span>•</span>
                    <span>Confidence: <strong className="text-slate-700">{item.breakdown.confidenceScore}</strong></span>
                    <span>•</span>
                    <span>Impact: <strong className="text-slate-700">{item.breakdown.impactScore}</strong></span>
                    <span>•</span>
                    <span>Source Veracity: <strong className="text-slate-700">{item.breakdown.sourceScore}</strong></span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <div className="font-bold text-sm text-slate-900">{item.companyName}</div>
                    <div className="text-[10px] font-mono text-slate-400">Target Entity</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/company/${item.companyId}`)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 transition-colors cursor-pointer"
                    >
                      DOSSIER
                    </button>
                    <button
                      onClick={() => navigate(`/analyst?company=${item.companyId}`)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles size={11} />
                      <span>RAG</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : watchlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 px-6 border border-slate-200 rounded-2xl bg-white shadow-xs"
          >
            <Activity className="w-12 h-12 text-slate-300 mb-4" />
            <h2 className="text-xl font-bold mb-2 text-slate-900">Your radar is empty</h2>
            <p className="text-slate-500 mb-6 text-center max-w-md text-sm">Start watching companies to track changes and receive real-time updates on key capital & leadership events.</p>
            <Link to="/company/c_swiggy" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-mono text-xs font-bold flex items-center gap-2 shadow-xs">
              <Search className="w-4 h-4" /> Track Swiggy Profile
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.08 }}
                    className="border border-slate-200 rounded-xl bg-white p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xl text-slate-800">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">{company.name}</h2>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-xs font-mono text-slate-500">{company.industry}</span>
                            <span className="text-slate-300">&bull;</span>
                            <span className="text-xs font-mono text-blue-600 font-semibold">{company.stage}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                          onClick={() => navigate(`/company/${company.id}`)}
                          className="flex-1 md:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 transition-colors cursor-pointer"
                        >
                          DOSSIER
                        </button>
                        <button 
                          onClick={() => navigate(`/xray/${company.id}`)}
                          className="flex-1 md:flex-none px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
                        >
                          RUN X-RAY
                        </button>
                        <button 
                          onClick={(e) => handleRemove(company.id, e)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove from watchlist"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5">
                      <h3 className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
                        DELTA STREAM (WHAT CHANGED SINCE LAST INSPECTION)
                      </h3>
                      
                      {item.changes && item.changes.length > 0 ? (
                        <div className="space-y-2.5">
                          {item.changes.map((change: any, i: number) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getImportanceColor(change.importance)}`}>
                                {change.importance}
                              </span>
                              <span className="text-xs font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                                {change.type}
                              </span>
                              <p className="text-xs text-slate-700 font-medium flex-1">{change.description}</p>
                              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {change.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                          <AlertTriangle className="w-3.5 h-3.5" /> No new state mutations detected.
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase border-t border-slate-50 pt-3">
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
