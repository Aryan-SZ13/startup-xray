import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MarketTicker: React.FC = () => {
  const navigate = useNavigate();

  const [activeItems, setActiveItems] = useState([
    { label: 'AI Foundation', change: '+44%', color: 'text-[#30d158]' },
    { label: 'Robotics & SLAM', change: '+28%', color: 'text-[#30d158]' },
    { label: 'SpaceTech Launch', change: '+52%', color: 'text-[#30d158]' },
    { label: 'Developer Tooling (Postman)', change: '$5.6B Val', color: 'text-[#2997ff]' },
    { label: 'Tactical UAVs (Torus)', change: '+38%', color: 'text-[#30d158]' },
    { label: 'Quick Commerce (Zepto/Swiggy)', change: '+31%', color: 'text-[#30d158]' },
    { label: 'CleanTech EV (Ather)', change: '$500M IPO', color: 'text-[#ff9f0a]' },
    { label: 'Indic Foundation (Sarvam)', change: '2B Model', color: 'text-[#2997ff]' },
    { label: 'SRM Corridor', change: '350+ Co', color: 'text-[#2997ff]' },
    { label: 'IIT Madras Park', change: '850+ Co', color: 'text-[#30d158]' },
    { label: 'Chennai DeepTech', change: '1.5k Co', color: 'text-[#2997ff]' }
  ]);

  // Subtle real-time metric update animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveItems(prev => {
        const copy = [...prev];
        const randIdx = Math.floor(Math.random() * copy.length);
        if (copy[randIdx].label.includes('AI Foundation')) {
          copy[randIdx] = { ...copy[randIdx], change: `+${40 + Math.floor(Math.random() * 8)}%` };
        } else if (copy[randIdx].label.includes('Quick Commerce')) {
          copy[randIdx] = { ...copy[randIdx], change: `+${30 + Math.floor(Math.random() * 5)}%` };
        }
        return copy;
      });
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#000000]/60 border-b border-white/[0.06] backdrop-blur-xl overflow-hidden py-1.5 select-none text-[11px]">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8 flex items-center">
        {/* Label */}
        <div className="flex items-center gap-2 pr-4 border-r border-white/[0.08] shrink-0 text-[#86868b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff] animate-pulse" />
          <span className="font-medium text-white/90">Market Pulse</span>
        </div>

        {/* Marquee ticker */}
        <div className="flex gap-8 overflow-hidden whitespace-nowrap pl-4">
          <div className="flex gap-8 animate-[marquee_26s_linear_infinite] shrink-0 items-center">
            {activeItems.concat(activeItems).map((item, idx) => (
              <div 
                key={idx}
                onClick={() => navigate('/discover')}
                className="flex items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
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
