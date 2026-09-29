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
    return <div className="p-8 text-white min-h-screen bg-[#0a0a0f]">Company not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Company Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-[#1e2d3d] no-scrollbar">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider shrink-0 mr-2">SIMULATION TARGET:</span>
          {companies.map(c => (
            <Link
              key={c.id}
              to={`/scenario/${c.id}`}
              className={`px-3 py-1 text-xs font-mono rounded whitespace-nowrap transition-colors ${
                c.id === company.id
                  ? 'bg-[#ff8c00] text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#ff8c00] bg-[#ff8c00]/10 px-2 py-1 rounded text-xs font-mono font-bold tracking-widest border border-[#ff8c00]/20">SIMULATION ENGINE</span>
            <Link to={`/company/${company.id}`} className="text-zinc-400 hover:text-white font-mono text-sm transition-colors">
              &larr; Back to {company.name}
            </Link>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">WHAT IF? [{company.name.toUpperCase()}]</h1>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Explore hypothetical stress tests and operational scenarios.</p>
        </header>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-sm text-amber-500/90 leading-relaxed">
            <strong>DISCLAIMER:</strong> These are hypothetical scenarios based on simplified models. They are not predictions of {company.name}'s actual performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-8 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Sliders className="w-5 h-5 text-[#00d4ff]" />
              <h2 className="text-lg font-bold">Variables</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-mono text-zinc-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Revenue Growth
                  </label>
                  <span className="text-sm font-bold text-white">{revGrowth > 0 ? '+' : ''}{revGrowth}%</span>
                </div>
                <input 
                  type="range" min="-50" max="100" value={revGrowth} 
                  onChange={(e) => setRevGrowth(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00d4ff]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-mono text-zinc-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Burn Rate Change
                  </label>
                  <span className="text-sm font-bold text-white">{burnRate > 0 ? '+' : ''}{burnRate}%</span>
                </div>
                <input 
                  type="range" min="-50" max="50" value={burnRate} 
                  onChange={(e) => setBurnRate(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00d4ff]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-mono text-zinc-400 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Hiring Change
                  </label>
                  <span className="text-sm font-bold text-white">{hiring > 0 ? '+' : ''}{hiring}%</span>
                </div>
                <input 
                  type="range" min="-50" max="100" value={hiring} 
                  onChange={(e) => setHiring(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00d4ff]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-mono text-zinc-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> New Funding
                  </label>
                  <span className="text-sm font-bold text-white">${funding}M</span>
                </div>
                <input 
                  type="range" min="0" max="500" step="10" value={funding} 
                  onChange={(e) => setFunding(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00d4ff]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-mono text-zinc-400 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Market Expansion
                  </label>
                  <span className="text-sm font-bold text-white">{markets} new</span>
                </div>
                <input 
                  type="range" min="0" max="5" step="1" value={markets} 
                  onChange={(e) => setMarkets(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00d4ff]"
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
              className="w-full mt-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 text-sm font-bold transition-colors"
            >
              RESET TO BASELINE
            </button>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#111118] border border-white/5 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">12-Month Projection Trajectory</h2>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">SCENARIO PROJECTION</span>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="month" stroke="#ffffff50" tick={{ fill: '#ffffff50', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#ffffff50" tick={{ fill: '#ffffff50', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111118', borderColor: '#ffffff20', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="baseline" stroke="#ffffff30" strokeWidth={2} dot={false} name="Baseline Rev" />
                    <Line type="monotone" dataKey="projected" stroke="#00d4ff" strokeWidth={3} dot={{ r: 4, fill: '#0a0a0f', stroke: '#00d4ff', strokeWidth: 2 }} activeDot={{ r: 6 }} name="Scenario Rev" />
                    <Line type="monotone" dataKey="burn" stroke="#ef4444" strokeWidth={2} dot={false} name="Scenario Burn" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
                <div className="text-xs font-mono text-zinc-500 mb-2">RUNWAY ESTIMATE</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {Math.max(0, 18 + (funding * 0.1) - (burnRate * 0.1)).toFixed(1)} mo
                </div>
                <div className="text-xs text-zinc-400">vs 18.0 mo baseline</div>
              </div>
              <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
                <div className="text-xs font-mono text-zinc-500 mb-2">HIRING CAP</div>
                <div className="text-2xl font-bold text-white mb-1">
                  ~{Math.round(200 * (1 + (hiring / 100)))}
                </div>
                <div className="text-xs text-zinc-400">new roles possible</div>
              </div>
              <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
                <div className="text-xs font-mono text-zinc-500 mb-2">REV TARGET (ARR)</div>
                <div className="text-2xl font-bold text-white mb-1">
                  ${Math.round(100 * (1 + (revGrowth / 100)))}M
                </div>
                <div className="text-xs text-zinc-400">End of Y1</div>
              </div>
              <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
                <div className="text-xs font-mono text-zinc-500 mb-2">MARKETS</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {markets + 3} total
                </div>
                <div className="text-xs text-zinc-400">active regions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScenarioLabPage;
