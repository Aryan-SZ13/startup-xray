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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0d0d14] border-l border-white/5 shadow-2xl z-50 flex flex-col overflow-y-auto"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0d0d14]/80 backdrop-blur-md z-10">
              <h2 className="text-lg font-bold text-white tracking-wide">Evidence Detail</h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                <X size={20} />
              </button>
            </div>

            {evidence && (
              <div className="p-6 space-y-8">
                <div>
                  <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Claim</h3>
                  <p className="text-xl text-white font-medium">{evidence.claim}</p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">Value</div>
                    <div className="text-2xl text-cyan-400 font-mono">{evidence.value}</div>
                  </div>
                  <div className="flex-1 border-l border-white/10 pl-4">
                    <div className="text-sm text-gray-400 mb-2">Status & Confidence</div>
                    <div className="flex items-center gap-3">
                      <EvidenceBadge status={evidence.status} />
                      <ConfidenceIndicator level={evidence.confidence} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm text-gray-400 uppercase tracking-wider">Source Intelligence</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Source</span>
                      <span className="text-white flex items-center gap-2">
                        {evidence.source}
                        <ExternalLink size={14} className="text-cyan-500" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Type</span>
                      <span className="text-gray-200 capitalize">{evidence.sourceType?.replace('_', ' ').toLowerCase()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Date</span>
                      <span className="text-gray-200 font-mono text-sm">{evidence.date}</span>
                    </div>
                  </div>
                </div>

                {evidence.supportingText && (
                  <div className="space-y-2">
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider">Supporting Context</h3>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-gray-300 text-sm leading-relaxed flex items-start gap-3">
                      <ShieldCheck size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <p>"{evidence.supportingText}"</p>
                    </div>
                  </div>
                )}

                {evidence.conflicts && evidence.conflicts.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm text-red-400/80 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={14} /> Known Conflicts
                    </h3>
                    <div className="space-y-2">
                      {evidence.conflicts.map((conflict: string, idx: number) => (
                        <div key={idx} className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg text-sm text-red-200/80">
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
