import { companies } from './companies';
import { ecosystems } from './ecosystems';
import { markets } from './markets';
import { opportunities } from './opportunities';
import { investigations } from './investigations';
import { redTeamAnalyses } from './redteam';
import { comparisons, generateDynamicComparison } from './comparisons';
import { networkConnections, networkPaths } from './network';
import { recommendations, getContextualRecommendations } from './recommendations';
import { dominoEffects } from './domino';
import { intelligenceEvents } from './intelligence';
import { earlySignals } from './earlySignals';

export * from './types';
export {
  companies,
  ecosystems,
  markets,
  opportunities,
  investigations,
  redTeamAnalyses,
  comparisons,
  networkConnections,
  networkPaths,
  recommendations,
  getContextualRecommendations,
  dominoEffects,
  intelligenceEvents,
  earlySignals
};

// Convenience aliases for page imports
export const demoInvestigation = investigations[0];
export const demoRedTeam = redTeamAnalyses['c_swiggy'];
export const dominoEffect = dominoEffects[0];
export const companyComparisons = comparisons;
export const marketSectors = markets;

export const getCompanyById = (id: string) => {
  if (!id) return undefined;
  const cleanId = id.toLowerCase().trim();
  return companies.find(c => 
    c.id.toLowerCase() === cleanId || 
    c.id.toLowerCase() === `c_${cleanId}` ||
    c.name.toLowerCase() === cleanId ||
    c.name.toLowerCase().replace(/\s+/g, '') === cleanId
  );
};
export const searchCompanies = (query: string) => {
  const q = query.toLowerCase();
  return companies.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.industry.toLowerCase().includes(q) ||
    c.sector.toLowerCase().includes(q) ||
    c.tagline.toLowerCase().includes(q)
  );
};
export const getCompaniesForEcosystem = (ecosystemId: string) => {
  return companies.filter(c => 
    c.ecosystemConnections?.some(ec => ec.ecosystem.toUpperCase() === ecosystemId.toUpperCase() || ec.ecosystem === ecosystemId) ||
    c.founders?.some(f => f.ecosystemConnections?.includes(ecosystemId))
  );
};
export const getRecommendationsForCompany = (companyId: string) => recommendations.filter(r => r.companyId === companyId);
export const getRedTeamAnalysis = (companyId: string) => redTeamAnalyses[companyId];
export const getCompanyComparison = (companyA: string, companyB: string) => {
  const norm = (id: string) => id?.toLowerCase().replace(/^c_/, '');
  const aNorm = norm(companyA);
  const bNorm = norm(companyB);
  const existing = comparisons.find(c => 
    (norm(c.companyA) === aNorm && norm(c.companyB) === bNorm) || 
    (norm(c.companyA) === bNorm && norm(c.companyB) === aNorm)
  );
  if (existing) return existing;

  const compA = getCompanyById(companyA);
  const compB = getCompanyById(companyB);
  if (compA && compB) {
    return generateDynamicComparison(compA, compB);
  }
  return undefined;
};

