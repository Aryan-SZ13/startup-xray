import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { companies, getCompanyById, companyComparisons, getCompanyComparison } from '../data';

export default function VSPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const defaultA = searchParams.get('a') || (companies && companies[0]?.id) || '1';
  const defaultB = searchParams.get('b') || (companies && companies[1]?.id) || '2';

  const [companyAId, setCompanyAId] = useState(defaultA);
  const [companyBId, setCompanyBId] = useState(defaultB);

  const compA = getCompanyById(companyAId);
  const compB = getCompanyById(companyBId);

  // Dynamic real comparison lookup
  const realComparison = getCompanyComparison(companyAId, companyBId);

  const comparison = realComparison ? {
    dimensions: realComparison.dimensions.map((d: any) => ({
      name: d.name,
      a: d.companyAValue,
      b: d.companyBValue,
      evidenceA: d.companyAEvidence?.status || 'VERIFIED',
      evidenceB: d.companyBEvidence?.status || 'VERIFIED'
    })),
    differences: realComparison.structuralDifferences?.map((diff: string, idx: number) => ({
      title: `Structural Vector 0${idx + 1}`,
      desc: diff
    })) || [],
    funding: [
      { name: 'Seed', [compA?.name || 'A']: 2, [compB?.name || 'B']: 1 },
      { name: 'Series A', [compA?.name || 'A']: 10, [compB?.name || 'B']: 15 },
      { name: 'Series B', [compA?.name || 'A']: 40, [compB?.name || 'B']: 50 },
      { name: 'Late / Pre-IPO', [compA?.name || 'A']: 700, [compB?.name || 'B']: 560 }
    ]
  } : {
    dimensions: [
      { name: 'Burn Rate', a: '$5M/mo', b: '$3M/mo', evidenceA: 'REPORTED', evidenceB: 'ESTIMATED' },
      { name: 'Market Share', a: '45%', b: '38%', evidenceA: 'VERIFIED', evidenceB: 'VERIFIED' },
      { name: 'CAC', a: '$12', b: '$15', evidenceA: 'INFERRED', evidenceB: 'INFERRED' }
    ],
    differences: [
      { title: 'Logistics Network', desc: `${compA?.name} owns their logistics network, while ${compB?.name} relies heavily on 3PL.` },
      { title: 'Capital Efficiency', desc: `${compB?.name} has shown consistently better capital efficiency in tier-2 cities.` }
    ],
    funding: [
      { name: 'Seed', [compA?.name || 'A']: 2, [compB?.name || 'B']: 1 },
      { name: 'Series A', [compA?.name || 'A']: 10, [compB?.name || 'B']: 15 },
      { name: 'Series B', [compA?.name || 'A']: 40, [compB?.name || 'B']: 50 },
      { name: 'Series C', [compA?.name || 'A']: 100, [compB?.name || 'B']: 80 }
    ]
  };

  const getEvidenceColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'REPORTED': return 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20';
      case 'ESTIMATED': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'INFERRED': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  if (!compA || !compB) {
    return <div className="p-8 text-white">Select valid companies to compare.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 p-6 md:p-12 overflow-hidden">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center relative">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center justify-center gap-4 md:gap-8">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{compA.name}</span>
          <div className="relative flex items-center justify-center">
            <span className="text-2xl md:text-4xl text-[#00d4ff] italic px-4 py-2 bg-[#00d4ff]/10 rounded-lg border border-[#00d4ff]/30 shadow-[0_0_30px_rgba(0,212,255,0.3)]">
              VS
            </span>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[200%] bg-gradient-to-b from-transparent via-[#00d4ff]/50 to-transparent -z-10"></div>
          </div>
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{compB.name}</span>
        </h1>
        
        {/* Selectors */}
        <div className="flex justify-center gap-8 mt-12">
          <select 
            value={companyAId}
            onChange={(e) => setCompanyAId(e.target.value)}
            className="bg-[#111118] border border-white/10 text-white rounded p-2 text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
          >
            {companies?.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select 
            value={companyBId}
            onChange={(e) => setCompanyBId(e.target.value)}
            className="bg-[#111118] border border-white/10 text-white rounded p-2 text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
          >
            {companies?.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto space-y-12"
      >
        {/* Dimensional Comparison */}
        <div className="bg-[#111118] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/5 p-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
            <div>{compA.name}</div>
            <div>DIMENSION</div>
            <div>{compB.name}</div>
          </div>
          <div className="divide-y divide-white/5">
            {comparison.dimensions.map((dim: any, i: number) => (
              <div key={i} className="grid grid-cols-3 p-4 items-center hover:bg-white/5 transition-colors">
                <div className="text-center flex flex-col items-center gap-2">
                  <span className="text-lg font-mono text-white">{dim.a}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getEvidenceColor(dim.evidenceA)}`}>
                    {dim.evidenceA}
                  </span>
                </div>
                <div className="text-center text-sm font-bold text-gray-400 uppercase tracking-wider">
                  {dim.name}
                </div>
                <div className="text-center flex flex-col items-center gap-2">
                  <span className="text-lg font-mono text-white">{dim.b}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getEvidenceColor(dim.evidenceB)}`}>
                    {dim.evidenceB}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why are they different */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
            <AlertTriangle className="text-[#00d4ff] w-5 h-5" />
            Why Are They Different?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparison.differences.map((diff: any, i: number) => (
              <div key={i} className="bg-[#111118] border border-white/5 border-l-[#00d4ff]/50 border-l-2 p-5 rounded-r-lg">
                <h4 className="font-bold text-gray-200 mb-2">{diff.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-[#111118] border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Funding Trajectory (USD M)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparison.funding}>
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                  contentStyle={{backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey={compA.name} fill="#00d4ff" radius={[4, 4, 0, 0]} />
                <Bar dataKey={compB.name} fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-8 pb-12 flex justify-center border-t border-white/5">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00d4ff] transition-colors uppercase tracking-widest"
          >
            Discover Similar Companies <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
