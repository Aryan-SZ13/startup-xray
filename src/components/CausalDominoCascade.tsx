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
    <div className="w-full bg-white border border-slate-200 shadow-xs rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
        <div>
          <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">CAUSAL SEQUENCE</span>
          <span className="font-mono text-[10px] text-slate-500 ml-3 bg-white px-2 py-0.5 rounded border border-slate-200">{domino.date}</span>
        </div>
        <button
          onClick={() => navigate('/domino')}
          className="font-mono text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          INTERACTIVE <ChevronRight size={10} />
        </button>
      </div>

      {/* Headline */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/40">
        <p className="text-[12px] font-bold text-slate-900">{domino.headline}</p>
      </div>

      {/* Sequence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100">
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
              className={`p-3.5 cursor-pointer transition-all ${
                isSelected ? 'bg-orange-50/40 border-t-2 border-t-orange-500' : 'hover:bg-slate-50/80 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-orange-600 font-bold">0{node.order}</span>
                <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-1 py-0.2 rounded uppercase tracking-wider font-semibold">{node.type}</span>
              </div>
              <h4 className="text-[11px] font-bold text-slate-900 mb-1 leading-snug">{node.label}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">{node.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
