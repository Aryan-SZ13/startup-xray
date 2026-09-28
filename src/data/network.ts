import { NetworkConnection, NetworkPath } from './types';

export const networkConnections: NetworkConnection[] = [
  {
    id: 'nc_1',
    fromId: 'c_swiggy',
    fromName: 'Swiggy',
    fromType: 'COMPANY',
    toId: 'SRM',
    toName: 'SRM Institute',
    toType: 'UNIVERSITY',
    connectionType: 'ALUMNI_EMPLOYEES',
    strength: 'MODERATE'
  },
  {
    id: 'nc_2',
    fromId: 'c_agnikul',
    fromName: 'Agnikul',
    fromType: 'COMPANY',
    toId: 'IIT_MADRAS',
    toName: 'IIT Madras',
    toType: 'UNIVERSITY',
    connectionType: 'INCUBATED_AT',
    strength: 'STRONG'
  },
  {
    id: 'nc_3',
    fromId: 'f_sriharsha',
    fromName: 'Sriharsha Majety',
    fromType: 'PERSON',
    toId: 'c_swiggy',
    toName: 'Swiggy',
    toType: 'COMPANY',
    connectionType: 'FOUNDER',
    strength: 'STRONG'
  }
];

export const networkPaths: NetworkPath[] = [
  {
    targetCompany: 'c_swiggy',
    pathNodes: [
      { name: 'User', type: 'USER', relationship: 'Alumni of' },
      { name: 'SRM Institute', type: 'UNIVERSITY', relationship: 'Has alumni working at' },
      { name: 'Swiggy (Early Eng Team)', type: 'COMPANY', relationship: 'Employs' }
    ],
    strength: 'MODERATE'
  }
];
