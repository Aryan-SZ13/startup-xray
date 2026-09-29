import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TickerItem {
  label: string;
  change: string;
  positive: boolean;
}

const INITIAL_TICKER_DATA: TickerItem[] = [
  { label: 'AI Compute Index', change: '+34.2%', positive: true },
  { label: 'SpaceTech Capital', change: '+$140M', positive: true },
  { label: 'Q-Comm Delivery Margins', change: '+1.8%', positive: true },
  { label: 'SRMIST Defense Corridor', change: '+$12M Contracts', positive: true },
  { label: 'IIT Madras DeepTech', change: '+$71M Cap', positive: true },
  { label: 'Enterprise API Spend', change: '+22.4%', positive: true },
  { label: 'Indic LLM Token Throughput', change: '+4.2x', positive: true },
  { label: 'Autonomous UGV Field Tests', change: 'Cleared', positive: true },
  { label: 'Late Stage SaaS Multiples', change: '-1.4x', positive: false },
  { label: 'EV 2W Penetration', change: '+38.5%', positive: true },
  { label: 'B2B Supplies Vol', change: '+28.1%', positive: true },
  { label: 'Suborbital Orbital Cleared', change: 'Active', positive: true }
];

export const MarketTicker: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<TickerItem[]>(INITIAL_TICKER_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        const randomIdx = Math.floor(Math.random() * next.length);
        const item = next[randomIdx];
        if (item.change.includes('%')) {
          const currentVal = parseFloat(item.change);
          if (!isNaN(currentVal)) {
            const delta = (Math.random() * 0.4 - 0.2);
            const newVal = (currentVal + delta).toFixed(1);
            next[randomIdx] = {
              ...item,
              change: `${newVal.startsWith('-') ? '' : '+'}${newVal}%`,
              positive: !newVal.startsWith('-')
            };
          }
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white border-b border-slate-200 overflow-hidden flex items-center h-8 select-none shadow-2xs">
      {/* Static Label */}
      <div className="flex items-center gap-1.5 px-3.5 h-full bg-slate-50 border-r border-slate-200 z-10 shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-500 bb-pulse" />
        <span className="font-mono font-bold text-[10px] text-blue-700 uppercase tracking-wider">
          MKT PULSE
        </span>
      </div>

      {/* Marquee Content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/discover')}
              className="inline-flex items-center gap-2 px-4 h-8 border-r border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer text-[11px] font-mono shrink-0"
            >
              <span className="text-slate-600 font-medium">{item.label}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                item.positive ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
              }`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
