import { Opportunity } from './types';

export const opportunities: Opportunity[] = [
  {
    id: 'opp_1',
    title: 'Quick Commerce Infrastructure Rollup',
    sector: 'Logistics Tech',
    signals: [
      { signal: 'Swiggy Instamart massive dark store expansion', source: 'c_swiggy' },
      { signal: 'Zepto securing $665M for dark stores and warehousing', source: 'c_zepto' },
      { signal: 'Blinkit driving rapid EBITDA growth for Zomato', source: 'c_zomato' }
    ],
    whyDetected: [
      'Aggressive dark store expansion across tier-1 & tier-2 metros',
      'Rising equipment and last-mile delivery fleet demand',
      'Consolidation of micro-warehousing tech and supply chain automation'
    ],
    relatedCompanies: ['c_swiggy', 'c_zomato', 'c_zepto'],
    description: 'The intense war for 10-minute delivery is creating a massive secondary market for micro-warehousing, specialized EV fleets, and real-time inventory management software.',
    detectedAt: '2024-05-10T10:00:00Z'
  },
  {
    id: 'opp_2',
    title: 'Private Indian Space Launch Alternatives',
    sector: 'SpaceTech',
    signals: [
      { signal: 'Agnikul suborbital launch success with 3D engine', source: 'c_agnikul' },
      { signal: 'Skyroot orbital launch prep and Dhawan-2 testing', source: 'c_skyroot' }
    ],
    whyDetected: [
      'ISRO IN-SPACe deregulation accelerating private space ecosystem',
      'Global small satellite launch bottleneck and SpaceX backlogs',
      'Unprecedented cost advantage of indigenous 3D-printed rocket engines'
    ],
    relatedCompanies: ['c_agnikul', 'c_skyroot'],
    description: 'ISRO\'s privatization push (IN-SPACe) is bearing fruit. With Global launch capacity bottlenecked by SpaceX\'s dominance, low-cost Indian launch providers are highly positioned for global satellite constellations.',
    detectedAt: '2024-05-15T14:30:00Z'
  },
  {
    id: 'opp_3',
    title: 'AI × Industrial Maintenance & Edge Robotics',
    sector: 'Robotics & AI',
    signals: [
      { signal: 'Surge in manufacturing telemetry requirements', source: 'Industry Report' },
      { signal: 'Sensor miniaturization and on-device SLAM advances', source: 'Research Paper' }
    ],
    whyDetected: [
      'Rising downtime costs in automated automotive and electronics manufacturing',
      'Convergence of multi-modal vision models and cheap high-frequency vibration sensors',
      'Significant under-penetration of predictive maintenance in South & Southeast Asia'
    ],
    relatedCompanies: ['c_agnikul', 'c_openai'],
    description: 'Industrial manufacturing facilities are transitioning to continuous automated inspection. Edge-compute sensor nodes with local vision models eliminate high latency and cloud connectivity reliance.',
    detectedAt: '2024-06-01T08:00:00Z'
  }
];
