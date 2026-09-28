import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dominoEffects } from '../data/domino';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const CausalDominoCascade: React.FC = () => {
  const navigate = useNavigate();
  const domino = dominoEffects[0];
  const [activeStep, setActiveStep] = useState<number | null>(null);

  if (!domino) return null;

  return (
    <div className="relative w-full rounded-3xl border border-white/[0.08] overflow-hidden bg-[#0c0c0e]/70 backdrop-blur-3xl shadow-xl p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.06] gap-3">
        <div>
          <span className="text-[11px] font-medium text-[#2997ff] uppercase tracking-wider block mb-1">
            Causal Sequence
          </span>
          <h3 className="text-base font-semibold text-white/95">
            {domino.headline}
          </h3>
          <p className="text-xs text-[#86868b] mt-0.5">{domino.date}</p>
        </div>

        <button
          onClick={() => navigate('/domino')}
          className="px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-white/90 border border-white/[0.08] transition-all cursor-pointer flex items-center gap-1 self-start sm:self-center"
        >
          <span>Interactive Canvas</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* 5 Sequence Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {domino.nodes.map((node, idx) => {
          const isSelected = activeStep === idx;

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
              onClick={() => {
                if (node.companyId) navigate(`/company/${node.companyId}`);
                else navigate('/domino');
              }}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-white/30 bg-white/[0.08] shadow-lg -translate-y-1'
                  : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2 text-[10px]">
                  <span className="font-mono text-[#2997ff]">0{node.order}</span>
                  <span className="text-[#86868b] uppercase tracking-wider">{node.type}</span>
                </div>
                <h4 className="text-xs font-medium text-white mb-2 leading-snug">
                  {node.label}
                </h4>
                <p className="text-[11px] text-[#86868b] leading-relaxed">
                  {node.description}
                </p>
              </div>

              {idx < domino.nodes.length - 1 && (
                <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#1c1c1e] border border-white/[0.1] items-center justify-center text-[#86868b]">
                  <ArrowRight size={10} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
