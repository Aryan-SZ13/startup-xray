import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Building, Users, Activity, ExternalLink } from 'lucide-react';
import { companies, getCompaniesForEcosystem } from '../data';
import { ecosystems } from '../data/ecosystems';
import type { EcosystemType } from '../data/types';
import { useAppState } from '../store/AppContext';

export default function EcosystemPage() {
  const navigate = useNavigate();
  const { ecosystem, setEcosystem } = useAppState();
  const [activeTab, setActiveTab] = useState<EcosystemType>(ecosystem || 'SRM');

  const activeEcosystemMeta = ecosystems.find(e => e.id === activeTab) || ecosystems[4];

  // Verified institutional filtering: no random companies!
  const ecosystemCompanies = activeTab === 'GLOBAL'
    ? companies
    : getCompaniesForEcosystem(activeTab);

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#e8edf3] font-sans pt-12 pb-24 px-3 lg:px-6">
      <div className="max-w-[1720px] mx-auto">

        {/* Page Header */}
        <header className="mb-6 border-b border-[#1e2d3d] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#ff8c00] bb-pulse" />
              <span className="font-mono font-semibold text-[11px] text-[#ff8c00] tracking-wider uppercase">
                INSTITUTIONAL INTELLIGENCE
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#e8edf3]">
              ECOSYSTEM & ALUMNI CORRIDOR
            </h1>
            <p className="font-mono text-[11px] text-[#6b7c93] mt-0.5">
              Verified university alumni networks, research park incubations, and institutional talent pipelines.
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px] text-[#4a5a6d]">
            <div className="bg-[#0f1823] border border-[#1e2d3d] px-3 py-1.5 rounded flex items-center gap-2">
              <span className="text-[#8899aa]">ACTIVE LENS:</span>
              <span className="text-[#ff8c00] font-semibold">{activeEcosystemMeta.name}</span>
            </div>
          </div>
        </header>

        {/* Ecosystem Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 gap-1 no-scrollbar border-b border-[#1e2d3d]">
          {ecosystems.map(eco => (
            <button
              key={eco.id}
              onClick={() => { setActiveTab(eco.id); setEcosystem(eco.id); }}
              className={`px-3 py-1.5 text-[11px] font-mono font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === eco.id 
                  ? 'text-[#ff8c00] border-[#ff8c00] bg-[#0f1823]' 
                  : 'text-[#6b7c93] hover:text-[#e8edf3] border-transparent hover:bg-[#0f1823]/50'
              }`}
            >
              {eco.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <div className="bg-[#0f1823] border border-[#1e2d3d] rounded p-3">
            <span className="font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider block mb-1">
              CONNECTED STARTUPS
            </span>
            <div className="font-mono text-xl font-bold text-[#e8edf3]">{ecosystemCompanies.length} Tracked</div>
            <span className="font-mono text-[9px] text-[#2196f3] mt-0.5 block">{activeEcosystemMeta.companyCount}+ in network registry</span>
          </div>

          <div className="bg-[#0f1823] border border-[#1e2d3d] rounded p-3">
            <span className="font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider block mb-1">
              FOUNDER DENSITY
            </span>
            <div className="font-mono text-xl font-bold text-[#00c853]">
              {ecosystemCompanies.reduce((acc, c) => acc + (c.founders?.length || 0), 0)} Founders
            </div>
            <span className="font-mono text-[9px] text-[#4a5a6d] mt-0.5 block">{activeEcosystemMeta.founderCount}+ alumni active</span>
          </div>

          <div className="bg-[#0f1823] border border-[#1e2d3d] rounded p-3">
            <span className="font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider block mb-1">
              CAMPUS & INCUBATION
            </span>
            <div className="font-mono text-sm font-semibold text-[#e8edf3] truncate mt-1">
              {activeTab === 'SRM' ? 'AIC-SRMIST / DEI' :
               activeTab === 'IIT_MADRAS' ? 'IITM Research Park' :
               activeTab === 'CHENNAI' ? 'TIDCO DeepTech Hub' : 'Institutional Hub'}
            </div>
            <span className="font-mono text-[9px] text-[#ff8c00] mt-0.5 block">Direct Incubation Link</span>
          </div>

          <div className="bg-[#0f1823] border border-[#1e2d3d] rounded p-3">
            <span className="font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider block mb-1">
              VERIFICATION STATUS
            </span>
            <div className="font-mono text-sm font-semibold text-[#00c853] mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c853]" />
              <span>100% AUDITED</span>
            </div>
            <span className="font-mono text-[9px] text-[#4a5a6d] mt-0.5 block">Official filings & alumni records</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-3 py-2 bg-[#0f1823] border border-[#1e2d3d] rounded-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-[11px] text-[#ff8c00] uppercase tracking-wider">
              {activeEcosystemMeta.name.toUpperCase()} COMPANIES
            </span>
            <span className="font-mono text-[10px] text-[#4a5a6d]">
              ({ecosystemCompanies.length} VERIFIED)
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#4a5a6d]">
            {activeEcosystemMeta.description}
          </span>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border-x border-b border-[#1e2d3d] p-3 bg-[#0a0e17] rounded-b">
          {ecosystemCompanies.map((company) => {
            const ecoConn = company.ecosystemConnections?.find(
              ec => ec.ecosystem.toUpperCase() === activeTab.toUpperCase()
            ) || company.ecosystemConnections?.[0];

            return (
              <div
                key={company.id}
                className="bg-[#0f1823] border border-[#1e2d3d] hover:border-[#2a3a4d] rounded p-4 flex flex-col justify-between transition-colors group"
              >
                <div>
                  {/* Top Bar: Name + Stage */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 
                        onClick={() => navigate(`/company/${company.id}`)}
                        className="text-[14px] font-bold text-[#e8edf3] group-hover:text-[#ff8c00] transition-colors cursor-pointer"
                      >
                        {company.name}
                      </h3>
                      <p className="font-mono text-[10px] text-[#4a5a6d] mt-0.5">{company.sector} // {company.industry}</p>
                    </div>
                    <span className="font-mono text-[9px] px-2 py-0.5 bg-[#141e2d] border border-[#2a3a4d] text-[#8899aa] rounded">
                      {company.stage}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6b7c93] leading-relaxed mb-3 line-clamp-2">
                    {company.tagline}
                  </p>

                  {/* Institutional Connection Box */}
                  {ecoConn && (
                    <div className="p-2.5 bg-[#0a0e17] border border-[#1e2d3d] rounded mb-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c00]" />
                        <span className="font-mono text-[10px] font-semibold text-[#ff8c00]">
                          {ecoConn.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#8899aa] leading-snug">
                        {ecoConn.description}
                      </p>
                    </div>
                  )}

                  {/* Verified Founders with Real LinkedIn Links */}
                  <div className="space-y-1.5 mb-4">
                    <span className="font-mono text-[9px] text-[#4a5a6d] uppercase tracking-wider block">
                      KEY LEADERSHIP & ALMA MATER
                    </span>
                    {(company.founders || []).map((founder) => (
                      <div key={founder.id} className="flex items-center justify-between text-[11px] py-1 border-b border-[#1e2d3d]/50 last:border-b-0">
                        <div>
                          <span className="text-[#e8edf3] font-medium">{founder.name}</span>
                          <span className="font-mono text-[9px] text-[#4a5a6d] ml-1.5">
                            {founder.education?.[0] ? `(${founder.education[0]})` : ''}
                          </span>
                        </div>
                        {founder.linkedIn && (
                          <a
                            href={founder.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#0077b5]/15 hover:bg-[#0077b5]/30 text-[#00a0dc] hover:text-white border border-[#0077b5]/30 rounded text-[9px] font-mono transition-colors shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>LinkedIn</span>
                            <ExternalLink size={9} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-[#1e2d3d] flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/company/${company.id}`)}
                    className="flex-1 py-1.5 bg-[#141e2d] hover:bg-[#1a2636] border border-[#1e2d3d] rounded font-mono text-[10px] font-medium text-[#e8edf3] transition-colors cursor-pointer text-center"
                  >
                    DOSSIER →
                  </button>
                  <button
                    onClick={() => navigate(`/xray/${company.id}`)}
                    className="flex-1 py-1.5 bg-[#ff8c00] hover:bg-[#ffa940] rounded font-mono text-[10px] font-bold text-[#0a0e17] transition-colors cursor-pointer text-center"
                  >
                    RUN X-RAY
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
