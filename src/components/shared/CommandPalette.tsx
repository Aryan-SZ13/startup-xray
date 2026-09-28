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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0d0d14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center px-4 py-4 border-b border-white/10">
                <Search className="text-gray-400 mr-3" size={24} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search companies, people, or sectors..."
                  className="flex-1 bg-transparent text-xl text-white outline-none placeholder-gray-600"
                />
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-white rounded-md hover:bg-white/5 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-2">
                {results.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Results</div>
                    {results.map((result, idx) => {
                      const Icon = result.icon;
                      return (
                        <div
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${idx === selectedIndex ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-300 hover:bg-white/5'}`}
                        >
                          <Icon size={18} className={idx === selectedIndex ? 'text-cyan-400' : 'text-gray-500'} />
                          <span>{result.title}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : query.length > 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No results found for "{query}". Press Enter to search globally.
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-600 flex flex-col items-center">
                    <Search size={32} className="mb-4 opacity-50" />
                    <p>Start typing to search across the intelligence platform.</p>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-3 border-t border-white/5 bg-black/20 text-xs text-gray-500 flex items-center justify-between">
                <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded mr-1 text-gray-400">↑</kbd> <kbd className="bg-white/10 px-1.5 py-0.5 rounded mr-1 text-gray-400">↓</kbd> to navigate</span>
                <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded mr-1 text-gray-400">Enter</kbd> to select</span>
                <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded mr-1 text-gray-400">Esc</kbd> to close</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
