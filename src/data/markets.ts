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
    id: 'm_space',
    name: 'SpaceTech',
    trend: 'UP',
    signalStrength: 'MODERATE',
    subSectors: [
      { name: 'Launch Vehicles', trend: 'UP' },
      { name: 'Satellite Constellations', trend: 'STABLE' },
      { name: 'Earth Observation', trend: 'UP' }
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
