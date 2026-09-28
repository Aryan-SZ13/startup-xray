import React from 'react';
import { Briefcase, Box, TrendingUp, Users, DollarSign, Scale, Cpu, Handshake, HelpCircle } from 'lucide-react';

export interface SignalBadgeProps {
  type: string;
  isEarly?: boolean;
}

export const SignalBadge: React.FC<SignalBadgeProps> = ({ type, isEarly }) => {
  const getSignalConfig = () => {
    if (!type) return { icon: HelpCircle, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' };
    switch (type.toUpperCase()) {
      case 'HIRING': return { icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' };
      case 'PRODUCT': return { icon: Box, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' };
      case 'MARKET': return { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' };
      case 'LEADERSHIP': return { icon: Users, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' };
      case 'FUNDING': return { icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
      case 'LEGAL': return { icon: Scale, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
      case 'TECHNOLOGY': return { icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' };
      case 'PARTNERSHIP': return { icon: Handshake, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' };
      default: return { icon: HelpCircle, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' };
    }
  };

  const { icon: Icon, color, bg, border } = getSignalConfig();

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${bg} ${border} ${color} text-xs font-medium uppercase tracking-wider`}>
      <Icon size={12} className={color} />
      <span>{type}</span>
      {isEarly && (
        <span className="ml-1 w-2 h-2 rounded-full bg-current animate-pulse opacity-75" title="Early Signal" />
      )}
    </div>
  );
};
