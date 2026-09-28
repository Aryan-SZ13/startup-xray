import React from 'react';

export interface StatusDotProps {
  status: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
  const getColor = () => {
    if (!status) return 'bg-gray-500';
    switch (status.toUpperCase()) {
      case 'ACTIVE': return 'bg-emerald-500';
      case 'ACQUIRED': return 'bg-blue-500';
      case 'IPO': return 'bg-amber-500';
      case 'CLOSED': return 'bg-red-500';
      case 'UNKNOWN':
      default: return 'bg-gray-500';
    }
  };

  const colorClass = getColor();

  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`}></span>
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colorClass}`}></span>
    </span>
  );
};
