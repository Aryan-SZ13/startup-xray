import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Building, Users, Activity, Link as LinkIcon } from 'lucide-react';
import { companies } from '../data';
import { ecosystems } from '../data/ecosystems';
import type { EcosystemType } from '../data/types';
import { useAppState } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

export default function EcosystemPage() {
  const navigate = useNavigate();
  const { ecosystem, setEcosystem } = useAppState();
  const [activeTab, setActiveTab] = useState<EcosystemType>(ecosystem || 'SRM');

  // Filter mock
  const ecosystemCompanies = companies.filter(c => true); // Show all for demo

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 p-8 pb-24">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2 text-purple-400">
          <Globe className="w-8 h-8" />
          <h1 className="text-3xl font-light tracking-widest text-white">ECOSYSTEM EXPLORER</h1>
        </div>
        <p className="text-gray-500 text-lg">Trace origins, alumni networks, and local clusters.</p>
      </header>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar border-b border-white/5">
        {ecosystems.map(eco => (
          <button
            key={eco.id}
            onClick={() => { setActiveTab(eco.id); setEcosystem(eco.id); }}
            className={`px-6 py-2.5 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === eco.id 
                ? 'bg-[#111118] text-white border-t border-x border-white/10' 
                : 'text-gray-500 hover:text-gray-300 bg-transparent border-transparent'
            }`}
          >
            {eco.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
          <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
            <Building className="w-3 h-3" /> Total Companies
          </div>
          <div className="text-3xl font-light text-white">124</div>
        </div>
        <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
          <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
            <Users className="w-3 h-3" /> Founders
          </div>
          <div className="text-3xl font-light text-white">210</div>
        </div>
        <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
          <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
            <Activity className="w-3 h-3" /> Total Funding
          </div>
          <div className="text-3xl font-light text-emerald-400">$45M+</div>
        </div>
        <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
          <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
            <LinkIcon className="w-3 h-3" /> Network Density
          </div>
          <div className="text-3xl font-light text-purple-400">High</div>
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase">Companies in {activeTab}</h2>
          <div className="flex gap-2">
            {['Alumni Founders', 'Incubated', 'Hiring'].map(tag => (
              <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 rounded-full border border-white/10 text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystemCompanies.map((company, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/company/${company.id}`)}
              className="bg-[#111118] border border-white/5 hover:border-purple-500/30 rounded-xl p-5 cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">{company.name}</h3>
                <span className="text-[9px] uppercase tracking-wider px-2 py-1 rounded bg-purple-950/30 border border-purple-500/30 text-purple-400">
                  Alumni Founder
                </span>
              </div>
              
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">{company.description}</p>
              
              <div className="flex items-center gap-3 text-xs text-gray-500 bg-[#0a0a0f] p-2.5 rounded-lg border border-white/5">
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                  <UserIcon className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-gray-300">Aryan Singh</span>
                  <span className="mx-1">•</span> 
                  <span>B.Tech CSE '25</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function UserIcon(props: any) {
  return <Users {...props} />;
}
