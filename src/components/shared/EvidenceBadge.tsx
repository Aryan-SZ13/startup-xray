import React from 'react';

export interface EvidenceBadgeProps {
  status: string;
  confidence?: string;
  size?: 'sm' | 'md';
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ status, confidence, size = 'sm' }) => {
  const getStatusColor = (s: string) => {
    if (!s) return 'bg-white/5 text-gray-400 border-white/10';
    switch (s.toUpperCase()) {
      case 'VERIFIED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'REPORTED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'ESTIMATED': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'INFERRED': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'CONFLICTED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'UNKNOWN':
      default: return 'bg-white/5 text-gray-400 border-white/10';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-semibold border rounded-sm uppercase tracking-wider ${getStatusColor(status)} ${sizeClasses}`}>
      {status}
    </span>
  );
};
