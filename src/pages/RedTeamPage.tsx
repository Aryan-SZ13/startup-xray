import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, Target, Flame, AlertOctagon, HelpCircle, AlertTriangle } from 'lucide-react';
import { demoRedTeam, getCompanyById } from '../data';

export default function RedTeamPage() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('company');
  const company = companyId ? getCompanyById(companyId) : null;

  const [thesis, setThesis] = useState("Swiggy has strong growth potential due to its market position in India's food delivery space.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleBreak = () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const rawResults = demoRedTeam || {};
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
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 p-6 md:p-12">
      
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-red-500 uppercase tracking-tighter flex items-center justify-center gap-4 drop-shadow-[0_0_25px_rgba(239,68,68,0.3)]">
            <Flame className="w-12 h-12 md:w-16 md:h-16" />
            BREAK THE THESIS
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide">
            Stress-test any investment thesis. Find what could go wrong.
          </p>
          {company && (
             <div className="inline-block mt-4 px-4 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-gray-300">
               Target: {company.name}
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>
          <h2 className="text-sm font-bold text-gray-500 tracking-widest mb-4 uppercase">Investment Thesis</h2>
          <textarea 
            value={thesis}
            onChange={(e) => setThesis(e.target.value)}
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all resize-none"
            placeholder="Enter the thesis you want to stress-test..."
          />
          <div className="mt-4 flex justify-end">
            <button 
              onClick={handleBreak}
              disabled={isAnalyzing || !thesis}
              className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:shadow-none"
            >
              {isAnalyzing ? (
                <>Analyzing <Zap className="w-5 h-5 animate-pulse" /></>
              ) : (
                <>Break It <Target className="w-5 h-5" /></>
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
              className="flex flex-col items-center justify-center py-12 space-y-6 overflow-hidden"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-t-4 border-red-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-r-4 border-amber-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                <div className="absolute inset-4 border-b-4 border-purple-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
                <ShieldAlert className="absolute inset-0 m-auto w-8 h-8 text-red-500 animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-red-400 font-mono text-sm tracking-widest uppercase animate-pulse">Running Adversarial Models...</p>
                <p className="text-gray-500 text-xs mt-2">Searching for contradictions, flaws, and blind spots</p>
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
              <div className="text-center mb-8">
                 <div className="inline-block border border-red-500/30 bg-red-500/10 text-red-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded mb-4">Demo Analysis Results</div>
              </div>

              {/* Bull vs Bear */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="bg-[#111118] border border-white/5 border-l-4 border-l-emerald-500 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-black text-emerald-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                    Bull Case 
                    <span className="text-xs font-normal text-emerald-500/50">(The Dream)</span>
                  </h3>
                  <ul className="space-y-4">
                    {results.bullCase.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-[#111118] border border-white/5 border-l-4 border-l-red-500 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-black text-red-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                    Bear Case
                    <span className="text-xs font-normal text-red-500/50">(The Nightmare)</span>
                  </h3>
                  <ul className="space-y-4">
                    {results.bearCase.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="bg-amber-950/20 border border-amber-500/20 rounded-lg p-5">
                  <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Contradictory Evidence
                  </h4>
                  <ul className="space-y-3">
                    {results.contradictoryEvidence.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-400 leading-relaxed border-b border-amber-500/10 pb-2 last:border-0">{item}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-5">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" /> Unknown Variables
                  </h4>
                  <ul className="space-y-3">
                    {results.unknownVariables.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-400 leading-relaxed border-b border-purple-500/10 pb-2 last:border-0">{item}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-lg p-5">
                  <h4 className="text-xs font-bold text-[#00d4ff] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4" /> Core Assumptions
                  </h4>
                  <ul className="space-y-3">
                    {results.assumptions.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-400 leading-relaxed border-b border-[#00d4ff]/10 pb-2 last:border-0">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Fatal Flaws */}
              <motion.div variants={itemVariants} className="mt-12 bg-gradient-to-br from-red-950/40 to-[#0a0a0f] border border-red-500/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldAlert className="w-64 h-64 text-red-500" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-8 relative z-10">
                  <span className="text-red-500">5 Things</span> That Could Make This Thesis Wrong
                </h3>
                
                <div className="space-y-6 relative z-10">
                  {results.fatalFlaws.map((flaw: any, i: number) => (
                    <div key={i} className="flex gap-6 items-start bg-black/40 p-5 rounded-xl border border-red-500/10 hover:border-red-500/30 transition-colors">
                      <div className="text-4xl font-black text-red-500/30">0{i+1}</div>
                      <div>
                        <h4 className="text-lg font-bold text-red-400 mb-2 uppercase tracking-wide">{flaw.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{flaw.desc}</p>
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
