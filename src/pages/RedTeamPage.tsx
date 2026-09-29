import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, Target, Flame, AlertOctagon, HelpCircle, AlertTriangle } from 'lucide-react';
import { demoRedTeam, getCompanyById, getRedTeamAnalysis } from '../data';

export default function RedTeamPage() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('company') || 'c_swiggy';
  const company = getCompanyById(companyId);

  const rawResults = (companyId ? getRedTeamAnalysis(companyId) : null) || demoRedTeam || {};

  const [thesis, setThesis] = useState(
    rawResults.thesis || (company ? `${company.name} has strong market expansion potential in its core sector.` : "Swiggy has strong growth potential due to its market position in India's food delivery space.")
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleBreak = () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };
  const formattedFatalFlaws = rawResults.fiveThingsWrong?.map((item: string, idx: number) => {
    const parts = item.split(':');
    if (parts.length > 1) {
      return { title: parts[0], desc: parts.slice(1).join(':').trim() };
    }
    return { title: `Risk Vector 0${idx + 1}`, desc: item };
  }) || (rawResults as any).fatalFlaws || [
    { title: "The Capital Trap", desc: "Requires continuous fund infusions just to maintain market share against heavily funded competitors." },
    { title: "Gig Economy Regulation", desc: "Any shift in labor laws could instantly turn unit economics upside down across all service lines." },
    { title: "Discount Dependency", desc: "Cohort analysis suggests a significant portion of GMV is purely discount-driven and will evaporate upon rationalization." }
  ];

  const results = {
    bullCase: rawResults.bullCase || [
      "Duopoly market structure provides pricing power",
      "Instamart (quick commerce) showing 3x YoY growth",
      "High density in tier 1 cities creates strong network effects"
    ],
    bearCase: rawResults.bearCase || [
      "Quick commerce unit economics remain deeply negative",
      "Attrition rates in delivery fleet increasing CAC",
      "New entrants (Zepto) aggressive discounting eroding margins"
    ],
    contradictoryEvidence: rawResults.contradictoryEvidence || [
      "Company claims profitability in top 3 cities, but observed discounting implies negative margins."
    ],
    unknownVariables: rawResults.unknownVariables || [
      "Impact of upcoming regulatory gig-worker classifications",
      "True customer retention rate without discounts"
    ],
    assumptions: rawResults.assumptions || [
      "Assuming customers will tolerate higher delivery fees",
      "Assuming quick commerce TAM is as large as food delivery"
    ],
    fatalFlaws: formattedFatalFlaws
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12 pb-24">
      
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs font-bold uppercase rounded-full">
            <Flame className="w-3.5 h-3.5 text-rose-600" /> ADVERSARIAL STRESS-TEST
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
            Red Team Dilemma Engine
          </h1>
          <p className="text-sm md:text-base text-slate-600 font-medium max-w-2xl mx-auto">
            Break the narrative. Systematically probe assumptions, blind spots, and catastrophic failure modes.
          </p>
          {company && (
             <div className="inline-block mt-2 px-3 py-1 bg-white border border-slate-200 shadow-2xs rounded-lg text-xs font-mono font-bold text-slate-700">
               Target Subject: <span className="text-blue-600">{company.name}</span>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500"></div>
          <h2 className="text-xs font-mono font-bold text-slate-500 tracking-wider mb-3 uppercase">Active Investment Thesis</h2>
          <textarea 
            value={thesis}
            onChange={(e) => setThesis(e.target.value)}
            className="w-full h-28 bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all resize-none"
            placeholder="Enter the investment thesis or assumption you want to stress-test..."
          />
          <div className="mt-4 flex justify-end">
            <button 
              onClick={handleBreak}
              disabled={isAnalyzing || !thesis}
              className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isAnalyzing ? (
                <>Analyzing Stress-Vectors <Zap className="w-4 h-4 animate-pulse" /></>
              ) : (
                <>Execute Red Team Strike <Target className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center justify-center py-12 space-y-4 overflow-hidden"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-t-3 border-rose-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-r-3 border-amber-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                <ShieldAlert className="absolute inset-0 m-auto w-6 h-6 text-rose-500 animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-rose-600 font-mono text-xs tracking-wider uppercase font-bold animate-pulse">Running Adversarial Inversion Models...</p>
                <p className="text-slate-500 text-xs mt-1">Cross-referencing legal filings, customer retention churn, and alternative signals</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 pb-16"
            >
              <div className="text-center">
                 <div className="inline-block border border-rose-200 bg-rose-50 text-rose-700 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded">
                   Adversarial Stress-Test Dossier
                 </div>
              </div>

              {/* Bull vs Bear */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="bg-white border border-slate-200 border-l-4 border-l-emerald-500 rounded-xl p-6 shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="text-emerald-600">Bull Case</span>
                    <span className="text-xs font-mono font-normal text-slate-500">(The Pitch)</span>
                  </h3>
                  <ul className="space-y-3">
                    {results.bullCase.map((item: string, i: number) => (
                      <li key={i} className="flex gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white border border-slate-200 border-l-4 border-l-rose-500 rounded-xl p-6 shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="text-rose-600">Bear Case</span>
                    <span className="text-xs font-mono font-normal text-slate-500">(The Risk)</span>
                  </h3>
                  <ul className="space-y-3">
                    {results.bearCase.map((item: string, i: number) => (
                      <li key={i} className="flex gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <h4 className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Contradictory Evidence
                  </h4>
                  <ul className="space-y-2.5">
                    {results.contradictoryEvidence.map((item: string, i: number) => (
                      <li key={i} className="text-xs text-slate-700 leading-relaxed border-b border-slate-100 pb-2 last:border-0">{item}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <h4 className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-500" /> Unknown Variables
                  </h4>
                  <ul className="space-y-2.5">
                    {results.unknownVariables.map((item: string, i: number) => (
                      <li key={i} className="text-xs text-slate-700 leading-relaxed border-b border-slate-100 pb-2 last:border-0">{item}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <h4 className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-blue-500" /> Core Assumptions
                  </h4>
                  <ul className="space-y-2.5">
                    {results.assumptions.map((item: string, i: number) => (
                      <li key={i} className="text-xs text-slate-700 leading-relaxed border-b border-slate-100 pb-2 last:border-0">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Fatal Flaws */}
              <motion.div variants={itemVariants} className="mt-8 bg-white border border-rose-200 rounded-xl p-6 md:p-8 shadow-xs relative overflow-hidden">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-6">
                  <span className="text-rose-600">5 Things</span> That Could Make This Thesis Fail
                </h3>
                
                <div className="space-y-3.5">
                  {results.fatalFlaws.map((flaw: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                      <div className="text-2xl font-mono font-black text-rose-500 shrink-0">0{i+1}</div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{flaw.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{flaw.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
