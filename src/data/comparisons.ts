import { CompanyComparison } from './types';

export const comparisons: CompanyComparison[] = [
  {
    companyA: 'c_swiggy',
    companyB: 'c_zomato',
    dimensions: [
      {
        name: 'Reported Revenue',
        companyAValue: '$1.02B (FY23)',
        companyAEvidence: { id: 'ec_c1', claim: '$1.02B', sourceType: 'OFFICIAL_FILING', source: 'Annual Report', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
        companyBValue: '$1.4B (FY24)',
        companyBEvidence: { id: 'ec_c2', claim: '$1.4B', sourceType: 'OFFICIAL_FILING', source: 'Q4 FY24', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' }
      },
      {
        name: 'Quick Commerce Strategy',
        companyAValue: 'In-house built (Instamart)',
        companyAEvidence: { id: 'ec_c3', claim: 'Launched 2020', sourceType: 'COMPANY_STATEMENT', source: 'Blog', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
        companyBValue: 'Acquisition (Blinkit)',
        companyBEvidence: { id: 'ec_c4', claim: 'Acquired 2022', sourceType: 'OFFICIAL_FILING', source: 'BSE Filing', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' }
      }
    ],
    structuralDifferences: [
      'Zomato operates as a public company with quarterly scrutiny; Swiggy is privately funded (soon to IPO).',
      'Zomato has a strong B2B supply business (Hyperpure) which integrates with Blinkit; Swiggy relies more on external partnerships.',
      'Zomato has a strong community/discovery DNA; Swiggy has a stronger logistics/operations DNA.'
    ]
  }
];
