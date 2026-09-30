import { companies } from '../data';

export interface RealTimeEvent {
  id: string;
  timestamp: string;
  source: 'SEC_EDGAR' | 'MCA_INDIA' | 'PATENT_OFFICE' | 'TALENT_PULSE' | 'VENTURE_WIRE';
  category: 'REGULATORY' | 'CAPITAL' | 'PATENT' | 'HIRING' | 'PRODUCT';
  headline: string;
  companyName: string;
  companyId: string;
  confidence: 'HIGH' | 'MEDIUM';
  impactLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
}

export interface SourceHealth {
  name: string;
  status: 'ONLINE' | 'DEGRADED' | 'SYNCING';
  latencyMs: number;
  eventsIngested24h: number;
  lastSync: string;
}

class RealTimeIngestionStream {
  private listeners: ((event: RealTimeEvent) => void)[] = [];
  private intervalId: any = null;
  private recentEvents: RealTimeEvent[] = [];

  private sampleEventTemplates = [
    { source: 'MCA_INDIA', category: 'REGULATORY', template: 'Form MGT-7 Annual Return and Shareholding Pattern filed with Registrar of Companies', impact: 'MODERATE' },
    { source: 'SEC_EDGAR', category: 'REGULATORY', template: 'Form D Notice of Exempt Offering of Securities submitted for growth financing tranche', impact: 'HIGH' },
    { source: 'PATENT_OFFICE', category: 'PATENT', template: 'Patent specification publication for autonomous sensor telemetry and low-latency scheduling', impact: 'HIGH' },
    { source: 'TALENT_PULSE', category: 'HIRING', template: 'Net engineering headcount inflow from Tier-1 tech institutions detected (+18% MoM)', impact: 'HIGH' },
    { source: 'VENTURE_WIRE', category: 'CAPITAL', template: 'Secondary cap table restructuring and liquidity allocation completed for founding cohort', impact: 'CRITICAL' }
  ];

  constructor() {
    this.seedInitialEvents();
    this.startStreaming();
  }

  private seedInitialEvents() {
    for (let i = 0; i < 8; i++) {
      const comp = companies[Math.floor(Math.random() * companies.length)];
      const tpl = this.sampleEventTemplates[i % this.sampleEventTemplates.length];
      this.recentEvents.push({
        id: `rte_${Date.now() - (8 - i) * 120000}_${i}`,
        timestamp: `${(8 - i) * 2}m ago`,
        source: tpl.source as any,
        category: tpl.category as any,
        headline: `${comp.name}: ${tpl.template}`,
        companyName: comp.name,
        companyId: comp.id,
        confidence: 'HIGH',
        impactLevel: tpl.impact as any
      });
    }
  }

  private startStreaming() {
    if (this.intervalId) return;

    // Emit a new live event every 14 seconds
    this.intervalId = setInterval(() => {
      const comp = companies[Math.floor(Math.random() * companies.length)];
      const tpl = this.sampleEventTemplates[Math.floor(Math.random() * this.sampleEventTemplates.length)];

      const newEvent: RealTimeEvent = {
        id: `rte_${Date.now()}`,
        timestamp: 'Just now',
        source: tpl.source as any,
        category: tpl.category as any,
        headline: `${comp.name}: ${tpl.template}`,
        companyName: comp.name,
        companyId: comp.id,
        confidence: 'HIGH',
        impactLevel: tpl.impact as any
      };

      this.recentEvents.unshift(newEvent);
      if (this.recentEvents.length > 25) {
        this.recentEvents.pop();
      }

      this.listeners.forEach(cb => cb(newEvent));
    }, 14000);
  }

  public subscribe(callback: (event: RealTimeEvent) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  public getRecentEvents(): RealTimeEvent[] {
    return [...this.recentEvents];
  }

  public getConnectedSources(): SourceHealth[] {
    return [
      { name: 'Ministry of Corporate Affairs (MCA)', status: 'ONLINE', latencyMs: 42, eventsIngested24h: 1840, lastSync: '12s ago' },
      { name: 'SEC EDGAR Real-Time Feed', status: 'ONLINE', latencyMs: 28, eventsIngested24h: 3410, lastSync: '4s ago' },
      { name: 'Indian & Global Patent Registries', status: 'ONLINE', latencyMs: 65, eventsIngested24h: 720, lastSync: '1m ago' },
      { name: 'Talent & Hiring Graph Stream', status: 'ONLINE', latencyMs: 84, eventsIngested24h: 8900, lastSync: 'Just now' },
      { name: 'Venture Capital Syndication Wire', status: 'ONLINE', latencyMs: 35, eventsIngested24h: 1250, lastSync: '22s ago' }
    ];
  }
}

export const realtimeStream = new RealTimeIngestionStream();
