import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MarketTicker: React.FC = () => {
  const navigate = useNavigate();

  const [activeItems, setActiveItems] = useState([
    { label: 'AI Foundation', change: '+44%', positive: true },
    { label: 'Robotics & SLAM', change: '+28%', positive: true },
    { label: 'SpaceTech Launch', change: '+52%', positive: true },
    { label: 'Postman', change: '$5.6B', positive: true },
    { label: 'Tactical UAVs', change: '+38%', positive: true },
    { label: 'Quick Commerce', change: '+31%', positive: true },
    { label: 'Ather Energy', change: '$500M IPO', positive: true },
    { label: 'Sarvam AI', change: '2B Model', positive: true },
    { label: 'SRM Corridor', change: '350+ Co', positive: true },
    { label: 'IIT Madras Park', change: '850+ Co', positive: true },
    { label: 'Chennai DeepTech', change: '1.5k Co', positive: true }
  ]);

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
    <div className="w-full bg-[#0f1823] border-y border-[#1e2d3d] overflow-hidden py-1 select-none">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex items-center gap-1.5 px-3 border-r border-[#2a3a4d] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c00] bb-pulse" />
          <span className="font-mono font-semibold text-[10px] text-[#ff8c00] tracking-wider uppercase">MKT PULSE</span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="flex animate-[marquee_30s_linear_infinite] shrink-0 items-center">
            {activeItems.concat(activeItems).map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/discover')}
                className="flex items-center gap-1.5 px-3 cursor-pointer hover:bg-[#141e2d] transition-colors border-r border-[#1e2d3d]"
              >
                <span className="font-mono text-[11px] text-[#8899aa]">{item.label}</span>
                <span className={`font-mono text-[11px] font-semibold ${item.positive ? 'text-[#00c853]' : 'text-[#ff3d3d]'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
