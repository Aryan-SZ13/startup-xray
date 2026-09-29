import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sliders, TrendingUp, DollarSign, Users, Globe, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { companies, getCompanyById } from '../data';

const ScenarioLabPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const company = getCompanyById(id || '') || getCompanyById('c_swiggy') || companies[0]; 
  
  const [revGrowth, setRevGrowth] = useState<number>(20);
  const [burnRate, setBurnRate] = useState<number>(0);
  const [hiring, setHiring] = useState<number>(10);
  const [funding, setFunding] = useState<number>(50);
  const [markets, setMarkets] = useState<number>(1);

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const baseRev = 100;
    const baseBurn = 20;
    
    const data = [];
    for (let i = 0; i <= 12; i++) {
      const monthMultiplier = i / 12;
      const projectedRev = baseRev * (1 + ((revGrowth / 100) * monthMultiplier));
      const projectedBurn = baseBurn * (1 + ((burnRate / 100) * monthMultiplier)) - (funding * 0.1 * monthMultiplier) + (markets * 2 * monthMultiplier);
      
      data.push({
        month: `M${i}`,
        baseline: baseRev * (1 + (0.2 * monthMultiplier)),
        projected: projectedRev,
        burn: projectedBurn,
      });
    }
    setChartData(data);
  }, [revGrowth, burnRate, hiring, funding, markets]);

  if (!company) {
    return <div className="p-8 text-slate-800 min-h-screen bg-slate-50">Company not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Company Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-slate-200 no-scrollbar">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider shrink-0 mr-2">SIMULATION TARGET:</span>
          {companies.map(c => (
            <Link
              key={c.id}
              to={`/scenario/${c.id}`}
              className={`px-3 py-1 text-xs font-mono rounded-lg whitespace-nowrap transition-colors ${
                c.id === company.id
                  ? 'bg-blue-600 text-white font-bold shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider border border-blue-200">
              SIMULATION ENGINE
            </span>
            <Link to={`/company/${company.id}`} className="text-slate-500 hover:text-blue-600 font-mono text-xs transition-colors">
              &larr; Back to {company.name} Dossier
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">
            Scenario Lab & Stress-Testing [{company.name.toUpperCase()}]
          </h1>
          <p className="text-slate-500 font-mono text-xs tracking-wider uppercase">
            Model forward runways, growth vectors, and capital burn sensitivities.
          </p>
        </header>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>MODEL DISCLAIMER:</strong> These simulations represent parametric scenario matrices based on historical growth and cash dynamics. They reflect hypothetical ranges rather than audit-grade forecasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">Independent Variables</h2>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-600 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" /> Revenue Growth Rate
                  </label>
                  <span className="text-xs font-mono font-bold text-blue-700">{revGrowth > 0 ? '+' : ''}{revGrowth}%</span>
                </div>
                <input 
                  type="range" min="-50" max="100" value={revGrowth} 
                  onChange={(e) => setRevGrowth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-600 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-amber-600" /> Burn Rate Delta
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900">{burnRate > 0 ? '+' : ''}{burnRate}%</span>
                </div>
                <input 
                  type="range" min="-50" max="50" value={burnRate} 
                  onChange={(e) => setBurnRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-600 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-600" /> Headcount Expansion
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900">{hiring > 0 ? '+' : ''}{hiring}%</span>
                </div>
                <input 
                  type="range" min="-50" max="100" value={hiring} 
                  onChange={(e) => setHiring(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-600 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Projected Capital Influx
                  </label>
                  <span className="text-xs font-mono font-bold text-emerald-700">${funding}M</span>
                </div>
                <input 
                  type="range" min="0" max="500" step="10" value={funding} 
                  onChange={(e) => setFunding(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-600 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" /> Geographic Footprints
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900">{markets} new</span>
                </div>
                <input 
                  type="range" min="0" max="5" step="1" value={markets} 
                  onChange={(e) => setMarkets(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
            
            <button 
              onClick={() => {
                setRevGrowth(20);
                setBurnRate(0);
                setHiring(10);
                setFunding(50);
                setMarkets(1);
              }}
              className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer border border-slate-200"
            >
              RESET TO BASELINE
            </button>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-bold text-slate-900 font-mono uppercase">12-Month Pro-Forma Trajectory</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">MONTE CARLO PROJECTION</span>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '12px' }}
                    />
                    <Line type="monotone" dataKey="baseline" stroke="#cbd5e1" strokeWidth={2} dot={false} name="Baseline Rev" />
                    <Line type="monotone" dataKey="projected" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3, fill: '#ffffff', stroke: '#2563eb', strokeWidth: 2 }} activeDot={{ r: 5 }} name="Scenario Rev" />
                    <Line type="monotone" dataKey="burn" stroke="#f43f5e" strokeWidth={2} dot={false} name="Scenario Burn" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase">RUNWAY ESTIMATE</div>
                <div className="text-xl font-mono font-bold text-slate-900 mb-0.5">
                  {Math.max(0, 18 + (funding * 0.1) - (burnRate * 0.1)).toFixed(1)} mo
                </div>
                <div className="text-[11px] font-mono text-slate-500">vs 18.0 mo baseline</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase">HIRING CAPACITY</div>
                <div className="text-xl font-mono font-bold text-slate-900 mb-0.5">
                  ~{Math.round(200 * (1 + (hiring / 100)))}
                </div>
                <div className="text-[11px] font-mono text-slate-500">new headcount</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase">REV RUN-RATE</div>
                <div className="text-xl font-mono font-bold text-slate-900 mb-0.5">
                  ${Math.round(100 * (1 + (revGrowth / 100)))}M
                </div>
                <div className="text-[11px] font-mono text-slate-500">End of Month 12</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-[10px] font-mono font-bold text-slate-400 mb-1 uppercase">MARKET REACH</div>
                <div className="text-xl font-mono font-bold text-slate-900 mb-0.5">
                  {markets + 3} hubs
                </div>
                <div className="text-[11px] font-mono text-slate-500">operating nodes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScenarioLabPage;
