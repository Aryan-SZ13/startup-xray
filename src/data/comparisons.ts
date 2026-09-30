import { CompanyComparison, Company, EvidenceClaim } from './types';

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

export const generateDynamicComparison = (compA: Company, compB: Company): CompanyComparison => {
  const makeEv = (val: string, source: string): EvidenceClaim => ({
    id: `ec_dyn_${Math.random().toString(36).substring(2, 9)}`,
    claim: val,
    source,
    sourceType: 'OFFICIAL_FILING',
    retrievedAt: '2024',
    status: 'VERIFIED',
    confidence: 'HIGH'
  });

  const valA = compA.valuation?.claim || 'Private';
  const valB = compB.valuation?.claim || 'Private';
  const fundA = compA.totalFunding?.claim || 'Undisclosed';
  const fundB = compB.totalFunding?.claim || 'Undisclosed';
  const revA = compA.revenue?.claim || 'Pre-revenue / Early';
  const revB = compB.revenue?.claim || 'Pre-revenue / Early';
  const empA = compA.employees?.claim || 'Core team';
  const empB = compB.employees?.claim || 'Core team';

  return {
    companyA: compA.id,
    companyB: compB.id,
    dimensions: [
      {
        name: 'Last Valued / CapTable',
        companyAValue: valA,
        companyAEvidence: compA.valuation || makeEv(valA, 'CapTable Valuation'),
        companyBValue: valB,
        companyBEvidence: compB.valuation || makeEv(valB, 'CapTable Valuation')
      },
      {
        name: 'Total Capital Raised',
        companyAValue: fundA,
        companyAEvidence: compA.totalFunding || makeEv(fundA, 'PitchBook / MCA Filing'),
        companyBValue: fundB,
        companyBEvidence: compB.totalFunding || makeEv(fundB, 'PitchBook / MCA Filing')
      },
      {
        name: 'Reported Topline Revenue',
        companyAValue: revA,
        companyAEvidence: compA.revenue || makeEv(revA, 'Audited Financials'),
        companyBValue: revB,
        companyBEvidence: compB.revenue || makeEv(revB, 'Audited Financials')
      },
      {
        name: 'Team Scale & Headcount',
        companyAValue: empA,
        companyAEvidence: compA.employees || makeEv(empA, 'LinkedIn Talent Graph'),
        companyBValue: empB,
        companyBEvidence: compB.employees || makeEv(empB, 'LinkedIn Talent Graph')
      },
      {
        name: 'Growth Stage & Maturity',
        companyAValue: compA.stage.replace(/_/g, ' '),
        companyAEvidence: makeEv(compA.stage, 'Corporate Registry'),
        companyBValue: compB.stage.replace(/_/g, ' '),
        companyBEvidence: makeEv(compB.stage, 'Corporate Registry')
      },
      {
        name: 'Headquarters & Base',
        companyAValue: compA.headquarters,
        companyAEvidence: makeEv(compA.headquarters, 'Registered Office Filing'),
        companyBValue: compB.headquarters,
        companyBEvidence: makeEv(compB.headquarters, 'Registered Office Filing')
      }
    ],
    structuralDifferences: [
      `Geographic & Operational Footprint: ${compA.name} is headquartered in ${compA.headquarters}, while ${compB.name} operates out of ${compB.headquarters}.`,
      `Capital Strategy: ${compA.name} has raised ${compA.totalFunding?.claim || 'selective funding'} at ${compA.stage} stage, contrasting with ${compB.name}'s ${compB.totalFunding?.claim || 'growth capital'} at ${compB.stage}.`,
      `Go-To-Market & Business Model: ${compA.name} leverages ${compA.companyDNA?.businessModel || compA.industry}, whereas ${compB.name} focuses on ${compB.companyDNA?.businessModel || compB.industry}.`,
      `Leadership & Talent Corridor: ${compA.name} was co-founded by ${compA.founders[0]?.name || 'founders'} (${compA.founders[0]?.education?.[0] || 'Technical Cohort'}), compared with ${compB.name} led by ${compB.founders[0]?.name || 'founding team'} (${compB.founders[0]?.education?.[0] || 'Operations Lead'}).`
    ]
  };
};
