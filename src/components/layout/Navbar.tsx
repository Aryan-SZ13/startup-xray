import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../../store/AppContext';
import { ecosystems } from '../../data/ecosystems';

const navLinks = [
  { label: 'Discover', path: '/discover' },
  { label: 'Companies', path: '/companies' },
  { label: 'X-Ray', path: '/xray' },
  { label: 'VS', path: '/vs' },
  { label: 'Analyst', path: '/analyst' },
  { label: 'Radar', path: '/radar' },
  { label: 'Thesis', path: '/thesis' },
  { label: 'Network', path: '/network' },
  { label: 'Ecosystem', path: '/ecosystem' }
];

export const Navbar: React.FC = () => {
  const { setCommandPaletteOpen, ecosystem, setEcosystem } = useAppState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-[#0a0a0f]/90 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,212,255,0.05)] flex items-center px-4 md:px-6">
      {/* Logo */}
      <NavLink to="/" className="flex-shrink-0 mr-8 flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_12px_#00d4ff]" />
          <div className="absolute w-5 h-5 bg-cyan-400/20 rounded-full animate-ping" />
        </div>
        <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-cyan-300 tracking-wider text-sm">
          STARTUP X-RAY
        </span>
        <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          LIVE FEED
        </span>
      </NavLink>

      {/* Nav Links */}
      <nav className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-1 min-w-0">
        <div className="flex items-center gap-1 md:gap-2 pr-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-400'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-t-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
        {/* Search button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors text-sm w-64 text-left"
        >
          <Search size={14} className="text-zinc-500" />
          <span className="flex-1 truncate">Search company, founder, or ask...</span>
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
        
        {/* Mobile Search Icon */}
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-200"
        >
          <Search size={18} />
        </button>

        {/* Ecosystem Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-sm"
          >
            <span className="hidden sm:inline">Ecosystem:</span>
            <span className="font-medium text-cyan-400">{ecosystem}</span>
            <ChevronDown size={14} className={`text-zinc-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 mt-2 w-48 rounded-md bg-[#111118] border border-white/10 shadow-xl overflow-hidden z-50 py-1"
              >
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {ecosystems.map((eco) => (
                    <button
                      key={eco.id}
                      onClick={() => {
                        setEcosystem(eco.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-white/5 transition-colors group"
                    >
                      <span className={`${eco.id === ecosystem ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                        {eco.name}
                      </span>
                      {eco.id === ecosystem && <Check size={14} className="text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Global styles for custom scrollbar within this component just in case */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </header>
  );
};
