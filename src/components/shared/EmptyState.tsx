import React from 'react';
import { Search } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description: string;
  actions?: { label: string; onClick: () => void }[];
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title = "WE DON'T KNOW YET", description, actions }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white/[0.02] border border-white/5 rounded-2xl border-dashed">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500">
        <Search size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-300 tracking-wider mb-2 uppercase">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        {description}
      </p>
      
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${idx === 0 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
