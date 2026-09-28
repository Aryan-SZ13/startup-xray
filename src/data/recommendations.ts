import { Recommendation, Company } from './types';

export const recommendations: Recommendation[] = [
  {
    companyId: 'c_zepto',
    companyName: 'Zepto',
    type: 'EMERGING',
    reasons: [
      'Rapidly taking market share from Zomato and Swiggy in Quick Commerce.',
      'High talent density: attracting top engineering talent from established unicorns.',
      'Strong recent funding round ($450M) in a tough macro environment.',
      'SRM campus hiring pipeline active for mobile engineering.'
    ],
    score: 94
  },
  {
    companyId: 'c_agnikul',
    companyName: 'Agnikul Cosmos',
    type: 'THESIS_MATCH',
    reasons: [
      'Matches your thesis on Indian deep-tech and space commercialization.',
      'Strong ecosystem connection to IIT Madras & Chennai testing cluster.',
      'Recent successful suborbital test flight de-risks core 3D-printed engine technology.',
      'Low public visibility with highest signal density in spacetech.'
    ],
    score: 89
  },
  {
    companyId: 'c_skyroot',
    companyName: 'Skyroot Aerospace',
    type: 'ADJACENT',
    reasons: [
      'Adjacent competitor to Agnikul in small-satellite dedicated launch services.',
      'Secured 4 European commercial earth-observation payload contracts.',
      'Strong founder-market fit with ex-ISRO rocket propulsion scientists.'
    ],
    score: 86
  },
  {
    companyId: 'c_zomato',
    companyName: 'Zomato',
    type: 'DIRECT_COMPARABLE',
    reasons: [
      'Direct peer in Indian food delivery and quick commerce with Blinkit.',
      'Profitable balance sheet proving public market viability of unit economics.',
      'Co-investor overlap with Info Edge and institutional funds.'
    ],
    score: 96
  },
  {
    companyId: 'c_swiggy',
    companyName: 'Swiggy',
    type: 'DIRECT_COMPARABLE',
    reasons: [
      'Pre-IPO candidate benchmarking against Zomato public trading multiples.',
      'Early engineering team alumni connection to SRM ecosystem.',
      'Aggressive dark store expansion across Tier-2 Indian hubs.'
    ],
    score: 91
  }
];

export function getContextualRecommendations(params: {
  investigatedCompanies?: string[];
  savedTheses?: string[];
  linkedInConnected?: boolean;
  activeEcosystem?: string;
  allCompanies: Company[];
}): Recommendation[] {
  const { investigatedCompanies = [], linkedInConnected = false, activeEcosystem = 'GLOBAL', allCompanies } = params;
  
  const recMap = new Map<string, { company: Company; reasons: string[]; score: number; type: Recommendation['type'] }>();

  // If user investigated food delivery (Swiggy / Zomato / Zepto)
  const investigatedFood = investigatedCompanies.some(id => ['c_swiggy', 'c_zomato', 'c_zepto', 'swiggy', 'zomato', 'zepto'].includes(id.toLowerCase()));
  // If user investigated spacetech / deeptech
  const investigatedSpace = investigatedCompanies.some(id => ['c_agnikul', 'c_skyroot', 'agnikul', 'skyroot'].includes(id.toLowerCase()));

  allCompanies.forEach(c => {
    const reasons: string[] = [];
    let score = 70;
    let type: Recommendation['type'] = 'ADJACENT';

    // Sector similarity
    if (investigatedFood && ['On-Demand Services', 'Consumer Technology'].includes(c.sector)) {
      reasons.push(`Direct market comparable to recently investigated on-demand platforms`);
      score += 15;
      type = 'DIRECT_COMPARABLE';
    }

    if (investigatedSpace && c.industry === 'DeepTech') {
      reasons.push(`High deeptech alignment with your recent spacetech research`);
      score += 18;
      type = 'THESIS_MATCH';
    }

    // Ecosystem bonus
    if (activeEcosystem && activeEcosystem !== 'GLOBAL') {
      const hasEco = c.ecosystemConnections?.some(ec => ec.ecosystem.toUpperCase() === activeEcosystem.toUpperCase());
      if (hasEco) {
        reasons.push(`Connected to your active ${activeEcosystem} ecosystem lens`);
        score += 12;
      }
    }

    // Network relevance
    if (linkedInConnected && (c.id === 'c_swiggy' || c.id === 'c_agnikul')) {
      reasons.push(`Verified alumni or warm introduction path in your personal network`);
      score += 10;
      type = 'FOUNDER_NETWORK';
    }

    // Signal density / Under the radar
    if (c.visibility === 'LOW' && c.signalDensity === 'HIGH') {
      reasons.push(`Quiet mover: low public coverage + rapid observable milestone velocity`);
      score += 14;
      type = 'EMERGING';
    }

    if (reasons.length > 0) {
      recMap.set(c.id, { company: c, reasons, score, type });
    }
  });

  // If map is empty, fallback to base recommendations
  if (recMap.size === 0) {
    return recommendations;
  }

  return Array.from(recMap.values())
    .sort((a, b) => b.score - a.score)
    .map(item => ({
      companyId: item.company.id,
      companyName: item.company.name,
      type: item.type,
      reasons: item.reasons,
      score: item.score
    }));
}

