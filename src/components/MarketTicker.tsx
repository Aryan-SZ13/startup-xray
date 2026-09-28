import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { markets } from '../data/markets';

export const MarketTicker: React.FC = () => {
  const navigate = useNavigate();

  const TICKER_ITEMS = [
    { label: 'AI FOUNDATION', trend: 'UP', change: '+44%', icon: <TrendingUp className="w-3 h-3 text-emerald-400" /> },
    { label: 'ROBOTICS & SLAM', trend: 'UP', change: '+28%', icon: <TrendingUp className="w-3 h-3 text-emerald-400" /> },
    { label: 'SPACETECH LAUNCH', trend: 'UP', change: '+52%', icon: <TrendingUp className="w-3 h-3 text-emerald-400" /> },
    { label: 'DEFENSE UAVS', trend: 'UP', change: '+38%', icon: <TrendingUp className="w-3 h-3 text-emerald-400" /> },
    { label: 'QUICK COMMERCE', trend: 'UP', change: '+31%', icon: <TrendingUp className="w-3 h-3 text-emerald-400" /> },
    { label: 'FINTECH RAILS', trend: 'STABLE', change: '+2%', icon: <Minus className="w-3 h-3 text-zinc-400" /> },
    { label: 'VERTICAL SAAS', trend: 'STABLE', change: '-1%', icon: <TrendingDown className="w-3 h-3 text-amber-400" /> },
    { label: 'CLIMATE GRID', trend: 'UP', change: '+19%', icon: <TrendingUp className="w-3 h-3 text-emerald-400" /> },
    { label: 'SRM ECOSYSTEM', trend: 'UP', change: '350+ Co', icon: <TrendingUp className="w-3 h-3 text-cyan-400" /> },
    { label: 'CHENNAI SAAS/DEEPTECH', trend: 'UP', change: '1.5k Co', icon: <TrendingUp className="w-3 h-3 text-cyan-400" /> }
  ];

  return (
    <div className="w-full bg-[#07080e] border-y border-white/10 overflow-hidden py-2 select-none">
      <div className="flex items-center">
        {/* Static Indicator */}
        <div className="flex items-center gap-2 px-4 border-r border-white/10 shrink-0 z-10 bg-[#07080e]">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
            MARKET PULSE
          </span>
        </div>

        {/* Scrolling Items */}
        <div className="flex gap-8 overflow-hidden whitespace-nowrap mask-fade">
          <div className="flex gap-8 animate-[marquee_28s_linear_infinite] shrink-0 items-center">
            {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
              <div 
                key={idx}
                onClick={() => navigate('/discover')}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-[11px] font-mono font-bold text-zinc-200">
                  {item.label}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] font-mono text-zinc-400">
                  {item.icon}
                  <span className={item.trend === 'UP' ? 'text-emerald-400' : item.trend === 'DOWN' ? 'text-red-400' : 'text-zinc-400'}>
                    {item.change}
                  </span>
                </span>
                <span className="text-zinc-700 text-xs">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
