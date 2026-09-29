import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../../store/AppContext';
import { ecosystems } from '../../data/ecosystems';

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
    <header className="fixed top-0 left-0 right-0 h-9 z-50 bg-[#0f1823] border-b border-[#2a3a4d] flex items-center px-3 md:px-6">
      {/* Brand */}
      <NavLink to="/" className="flex-shrink-0 mr-6 flex items-center gap-1.5 cursor-pointer group">
        <span className="font-mono font-bold text-[11px] tracking-wider text-[#ff8c00] group-hover:text-[#ffa940] transition-colors">
          STARTUP X-RAY
        </span>
      </NavLink>

      {/* Divider */}
      <div className="w-px h-4 bg-[#2a3a4d] mr-4" />

      {/* Nav Links */}
      <nav className="flex-1 overflow-x-auto flex items-center gap-0 min-w-0">
        <div className="flex items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-2.5 h-9 flex items-center text-[11px] font-medium tracking-wide transition-colors border-b-2 ${
                  isActive
                    ? 'text-[#ff8c00] border-[#ff8c00]'
                    : 'text-[#6b7c93] hover:text-[#e8edf3] border-transparent'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
        {/* Search */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-[#0a0e17] border border-[#1e2d3d] hover:border-[#2a3a4d] text-[#6b7c93] hover:text-[#e8edf3] transition-all text-[11px] rounded w-44"
        >
          <Search size={12} />
          <span className="flex-1 truncate text-left">Search...</span>
          <kbd className="font-mono text-[9px] text-[#4a5a6d]">⌘K</kbd>
        </button>

        {/* Mobile Search */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden p-1 text-[#6b7c93] hover:text-[#e8edf3]"
        >
          <Search size={14} />
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-[#2a3a4d]" />

        {/* Ecosystem Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 px-2 py-1 bg-[#0a0e17] border border-[#1e2d3d] hover:border-[#2a3a4d] text-[11px] rounded transition-all"
          >
            <span className="text-[#4a5a6d]">LENS:</span>
            <span className="text-[#e8edf3] font-medium">{ecosystem}</span>
            <ChevronDown size={11} className={`text-[#4a5a6d] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 mt-1 w-44 rounded bg-[#141e2d] border border-[#2a3a4d] shadow-lg overflow-hidden z-50 py-0.5"
              >
                <div className="max-h-60 overflow-y-auto">
                  {ecosystems.map((eco) => (
                    <button
                      key={eco.id}
                      onClick={() => {
                        setEcosystem(eco.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[11px] flex items-center justify-between hover:bg-[#1a2636] transition-colors cursor-pointer"
                    >
                      <span className={`${eco.id === ecosystem ? 'text-[#ff8c00] font-medium' : 'text-[#6b7c93] hover:text-[#e8edf3]'}`}>
                        {eco.name}
                      </span>
                      {eco.id === ecosystem && <Check size={11} className="text-[#ff8c00]" />}
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
