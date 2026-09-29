import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Filter, MapPin, TrendingUp, ChevronDown } from 'lucide-react';
import { companies } from '../data';
import { useAppState } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

export default function ThesisPage() {
  const navigate = useNavigate();
  const [sector, setSector] = useState('AI');
  const [stage, setStage] = useState('Seed');
  const [geography, setGeography] = useState('India');
  const [scanned, setScanned] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleScan = () => {
    // Simple mock filter
    const filtered = companies.filter(c => true); // just show all for demo
    setResults(filtered);
    setScanned(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10 pb-24">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">
          <Target size={14} /> MANDATE CONFIGURATOR
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">Investment Thesis Lab</h1>
        <p className="text-slate-600 font-mono text-xs tracking-wider uppercase">Define your deployment mandates. Screen multi-parameter intelligence signals.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-blue-600" /> Thesis Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-500 mb-1.5 uppercase">Sector Focus</label>
                <div className="relative">
                  <select 
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono text-slate-800 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option>AI & Foundation Models</option>
                    <option>SaaS & DevTools</option>
                    <option>Robotics & Hardware</option>
                    <option>Fintech & Payments</option>
                    <option>Climate & DeepTech</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-500 mb-1.5 uppercase">Geography</label>
                <div className="relative">
                  <select 
                    value={geography}
                    onChange={(e) => setGeography(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono text-slate-800 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option>India & South Asia</option>
                    <option>Global Markets</option>
                    <option>US & North America</option>
                    <option>Europe</option>
                    <option>Southeast Asia</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-500 mb-1.5 uppercase">Maturity / Stage</label>
                <div className="relative">
                  <select 
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono text-slate-800 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option>Pre-Seed / Angel</option>
                    <option>Seed / Early</option>
                    <option>Series A Breakout</option>
                    <option>Growth / Pre-IPO</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-500 mb-1.5 uppercase">Required Catalysts</label>
                <div className="space-y-2 mt-2">
                  {['Hiring velocity acceleration', 'Operating margin expansion', 'Tier-1 institutional co-investor'].map((sig, i) => (
                    <label key={i} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked={i===0} />
                      {sig}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleScan}
              className="w-full mt-6 py-2.5 bg-blue-600 text-white font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              <Zap className="w-4 h-4" /> SCAN MANDATE MATCHES
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!scanned ? (
            <div className="h-full border border-slate-200 border-dashed rounded-xl flex items-center justify-center p-12 bg-white min-h-[380px]">
              <div className="text-center max-w-md">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Awaiting Mandate Execution</h3>
                <p className="text-slate-500 text-xs">Configure your deployment criteria on the left and scan the universe to filter matching company profiles.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h3 className="text-sm font-mono font-bold text-slate-900 uppercase">Screened Entities</h3>
                <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{results.length} matches found</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((company, i) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/company/${company.id}`)}
                    className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors">{company.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-mono uppercase font-bold">
                          {92 - i * 4}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">{company.tagline || company.description}</p>
                      
                      {/* Thesis Genome Fit */}
                      <div className="space-y-1 mb-4 p-2.5 rounded bg-slate-50 border border-slate-200/80 text-[11px] font-mono">
                        <div className="flex items-center justify-between text-emerald-700 font-medium">
                          <span>SECTOR FIT</span>
                          <span>✓ {company.sector || company.industry}</span>
                        </div>
                        <div className="flex items-center justify-between text-blue-700 font-medium">
                          <span>STAGE FIT</span>
                          <span>✓ {company.stage}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>GEOGRAPHY</span>
                          <span>{company.headquarters || 'India'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-400 font-mono">INSPECT PROFILE</span>
                      <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
