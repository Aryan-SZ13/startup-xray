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
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 p-8 pb-24">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2 text-cyan-400">
          <Target className="w-8 h-8" />
          <h1 className="text-3xl font-light tracking-widest text-white">THESIS BUILDER</h1>
        </div>
        <p className="text-gray-500 text-lg">Define your investment thesis. Scan the universe.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111118] border border-white/5 rounded-xl p-6">
            <h2 className="text-sm font-medium text-white mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Parameters
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">Sector Focus</label>
                <div className="relative">
                  <select 
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500/50"
                  >
                    <option>AI</option>
                    <option>SaaS</option>
                    <option>Robotics</option>
                    <option>Fintech</option>
                    <option>Climate</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">Geography</label>
                <div className="relative">
                  <select 
                    value={geography}
                    onChange={(e) => setGeography(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500/50"
                  >
                    <option>India</option>
                    <option>Global</option>
                    <option>US</option>
                    <option>Europe</option>
                    <option>SEA</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">Stage</label>
                <div className="relative">
                  <select 
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500/50"
                  >
                    <option>Pre-Seed</option>
                    <option>Seed</option>
                    <option>Series A</option>
                    <option>Series B+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">Key Signals</label>
                <div className="space-y-2 mt-2">
                  {['Hiring acceleration', 'Revenue growth', 'Top-tier founders'].map((sig, i) => (
                    <label key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <input type="checkbox" className="rounded bg-[#0a0a0f] border-white/20 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-[#111118]" defaultChecked={i===0} />
                      {sig}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleScan}
              className="w-full mt-8 py-3 bg-cyan-500 text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              <Zap className="w-5 h-5" /> SCAN UNIVERSE
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!scanned ? (
            <div className="h-full border border-white/5 border-dashed rounded-2xl flex items-center justify-center p-12 bg-white/[0.02]">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-[#111118] border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <Target className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="text-xl text-white mb-2">Thesis Genome Empty</h3>
                <p className="text-gray-500 text-sm">Define your parameters on the left and scan the universe to find matching companies.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <h3 className="text-lg text-white font-medium">Scan Results</h3>
                <span className="text-sm text-cyan-400">{results.length} matches found</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((company, i) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => navigate(`/company/${company.id}`)}
                    className="bg-[#111118] border border-white/5 hover:border-cyan-500/30 rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{company.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded font-mono uppercase">
                          {92 - i * 4}% Match
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">{company.tagline || company.description}</p>
                      
                      {/* Thesis Genome Fit */}
                      <div className="space-y-1.5 mb-4 p-2.5 rounded bg-black/40 border border-white/5 text-[11px] font-mono">
                        <div className="flex items-center justify-between text-emerald-400">
                          <span>SECTOR FIT</span>
                          <span>✓ {company.sector || company.industry}</span>
                        </div>
                        <div className="flex items-center justify-between text-cyan-300">
                          <span>STAGE FIT</span>
                          <span>✓ {company.stage}</span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>GEOGRAPHY</span>
                          <span>{company.headquarters || 'India'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px]">
                      <span className="text-zinc-500 font-mono">VIEW FULL DOSSIER</span>
                      <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
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
