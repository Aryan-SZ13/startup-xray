import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'flat';
    value: string;
  };
  evidence?: any;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, evidence, onClick }) => {
  const [displayValue, setDisplayValue] = useState<string | number>(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 1000;
      const incrementTime = 20;
      const steps = duration / incrementTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  const renderTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up': return <TrendingUp size={16} className="text-emerald-500" />;
      case 'down': return <TrendingDown size={16} className="text-red-500" />;
      case 'flat': return <Minus size={16} className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      onClick={onClick}
      className={`relative p-5 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden group ${onClick ? 'cursor-pointer hover:bg-white/[0.04] hover:border-white/10' : ''} transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{label}</h3>
        {evidence && <EvidenceBadge status={evidence.status} />}
      </div>
      
      <div className="flex items-baseline gap-3">
        <div className="text-3xl font-bold text-white font-mono tracking-tight">
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend.direction === 'up' ? 'text-emerald-500' : trend.direction === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
            {renderTrendIcon()}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/20 rounded-xl transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};
