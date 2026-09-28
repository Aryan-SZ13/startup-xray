import { DominoEffect } from './types';

export const dominoEffects: DominoEffect[] = [
  {
    eventId: 'de_swiggy_ipo',
    headline: 'Swiggy SEBI DRHP Approval Triggers Quick Commerce Capital Reallocation',
    date: '28 mins ago • Breaking Update',
    nodes: [
      { id: 'dn_1', label: 'SEBI Greenlights Swiggy $1.4B IPO', type: 'EVENT', order: 1, description: 'Anchor book opens next week with institutional demand 3.2x oversubscribed.' },
      { id: 'dn_2', label: 'Zomato Stock Re-Rating (+4.2%)', type: 'COMPETITOR', order: 2, companyId: 'c_zomato', description: 'Public markets benchmark Swiggy multiples against Zomato Blinkit EBITDA growth.' },
      { id: 'dn_3', label: 'Zepto Accelerates Pre-IPO War Chest', type: 'COMPETITOR', order: 2, companyId: 'c_zepto', description: 'Zepto closes $450M mezzanine infusion to double dark store footprint before Swiggy capital hits the street.' },
      { id: 'dn_4', label: 'Tier-2 Dark Store Real Estate Surge', type: 'MARKET', order: 3, description: 'Micro-warehousing commercial lease rates jump 18% in Pune, Ahmedabad, and Jaipur corridors.' },
      { id: 'dn_5', label: 'Cloud Kitchen & FMCG Direct Brand Consolidation', type: 'EFFECT', order: 4, description: 'FMCG brands race to sign exclusive 10-minute distribution rights, bypassing traditional retail distributors.' }
    ]
  }
];
