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
        education: ['BITS Pilani', 'IIM Calcutta'],
        ecosystemConnections: ['BITS_PILANI']
      },
      {
        id: 'f_nandan',
        name: 'Nandan Reddy',
        title: 'Co-founder',
        education: ['BITS Pilani'],
        ecosystemConnections: ['BITS_PILANI']
      },
      {
        id: 'f_phani',
        name: 'Phani Kishan Addepalli',
        title: 'Co-founder',
        education: ['IIT Madras'],
        ecosystemConnections: ['IIT_MADRAS']
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
      { type: 'ALUMNI_EMPLOYEE', ecosystem: 'SRM', label: 'Early Engineering Team', description: 'Key early backend engineers were SRM alumni', verified: true }
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
        education: ['IIT Delhi'],
        ecosystemConnections: ['IIT_DELHI']
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
    blindSpots: []
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
        education: ['Stanford University (Dropout)'],
        ecosystemConnections: ['STANFORD']
      },
      {
        id: 'f_kaivalya',
        name: 'Kaivalya Vohra',
        title: 'CTO & Co-founder',
        education: ['Stanford University (Dropout)'],
        ecosystemConnections: ['STANFORD']
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
    signals: [],
    legalEvents: [],
    newsEvents: [],
    ecosystemConnections: [],
    financialMetrics: [],
    operationSignals: [],
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
    blindSpots: []
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
        education: ['College of Engineering Guindy'],
        ecosystemConnections: ['ANNA_UNIVERSITY', 'CHENNAI']
      },
      {
        id: 'f_moin',
        name: 'Moin SPM',
        title: 'COO & Co-founder',
        education: [],
        ecosystemConnections: ['CHENNAI']
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
    blindSpots: []
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
        education: ['IIT Kharagpur'],
        previousCompanies: ['ISRO'],
        ecosystemConnections: ['IIT_KHARAGPUR', 'ISRO']
      },
      {
        id: 'f_naga',
        name: 'Naga Bharath Daka',
        title: 'COO & Co-founder',
        education: ['IIT Madras'],
        previousCompanies: ['ISRO'],
        ecosystemConnections: ['IIT_MADRAS', 'ISRO']
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
      { id: 'sig_sk1', type: 'PRODUCT', title: 'Vikram-S Launch', description: 'First private Indian rocket launch', date: '2022-11-18', strength: 'STRONG', isEarlySignal: false }
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
    blindSpots: []
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
    signals: [],
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
    blindSpots: []
  }
];
