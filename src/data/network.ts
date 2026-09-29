import { NetworkConnection, NetworkPath } from './types';

export const networkConnections: NetworkConnection[] = [
  // 1. SRM Alumni Founders (Torus Robotics)
  {
    id: 'nc_torus_1',
    fromId: 'f_vignesh',
    fromName: 'M. Vignesh',
    fromType: 'PERSON',
    toId: 'c_torus',
    toName: 'Torus Robotics',
    toType: 'COMPANY',
    connectionType: 'FOUNDER & CEO',
    strength: 'STRONG',
    title: 'Founder & CEO',
    company: 'Torus Robotics',
    companyId: 'c_torus',
    linkedInUrl: 'https://www.linkedin.com/in/vignesh-manimaran-torus/',
    mutualInstitution: 'SRM Institute of Science and Technology',
    degree: 'B.Tech Mechatronics (Class of 2018)',
    verified: true
  },
  {
    id: 'nc_torus_2',
    fromId: 'f_abbhi',
    fromName: 'K. Abbhi Vignesh',
    fromType: 'PERSON',
    toId: 'c_torus',
    toName: 'Torus Robotics',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & COO',
    strength: 'STRONG',
    title: 'Co-Founder & COO',
    company: 'Torus Robotics',
    companyId: 'c_torus',
    linkedInUrl: 'https://www.linkedin.com/in/kandasamy-abbhi-vignesh/',
    mutualInstitution: 'SRM Institute of Science and Technology',
    degree: 'B.Tech Mechatronics (Class of 2018)',
    verified: true
  },
  {
    id: 'nc_torus_3',
    fromId: 'f_vibhakar',
    fromName: 'Vibhakar Senthil Kumar',
    fromType: 'PERSON',
    toId: 'c_torus',
    toName: 'Torus Robotics',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CTO',
    strength: 'STRONG',
    title: 'Co-Founder & CTO',
    company: 'Torus Robotics',
    companyId: 'c_torus',
    linkedInUrl: 'https://www.linkedin.com/in/vibhakar-senthil-kumar/',
    mutualInstitution: 'SRM Institute of Science and Technology',
    degree: 'B.Tech Mechatronics (Class of 2018)',
    verified: true
  },

  // 2. SRM Alumni Founders (STAGE / WittyFeed)
  {
    id: 'nc_stage_1',
    fromId: 'f_vinay',
    fromName: 'Vinay Singhal',
    fromType: 'PERSON',
    toId: 'c_stage',
    toName: 'STAGE',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CEO',
    strength: 'STRONG',
    title: 'Co-Founder & CEO',
    company: 'STAGE (Dialect OTT)',
    companyId: 'c_stage',
    linkedInUrl: 'https://www.linkedin.com/in/vinaysinghal/',
    mutualInstitution: 'SRM Institute of Science and Technology',
    degree: 'Alumni (Kattankulathur Campus)',
    verified: true
  },
  {
    id: 'nc_stage_2',
    fromId: 'f_shashank',
    fromName: 'Shashank Vaishnav',
    fromType: 'PERSON',
    toId: 'c_stage',
    toName: 'STAGE',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CTO',
    strength: 'STRONG',
    title: 'Co-Founder & CTO',
    company: 'STAGE (Dialect OTT)',
    companyId: 'c_stage',
    linkedInUrl: 'https://www.linkedin.com/in/shashank-vaishnav/',
    mutualInstitution: 'SRM Institute of Science and Technology',
    degree: 'B.Tech Computer Science',
    verified: true
  },

  // 3. IIT Madras Incubated Founders (Ather Energy)
  {
    id: 'nc_ather_1',
    fromId: 'f_tarun',
    fromName: 'Tarun Mehta',
    fromType: 'PERSON',
    toId: 'c_ather',
    toName: 'Ather Energy',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CEO',
    strength: 'STRONG',
    title: 'Co-Founder & CEO',
    company: 'Ather Energy',
    companyId: 'c_ather',
    linkedInUrl: 'https://www.linkedin.com/in/tarunsmehta/',
    mutualInstitution: 'IIT Madras',
    degree: 'B.Tech & M.Tech Dual Degree (Engineering Design)',
    verified: true
  },
  {
    id: 'nc_ather_2',
    fromId: 'f_swapnil',
    fromName: 'Swapnil Jain',
    fromType: 'PERSON',
    toId: 'c_ather',
    toName: 'Ather Energy',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CTO',
    strength: 'STRONG',
    title: 'Co-Founder & CTO',
    company: 'Ather Energy',
    companyId: 'c_ather',
    linkedInUrl: 'https://www.linkedin.com/in/swapnil-jain-567a1315/',
    mutualInstitution: 'IIT Madras',
    degree: 'B.Tech & M.Tech Dual Degree (Engineering Design)',
    verified: true
  },

  // 4. IIT Madras Incubated Founders (Agnikul Cosmos)
  {
    id: 'nc_agnikul_1',
    fromId: 'f_srinath',
    fromName: 'Srinath Ravichandran',
    fromType: 'PERSON',
    toId: 'c_agnikul',
    toName: 'Agnikul Cosmos',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CEO',
    strength: 'STRONG',
    title: 'Co-Founder & CEO',
    company: 'Agnikul Cosmos',
    companyId: 'c_agnikul',
    linkedInUrl: 'https://www.linkedin.com/in/srinath-ravichandran-9430948/',
    mutualInstitution: 'IIT Madras Research Park',
    degree: 'MS Aerospace (UIUC) / Incubation Fellow',
    verified: true
  },
  {
    id: 'nc_agnikul_2',
    fromId: 'f_moin',
    fromName: 'Moin SPM',
    fromType: 'PERSON',
    toId: 'c_agnikul',
    toName: 'Agnikul Cosmos',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & COO',
    strength: 'STRONG',
    title: 'Co-Founder & COO',
    company: 'Agnikul Cosmos',
    companyId: 'c_agnikul',
    linkedInUrl: 'https://www.linkedin.com/in/moin-spm/',
    mutualInstitution: 'Anna University / IIT Madras',
    degree: 'BE Aeronautics & MBA Operations',
    verified: true
  },

  // 5. DeepTech Space Founders (Skyroot Aerospace)
  {
    id: 'nc_skyroot_1',
    fromId: 'f_pawan',
    fromName: 'Pawan Kumar Chandana',
    fromType: 'PERSON',
    toId: 'c_skyroot',
    toName: 'Skyroot Aerospace',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CEO',
    strength: 'STRONG',
    title: 'Co-Founder & CEO',
    company: 'Skyroot Aerospace',
    companyId: 'c_skyroot',
    linkedInUrl: 'https://www.linkedin.com/in/pawan-kumar-chandana-78701915/',
    mutualInstitution: 'IIT Kharagpur / ex-ISRO',
    degree: 'B.Tech & M.Tech Mechanical / VSSC Propulsion',
    verified: true
  },

  // 6. Indic AI Research Founders (Sarvam AI)
  {
    id: 'nc_sarvam_1',
    fromId: 'f_pratyush',
    fromName: 'Dr. Pratyush Kumar',
    fromType: 'PERSON',
    toId: 'c_sarvam',
    toName: 'Sarvam AI',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER',
    strength: 'STRONG',
    title: 'Co-Founder & Researcher',
    company: 'Sarvam AI',
    companyId: 'c_sarvam',
    linkedInUrl: 'https://www.linkedin.com/in/pratyush-kumar-4286668/',
    mutualInstitution: 'IIT Madras Faculty / AI4Bharat',
    degree: 'PhD ETH Zurich / IIT Bombay Alumni',
    verified: true
  },
  {
    id: 'nc_sarvam_2',
    fromId: 'f_vivek',
    fromName: 'Dr. Vivek Raghavan',
    fromType: 'PERSON',
    toId: 'c_sarvam',
    toName: 'Sarvam AI',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER',
    strength: 'STRONG',
    title: 'Co-Founder',
    company: 'Sarvam AI',
    companyId: 'c_sarvam',
    linkedInUrl: 'https://www.linkedin.com/in/vivek-raghavan-6b04291/',
    mutualInstitution: 'AI4Bharat / IIT Delhi',
    degree: 'PhD Carnegie Mellon University',
    verified: true
  },

  // 7. Developer Tooling (Postman)
  {
    id: 'nc_postman_1',
    fromId: 'f_abhinav',
    fromName: 'Abhinav Asthana',
    fromType: 'PERSON',
    toId: 'c_postman',
    toName: 'Postman',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CEO',
    strength: 'MODERATE',
    title: 'CEO & Co-Founder',
    company: 'Postman',
    companyId: 'c_postman',
    linkedInUrl: 'https://www.linkedin.com/in/abhinavasthana/',
    mutualInstitution: 'BITS Pilani Goa',
    degree: 'B.E. Electronics & Instrumentation (Class of 2010)',
    verified: true
  },
  {
    id: 'nc_postman_2',
    fromId: 'f_ankit',
    fromName: 'Ankit Sobti',
    fromType: 'PERSON',
    toId: 'c_postman',
    toName: 'Postman',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CTO',
    strength: 'MODERATE',
    title: 'CTO & Co-Founder',
    company: 'Postman',
    companyId: 'c_postman',
    linkedInUrl: 'https://www.linkedin.com/in/asobti/',
    mutualInstitution: 'PES University',
    degree: 'B.E. Computer Science',
    verified: true
  },

  // 8. Consumer Unicorn Founders (Swiggy, Zomato, Zepto)
  {
    id: 'nc_swiggy_1',
    fromId: 'f_sriharsha',
    fromName: 'Sriharsha Majety',
    fromType: 'PERSON',
    toId: 'c_swiggy',
    toName: 'Swiggy',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & GROUP CEO',
    strength: 'MODERATE',
    title: 'Group CEO & Co-Founder',
    company: 'Swiggy',
    companyId: 'c_swiggy',
    linkedInUrl: 'https://www.linkedin.com/in/sriharsha-majety/',
    mutualInstitution: 'BITS Pilani / IIM Calcutta',
    degree: 'M.Sc Physics + B.E. Electrical & Electronics',
    verified: true
  },
  {
    id: 'nc_zomato_1',
    fromId: 'f_deepinder',
    fromName: 'Deepinder Goyal',
    fromType: 'PERSON',
    toId: 'c_zomato',
    toName: 'Zomato',
    toType: 'COMPANY',
    connectionType: 'FOUNDER & CEO',
    strength: 'MODERATE',
    title: 'Founder & CEO',
    company: 'Zomato',
    companyId: 'c_zomato',
    linkedInUrl: 'https://www.linkedin.com/in/deepindergoyal/',
    mutualInstitution: 'IIT Delhi',
    degree: 'Integrated M.Tech Mathematics & Computing',
    verified: true
  },
  {
    id: 'nc_zepto_1',
    fromId: 'f_aadit',
    fromName: 'Aadit Palicha',
    fromType: 'PERSON',
    toId: 'c_zepto',
    toName: 'Zepto',
    toType: 'COMPANY',
    connectionType: 'CO-FOUNDER & CEO',
    strength: 'MODERATE',
    title: 'Co-Founder & CEO',
    company: 'Zepto',
    companyId: 'c_zepto',
    linkedInUrl: 'https://www.linkedin.com/in/aadit-palicha/',
    mutualInstitution: 'Stanford University (YC W21)',
    degree: 'Computer Science (Dropout)',
    verified: true
  }
];

export const networkPaths: NetworkPath[] = [
  {
    targetCompany: 'Torus Robotics',
    companyId: 'c_torus',
    strength: 'STRONG',
    description: 'Direct 1st-degree institutional alumni corridor via SRMIST Mechatronics engineering department.',
    pathNodes: [
      { name: 'You (Aryan Singh)', type: 'ALUMNI', relationship: 'SRMIST Undergrad Network' },
      { name: 'AIC-SRMIST Incubation Desk', type: 'INSTITUTION', relationship: 'DeepTech Grant Incubator' },
      { name: 'M. Vignesh', type: 'FOUNDER', relationship: 'SRMIST Mechatronics \'18', linkedInUrl: 'https://www.linkedin.com/in/vignesh-manimaran-torus/' },
      { name: 'Torus Robotics', type: 'COMPANY', relationship: 'Defence Electric UGVs' }
    ]
  },
  {
    targetCompany: 'STAGE (Dialect OTT)',
    companyId: 'c_stage',
    strength: 'STRONG',
    description: 'Direct alumni bridge through SRM Kattankulathur Computer Science student-founder network.',
    pathNodes: [
      { name: 'You (Aryan Singh)', type: 'ALUMNI', relationship: 'SRMIST Network' },
      { name: 'SRM DEI / Kattankulathur', type: 'CAMPUS', relationship: 'Innovation Cell' },
      { name: 'Shashank Vaishnav', type: 'FOUNDER', relationship: 'CTO, SRM B.Tech CSE', linkedInUrl: 'https://www.linkedin.com/in/shashank-vaishnav/' },
      { name: 'STAGE', type: 'COMPANY', relationship: 'Hyperlocal OTT Platform' }
    ]
  },
  {
    targetCompany: 'Ather Energy',
    companyId: 'c_ather',
    strength: 'STRONG',
    description: 'Chennai regional corridor link via IIT Madras Research Park incubation and clean mobility syndicate.',
    pathNodes: [
      { name: 'You', type: 'RESEARCHER', relationship: 'Chennai Tech Network' },
      { name: 'IIT Madras Research Park', type: 'INSTITUTION', relationship: 'Incubation Partner' },
      { name: 'Tarun Mehta', type: 'FOUNDER', relationship: 'IIT Madras Dual Degree', linkedInUrl: 'https://www.linkedin.com/in/tarunsmehta/' },
      { name: 'Ather Energy', type: 'COMPANY', relationship: 'Pre-IPO EV Manufacturer' }
    ]
  },
  {
    targetCompany: 'Agnikul Cosmos',
    companyId: 'c_agnikul',
    strength: 'STRONG',
    description: 'Chennai aerospace corridor through National Centre for Combustion R&D at IIT Madras.',
    pathNodes: [
      { name: 'You', type: 'RESEARCHER', relationship: 'DeepTech Corridor' },
      { name: 'Prof. S.R. Chakravarthy', type: 'ACADEMIC', relationship: 'IITM Aerospace Lab' },
      { name: 'Srinath Ravichandran', type: 'FOUNDER', relationship: 'IITM Incubated Fellow', linkedInUrl: 'https://www.linkedin.com/in/srinath-ravichandran-9430948/' },
      { name: 'Agnikul Cosmos', type: 'COMPANY', relationship: 'Orbital Launch Vehicles' }
    ]
  },
  {
    targetCompany: 'Sarvam AI',
    companyId: 'c_sarvam',
    strength: 'STRONG',
    description: 'Open-source Indic language consortium via IIT Madras AI4Bharat initiative.',
    pathNodes: [
      { name: 'You', type: 'RESEARCHER', relationship: 'AI Systems Network' },
      { name: 'AI4Bharat Research Lab', type: 'INSTITUTION', relationship: 'IIT Madras Indic Consortium' },
      { name: 'Dr. Pratyush Kumar', type: 'FOUNDER', relationship: 'IITM Faculty & Researcher', linkedInUrl: 'https://www.linkedin.com/in/pratyush-kumar-4286668/' },
      { name: 'Sarvam AI', type: 'COMPANY', relationship: 'Sovereign 2B Indic LLM' }
    ]
  },
  {
    targetCompany: 'Postman',
    companyId: 'c_postman',
    strength: 'MODERATE',
    description: 'Nexus Venture Partners & Insight Partners early-stage portfolio syndicate pathway.',
    pathNodes: [
      { name: 'You', type: 'OPERATOR', relationship: 'Enterprise DevTools Network' },
      { name: 'Nexus Venture Partners', type: 'VC', relationship: 'Early Stage Lead Investor' },
      { name: 'Abhinav Asthana', type: 'FOUNDER', relationship: 'BITS Pilani Goa Alumni', linkedInUrl: 'https://www.linkedin.com/in/abhinavasthana/' },
      { name: 'Postman', type: 'COMPANY', relationship: 'Global API Platform ($5.6B)' }
    ]
  }
];
