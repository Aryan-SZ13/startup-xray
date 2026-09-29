import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Share2, ArrowRight, ArrowUpRight, Building2, User, ExternalLink, 
  CheckCircle, RefreshCw, Filter, ShieldCheck, Link2
} from 'lucide-react';
import { networkConnections, networkPaths } from '../data';
import { useAppState } from '../store/AppContext';

export default function NetworkPage() {
  const navigate = useNavigate();
  const { linkedInConnected, setLinkedInConnected } = useAppState();
  const [filterType, setFilterType] = useState<'ALL' | 'SRM' | 'IITM' | 'FOUNDER'>('ALL');

  if (!linkedInConnected) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-16 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white border border-slate-200 rounded-xl p-6 shadow-xl text-left">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-600" />
            <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">
              NETWORK GRAPH INDEXER
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-2">
            Connect LinkedIn Network
          </h2>
          <p className="text-[12px] text-slate-600 leading-relaxed mb-6">
            Map verified 1st and 2nd-degree executive relationships across university alumni corridors (SRMIST, IIT Madras, BITS Pilani) and venture-backed founding teams.
          </p>

          {/* Value Props */}
          <div className="space-y-2 mb-6 bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px]">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">▸</span>
              <span>Surface warm alumni pathways into active venture portfolios</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">▸</span>
              <span>Verify academic credentials and founding team provenance</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">▸</span>
              <span>Inspect direct LinkedIn executive profiles without leaving terminal</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => setLinkedInConnected(true)}
              className="w-full py-2.5 bg-[#0077b5] hover:bg-[#006097] text-white font-mono text-[11px] font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>CONNECT LINKEDIN</span>
            </button>

            <button
              onClick={() => setLinkedInConnected(true)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 font-mono text-[11px] font-semibold rounded-lg transition-colors cursor-pointer text-center"
            >
              LOAD VERIFIED GRAPH (ARYAN SINGH // SRMIST ALUMNI)
            </button>
          </div>

        </div>
      </div>
    );
  }

  const filteredConnections = networkConnections.filter(c => {
    if (filterType === 'SRM') return c.mutualInstitution?.toLowerCase().includes('srm');
    if (filterType === 'IITM') return c.mutualInstitution?.toLowerCase().includes('iit');
    if (filterType === 'FOUNDER') return c.connectionType?.toLowerCase().includes('founder');
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-12 pb-24 px-3 lg:px-6">
      <div className="max-w-[1720px] mx-auto">

        {/* Page Header */}
        <header className="mb-6 border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">
                PROFESSIONAL NETWORK X-RAY
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              WARM PATHWAYS &amp; LINKEDIN GRAPH
            </h1>
            <p className="font-mono text-[11px] text-slate-500 mt-0.5">
              Connected identity: Aryan Singh • Primary Corridor: SRM Institute of Science and Technology (SRMIST)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLinkedInConnected(false)}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-mono text-[10px] text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
            >
              DISCONNECT
            </button>
            <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-md font-mono text-[10px] text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle size={11} />
              <span>GRAPH SYNCED (540+ NODES)</span>
            </div>
          </div>
        </header>

        {/* User Identity Bar */}
        <div className="mb-6 bg-white border border-slate-200 shadow-xs rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-orange-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-2xs">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[13px] text-slate-900">Aryan Singh</span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/30 rounded font-semibold">
                  LINKEDIN CONNECTED
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-500">
                SRM Institute of Science and Technology • Engineering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px]">
            <div>
              <span className="text-slate-400 block font-medium">VERIFIED ALUMNI PATHS</span>
              <span className="text-orange-600 font-bold text-xs">{networkPaths.length} ACTIVE PATHWAYS</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400 block font-medium">INDEXED OPERATORS</span>
              <span className="text-emerald-700 font-bold text-xs">{networkConnections.length} FOUNDERS</span>
            </div>
          </div>
        </div>

        {/* 1. FIND MY WARM PATHWAYS */}
        <section className="mb-8">
          <div className="px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-t-lg flex items-center justify-between">
            <span className="font-mono font-bold text-[11px] text-orange-600 uppercase tracking-wider">
              VERIFIED WARM INTRODUCTION PATHWAYS
            </span>
            <span className="font-mono text-[10px] text-slate-500">
              RANKED BY INSTITUTIONAL PROXIMITY
            </span>
          </div>

          <div className="border-x border-b border-slate-200 bg-white rounded-b-lg divide-y divide-slate-100 shadow-xs">
            {networkPaths.map((path, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50/60 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-[12px] text-orange-600">0{idx + 1}</span>
                    <span className="text-[13px] font-bold text-slate-900">
                      Target: {path.targetCompany}
                    </span>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border font-semibold ${
                      path.strength === 'STRONG' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 'text-amber-700 border-amber-200 bg-amber-50'
                    }`}>
                      {path.strength} ALUMNI MATCH
                    </span>
                  </div>

                  {path.companyId && (
                    <button
                      onClick={() => navigate(`/company/${path.companyId}`)}
                      className="font-mono text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      INSPECT DOSSIER <ArrowRight size={10} />
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-slate-600 mb-3">
                  {path.description}
                </p>

                {/* Pipeline Steps */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {path.pathNodes.map((node, nIdx) => (
                    <React.Fragment key={nIdx}>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          nIdx === 0 ? 'bg-blue-600' :
                          nIdx === path.pathNodes.length - 1 ? 'bg-emerald-600' : 'bg-orange-500'
                        }`} />
                        <div>
                          <span className="text-slate-900 font-bold text-[10px]">{node.name}</span>
                          <span className="text-slate-500 text-[9px] block leading-none">{node.relationship}</span>
                        </div>
                        {node.linkedInUrl && (
                          <a
                            href={node.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0077b5] hover:text-[#005582] ml-1"
                            title="Open LinkedIn"
                          >
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                      {nIdx < path.pathNodes.length - 1 && (
                        <span className="text-slate-400 font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. VERIFIED OPERATOR DIRECTORY */}
        <section>
          <div className="px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-t-lg flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-[11px] text-orange-600 uppercase tracking-wider">
                VERIFIED LINKEDIN OPERATOR DIRECTORY
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                ({filteredConnections.length} VERIFIED PROFILES)
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1">
              {[
                { id: 'ALL', label: 'ALL PROFILES' },
                { id: 'SRM', label: 'SRM ALUMNI' },
                { id: 'IITM', label: 'IIT MADRAS' },
                { id: 'FOUNDER', label: 'FOUNDERS' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  className={`px-2.5 py-1 font-mono text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                    filterType === tab.id
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 px-4 py-2 border-x border-b border-slate-200 bg-slate-50/80 font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            <div className="col-span-3">OPERATOR / FOUNDER</div>
            <div className="col-span-3">COMPANY &amp; ROLE</div>
            <div className="col-span-4">VERIFIED ALMA MATER &amp; DEGREE</div>
            <div className="col-span-2 text-right">EXTERNAL LINK</div>
          </div>

          {/* Roster Rows */}
          <div className="border-x border-b border-slate-200 bg-white rounded-b-lg divide-y divide-slate-100 shadow-xs">
            {filteredConnections.map((conn) => (
              <div 
                key={conn.id}
                className="grid grid-cols-12 px-4 py-2.5 items-center hover:bg-slate-50 transition-colors"
              >
                {/* Col 1: Operator Name */}
                <div className="col-span-3 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-[10px] text-orange-600 shrink-0">
                    {conn.fromName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-slate-900 block leading-tight">
                      {conn.fromName}
                    </span>
                    <span className="font-mono text-[9px] text-emerald-700 font-semibold">VERIFIED OPERATOR</span>
                  </div>
                </div>

                {/* Col 2: Company & Role */}
                <div className="col-span-3">
                  <span 
                    onClick={() => conn.companyId && navigate(`/company/${conn.companyId}`)}
                    className={`text-[12px] font-bold text-slate-900 hover:text-orange-600 transition-colors ${conn.companyId ? 'cursor-pointer' : ''}`}
                  >
                    {conn.company || conn.toName}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 block">{conn.title || conn.connectionType}</span>
                </div>

                {/* Col 3: Alma Mater */}
                <div className="col-span-4">
                  <span className="text-[11px] text-slate-700 font-medium block leading-tight">
                    {conn.mutualInstitution}
                  </span>
                  <span className="font-mono text-[9px] text-slate-400 block">{conn.degree}</span>
                </div>

                {/* Col 4: Action Buttons */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {conn.linkedInUrl && (
                    <a
                      href={conn.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30 rounded-md font-mono text-[10px] font-bold transition-colors"
                    >
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      <span>LinkedIn</span>
                      <ExternalLink size={9} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
