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
      'Zepto might siphon away the most profitable "power users" in metros.',
      'Antitrust scrutiny in India regarding restaurant commissions is an under-priced risk.'
    ]
  },
  'c_zomato': {
    thesis: 'Zomato is a permanent cash-printing consumer duopoly primed to dominate Blinkit quick commerce and going-out.',
    bullCase: [
      'Blinkit is already unit-economics positive across top 4 metro markets.',
      'Hyperpure creates vertical integration and higher barrier to entry for pure logistics players.',
      'Deepinder Goyal execution track record demonstrates rapid capital reallocation.'
    ],
    bearCase: [
      'Severe competitive pressure from Zepto forcing dark store capex spending to double.',
      'Regulatory scrutiny over restaurant platform fees and gig worker social security guarantees.',
      'High valuation multiple (~120x earnings) leaves zero margin of safety for growth deceleration.'
    ],
    contradictoryEvidence: [
      'High headline market cap expansion while take-rates on restaurants have plateaued at ~22%.'
    ],
    unknownVariables: [
      'Longevity of consumer willingness to pay handling and rain surge fees without churn.'
    ],
    assumptions: [
      'Assumes quick commerce margins can expand beyond 4-5% EBITDA long term.'
    ],
    fiveThingsWrong: [
      'Public multiple compression if quarterly growth drops below 40%.',
      'Zepto cafe and non-grocery retail eating into high-margin grocery baskets.',
      'Potential CCI investigation on deep discounting and dark store exclusivity.',
      'Delivery partner supply shocks during summer heatwaves and regional strikes.',
      'Over-expansion into non-core entertainment verticals through Paytm acquisitions.'
    ]
  },
  'c_zepto': {
    thesis: 'Zepto will out-execute legacy delivery apps and become the undisputed Amazon of India quick commerce.',
    bullCase: [
      'Youngest, most agile leadership team with hyper-focused single-purpose execution.',
      '300% YoY top-line GMV velocity taking market share in Mumbai and NCR.',
      'Successfully diversified into Zepto Cafe and high-margin electronics delivery.'
    ],
    bearCase: [
      'Burns estimated $25M-$30M monthly to defend dark store territory against Swiggy and Blinkit.',
      'Heavy reliance on continuous mega-equity rounds in a volatile macro venture environment.',
      'Corporate governance and compliance overhead as company scales toward domestic IPO.'
    ],
    contradictoryEvidence: [
      'Claims near-breakeven stores while offering 20-30% discounts and subsidized delivery.'
    ],
    unknownVariables: [
      'True retention cohorts once marketing subsidies and referral bonuses are removed.'
    ],
    assumptions: [
      'Assumes unlimited private capital access until FY26 public listing.'
    ],
    fiveThingsWrong: [
      'Sudden liquidity freeze in global late-stage growth venture rounds.',
      'Supplier margin pushback from FMCG conglomerates against dark store listing fees.',
      'Delivery partner wage inflation in Tier-1 metros eroding unit economics.',
      'Real estate cost inflation on prime urban micro-warehousing corridors.',
      'Execution bottlenecks as headcount balloons beyond founder bandwidth.'
    ]
  },
  'c_agnikul': {
    thesis: 'Agnikul will dominate low-cost dedicated small satellite launch with mobile launchpads and 3D printed engines.',
    bullCase: [
      'World-first single-piece 3D printed cryogenic engine eliminates assembly welds.',
      'Mobile containerized launchpad enables rapid launch cadence from any coastal geography.',
      'Direct institutional backing from ISRO, IN-SPACe, and IIT Madras ecosystem.'
    ],
    bearCase: [
      'Orbital insertion physics carries 40%+ failure rates on inaugural commercial missions.',
      'Global rideshare giants (SpaceX Transporter missions) price per kg below dedicated micro-launchers.',
      'Capital intensity requires sustained defense and government payload subsidies.'
    ],
    contradictoryEvidence: [
      'Delays in initial flight demonstration show severe hardware test stand bottlenecks.'
    ],
    unknownVariables: [
      'Orbital stage separation reliability under actual cryogenic vacuum conditions.'
    ],
    assumptions: [
      'Assumes smallsat operators will pay 3x premium for dedicated orbital time slot.'
    ],
    fiveThingsWrong: [
      'Catastrophic test flight anomaly during first commercial customer payload launch.',
      'Additive manufacturing powder supply disruptions for aerospace grade Inconel.',
      'Aggressive pricing pressure from Skyroot, Rocket Lab, and SpaceX rideshares.',
      'Regulatory clearance delays from international satellite operators.',
      'High burn rate exhausting venture runway before reaching steady launch cadence.'
    ]
  }
};
