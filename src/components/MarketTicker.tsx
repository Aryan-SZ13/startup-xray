import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MarketTicker: React.FC = () => {
  const navigate = useNavigate();

  const TICKER_ITEMS = [
    { label: 'AI Foundation', change: '+44%', color: 'text-[#30d158]' },
    { label: 'Robotics & SLAM', change: '+28%', color: 'text-[#30d158]' },
    { label: 'SpaceTech Launch', change: '+52%', color: 'text-[#30d158]' },
    { label: 'Tactical UAVs', change: '+38%', color: 'text-[#30d158]' },
    { label: 'Quick Commerce', change: '+31%', color: 'text-[#30d158]' },
    { label: 'Fintech Rails', change: '+2%', color: 'text-[#86868b]' },
    { label: 'Vertical AI Agents', change: '+18%', color: 'text-[#30d158]' },
    { label: 'SRM Corridor', change: '350+ Startups', color: 'text-[#2997ff]' },
    { label: 'Chennai DeepTech', change: '1.5k Co', color: 'text-[#2997ff]' }
  ];

  return (
    <div className="w-full bg-black/40 border-b border-white/[0.06] backdrop-blur-xl overflow-hidden py-1.5 select-none text-[11px]">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8 flex items-center">
        {/* Label */}
        <div className="flex items-center gap-2 pr-4 border-r border-white/[0.08] shrink-0 text-[#86868b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
          <span className="font-medium text-white/90">Market Pulse</span>
        </div>

        {/* Marquee ticker */}
        <div className="flex gap-8 overflow-hidden whitespace-nowrap pl-4">
          <div className="flex gap-8 animate-[marquee_30s_linear_infinite] shrink-0 items-center">
            {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
              <div 
                key={idx}
                onClick={() => navigate('/discover')}
                className="flex items-center gap-1.5 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
              >
                <span className="text-[#d2d2d7] font-medium">{item.label}</span>
                <span className={`font-mono text-[10px] ${item.color}`}>{item.change}</span>
                <span className="text-[#3a3a3c] ml-2">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
