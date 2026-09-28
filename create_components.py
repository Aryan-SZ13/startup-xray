import os

base_dir = "/Users/aryansingh/.gemini/antigravity/scratch/startup-xray/src/components/shared"
os.makedirs(base_dir, exist_ok=True)

files = {}

files["EvidenceBadge.tsx"] = """import React from 'react';

export interface EvidenceBadgeProps {
  status: string;
  confidence?: string;
  size?: 'sm' | 'md';
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ status, confidence, size = 'sm' }) => {
  const getStatusColor = (s: string) => {
    if (!s) return 'bg-white/5 text-gray-400 border-white/10';
    switch (s.toUpperCase()) {
      case 'VERIFIED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'REPORTED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'ESTIMATED': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'INFERRED': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'CONFLICTED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'UNKNOWN':
      default: return 'bg-white/5 text-gray-400 border-white/10';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-semibold border rounded-sm uppercase tracking-wider ${getStatusColor(status)} ${sizeClasses}`}>
      {status}
    </span>
  );
};
"""

files["ConfidenceIndicator.tsx"] = """import React from 'react';

export interface ConfidenceIndicatorProps {
  level: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN' | string;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ level }) => {
  const getBars = () => {
    if (!level) return { filled: 0, color: 'bg-gray-600' };
    switch (level.toUpperCase()) {
      case 'HIGH': return { filled: 3, color: 'bg-emerald-500' };
      case 'MEDIUM': return { filled: 2, color: 'bg-amber-500' };
      case 'LOW': return { filled: 1, color: 'bg-red-500' };
      case 'UNKNOWN':
      default: return { filled: 0, color: 'bg-gray-600' };
    }
  };

  const { filled, color } = getBars();

  return (
    <div className="flex items-end gap-[2px] h-3" title={`Confidence: ${level || 'UNKNOWN'}`}>
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          className={`w-1 rounded-t-sm transition-colors duration-300 ${bar <= filled ? color : 'bg-white/10'}`}
          style={{ height: `${(bar / 3) * 100}%` }}
        />
      ))}
    </div>
  );
};
"""

files["EvidenceDrawer.tsx"] = """import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { ConfidenceIndicator } from './ConfidenceIndicator';

export interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: any;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ isOpen, onClose, evidence }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0d0d14] border-l border-white/5 shadow-2xl z-50 flex flex-col overflow-y-auto"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0d0d14]/80 backdrop-blur-md z-10">
              <h2 className="text-lg font-bold text-white tracking-wide">Evidence Detail</h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                <X size={20} />
              </button>
            </div>

            {evidence && (
              <div className="p-6 space-y-8">
                <div>
                  <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Claim</h3>
                  <p className="text-xl text-white font-medium">{evidence.claim}</p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">Value</div>
                    <div className="text-2xl text-cyan-400 font-mono">{evidence.value}</div>
                  </div>
                  <div className="flex-1 border-l border-white/10 pl-4">
                    <div className="text-sm text-gray-400 mb-2">Status & Confidence</div>
                    <div className="flex items-center gap-3">
                      <EvidenceBadge status={evidence.status} />
                      <ConfidenceIndicator level={evidence.confidence} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm text-gray-400 uppercase tracking-wider">Source Intelligence</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Source</span>
                      <span className="text-white flex items-center gap-2">
                        {evidence.source}
                        <ExternalLink size={14} className="text-cyan-500" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Type</span>
                      <span className="text-gray-200 capitalize">{evidence.sourceType?.replace('_', ' ').toLowerCase()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Date</span>
                      <span className="text-gray-200 font-mono text-sm">{evidence.date}</span>
                    </div>
                  </div>
                </div>

                {evidence.supportingText && (
                  <div className="space-y-2">
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider">Supporting Context</h3>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-gray-300 text-sm leading-relaxed flex items-start gap-3">
                      <ShieldCheck size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <p>"{evidence.supportingText}"</p>
                    </div>
                  </div>
                )}

                {evidence.conflicts && evidence.conflicts.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm text-red-400/80 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={14} /> Known Conflicts
                    </h3>
                    <div className="space-y-2">
                      {evidence.conflicts.map((conflict: string, idx: number) => (
                        <div key={idx} className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg text-sm text-red-200/80">
                          {conflict}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
"""

files["MetricCard.tsx"] = """import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'flat';
    value: string;
  };
  evidence?: any;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, evidence, onClick }) => {
  const [displayValue, setDisplayValue] = useState<string | number>(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 1000;
      const incrementTime = 20;
      const steps = duration / incrementTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  const renderTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up': return <TrendingUp size={16} className="text-emerald-500" />;
      case 'down': return <TrendingDown size={16} className="text-red-500" />;
      case 'flat': return <Minus size={16} className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      onClick={onClick}
      className={`relative p-5 rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden group ${onClick ? 'cursor-pointer hover:bg-white/[0.04] hover:border-white/10' : ''} transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{label}</h3>
        {evidence && <EvidenceBadge status={evidence.status} />}
      </div>
      
      <div className="flex items-baseline gap-3">
        <div className="text-3xl font-bold text-white font-mono tracking-tight">
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend.direction === 'up' ? 'text-emerald-500' : trend.direction === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
            {renderTrendIcon()}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/20 rounded-xl transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};
"""

files["SectionHeader.tsx"] = """import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10 mb-8 ${className}`}>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-gray-400 mt-2 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors duration-200"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
"""

files["CompanyCard.tsx"] = """import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EvidenceBadge } from './EvidenceBadge';

export interface CompanyCardProps {
  company: any; 
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/company/${company.id}`)}
      className="group cursor-pointer bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 rounded-xl p-5 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
      
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-xl font-bold text-white shadow-inner">
          {company.logo ? <img src={company.logo} alt={company.name} className="w-full h-full rounded-full object-cover" /> : getInitials(company.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate">{company.name}</h3>
          <p className="text-sm text-gray-400 truncate">{company.tagline || 'Unknown Tagline'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {company.industry && <span className="px-2 py-1 bg-white/5 border border-white/5 rounded text-xs text-gray-300">{company.industry}</span>}
        {company.stage && <span className="px-2 py-1 bg-white/5 border border-white/5 rounded text-xs text-gray-300">{company.stage}</span>}
        {company.ecosystem && (
          <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded text-xs">
            {company.ecosystem}
          </span>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 relative z-10 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Valuation</div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-200">{company.valuation || '—'}</span>
            {company.valuationStatus && <EvidenceBadge status={company.valuationStatus} />}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Revenue</div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-200">{company.revenue || '—'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
"""

files["SignalBadge.tsx"] = """import React from 'react';
import { Briefcase, Box, TrendingUp, Users, DollarSign, Scale, Cpu, Handshake, HelpCircle } from 'lucide-react';

export interface SignalBadgeProps {
  type: string;
  isEarly?: boolean;
}

export const SignalBadge: React.FC<SignalBadgeProps> = ({ type, isEarly }) => {
  const getSignalConfig = () => {
    if (!type) return { icon: HelpCircle, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' };
    switch (type.toUpperCase()) {
      case 'HIRING': return { icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' };
      case 'PRODUCT': return { icon: Box, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' };
      case 'MARKET': return { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' };
      case 'LEADERSHIP': return { icon: Users, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' };
      case 'FUNDING': return { icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
      case 'LEGAL': return { icon: Scale, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
      case 'TECHNOLOGY': return { icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' };
      case 'PARTNERSHIP': return { icon: Handshake, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' };
      default: return { icon: HelpCircle, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' };
    }
  };

  const { icon: Icon, color, bg, border } = getSignalConfig();

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${bg} ${border} ${color} text-xs font-medium uppercase tracking-wider`}>
      <Icon size={12} className={color} />
      <span>{type}</span>
      {isEarly && (
        <span className="ml-1 w-2 h-2 rounded-full bg-current animate-pulse opacity-75" title="Early Signal" />
      )}
    </div>
  );
};
"""

files["StatusDot.tsx"] = """import React from 'react';

export interface StatusDotProps {
  status: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
  const getColor = () => {
    if (!status) return 'bg-gray-500';
    switch (status.toUpperCase()) {
      case 'ACTIVE': return 'bg-emerald-500';
      case 'ACQUIRED': return 'bg-blue-500';
      case 'IPO': return 'bg-amber-500';
      case 'CLOSED': return 'bg-red-500';
      case 'UNKNOWN':
      default: return 'bg-gray-500';
    }
  };

  const colorClass = getColor();

  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`}></span>
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colorClass}`}></span>
    </span>
  );
};
"""

files["Toast.tsx"] = """import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-emerald-500" size={20} />;
      case 'error': return <XCircle className="text-red-500" size={20} />;
      case 'warning': return <AlertCircle className="text-amber-500" size={20} />;
      case 'info': return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 bg-[#111118] border border-white/10 shadow-2xl rounded-lg p-4 min-w-[300px]"
            >
              {getIcon(toast.type)}
              <p className="flex-1 text-sm text-gray-200">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
"""

files["CommandPalette.tsx"] = """import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, User, Target, X } from 'lucide-react';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.length > 1 ? [
    { id: '1', title: `Company matching "${query}"`, type: 'company', icon: Building2 },
    { id: '2', title: `Founder matching "${query}"`, type: 'founder', icon: User },
    { id: '3', title: `Sector matching "${query}"`, type: 'sector', icon: Target },
  ] : [];

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
"""

files["EmptyState.tsx"] = """import React from 'react';
import { Search } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description: string;
  actions?: { label: string; onClick: () => void }[];
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title = "WE DON'T KNOW YET", description, actions }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white/[0.02] border border-white/5 rounded-2xl border-dashed">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500">
        <Search size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-300 tracking-wider mb-2 uppercase">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        {description}
      </p>
      
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${idx === 0 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
"""

files["SkeletonLoader.tsx"] = """import React from 'react';

export const SkeletonText: React.FC<{ className?: string; width?: string }> = ({ className = '', width = 'w-full' }) => (
  <div className={`h-4 bg-white/10 rounded animate-pulse ${width} ${className}`} />
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white/[0.02] border border-white/5 rounded-xl p-5 animate-pulse ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-white/10" />
      <div className="flex-1 space-y-2">
        <SkeletonText width="w-3/4" className="h-5" />
        <SkeletonText width="w-1/2" className="h-3" />
      </div>
    </div>
    <div className="space-y-3 mt-6">
      <SkeletonText width="w-full" />
      <SkeletonText width="w-5/6" />
    </div>
  </div>
);

export const SkeletonMetric: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-5 rounded-xl bg-white/[0.02] border border-white/5 animate-pulse flex flex-col gap-3 ${className}`}>
    <SkeletonText width="w-1/3" className="h-3" />
    <SkeletonText width="w-1/2" className="h-8" />
  </div>
);
"""

files["index.ts"] = """export * from './EvidenceBadge';
export * from './EvidenceDrawer';
export * from './ConfidenceIndicator';
export * from './MetricCard';
export * from './SectionHeader';
export * from './CompanyCard';
export * from './SignalBadge';
export * from './StatusDot';
export * from './Toast';
export * from './CommandPalette';
export * from './EmptyState';
export * from './SkeletonLoader';
"""

for filename, content in files.items():
    filepath = os.path.join(base_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Created all components successfully.")
