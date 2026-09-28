import { Recommendation } from './types';

export const recommendations: Recommendation[] = [
  {
    companyId: 'c_zepto',
    companyName: 'Zepto',
    type: 'EMERGING',
    reasons: [
      'Rapidly taking market share from Zomato and Swiggy in Quick Commerce.',
      'High talent density: attracting top engineering talent from established unicorns.',
      'Strong recent funding round in a tough macro environment.'
    ],
    score: 92
  },
  {
    companyId: 'c_agnikul',
    companyName: 'Agnikul Cosmos',
    type: 'THESIS_MATCH',
    reasons: [
      'Matches your thesis on Indian deep-tech and space commercialization.',
      'Strong ecosystem connection to IIT Madras (where you have a strong network).',
      'Recent successful suborbital test flight de-risks core engine technology.'
    ],
    score: 88
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
  }
];
