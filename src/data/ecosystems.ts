import { Ecosystem } from './types';

export const ecosystems: Ecosystem[] = [
  {
    id: 'GLOBAL',
    name: 'Global',
    description: 'All tracked companies worldwide',
    companyCount: 154200,
    founderCount: 210000
  },
  {
    id: 'INDIA',
    name: 'India',
    description: 'Startups headquartered in India or with primarily Indian founders',
    companyCount: 12500,
    founderCount: 18000
  },
  {
    id: 'TAMIL_NADU',
    name: 'Tamil Nadu',
    description: 'Startups in Tamil Nadu ecosystem',
    companyCount: 1800,
    founderCount: 2400
  },
  {
    id: 'CHENNAI',
    name: 'Chennai',
    description: 'Chennai metro area startups (SaaS capital of India)',
    companyCount: 1500,
    founderCount: 2100
  },
  {
    id: 'SRM',
    name: 'SRM Institute of Science and Technology',
    description: 'Alumni founders, early employees, and incubated startups from SRM',
    companyCount: 350,
    founderCount: 420
  },
  {
    id: 'VIT',
    name: 'Vellore Institute of Technology',
    description: 'VIT alumni network',
    companyCount: 410,
    founderCount: 500
  },
  {
    id: 'IIT_MADRAS',
    name: 'IIT Madras',
    description: 'IITM alumni and Research Park incubated startups',
    companyCount: 850,
    founderCount: 1100
  }
];
