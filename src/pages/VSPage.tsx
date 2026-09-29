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
      case 'VERIFIED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REPORTED': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ESTIMATED': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'INFERRED': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  if (!compA || !compB) {
    return <div className="p-8 text-slate-800 bg-slate-50 min-h-screen">Select valid companies to compare.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12 overflow-hidden pb-24">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center relative">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight flex items-center justify-center gap-4 md:gap-8">
          <span className="text-slate-900">{compA.name}</span>
          <div className="relative flex items-center justify-center">
            <span className="text-xl md:text-3xl text-blue-600 font-black italic px-4 py-1.5 bg-blue-50 rounded-lg border border-blue-200 shadow-xs">
              VS
            </span>
          </div>
          <span className="text-slate-900">{compB.name}</span>
        </h1>
        
        {/* Selectors */}
        <div className="flex justify-center gap-4 md:gap-6 mt-8">
          <select 
            value={companyAId}
            onChange={(e) => setCompanyAId(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 font-mono text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer"
          >
            {companies?.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select 
            value={companyBId}
            onChange={(e) => setCompanyBId(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 font-mono text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer"
          >
            {companies?.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Dimensional Comparison */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 p-4 text-xs font-mono font-bold text-slate-600 uppercase tracking-wider text-center">
            <div className="text-slate-900">{compA.name}</div>
            <div className="text-blue-600">COMPARISON VECTOR</div>
            <div className="text-slate-900">{compB.name}</div>
          </div>
          <div className="divide-y divide-slate-100">
            {comparison.dimensions.map((dim: any, i: number) => (
              <div key={i} className="grid grid-cols-3 p-4 items-center hover:bg-slate-50/60 transition-colors">
                <div className="text-center flex flex-col items-center gap-1.5">
                  <span className="text-base font-mono font-bold text-slate-900">{dim.a}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getEvidenceColor(dim.evidenceA)}`}>
                    {dim.evidenceA}
                  </span>
                </div>
                <div className="text-center text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  {dim.name}
                </div>
                <div className="text-center flex flex-col items-center gap-1.5">
                  <span className="text-base font-mono font-bold text-slate-900">{dim.b}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getEvidenceColor(dim.evidenceB)}`}>
                    {dim.evidenceB}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why are they different */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <AlertTriangle className="text-amber-500 w-5 h-5" />
            Structural Asymmetries & Divergences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparison.differences.map((diff: any, i: number) => (
              <div key={i} className="bg-white border border-slate-200 border-l-blue-600 border-l-4 p-5 rounded-r-xl shadow-xs">
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm">{diff.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-6">Cumulative Capital Influx (USD M)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparison.funding}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontVariant="mono" />
                <YAxis stroke="#94a3b8" fontSize={11} fontVariant="mono" />
                <Tooltip 
                  cursor={{fill: 'rgba(241,245,249,0.7)'}} 
                  contentStyle={{backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '12px'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                <Bar dataKey={compA.name} fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey={compB.name} fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-6 pb-6 flex justify-center border-t border-slate-200">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer"
          >
            Return to Intelligence Terminal <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
