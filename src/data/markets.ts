import { MarketSector } from './types';

export const markets: MarketSector[] = [
  {
    id: 'm_ai',
    name: 'Artificial Intelligence',
    trend: 'UP',
    signalStrength: 'STRONG',
    subSectors: [
      { name: 'Foundation Models', trend: 'UP' },
      { name: 'AI Infrastructure', trend: 'UP' },
      { name: 'Applied AI/Copilots', trend: 'UP' }
    ]
  },
  {
    id: 'm_robotics',
    name: 'Robotics',
    trend: 'UP',
    signalStrength: 'STRONG',
    subSectors: [
      { name: 'Industrial Autonomy', trend: 'UP' },
      { name: 'Warehouse Automation', trend: 'UP' },
      { name: 'Humanoids & Edge SLAM', trend: 'UP' }
    ]
  },
  {
    id: 'm_fintech',
    name: 'Fintech',
    trend: 'STABLE',
    signalStrength: 'MODERATE',
    subSectors: [
      { name: 'Cross-Border Rails', trend: 'UP' },
      { name: 'Account Aggregator', trend: 'UP' },
      { name: 'Lending Protocols', trend: 'STABLE' }
    ]
  },
  {
    id: 'm_saas',
    name: 'SaaS',
    trend: 'STABLE',
    signalStrength: 'MODERATE',
    subSectors: [
      { name: 'Vertical AI Agents', trend: 'UP' },
      { name: 'Security & Auth', trend: 'UP' },
      { name: 'Horizontal SaaS', trend: 'DOWN' }
    ]
  },
  {
    id: 'm_space',
    name: 'SpaceTech',
    trend: 'UP',
    signalStrength: 'STRONG',
    subSectors: [
      { name: 'Launch Vehicles', trend: 'UP' },
      { name: 'Satellite Constellations', trend: 'STABLE' },
      { name: 'Earth Observation', trend: 'UP' }
    ]
  },
  {
    id: 'm_climate',
    name: 'Climate',
    trend: 'UP',
    signalStrength: 'MODERATE',
    subSectors: [
      { name: 'Grid Storage Batteries', trend: 'UP' },
      { name: 'Carbon Accounting', trend: 'STABLE' },
      { name: 'Water Desalination', trend: 'UP' }
    ]
  },
  {
    id: 'm_biotech',
    name: 'Biotech',
    trend: 'UP',
    signalStrength: 'MODERATE',
    subSectors: [
      { name: 'Synthetic Biology', trend: 'UP' },
      { name: 'Computational Drug Discovery', trend: 'UP' },
      { name: 'Gene Editing', trend: 'STABLE' }
    ]
  },
  {
    id: 'm_defense',
    name: 'Defense',
    trend: 'UP',
    signalStrength: 'STRONG',
    subSectors: [
      { name: 'Autonomous UAV Swarms', trend: 'UP' },
      { name: 'Electronic Warfare', trend: 'UP' },
      { name: 'Satellite Communications', trend: 'UP' }
    ]
  },
  {
    id: 'm_consumer',
    name: 'Consumer Tech',
    trend: 'STABLE',
    signalStrength: 'MODERATE',
    subSectors: [
      { name: 'Quick Commerce', trend: 'UP' },
      { name: 'Food Delivery', trend: 'STABLE' },
      { name: 'D2C Brands', trend: 'DOWN' }
    ]
  }
];

