import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ChevronDown, Check, Command } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 h-12 z-50 bg-[#000000]/70 backdrop-blur-2xl border-b border-white/[0.08] flex items-center px-4 md:px-8 transition-all">
      {/* Brand */}
      <NavLink to="/" className="flex-shrink-0 mr-8 flex items-center gap-2 cursor-pointer group">
        <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#2997ff] to-[#60a5fa] flex items-center justify-center shadow-[0_0_12px_rgba(41,151,255,0.4)]">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
        <span className="font-semibold text-sm tracking-tight text-white/95 group-hover:text-white transition-colors">
          Startup X-Ray
        </span>
      </NavLink>

      {/* Nav Links */}
      <nav className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-1 min-w-0">
        <div className="flex items-center gap-0.5 md:gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-white/[0.09] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
                    : 'text-[#86868b] hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
        {/* Search button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-[#86868b] hover:text-white hover:bg-white/[0.09] transition-all text-xs w-56 text-left"
        >
          <Search size={13} className="text-[#86868b]" />
          <span className="flex-1 truncate">Search or ask...</span>
          <kbd className="inline-flex h-4 items-center gap-0.5 rounded px-1 font-mono text-[9px] text-[#86868b] bg-white/[0.06] border border-white/[0.08]">
            ⌘K
          </kbd>
        </button>
        
        {/* Mobile Search Icon */}
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden p-1.5 text-[#86868b] hover:text-white"
        >
          <Search size={16} />
        </button>

        {/* Ecosystem Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-[#d2d2d7] hover:text-white hover:bg-white/[0.09] transition-all text-xs font-medium"
          >
            <span className="text-[#86868b] hidden sm:inline">Lens:</span>
            <span className="text-white">{ecosystem}</span>
            <ChevronDown size={12} className={`text-[#86868b] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/[0.12] shadow-2xl overflow-hidden z-50 py-1"
              >
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {ecosystems.map((eco) => (
                    <button
                      key={eco.id}
                      onClick={() => {
                        setEcosystem(eco.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-white/[0.08] transition-colors group cursor-pointer"
                    >
                      <span className={`${eco.id === ecosystem ? 'text-white font-medium' : 'text-[#86868b] group-hover:text-white'}`}>
                        {eco.name}
                      </span>
                      {eco.id === ecosystem && <Check size={12} className="text-[#2997ff]" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
