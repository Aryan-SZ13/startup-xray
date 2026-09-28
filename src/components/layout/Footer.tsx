import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0a0f] py-6 px-4 md:px-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            <span className="font-mono font-bold text-white tracking-wider text-xs">STARTUP X-RAY</span>
          </div>
          <p className="text-xs text-zinc-500">Intelligence-grade company research.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="flex gap-4 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">About</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Methodology</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
          </div>
          <p className="text-[10px] text-zinc-600">Demo prototype &middot; Data is illustrative &middot; &copy; 2024</p>
        </div>
      </div>
    </footer>
  );
};
