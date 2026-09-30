import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, Radio, CheckCircle, Database, Cpu, Clock, Server, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { IntelligenceAPI, RealTimeEvent, SourceHealth } from '../services/api';

interface RealTimeSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RealTimeSourcesModal: React.FC<RealTimeSourcesModalProps> = ({ isOpen, onClose }) => {
  const [sources, setSources] = useState<SourceHealth[]>([]);
  const [events, setEvents] = useState<RealTimeEvent[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) return;

    setSources(IntelligenceAPI.getSourceHealth());
    setEvents(IntelligenceAPI.getRecentEvents());
    setStats(IntelligenceAPI.getVectorStats());

    const unsubscribe = IntelligenceAPI.subscribeRealtimeEvents((newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 24)]);
    });

    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden text-slate-800"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">Real-Time Ingestion & AI Infrastructure</h2>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-bold rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    LIVE STREAM ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Multi-feed telemetry pipeline connecting SEC, MCA, Patents & Talent flow into vector store
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* System Status Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mb-1">
                  <Database size={13} className="text-blue-600" />
                  <span>VECTOR EMBEDDINGS</span>
                </div>
                <div className="text-xl font-bold text-slate-900">{stats?.totalEntities || 536} Entities</div>
                <div className="text-[10px] font-mono text-emerald-600 mt-0.5">100% In-Memory Cosine Store</div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mb-1">
                  <Activity size={13} className="text-emerald-600" />
                  <span>PIPELINE LATENCY</span>
                </div>
                <div className="text-xl font-bold text-slate-900">38 ms</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">Sub-50ms RAG retrieval</div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mb-1">
                  <Cpu size={13} className="text-purple-600" />
                  <span>ML RANKING ENGINE</span>
                </div>
                <div className="text-xl font-bold text-slate-900">5-Factor</div>
                <div className="text-[10px] font-mono text-purple-700 mt-0.5">Recency + Confidence + Impact</div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mb-1">
                  <Server size={13} className="text-amber-600" />
                  <span>SOURCES ONLINE</span>
                </div>
                <div className="text-xl font-bold text-slate-900">5 / 5 Active</div>
                <div className="text-[10px] font-mono text-emerald-600 mt-0.5">0 Degraded Connections</div>
              </div>
            </div>

            {/* Connected Feeds Status Table */}
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Connected Regulatory & Primary Data Sources</span>
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="py-2.5 px-4 font-bold">SOURCE CONNECTOR</th>
                      <th className="py-2.5 px-3 font-bold">STATUS</th>
                      <th className="py-2.5 px-3 font-bold">LATENCY</th>
                      <th className="py-2.5 px-3 font-bold">24H VOLUME</th>
                      <th className="py-2.5 px-3 font-bold text-right">LAST SYNC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {sources.map((src, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>{src.name}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                            {src.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{src.latencyMs}ms</td>
                        <td className="py-2.5 px-3 text-slate-700 font-bold">{src.eventsIngested24h.toLocaleString()} events</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{src.lastSync}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Ingest Stream */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Radio size={14} className="text-blue-600" />
                  <span>Live Stream Event Feed (Incoming Regulatory & Market Deltas)</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">AUTO-STREAMING (14s POLLING/SSE)</span>
              </div>

              <div className="border border-slate-200 rounded-xl bg-slate-950 p-4 font-mono text-xs max-h-64 overflow-y-auto space-y-2.5 shadow-inner">
                {events.map((ev) => (
                  <div key={ev.id} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-start justify-between gap-3 text-slate-300 hover:border-slate-700 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="text-amber-400 font-bold">[{ev.source}]</span>
                        <span className="text-blue-400 font-semibold">{ev.companyName}</span>
                        <span className="px-1.5 py-0.2 bg-slate-800 rounded text-slate-400 text-[9px]">{ev.category}</span>
                      </div>
                      <div className="text-slate-200 text-[11px] leading-relaxed">
                        {ev.headline}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-500 block">{ev.timestamp}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded mt-1 inline-block ${
                        ev.impactLevel === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        ev.impactLevel === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {ev.impactLevel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between font-mono text-xs">
            <span className="text-slate-500">Startup X-Ray Intelligence Layer v2.4 • Node / In-Memory Wasm RAG Engine</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
            >
              CLOSE TELEMETRY
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
