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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-12 pb-24 px-3 lg:px-6">
      <div className="max-w-[1720px] mx-auto">

        {/* Page Header */}
        <header className="mb-6 border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-orange-600" />
              <span className="font-mono font-bold text-[11px] text-orange-600 tracking-wider uppercase">
                INSTITUTIONAL INTELLIGENCE
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              ECOSYSTEM &amp; ALUMNI CORRIDOR
            </h1>
            <p className="font-mono text-[11px] text-slate-500 mt-0.5">
              Verified university alumni networks, research park incubations, and institutional talent pipelines.
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500">
            <div className="bg-white border border-slate-200 shadow-2xs px-3 py-1.5 rounded-md flex items-center gap-2">
              <span className="text-slate-500 font-medium">ACTIVE LENS:</span>
              <span className="text-orange-600 font-bold">{activeEcosystemMeta.name}</span>
            </div>
          </div>
        </header>

        {/* Ecosystem Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 gap-1 no-scrollbar border-b border-slate-200">
          {ecosystems.map(eco => (
            <button
              key={eco.id}
              onClick={() => { setActiveTab(eco.id); setEcosystem(eco.id); }}
              className={`px-3 py-1.5 text-[11px] font-mono font-bold whitespace-nowrap transition-all rounded-md cursor-pointer ${
                activeTab === eco.id 
                  ? 'text-orange-600 bg-orange-50 border border-orange-200 shadow-2xs' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {eco.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white border border-slate-200 shadow-xs rounded-lg p-3.5">
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-1 font-semibold">
              CONNECTED STARTUPS
            </span>
            <div className="font-mono text-xl font-extrabold text-slate-900">{ecosystemCompanies.length} Tracked</div>
            <span className="font-mono text-[9px] text-blue-600 font-medium mt-0.5 block">{activeEcosystemMeta.companyCount}+ in network registry</span>
          </div>

          <div className="bg-white border border-slate-200 shadow-xs rounded-lg p-3.5">
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-1 font-semibold">
              FOUNDER DENSITY
            </span>
            <div className="font-mono text-xl font-extrabold text-emerald-700">
              {ecosystemCompanies.reduce((acc, c) => acc + (c.founders?.length || 0), 0)} Founders
            </div>
            <span className="font-mono text-[9px] text-slate-500 font-medium mt-0.5 block">{activeEcosystemMeta.founderCount}+ alumni active</span>
          </div>

          <div className="bg-white border border-slate-200 shadow-xs rounded-lg p-3.5">
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-1 font-semibold">
              CAMPUS &amp; INCUBATION
            </span>
            <div className="font-mono text-sm font-bold text-slate-900 truncate mt-1">
              {activeTab === 'SRM' ? 'AIC-SRMIST / DEI' :
               activeTab === 'IIT_MADRAS' ? 'IITM Research Park' :
               activeTab === 'CHENNAI' ? 'TIDCO DeepTech Hub' : 'Institutional Hub'}
            </div>
            <span className="font-mono text-[9px] text-orange-600 font-medium mt-0.5 block">Direct Incubation Link</span>
          </div>

          <div className="bg-white border border-slate-200 shadow-xs rounded-lg p-3.5">
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-1 font-semibold">
              VERIFICATION STATUS
            </span>
            <div className="font-mono text-sm font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>100% AUDITED</span>
            </div>
            <span className="font-mono text-[9px] text-slate-500 font-medium mt-0.5 block">Official filings &amp; alumni records</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[11px] text-orange-600 uppercase tracking-wider">
              {activeEcosystemMeta.name.toUpperCase()} COMPANIES
            </span>
            <span className="font-mono text-[10px] text-slate-500">
              ({ecosystemCompanies.length} VERIFIED)
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">
            {activeEcosystemMeta.description}
          </span>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 border-x border-b border-slate-200 p-3.5 bg-slate-50/40 rounded-b-lg shadow-xs">
          {ecosystemCompanies.map((company) => {
            const ecoConn = company.ecosystemConnections?.find(
              ec => ec.ecosystem.toUpperCase() === activeTab.toUpperCase()
            ) || company.ecosystemConnections?.[0];

            return (
              <div
                key={company.id}
                className="bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 rounded-lg p-4 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Top Bar: Name + Stage */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 
                        onClick={() => navigate(`/company/${company.id}`)}
                        className="text-[14px] font-bold text-slate-900 group-hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        {company.name}
                      </h3>
                      <p className="font-mono text-[10px] text-slate-400 mt-0.5">{company.sector} // {company.industry}</p>
                    </div>
                    <span className="font-mono text-[9px] px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded font-semibold">
                      {company.stage}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {company.tagline}
                  </p>

                  {/* Institutional Connection Box */}
                  {ecoConn && (
                    <div className="p-2.5 bg-orange-50/40 border border-orange-200/60 rounded-md mb-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                        <span className="font-mono text-[10px] font-bold text-orange-700">
                          {ecoConn.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        {ecoConn.description}
                      </p>
                    </div>
                  )}

                  {/* Verified Founders with Real LinkedIn Links */}
                  <div className="space-y-1.5 mb-4">
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block font-semibold">
                      KEY LEADERSHIP &amp; ALMA MATER
                    </span>
                    {(company.founders || []).map((founder) => (
                      <div key={founder.id} className="flex items-center justify-between text-[11px] py-1 border-b border-slate-100 last:border-b-0">
                        <div>
                          <span className="text-slate-900 font-bold">{founder.name}</span>
                          <span className="font-mono text-[9px] text-slate-500 ml-1.5">
                            {founder.education?.[0] ? `(${founder.education[0]})` : ''}
                          </span>
                        </div>
                        {founder.linkedIn && (
                          <a
                            href={founder.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30 rounded text-[9px] font-mono font-bold transition-colors shrink-0"
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
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/company/${company.id}`)}
                    className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md font-mono text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer text-center"
                  >
                    DOSSIER →
                  </button>
                  <button
                    onClick={() => navigate(`/xray/${company.id}`)}
                    className="flex-1 py-1.5 bg-orange-600 hover:bg-orange-500 rounded-md font-mono text-[10px] font-bold text-white transition-colors cursor-pointer text-center shadow-2xs"
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
