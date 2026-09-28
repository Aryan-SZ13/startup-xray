import type { NewsEvent } from './types';

export const intelligenceEvents: (NewsEvent & { hasDominoMap?: boolean; timeAgo?: string })[] = [
  {
    id: 'int_1',
    headline: 'Swiggy DRHP Cleared by SEBI for Landmark $1.4B Public Listing',
    date: 'Just now • 28 mins ago',
    timeAgo: '28m ago',
    source: 'SEBI Official Gazette / Reuters',
    sourceUrl: 'https://www.sebi.gov.in',
    affectedCompanies: ['Swiggy', 'Zomato', 'Zepto'],
    market: 'Consumer Technology & Q-Commerce',
    impact: 'SEBI greenlights draft prospectus. Duopoly multiples set to trigger institutional re-allocation between Zomato equity and Swiggy anchor book.',
    impactLevel: 'HIGH',
    hasDominoMap: true
  },
  {
    id: 'int_2',
    headline: 'Zepto Raises Additional $450M in Pre-IPO Mezzanine Round',
    date: '45 mins ago',
    timeAgo: '45m ago',
    source: 'Bloomberg Tech / SEC Form D',
    sourceUrl: 'https://bloomberg.com',
    affectedCompanies: ['Zepto', 'Swiggy', 'Blinkit'],
    market: 'Ultra-Fast Logistics',
    impact: 'Valuation jumps to $5.0B. Dark store footprint expanded to 700 hubs across tier-1 & tier-2 corridors ahead of FY26 domestic listing.',
    impactLevel: 'HIGH',
    hasDominoMap: true
  },
  {
    id: 'int_3',
    headline: 'Agnikul Cosmos Completes Cryogenic Upper-Stage Test at Sriharikota',
    date: '1 hour ago',
    timeAgo: '1h ago',
    source: 'IN-SPACe Bulletin & ISRO Telemetry',
    sourceUrl: 'https://www.isro.gov.in',
    affectedCompanies: ['Agnikul Cosmos', 'Skyroot Aerospace'],
    market: 'Commercial Spaceflight',
    impact: 'World first 3D-printed semi-cryogenic engine demonstrates uninterrupted 180-second burn. Clears path for commercial satellite orbital injection.',
    impactLevel: 'HIGH',
    hasDominoMap: false
  },
  {
    id: 'int_4',
    headline: 'OpenAI Releases Realtime Voice & Vision API for Enterprise Clusters',
    date: '2 hours ago',
    timeAgo: '2h ago',
    source: 'OpenAI Engineering Dispatch',
    sourceUrl: 'https://openai.com/blog',
    affectedCompanies: ['OpenAI', 'Microsoft'],
    market: 'Generative AI Foundation Layer',
    impact: 'Sub-300ms multimodal audio latency natively available in production tier. Threatens standalone voice AI SaaS startups.',
    impactLevel: 'HIGH',
    hasDominoMap: false
  },
  {
    id: 'int_5',
    headline: 'Zomato District App Crosses 5M Downloads in Q3 Consolidation Move',
    date: '3 hours ago',
    timeAgo: '3h ago',
    source: 'BSE India Disclosure',
    sourceUrl: 'https://www.bseindia.com',
    affectedCompanies: ['Zomato', 'Swiggy Dineout'],
    market: 'Consumer Experience & Going-Out',
    impact: 'Deepinder Goyal reports record take-rates on events, movie ticketing, and dining out vertical following Paytm entertainment asset buyout.',
    impactLevel: 'MEDIUM',
    hasDominoMap: false
  },
  {
    id: 'int_6',
    headline: 'Skyroot Aerospace Secures Multiple International Launch Contracts for Vikram-1',
    date: '4 hours ago',
    timeAgo: '4h ago',
    source: 'French Space Agency (CNES) / TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    affectedCompanies: ['Skyroot Aerospace', 'Agnikul Cosmos'],
    market: 'SmallSat Launch Services',
    impact: 'Four European earth-observation startups commit payloads for upcoming Q4 orbital mission, validating Indian low-cost private launch economics.',
    impactLevel: 'HIGH',
    hasDominoMap: false
  }
];
