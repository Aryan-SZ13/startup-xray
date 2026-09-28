import { RedTeamAnalysis } from './types';

export const redTeamAnalyses: Record<string, RedTeamAnalysis> = {
  'c_swiggy': {
    thesis: 'Swiggy will successfully IPO at a $12B+ valuation and achieve profitability by FY25 on the back of Instamart growth.',
    bullCase: [
      'Duopoly market structure in food delivery allows for steady margin expansion and reduced discounting.',
      'Instamart cross-selling to existing high-LTV food delivery users drastically lowers CAC for quick commerce.',
      'Dineout acquisition provides a high-margin advertising revenue stream.'
    ],
    bearCase: [
      'Zepto\'s aggressive, highly capitalized expansion forces Swiggy into a protracted discount war in quick commerce, destroying margins.',
      'Zomato\'s Blinkit has already achieved scale and operational efficiency that Swiggy is struggling to match.',
      'Platform fee hikes face fierce consumer backlash, stalling food delivery GOV growth.'
    ],
    contradictoryEvidence: [
      'Company claims path to profitability, but recent hirings and aggressive tier-2 city expansions suggest heavy reinvestment rather than cost-cutting.'
    ],
    unknownVariables: [
      'The exact customer overlap percentage between Food Delivery and Instamart.',
      'Actual retention cohorts for Instamart users acquired in the last 12 months.'
    ],
    assumptions: [
      'Assumes quick commerce TAM in India expands beyond top 10 cities.',
      'Assumes regulatory environment remains stable (no caps on platform fees/commissions).'
    ],
    fiveThingsWrong: [
      'Quick commerce may structurally never be profitable outside of hyper-dense pockets in tier 1 cities.',
      'Attrition of delivery partners to generic gig-work (e.g., Rapido, Uber) could spike logistics costs.',
      'The $12B valuation multiple might contract if global tech markets cool before the IPO.',
      'Zepto might siphon away the most profitable \"power users\" in metros.',
      'Antitrust scrutiny in India regarding restaurant commissions is an under-priced risk.'
    ]
  }
};
