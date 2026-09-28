import { Investigation } from './types';

export const investigations: Investigation[] = [
  {
    id: 'inv_1',
    query: 'Why has Swiggy raised so much capital compared to Zomato?',
    plan: [
      { label: 'Analyze Cap Tables', status: 'COMPLETE', description: 'Compare historical funding rounds between Swiggy and Zomato.' },
      { label: 'Evaluate Business Mix', status: 'COMPLETE', description: 'Assess capital intensity of Instamart vs Blinkit integration.' },
      { label: 'Review Burn Rates', status: 'IN_PROGRESS', description: 'Estimate monthly cash burn for both entities.' },
      { label: 'Synthesize Findings', status: 'PENDING', description: 'Draft final thesis.' }
    ],
    findings: {
      executiveSummary: 'Swiggy\'s higher private capital raises ($3.6B vs Zomato\'s $2.5B) stem primarily from building its quick commerce infra (Instamart) natively from scratch and funding it entirely with private capital, whereas Zomato acquired Blinkit using public market equity.',
      evidence: [
        'Swiggy total raised: $3.6B (Crunchbase)',
        'Zomato pre-IPO raised: ~$2.1B (Public filings)',
        'Blinkit acquisition cost Zomato ~$568M in all-stock deal (News reports)'
      ],
      supportingSignals: [
        'Swiggy\'s aggressive dark store expansion plans require heavy capex.',
        'Zomato leveraging established Hyperpure supply chain.'
      ],
      contradictingEvidence: [
        'Zomato also burns significant cash internally for scaling Blinkit post-acquisition.'
      ],
      unknowns: [
        'Exact unit economics per dark store for Instamart vs Blinkit.'
      ],
      nextQuestions: [
        'What is Swiggy\'s current cash runway pre-IPO?'
      ],
      sources: ['Crunchbase', 'Public Filings (SEBI)', 'News Articles']
    }
  }
];
