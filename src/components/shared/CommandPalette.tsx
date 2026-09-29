import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, User, Target, X } from 'lucide-react';
import { companies } from '../../data';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim().length > 0 ? (() => {
    const q = query.toLowerCase().trim();
    const matchedCompanies = companies.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.industry.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q)
    ).map(c => ({
      id: c.id,
      title: `${c.name} — ${c.industry}`,
      type: 'company',
      icon: Building2
    }));

    const matchedFounders: any[] = [];
    companies.forEach(c => {
      c.founders?.forEach(f => {
        if (f.name.toLowerCase().includes(q)) {
          matchedFounders.push({
            id: c.id,
            title: `${f.name} (${f.title} @ ${c.name})`,
            type: 'founder',
            icon: User
          });
        }
      });
    });

    return [...matchedCompanies, ...matchedFounders].slice(0, 8);
  })() : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0) {
          handleSelect(results[selectedIndex]);
        } else if (query.trim()) {
          navigate(`/search?q=${encodeURIComponent(query)}`);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, query, navigate, onClose]);

  const handleSelect = (result: any) => {
    if (result.type === 'company') {
      navigate(`/company/${result.id}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(result.title)}`);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-start justify-center pt-[10vh]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
                <Search className="text-slate-400 mr-3" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search companies, founders, markets, or nodes..."
                  className="flex-1 bg-transparent text-base font-mono text-slate-900 outline-none placeholder-slate-400"
                />
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto p-2">
                {results.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Results ({results.length})</div>
                    {results.map((result, idx) => {
                      const Icon = result.icon;
                      return (
                        <div
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${idx === selectedIndex ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                          <Icon size={16} className={idx === selectedIndex ? 'text-blue-600' : 'text-slate-400'} />
                          <span className="text-xs font-mono">{result.title}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : query.length > 0 ? (
                  <div className="px-4 py-8 text-center text-slate-500 font-mono text-xs">
                    No immediate match for "{query}". Press Enter to run global universe scan.
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-slate-400 flex flex-col items-center">
                    <Search size={28} className="mb-2 text-slate-300" />
                    <p className="font-mono text-xs">Type to query companies, founders, or market signals.</p>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span><kbd className="bg-white border border-slate-200 px-1 py-0.5 rounded mr-1 text-slate-600">↑</kbd> <kbd className="bg-white border border-slate-200 px-1 py-0.5 rounded mr-1 text-slate-600">↓</kbd> navigate</span>
                <span><kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded mr-1 text-slate-600">Enter</kbd> select</span>
                <span><kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded mr-1 text-slate-600">Esc</kbd> dismiss</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
