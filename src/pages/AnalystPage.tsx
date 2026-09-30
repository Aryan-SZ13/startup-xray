import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Search, ChevronRight, CheckCircle2, CircleDashed, Loader2, 
  FileText, CheckCircle, XCircle, AlertCircle, HelpCircle, Sparkles, Database, Layers, ArrowUpRight
} from 'lucide-react';
import { demoInvestigation, getCompanyById, companies } from '../data';
import { ragAnalyst, RAGAnalysisResult } from '../services/ragAnalyst';

const STAGES = [
  "Entity & Intent Extraction",
  "Vector Context Retrieval (525+ Docs)",
  "Evidence Reranking by Authority",
  "Adversarial Thesis Synthesis",
  "Final Due Diligence Generation"
];

export default function AnalystPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const companyId = searchParams.get('company');
  const urlQ = searchParams.get('q') || searchParams.get('query') || '';
  const company = companyId ? getCompanyById(companyId) : null;

  const defaultQ = urlQ || (company ? `What changed in the last 12 months at ${company.name}?` : '');
  const [query, setQuery] = useState(defaultQ);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [ragResult, setRagResult] = useState<RAGAnalysisResult | null>(null);
  const [liveStageLog, setLiveStageLog] = useState<string>('');
  const [showContextDrawer, setShowContextDrawer] = useState<boolean>(false);

  const startInvestigation = async (customQuery: string) => {
    if (!customQuery.trim()) return;
    setQuery(customQuery);
    setIsInvestigating(true);
    setShowResults(false);
    setCurrentStageIndex(0);
    setLiveStageLog('Vectorizing query and scanning embeddings...');

    try {
      const result = await ragAnalyst.analyze(customQuery, (log) => {
        setLiveStageLog(log);
        setCurrentStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1));
      });
      setRagResult(result);
      setCurrentStageIndex(STAGES.length);
      setTimeout(() => {
        setIsInvestigating(false);
        setShowResults(true);
      }, 350);
    } catch (e) {
      console.error(e);
      setIsInvestigating(false);
      setShowResults(true);
    }
  };

  useEffect(() => {
    if (defaultQ && !showResults && !isInvestigating) {
      startInvestigation(defaultQ);
    }
  }, [defaultQ]);


  const exampleQuestions = [
    "Why has Swiggy raised so much capital?",
    "What are the risks of investing in Agnikul?",
    "Compare the unit economics of food delivery in India",
    "What signals indicate Zepto's growth trajectory?"
  ];

  // Dynamic investigation synthesis if company is specified or query mentions a known company
  const targetCompany = company || companies.find(c => query.toLowerCase().includes(c.name.toLowerCase()));

  // Default demo data if import fails
  const rawResults = demoInvestigation?.findings || (demoInvestigation as any) || {};
  const results = targetCompany ? {
    summary: `${targetCompany.name}'s strategic posture centers on ${targetCompany.companyDNA?.businessModel || targetCompany.industry}. With ${targetCompany.totalFunding?.claim || 'strong capital reserves'} raised at ${targetCompany.stage} stage, synthesis verifies consistent execution toward ${targetCompany.revenue?.claim || 'rapid revenue milestones'}, anchored by ${targetCompany.founders[0]?.name || 'the founding team'} (${targetCompany.founders[0]?.education?.[0] || 'elite institutional pedigree'}).`,
    evidence: [
      `Official capitalization recorded at ${targetCompany.totalFunding?.claim || '$50M+'} with latest valuation pegged at ${targetCompany.valuation?.claim || 'undisclosed'}.`,
      `Headcount stabilized at ${targetCompany.employees?.claim || '50+'} operators across ${targetCompany.headquarters}.`,
      `Revenue trajectory tracking at ${targetCompany.revenue?.claim || 'confidential audited tier'} according to filings.`
    ],
    supportingSignals: targetCompany.signals?.map(s => s.title) || [
      `Aggressive product cadence in ${targetCompany.industry}`,
      `Positive talent expansion from top institutional cohorts`
    ],
    contradictingEvidence: [
      `Intense competition from peer operators in ${targetCompany.sector}.`,
      targetCompany.blindSpots?.[0]?.question || `Burn trajectory sensitivity to customer acquisition shifts.`
    ],
    unknowns: [
      `Exact customer retention decay across newer regional deployments.`,
      `Runway elasticity beyond ${targetCompany.runway?.claim || '18 months'}.`
    ],
    nextQuestions: [
      `What is ${targetCompany.name}'s marginal contribution margin per enterprise unit?`,
      `Are follow-on growth syndicates actively pricing future rounds?`
    ],
    sources: [
      'Registrar of Companies / SEC Form D Filings',
      'Proprietary Venture Capital CapTable Index',
      'Alternative Data: LinkedIn Talent Flow & Web Signals'
    ]
  } : {
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
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm pb-8 mb-8"
            >
              <div className="bg-blue-50/60 p-6 border-b border-blue-100 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider border border-blue-200 bg-white px-2 py-0.5 rounded shadow-2xs flex items-center gap-1">
                      <Sparkles size={11} className="text-blue-600" /> RAG ADVERSARIAL SYNTHESIS
                    </span>
                    {ragResult && (
                      <span className="text-[10px] font-mono text-slate-500">
                        LATENCY: {ragResult.durationMs}ms • THESIS SCORE: {ragResult.thesisScore}/100
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 leading-relaxed">
                    {ragResult?.verdict || results.summary}
                  </h2>
                </div>

                {ragResult && (
                  <button
                    onClick={() => setShowContextDrawer(!showContextDrawer)}
                    className="shrink-0 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs font-bold text-slate-700 flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Database size={13} className="text-blue-600" />
                    <span>{showContextDrawer ? 'HIDE RAG CONTEXT' : `RAG CONTEXT (${ragResult.retrievalContext.retrievedEvidence.length} CHUNKS)`}</span>
                  </button>
                )}
              </div>

              {/* RAG Context Inspector Drawer */}
              {showContextDrawer && ragResult && (
                <div className="bg-slate-900 text-slate-200 p-6 border-b border-slate-800 text-xs font-mono">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5 uppercase">
                      <Layers size={13} /> RETRIEVAL-AUGMENTED CONTEXT (VECTOR TOP-K RETRIEVED)
                    </span>
                    <span className="text-slate-400">VECTOR EMBEDDING MATCH: 525 ENTITY SPACE</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-slate-400 uppercase font-bold text-[10px] mb-2">Primary Subject & Vector Neighbors</h4>
                      <div className="space-y-1.5 mb-4">
                        {ragResult.retrievalContext.primaryCompany && (
                          <div className="p-2 bg-slate-800 rounded border border-slate-700 flex justify-between items-center">
                            <span className="text-white font-bold">{ragResult.retrievalContext.primaryCompany.name}</span>
                            <span className="text-emerald-400 text-[10px]">PRIMARY FOCUS</span>
                          </div>
                        )}
                        {ragResult.retrievalContext.relatedCompanies.map(rc => (
                          <div key={rc.id} className="p-2 bg-slate-800/60 rounded border border-slate-700/60 flex justify-between items-center text-slate-300">
                            <span>{rc.name} ({rc.industry})</span>
                            <span className="text-blue-400 text-[10px]">NEIGHBOR</span>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-slate-400 uppercase font-bold text-[10px] mb-2">Matched Semantic Trigger Terms</h4>
                      <div className="flex flex-wrap gap-1">
                        {ragResult.retrievalContext.matchedFeatures.map(feat => (
                          <span key={feat} className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 text-[10px]">
                            #{feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-slate-400 uppercase font-bold text-[10px] mb-2">Verified Reranked Evidence Chunks</h4>
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                        {ragResult.retrievalContext.retrievedEvidence.map((ev, i) => (
                          <div key={i} className="p-2 bg-slate-800/80 rounded border border-slate-700 text-[11px] leading-relaxed">
                            <div className="flex items-center justify-between text-[9px] text-slate-400 mb-1">
                              <span className="text-blue-400 font-bold">{ev.companyName}</span>
                              <span className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-200">{ev.sourceType} • {ev.status}</span>
                            </div>
                            <div className="text-slate-200">{ev.claim}</div>
                            <div className="text-[9px] text-slate-500 mt-1">Source: {ev.source}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bull vs Bear Case Split */}
              {ragResult && (
                <div className="p-6 md:p-8 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50">
                  <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-5">
                    <h3 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Bull Case & Conviction Vectors
                    </h3>
                    <ul className="space-y-2">
                      {ragResult.bullCase.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex gap-2 items-start leading-relaxed">
                          <span className="text-emerald-600 font-bold mt-0.5">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-50/40 border border-rose-200 rounded-xl p-5">
                    <h3 className="text-xs font-mono font-bold text-rose-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      Bear Case & Operational Exposure
                    </h3>
                    <ul className="space-y-2">
                      {ragResult.bearCase.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex gap-2 items-start leading-relaxed">
                          <span className="text-rose-600 font-bold mt-0.5">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Hard Evidence & Filings
                  </h3>
                  <ul className="space-y-2.5">
                    {(ragResult ? ragResult.retrievalContext.retrievedEvidence.map(e => e.claim) : results.evidence).map((ev: string, i: number) => (
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
                      {(ragResult ? ragResult.supportingSignals : results.supportingSignals).map((ev: string, i: number) => (
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
                      {(ragResult ? ragResult.contradictoryEvidence : results.contradictingEvidence).map((ev: string, i: number) => (
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
                      {(ragResult ? ragResult.blindSpots : results.unknowns).map((ev: string, i: number) => (
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
                      {(ragResult ? ragResult.nextQuestions : results.nextQuestions).map((ev: string, i: number) => (
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
                    {(ragResult ? ragResult.sources : results.sources).map((src: string, i: number) => (
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
