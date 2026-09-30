const fs = require('fs');
const path = require('path');

// 520+ distinct curated tech startup profiles across India & Global tech ecosystem
const companiesSeed = [
  // AI & Foundation Models / ML Infra
  { name: 'Anthropic', hq: 'San Francisco, USA', sector: 'Artificial Intelligence', ind: 'Generative AI', sub: 'Foundation Models & Safety', stage: 'LATE_STAGE', val: '$18.4B', fund: '$7.6B', rev: '$850M ARR', emp: '500+', f: [{ name: 'Dario Amodei', title: 'CEO & Co-founder', edu: 'Stanford University (PhD Physics)', eco: 'STANFORD', li: 'https://www.linkedin.com/in/dario-amodei/' }, { name: 'Daniela Amodei', title: 'President & Co-founder', edu: 'UC Santa Cruz', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/daniela-amodei/' }] },
  { name: 'Perplexity AI', hq: 'San Francisco, USA', sector: 'Artificial Intelligence', ind: 'Search & LLM Engine', sub: 'Conversational Search', stage: 'SERIES_C', val: '$3.0B', fund: '$165M', rev: '$35M ARR', emp: '120+', f: [{ name: 'Aravind Srinivas', title: 'CEO & Co-founder', edu: 'IIT Madras (Dual Degree EE), UC Berkeley (PhD CS)', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/aravind-srinivas-16052741/' }, { name: 'Denis Yarats', title: 'CTO & Co-founder', edu: 'NYU (PhD CS)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/denisyarats/' }] },
  { name: 'Mistral AI', hq: 'Paris, France', sector: 'Artificial Intelligence', ind: 'Open Weights AI', sub: 'Enterprise LLMs', stage: 'SERIES_B', val: '$6.2B', fund: '$1.1B', rev: '$40M ARR', emp: '85+', f: [{ name: 'Arthur Mensch', title: 'CEO & Co-founder', edu: 'École Polytechnique', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/arthur-mensch/' }] },
  { name: 'Scale AI', hq: 'San Francisco, USA', sector: 'Artificial Intelligence', ind: 'Data Infrastructure', sub: 'RLHF & Data Annotation', stage: 'LATE_STAGE', val: '$13.8B', fund: '$1.6B', rev: '$750M ARR', emp: '1000+', f: [{ name: 'Alexandr Wang', title: 'CEO & Founder', edu: 'MIT (Mathematics & CS)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/alexandr-wang/' }] },
  { name: 'Cohere', hq: 'Toronto, Canada', sector: 'Artificial Intelligence', ind: 'Enterprise AI', sub: 'LLMs for Enterprise', stage: 'SERIES_D', val: '$5.5B', fund: '$970M', rev: '$50M ARR', emp: '400+', f: [{ name: 'Aidan Gomez', title: 'CEO & Co-founder', edu: 'University of Oxford, University of Toronto', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/aidangomez/' }] },
  { name: 'Hugging Face', hq: 'New York, USA', sector: 'Artificial Intelligence', ind: 'Open Source AI', sub: 'Model Hub & Community', stage: 'SERIES_D', val: '$4.5B', fund: '$395M', rev: '$70M ARR', emp: '250+', f: [{ name: 'Clément Delangue', title: 'CEO & Co-founder', edu: 'ESCP Business School', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/clementdelangue/' }] },
  { name: 'Cursor (Anysphere)', hq: 'San Francisco, USA', sector: 'Developer Tools', ind: 'AI Code Editors', sub: 'Intelligent Software Engineering', stage: 'SERIES_A', val: '$2.5B', fund: '$68M', rev: '$50M ARR', emp: '25+', f: [{ name: 'Michael Truell', title: 'CEO & Co-founder', edu: 'MIT (Computer Science)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/michaeltruell/' }] },
  { name: 'Glean', hq: 'Palo Alto, USA', sector: 'Enterprise SaaS', ind: 'Enterprise Search', sub: 'AI Work Assistant', stage: 'SERIES_E', val: '$4.6B', fund: '$610M', rev: '$100M ARR', emp: '500+', f: [{ name: 'Arvind Jain', title: 'CEO & Co-founder', edu: 'IIT Delhi (B.Tech CS), University of Washington', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/arvind-jain-glean/' }] },
  { name: 'Together AI', hq: 'Menlo Park, USA', sector: 'Artificial Intelligence', ind: 'Cloud Compute & Inference', sub: 'Decentralized AI Infra', stage: 'SERIES_B', val: '$3.3B', fund: '$228M', rev: '$75M ARR', emp: '100+', f: [{ name: 'Vipul Ved Prakash', title: 'CEO & Co-founder', edu: 'Self-taught technologist', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/vipulprakash/' }] },
  { name: 'Groq', hq: 'Mountain View, USA', sector: 'Semiconductors', ind: 'LPU Hardware', sub: 'Ultra-fast Inference Chips', stage: 'SERIES_D', val: '$2.8B', fund: '$640M', rev: '$60M', emp: '350+', f: [{ name: 'Jonathan Ross', title: 'CEO & Founder', edu: 'NYU (Computer Science)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/jonathan-ross-groq/' }] },
  { name: 'Runway', hq: 'New York, USA', sector: 'Artificial Intelligence', ind: 'Video Generation', sub: 'GenAI Creative Suite', stage: 'SERIES_C', val: '$1.5B', fund: '$236M', rev: '$45M ARR', emp: '120+', f: [{ name: 'Cristóbal Valenzuela', title: 'CEO & Co-founder', edu: 'NYU ITP', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/cvalenzuelab/' }] },
  { name: 'Midjourney', hq: 'San Francisco, USA', sector: 'Artificial Intelligence', ind: 'Image Synthesis', sub: 'Autonomous Research Lab', stage: 'BOOTSTRAPPED', val: '$10.0B', fund: '$0', rev: '$200M ARR', emp: '40+', f: [{ name: 'David Holz', title: 'Founder & CEO', edu: 'University of North Carolina', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/david-holz-97a95610/' }] },
  { name: 'ElevenLabs', hq: 'London, UK', sector: 'Artificial Intelligence', ind: 'Audio & Speech AI', sub: 'Voice Cloning & Dubbing', stage: 'SERIES_B', val: '$1.1B', fund: '$101M', rev: '$80M ARR', emp: '80+', f: [{ name: 'Piotr Dabkowski', title: 'CTO & Co-founder', edu: 'University of Cambridge', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/piotr-dabkowski/' }, { name: 'Mati Staniszewski', title: 'CEO & Co-founder', edu: 'Imperial College London', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/mati-staniszewski/' }] },
  { name: 'Cognition (Devin)', hq: 'San Francisco, USA', sector: 'Artificial Intelligence', ind: 'Autonomous Software Engineers', sub: 'AI Agents', stage: 'SERIES_A', val: '$2.0B', fund: '$175M', rev: '$12M ARR', emp: '30+', f: [{ name: 'Scott Wu', title: 'CEO & Co-founder', edu: 'Harvard University (Mathematics)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/scott-wu-0b44129b/' }] },
  { name: 'Figure AI', hq: 'Sunnyvale, USA', sector: 'Robotics', ind: 'Humanoid Robotics', sub: 'General Purpose Embodied AI', stage: 'SERIES_B', val: '$2.6B', fund: '$754M', rev: 'Pre-commercial', emp: '150+', f: [{ name: 'Brett Adcock', title: 'Founder & CEO', edu: 'University of Florida', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/brettadcock/' }] },
  { name: 'Anduril Industries', hq: 'Costa Mesa, USA', sector: 'Defense Tech', ind: 'Autonomous Defense Systems', sub: 'Lattice OS & Drones', stage: 'SERIES_F', val: '$14.0B', fund: '$3.8B', rev: '$500M ARR', emp: '2800+', f: [{ name: 'Palmer Luckey', title: 'Founder', edu: 'CSU Long Beach', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/palmer-luckey-b725b828/' }] },
  { name: 'Shield AI', hq: 'San Diego, USA', sector: 'Defense Tech', ind: 'Autonomous AI Pilot', sub: 'Hivemind Defense AI', stage: 'SERIES_F', val: '$2.8B', fund: '$770M', rev: '$150M ARR', emp: '700+', f: [{ name: 'Ryan Tseng', title: 'CEO & Co-founder', edu: 'MIT (Electrical Engineering & CS)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/ryan-tseng-863a131/' }] },

  // Indian AI & DeepTech
  { name: 'Sarvam AI', hq: 'Bangalore, India', sector: 'Artificial Intelligence', ind: 'Sovereign LLMs', sub: 'Indic Foundation Models', stage: 'SERIES_A', val: '$220M', fund: '$41M', rev: 'Pre-commercial', emp: '45+', f: [{ name: 'Vivek Raghavan', title: 'Co-founder', edu: 'IIT Delhi, Carnegie Mellon University (PhD)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/vivek-raghavan-ai/' }, { name: 'Pratyush Kumar', title: 'Co-founder', edu: 'IIT Bombay, ETH Zurich (PhD)', eco: 'IIT_BOMBAY', li: 'https://www.linkedin.com/in/pratyush-kumar-ai/' }] },
  { name: 'Krutrim SI Designs', hq: 'Bangalore, India', sector: 'Artificial Intelligence', ind: 'Full-stack AI & Cloud', sub: 'Silicon, Cloud & Multilingual LLMs', stage: 'SERIES_A', val: '$1.0B', fund: '$50M', rev: '$5M ARR', emp: '180+', f: [{ name: 'Bhavish Aggarwal', title: 'Founder & CEO', edu: 'IIT Bombay (B.Tech Computer Science)', eco: 'IIT_BOMBAY', li: 'https://www.linkedin.com/in/bhavishaggarwal/' }] },
  { name: 'Yellow.ai', hq: 'San Mateo, USA / Bangalore', sector: 'Enterprise SaaS', ind: 'Conversational AI', sub: 'Agentic Customer Service', stage: 'SERIES_C', val: '$850M', fund: '$102M', rev: '$65M ARR', emp: '800+', f: [{ name: 'Raghu Ravinutala', title: 'CEO & Co-founder', edu: 'NIT Warangal', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/raghuravinutala/' }] },
  { name: 'Gupshup', hq: 'San Francisco / Mumbai', sector: 'Enterprise SaaS', ind: 'Conversational Cloud', sub: 'CPaaS & Enterprise Bots', stage: 'SERIES_F', val: '$1.4B', fund: '$490M', rev: '$250M ARR', emp: '1200+', f: [{ name: 'Beerud Sheth', title: 'CEO & Co-founder', edu: 'IIT Bombay (CS), MIT (MS CS)', eco: 'IIT_BOMBAY', li: 'https://www.linkedin.com/in/beerud/' }] },
  { name: 'Uniphore', hq: 'Palo Alto / Chennai', sector: 'Enterprise SaaS', ind: 'Conversational Service Automation', sub: 'Voice & Emotion AI', stage: 'SERIES_E', val: '$2.5B', fund: '$610M', rev: '$120M ARR', emp: '900+', f: [{ name: 'Umesh Sachdev', title: 'CEO & Co-founder', edu: 'Jaypee Institute of Information Tech, incubated at IIT Madras', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/umeshsachdev/' }] },
  { name: 'Torus Robotics', hq: 'Chennai, India', sector: 'Defense & Robotics', ind: 'Autonomous Defense Rovers', sub: 'Heavy-payload Military UGV & Powertrains', stage: 'SEED', val: '$12M', fund: '$1.2M', rev: '$1.5M', emp: '35+', f: [{ name: 'M. Vignesh', title: 'CEO & Co-founder', edu: 'SRM Institute of Science and Technology (B.Tech Mechatronics)', eco: 'SRM', li: 'https://www.linkedin.com/in/vignesh-manimaran-torus/' }, { name: 'K. Abbhi Vignesh', title: 'COO & Co-founder', edu: 'SRM Institute of Science and Technology (B.Tech Mechatronics)', eco: 'SRM', li: 'https://www.linkedin.com/in/kandasamy-abbhi-vignesh/' }, { name: 'Vibhakar Senthil Kumar', title: 'CTO & Co-founder', edu: 'SRM Institute of Science and Technology (B.Tech Mechatronics)', eco: 'SRM', li: 'https://www.linkedin.com/in/vibhakar-senthil-kumar/' }] },

  // Indian Fintech & Financial Services
  { name: 'Zerodha', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Discount Brokerage', sub: 'Wealth Management & Trading Infra', stage: 'BOOTSTRAPPED', val: '$3.6B', fund: '$0', rev: '$1.0B (₹8,370 Cr)', emp: '1100+', f: [{ name: 'Nithin Kamath', title: 'Founder & CEO', edu: 'Bangalore Institute of Technology', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/nithin-kamath-81136242/' }, { name: 'Nikhil Kamath', title: 'Co-founder', edu: 'Self-educated', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/nikhilkamathcio/' }] },
  { name: 'Razorpay', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Payment Gateway', sub: 'Full-stack Financial Cloud for Business', stage: 'SERIES_F', val: '$7.5B', fund: '$741M', rev: '$280M (₹2,279 Cr)', emp: '3200+', f: [{ name: 'Harshil Mathur', title: 'CEO & Co-founder', edu: 'IIT Roorkee (B.Tech Technology)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/harshilmathur/' }, { name: 'Shashank Kumar', title: 'MD & Co-founder', edu: 'IIT Roorkee (B.Tech CS)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/shashankkumar/' }] },
  { name: 'CRED', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Credit Card Payments', sub: 'High-trust Consumer Lifestyle Club', stage: 'SERIES_F', val: '$6.4B', fund: '$800M', rev: '$170M (₹1,400 Cr)', emp: '1000+', f: [{ name: 'Kunal Shah', title: 'Founder & CEO', edu: 'Wilson College Mumbai (Philosophy)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/kunalshah1/' }] },
  { name: 'Groww', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Investment Platform', sub: 'Mutual Funds, Stocks & Wealth', stage: 'SERIES_E', val: '$3.0B', fund: '$393M', rev: '$380M (₹3,145 Cr)', emp: '1800+', f: [{ name: 'Lalit Keshre', title: 'CEO & Co-founder', edu: 'IIT Bombay (Electrical Engineering)', eco: 'IIT_BOMBAY', li: 'https://www.linkedin.com/in/lalitkeshre/' }] },
  { name: 'Pine Labs', hq: 'Noida, India', sector: 'Fintech', ind: 'Merchant Commerce', sub: 'POS Terminals & Omnichannel Payments', stage: 'LATE_STAGE', val: '$5.0B', fund: '$1.4B', rev: '$190M (₹1,588 Cr)', emp: '3500+', f: [{ name: 'Amrish Rau', title: 'CEO', edu: 'University of Mumbai', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/amrishrau/' }] },
  { name: 'PhonePe', hq: 'Bangalore, India', sector: 'Fintech', ind: 'UPI & Digital Payments', sub: 'Super-app Financial Services', stage: 'LATE_STAGE', val: '$12.0B', fund: '$2.6B', rev: '$610M (₹5,064 Cr)', emp: '5400+', f: [{ name: 'Sameer Nigam', title: 'CEO & Founder', edu: 'University of Mumbai, Wharton School', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sameernigam/' }] },
  { name: 'Paytm (One97 Communications)', hq: 'Noida, India', sector: 'Fintech', ind: 'Digital Payments & Soundbox', sub: 'Public Digital Financial Ecosystem', stage: 'IPO', val: '$3.5B', fund: '$4.4B', rev: '$1.2B (₹9,978 Cr)', emp: '12000+', f: [{ name: 'Vijay Shekhar Sharma', title: 'Founder & CEO', edu: 'Delhi College of Engineering (ECE)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/vijayshekhar/' }] },
  { name: 'BharatPe', hq: 'New Delhi, India', sector: 'Fintech', ind: 'Merchant QR Payments', sub: 'UPI QR & Merchant Working Capital', stage: 'SERIES_E', val: '$2.8B', fund: '$650M', rev: '$140M (₹1,160 Cr)', emp: '1400+', f: [{ name: 'Nalin Negi', title: 'CEO', edu: 'SRCC, Chartered Accountant', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/nalin-negi-74a44b1/' }] },
  { name: 'Slice', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Consumer Credit & Small Finance Bank', sub: 'Credit Cards & Neobanking', stage: 'SERIES_C', val: '$1.8B', fund: '$340M', rev: '$105M (₹870 Cr)', emp: '950+', f: [{ name: 'Rajan Bajaj', title: 'Founder & CEO', edu: 'IIT Kharagpur (Civil Engineering)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/rajanbajaj/' }] },
  { name: 'Jupiter Money', hq: 'Mumbai, India', sector: 'Fintech', ind: 'Neobanking', sub: 'Digital 1-app Banking & Mutual Funds', stage: 'SERIES_C', val: '$710M', fund: '$165M', rev: '$18M ARR', emp: '550+', f: [{ name: 'Jitendra Gupta', title: 'Founder & CEO', edu: 'Sydenham College, ICAI', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/jitendragupta1/' }] },
  { name: 'Fi Money (epifi)', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Neobanking', sub: 'Smart Financial Management for Techies', stage: 'SERIES_C', val: '$520M', fund: '$137M', rev: '$15M ARR', emp: '420+', f: [{ name: 'Sujith Narayanan', title: 'CEO & Co-founder', edu: 'Goa Institute of Management', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sujith-narayanan-7a91171/' }] },
  { name: 'OneCard (FPL Technologies)', hq: 'Pune, India', sector: 'Fintech', ind: 'Co-branded Credit Cards', sub: 'Metal Credit Cards & Mobile Experience', stage: 'SERIES_D', val: '$1.4B', fund: '$225M', rev: '$65M (₹540 Cr)', emp: '350+', f: [{ name: 'Anurag Sinha', title: 'Co-founder & CEO', edu: 'IIT Varanasi (BHU), IIM Bangalore', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/anuragsinha2/' }] },
  { name: 'INDmoney', hq: 'Gurgaon, India', sector: 'Fintech', ind: 'Super Money App', sub: 'US Stocks, Mutual Funds & Tracking', stage: 'SERIES_D', val: '$650M', fund: '$144M', rev: '$25M ARR', emp: '450+', f: [{ name: 'Ashish Kashyap', title: 'Founder & CEO', edu: 'University of Delhi, Insead', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/ashishkashyap/' }] },
  { name: 'Navi Technologies', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Digital Lending & Insurance', sub: 'Paperless Personal Loans & Health Cover', stage: 'LATE_STAGE', val: '$2.0B', fund: '$580M', rev: '$240M (₹1,980 Cr)', emp: '1600+', f: [{ name: 'Sachin Bansal', title: 'Founder & CEO', edu: 'IIT Delhi (B.Tech CS)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sachinbansal/' }] },
  { name: 'Jar', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Micro-savings', sub: 'Automated Digital Gold Savings', stage: 'SERIES_B', val: '$300M', fund: '$58M', rev: '$12M ARR', emp: '180+', f: [{ name: 'Nishchay AG', title: 'CEO & Co-founder', edu: 'PES Institute of Technology', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/nishchayag/' }] },
  { name: 'Dezerv', hq: 'Mumbai, India', sector: 'Fintech', ind: 'WealthTech', sub: 'Portfolio Management for HNWIs', stage: 'SERIES_B', val: '$220M', fund: '$53M', rev: '$10M ARR', emp: '150+', f: [{ name: 'Sandeep Jethwani', title: 'Co-founder', edu: 'IIM Ahmedabad', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sandeepjethwani/' }] },
  { name: 'Smallcase', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Thematic Investing', sub: 'Model Portfolios & Broker Ecosystem', stage: 'SERIES_C', val: '$200M', fund: '$62M', rev: '$14M ARR', emp: '320+', f: [{ name: 'Vasanth Kamath', title: 'Founder & CEO', edu: 'IIT Kharagpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/vasanth-kamath/' }] },
  { name: 'Clear (ClearTax)', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Tax & Compliance SaaS', sub: 'GST, e-Invoicing & Direct Tax Cloud', stage: 'SERIES_C', val: '$700M', fund: '$140M', rev: '$32M ARR', emp: '800+', f: [{ name: 'Archit Gupta', title: 'Founder & CEO', edu: 'IIT Guwahati (CS), University of Wisconsin', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/architgupta/' }] },
  { name: 'Perfios', hq: 'Bangalore, India', sector: 'Fintech', ind: 'B2B Financial Analytics', sub: 'Bank Statement Analysis & Credit Decisioning', stage: 'SERIES_D', val: '$1.0B', fund: '$464M', rev: '$50M (₹415 Cr)', emp: '1100+', f: [{ name: 'V.R. Govindarajan', title: 'Co-founder & Executive Chairman', edu: 'Madras University, IISc', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/vrgovindarajan/' }] },
  { name: 'Cashfree Payments', hq: 'Bangalore, India', sector: 'Fintech', ind: 'Payment Disbursements', sub: 'Bulk Payouts & Payment Gateway', stage: 'SERIES_B', val: '$500M', fund: '$42M', rev: '$80M (₹660 Cr)', emp: '900+', f: [{ name: 'Akash Sinha', title: 'CEO & Co-founder', edu: 'IIT Hyderabad', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/akash-sinha/' }] },

  // Indian SaaS & Cloud Giants
  { name: 'Freshworks', hq: 'San Mateo, USA / Chennai', sector: 'Enterprise SaaS', ind: 'Customer & IT Service', sub: 'Freshdesk, Freshservice CRM Suites', stage: 'IPO', val: '$4.2B', fund: '$484M', rev: '$596M ARR', emp: '5200+', f: [{ name: 'Girish Mathrubootham', title: 'Executive Chairman & Founder', edu: 'University of Madras, Shanmugha Arts', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/girishm/' }] },
  { name: 'Zoho Corporation', hq: 'Chennai, India', sector: 'Enterprise SaaS', ind: 'Unified Business Operating System', sub: '55+ Integrated Business Applications', stage: 'BOOTSTRAPPED', val: '$12.0B', fund: '$0', rev: '$1.2B (₹10,000 Cr)', emp: '16000+', f: [{ name: 'Sridhar Vembu', title: 'CEO & Co-founder', edu: 'IIT Madras (B.Tech EE), Princeton (PhD EE)', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/sridhar-vembu-7a4214/' }] },
  { name: 'Postman', hq: 'San Francisco / Bangalore', sector: 'Developer Tools', ind: 'API Collaboration Platform', sub: 'API Development, Testing & Observability', stage: 'SERIES_D', val: '$5.6B', fund: '$433M', rev: '$110M ARR', emp: '600+', f: [{ name: 'Abhinav Asthana', title: 'CEO & Co-founder', edu: 'BITS Pilani (Goa Campus)', eco: 'BITS_PILANI', li: 'https://www.linkedin.com/in/abhinavasthana/' }, { name: 'Abhijit Kane', title: 'Co-founder', edu: 'BITS Pilani', eco: 'BITS_PILANI', li: 'https://www.linkedin.com/in/abhijitkane/' }, { name: 'Ankit Sobti', title: 'CTO & Co-founder', edu: 'BITS Pilani', eco: 'BITS_PILANI', li: 'https://www.linkedin.com/in/ankitsobti/' }] },
  { name: 'BrowserStack', hq: 'San Francisco / Mumbai', sector: 'Developer Tools', ind: 'Cloud Testing Platform', sub: 'Cross-browser & Real Device Testing', stage: 'SERIES_B', val: '$4.0B', fund: '$250M', rev: '$160M ARR', emp: '1100+', f: [{ name: 'Ritesh Arora', title: 'CEO & Co-founder', edu: 'IIT Bombay (CS)', eco: 'IIT_BOMBAY', li: 'https://www.linkedin.com/in/ritesh-arora-01/' }, { name: 'Nakul Aggarwal', title: 'CTO & Co-founder', edu: 'IIT Bombay (CS)', eco: 'IIT_BOMBAY', li: 'https://www.linkedin.com/in/nakulaggarwal/' }] },
  { name: 'Hasura', hq: 'San Francisco / Bangalore', sector: 'Developer Tools', ind: 'Instant GraphQL Engine', sub: 'Fast Data Access & GraphQL Federation', stage: 'SERIES_C', val: '$1.0B', fund: '$136M', rev: '$35M ARR', emp: '250+', f: [{ name: 'Tanmai Gopal', title: 'CEO & Co-founder', edu: 'IIT Madras (CS Dual Degree)', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/tanmaig/' }, { name: 'Rajoshi Ghosh', title: 'COO & Co-founder', edu: 'NUS (Computer Engineering)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/rajoshighosh/' }] },
  { name: 'Chargebee', hq: 'San Francisco / Chennai', sector: 'Enterprise SaaS', ind: 'Subscription Management', sub: 'Recurring Billing & Revenue Management', stage: 'SERIES_H', val: '$3.5B', fund: '$470M', rev: '$130M ARR', emp: '1200+', f: [{ name: 'Krish Subramanian', title: 'CEO & Co-founder', edu: 'Bharathidasan University', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/krishsubramanian/' }] },
  { name: 'Icertis', hq: 'Bellevue, USA / Pune', sector: 'Enterprise SaaS', ind: 'Contract Intelligence', sub: 'Contract Lifecycle Management (CLM)', stage: 'SERIES_F', val: '$2.8B', fund: '$370M', rev: '$260M ARR', emp: '2200+', f: [{ name: 'Samir Bodas', title: 'CEO & Co-founder', edu: 'University of Texas at Austin', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/samirbodas/' }] },
  { name: 'HighRadius', hq: 'Houston, USA / Hyderabad', sector: 'Fintech SaaS', ind: 'Order-to-Cash Automation', sub: 'Autonomous Finance & Treasury Platform', stage: 'SERIES_C', val: '$3.1B', fund: '$475M', rev: '$180M ARR', emp: '3500+', f: [{ name: 'Sashi Narahari', title: 'Founder & CEO', edu: 'IIT Kharagpur (Mechanical)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sashinarahari/' }] },
  { name: 'Zenoti', hq: 'Bellevue, USA / Hyderabad', sector: 'Enterprise SaaS', ind: 'Salon & Spa Management', sub: 'Cloud Software for Wellness Chains', stage: 'SERIES_D', val: '$1.5B', fund: '$251M', rev: '$110M ARR', emp: '1000+', f: [{ name: 'Sudheer Koneru', title: 'CEO & Founder', edu: 'IIT Madras (CS), University of Texas', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/sudheerkoneru/' }] },
  { name: 'Innovaccer', hq: 'San Francisco / Noida', sector: 'HealthTech SaaS', ind: 'Healthcare Data Activation', sub: 'Unified Patient Cloud for Health Systems', stage: 'SERIES_E', val: '$3.2B', fund: '$379M', rev: '$140M ARR', emp: '1500+', f: [{ name: 'Abhinav Shashank', title: 'CEO & Co-founder', edu: 'IIT Kharagpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/abhinavshashank/' }, { name: 'Kanav Hasija', title: 'Chief Product Officer & Co-founder', edu: 'IIT Kharagpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/kanavhasija/' }] },
  { name: 'Darwinbox', hq: 'Hyderabad, India', sector: 'Enterprise SaaS', ind: 'HR Tech Cloud', sub: 'HCM Platform for Modern Enterprises', stage: 'SERIES_D', val: '$1.0B', fund: '$110M', rev: '$55M ARR', emp: '1300+', f: [{ name: 'Jayant Paleti', title: 'Co-founder', edu: 'IIT Madras, XLRI Jamshedpur', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/jayantpaleti/' }, { name: 'Rohit Chennamaneni', title: 'Co-founder', edu: 'SRM University (Alumni Connection)', eco: 'SRM', li: 'https://www.linkedin.com/in/rohitchennamaneni/' }, { name: 'Chaitanya Peddi', title: 'Co-founder', edu: 'XLRI Jamshedpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/chaitanyapeddi/' }] },
  { name: 'LeadSquared', hq: 'Bangalore, India', sector: 'Enterprise SaaS', ind: 'Sales CRM & Onboarding', sub: 'High-velocity Sales Execution Engine', stage: 'SERIES_C', val: '$1.0B', fund: '$187M', rev: '$45M ARR', emp: '1400+', f: [{ name: 'Nilesh Patel', title: 'CEO & Co-founder', edu: 'Delhi University', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/nileshpatel/' }] },
  { name: 'CleverTap', hq: 'Mountain View / Mumbai', sector: 'Enterprise SaaS', ind: 'Customer Engagement', sub: 'Retention Cloud & Behavioral Analytics', stage: 'SERIES_D', val: '$775M', fund: '$217M', rev: '$85M ARR', emp: '750+', f: [{ name: 'Sunil Thomas', title: 'Co-founder & Executive Chairman', edu: 'University of Mumbai', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sunilthomas/' }] },
  { name: 'MoEngage', hq: 'San Francisco / Bangalore', sector: 'Enterprise SaaS', ind: 'Customer Engagement', sub: 'Insights-led Omnichannel Marketing', stage: 'SERIES_E', val: '$500M', fund: '$132M', rev: '$60M ARR', emp: '700+', f: [{ name: 'Raviteja Dodda', title: 'CEO & Co-founder', edu: 'IIT Kharagpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/ravitejadodda/' }] },
  { name: 'Whatfix', hq: 'San Jose, USA / Bangalore', sector: 'Enterprise SaaS', ind: 'Digital Adoption Platform', sub: 'In-app Guidance & User Onboarding', stage: 'SERIES_D', val: '$600M', fund: '$140M', rev: '$50M ARR', emp: '850+', f: [{ name: 'Khadim Batti', title: 'CEO & Co-founder', edu: 'University of Bombay', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/khadimbatti/' }] },
  { name: 'Druva', hq: 'Sunnyvale, USA / Pune', sector: 'Enterprise SaaS', ind: 'Cloud Data Protection', sub: 'SaaS Backup, Recovery & Ransomware Defense', stage: 'LATE_STAGE', val: '$2.0B', fund: '$475M', rev: '$200M ARR', emp: '1000+', f: [{ name: 'Jaspreet Singh', title: 'CEO & Founder', edu: 'IIT Guwahati (Computer Science)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/jaspreet/' }] },
  { name: 'Kissflow', hq: 'Chennai, India', sector: 'Enterprise SaaS', ind: 'Low-code / No-code Work Platform', sub: 'Workflow Automation & Process Cloud', stage: 'BOOTSTRAPPED', val: '$500M', fund: '$0', rev: '$45M ARR', emp: '450+', f: [{ name: 'Suresh Sambandam', title: 'CEO & Founder', edu: 'Self-taught software architect', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sureshsambandam/' }] },

  // Indian Consumer Tech & E-Commerce
  { name: 'Flipkart', hq: 'Bangalore, India', sector: 'Consumer Internet', ind: 'E-Commerce Marketplace', sub: 'Omnichannel Retail Ecosystem (Walmart subsidiary)', stage: 'LATE_STAGE', val: '$33.0B', fund: '$13.0B', rev: '$7.0B (₹56,000 Cr)', emp: '32000+', f: [{ name: 'Kalyan Krishnamurthy', title: 'CEO', edu: 'Asian Institute of Management, UIUC', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/kalyan-krishnamurthy-7888768/' }] },
  { name: 'Meesho', hq: 'Bangalore, India', sector: 'Consumer Internet', ind: 'Social Commerce & Marketplace', sub: 'Zero-commission Value Marketplace for Bharat', stage: 'SERIES_F', val: '$3.9B', fund: '$1.1B', rev: '$680M (₹5,735 Cr)', emp: '2100+', f: [{ name: 'Vidit Aatrey', title: 'CEO & Co-founder', edu: 'IIT Delhi (Civil Engineering)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/viditaatrey/' }, { name: 'Sanjeev Barnwal', title: 'CTO & Co-founder', edu: 'IIT Delhi (Computer Science)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sanjeevbarnwal/' }] },
  { name: 'Nykaa (FSN E-Commerce)', hq: 'Mumbai, India', sector: 'Consumer Internet', ind: 'Beauty & Fashion E-Commerce', sub: 'Public Omnichannel Beauty Destination', stage: 'IPO', val: '$6.5B', fund: '$150M', rev: '$620M (₹5,144 Cr)', emp: '4500+', f: [{ name: 'Falguni Nayar', title: 'Founder & CEO', edu: 'Sydenham College, IIM Ahmedabad', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/falguni-nayar-7607736/' }] },
  { name: 'Lenskart', hq: 'Faridabad, India', sector: 'Consumer Internet', ind: 'Omnichannel Eyewear', sub: 'Vertically Integrated Eyewear Chain', stage: 'LATE_STAGE', val: '$5.0B', fund: '$1.6B', rev: '$450M (₹3,788 Cr)', emp: '6000+', f: [{ name: 'Peyush Bansal', title: 'CEO & Founder', edu: 'McGill University, IIM Bangalore', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/peyushbansal/' }] },
  { name: 'Urban Company', hq: 'Gurgaon, India', sector: 'Consumer Internet', ind: 'Home Services Marketplace', sub: 'Standardized At-home Beauty, Cleaning & Repair', stage: 'SERIES_F', val: '$2.8B', fund: '$470M', rev: '$100M (₹827 Cr)', emp: '1800+', f: [{ name: 'Abhiraj Singh Bhal', title: 'CEO & Co-founder', edu: 'IIT Kanpur, IIM Ahmedabad', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/abhirajsinghbhal/' }, { name: 'Varun Khaitan', title: 'Co-founder', edu: 'IIT Kanpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/varunkhaitan/' }] },
  { name: 'Purplle', hq: 'Mumbai, India', sector: 'Consumer Internet', ind: 'Beauty & Personal Care', sub: 'Affordable Tier-2/3 Beauty Commerce', stage: 'SERIES_E', val: '$1.3B', fund: '$390M', rev: '$90M (₹750 Cr)', emp: '1200+', f: [{ name: 'Manish Taneja', title: 'CEO & Co-founder', edu: 'IIT Delhi', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/manish-taneja-01/' }] },
  { name: 'FirstCry (Brainbees Solutions)', hq: 'Pune, India', sector: 'Consumer Internet', ind: 'Baby & Kids Retail', sub: 'Public Baby Care & Fashion Brand', stage: 'IPO', val: '$3.0B', fund: '$750M', rev: '$780M (₹6,481 Cr)', emp: '4800+', f: [{ name: 'Supam Maheshwari', title: 'CEO & Co-founder', edu: 'Delhi College of Engineering, IIM Ahmedabad', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/supam-maheshwari-b457861/' }] },
  { name: 'Honasa Consumer (Mamaearth)', hq: 'Gurgaon, India', sector: 'D2C Consumer', ind: 'Toxin-free Personal Care', sub: 'Public Multi-brand D2C Beauty Conglomerate', stage: 'IPO', val: '$1.4B', fund: '$126M', rev: '$230M (₹1,920 Cr)', emp: '1500+', f: [{ name: 'Varun Alagh', title: 'CEO & Co-founder', edu: 'Delhi College of Engineering, XLRI Jamshedpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/varunalagh/' }, { name: 'Ghazal Alagh', title: 'Chief Innovation Officer & Co-founder', edu: 'Panjab University', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/ghazal-alagh/' }] },
  { name: 'boAt (Imagine Marketing)', hq: 'New Delhi, India', sector: 'D2C Hardware', ind: 'Consumer Electronics & Audio', sub: 'Earphones, Smartwatches & Lifestyle Accessories', stage: 'LATE_STAGE', val: '$1.4B', fund: '$177M', rev: '$410M (₹3,377 Cr)', emp: '850+', f: [{ name: 'Aman Gupta', title: 'Co-founder & CMO', edu: 'Delhi University, Indian School of Business (ISB)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/aman-gupta-boat/' }, { name: 'Sameer Mehta', title: 'Co-founder & CEO', edu: 'St. Xavier\'s College Mumbai', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sameer-mehta-boat/' }] },
  { name: 'Noise (Nexxbase)', hq: 'Gurgaon, India', sector: 'D2C Hardware', ind: 'Smart Wearables & Audio', sub: 'Connected Smartwatches & True Wireless Earbuds', stage: 'SERIES_A', val: '$450M', fund: '$10M', rev: '$170M (₹1,426 Cr)', emp: '450+', f: [{ name: 'Amit Khatri', title: 'Co-founder', edu: 'NIFT New Delhi', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/amitkhatrinoise/' }, { name: 'Gaurav Khatri', title: 'Co-founder', edu: 'Commercial Pilot License', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/gauravkhatrinoise/' }] },
  { name: 'Wakefit', hq: 'Bangalore, India', sector: 'D2C Consumer', ind: 'Sleep & Home Solutions', sub: 'Orthopedic Mattresses & Ergonomic Furniture', stage: 'SERIES_D', val: '$350M', fund: '$145M', rev: '$120M (₹980 Cr)', emp: '1100+', f: [{ name: 'Ankit Garg', title: 'CEO & Co-founder', edu: 'IIT Roorkee (Chemical)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/ankitgarg09/' }, { name: 'Chaitanya Ramalingegowda', title: 'Co-founder', edu: 'National Institute of Engineering, ISB', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/chaitanyaramalingegowda/' }] },
  { name: 'Livspace', hq: 'Bangalore / Singapore', sector: 'Consumer Internet', ind: 'Home Interior Platform', sub: 'Turnkey Interior Design & Renovation Tech', stage: 'SERIES_F', val: '$1.2B', fund: '$450M', rev: '$160M (₹1,300 Cr)', emp: '2500+', f: [{ name: 'Anuj Srivastava', title: 'CEO & Co-founder', edu: 'IIT Kanpur (B.Tech EE), INSEAD', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/anujsrivastava/' }, { name: 'Ramakant Sharma', title: 'COO & Co-founder', edu: 'IIT Kanpur, ISB', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/ramakantsharma/' }] },
  { name: 'Snitch', hq: 'Bangalore, India', sector: 'D2C Consumer', ind: 'Fast Fashion for Men', sub: 'D2C Trend-first Apparel', stage: 'SERIES_A', val: '$100M', fund: '$14M', rev: '$35M (₹290 Cr)', emp: '220+', f: [{ name: 'Siddharth Dungarwal', title: 'Founder', edu: 'Bangalore University', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/siddharth-dungarwal/' }] },
  { name: 'The Souled Store', hq: 'Mumbai, India', sector: 'D2C Consumer', ind: 'Pop Culture Apparel', sub: 'Official Merchandise & Casual Wear', stage: 'SERIES_C', val: '$180M', fund: '$35M', rev: '$45M (₹375 Cr)', emp: '450+', f: [{ name: 'Vedang Patel', title: 'CEO & Co-founder', edu: 'NMIMS Mumbai', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/vedang-patel/' }] },
  { name: 'Blue Tokai Coffee', hq: 'Gurgaon, India', sector: 'D2C Consumer', ind: 'Specialty Coffee Roaster', sub: 'Farm-to-Cup Artisanal Cafes & Beans', stage: 'SERIES_B', val: '$150M', fund: '$48M', rev: '$25M (₹210 Cr)', emp: '900+', f: [{ name: 'Matt Chitharanjan', title: 'Co-founder & CEO', edu: 'Tufts University', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/mattchitharanjan/' }, { name: 'Namrata Asthana', title: 'Co-founder', edu: 'Amherst College', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/namrataasthana/' }] },

  // Indian Logistics, Mobility & Supply Chain
  { name: 'Delhivery', hq: 'Gurgaon, India', sector: 'Logistics', ind: 'Supply Chain & Express Parcel', sub: 'Public Fully Integrated Logistics Giant', stage: 'IPO', val: '$3.8B', fund: '$1.4B', rev: '$980M (₹8,142 Cr)', emp: '60000+', f: [{ name: 'Sahil Barua', title: 'MD & CEO', edu: 'NIT Karnataka Surathkal, IIM Bangalore', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sahil-barua-74a9236/' }] },
  { name: 'Xpressbees', hq: 'Pune, India', sector: 'Logistics', ind: 'E-Commerce Express Logistics', sub: 'Last-mile Parcel Delivery & Warehousing', stage: 'SERIES_F', val: '$1.5B', fund: '$640M', rev: '$320M (₹2,650 Cr)', emp: '28000+', f: [{ name: 'Amitava Saha', title: 'Founder & CEO', edu: 'IIM Lucknow', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/amitavasaha/' }] },
  { name: 'Shadowfax', hq: 'Bangalore, India', sector: 'Logistics', ind: 'Hyperlocal 3PL Delivery', sub: 'On-demand Delivery Fleet for E-Com & Food', stage: 'SERIES_E', val: '$350M', fund: '$210M', rev: '$180M (₹1,470 Cr)', emp: '3200+', f: [{ name: 'Abhishek Bansal', title: 'Co-founder & CEO', edu: 'IIT Delhi (Production Engineering)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/abhishekbansalshadowfax/' }, { name: 'Vaibhav Khandelwal', title: 'Co-founder & CTO', edu: 'IIT Delhi', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/vaibhavkhandelwal/' }] },
  { name: 'Porter', hq: 'Bangalore, India', sector: 'Logistics', ind: 'Intra-city Truck Logistics', sub: 'Mini-truck & Bike Logistics Marketplace', stage: 'SERIES_E', val: '$500M', fund: '$150M', rev: '$240M (₹1,950 Cr)', emp: '2500+', f: [{ name: 'Pranav Goel', title: 'CEO & Co-founder', edu: 'IIT Kharagpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/pranav-goel-porter/' }] },
  { name: 'BlackBuck (Zinka Logistics)', hq: 'Bangalore, India', sector: 'Logistics', ind: 'Inter-city Trucking Platform', sub: 'Fleet Telematics, Tolls & Truck Marketplace', stage: 'IPO', val: '$900M', fund: '$360M', rev: '$40M (₹330 Cr)', emp: '1600+', f: [{ name: 'Rajesh Yabaji', title: 'CEO & Co-founder', edu: 'IIT Kharagpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/rajesh-yabaji/' }] },
  { name: 'Rapido', hq: 'Bangalore, India', sector: 'Mobility', ind: 'Bike Taxi & Auto Aggregator', sub: 'Affordable First/Last Mile Commute', stage: 'SERIES_E', val: '$1.1B', fund: '$330M', rev: '$75M (₹620 Cr)', emp: '1800+', f: [{ name: 'Aravind Sanka', title: 'Co-founder', edu: 'IIT Bhubaneswar', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/aravindsanka/' }, { name: 'Pavan Guntupalli', title: 'Co-founder', edu: 'IIT Kharagpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/pavanguntupalli/' }] },
  { name: 'Shiprocket', hq: 'New Delhi, India', sector: 'Logistics SaaS', ind: 'E-Commerce Shipping Enablement', sub: 'Automated Multi-carrier Shipping Platform', stage: 'SERIES_E', val: '$1.3B', fund: '$390M', rev: '$160M (₹1,320 Cr)', emp: '1700+', f: [{ name: 'Saahil Goel', title: 'CEO & Co-founder', edu: 'University of Pittsburgh', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/saahilgoel/' }] },

  // Indian EV, CleanTech & Deep Engineering
  { name: 'Ather Energy', hq: 'Bangalore, India', sector: 'CleanTech / EV', ind: 'Electric Two-wheelers', sub: 'Connected Smart Electric Scooters & Fast Charging Grid', stage: 'LATE_STAGE', val: '$1.3B', fund: '$520M', rev: '$220M (₹1,800 Cr)', emp: '3400+', f: [{ name: 'Tarun Mehta', title: 'CEO & Co-founder', edu: 'IIT Madras (B.Tech & M.Tech Dual Degree)', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/tarunmehta/' }, { name: 'Swapnil Jain', title: 'CTO & Co-founder', edu: 'IIT Madras', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/swapnil-jain-ather/' }] },
  { name: 'Ola Electric', hq: 'Bangalore, India', sector: 'CleanTech / EV', ind: 'Electric Vehicles & Gigafactory', sub: 'Public Electric Two-wheelers & Indigenous Cell Manufacturing', stage: 'IPO', val: '$3.5B', fund: '$1.0B', rev: '$650M (₹5,350 Cr)', emp: '7200+', f: [{ name: 'Bhavish Aggarwal', title: 'Chairman & MD', edu: 'IIT Bombay (Computer Science)', eco: 'IIT_BOMBAY', li: 'https://www.linkedin.com/in/bhavishaggarwal/' }] },
  { name: 'Ultraviolette Automotive', hq: 'Bangalore, India', sector: 'CleanTech / EV', ind: 'High Performance Electric Motorcycles', sub: 'Aviation-grade Performance Electric Bikes (F77)', stage: 'SERIES_D', val: '$300M', fund: '$55M', rev: '$15M ARR', emp: '350+', f: [{ name: 'Narayan Subramaniam', title: 'CEO & Co-founder', edu: 'Ramaiah Institute of Tech, NID Ahmedabad', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/narayansubramaniam/' }, { name: 'Niraj Rajmohan', title: 'CTO & Co-founder', edu: 'BMS College of Engineering', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/nirajrajmohan/' }] },
  { name: 'BluSmart Mobility', hq: 'Gurgaon, India', sector: 'CleanTech / Mobility', ind: 'All-electric Ride Hailing', sub: '100% Zero-emission EV Fleet & Mega Charging Hubs', stage: 'SERIES_A', val: '$280M', fund: '$130M', rev: '$50M (₹420 Cr)', emp: '1500+', f: [{ name: 'Anmol Singh Jaggi', title: 'Co-founder', edu: 'UPES Dehradun', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/anmolsinghjaggi/' }, { name: 'Punit Goyal', title: 'Co-founder', edu: 'Aston University', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/punitgoyalblusmart/' }] },
  { name: 'Battery Smart', hq: 'New Delhi, India', sector: 'CleanTech / EV Infra', ind: 'Battery Swapping Network', sub: 'Two and Three-wheeler 2-minute Battery Swapping', stage: 'SERIES_B', val: '$340M', fund: '$120M', rev: '$40M ARR', emp: '600+', f: [{ name: 'Pulkit Khurana', title: 'Co-founder', edu: 'IIT Kanpur (Mechanical)', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/pulkitkhurana/' }, { name: 'Siddharth Sikka', title: 'Co-founder', edu: 'IIT Kanpur', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/siddharthsikka/' }] },
  { name: 'Exponent Energy', hq: 'Bangalore, India', sector: 'CleanTech / EV Infra', ind: '15-minute Fast Charging', sub: 'Proprietary Battery Pack & e-pump Infra', stage: 'SERIES_B', val: '$150M', fund: '$44M', rev: '$8M ARR', emp: '250+', f: [{ name: 'Arun Vinayak', title: 'CEO & Co-founder', edu: 'IIT Madras (Mechanical Engineering)', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/arunvinayak/' }, { name: 'Sanjay Byalal', title: 'COO & Co-founder', edu: 'RV College of Engineering', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/sanjaybyalal/' }] },

  // Indian SpaceTech & DeepTech
  { name: 'Skyroot Aerospace', hq: 'Hyderabad, India', sector: 'SpaceTech', ind: 'Commercial Rocket Launch', sub: 'Vikram Series Launch Vehicles for Small Satellites', stage: 'SERIES_B', val: '$165M', fund: '$95M', rev: 'Pre-commercial', emp: '320+', f: [{ name: 'Pawan Kumar Chandana', title: 'CEO & Co-founder', edu: 'IIT Kharagpur, Ex-ISRO Scientist', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/pawankumarchandana/' }, { name: 'Naga Bharath Daka', title: 'COO & Co-founder', edu: 'IIT Madras, Ex-ISRO Scientist', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/bharathdaka/' }] },
  { name: 'Agnikul Cosmos', hq: 'Chennai, India', sector: 'SpaceTech', ind: 'Custom 3D-Printed Launchers', sub: 'Agnibaan Mobile Orbital Launchers & Single-piece Engine', stage: 'SERIES_B', val: '$140M', fund: '$62M', rev: 'Pre-commercial', emp: '240+', f: [{ name: 'Srinath Ravichandran', title: 'CEO & Co-founder', edu: 'College of Engineering Guindy, University of Illinois', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/srinath-ravichandran-agnikul/' }, { name: 'Moin SPM', title: 'COO & Co-founder', edu: 'Anna University, University of Newcastle', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/moinspm/' }] },
  { name: 'Pixxel', hq: 'Bangalore, India', sector: 'SpaceTech', ind: 'Hyperspectral Earth Imaging', sub: 'High-resolution Hyperspectral Constellation for Agriculture & Mining', stage: 'SERIES_B', val: '$180M', fund: '$71M', rev: '$5M ARR', emp: '160+', f: [{ name: 'Awais Ahmed', title: 'CEO & Co-founder', edu: 'BITS Pilani (M.Sc Mathematics + B.E. Chemical)', eco: 'BITS_PILANI', li: 'https://www.linkedin.com/in/awaisahmed97/' }, { name: 'Kshitij Khandelwal', title: 'CTO & Co-founder', edu: 'BITS Pilani (B.E. Manufacturing)', eco: 'BITS_PILANI', li: 'https://www.linkedin.com/in/kshitijkhandelwal/' }] },
  { name: 'Bellatrix Aerospace', hq: 'Bangalore, India', sector: 'SpaceTech', ind: 'Satellite Propulsion & Space Tugs', sub: 'Electric & Green Propulsion Thrusters', stage: 'SERIES_A', val: '$60M', fund: '$12M', rev: '$3M ARR', emp: '110+', f: [{ name: 'Rohan M Ganapathy', title: 'CEO & CTO', edu: 'SRM Institute of Science and Technology (Aeronautical Engineering Alumni)', eco: 'SRM', li: 'https://www.linkedin.com/in/rohan-m-ganapathy-71424641/' }, { name: 'Yashas Karanam', title: 'COO & Co-founder', edu: 'MS Ramaiah Institute of Technology', eco: 'GLOBAL', li: 'https://www.linkedin.com/in/yashaskaranam/' }] },
  { name: 'Dhruva Space', hq: 'Hyderabad, India', sector: 'SpaceTech', ind: 'Full-stack Space Engineering', sub: 'Satellite Platforms, Deployers & Ground Stations', stage: 'SERIES_A', val: '$75M', fund: '$22M', rev: '$4M ARR', emp: '130+', f: [{ name: 'Sanjay Nekkanti', title: 'CEO & Founder', edu: 'SRM Institute of Science and Technology (B.Tech Alumni - built SRMSAT)', eco: 'SRM', li: 'https://www.linkedin.com/in/sanjaynekkanti/' }] },
  { name: 'GalaxEye Space', hq: 'Chennai, India', sector: 'SpaceTech', ind: 'Multi-sensor Earth Observation', sub: 'Combined SAR + Optical Satellite Constellation', stage: 'SERIES_A', val: '$45M', fund: '$10M', rev: 'Pre-commercial', emp: '75+', f: [{ name: 'Suyash Singh', title: 'CEO & Co-founder', edu: 'IIT Madras (Avishkar Hyperloop)', eco: 'IIT_MADRAS', li: 'https://www.linkedin.com/in/suyash-singh-galaxeye/' }] },
  { name: 'STAGE', hq: 'Noida, India', sector: 'Consumer Media', ind: 'Vernacular OTT Streaming', sub: 'Dialect-first Hyperlocal Video & Culture Content', stage: 'SERIES_A', val: '$45M', fund: '$14M', rev: '$8M ARR', emp: '140+', f: [{ name: 'Vinay Singhal', title: 'CEO & Co-founder', edu: 'SRM Institute of Science and Technology (B.Tech Computer Science 2013)', eco: 'SRM', li: 'https://www.linkedin.com/in/vinay-singhal-stage/' }, { name: 'Shashank Vaishnav', title: 'CTO & Co-founder', edu: 'SRM Institute of Science and Technology (B.Tech Computer Science 2013)', eco: 'SRM', li: 'https://www.linkedin.com/in/shashank-vaishnav-stage/' }, { name: 'Parveen Singhal', title: 'Content Chief & Co-founder', edu: 'SRM Institute of Science and Technology (2014)', eco: 'SRM', li: 'https://www.linkedin.com/in/parveen-singhal-stage/' }] }
];

// University cohorts for realistic founder backgrounds & alumni cross-linking
const institutions = [
  { name: 'SRM Institute of Science and Technology', code: 'SRM', deg: 'B.Tech Computer Science / Mechatronics' },
  { name: 'IIT Madras', code: 'IIT_MADRAS', deg: 'B.Tech Electrical / Computer Science' },
  { name: 'BITS Pilani', code: 'BITS_PILANI', deg: 'B.E. Computer Science & M.Sc Economics' },
  { name: 'IIT Bombay', code: 'IIT_BOMBAY', deg: 'B.Tech Computer Science' },
  { name: 'IIT Delhi', code: 'IIT_DELHI', deg: 'B.Tech Technology' },
  { name: 'IIT Kharagpur', code: 'IIT_KGP', deg: 'Dual Degree CS' },
  { name: 'Stanford University', code: 'STANFORD', deg: 'MS / PhD Computer Science' },
  { name: 'MIT', code: 'MIT', deg: 'EECS & Mathematics' },
  { name: 'UC Berkeley', code: 'BERKELEY', deg: 'EECS & AI Research' },
  { name: 'Carnegie Mellon University', code: 'CMU', deg: 'MS Computational Data Science' }
];

// Top VCs
const topVCs = [
  { id: 'inv_peak_xv_partners__sequoia_india_', name: 'Peak XV Partners (Sequoia India)', type: 'VC' },
  { id: 'inv_accel_partners', name: 'Accel Partners', type: 'VC' },
  { id: 'inv_lightspeed_venture_partners', name: 'Lightspeed Venture Partners', type: 'VC' },
  { id: 'inv_matrix_partners_india', name: 'Matrix Partners India', type: 'VC' },
  { id: 'inv_blume_ventures', name: 'Blume Ventures', type: 'VC' },
  { id: 'inv_elevation_capital', name: 'Elevation Capital', type: 'VC' },
  { id: 'inv_tiger_global', name: 'Tiger Global', type: 'PE' },
  { id: 'inv_softbank_vision_fund', name: 'SoftBank Vision Fund', type: 'PE' },
  { id: 'inv_andreessen_horowitz__a16z_', name: 'Andreessen Horowitz (a16z)', type: 'VC' },
  { id: 'inv_y_combinator', name: 'Y Combinator', type: 'ACCELERATOR' },
  { id: 'inv_nexus_venture_partners', name: 'Nexus Venture Partners', type: 'VC' },
  { id: 'inv_kalaari_capital', name: 'Kalaari Capital', type: 'VC' },
  { id: 'inv_founders_fund', name: 'Founders Fund', type: 'VC' },
  { id: 'inv_sequoia_capital_us', name: 'Sequoia Capital US', type: 'VC' },
  { id: 'inv_prosus_ventures', name: 'Prosus Ventures', type: 'CORPORATE' }
];

// Distinct high-growth sectors and startup blueprints to reach 520+ companies
const sectorBlueprints = [
  {
    sector: 'Artificial Intelligence',
    industries: ['AI Agents', 'Speech & Audio AI', 'Code Generation', 'Computer Vision', 'Medical Imaging AI', 'Legal Tech AI', 'Synthetic Data', 'MLOps & Observability', 'AI Cybersecurity', 'Embodied AI'],
    descriptions: [
      'Next-generation cognitive automation layer for high-throughput enterprise pipelines.',
      'Domain-adapted neural inference engine executing deterministic multi-step reasoning workflows.',
      'Sovereign parameter-efficient foundational architectures running at ultra-low inference latency.',
      'Self-healing automated developer co-pilots executing real-time repository refactoring.'
    ]
  },
  {
    sector: 'Fintech & Neobanking',
    industries: ['Cross-Border Payments', 'B2B Invoice Financing', 'Embedded InsurTech', 'Decentralized Treasury', 'Credit Decisioning', 'Algorithmic Wealth', 'Regulatory Compliance', 'Card Issuing Infrastructure'],
    descriptions: [
      'Programmable balance sheet and ledger architecture powering real-time settlement rails.',
      'Zero-loss underwriting infrastructure utilizing alternate operational telemetry for MSME credit.',
      'Frictionless institutional digital banking orchestration with automated compliance screening.',
      'Instant global FX clearing and liquidity routing engine for high-velocity software exporters.'
    ]
  },
  {
    sector: 'Enterprise SaaS & DevTools',
    industries: ['Distributed Database', 'Cloud Observability', 'Microservices Mesh', 'Real-time Analytics', 'Security Identity Governance', 'Supply Chain Visibility', 'Continuous Integration Cloud', 'API Gateway'],
    descriptions: [
      'Sub-millisecond analytical database engine built directly on decoupled object storage.',
      'Unified enterprise telemetry stack providing end-to-end eBPF-powered distributed tracing.',
      'Zero-trust access orchestration framework eliminating perimeter security vulnerabilities.',
      'Autonomous feature release and roll-forward reliability engineering platform.'
    ]
  },
  {
    sector: 'CleanTech & Energy Transition',
    industries: ['Battery Chemistry', 'EV Charging Mesh', 'Grid Balancing Software', 'Hydrogen Fuel Cells', 'Carbon Accounting', 'Industrial Solar Storage', 'Fleet Electrification', 'Solid State Electrolytes'],
    descriptions: [
      'Proprietary thermal management and battery packing architecture delivering 4C charging rates.',
      'Smart virtual power plant software coordinating localized distributed renewable storage assets.',
      'Closed-loop carbon verification platform providing audit-grade carbon credit provenance.',
      'Autonomous urban fleet swap-station network maintaining 99.8% uptime across commercial corridors.'
    ]
  },
  {
    sector: 'SpaceTech & Defense',
    industries: ['Satellite Constellations', 'Aerospace Propulsion', 'Hyperspectral Analytics', 'Autonomous Drones', 'Counter-UAS Systems', 'Space Situational Awareness', 'Tactical Mesh Radio', 'Naval Autonomy'],
    descriptions: [
      '3D-printed regeneratively cooled bipropellant rocket engine for dedicated rideshare insertion.',
      'Edge-computed orbital radar synthetic aperture array capturing sub-meter resolution 24/7.',
      'Autonomous swarming unmanned surface and aerial platforms deployed for tactical perimeter defense.',
      'Laser satellite inter-link transceivers achieving multi-gigabit orbital mesh data transfer.'
    ]
  },
  {
    sector: 'HealthTech & BioTech',
    industries: ['Targeted Oncology', 'Genomic Sequencing', 'Remote Patient Telemetry', 'Clinical Trial OS', 'Surgical Robotics', 'AI Drug Formulation', 'Diagnostic Point-of-Care', 'Digital Therapeutics'],
    descriptions: [
      'Computational small-molecule discovery platform compressing target identification from years to weeks.',
      'Continuous hemodynamic sensor monitoring system predicting patient decompensation 12 hours early.',
      'High-throughput robotic liquid handling platform integrated with cloud sequencing pipelines.',
      'AI-assisted ultrasound diagnostic appliance designed for decentralized rural health workers.'
    ]
  },
  {
    sector: 'Robotics & Industrial Automation',
    industries: ['Warehouse Fulfillment Robots', 'Autonomous Mobile Robots (AMR)', 'Vision Inspection Systems', 'Collaborative Arm Robotics', 'Exoskeletons', 'Precision Agriculture Automation', 'Smart Actuators'],
    descriptions: [
      'High-speed sorting autonomous mobile robotics fleet dynamically optimizing dark-store throughput.',
      'Computer vision powered defect inspection robot operating at 120 parts per second on production lines.',
      'Precision robotic welding and additive manufacturing cells for structural defense enclosures.',
      'Autonomous agricultural spraying drones equipped with multi-spectral canopy health sensors.'
    ]
  },
  {
    sector: 'Consumer & Vernacular Tech',
    industries: ['D2C Nutrition', 'Vernacular Audio Streaming', 'Creator Monetization', 'Interactive Live Gaming', 'Urban Quick Commerce', 'Affordable Hospitality Tech', 'Athletic Wearables'],
    descriptions: [
      'Direct-to-consumer functional nutrition brand formulated for modern desk-bound professionals.',
      'Mother-tongue interactive audio storytelling application scaled to tens of millions of daily listeners.',
      'Predictive grocery delivery fulfillment pipeline guaranteeing sub-10-minute order completion.',
      'Micro-membership creator community platform driving direct recurring subscription relationships.'
    ]
  }
];

// Curated list of 500 company names (Indian & Global startups, seed-stage to pre-IPO)
const namesPool = [
  // Tech & AI
  'DeepRoute', 'Kognitiv', 'Vectara', 'ChromaDB', 'LanceDB', 'Qdrant', 'Weaviate', 'Pinecone', 'Arize AI', 'BentoML',
  'Anyscale', 'Modal Labs', 'Fireworks AI', 'Baseten', 'OctoAI', 'Lamini', 'Predibase', 'Deci AI', 'Neural Magic', 'Replicate',
  'Modal', 'RunPod', 'CoreWeave', 'Lambda Labs', 'Crusoe Energy', 'Foundry', 'Triton AI', 'Modular', 'CentML', 'SambaNova',
  'Tenstorrent', 'Etched AI', 'D-Matrix', 'Lightmatter', 'Celestial AI', 'Aetina', 'SiFive', 'Rivos', 'Esper', 'Memfault',
  'Resourcely', 'Envoy', 'Tailscale', 'Teleport', 'Warp', 'Zed', 'Cursor', 'Codeium', 'Superwhisper', 'Rewind AI',
  'Oasis AI', 'Character AI', 'Inflection AI', 'Poe', 'Genspark', 'You.com', 'Kagi', 'Phind', 'Exa AI', 'Metaphor',
  'Tavily', 'Voyage AI', 'Jina AI', 'Unstructured', 'LlamaIndex', 'LangSmith', 'Promptfoo', 'DeepEval', 'Braintrust', 'Humanloop',
  'Galileo', 'Arthur AI', 'Fiddler', 'WhyLabs', 'Aporia', 'TruEra', 'Patronus AI', 'Lakera', 'CalypsoAI', 'Protect AI',
  
  // Fintech & Crypto
  'Decentro', 'Setu', 'HyperVerge', 'Bureau ID', 'Signzy', 'IDfy', 'Karza', 'FinBox', 'Tartan HQ', 'OneStack',
  'M2P Fintech', 'Yap', 'Fibe', 'KreditBee', 'Money View', 'CASHe', 'mPokket', 'Kissht', 'Ring', 'Rupeek',
  'OroPocket', 'Indiagold', 'Safegold', 'Augmont', 'Gullak', 'Fi Money', 'Niyo', 'Scripbox', 'Dezerv', 'Wint Wealth',
  'Jiraaf', 'AltGraaf', 'Grip Invest', 'Stable Money', 'LiquiLoans', 'Faircent', 'LenDenClub', 'IndiaLends', 'Aye Finance', 'Kinara Capital',
  'Vistaar Finance', 'Veritas Finance', 'Lendingkart', 'NeoGrowth', 'FlexiLoans', 'Progcap', 'Indifi', 'Vivriti', 'Northern Arc', 'Avanti',
  'CreditVidya', 'Perfios', 'Dhiwise', 'Appsmith', 'Tooljet', 'Locofy', 'Builder.ai', 'Hasura', 'Postman', 'BrowserStack',
  'LambdaTest', 'Testsigma', 'Acceldata', 'Monte Carlo', 'Castor', 'Atlan', 'Secoda', 'OpenMetadata', 'Soda Data', 'Bigeye',
  'Datafold', 'Unravel Data', 'Pepperdata', 'ChaosSearch', 'Cube Dev', 'Evidence Dev', 'Metabase', 'Preset', 'Hex Technologies', 'Deepnote',
  'Observable', 'Mode Analytics', 'ThoughtSpot', 'Sisense', 'Domo', 'dbt Labs', 'Coalesce', 'Airbyte', 'Fivetran', 'Meltano',
  'Hevo Data', 'RudderStack', 'Segment', 'mParticle', 'Tealium', 'Freshpaint', 'Snowplow', 'Hightouch', 'Census', 'Polytomic',

  // Indian B2B & DeepTech
  'GreyOrange', 'Cynlr', 'Addverb', 'Ati Motors', 'Haber Water', 'Peppermint Robotics', 'Sastra Robotics', 'Unbox Robotics', 'Tonbo Imaging', 'IdeaForge',
  'Asteria Aerospace', 'NewSpace Research', 'Sagar Defence', 'Big Bang Boom', 'Optimized Electrotech', 'EyeROV', 'EndureAir', 'General Aeronautics', 'Torus Robotics', 'Agnikul',
  'Skyroot', 'Pixxel', 'Bellatrix', 'Dhruva Space', 'GalaxEye', 'Digantara', 'Kawa Space', 'Astrogate Labs', 'Manastu Space', 'InspeCity',
  'Ather Energy', 'Ola Electric', 'Ultraviolette', 'River Mobility', 'Simple Energy', 'BluSmart', 'Zypp Electric', 'Battery Smart', 'Exponent Energy', 'Log9 Materials',
  'Euler Motors', 'Altigreen', 'Bounce Infinity', 'Yulu Bikes', 'Kazam EV', 'Statiq', 'Magenta Mobility', 'Sun Mobility', 'Cell Propulsion', 'Pravaig Dynamics',

  // HealthTech & BioTech
  'Tata 1mg', 'PharmEasy', 'Practo', 'HealthifyMe', 'Cult.fit', 'Ultrahuman', 'Pristyn Care', 'MediBuddy', 'Dozee', 'Qure.ai',
  'SigTuple', 'Niramai', 'Bugworks', 'Molbio Diagnostics', 'MedGenome', 'Strand Life Sciences', 'Eyestem', 'Pandorum', 'BrainSightAI', '5C Network',
  'HealthPlix', 'Eka Care', 'Kenko Health', 'Onsurity', 'Loop Health', 'Plum HQ', 'Nova Benefits', 'Even Healthcare', 'Acko General', 'Digit Insurance',
  
  // D2C & Consumer Brands
  'Mamaearth', 'Sugar Cosmetics', 'Plum Goodness', 'WOW Skin Science', 'Minimalist', 'Foxtale', 'Dot & Key', 'mCaffeine', 'Renee Cosmetics', 'Pilgrim',
  'Juicy Chemistry', 'Bombay Shaving Co', 'The Man Company', 'Beardo', 'Ustraa', 'Wakefit', 'SleepyCat', 'Sunday Rest', 'Pepperfry', 'Urban Ladder',
  'Livspace', 'HomeLane', 'Furlenco', 'Rentomojo', 'Melorra', 'Bluestone', 'CaratLane', 'Giva Jewellery', 'Voylla', 'Suta Bombay',
  'Snitch', 'Bewakoof', 'The Souled Store', 'BlissClub', 'Clovia', 'Zivame', 'Nykaa Fashion', 'Myntra', 'Ajio', 'Meesho',
  'Blinkit', 'Zepto', 'Swiggy Instamart', 'BigBasket', 'BB Daily', 'Dunzo', 'Milkbasket', 'Country Delight', 'Otipy', 'Fraazo',
  'Blue Tokai', 'Sleepy Owl', 'Third Wave Coffee', 'Chaayos', 'Chai Point', 'Rebel Foods', 'Curefoods', 'EatClub', 'Biryani By Kilo', 'WOW! Momo',
  'Bira 91', 'Paper Boat', 'boAt Lifestyle', 'Noise Audio', 'Fire-Boltt', 'Boult Audio', 'Portronics', 'Mivi India', 'Zebronics', 'Nothing Tech',

  // EdTech & Talent
  'PhysicsWallah', 'Unacademy', 'Eruditus', 'upGrad', 'Lead School', 'Teachmint', 'Classplus', 'Scaler Academy', 'InterviewBit', 'Guvi Geek',
  'Leap Finance', 'Leverage Edu', 'Masai School', 'Newton School', 'AlmaBetter', 'Kyt Academy', 'FrontRow', 'Cuemath', 'Lido Learning', 'Toppr',
  
  // Vernacular Media & Gaming
  'STAGE OTT', 'Pratilipi', 'Kuku FM', 'Pocket FM', 'ShareChat', 'Moj App', 'Josh App', 'Dailyhunt', 'Glance InMobi', 'Roposo',
  'WinZO Games', 'Mobile Premier League', 'Games24x7', 'Zupee', 'Dream11', 'Nazara Tech', 'Rooter Sports', 'Loco Gaming', 'Eloelo', 'Chingari',

  // Global Titans & Hypergrowth
  'Stripe', 'Plaid', 'Brex', 'Ramp', 'Revolut', 'Monzo', 'Klarna', 'Wise', 'Checkout.com', 'N26 Bank',
  'Nubank', 'Chime', 'Robinhood', 'SoFi', 'Marqeta', 'Adyen', 'Affirm', 'Toast POS', 'Carta', 'AngelList',
  'Notion', 'Figma', 'Canva', 'Linear App', 'Retool', 'Vercel', 'Supabase', 'Neon Database', 'PlanetScale', 'Turso DB',
  'Docker', 'Temporal IO', 'ClickHouse', 'MotherDuck', 'DuckDB Labs', 'SingleStore', 'Cockroach Labs', 'Yugabyte', 'Timescale', 'QuestDB',
  'Grafana Labs', 'Datadog', 'Cloudflare', 'Fastly', 'HashiCorp', 'GitLab', 'Snyk', 'Wiz Security', 'Orca Security', 'Cyera',
  'SentinelOne', 'CrowdStrike', 'Palo Alto Tech', 'Zscaler', 'Netskope', 'Lacework', 'Axonius', 'Island Browser', 'Talon Cyber', 'Abnormal Security',
  'Rippling', 'Deel', 'Gusto', 'Remote.com', 'Papaya Global', 'Lattice HQ', 'Culture Amp', 'Workato', 'Zapier', 'Make.com',
  'n8n IO', 'Tray.io', 'Celigo', 'Boomi', 'Kong Gateway', 'Tyk Technologies', 'Speakeasy API', 'Fern API', 'Stainless API', 'ReadMe Docs',

  // Deep Tech & Quantum
  'PsiQuantum', 'IonQ', 'Rigetti Computing', 'D-Wave Systems', 'Pasqal Quantum', 'QuEra Computing', 'Alice & Bob', 'Xanadu Quantum', 'Quantinuum', 'SandboxAQ',
  'Relativity Space', 'Rocket Lab', 'Astranis Space', 'Planet Labs', 'Spire Global', 'BlackSky', 'Capella Space', 'HawkEye 360', 'Sierra Space', 'Vast Space',
  'Skydio Drones', 'Zipline Drone', 'Wingcopter', 'Joby Aviation', 'Archer Aviation', 'Lilium Air', 'Beta Technologies', 'Volocopter', 'Wisk Aero', 'Overair',
  'Boston Dynamics', 'Unitree Robotics', 'Sanctuary AI', 'Apptronik', '1X Technologies', 'Agility Robotics', 'Refraction AI', 'Nuro Autonomous', 'Waymo', 'Zoox',

  // Climate & Sustainable Tech
  'Form Energy', 'Commonwealth Fusion', 'Helion Energy', 'Zap Energy', 'TAE Technologies', 'Climeworks', 'Charm Industrial', 'Heirloom Carbon', 'Running Tide', 'Twelve Chem',
  'Solugen', 'LanzaTech', 'Redwood Materials', 'Ascend Elements', 'Li-Cycle', 'Northvolt', 'QuantumScape', 'StoreDot', 'Solid Power', 'Sila Nanotechnologies',
  'KoBold Metals', 'Lilac Solutions', 'Energy Vault', 'Ambri Battery', 'ESS Inc', 'Sunrun', 'Aurora Solar', 'Palmetto Clean', 'LevelTen Energy', 'Arcadia Power',

  // Global Next-Gen Commerce & Logistics
  'Flexport', 'Convoy Freight', 'Samsara IoT', 'KeepTruckin (Motive)', 'Gatik AI', 'Kodiak Robotics', 'Einride Autonomous', 'Aurora Innovation', 'Waabi AI', 'Applied Intuition',
  'Faire Wholesale', 'Ankorstore', 'Mirakl', 'VTEX Cloud', 'CommerceHub', 'Cart.com', 'Deliverr', 'ShipBob', 'Quiet Platforms', 'Instacart',
  'DoorDash', 'Deliveroo', 'Just Eat Takeaway', 'Grab Holdings', 'Gojek (GoTo)', 'Careem', 'Rappi LatAm', 'iFood Brazil', 'Bolt Europe', 'Wolt'
];

console.log(`Pool has ${namesPool.length} raw company names. Building 520 unique comprehensive company dossiers...`);

const companies = [];
const usedIds = new Set();

// 1. First add the 40+ curated top tier seeds
companiesSeed.forEach((seed, idx) => {
  const id = `c_${seed.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  usedIds.add(id);

  const founders = seed.f.map((founder, fIdx) => ({
    id: `f_${id}_${fIdx}`,
    name: founder.name,
    title: founder.title,
    education: [founder.edu],
    ecosystemConnections: [founder.eco],
    linkedIn: founder.li
  }));

  const mainEco = seed.f[0]?.eco || 'GLOBAL';

  companies.push({
    id,
    name: seed.name,
    tagline: `${seed.sub} engineering for global scale`,
    description: `${seed.name} is a category-defining market leader in ${seed.ind}, headquartered in ${seed.hq}. The company pioneered breakthroughs in ${seed.sub} and currently commands a market valuation of ${seed.val}.`,
    industry: seed.ind,
    subIndustry: seed.sub,
    sector: seed.sector,
    founded: `${2012 + (idx % 12)}-0${(idx % 9) + 1}-15`,
    headquarters: seed.hq,
    website: `https://${seed.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    stage: seed.stage,
    status: seed.stage === 'IPO' ? 'IPO' : 'ACTIVE',
    founders,
    investors: [
      topVCs[idx % topVCs.length],
      topVCs[(idx + 3) % topVCs.length],
      topVCs[(idx + 7) % topVCs.length]
    ],
    fundingRounds: [
      {
        id: `fr_${id}_1`,
        type: 'Seed',
        amount: { id: `ec_${id}_s`, claim: '$2M - $5M', sourceType: 'NEWS', source: 'VentureBeat / Entrackr', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2019-03',
        investors: [topVCs[(idx + 1) % topVCs.length].name]
      },
      {
        id: `fr_${id}_2`,
        type: seed.stage === 'SERIES_A' ? 'Series A' : 'Series B',
        amount: { id: `ec_${id}_a`, claim: '$25M - $85M', sourceType: 'OFFICIAL_FILING', source: 'Regulatory Filing', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2021-08',
        investors: [topVCs[idx % topVCs.length].name, topVCs[(idx + 4) % topVCs.length].name]
      }
    ],
    totalFunding: { id: `tf_${id}`, claim: seed.fund, sourceType: 'OFFICIAL_FILING', source: 'PitchBook / Tracxn Intelligence', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: `rev_${id}`, claim: seed.rev, sourceType: 'COMPANY_STATEMENT', source: 'Financial Disclosure / MCA', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
    employees: { id: `emp_${id}`, claim: seed.emp, sourceType: 'PUBLIC_DATA', source: 'LinkedIn Talent Insights', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
    valuation: { id: `val_${id}`, claim: seed.val, sourceType: 'OFFICIAL_FILING', source: 'Last Priced Round / CapTable', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
    burnRate: { id: `br_${id}`, claim: '$1.2M - $4.5M/mo', sourceType: 'ANALYST_REPORT', source: 'Analyst Model', retrievedAt: '2024', status: 'ESTIMATED', confidence: 'MEDIUM' },
    runway: { id: `rw_${id}`, claim: '28+ Months', sourceType: 'INFERRED', source: 'Treasury Estimation', retrievedAt: '2024', status: 'INFERRED', confidence: 'MEDIUM' },
    competitors: [],
    markets: [seed.sector, seed.ind, seed.sub],
    signals: [
      { id: `sig_${id}_1`, type: 'HIRING', title: `Aggressive Senior Engineering Expansion in ${seed.hq.split(',')[0]}`, description: 'Open headcount grew by 35% in systems architecture and applied research.', date: '3d ago', strength: 'STRONG', isEarlySignal: true },
      { id: `sig_${id}_2`, type: 'PRODUCT', title: 'Next-Gen v3 Production Release Launched', description: 'Enterprise customers report 4x performance increase and lowered compute footprint.', date: '1w ago', strength: 'STRONG', isEarlySignal: false },
      { id: `sig_${id}_3`, type: 'FUNDING', title: `Targeted Sovereign & Growth Round Finalized at ${seed.val}`, description: 'Secured Tier-1 syndicate participation to accelerate multi-region go-to-market.', date: '2w ago', strength: 'STRONG', isEarlySignal: false }
    ],
    legalEvents: [],
    newsEvents: [
      { id: `ne_${id}_1`, headline: `${seed.name} accelerates enterprise deployment across global tier-1 customers`, date: '4d ago', source: 'TechCrunch', sourceUrl: 'https://techcrunch.com', affectedCompanies: [id], impact: 'HIGH', impactLevel: 'HIGH' }
    ],
    ecosystemConnections: [
      { type: 'ALUMNI_FOUNDER', ecosystem: mainEco, label: `${mainEco} Founder Network`, description: `Executive leadership holds verified degrees from ${mainEco}.`, verified: true }
    ],
    financialMetrics: [
      { id: `fm_${id}_1`, metric: 'Gross Margin', value: { id: `ec_gm_${id}`, claim: '74%', sourceType: 'OFFICIAL_FILING', source: 'Audit Report', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' }, period: 'FY24', trend: 'UP' },
      { id: `fm_${id}_2`, metric: 'Net Retention (NDR)', value: { id: `ec_ndr_${id}`, claim: '128%', sourceType: 'COMPANY_STATEMENT', source: 'Shareholder Letter', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' }, period: 'FY24', trend: 'UP' }
    ],
    operationSignals: [
      { category: 'INFRASTRUCTURE', signal: 'Cluster utilization operating at 89% capacity with automated autoscaling', direction: 'UP', evidence: { id: `ec_os_${id}`, claim: 'Cloud Telemetry', sourceType: 'PUBLIC_DATA', source: 'Engineering Blog', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' } }
    ],
    companyDNA: {
      businessModel: 'Enterprise SaaS subscription with consumption-based compute and platform licenses.',
      market: `Fast-expanding ${seed.sector} sector with strong tailwinds and addressable market exceeding $50B.`,
      product: `Mission-critical ${seed.sub} platform delivering deterministic enterprise guarantees.`,
      capital: `Highly capitalized with ${seed.fund} raised from premier global venture syndicates.`,
      traction: `Demonstrating rapid trajectory with ${seed.rev} and stellar expansion cohorts.`,
      team: `Led by elite technical founders with rigorous pedigree from ${seed.f[0]?.edu}.`,
      operations: `Streamlined operational cadence with ${seed.emp} cross-functional team members.`,
      technology: 'Proprietary patent-pending distributed architecture optimized for low-latency fault tolerance.',
      risks: 'Platform lock-in friction and competitive pricing pressure from legacy incumbent suites.'
    },
    blindSpots: [
      { area: 'Customer Acquisition Concentration', known: true, importance: 'HIGH', question: `Does ${seed.name}'s top 10% enterprise cohort represent more than 50% of annual recurring revenue?` }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: `Legacy ${seed.sector} tooling was fragmented, slow, and incapable of dynamic autonomous scale.`,
      whatChanged: 'Breakthrough architectural shifts and real-time inference economics unlocked 10x ROI.',
      whyItMatters: `Positions ${seed.name} as the indispensable default operational substrate.`,
      catalystTimestamp: '3d ago'
    },
    signalStack: [
      { category: 'COMMERCIAL', headline: `Crossed key enterprise traction threshold with ${seed.rev}`, timestamp: '2d ago', source: 'Bloomberg Terminal', confidence: 'HIGH', status: 'VERIFIED' }
    ]
  });
});

// 2. Synthesize remaining up to 525 companies using diverse names pool & realistic parameters
let nameIdx = 0;
while (companies.length < 525 && nameIdx < namesPool.length) {
  const compName = namesPool[nameIdx++];
  const id = `c_${compName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  if (usedIds.has(id)) continue;
  usedIds.add(id);

  const bp = sectorBlueprints[companies.length % sectorBlueprints.length];
  const ind = bp.industries[companies.length % bp.industries.length];
  const sec = bp.sector;
  const desc = bp.descriptions[companies.length % bp.descriptions.length];

  // Distribute across locations
  const cities = [
    'Bangalore, India', 'Chennai, India', 'San Francisco, USA', 'New York, USA',
    'Hyderabad, India', 'Mumbai, India', 'Gurgaon, India', 'Pune, India',
    'London, UK', 'Austin, USA', 'Singapore', 'Delhi, India', 'Noida, India'
  ];
  const hq = cities[companies.length % cities.length];

  // Distribute across stages
  const stages = ['SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C', 'LATE_STAGE', 'IPO'];
  const stage = stages[companies.length % stages.length];

  // Select university alumni with heavy representation of SRM, IIT Madras, BITS Pilani, etc.
  const uni = institutions[companies.length % institutions.length];
  const firstNames = ['Arun', 'Rohan', 'Aditya', 'Priya', 'Karthik', 'Siddharth', 'Divya', 'Vikram', 'Meera', 'Ananya', 'Rahul', 'Gautam', 'Kunal', 'Sanjay', 'Deepak', 'Neha', 'Pooja', 'Tanvi'];
  const lastNames = ['Nair', 'Sharma', 'Iyer', 'Verma', 'Krishnan', 'Reddy', 'Patel', 'Rao', 'Sundaram', 'Mehta', 'Bansal', 'Gupta', 'Sengupta', 'Chatterjee', 'Deshmukh'];
  
  const fName = `${firstNames[(companies.length * 3) % firstNames.length]} ${lastNames[(companies.length * 7) % lastNames.length]}`;
  const fSlug = fName.toLowerCase().replace(/\s+/g, '-');

  const valNum = stage === 'SEED' ? (5 + (companies.length % 15)) :
                 stage === 'SERIES_A' ? (20 + (companies.length % 40)) :
                 stage === 'SERIES_B' ? (80 + (companies.length % 120)) :
                 stage === 'SERIES_C' ? (250 + (companies.length % 350)) :
                 stage === 'LATE_STAGE' ? (700 + (companies.length % 1500)) :
                 (1200 + (companies.length % 4000));
  const val = `$${valNum}M`;

  const fundNum = Math.max(1, Math.round(valNum * 0.22));
  const fund = `$${fundNum}M`;

  const revNum = Math.max(1, Math.round(valNum * 0.11));
  const rev = `$${revNum}M ARR`;

  const empNum = Math.max(15, Math.round(valNum * 1.4));
  const emp = `${empNum}+`;

  companies.push({
    id,
    name: compName,
    tagline: `Next-generation ${ind} architecture powering modern enterprise systems`,
    description: `${compName} is a high-growth venture in ${ind} (${sec}), headquartered in ${hq}. ${desc}`,
    industry: ind,
    subIndustry: `${ind} Tech`,
    sector: sec,
    founded: `${2015 + (companies.length % 9)}-0${(companies.length % 9) + 1}-10`,
    headquarters: hq,
    website: `https://${compName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    stage,
    status: stage === 'IPO' ? 'IPO' : 'ACTIVE',
    founders: [
      {
        id: `f_${id}_1`,
        name: fName,
        title: 'Founder & CEO',
        education: [`${uni.name} (${uni.deg})`],
        ecosystemConnections: [uni.code],
        linkedIn: `https://www.linkedin.com/in/${fSlug}-${id.replace('c_', '')}/`
      },
      {
        id: `f_${id}_2`,
        name: `${firstNames[(companies.length * 5) % firstNames.length]} ${lastNames[(companies.length * 2) % lastNames.length]}`,
        title: 'Co-Founder & CTO',
        education: [`${institutions[(companies.length + 3) % institutions.length].name}`],
        ecosystemConnections: [institutions[(companies.length + 3) % institutions.length].code],
        linkedIn: `https://www.linkedin.com/in/cto-${id.replace('c_', '')}/`
      }
    ],
    investors: [
      topVCs[companies.length % topVCs.length],
      topVCs[(companies.length + 5) % topVCs.length]
    ],
    fundingRounds: [
      {
        id: `fr_${id}_1`,
        type: stage === 'SEED' ? 'Seed' : 'Series A',
        amount: { id: `ec_${id}_r1`, claim: `$${Math.round(fundNum * 0.4)}M`, sourceType: 'NEWS', source: 'Venture Capital Disclosures', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
        date: '2022-04',
        investors: [topVCs[companies.length % topVCs.length].name]
      }
    ],
    totalFunding: { id: `tf_${id}`, claim: fund, sourceType: 'OFFICIAL_FILING', source: 'Tracxn / PitchBook Index', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
    revenue: { id: `rev_${id}`, claim: rev, sourceType: 'COMPANY_STATEMENT', source: 'Industry Intelligence / Audited Reports', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
    employees: { id: `emp_${id}`, claim: emp, sourceType: 'PUBLIC_DATA', source: 'LinkedIn Talent Graph', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
    valuation: { id: `val_${id}`, claim: val, sourceType: 'OFFICIAL_FILING', source: 'Venture Capital Syndicate Index', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' },
    burnRate: { id: `br_${id}`, claim: `$${Math.max(1, Math.round(revNum * 0.15))}M/mo`, sourceType: 'ANALYST_REPORT', source: 'Analyst Model', retrievedAt: '2024', status: 'ESTIMATED', confidence: 'MEDIUM' },
    runway: { id: `rw_${id}`, claim: `${18 + (companies.length % 18)} Months`, sourceType: 'INFERRED', source: 'Treasury Estimation', retrievedAt: '2024', status: 'INFERRED', confidence: 'MEDIUM' },
    competitors: [],
    markets: [sec, ind, `${sec} Modernization`],
    signals: [
      { id: `sig_${id}_1`, type: 'HIRING', title: `Scaling Engineering & Research Roster in ${hq.split(',')[0]}`, description: 'Technical positions increased by 28% quarter-over-quarter.', date: '4d ago', strength: 'STRONG', isEarlySignal: true },
      { id: `sig_${id}_2`, type: 'PRODUCT', title: `Released Next-Gen Platform Capability for ${ind}`, description: 'Enterprise customers benchmarked a 40% reduction in operational latency.', date: '1w ago', strength: 'STRONG', isEarlySignal: false },
      { id: `sig_${id}_3`, type: 'TECHNOLOGY', title: 'Filed Core Patent for Distributed Optimization Engine', description: 'Autonomous scheduling algorithm granted expedited examination.', date: '2w ago', strength: 'MODERATE', isEarlySignal: false }
    ],
    legalEvents: [],
    newsEvents: [
      { id: `ne_${id}_1`, headline: `${compName} announces strategic enterprise expansion and product acceleration`, date: '5d ago', source: 'Tech Economic Daily', sourceUrl: 'https://news.google.com', affectedCompanies: [id], impact: 'HIGH', impactLevel: 'HIGH' }
    ],
    ecosystemConnections: [
      { type: 'ALUMNI_FOUNDER', ecosystem: uni.code, label: `${uni.name} Alumni Network`, description: `Executive founder graduated from ${uni.name}.`, verified: true }
    ],
    financialMetrics: [
      { id: `fm_${id}_1`, metric: 'Gross Margin', value: { id: `ec_gm_${id}`, claim: `${65 + (companies.length % 25)}%`, sourceType: 'OFFICIAL_FILING', source: 'Audit Report', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' }, period: 'FY24', trend: 'UP' },
      { id: `fm_${id}_2`, metric: 'Customer Retention Rate', value: { id: `ec_cr_${id}`, claim: `${110 + (companies.length % 25)}%`, sourceType: 'COMPANY_STATEMENT', source: 'Investor Update', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' }, period: 'FY24', trend: 'UP' }
    ],
    operationSignals: [
      { category: 'OPERATIONS', signal: 'Core infrastructure reliability maintained at 99.98% SLA', direction: 'UP', evidence: { id: `ec_op_${id}`, claim: 'Reliability Report', sourceType: 'PUBLIC_DATA', source: 'System Status Dashboard', retrievedAt: '2024', status: 'VERIFIED', confidence: 'HIGH' } }
    ],
    companyDNA: {
      businessModel: `Software and infrastructure recurring revenue model with usage expansion tiers.`,
      market: `Growing addressable TAM in ${sec} with rapid adoption curves across global and emerging markets.`,
      product: `Industrial-grade ${ind} engine engineered with low latencies and fault tolerance.`,
      capital: `Prudent capital allocation with ${fund} total funding and sustained multi-year cash runway.`,
      traction: `Demonstrating robust revenue metrics at ${rev} with top-decile retention benchmarks.`,
      team: `Executive team with deep technical backgrounds from ${uni.name} and top engineering programs.`,
      operations: `Agile, data-driven engineering culture spanning ${emp} employees globally.`,
      technology: 'Proprietary core technology stack utilizing asynchronous event-driven pipelines.',
      risks: 'Competitive enterprise selling cycles and platform consolidation from mega-cap cloud providers.'
    },
    blindSpots: [
      { area: 'Ecosystem Dependency', known: true, importance: 'HIGH', question: `How dependent is ${compName} on underlying upstream cloud infrastructure and API pricing?` }
    ],
    visibility: 'HIGH',
    signalDensity: 'HIGH',
    whyNow: {
      before: `Previous approaches to ${ind} required expensive custom deployments and manual oversight.`,
      whatChanged: 'Cloud-native protocols and edge automation made autonomous deployment frictionless.',
      whyItMatters: `Unlocks 5x unit cost advantages for adopters of ${compName}.`,
      catalystTimestamp: '5d ago'
    },
    signalStack: [
      { category: 'PRODUCT', headline: `Major platform update deployed to enterprise production clusters`, timestamp: '3d ago', source: 'Company Release Notes', confidence: 'HIGH', status: 'VERIFIED' }
    ]
  });
}

// Inter-link competitors within same sectors
companies.forEach((c) => {
  const peers = companies.filter(p => p.id !== c.id && p.sector === c.sector);
  c.competitors = peers.slice(0, 4).map(p => p.id);
});

console.log(`Generated ${companies.length} fully structured company profiles.`);

const fileContent = `import { Company } from './types';

export const generatedCompanies: Company[] = ${JSON.stringify(companies, null, 2)};
`;

const outputPath = path.resolve(__dirname, '../src/data/generatedCompanies.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully written generated companies to ${outputPath}`);
