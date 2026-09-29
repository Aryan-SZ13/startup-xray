import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, AlertCircle } from 'lucide-react';
import { dominoEffect } from '../data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const lineVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 40, opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
};

const DominoPage: React.FC = () => {
  const navigate = useNavigate();

  const getNodeStyle = (type: string) => {
    switch (type) {
      case 'EVENT': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'COMPANY': return 'bg-white border-slate-200 text-slate-900';
      case 'SUPPLIER': return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'COMPETITOR': return 'bg-rose-50 border-rose-200 text-rose-900';
      case 'MARKET': return 'bg-purple-50 border-purple-200 text-purple-900';
      case 'EFFECT': return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      default: return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  const getOrderLabel = (order: number) => {
    switch (order) {
      case 1: return '1st Order Catalyst';
      case 2: return '2nd Order Domino';
      case 3: return '3rd Order Reaction';
      case 4: return '4th Order Feedback';
      default: return `${order}th Order`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10 pb-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
            PROPAGATION CASCADE
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">
            Domino Causal Map
          </h1>
          <p className="text-slate-600 font-mono text-xs tracking-wider uppercase">
            Trace the ripple effects, second-order consequences, and structural tremors of major events.
          </p>
        </header>

        <div className="mb-12 text-center bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <span className="font-mono text-[10px] text-blue-600 font-bold uppercase tracking-widest block mb-1">
            CATALYST DISPATCH
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{dominoEffect?.headline || "Major Market Catalyst"}</h2>
          <p className="text-slate-500 font-mono text-xs">{dominoEffect?.date ? `Catalyst Timestamp: ${dominoEffect.date}` : "Causal Propagation Analysis"}</p>
        </div>

        {dominoEffect?.nodes && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {dominoEffect.nodes.map((node: any, index: number) => {
              const isLast = index === dominoEffect.nodes.length - 1;
              
              return (
                <React.Fragment key={node.id}>
                  <motion.div 
                    variants={itemVariants}
                    onClick={() => node.companyId ? navigate(`/company/${node.companyId}`) : null}
                    className={`relative w-full max-w-lg p-6 rounded-xl border shadow-xs transition-all ${
                      node.companyId ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : ''
                    } ${getNodeStyle(node.type)}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-white/80 border border-slate-200/80 shadow-2xs">
                        {node.type}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-slate-500">
                        {getOrderLabel(node.order)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">{node.label || node.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{node.description}</p>
                    {node.companyId && (
                      <div className="mt-3 text-right">
                        <span className="text-xs font-mono font-bold text-blue-600 hover:text-blue-800">
                          Inspect Node Dossier &rarr;
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {!isLast && (
                    <motion.div 
                      variants={lineVariants}
                      className="flex flex-col items-center justify-center my-1"
                    >
                      <div className="w-0.5 bg-slate-300 h-10 relative flex justify-center">
                         <ArrowDown className="w-4 h-4 text-slate-400 absolute -bottom-3" />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        )}

        <div className="mt-16 p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed">
            These are prospective causal paths derived from supply chain dependencies, market cap ratios, and customer adjacency models. They represent systematic stress-test vectors rather than deterministic forecasts.
          </p>
        </div>
      </div>
    </div>
  );
};
export default DominoPage;
