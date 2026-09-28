import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Share2, Lock, ArrowRight, User, Link as LinkIcon, Building2, Zap, GraduationCap } from 'lucide-react';
import { networkConnections, networkPaths } from '../data';
import { useAppState } from '../store/AppContext';

export default function NetworkPage() {
  const navigate = useNavigate();
  const { linkedInConnected, setLinkedInConnected } = useAppState();

  if (!linkedInConnected) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-gray-300 p-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#111118] border border-cyan-500/20 p-8 rounded-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          
          <div className="w-16 h-16 bg-cyan-950/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
            <Lock className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h2 className="text-2xl text-white font-light mb-2">Unlock Network Intelligence</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Connect your professional network to see how you are connected to founders, investors, and key operators.
          </p>
          
          <div className="space-y-4 text-left mb-8">
            <div className="flex items-center gap-3 text-sm">
              <Zap className="w-4 h-4 text-amber-500" /> <span>Find warm introduction paths</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <GraduationCap className="w-4 h-4 text-purple-500" /> <span>Surface hidden alumni connections</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Share2 className="w-4 h-4 text-emerald-500" /> <span>Map second-degree ecosystem overlaps</span>
            </div>
          </div>
          
          <button 
            onClick={() => setLinkedInConnected(true)}
            className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-xl transition-all font-medium mb-3"
          >
            Connect LinkedIn
          </button>
          
          <button 
            onClick={() => setLinkedInConnected(true)}
            className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl transition-all text-sm"
          >
            Load Demo Network
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 p-8 pb-24">
      <header className="mb-12 flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2 text-cyan-400">
            <Share2 className="w-8 h-8" />
            <h1 className="text-3xl font-light tracking-widest text-white">YOUR NETWORK X-RAY</h1>
          </div>
          <p className="text-gray-500 text-lg">Intelligent mapping of your professional graph.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Direct Connections</div>
            <div className="text-2xl text-white font-light">{networkConnections.length}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Warm Paths</div>
            <div className="text-2xl text-cyan-400 font-light">{networkPaths.length}</div>
          </div>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">Find My Path</h2>
        
        <div className="space-y-4">
          {networkPaths.map((path, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111118] border border-white/5 rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">Target: {path.targetCompany}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-cyan-950/30 text-cyan-400 border border-cyan-500/30 rounded uppercase tracking-wider">
                    {path.strength} Match
                  </span>
                </div>
                <button 
                  onClick={() => navigate(`/company/${(path as any).companyId || path.targetCompany}`)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  View Company <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              
              <div className="flex items-center justify-between relative px-8">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-12 right-12 h-[1px] bg-white/10 -translate-y-1/2 z-0 overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                  />
                </div>
                
                {/* Node 1: You */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0a0a0f] border-2 border-white/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-xs font-medium text-white">You</span>
                </div>
                
                {/* Nodes: Intermediaries */}
                {(path.pathNodes || []).map((node, j: number) => (
                  <div key={j} className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-950/30 border border-cyan-500/50 flex items-center justify-center">
                      <LinkIcon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-white">{node.name}</div>
                      <div className="text-[9px] text-gray-500">{node.relationship || node.type}</div>
                    </div>
                  </div>
                ))}
                
                {/* Node Last: Target */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#0a0a0f] border-2 border-cyan-500/50 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-xs font-medium text-white">{path.targetCompany.replace(/^c_/, '').toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase border-b border-white/5 pb-2">Your Key Connections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {networkConnections.map((conn: any, i: number) => (
            <div key={i} className="bg-[#111118] border border-white/5 rounded-xl p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">{conn.name || conn.fromName}</h4>
                <p className="text-xs text-gray-400 mb-2">{conn.role || conn.connectionType} @ {conn.company || conn.toName}</p>
                <div className="flex gap-2">
                  <span className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-gray-500 uppercase">{conn.type || conn.fromType}</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-emerald-950/30 text-emerald-400 rounded uppercase">{conn.strength}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
