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
      case 'EVENT': return 'bg-[#00d4ff]/10 border-[#00d4ff]/30 text-[#00d4ff]';
      case 'COMPANY': return 'bg-white/5 border-white/20 text-white';
      case 'SUPPLIER': return 'bg-amber-500/10 border-amber-500/30 text-amber-500';
      case 'COMPETITOR': return 'bg-red-500/10 border-red-500/30 text-red-500';
      case 'MARKET': return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      case 'EFFECT': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      default: return 'bg-zinc-800/50 border-zinc-700 text-zinc-300';
    }
  };

  const getOrderLabel = (order: number) => {
    switch (order) {
      case 1: return '1st Order';
      case 2: return '2nd Order';
      case 3: return '3rd Order';
      case 4: return '4th Order';
      default: return `${order}th Order`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">DOMINO MAP</h1>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Trace the ripple effects of major events.</p>
        </header>

        <div className="mb-16 text-center border-b border-white/5 pb-8">
          <h2 className="text-2xl font-bold text-[#00d4ff] mb-2">{dominoEffect?.headline || "Major Event"}</h2>
          <p className="text-zinc-400">{dominoEffect?.date ? `Catalyst Date: ${dominoEffect.date}` : "Event Impact Analysis"}</p>
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
                    className={`relative w-full max-w-md p-6 rounded-lg border backdrop-blur-sm shadow-xl ${
                      node.companyId ? 'cursor-pointer hover:bg-white/10 transition-colors' : ''
                    } ${getNodeStyle(node.type)}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-mono font-bold tracking-wider px-2 py-1 rounded bg-black/40">
                        {node.type}
                      </span>
                      <span className="text-xs font-mono text-white/50">
                        {getOrderLabel(node.order)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{node.label || node.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{node.description}</p>
                  </motion.div>

                  {!isLast && (
                    <motion.div 
                      variants={lineVariants}
                      className="flex flex-col items-center justify-center my-2"
                    >
                      <div className="w-px bg-gradient-to-b from-white/20 to-white/5 h-10 relative flex justify-center">
                         <ArrowDown className="w-4 h-4 text-white/30 absolute -bottom-3" />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        )}

        <div className="mt-24 p-6 bg-white/5 border border-white/10 rounded-lg flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-zinc-400 shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-400 leading-relaxed">
            These are potential cascading effects, not predictions. Each node represents an area worth investigating based on historical patterns and market dependencies.
          </p>
        </div>
      </div>
    </div>
  );
};
export default DominoPage;
