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
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-8 flex flex-col pb-24">
      
      {/* Header */}
      <header className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <BrainCircuit className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-0.5">
            DEEP SYNTHESIS ENGINE
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Analyst Workspace</h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-wider font-semibold">Evidence Verification & Adversarial Thesis Engine</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel - Workspace */}
        <div className="flex-1 flex flex-col">
          {/* Input Area */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query && startInvestigation(query)}
              placeholder="Enter research hypothesis, diligence prompt, or anomaly query..."
              className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-6 text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs transition-all"
              disabled={isInvestigating}
            />
          </div>

          {/* Investigation Progress */}
          {isInvestigating && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-xs"
            >
              <h3 className="text-xs font-mono font-bold text-slate-500 tracking-wider mb-5 uppercase flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                Executing Diligence Protocol
              </h3>
              <div className="space-y-3">
                {STAGES.map((stage, idx) => {
                  const isPast = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  return (
                    <div key={stage} className={`flex items-center gap-3 ${isPast ? 'text-slate-400' : isCurrent ? 'text-slate-900' : 'text-slate-300'}`}>
                      {isPast ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : 
                       isCurrent ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : 
                       <CircleDashed className="w-4 h-4" />}
                      <span className={`text-xs font-mono ${isCurrent ? 'font-bold text-blue-700' : ''}`}>{stage}</span>
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
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm pb-8"
            >
              <div className="bg-blue-50/60 p-6 border-b border-blue-100">
                <div className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider mb-2 border border-blue-200 bg-white inline-block px-2 py-0.5 rounded shadow-2xs">INTELLIGENCE SYNTHESIS</div>
                <h2 className="text-lg font-bold text-slate-900 leading-relaxed">{results.summary}</h2>
              </div>
              
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Hard Evidence & Filings
                  </h3>
                  <ul className="space-y-2.5">
                    {results.evidence.map((ev: string, i: number) => (
                      <li key={i} className="flex gap-2.5 text-xs text-slate-700 items-start leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                        {ev}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" /> Corroborating Signals
                    </h3>
                    <ul className="space-y-2">
                      {results.supportingSignals.map((ev: string, i: number) => (
                        <li key={i} className="text-xs text-emerald-800 flex gap-2 items-start leading-relaxed">
                          <span className="text-emerald-600 font-bold mt-0.5">•</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-600" /> Contradicting Evidence
                    </h3>
                    <ul className="space-y-2">
                      {results.contradictingEvidence.map((ev: string, i: number) => (
                        <li key={i} className="text-xs text-rose-800 flex gap-2 items-start leading-relaxed">
                          <span className="text-rose-600 font-bold mt-0.5">•</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" /> Critical Blind Spots
                    </h3>
                    <ul className="space-y-2">
                      {results.unknowns.map((ev: string, i: number) => (
                        <li key={i} className="text-xs text-amber-800 flex gap-2 items-start leading-relaxed">
                          <span className="text-amber-600 font-bold mt-0.5">•</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600" /> Follow-Up Diligence Vectors
                    </h3>
                    <ul className="space-y-2">
                      {results.nextQuestions.map((ev: string, i: number) => (
                        <li key={i} className="text-xs text-blue-800 flex gap-2 items-start leading-relaxed">
                          <ChevronRight className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" /> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-slate-100">
                  <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Sources Referenced</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.sources.map((src: string, i: number) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-0.5 bg-slate-50 rounded text-slate-600 border border-slate-200">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {!isInvestigating && !showResults && (
            <div className="flex-1 flex items-center justify-center text-center p-12 bg-white border border-slate-200 border-dashed rounded-xl">
              <div>
                <BrainCircuit className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                <p className="text-base font-bold text-slate-700">Awaiting Intelligence Inquiry</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">Enter a company name or select a hypothesis from the right panel to execute an investigation.</p>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel - Context & Actions */}
        <div className="w-full lg:w-80 space-y-5">
          {company && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <h3 className="text-[11px] font-mono font-bold text-slate-400 tracking-wider mb-3 uppercase">Subject Profile</h3>
              <div className="font-bold text-base text-slate-900 mb-0.5">{company.name}</div>
              <div className="text-xs font-mono text-slate-500">{company.industry}</div>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
             <h3 className="text-[11px] font-mono font-bold text-slate-400 tracking-wider mb-3 uppercase">Hypothesis Templates</h3>
             <div className="space-y-1.5">
                {exampleQuestions.map((eq, i) => (
                  <button 
                    key={i}
                    onClick={() => startInvestigation(eq)}
                    className="w-full text-left p-2.5 text-xs text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100 cursor-pointer"
                  >
                    {eq}
                  </button>
                ))}
             </div>
          </div>

          <button 
            onClick={() => {setQuery(''); setShowResults(false); setIsInvestigating(false);}}
            className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors text-xs font-mono font-bold text-slate-700 uppercase tracking-wider cursor-pointer shadow-xs"
          >
            Reset Workspace
          </button>
        </div>

      </div>
    </div>
  );
}
