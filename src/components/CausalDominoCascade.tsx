import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dominoEffects } from '../data/domino';
import { ArrowRight, Activity, GitCommit, ChevronRight } from 'lucide-react';

export const CausalDominoCascade: React.FC = () => {
  const navigate = useNavigate();
  const domino = dominoEffects[0];
  const [activeStep, setActiveStep] = useState<number | null>(null);

  if (!domino) return null;

  return (
    <div className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-[#0c0d16] p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              2ND & 3RD ORDER CAUSAL MAP
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            {domino.headline}
          </h3>
          <p className="text-xs font-mono text-zinc-500 mt-0.5">{domino.date}</p>
        </div>

        <button
          onClick={() => navigate('/domino')}
          className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5 self-start sm:self-center transition-all cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.1)]"
        >
          <span>INTERACTIVE FLOW</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Domino Steps Chain */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
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
              className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,212,255,0.2)] scale-102 z-10'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400 font-bold">
                    ORDER 0{node.order}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-zinc-500">
                    {node.type}
                  </span>
                </div>
                
                <h4 className="text-xs font-bold text-white mb-2 leading-snug">
                  {node.label}
                </h4>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {node.description}
                </p>
              </div>

              {idx < domino.nodes.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#0c0d16] border border-cyan-500/40 items-center justify-center text-cyan-400 shadow-md">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
