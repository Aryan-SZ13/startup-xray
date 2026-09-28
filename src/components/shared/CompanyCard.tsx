import React from 'react';
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
