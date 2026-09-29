import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 px-4 md:px-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="font-mono font-bold text-slate-900 tracking-wider text-xs">STARTUP X-RAY</span>
          </div>
          <p className="text-xs text-slate-500">Intelligence-grade venture research and ecosystem mapping.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="flex gap-4 text-xs text-slate-600 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Methodology</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <p className="text-[11px] text-slate-400">Institutional Intelligence Platform &middot; Data is illustrative &middot; &copy; 2026</p>
        </div>
      </div>
    </footer>
  );
};
