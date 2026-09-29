import { Company } from './types';

export const companies: Company[] = [
  {
    id: 'c_swiggy',
    name: 'Swiggy',
    logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg',
    tagline: 'Delivering happiness to your doorstep',
    description: 'Swiggy is India\'s leading on-demand delivery platform with a vision to elevate the quality of life for the urban consumer by offering unparalleled convenience.',
    industry: 'Consumer Technology',
    subIndustry: 'Food Delivery, Quick Commerce',
    sector: 'On-Demand Services',
    founded: '2014-08-01',
    headquarters: 'Bangalore, India',
    website: 'https://www.swiggy.com',
    stage: 'LATE_STAGE',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_sriharsha',
        name: 'Sriharsha Majety',
        title: 'CEO & Co-founder',
        education: ['BITS Pilani (M.Sc Physics + B.E. EEE)', 'IIM Calcutta'],
        ecosystemConnections: ['BITS_PILANI'],
        linkedIn: 'https://www.linkedin.com/in/sriharsha-majety/'
      },
      {
        id: 'f_nandan',
        name: 'Nandan Reddy',
        title: 'Co-founder',
        education: ['BITS Pilani (M.Sc Physics)'],
        ecosystemConnections: ['BITS_PILANI'],
        linkedIn: 'https://www.linkedin.com/in/nandan-reddy-57221b34/'
      },
      {
        id: 'f_phani',
        name: 'Phani Kishan Addepalli',
        title: 'Co-founder',
        education: ['IIT Madras (Computer Science)'],
        ecosystemConnections: ['IIT_MADRAS'],
        linkedIn: 'https://www.linkedin.com/in/phanikishan/'
      }
    ],
    investors: [
      { id: 'i_pros', name: 'Prosus', type: 'VC' },
      { id: 'i_softbank', name: 'SoftBank Vision Fund', type: 'VC' },
      { id: 'i_accel', name: 'Accel', type: 'VC' }
    ],
    fundingRounds: [
      {
        id: 'fr_sw_1',
        type: 'Series K',
        amount: { id: 'ec_1', claim: 'Raised $700M', value: 700000000, source: 'Invesco Filing', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2022-01-24',
        investors: ['Invesco', 'Baron Capital Group'],
        valuation: { id: 'ec_2', claim: 'Valued at $10.7B', value: 10700000000, source: 'Company Statement', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' }
      }
    ],
    totalFunding: { id: 'ec_3', claim: 'Total $3.6B', value: 3600000000, source: 'Crunchbase', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: 'ec_4', claim: '$1.02B (FY23)', value: 1020000000, source: 'Annual Report', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    valuation: { id: 'ec_5', claim: '$12.7B', value: 12700000000, source: 'Invesco Markup', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'ESTIMATED', confidence: 'MEDIUM' },
    competitors: ['c_zomato', 'c_zepto'],
    markets: ['India'],
    signals: [
      { id: 'sig_1', type: 'HIRING', title: 'VP Engineering Hire', description: 'Hired VP from Amazon', date: '2024-03-15', strength: 'STRONG', isEarlySignal: false },
      { id: 'sig_2', type: 'PRODUCT', title: 'Instamart Expansion', description: 'Expanding to 10 new tier-2 cities', date: '2024-04-10', strength: 'MODERATE', isEarlySignal: true }
    ],
    legalEvents: [
      { id: 'le_1', type: 'IPO_FILING', title: 'Draft Red Herring Prospectus', date: '2024-05-01', status: 'FILED', description: 'Filed confidential DRHP for $1B+ IPO', source: { id: 'ec_6', claim: 'DRHP Filed', source: 'SEBI', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' } }
    ],
    newsEvents: [
      { id: 'ne_1', headline: 'Swiggy files for confidential IPO', date: '2024-04-30', source: 'Economic Times', affectedCompanies: ['c_swiggy', 'c_zomato'], impactLevel: 'HIGH' }
    ],
    ecosystemConnections: [
      { type: 'ALUMNI_FOUNDER', ecosystem: 'BITS_PILANI', label: 'BITS Pilani Alumni Founders', description: 'Founded by BITS Pilani graduates Sriharsha Majety and Nandan Reddy', verified: true }
    ],
    financialMetrics: [
      { id: 'fm_1', metric: 'Gross Order Value', value: { id: 'ec_7', claim: '$3.3B', source: 'Prosus Annual Report', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' }, trend: 'UP' }
    ],
    operationSignals: [
      { category: 'Logistics', signal: 'Delivery Fleet Size', direction: 'UP', evidence: { id: 'ec_8', claim: '350k+ partners', source: 'Company Blog', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'MEDIUM' } }
    ],
    companyDNA: {
      businessModel: 'Commission on delivery + Subscription + Advertising',
      market: 'Indian food delivery & quick commerce',
      product: 'Consumer App, Delivery Partner App, Restaurant Dashboard',
      capital: 'Highly capitalized, pursuing profitability',
      traction: 'Millions of daily orders, expanding quick commerce',
      team: 'Execution-focused, aggressive expansion',
      operations: 'Hyper-local logistics optimization',
      technology: 'Advanced routing algorithms, ML for personalization',
      risks: 'High cash burn in quick commerce, regulatory scrutiny'
    },
    storyVsSignal: {
      companyClaim: 'On path to profitability in FY25',
      signals: [
        { label: 'Discounting Intensity', direction: 'UP' },
        { label: 'Q-commerce Expansion', direction: 'UP' }
      ],
      mismatchSummary: 'Claiming profitability while aggressively investing in high-burn quick commerce (Instamart) expansion to fight Zepto.',
      severity: 'MEDIUM'
    },
    blindSpots: [
      { area: 'Quick Commerce Unit Economics', known: true, importance: 'CRITICAL', question: 'Can Instamart ever achieve standalone profitability against Zepto/Blinkit?' }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Burned $500M+ competing with Zomato in food delivery while operating Instamart at single-digit take rates.',
      whatChanged: 'SEBI approved draft IPO prospectus; dark store density increased to 600+ across tier-1 & tier-2 corridors.',
      whyItMatters: 'Public listing forces disclosure of cohort profitability while battle against Zepto moves to pre-IPO war footing.',
      catalystTimestamp: '28m ago'
    },
    signalStack: [
      { category: 'REGULATORY', headline: 'SEBI clears DRHP for $1.4B public IPO', timestamp: '28m ago', source: 'SEBI Official Gazette', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'COMMERCIAL', headline: '150 dark-store cluster lease executed in Tier-2 corridor', timestamp: '1h ago', source: 'State Real Estate Registries', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'TALENT', headline: 'VP Engineering poached from Amazon AWS Logistics', timestamp: '2w ago', source: 'LinkedIn Profile Transition', confidence: 'MEDIUM', status: 'REPORTED' },
      { category: 'CAPITAL', headline: 'Anchor book institutional commitments 3.2x oversubscribed', timestamp: '4h ago', source: 'Merchant Banker Briefing', confidence: 'MEDIUM', status: 'REPORTED' }
    ]
  },
  {
    id: 'c_zomato',
    name: 'Zomato',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Zomato_logo.svg',
    tagline: 'Better food for more people',
    description: 'Zomato is an Indian multinational restaurant aggregator and food delivery company.',
    industry: 'Consumer Technology',
    subIndustry: 'Food Delivery, Quick Commerce, B2B Supplies',
    sector: 'On-Demand Services',
    founded: '2008-07-01',
    headquarters: 'Gurgaon, India',
    website: 'https://www.zomato.com',
    stage: 'PUBLIC',
    status: 'IPO',
    founders: [
      {
        id: 'f_deepinder',
        name: 'Deepinder Goyal',
        title: 'CEO & Co-founder',
        education: ['IIT Delhi (Integrated M.Tech Mathematics & Computing)'],
        ecosystemConnections: ['IIT_DELHI'],
        linkedIn: 'https://www.linkedin.com/in/deepindergoyal/'
      }
    ],
    investors: [
      { id: 'i_infoedge', name: 'Info Edge', type: 'VC' },
      { id: 'i_sequoia', name: 'Sequoia Capital', type: 'VC' }
    ],
    fundingRounds: [],
    totalFunding: { id: 'ec_z1', claim: '$2.5B', value: 2500000000, source: 'Public Filings', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: 'ec_z2', claim: '$1.4B (FY24)', value: 1400000000, source: 'Q4 FY24 Earnings', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    valuation: { id: 'ec_z3', claim: '$21B Market Cap', value: 21000000000, source: 'NSE', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    competitors: ['c_swiggy', 'c_zepto'],
    markets: ['India', 'UAE'],
    signals: [
      { id: 'sig_z1', type: 'FINANCIAL', title: 'Achieved Full Year Profitability', description: 'FY24 net profit of INR 351 Cr', date: '2024-05-13', strength: 'STRONG', isEarlySignal: false }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [],
    financialMetrics: [
      { id: 'fm_z1', metric: 'Adjusted EBITDA', value: { id: 'ec_z4', claim: 'Positive', source: 'Q4 Earnings', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' }, trend: 'UP' }
    ],
    operationSignals: [],
    companyDNA: {
      businessModel: 'Food Delivery, Blinkit (Q-Commerce), Hyperpure (B2B), Going Out',
      market: 'India Food & Grocery',
      product: 'Consumer App, Blinkit App, Hyperpure',
      capital: 'Public, highly liquid',
      traction: 'Profitable growth, market leader in food delivery',
      team: 'Aggressive marketing, strong culture',
      operations: 'Integrated B2B and B2C logistics',
      technology: 'Scaling highly concurrent systems',
      risks: 'Regulatory caps on commissions, blinkit integration'
    },
    blindSpots: [
      { area: 'Blinkit Take Rate Saturation', known: true, importance: 'HIGH', question: 'How high can delivery and handling fees rise before cart abandonment spikes?' }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Struggled with food delivery margins and investor skepticism after Blinkit acquisition in 2022.',
      whatChanged: 'Blinkit turned EBITDA positive ahead of projections; acquired Paytm events business for Rs 2,048 Cr.',
      whyItMatters: 'Consolidating into a 4-engine platform (Food, Grocery, Supplies, Going-Out) with superior cash flow generation.',
      catalystTimestamp: '3h ago'
    },
    signalStack: [
      { category: 'COMMERCIAL', headline: 'District App crosses 5M downloads consolidating going-out', timestamp: '3h ago', source: 'BSE Disclosure', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'CAPITAL', headline: 'Board approves $1B QIP allocation for cash balance preservation', timestamp: '1d ago', source: 'Exchange Filing', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'TALENT', headline: 'Hyperpure supply chain division scales headcount by 24%', timestamp: '3d ago', source: 'LinkedIn Talent Insights', confidence: 'MEDIUM', status: 'REPORTED' }
    ]
  },
  {
    id: 'c_zepto',
    name: 'Zepto',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Zepto_logo.svg/200px-Zepto_logo.svg.png',
    tagline: 'Groceries delivered in 10 minutes',
    description: 'Zepto is a fast-growing Indian quick commerce company that delivers groceries and everyday essentials in 10 minutes.',
    industry: 'Consumer Technology',
    subIndustry: 'Quick Commerce',
    sector: 'On-Demand Services',
    founded: '2021-04-01',
    headquarters: 'Mumbai, India',
    website: 'https://www.zeptonow.com',
    stage: 'GROWTH',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_aadit',
        name: 'Aadit Palicha',
        title: 'CEO & Co-founder',
        education: ['Stanford University (Computer Science, Dropout)'],
        ecosystemConnections: ['STANFORD'],
        linkedIn: 'https://www.linkedin.com/in/aadit-palicha/'
      },
      {
        id: 'f_kaivalya',
        name: 'Kaivalya Vohra',
        title: 'CTO & Co-founder',
        education: ['Stanford University (Computer Science, Dropout)'],
        ecosystemConnections: ['STANFORD'],
        linkedIn: 'https://www.linkedin.com/in/kaivalya-vohra/'
      }
    ],
    investors: [
      { id: 'i_ycombinator', name: 'Y Combinator', type: 'ACCELERATOR' },
      { id: 'i_nexus', name: 'Nexus Venture Partners', type: 'VC' },
      { id: 'i_glade', name: 'Glade Brook Capital', type: 'VC' }
    ],
    fundingRounds: [
      {
        id: 'fr_ze_1',
        type: 'Series E',
        amount: { id: 'ec_ze1', claim: '$200M', value: 200000000, source: 'Press Release', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2023-08-25',
        investors: ['StepStone Group', 'Goodwater Capital'],
        valuation: { id: 'ec_ze2', claim: '$1.4B', value: 1400000000, source: 'Press Release', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' }
      }
    ],
    totalFunding: { id: 'ec_ze3', claim: '$560M', value: 560000000, source: 'Crunchbase', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    competitors: ['c_swiggy', 'c_zomato'],
    markets: ['India'],
    signals: [
      { id: 'sig_ze1', type: 'HIRING', title: 'Poached Head of Supply Chain & 14 Leads', description: 'Mass hiring raid on Amazon India & Blinkit', date: '1h ago', strength: 'STRONG', isEarlySignal: true }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [
      { type: 'HIRING', ecosystem: 'SRM', label: 'Campus Hiring Drive', description: 'Recruited 45+ frontend & mobile engineering graduates for Bengaluru tech center', verified: true }
    ],
    financialMetrics: [],
    operationSignals: [
      { category: 'Infrastructure', signal: 'Dark Stores', direction: 'UP', evidence: { id: 'ec_ze_d', claim: '700+ stores', source: 'Management Call', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-09', status: 'REPORTED', confidence: 'MEDIUM' } }
    ],
    companyDNA: {
      businessModel: 'Inventory-led quick commerce',
      market: 'India Quick Commerce',
      product: '10-minute delivery app, Dark store network',
      capital: 'Recently achieved unicorn status',
      traction: '300% YoY growth',
      team: 'Young, highly aggressive founders',
      operations: 'Micro-warehousing and precision dispatch',
      technology: 'Demand prediction, real-time inventory',
      risks: 'High burn rate, intense competition from well-capitalized players'
    },
    blindSpots: [
      { area: 'Corporate Governance at Scale', known: true, importance: 'HIGH', question: 'Can undergraduate-dropout leadership structure scale into public audit compliance?' }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Underdog startup competing against incumbents Swiggy Instamart and Zomato Blinkit with limited balance sheet.',
      whatChanged: 'Raised $1B+ within 9 months pushing valuation to $5.0B; poached key warehouse architects from Amazon.',
      whyItMatters: 'Moving from pure grocery to 10-minute electronics and apparel, attacking Flipkart/Amazon territory.',
      catalystTimestamp: '45m ago'
    },
    signalStack: [
      { category: 'CAPITAL', headline: 'Closes $450M mezzanine pre-IPO round at $5.0B mark', timestamp: '45m ago', source: 'Bloomberg Tech Dispatch', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'TALENT', headline: 'Poaches senior VP logistics and 14 operations leads from Amazon', timestamp: '1h ago', source: 'LinkedIn Executive Moves', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'PRODUCT', headline: 'Zepto Cafe pilot rolled out to 120 dark stores in Mumbai & NCR', timestamp: '2d ago', source: 'App Store Changelog', confidence: 'HIGH', status: 'VERIFIED' }
    ]
  },
  {
    id: 'c_agnikul',
    name: 'Agnikul Cosmos',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Agnikul_Cosmos_Logo.svg/200px-Agnikul_Cosmos_Logo.svg.png',
    tagline: 'Making space accessible',
    description: 'Agnikul is an Indian aerospace manufacturer based in National Center for Combustion R&D (NCRD) of IIT Madras.',
    industry: 'DeepTech',
    subIndustry: 'SpaceTech',
    sector: 'Aerospace',
    founded: '2017-01-01',
    headquarters: 'Chennai, India',
    website: 'https://agnikul.in',
    stage: 'GROWTH',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_srinath',
        name: 'Srinath Ravichandran',
        title: 'CEO & Co-founder',
        education: ['College of Engineering Guindy', 'University of Illinois Urbana-Champaign (MS Aerospace)'],
        ecosystemConnections: ['IIT_MADRAS', 'CHENNAI'],
        linkedIn: 'https://www.linkedin.com/in/srinath-ravichandran-9430948/'
      },
      {
        id: 'f_moin',
        name: 'Moin SPM',
        title: 'COO & Co-founder',
        education: ['Anna University (BE Aeronautics)', 'University of Newcastle (MBA)'],
        ecosystemConnections: ['IIT_MADRAS', 'CHENNAI'],
        linkedIn: 'https://www.linkedin.com/in/moin-spm/'
      }
    ],
    investors: [
      { id: 'i_pi', name: 'pi Ventures', type: 'VC' },
      { id: 'i_special', name: 'Speciale Invest', type: 'VC' },
      { id: 'i_anand', name: 'Anand Mahindra', type: 'ANGEL' }
    ],
    fundingRounds: [
      {
        id: 'fr_ag_1',
        type: 'Series B',
        amount: { id: 'ec_ag1', claim: '$26.7M', value: 267000000, source: 'News Reports', sourceType: 'NEWS', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' },
        date: '2023-10-17',
        investors: ['Celesta Capital', 'Rocketship.vc']
      }
    ],
    totalFunding: { id: 'ec_ag2', claim: '$61.5M', value: 61500000, source: 'Tracxn', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' },
    competitors: ['c_skyroot'],
    markets: ['Global Small Satellites'],
    signals: [
      { id: 'sig_ag1', type: 'PRODUCT', title: 'Suborbital Tech Demonstrator Launch', description: 'Agnibaan SOrTeD successful launch', date: '2024-05-30', strength: 'STRONG', isEarlySignal: false }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [
      { type: 'INCUBATED', ecosystem: 'IIT_MADRAS', label: 'IITM Incubation Cell', description: 'Incubated at IIT Madras NCRD', verified: true },
      { type: 'RESEARCH', ecosystem: 'SRM', label: 'Testing Facilities', description: 'Utilized certain local testing infrastructure with SRM partnerships', verified: false }
    ],
    financialMetrics: [],
    operationSignals: [],
    companyDNA: {
      businessModel: 'Dedicated launch services for small satellites',
      market: 'Small Satellite Launch Vehicle (SSLV)',
      product: 'Agnibaan rocket, 3D printed engines',
      capital: 'Well capitalized for R&D phase',
      traction: 'First flight completed',
      team: 'Deeply technical, academic roots',
      operations: 'In-house manufacturing, mobile launchpad',
      technology: 'Single-piece 3D printed semi-cryogenic engine',
      risks: 'High failure rate in rocketry, capital intensive'
    },
    blindSpots: [
      { area: 'Orbital Re-entry and Payload Recovery', known: true, importance: 'HIGH', question: 'Can the single-piece 3D printed chamber withstand multi-flight thermal shock cycling?' }
    ],
    visibility: 'LOW',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Considered an academic research spinoff inside IIT Madras NCRD with unproven hardware.',
      whatChanged: 'Successfully completed Agnibaan SOrTeD suborbital launch using world-first 3D-printed semi-cryogenic engine.',
      whyItMatters: 'De-risked core engine architecture; moving into commercial payload booking for smallsat orbital delivery.',
      catalystTimestamp: '1h ago'
    },
    signalStack: [
      { category: 'TECHNOLOGY', headline: 'Completes continuous 180s cryogenic upper-stage bench fire test', timestamp: '1h ago', source: 'IN-SPACe Telemetry Bulletin', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'REGULATORY', headline: 'Private launchpad authorization cleared at Sriharikota spaceport', timestamp: '3d ago', source: 'ISRO Press Dispatch', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'TALENT', headline: 'Recruits senior propulsion team leads from European launch consortiums', timestamp: '1w ago', source: 'AviationWeek Career Moves', confidence: 'MEDIUM', status: 'REPORTED' }
    ]
  },
  {
    id: 'c_skyroot',
    name: 'Skyroot Aerospace',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Skyroot_Aerospace_Logo.svg/200px-Skyroot_Aerospace_Logo.svg.png',
    tagline: 'Opening space for all',
    description: 'Skyroot Aerospace is an Indian private aerospace manufacturer and commercial launch service provider.',
    industry: 'DeepTech',
    subIndustry: 'SpaceTech',
    sector: 'Aerospace',
    founded: '2018-07-01',
    headquarters: 'Hyderabad, India',
    website: 'https://skyroot.in',
    stage: 'GROWTH',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_pawan',
        name: 'Pawan Kumar Chandana',
        title: 'CEO & Co-founder',
        education: ['IIT Kharagpur (B.Tech & M.Tech Mechanical)'],
        previousCompanies: ['ISRO (Scientist/Engineer, VSSC)'],
        ecosystemConnections: ['IIT_KHARAGPUR', 'ISRO'],
        linkedIn: 'https://www.linkedin.com/in/pawan-kumar-chandana-78701915/'
      },
      {
        id: 'f_naga',
        name: 'Naga Bharath Daka',
        title: 'COO & Co-founder',
        education: ['IIT Madras (B.Tech & M.Tech Dual Degree)'],
        previousCompanies: ['ISRO (Flight Computer Engineer, VSSC)'],
        ecosystemConnections: ['IIT_MADRAS', 'ISRO'],
        linkedIn: 'https://www.linkedin.com/in/bharath-daka-124b1322/'
      }
    ],
    investors: [
      { id: 'i_gic', name: 'GIC', type: 'VC' },
      { id: 'i_myntra', name: 'Mukesh Bansal', type: 'ANGEL' }
    ],
    fundingRounds: [
      {
        id: 'fr_sk_1',
        type: 'Series B',
        amount: { id: 'ec_sk1', claim: '$51M', value: 51000000, source: 'Company Statement', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2022-09-01',
        investors: ['GIC']
      }
    ],
    totalFunding: { id: 'ec_sk2', claim: '$95M', value: 95000000, source: 'Crunchbase', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    competitors: ['c_agnikul'],
    markets: ['Global Small Satellites'],
    signals: [
      { id: 'sig_sk1', type: 'PRODUCT', title: 'Vikram-S Launch', description: 'First private Indian rocket launch', date: '2022-11-18', strength: 'STRONG', isEarlySignal: false },
      { id: 'sig_sk2', type: 'TECHNOLOGY', title: 'Patent Granted for Carbon-Composite Stage Separation', description: 'Indigenous Stage-3 pneumatic release patent published', date: '2h ago', strength: 'STRONG', isEarlySignal: true }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [
      { type: 'ALUMNI_FOUNDER', ecosystem: 'ISRO', label: 'ISRO Veterans', description: 'Founders are ex-ISRO scientists', verified: true }
    ],
    financialMetrics: [],
    operationSignals: [],
    companyDNA: {
      businessModel: 'Commercial launch services',
      market: 'Small Satellite Launch',
      product: 'Vikram series of rockets',
      capital: 'Most funded Indian spacetech',
      traction: 'Successful suborbital flight',
      team: 'Deep ISRO experience',
      operations: 'Carbon composite manufacturing',
      technology: 'Solid propulsion, carbon composites',
      risks: 'Execution risk of orbital launch'
    },
    blindSpots: [
      { area: 'Launch Insurance Underwriting', known: true, importance: 'HIGH', question: 'Can domestic insurers price orbital satellite failure risk under competitive international rates?' }
    ],
    visibility: 'LOW',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Pioneered suborbital flight with Vikram-S but lacked multi-payload manifest validation.',
      whatChanged: 'Signed 4 European earth-observation satellite launch agreements for upcoming Vikram-1 flight.',
      whyItMatters: 'First Indian private vehicle commercializing dedicated orbital slots at 40% discount to legacy launch providers.',
      catalystTimestamp: '4h ago'
    },
    signalStack: [
      { category: 'COMMERCIAL', headline: 'Secures 4 European Earth-Observation commercial rideshare contracts', timestamp: '4h ago', source: 'French Space Agency / TechCrunch', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'TECHNOLOGY', headline: 'Patent published for carbon-composite pneumatic stage-3 separation', timestamp: '2h ago', source: 'Indian Patent Office Gazette', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'TALENT', headline: 'Headcount crosses 300 aerospace engineers across Hyderabad cleanrooms', timestamp: '2w ago', source: 'Corporate Registry Annual Return', confidence: 'MEDIUM', status: 'REPORTED' }
    ]
  },
  {
    id: 'c_openai',
    name: 'OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    tagline: 'Creating safe AGI that benefits all of humanity',
    description: 'OpenAI is an AI research and deployment company behind ChatGPT and DALL-E.',
    industry: 'DeepTech',
    subIndustry: 'Artificial Intelligence',
    sector: 'AI',
    founded: '2015-12-11',
    headquarters: 'San Francisco, USA',
    website: 'https://openai.com',
    stage: 'LATE_STAGE',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_sam',
        name: 'Sam Altman',
        title: 'CEO & Co-founder',
        education: ['Stanford University (Dropout)'],
        ecosystemConnections: ['Y_COMBINATOR']
      },
      {
        id: 'f_greg',
        name: 'Greg Brockman',
        title: 'President & Co-founder',
        education: ['MIT', 'Harvard'],
        ecosystemConnections: ['STRIPE']
      }
    ],
    investors: [
      { id: 'i_msft', name: 'Microsoft', type: 'CORPORATE' },
      { id: 'i_thrive', name: 'Thrive Capital', type: 'VC' }
    ],
    fundingRounds: [
      {
        id: 'fr_oa_1',
        type: 'Corporate Round',
        amount: { id: 'ec_oa1', claim: '$10B', value: 10000000000, source: 'Microsoft Blog', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2023-01-23',
        investors: ['Microsoft'],
        valuation: { id: 'ec_oa2', claim: '$29B', value: 29000000000, source: 'WSJ', sourceType: 'NEWS', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' }
      }
    ],
    totalFunding: { id: 'ec_oa3', claim: '$13B+', value: 13000000000, source: 'Crunchbase', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'ESTIMATED', confidence: 'HIGH' },
    revenue: { id: 'ec_oa4', claim: '$2B Annualized', value: 2000000000, source: 'FT', sourceType: 'NEWS', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'MEDIUM' },
    valuation: { id: 'ec_oa5', claim: '$86B', value: 86000000000, source: 'Tender Offer', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    competitors: [],
    markets: ['Global'],
    signals: [
      { id: 'sig_oa1', type: 'PRODUCT', title: 'Realtime Voice & Vision API Released', description: 'Sub-300ms multimodal speech-to-speech API made available for production enterprise scale', date: '2h ago', strength: 'STRONG', isEarlySignal: false }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [],
    financialMetrics: [],
    operationSignals: [],
    companyDNA: {
      businessModel: 'API Access, ChatGPT Plus Subscriptions',
      market: 'Generative AI Foundation Models',
      product: 'GPT-4, DALL-E, Sora',
      capital: 'Unprecedented access to compute capital via Microsoft',
      traction: 'Fastest growing consumer product in history (ChatGPT)',
      team: 'Top global AI researchers',
      operations: 'Massive compute cluster management',
      technology: 'Transformer-based LLMs, RLHF',
      risks: 'Compute constraints, copyright lawsuits, open-source competition'
    },
    blindSpots: [
      { area: 'Inference Cost Amortization', known: true, importance: 'CRITICAL', question: 'Can reasoning model token costs be priced profitably for free-tier and enterprise users?' }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Dominated raw text generation with GPT-4 while running steep model training losses.',
      whatChanged: 'Rolled out low-latency native voice/audio API and multi-step reasoning capabilities.',
      whyItMatters: 'Expands enterprise TAM into customer care, audio agentics, and multimodal assistants, threatening point solutions.',
      catalystTimestamp: '2h ago'
    },
    signalStack: [
      { category: 'PRODUCT', headline: 'Realtime voice API natively integrated into Tier-1 cloud architectures', timestamp: '2h ago', source: 'OpenAI Devpost', confidence: 'HIGH', status: 'VERIFIED' },
      { category: 'CAPITAL', headline: 'Discussions ongoing for $6.5B funding tranche at $150B valuation', timestamp: '1d ago', source: 'Bloomberg Financial Wire', confidence: 'MEDIUM', status: 'REPORTED' }
    ]
  },
  {
    id: 'c_postman',
    name: 'Postman',
    logo: 'https://voyager.postman.com/logo/postman-logo-icon-orange.svg',
    tagline: 'Leading collaboration platform for API development',
    description: 'Postman is an API platform for developers used by over 30 million engineers and 500,000 organizations to design, build, test, and iterate APIs.',
    industry: 'Enterprise Software',
    subIndustry: 'Developer Tooling, API Management',
    sector: 'Developer Tools',
    founded: '2014-05-15',
    headquarters: 'San Francisco, CA / Bengaluru, India',
    website: 'https://www.postman.com',
    stage: 'LATE_STAGE',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_abhinav',
        name: 'Abhinav Asthana',
        title: 'CEO & Co-founder',
        education: ['BITS Pilani Goa Campus (B.E. Electronics & Instrumentation)'],
        ecosystemConnections: ['BITS_PILANI'],
        linkedIn: 'https://www.linkedin.com/in/abhinavasthana/'
      },
      {
        id: 'f_ankit',
        name: 'Ankit Sobti',
        title: 'CTO & Co-founder',
        education: ['PES University (B.E. Computer Science)'],
        ecosystemConnections: ['PES'],
        linkedIn: 'https://www.linkedin.com/in/asobti/'
      },
      {
        id: 'f_abhijit',
        name: 'Abhijit Kane',
        title: 'Co-founder',
        education: ['BITS Pilani (B.E. Computer Science)'],
        ecosystemConnections: ['BITS_PILANI'],
        linkedIn: 'https://www.linkedin.com/in/abhijitkane/'
      }
    ],
    investors: [
      { id: 'i_insight', name: 'Insight Partners', type: 'VC' },
      { id: 'i_crv', name: 'CRV', type: 'VC' },
      { id: 'i_nexus', name: 'Nexus Venture Partners', type: 'VC' }
    ],
    fundingRounds: [
      {
        id: 'fr_post_1',
        type: 'Series D',
        amount: { id: 'ec_p1', claim: 'Raised $225M', value: 225000000, source: 'TechCrunch / SEC D', sourceType: 'NEWS', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2021-08-18',
        investors: ['Insight Partners', 'Nexus Venture Partners'],
        valuation: { id: 'ec_p2', claim: 'Valued at $5.6B', value: 5600000000, source: 'Company Statement', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' }
      }
    ],
    totalFunding: { id: 'ec_p3', claim: 'Total $433M', value: 433000000, source: 'Crunchbase', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: 'ec_p4', claim: '$150M+ ARR', value: 150000000, source: 'SaaS Capital Index', sourceType: 'ANALYST_REPORT', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' },
    valuation: { id: 'ec_p5', claim: '$5.6B', value: 5600000000, source: 'Insight Partners Round', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    competitors: ['c_insomnia', 'c_rapidapi'],
    markets: ['Global', 'North America', 'India', 'Europe'],
    signals: [
      { id: 'sig_p1', type: 'PRODUCT', title: 'Postman AI Copilot v2 Launched', description: 'Autonomous test suite generation across OpenAPI 3.1 definitions', date: '4h ago', strength: 'STRONG', isEarlySignal: false },
      { id: 'sig_p2', type: 'HIRING', title: 'Senior LLM Systems Architect Hires', description: 'Recruiting from Anthropic and AWS developer tooling divisions', date: '1d ago', strength: 'MODERATE', isEarlySignal: true }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [
      { type: 'ALUMNI_FOUNDER', ecosystem: 'BITS_PILANI', label: 'BITS Pilani Alumni Founders', description: 'Founded by BITS Pilani graduates Abhinav Asthana and Abhijit Kane', verified: true }
    ],
    financialMetrics: [
      { id: 'fm_p1', metric: 'Annual Recurring Revenue (ARR)', value: { id: 'ec_p6', claim: '$150M+', source: 'TechCrunch', sourceType: 'NEWS', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' }, trend: 'UP' }
    ],
    operationSignals: [
      { category: 'Developer Traction', signal: 'Registered Developers', direction: 'UP', evidence: { id: 'ec_p7', claim: '30M+ engineers', source: 'Postman State of API', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' } }
    ],
    companyDNA: {
      businessModel: 'Freemium PLG SaaS + Enterprise tier licensing',
      market: 'Developer tools and API lifecycle management',
      product: 'API client, mock servers, automated testing suites',
      capital: 'Well-capitalized, cash-flow disciplined',
      traction: 'Universal standard for API engineering',
      team: 'Deep developer ecosystem empathy',
      operations: 'Global remote-first distribution',
      technology: 'Cloud native collaboration workflows',
      risks: 'IDE native copilot extensions (Cursor, VS Code native)'
    },
    blindSpots: [
      { area: 'Local IDE Native AI Disruption', known: true, importance: 'HIGH', question: 'Will developers migrate away from separate API clients as autonomous coding models inspect APIs in editor?' }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Standard manual REST and GraphQL client for web developers.',
      whatChanged: 'Multi-modal agents now consume and generate complex OpenAPI schema specs automatically.',
      whyItMatters: 'Postman is turning into the foundational API registry for enterprise AI agents.',
      catalystTimestamp: '4h ago'
    },
    signalStack: [
      { category: 'PRODUCT', headline: 'AI agent workspace generation natively live in Postman 11', timestamp: '4h ago', source: 'Postman Release Notes', confidence: 'HIGH', status: 'VERIFIED' }
    ]
  },
  {
    id: 'c_ather',
    name: 'Ather Energy',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Ather_Energy_Logo.svg',
    tagline: 'Intelligent electric scooters & fast charging grid',
    description: 'Ather Energy is an Indian electric vehicle company incubated at IIT Madras that designs connected high-performance smart electric scooters and fast-charging infrastructure.',
    industry: 'Automotive & CleanTech',
    subIndustry: 'Electric Mobility, Connected Hardware',
    sector: 'Climate & Mobility',
    founded: '2013-10-20',
    headquarters: 'Bengaluru, India',
    website: 'https://www.atherenergy.com',
    stage: 'PRE_IPO',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_tarun',
        name: 'Tarun Mehta',
        title: 'CEO & Co-founder',
        education: ['IIT Madras (B.Tech & M.Tech Dual Degree, Engineering Design)'],
        ecosystemConnections: ['IIT_MADRAS', 'CHENNAI'],
        linkedIn: 'https://www.linkedin.com/in/tarunsmehta/'
      },
      {
        id: 'f_swapnil',
        name: 'Swapnil Jain',
        title: 'CTO & Co-founder',
        education: ['IIT Madras (B.Tech & M.Tech Dual Degree, Engineering Design)'],
        ecosystemConnections: ['IIT_MADRAS', 'CHENNAI'],
        linkedIn: 'https://www.linkedin.com/in/swapnil-jain-567a1315/'
      }
    ],
    investors: [
      { id: 'i_hero', name: 'Hero MotoCorp', type: 'CORPORATE' },
      { id: 'i_gic', name: 'GIC Singapore', type: 'PE' },
      { id: 'i_tiger', name: 'Tiger Global', type: 'VC' }
    ],
    fundingRounds: [
      {
        id: 'fr_ath_1',
        type: 'Pre-IPO Convertible',
        amount: { id: 'ec_a1', claim: 'Raised $71M', value: 71000000, source: 'NPS / Corporate Registry', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2024-08-12',
        investors: ['NIIF', 'Hero MotoCorp'],
        valuation: { id: 'ec_a2', claim: 'Valued at $1.3B (Unicorn status)', value: 1300000000, source: 'BSE Disclosure', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' }
      }
    ],
    totalFunding: { id: 'ec_a3', claim: 'Total $500M+', value: 500000000, source: 'Tracxn', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: 'ec_a4', claim: 'INR 1,780 Cr (FY24)', value: 215000000, source: 'Draft Red Herring Prospectus', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    valuation: { id: 'ec_a5', claim: '$1.3B', value: 1300000000, source: 'DRHP Pre-IPO Valuation', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    competitors: ['c_olaelectric', 'c_tvs'],
    markets: ['India', 'Southeast Asia'],
    signals: [
      { id: 'sig_ath1', type: 'LEGAL', title: 'Filed Draft Red Herring Prospectus (DRHP) for $500M IPO', description: 'SEBI filing confirms domestic primary offering', date: '3h ago', strength: 'STRONG', isEarlySignal: false },
      { id: 'sig_ath2', type: 'PRODUCT', title: 'Rizta Family Scooter Captures 32% Order Share', description: 'Major pivot from youth performance to mass household segment', date: '2d ago', strength: 'STRONG', isEarlySignal: false }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [
      { type: 'INCUBATED', ecosystem: 'IIT_MADRAS', label: 'IIT Madras Research Park Incubated', description: 'Founded out of IIT Madras engineering labs and patent incubation cell', verified: true }
    ],
    financialMetrics: [
      { id: 'fm_ath1', metric: 'Two-Wheeler Deliveries', value: { id: 'ec_a6', claim: '109,000 units/year', source: 'Vahan Registration Data', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' }, trend: 'UP' }
    ],
    operationSignals: [
      { category: 'Manufacturing', signal: 'Hosur Plant Production Run Rate', direction: 'UP', evidence: { id: 'ec_a7', claim: '420k capacity', source: 'Corporate Release', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' } }
    ],
    companyDNA: {
      businessModel: 'Vehicle sales + Ather Grid subscription software take-rate',
      market: 'Indian 2-wheeler electric revolution',
      product: 'Ather 450X, Ather Rizta, Ather Grid fast chargers',
      capital: 'Securing public market liquidity',
      traction: 'Top-3 Indian EV brand with industry-leading battery longevity',
      team: 'World-class automotive and battery thermal engineers',
      operations: 'Integrated battery manufacturing and automated assembly',
      technology: 'Proprietary BMS (Battery Management System), Aluminium chassis',
      risks: 'FAME subsidy reductions, aggressive Ola price wars'
    },
    blindSpots: [
      { area: 'Gross Margin Expansion without Subsidies', known: true, importance: 'CRITICAL', question: 'Can Ather hit 20%+ automotive gross margins as domestic subsidies taper off?' }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Burned capital scaling high-end niche performance scooters.',
      whatChanged: 'Filed confidential DRHP for $500M IPO; Rizta family scooter unlocked tier-2 volume.',
      whyItMatters: 'Second pure-play electric two-wheeler listing in India, resetting EV public market benchmarks.',
      catalystTimestamp: '3h ago'
    },
    signalStack: [
      { category: 'CAPITAL', headline: 'SEBI filing submitted for INR 4,500 Cr domestic public offering', timestamp: '3h ago', source: 'SEBI Gazette', confidence: 'HIGH', status: 'VERIFIED' }
    ]
  },
  {
    id: 'c_sarvam',
    name: 'Sarvam AI',
    logo: '',
    tagline: 'Sovereign Indic foundation models & speech models',
    description: 'Sarvam AI is developing generative foundation models and multi-lingual voice intelligence tailored for Indian enterprise languages and voice-first interfaces.',
    industry: 'Artificial Intelligence',
    subIndustry: 'Foundation Models, Indic LLMs',
    sector: 'Generative AI',
    founded: '2023-07-01',
    headquarters: 'Bengaluru / Chennai, India',
    website: 'https://www.sarvam.ai',
    stage: 'SERIES_A',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_vivek',
        name: 'Vivek Raghavan',
        title: 'Co-founder',
        education: ['IIT Delhi', 'Carnegie Mellon University (PhD)'],
        ecosystemConnections: ['IIT_DELHI', 'IIT_MADRAS', 'AI4BHARAT'],
        linkedIn: 'https://www.linkedin.com/in/vivek-raghavan-6b04291/'
      },
      {
        id: 'f_pratyush',
        name: 'Pratyush Kumar',
        title: 'Co-founder',
        education: ['IIT Bombay', 'ETH Zurich (PhD)', 'IIT Madras Faculty'],
        ecosystemConnections: ['IIT_BOMBAY', 'IIT_MADRAS', 'AI4BHARAT', 'CHENNAI'],
        linkedIn: 'https://www.linkedin.com/in/pratyush-kumar-4286668/'
      }
    ],
    investors: [
      { id: 'i_lightspeed', name: 'Lightspeed Venture Partners', type: 'VC' },
      { id: 'i_peakxv', name: 'Peak XV Partners', type: 'VC' },
      { id: 'i_khosla', name: 'Khosla Ventures', type: 'VC' }
    ],
    fundingRounds: [
      {
        id: 'fr_sarv_1',
        type: 'Series A',
        amount: { id: 'ec_s1', claim: 'Raised $41M', value: 41000000, source: 'Lightspeed Dispatch', sourceType: 'NEWS', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2023-12-07',
        investors: ['Lightspeed', 'Peak XV', 'Khosla Ventures'],
        valuation: { id: 'ec_s2', claim: 'Valued at $180M', value: 180000000, source: 'TechCrunch', sourceType: 'NEWS', retrievedAt: '2024-05-01', status: 'ESTIMATED', confidence: 'MEDIUM' }
      }
    ],
    totalFunding: { id: 'ec_s3', claim: 'Total $41M', value: 41000000, source: 'Crunchbase', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: 'ec_s4', claim: '$3M (Run rate)', value: 3000000, source: 'Internal Estimation', sourceType: 'INFERRED', retrievedAt: '2024-05-01', status: 'ESTIMATED', confidence: 'LOW' },
    valuation: { id: 'ec_s5', claim: '$180M', value: 180000000, source: 'Series A Pricing', sourceType: 'ANALYST_REPORT', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' },
    competitors: ['c_krutrim', 'c_openai'],
    markets: ['India', 'Enterprise Global'],
    signals: [
      { id: 'sig_sarv1', type: 'PRODUCT', title: 'Sarvam-1 (2B) Open Sovereign Model Released', description: 'Outperforms Llama 3 8B on 10 Indic languages with 4x higher token throughput', date: '5h ago', strength: 'STRONG', isEarlySignal: false },
      { id: 'sig_sarv2', type: 'PARTNERSHIP', title: 'Strategic Sovereign Compute Partnership with Yotta & IndiaAI', description: 'Secured dedicated H100 GPU clusters under the national IndiaAI mission', date: '1d ago', strength: 'STRONG', isEarlySignal: true }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [
      { type: 'RESEARCH', ecosystem: 'IIT_MADRAS', label: 'AI4Bharat IIT Madras Research Origin', description: 'Founding roots connected to the AI4Bharat consortium incubated at IIT Madras', verified: true }
    ],
    financialMetrics: [],
    operationSignals: [],
    companyDNA: {
      businessModel: 'API token pricing + Enterprise on-premise sovereign weights',
      market: 'Vernacular voice AI and government/banking enterprise automation',
      product: 'Sarvam-1, Bulbul TTS, Saaras STT, Vernacular Agent Stack',
      capital: 'Extremely well-backed by Lightspeed, Khosla & Peak XV',
      traction: 'De-facto standard for Indian language audio reasoning',
      team: 'Premier speech and NLP scientists in the Global South',
      operations: 'High-throughput cluster engineering in Bengaluru and Chennai',
      technology: 'Sub-word tokenizers optimized for Indic scripts, edge-distilled speech models',
      risks: 'OpenAI multi-lingual latency reductions, open-source model replication'
    },
    blindSpots: [
      { area: 'Enterprise Token Monetization Scale', known: true, importance: 'HIGH', question: 'Can sovereign Indic models protect enterprise pricing against commodity open weights like Llama and Gemma?' }
    ],
    visibility: 'MEDIUM',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Global LLMs failed miserably on Indian accent recognition and low-resource script tokenization.',
      whatChanged: 'Sarvam deployed Sarvam-1 and native Indic speech models with unprecedented token efficiency.',
      whyItMatters: 'Enables banking, telecom, and citizen services to automate high-stakes voice interactions.',
      catalystTimestamp: '5h ago'
    },
    signalStack: [
      { category: 'PRODUCT', headline: 'Sarvam-1 Indic 2B model achieves top benchmark scores across 10 regional dialects', timestamp: '5h ago', source: 'Sarvam Research Blog', confidence: 'HIGH', status: 'VERIFIED' }
    ]
  },
  {
    id: 'c_torus',
    name: 'Torus Robotics',
    logo: '',
    tagline: 'Autonomous heavy unmanned ground vehicles & powertrain',
    description: 'Torus Robotics is an indigenous deeptech defense startup developing autonomous all-terrain electric unmanned ground vehicles (UGVs) and high-density electric powertrains for defense and search-and-rescue.',
    industry: 'Defense & Robotics',
    subIndustry: 'Autonomous Vehicles, Military Robotics',
    sector: 'Defense Tech',
    founded: '2019-08-01',
    headquarters: 'Chennai, Tamil Nadu, India',
    website: 'https://torusrobotics.com',
    stage: 'SEED',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_vignesh',
        name: 'M. Vignesh',
        title: 'CEO & Co-founder',
        education: ['SRM Institute of Science and Technology (B.Tech Mechatronics, Class of 2018)'],
        ecosystemConnections: ['SRM', 'CHENNAI'],
        linkedIn: 'https://www.linkedin.com/in/vignesh-manimaran-torus/'
      },
      {
        id: 'f_abbhi',
        name: 'K. Abbhi Vignesh',
        title: 'COO & Co-founder',
        education: ['SRM Institute of Science and Technology (B.Tech Mechatronics, Class of 2018)'],
        ecosystemConnections: ['SRM', 'CHENNAI'],
        linkedIn: 'https://www.linkedin.com/in/kandasamy-abbhi-vignesh/'
      },
      {
        id: 'f_vibhakar',
        name: 'Vibhakar Senthil Kumar',
        title: 'CTO & Co-founder',
        education: ['SRM Institute of Science and Technology (B.Tech Mechatronics, Class of 2018)'],
        ecosystemConnections: ['SRM', 'CHENNAI'],
        linkedIn: 'https://www.linkedin.com/in/vibhakar-senthil-kumar/'
      }
    ],
    investors: [
      { id: 'i_forge', name: 'Forge Innovation & Ventures', type: 'ACCELERATOR' },
      { id: 'i_ang', name: 'Indian Angel Syndicate', type: 'ANGEL' }
    ],
    fundingRounds: [
      {
        id: 'fr_tor_1',
        type: 'Seed',
        amount: { id: 'ec_t1', claim: 'Raised $1.2M', value: 1200000, source: 'iDEX Grant & Defense Syndicate', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2023-04-10',
        investors: ['Forge', 'Defense Angels'],
        valuation: { id: 'ec_t2', claim: 'Valued at $8M', value: 8000000, source: 'Analyst Estimate', sourceType: 'ANALYST_REPORT', retrievedAt: '2024-05-01', status: 'ESTIMATED', confidence: 'MEDIUM' }
      }
    ],
    totalFunding: { id: 'ec_t3', claim: 'Total $2.1M', value: 2100000, source: 'Defense Registry', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: 'ec_t4', claim: '$800K (FY24)', value: 800000, source: 'MoD Procurement Contract', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    valuation: { id: 'ec_t5', claim: '$12M', value: 12000000, source: 'Internal Round', sourceType: 'ANALYST_REPORT', retrievedAt: '2024-05-01', status: 'ESTIMATED', confidence: 'MEDIUM' },
    competitors: ['c_zen', 'c_ideaforge'],
    markets: ['India', 'Indo-Pacific Defense'],
    signals: [
      { id: 'sig_tor1', type: 'LEGAL', title: 'Indian Army Orders Autonomous Tactical UGVs under iDEX', description: 'MoD procurement contract awarded for high-altitude logistics support', date: '6h ago', strength: 'STRONG', isEarlySignal: true },
      { id: 'sig_tor2', type: 'TECHNOLOGY', title: 'Patented Axial Flux Electric Motor with 3x Torque Density', description: 'Zero-emission powertrain developed specifically for extreme Ladakh altitude warfare', date: '3d ago', strength: 'STRONG', isEarlySignal: true }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [
      { type: 'ALUMNI_FOUNDER', ecosystem: 'SRM', label: 'SRMIST Alumni Founders (Mechatronics Class of 2018)', description: 'Founded by SRMIST Mechatronics alumni M. Vignesh, K. Abbhi Vignesh, and Vibhakar Senthil Kumar; incubated with support from AIC-SRMIST and Ministry of Defence iDEX', verified: true }
    ],
    financialMetrics: [],
    operationSignals: [],
    companyDNA: {
      businessModel: 'Defense procurement contracts + Powertrain licensing',
      market: 'Autonomous military logistics and border reconnaissance',
      product: 'Electric UGV, Axial Flux Motor, Autonomous Path Planning Kit',
      capital: 'Extremely lean, grant and defense-backed',
      traction: 'Army high-altitude field trials cleared',
      team: 'Mechatronics and robotics engineers from Chennai universities',
      operations: 'R&D facility in Chennai hardware corridor',
      technology: 'Indigenous motor controllers and ruggedized edge SLAM',
      risks: 'Long defense procurement sales cycles'
    },
    blindSpots: [
      { area: 'Defense Order Conversion Velocity', known: true, importance: 'HIGH', question: 'How quickly can MoD field trial approvals convert to multi-hundred unit manufacturing contracts?' }
    ],
    visibility: 'LOW',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Indian defense forces relied on imported or legacy diesel troop support vehicles.',
      whatChanged: 'Secured MoD contract for all-electric autonomous UGVs engineered for -30°C Ladakh altitudes.',
      whyItMatters: 'Demonstrates indigenous hardware defense production emerging from Chennai academic corridors.',
      catalystTimestamp: '6h ago'
    },
    signalStack: [
      { category: 'REGULATORY', headline: 'Ministry of Defence signs commercial induction contract for Torus tactical UGVs', timestamp: '6h ago', source: 'iDEX / PIB Gazette', confidence: 'HIGH', status: 'VERIFIED' }
    ]
  },
  {
    id: 'c_stage',
    name: 'STAGE',
    logo: '',
    tagline: 'Hyperlocal dialect-based OTT platform for Bharat',
    description: 'STAGE is an artist-led and dialect-based OTT platform producing web series, films, and podcasts in regional Indian dialects including Haryanvi, Rajasthani, and Bhojpuri. Co-founded by SRM alumni, STAGE has raised $15M+ from Blume Ventures, Peak XV, and Shark Tank India.',
    industry: 'Media & Entertainment',
    subIndustry: 'Hyperlocal OTT, Vernacular Media',
    sector: 'Consumer Tech',
    founded: '2019-11-01',
    headquarters: 'Indore / Noida, India',
    website: 'https://stage.in',
    stage: 'SERIES_A',
    status: 'ACTIVE',
    founders: [
      {
        id: 'f_vinay',
        name: 'Vinay Singhal',
        title: 'CEO & Co-founder',
        education: ['SRM Institute of Science and Technology (Class of 2013)'],
        ecosystemConnections: ['SRM'],
        linkedIn: 'https://www.linkedin.com/in/vinaysinghal/'
      },
      {
        id: 'f_shashank',
        name: 'Shashank Vaishnav',
        title: 'CTO & Co-founder',
        education: ['SRM Institute of Science and Technology (B.Tech Computer Science)'],
        ecosystemConnections: ['SRM'],
        linkedIn: 'https://www.linkedin.com/in/shashank-vaishnav/'
      },
      {
        id: 'f_parveen',
        name: 'Parveen Singhal',
        title: 'CCO & Co-founder',
        education: ['SRM Institute of Science and Technology (Class of 2014)'],
        ecosystemConnections: ['SRM'],
        linkedIn: 'https://www.linkedin.com/in/parveen-singhal/'
      }
    ],
    investors: [
      { id: 'i_blume', name: 'Blume Ventures', type: 'VC' },
      { id: 'i_nb', name: 'NB Ventures', type: 'VC' },
      { id: 'i_st', name: 'Shark Tank India Syndicate', type: 'ANGEL' }
    ],
    fundingRounds: [
      {
        id: 'fr_stg_1',
        type: 'Series A',
        amount: { id: 'ec_stg1', claim: 'Raised $9.5M', value: 9500000, source: 'TechCrunch / Entrackr', sourceType: 'NEWS', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2023-01-12',
        investors: ['Blume Ventures', 'Ritesh Agarwal', 'Shark Tank India'],
        valuation: { id: 'ec_stg2', claim: 'Valued at $36M', value: 36000000, source: 'MCA Filings', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' }
      }
    ],
    totalFunding: { id: 'ec_stg3', claim: 'Total $15.5M', value: 15500000, source: 'Entrackr Registry', sourceType: 'PUBLIC_DATA', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: 'ec_stg4', claim: '$6.5M ARR', value: 6500000, source: 'Blume Investor Letter', sourceType: 'ANALYST_REPORT', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' },
    valuation: { id: 'ec_stg5', claim: '$36M', value: 36000000, source: 'Series A Lead Round', sourceType: 'OFFICIAL_FILING', retrievedAt: '2024-05-01', status: 'VERIFIED', confidence: 'HIGH' },
    competitors: ['c_chaupal', 'c_kuku'],
    markets: ['India (Bharat Non-Metro)'],
    signals: [
      { id: 'sig_stg1', type: 'PRODUCT', title: 'Crosses 3 Million Paying Dialect Subscribers in Haryana and Rajasthan', description: 'Dialect original retention rates benchmark 2.2x higher than mainstream Hindi OTTs', date: '1d ago', strength: 'STRONG', isEarlySignal: false },
      { id: 'sig_stg2', type: 'MARKET', title: 'Bhojpuri Content Pipeline Launches with 40+ Local Theatrical Releases', description: 'Expanding addressable subscriber base across 140M native Bhojpuri speakers', date: '5d ago', strength: 'STRONG', isEarlySignal: true }
    ],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [
      { type: 'ALUMNI_FOUNDER', ecosystem: 'SRM', label: 'SRMIST Alumni Founders (Vinay, Shashank, Parveen)', description: 'Founded by SRM Kattankulathur alumni who built WittyFeed and pivoted to STAGE; raised $15M+ from Blume Ventures and Shark Tank India', verified: true }
    ],
    financialMetrics: [
      { id: 'fm_stg1', metric: 'Paying Subscribers', value: { id: 'ec_stg6', claim: '3.2M Active', source: 'Company Statement', sourceType: 'COMPANY_STATEMENT', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' }, trend: 'UP' }
    ],
    operationSignals: [
      { category: 'Dialect Retention', signal: '30-Day Churn Rate', direction: 'DOWN', evidence: { id: 'ec_stg7', claim: '4.8% Churn', source: 'Blume Tech Benchmark', sourceType: 'ANALYST_REPORT', retrievedAt: '2024-05-01', status: 'REPORTED', confidence: 'HIGH' } }
    ],
    companyDNA: {
      businessModel: 'Direct-to-consumer micro-subscription + annual dialect passes',
      market: 'Vernacular and dialect-first media consumption for 400M+ Bharat population',
      product: 'Mobile-first Android video streaming application engineered for 4G networks',
      capital: 'Disciplined burn with positive unit contribution per dialect cohort',
      traction: 'Over 3 million active paying subscribers across Northern dialect belts',
      team: 'Pioneered viral content engineering at WittyFeed during SRM undergrad days',
      operations: 'Decentralized writer rooms and regional production studios',
      technology: 'Adaptive low-bandwidth video transcoding pipeline',
      risks: 'Content piracy and competition from YouTube Creator ecosystems'
    },
    blindSpots: [
      { area: 'Dialect Expansion Scalability', known: true, importance: 'HIGH', question: 'Can regional dialect subscriber acquisition economics replicate across Southern Indian dialects?' }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: 'Mainstream OTT platforms (Netflix, Prime) strictly prioritized urban English and metro Hindi audiences.',
      whatChanged: 'Affordable 5G rollout and vernacular digital payments unlocked explosive demand for native mother-tongue storytelling.',
      whyItMatters: 'Demonstrates multi-million subscriber scale unlocked by founders emerging from SRM engineering cohorts.',
      catalystTimestamp: '1d ago'
    },
    signalStack: [
      { category: 'COMMERCIAL', headline: 'STAGE reaches operational break-even across Haryana dialect division', timestamp: '1d ago', source: 'Entrackr', confidence: 'HIGH', status: 'VERIFIED' }
    ]
  }
];
