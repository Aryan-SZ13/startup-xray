import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ChevronDown, Check, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../../store/AppContext';
import { ecosystems } from '../../data/ecosystems';
import { RealTimeSourcesModal } from '../RealTimeSourcesModal';

const navLinks = [
  { label: 'DISCOVER', path: '/discover' },
  { label: 'COMPANIES', path: '/companies' },
  { label: 'X-RAY', path: '/xray' },
  { label: 'VS', path: '/vs' },
  { label: 'ANALYST', path: '/analyst' },
  { label: 'RADAR', path: '/radar' },
  { label: 'THESIS', path: '/thesis' },
  { label: 'NETWORK', path: '/network' },
  { label: 'ECOSYSTEM', path: '/ecosystem' }
];

export const Navbar: React.FC = () => {
  const { setCommandPaletteOpen, ecosystem, setEcosystem } = useAppState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [realtimeModalOpen, setRealtimeModalOpen] = useState(false);
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
    <header className="fixed top-0 left-0 right-0 h-11 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center px-4 md:px-8 shadow-xs">
      {/* Brand */}
      <NavLink to="/" className="flex-shrink-0 mr-6 flex items-center gap-2 cursor-pointer group">
        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
          X
        </div>
        <span className="font-bold text-sm tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
          STARTUP X-RAY
        </span>
        <span className="hidden sm:inline-block px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200/80 rounded text-[9px] font-mono font-semibold uppercase">
          OS
        </span>
      </NavLink>

      {/* Divider */}
      <div className="w-px h-4 bg-slate-200 mr-4" />

      {/* Nav Links */}
      <nav className="flex-1 overflow-x-auto flex items-center gap-0.5 min-w-0 no-scrollbar">
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 ml-4 flex-shrink-0">
        {/* Real-time Feeds & AI Telemetry Trigger */}
        <button
          onClick={() => setRealtimeModalOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-md text-[11px] font-mono text-slate-700 transition-colors cursor-pointer shadow-2xs"
          title="Real-Time Data Ingestion & AI Infrastructure"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-800">FEEDS</span>
          <span className="text-[9px] px-1 bg-blue-100 text-blue-700 rounded font-bold">5</span>
        </button>

        {/* Global Search Button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-md text-slate-600 text-[11px] font-mono transition-colors cursor-pointer"
        >
          <Search size={12} className="text-slate-400" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="text-[10px] bg-white border border-slate-200 text-slate-500 rounded px-1 shadow-2xs">⌘K</kbd>
        </button>

        {/* Ecosystem Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-[11px] font-mono text-slate-700 transition-colors cursor-pointer shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline font-medium uppercase">{ecosystem || 'GLOBAL'}</span>
            <ChevronDown size={10} className="text-slate-400" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50"
              >
                <div className="px-3 py-1.5 border-b border-slate-100 font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  INSTITUTIONAL LENS
                </div>
                {ecosystems.map((eco) => (
                  <button
                    key={eco.id}
                    onClick={() => {
                      setEcosystem(eco.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[11px] font-mono flex items-center justify-between transition-colors cursor-pointer ${
                      ecosystem === eco.id
                        ? 'text-blue-600 bg-blue-50 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{eco.name}</span>
                    {ecosystem === eco.id && <Check size={12} className="text-blue-600" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <RealTimeSourcesModal
        isOpen={realtimeModalOpen}
        onClose={() => setRealtimeModalOpen(false)}
      />
    </header>
  );

};
