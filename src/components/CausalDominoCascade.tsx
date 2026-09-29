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
    <div className="w-full bg-[#0f1823] border border-[#1e2d3d] rounded overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#2a3a4d] flex items-center justify-between bg-[#0f1823]">
        <div>
          <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">CAUSAL SEQUENCE</span>
          <span className="font-mono text-[10px] text-[#4a5a6d] ml-3">{domino.date}</span>
        </div>
        <button
          onClick={() => navigate('/domino')}
          className="font-mono text-[10px] text-[#2196f3] hover:text-[#e8edf3] flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          INTERACTIVE <ChevronRight size={10} />
        </button>
      </div>

      {/* Headline */}
      <div className="px-3 py-2 border-b border-[#1e2d3d] bg-[#0a0e17]">
        <p className="text-[12px] font-medium text-[#e8edf3]">{domino.headline}</p>
      </div>

      {/* Sequence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5">
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
              className={`p-3 border-r border-b border-[#1e2d3d] cursor-pointer transition-colors ${
                isSelected ? 'bg-[#1a2636] border-t-2 border-t-[#ff8c00]' : 'hover:bg-[#141e2d]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-[#ff8c00] font-semibold">0{node.order}</span>
                <span className="font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider">{node.type}</span>
              </div>
              <h4 className="text-[11px] font-medium text-[#e8edf3] mb-1 leading-snug">{node.label}</h4>
              <p className="text-[10px] text-[#6b7c93] leading-relaxed">{node.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
