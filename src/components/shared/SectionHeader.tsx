import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10 mb-8 ${className}`}>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-gray-400 mt-2 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors duration-200"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
