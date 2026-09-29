// Evidence & Provenance
export type EvidenceStatus = 'VERIFIED' | 'REPORTED' | 'ESTIMATED' | 'INFERRED' | 'CONFLICTED' | 'UNKNOWN';
export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
export type SourceType = 'OFFICIAL_FILING' | 'NEWS' | 'COMPANY_STATEMENT' | 'ANALYST_REPORT' | 'PUBLIC_DATA' | 'INFERRED' | 'DEMO';

export interface EvidenceClaim {
  id: string;
  claim: string;
  value?: string | number;
  source: string;
  sourceType: SourceType;
  sourceUrl?: string;
  publicationDate?: string;
  retrievedAt: string;
  status: EvidenceStatus;
  confidence: ConfidenceLevel;
  supportingText?: string;
  conflicts?: string[];
}

// Company
export interface Company {
  id: string;
  name: string;
  logo?: string;
  tagline: string;
  description: string;
  industry: string;
  subIndustry?: string;
  sector: string;
  founded: string;
  headquarters: string;
  website?: string;
  stage: string;
  status: 'ACTIVE' | 'ACQUIRED' | 'IPO' | 'CLOSED' | 'UNKNOWN';
  founders: Founder[];
  investors: Investor[];
  fundingRounds: FundingRound[];
  totalFunding: EvidenceClaim;
  revenue?: EvidenceClaim;
  employees?: EvidenceClaim;
  valuation?: EvidenceClaim;
  burnRate?: EvidenceClaim;
  runway?: EvidenceClaim;
  competitors: string[]; // company IDs
  markets: string[];
  signals: Signal[];
  legalEvents: LegalEvent[];
  newsEvents: NewsEvent[];
  ecosystemConnections: EcosystemConnection[];
  financialMetrics: FinancialMetric[];
  operationSignals: OperationSignal[];
  companyDNA: CompanyDNA;
  storyVsSignal?: StoryVsSignal;
  blindSpots: BlindSpot[];
  visibility?: 'LOW' | 'MEDIUM' | 'HIGH';
  signalDensity?: 'HIGH' | 'MEDIUM' | 'LOW';
  whyNow?: {
    before: string;
    whatChanged: string;
    whyItMatters: string;
    catalystTimestamp?: string;
  };
  signalStack?: {
    category: 'CAPITAL' | 'PRODUCT' | 'COMMERCIAL' | 'TALENT' | 'MARKET' | 'TECHNOLOGY' | 'ECOSYSTEM' | 'REGULATORY';
    headline: string;
    timestamp: string;
    source: string;
    confidence: ConfidenceLevel;
    status: EvidenceStatus;
  }[];
}

export interface Founder {
  id: string;
  name: string;
  title: string;
  photo?: string;
  linkedIn?: string;
  education?: string[];
  previousCompanies?: string[];
  ecosystemConnections?: string[];
}

export interface Investor {
  id: string;
  name: string;
  type: 'VC' | 'ANGEL' | 'PE' | 'CORPORATE' | 'GOVERNMENT' | 'ACCELERATOR';
  logo?: string;
  portfolioCompanies?: string[];
  totalInvestments?: number;
}

export interface FundingRound {
  id: string;
  type: string; // Seed, Series A, etc.
  amount: EvidenceClaim;
  date: string;
  investors: string[];
  leadInvestor?: string;
  valuation?: EvidenceClaim;
}

export interface FinancialMetric {
  id: string;
  metric: string;
  value: EvidenceClaim;
  period?: string;
  trend?: 'UP' | 'DOWN' | 'STABLE' | 'UNKNOWN';
}

export interface LegalEvent {
  id: string;
  type: string;
  title: string;
  date: string;
  status: string;
  description: string;
  source: EvidenceClaim;
}

export interface NewsEvent {
  id: string;
  headline: string;
  date: string;
  source: string;
  sourceUrl?: string;
  affectedCompanies: string[];
  market?: string;
  impact?: string;
  impactLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Signal {
  id: string;
  type: 'HIRING' | 'PRODUCT' | 'MARKET' | 'LEADERSHIP' | 'FUNDING' | 'LEGAL' | 'TECHNOLOGY' | 'PARTNERSHIP' | 'FINANCIAL';
  title: string;
  description: string;
  date: string;
  strength: 'STRONG' | 'MODERATE' | 'WEAK';
  isEarlySignal: boolean;
  source?: EvidenceClaim;
}

export interface EcosystemConnection {
  type: 'ALUMNI_FOUNDER' | 'ALUMNI_EMPLOYEE' | 'INCUBATED' | 'HIRING' | 'EVENT' | 'PARTNERSHIP' | 'RESEARCH';
  ecosystem: string;
  label: string;
  description: string;
  person?: string;
  verified: boolean;
}

export interface OperationSignal {
  category: string;
  signal: string;
  direction: 'UP' | 'DOWN' | 'STABLE' | 'UNKNOWN';
  evidence: EvidenceClaim;
}

export interface CompanyDNA {
  businessModel: string;
  market: string;
  product: string;
  capital: string;
  traction: string;
  team: string;
  operations: string;
  technology: string;
  risks: string;
}

export interface StoryVsSignal {
  companyClaim: string;
  signals: { label: string; direction: 'UP' | 'DOWN' | 'STABLE'; }[];
  mismatchSummary: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface BlindSpot {
  area: string;
  known: boolean;
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  question: string;
}

// Network
export interface NetworkConnection {
  id: string;
  fromId: string;
  fromName: string;
  fromType: 'USER' | 'PERSON' | 'COMPANY' | 'UNIVERSITY';
  toId: string;
  toName: string;
  toType: 'PERSON' | 'COMPANY' | 'UNIVERSITY';
  connectionType: string;
  strength: 'STRONG' | 'MODERATE' | 'WEAK';
  title?: string;
  company?: string;
  companyId?: string;
  linkedInUrl?: string;
  avatar?: string;
  mutualInstitution?: string;
  degree?: string;
  verified?: boolean;
}

export interface NetworkPath {
  targetCompany: string;
  companyId?: string;
  pathNodes: { 
    name: string; 
    type: string; 
    relationship: string; 
    linkedInUrl?: string;
    avatar?: string;
  }[];
  strength: 'STRONG' | 'MODERATE' | 'WEAK';
  description?: string;
}

// Thesis
export interface Thesis {
  id: string;
  name: string;
  sector: string;
  geography: string;
  stage: string;
  fundingRange: string;
  founderProfile: string;
  signals: string[];
  locations: string[];
  createdAt: string;
  matchingCompanies: string[];
}

// Watchlist
export interface WatchlistItem {
  companyId: string;
  addedAt: string;
  lastChecked: string;
  changes: WatchlistChange[];
}

export interface WatchlistChange {
  type: string;
  description: string;
  date: string;
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
}

// Opportunity
export interface Opportunity {
  id: string;
  title: string;
  sector: string;
  signals: { signal: string; source: string; }[];
  relatedCompanies: string[];
  description: string;
  detectedAt: string;
  whyDetected?: string[];
}

// Recommendation
export interface Recommendation {
  companyId: string;
  companyName?: string;
  type: 'DIRECT_COMPARABLE' | 'HIDDEN_COMPARABLE' | 'ADJACENT' | 'EMERGING' | 'FOUNDER_NETWORK' | 'INVESTOR_NETWORK' | 'THESIS_MATCH';
  reasons: string[];
  score: number;
}

// Ecosystem
export type EcosystemType = 'GLOBAL' | 'INDIA' | 'TAMIL_NADU' | 'CHENNAI' | 'SRM' | 'VIT' | 'MANIPAL' | 'IIT_MADRAS' | 'IIT_BOMBAY' | 'CUSTOM';

export interface Ecosystem {
  id: EcosystemType;
  name: string;
  description: string;
  companyCount: number;
  founderCount: number;
}

// Market/Sector
export interface MarketSector {
  id: string;
  name: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  subSectors: { name: string; trend: 'UP' | 'DOWN' | 'STABLE' }[];
  signalStrength: 'STRONG' | 'MODERATE' | 'WEAK';
}

// Domino Map
export interface DominoEffect {
  eventId: string;
  headline: string;
  date: string;
  nodes: DominoNode[];
}

export interface DominoNode {
  id: string;
  label: string;
  type: 'EVENT' | 'COMPANY' | 'SUPPLIER' | 'COMPETITOR' | 'MARKET' | 'EFFECT';
  order: number; // 1st, 2nd, 3rd order
  description: string;
  companyId?: string;
}

// Investigation / AI Analyst
export interface Investigation {
  id: string;
  query: string;
  plan: InvestigationStep[];
  findings: InvestigationFinding;
}

export interface InvestigationStep {
  label: string;
  status: 'COMPLETE' | 'IN_PROGRESS' | 'PENDING';
  description: string;
}

export interface InvestigationFinding {
  executiveSummary: string;
  evidence: string[];
  supportingSignals: string[];
  contradictingEvidence: string[];
  unknowns: string[];
  nextQuestions: string[];
  sources: string[];
}

// Red Team
export interface RedTeamAnalysis {
  thesis: string;
  bullCase: string[];
  bearCase: string[];
  contradictoryEvidence: string[];
  unknownVariables: string[];
  assumptions: string[];
  fiveThingsWrong: string[];
}

// VS Mode
export interface CompanyComparison {
  companyA: string;
  companyB: string;
  dimensions: ComparisonDimension[];
  structuralDifferences: string[];
}

export interface ComparisonDimension {
  name: string;
  companyAValue: string;
  companyAEvidence: EvidenceClaim;
  companyBValue: string;
  companyBEvidence: EvidenceClaim;
}
