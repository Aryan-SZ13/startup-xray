import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { ConfidenceIndicator } from './ConfidenceIndicator';

export interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: any;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ isOpen, onClose, evidence }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col overflow-y-auto"
          >
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">PROVENANCE RECORD</span>
                <h2 className="text-base font-bold text-slate-900">Evidence & Source Detail</h2>
              </div>
              <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors rounded-lg hover:bg-slate-100 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {evidence && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Asserted Claim</h3>
                  <p className="text-base text-slate-900 font-bold leading-snug">{evidence.claim}</p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-slate-400 mb-1 uppercase font-bold">Recorded Metric</div>
                    <div className="text-xl text-blue-700 font-mono font-bold">{evidence.value}</div>
                  </div>
                  <div className="flex-1 border-l border-slate-200 pl-4">
                    <div className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Verification Tier</div>
                    <div className="flex items-center gap-2">
                      <EvidenceBadge status={evidence.status} />
                      <ConfidenceIndicator level={evidence.confidence} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Source Provenance</h3>
                  <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-white">
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                      <span className="text-slate-500 font-mono">Source Entity</span>
                      <span className="text-slate-900 font-medium flex items-center gap-1.5">
                        {evidence.source}
                        <ExternalLink size={12} className="text-blue-600" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                      <span className="text-slate-500 font-mono">Classification</span>
                      <span className="text-slate-800 capitalize font-mono text-[11px]">{evidence.sourceType?.replace('_', ' ').toLowerCase()}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 text-xs">
                      <span className="text-slate-500 font-mono">Filing Timestamp</span>
                      <span className="text-slate-800 font-mono text-[11px]">{evidence.date}</span>
                    </div>
                  </div>
                </div>

                {evidence.supportingText && (
                  <div className="space-y-1.5">
                    <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Extract / Supporting Passage</h3>
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs leading-relaxed flex items-start gap-2.5">
                      <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <p className="italic">"{evidence.supportingText}"</p>
                    </div>
                  </div>
                )}

                {evidence.conflicts && evidence.conflicts.length > 0 && (
                  <div className="space-y-1.5">
                    <h3 className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle size={13} /> Recorded Asymmetries & Conflicts
                    </h3>
                    <div className="space-y-2">
                      {evidence.conflicts.map((conflict: string, idx: number) => (
                        <div key={idx} className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 leading-relaxed">
                          {conflict}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
