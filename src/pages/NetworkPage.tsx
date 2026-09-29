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
      <div className="min-h-screen bg-[#0a0e17] text-[#e8edf3] font-sans pt-16 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-[#0f1823] border border-[#1e2d3d] rounded p-6 shadow-2xl text-left">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff8c00] bb-pulse" />
            <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">
              NETWORK GRAPH INDEXER
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-[#e8edf3] mb-2">
            Connect LinkedIn Network
          </h2>
          <p className="text-[12px] text-[#6b7c93] leading-relaxed mb-6">
            Map verified 1st and 2nd-degree executive relationships across university alumni corridors (SRMIST, IIT Madras, BITS Pilani) and venture-backed founding teams.
          </p>

          {/* Value Props */}
          <div className="space-y-2 mb-6 bg-[#0a0e17] border border-[#1e2d3d] rounded p-3 text-[11px]">
            <div className="flex items-center gap-2 text-[#8899aa]">
              <span className="text-[#00c853]">▸</span>
              <span>Surface warm alumni pathways into active venture portfolios</span>
            </div>
            <div className="flex items-center gap-2 text-[#8899aa]">
              <span className="text-[#00c853]">▸</span>
              <span>Verify academic credentials and founding team provenance</span>
            </div>
            <div className="flex items-center gap-2 text-[#8899aa]">
              <span className="text-[#00c853]">▸</span>
              <span>Inspect direct LinkedIn executive profiles without leaving terminal</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => setLinkedInConnected(true)}
              className="w-full py-2.5 bg-[#0077b5] hover:bg-[#006097] text-white font-mono text-[11px] font-bold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>CONNECT LINKEDIN</span>
            </button>

            <button
              onClick={() => setLinkedInConnected(true)}
              className="w-full py-2 bg-[#141e2d] hover:bg-[#1a2636] border border-[#2a3a4d] text-[#8899aa] hover:text-[#e8edf3] font-mono text-[11px] rounded transition-colors cursor-pointer text-center"
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
    <div className="min-h-screen bg-[#0a0e17] text-[#e8edf3] font-sans pt-12 pb-24 px-3 lg:px-6">
      <div className="max-w-[1720px] mx-auto">

        {/* Page Header */}
        <header className="mb-6 border-b border-[#1e2d3d] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00c853] bb-pulse" />
              <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">
                PROFESSIONAL NETWORK X-RAY
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#e8edf3]">
              WARM PATHWAYS & LINKEDIN GRAPH
            </h1>
            <p className="font-mono text-[11px] text-[#6b7c93] mt-0.5">
              Connected identity: Aryan Singh • Primary Corridor: SRM Institute of Science and Technology (SRMIST)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLinkedInConnected(false)}
              className="px-2.5 py-1 bg-[#141e2d] hover:bg-[#1a2636] border border-[#1e2d3d] rounded font-mono text-[10px] text-[#6b7c93] hover:text-[#e8edf3] transition-colors cursor-pointer"
            >
              DISCONNECT
            </button>
            <div className="px-3 py-1 bg-[#0f1823] border border-[#2a3a4d] rounded font-mono text-[10px] text-[#00c853] flex items-center gap-1.5">
              <CheckCircle size={11} />
              <span>GRAPH SYNCED (540+ NODES)</span>
            </div>
          </div>
        </header>

        {/* User Identity Bar */}
        <div className="mb-6 bg-[#0f1823] border border-[#1e2d3d] rounded p-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#ff8c00] text-[#0a0e17] font-mono font-bold flex items-center justify-center text-sm">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[13px] text-[#e8edf3]">Aryan Singh</span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#0077b5]/20 text-[#00a0dc] border border-[#0077b5]/30 rounded">
                  LINKEDIN CONNECTED
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#6b7c93]">
                SRM Institute of Science and Technology • Engineering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px]">
            <div>
              <span className="text-[#4a5a6d] block">VERIFIED ALUMNI PATHS</span>
              <span className="text-[#ff8c00] font-bold text-xs">{networkPaths.length} ACTIVE PATHWAYS</span>
            </div>
            <div className="h-6 w-px bg-[#1e2d3d]" />
            <div>
              <span className="text-[#4a5a6d] block">INDEXED OPERATORS</span>
              <span className="text-[#00c853] font-bold text-xs">{networkConnections.length} FOUNDERS</span>
            </div>
          </div>
        </div>

        {/* 1. FIND MY WARM PATHWAYS */}
        <section className="mb-8">
          <div className="px-3 py-2 bg-[#0f1823] border border-[#1e2d3d] rounded-t flex items-center justify-between">
            <span className="font-mono font-semibold text-[11px] text-[#ff8c00] uppercase tracking-wider">
              VERIFIED WARM INTRODUCTION PATHWAYS
            </span>
            <span className="font-mono text-[10px] text-[#4a5a6d]">
              RANKED BY INSTITUTIONAL PROXIMITY
            </span>
          </div>

          <div className="border-x border-b border-[#1e2d3d] bg-[#0a0e17] rounded-b divide-y divide-[#1e2d3d]">
            {networkPaths.map((path, idx) => (
              <div key={idx} className="p-4 hover:bg-[#0f1823]/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-[12px] text-[#ff8c00]">0{idx + 1}</span>
                    <span className="text-[13px] font-semibold text-[#e8edf3]">
                      Target: {path.targetCompany}
                    </span>
                    <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded border ${
                      path.strength === 'STRONG' ? 'text-[#00c853] border-[#00c853]/30 bg-[#00c853]/10' : 'text-[#ffd700] border-[#ffd700]/30 bg-[#ffd700]/10'
                    }`}>
                      {path.strength} ALUMNI MATCH
                    </span>
                  </div>

                  {path.companyId && (
                    <button
                      onClick={() => navigate(`/company/${path.companyId}`)}
                      className="font-mono text-[10px] text-[#2196f3] hover:text-[#e8edf3] flex items-center gap-1 cursor-pointer"
                    >
                      INSPECT DOSSIER <ArrowRight size={10} />
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-[#6b7c93] mb-3">
                  {path.description}
                </p>

                {/* Pipeline Steps */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] bg-[#0f1823] p-2.5 rounded border border-[#1e2d3d]">
                  {path.pathNodes.map((node, nIdx) => (
                    <React.Fragment key={nIdx}>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-[#141e2d] border border-[#2a3a4d] rounded">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          nIdx === 0 ? 'bg-[#2196f3]' :
                          nIdx === path.pathNodes.length - 1 ? 'bg-[#00c853]' : 'bg-[#ff8c00]'
                        }`} />
                        <div>
                          <span className="text-[#e8edf3] font-medium text-[10px]">{node.name}</span>
                          <span className="text-[#4a5a6d] text-[9px] block leading-none">{node.relationship}</span>
                        </div>
                        {node.linkedInUrl && (
                          <a
                            href={node.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00a0dc] hover:text-white ml-1"
                            title="Open LinkedIn"
                          >
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                      {nIdx < path.pathNodes.length - 1 && (
                        <span className="text-[#4a5a6d]">→</span>
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
          <div className="px-3 py-2 bg-[#0f1823] border border-[#1e2d3d] rounded-t flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-[11px] text-[#ff8c00] uppercase tracking-wider">
                VERIFIED LINKEDIN OPERATOR DIRECTORY
              </span>
              <span className="font-mono text-[10px] text-[#4a5a6d]">
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
                  className={`px-2 py-0.5 font-mono text-[10px] rounded transition-colors cursor-pointer ${
                    filterType === tab.id
                      ? 'bg-[#ff8c00] text-[#0a0e17] font-bold'
                      : 'text-[#6b7c93] hover:text-[#e8edf3] hover:bg-[#141e2d]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 px-3 py-1.5 border-x border-b border-[#2a3a4d] bg-[#0f1823] font-mono text-[10px] text-[#4a5a6d] uppercase tracking-wider">
            <div className="col-span-3">OPERATOR / FOUNDER</div>
            <div className="col-span-3">COMPANY & ROLE</div>
            <div className="col-span-4">VERIFIED ALMA MATER & DEGREE</div>
            <div className="col-span-2 text-right">EXTERNAL LINK</div>
          </div>

          {/* Roster Rows */}
          <div className="border-x border-b border-[#1e2d3d] bg-[#0a0e17] rounded-b divide-y divide-[#1e2d3d]">
            {filteredConnections.map((conn) => (
              <div 
                key={conn.id}
                className="grid grid-cols-12 px-3 py-2.5 items-center hover:bg-[#0f1823] transition-colors"
              >
                {/* Col 1: Operator Name */}
                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#141e2d] border border-[#2a3a4d] flex items-center justify-center font-mono font-bold text-[10px] text-[#ff8c00] shrink-0">
                    {conn.fromName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-[#e8edf3] block leading-tight">
                      {conn.fromName}
                    </span>
                    <span className="font-mono text-[9px] text-[#00c853]">VERIFIED OPERATOR</span>
                  </div>
                </div>

                {/* Col 2: Company & Role */}
                <div className="col-span-3">
                  <span 
                    onClick={() => conn.companyId && navigate(`/company/${conn.companyId}`)}
                    className={`text-[12px] font-medium text-[#e8edf3] hover:text-[#ff8c00] transition-colors ${conn.companyId ? 'cursor-pointer' : ''}`}
                  >
                    {conn.company || conn.toName}
                  </span>
                  <span className="font-mono text-[10px] text-[#6b7c93] block">{conn.title || conn.connectionType}</span>
                </div>

                {/* Col 3: Alma Mater */}
                <div className="col-span-4">
                  <span className="text-[11px] text-[#8899aa] block leading-tight">
                    {conn.mutualInstitution}
                  </span>
                  <span className="font-mono text-[9px] text-[#4a5a6d] block">{conn.degree}</span>
                </div>

                {/* Col 4: Action Buttons */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {conn.linkedInUrl && (
                    <a
                      href={conn.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-[#00a0dc] hover:text-white border border-[#0077b5]/40 rounded font-mono text-[10px] font-medium transition-colors"
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
