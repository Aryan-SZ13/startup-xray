import React from 'react';

export interface ConfidenceIndicatorProps {
  level: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN' | string;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ level }) => {
  const getBars = () => {
    if (!level) return { filled: 0, color: 'bg-gray-600' };
    switch (level.toUpperCase()) {
      case 'HIGH': return { filled: 3, color: 'bg-emerald-500' };
      case 'MEDIUM': return { filled: 2, color: 'bg-amber-500' };
      case 'LOW': return { filled: 1, color: 'bg-red-500' };
      case 'UNKNOWN':
      default: return { filled: 0, color: 'bg-gray-600' };
    }
  };

  const { filled, color } = getBars();

  return (
    <div className="flex items-end gap-[2px] h-3" title={`Confidence: ${level || 'UNKNOWN'}`}>
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          className={`w-1 rounded-t-sm transition-colors duration-300 ${bar <= filled ? color : 'bg-white/10'}`}
          style={{ height: `${(bar / 3) * 100}%` }}
        />
      ))}
    </div>
  );
};
