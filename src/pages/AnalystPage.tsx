import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Search, ChevronRight, CheckCircle2, CircleDashed, Loader2, FileText, CheckCircle, XCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { demoInvestigation, getCompanyById } from '../data';

const STAGES = [
  "Financial Research",
  "Funding Research",
  "Operations Research",
  "Market Research",
  "Legal Research",
  "Evidence Reconciliation",
  "Final Analysis"
];

export default function AnalystPage() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('company');
  const urlQ = searchParams.get('q') || searchParams.get('query') || '';
  const company = companyId ? getCompanyById(companyId) : null;

  const defaultQ = urlQ || (company ? `What changed in the last 12 months at ${company.name}?` : '');
  const [query, setQuery] = useState(defaultQ);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  const startInvestigation = (customQuery: string) => {
    setQuery(customQuery);
    setIsInvestigating(true);
    setShowResults(false);
    setCurrentStageIndex(0);
  };

  useEffect(() => {
    if (defaultQ && !showResults && !isInvestigating) {
      startInvestigation(defaultQ);
    }
  }, [defaultQ]);

  useEffect(() => {
    if (isInvestigating && currentStageIndex < STAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStageIndex(prev => prev + 1);
      }, 500); // 500ms per stage
      return () => clearTimeout(timer);
    } else if (isInvestigating && currentStageIndex === STAGES.length) {
      setTimeout(() => {
        setIsInvestigating(false);
        setShowResults(true);
      }, 500);
    }
  }, [isInvestigating, currentStageIndex]);

  const exampleQuestions = [
    "Why has Swiggy raised so much capital?",
    "What are the risks of investing in Agnikul?",
    "Compare the unit economics of food delivery in India",
    "What signals indicate Zepto's growth trajectory?"
  ];

  // Default demo data if import fails
  const rawResults = demoInvestigation?.findings || (demoInvestigation as any) || {};
  const results = {
    summary: rawResults.executiveSummary || "Investigation reveals a highly capital-intensive operation subsidized by external funding to maintain market share.",
    evidence: rawResults.evidence || [
      "Company filings indicate $20M monthly burn",
      "Employee count reduced by 12% in Q3",
      "New fulfillment centers opened in 4 tier-2 cities"
    ],
    supportingSignals: rawResults.supportingSignals || ["Consistent revenue growth 20% MoM", "High retention in older cohorts"],
    contradictingEvidence: rawResults.contradictingEvidence || ["Claimed profitability contradicts aggressive discounting observed"],
    unknowns: rawResults.unknowns || ["Impact of upcoming regulatory changes on gig workers", "Exact CAC blended rate"],
    nextQuestions: rawResults.nextQuestions || ["What is the retention rate in new tier-2 markets?", "Are there pending lawsuits from vendors?"],
    sources: rawResults.sources || ["Ministry of Corporate Affairs filings", "Alternative data: App store reviews", "LinkedIn hiring data"]
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 p-6 md:p-8 flex flex-col">
      
      {/* Header */}
      <header className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
        <div className="p-3 bg-[#00d4ff]/10 rounded-lg">
          <BrainCircuit className="w-8 h-8 text-[#00d4ff]" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">AI ANALYST</h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold">Investigation Workspace</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel - Workspace */}
        <div className="flex-1 flex flex-col">
          {/* Input Area */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query && startInvestigation(query)}
              placeholder="Enter your research question or thesis to investigate..."
              className="w-full bg-[#111118] border border-white/10 rounded-xl py-4 pl-14 pr-6 text-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-all"
              disabled={isInvestigating}
            />
          </div>

          {/* Investigation Progress */}
          {isInvestigating && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111118] border border-white/5 rounded-xl p-6 mb-8"
            >
              <h3 className="text-xs font-bold text-gray-500 tracking-widest mb-6 uppercase flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#00d4ff]" />
                Executing Research Plan
              </h3>
              <div className="space-y-4">
                {STAGES.map((stage, idx) => {
                  const isPast = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  return (
                    <div key={stage} className={`flex items-center gap-4 ${isPast ? 'text-gray-400' : isCurrent ? 'text-white' : 'text-gray-700'}`}>
                      {isPast ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : 
                       isCurrent ? <Loader2 className="w-5 h-5 animate-spin text-[#00d4ff]" /> : 
                       <CircleDashed className="w-5 h-5" />}
                      <span className={`text-sm font-medium ${isCurrent ? 'font-bold' : ''}`}>{stage}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Results Area */}
          {showResults && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#111118] border border-white/5 rounded-xl overflow-hidden shadow-2xl pb-8"
            >
              <div className="bg-[#00d4ff]/10 p-6 border-b border-[#00d4ff]/20">
                <div className="text-[10px] font-bold text-[#00d4ff] uppercase tracking-widest mb-2 border border-[#00d4ff]/30 inline-block px-2 py-0.5 rounded">DEMO ANALYSIS</div>
                <h2 className="text-xl font-semibold text-white leading-relaxed">{results.summary}</h2>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Hard Evidence
                  </h3>
                  <ul className="space-y-3">
                    {results.evidence.map((ev: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 shrink-0"></div>
                        {ev}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> Supporting Signals
                    </h3>
                    <ul className="space-y-2">
                      {results.supportingSignals.map((ev: string, i: number) => (
                        <li key={i} className="text-sm text-emerald-400/80 flex gap-2 items-start">
                          <span className="text-emerald-500 mt-0.5">•</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" /> Contradicting Evidence
                    </h3>
                    <ul className="space-y-2">
                      {results.contradictingEvidence.map((ev: string, i: number) => (
                        <li key={i} className="text-sm text-red-400/80 flex gap-2 items-start">
                          <span className="text-red-500 mt-0.5">•</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" /> Critical Unknowns
                    </h3>
                    <ul className="space-y-2">
                      {results.unknowns.map((ev: string, i: number) => (
                        <li key={i} className="text-sm text-amber-400/80 flex gap-2 items-start">
                          <span className="text-amber-500 mt-0.5">•</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#00d4ff]" /> Next Questions to Ask
                    </h3>
                    <ul className="space-y-2">
                      {results.nextQuestions.map((ev: string, i: number) => (
                        <li key={i} className="text-sm text-[#00d4ff]/80 flex gap-2 items-start">
                          <ChevronRight className="w-4 h-4 text-[#00d4ff] mt-0.5 shrink-0" /> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5">
                  <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Sources Referenced</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.sources.map((src: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-500 border border-white/5 hover:text-gray-300 cursor-default transition-colors">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {!isInvestigating && !showResults && (
            <div className="flex-1 flex items-center justify-center text-center opacity-30 pointer-events-none">
              <div>
                <BrainCircuit className="w-24 h-24 mx-auto mb-4" />
                <p className="text-xl font-medium">Awaiting Instructions</p>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel - Context & Actions */}
        <div className="w-full lg:w-80 space-y-6">
          {company && (
            <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-500 tracking-widest mb-4 uppercase">Context Company</h3>
              <div className="font-bold text-lg text-white mb-1">{company.name}</div>
              <div className="text-sm text-gray-400">{company.industry}</div>
            </div>
          )}

          <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
             <h3 className="text-xs font-bold text-gray-500 tracking-widest mb-4 uppercase">Example Questions</h3>
             <div className="space-y-2">
                {exampleQuestions.map((eq, i) => (
                  <button 
                    key={i}
                    onClick={() => startInvestigation(eq)}
                    className="w-full text-left p-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/10"
                  >
                    {eq}
                  </button>
                ))}
             </div>
          </div>

          <button 
            onClick={() => {setQuery(''); setShowResults(false); setIsInvestigating(false);}}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-bold uppercase tracking-widest"
          >
            Start New Investigation
          </button>
        </div>

      </div>
    </div>
  );
}
