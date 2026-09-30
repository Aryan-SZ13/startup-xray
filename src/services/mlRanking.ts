import { Company, Signal } from '../data/types';
import { companies } from '../data';
import { vectorEngine } from './vectorEngine';

export interface RankedSignal {
  signal: Signal;
  companyName: string;
  companyId: string;
  compositeScore: number; // 0 - 100
  tier: 'ALPHA' | 'HIGH_CONVICTION' | 'SURGING' | 'MAINSTREAM';
  breakdown: {
    recencyScore: number;
    confidenceScore: number;
    impactScore: number;
    sourceScore: number;
    earlyAlphaBonus: number;
  };
}

export interface MLRecommendation {
  company: Company;
  affinityScore: number; // 0 - 100
  matchType: 'DIRECT_COMPARABLE' | 'HIDDEN_COMPARABLE' | 'EMERGING_THREAT' | 'ALUMNI_CORRIDOR' | 'THESIS_MATCH';
  reasons: string[];
  dimensions: {
    semanticDnaOverlap: number;
    capitalTrajectoryAffinity: number;
    networkProximity: number;
    marketSectorAlignment: number;
  };
}

// 1. ML Signal-Ranking Engine
export class MLSignalRankingEngine {
  // Configurable ML model weights
  private weights = {
    recency: 0.30,
    confidence: 0.25,
    impact: 0.20,
    source: 0.15,
    earlyAlpha: 0.10
  };

  private parseRecencyDays(dateStr?: string): number {
    if (!dateStr) return 30;
    const lower = dateStr.toLowerCase();
    if (lower.includes('h') || lower.includes('hour')) return 0.2;
    if (lower.includes('1d') || lower.includes('yesterday')) return 1;
    if (lower.includes('d ago')) {
      const match = lower.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 3;
    }
    if (lower.includes('w ago')) {
      const match = lower.match(/(\d+)/);
      return match ? parseInt(match[1], 10) * 7 : 7;
    }
    return 20;
  }

  public rankAllSignals(limit: number = 30): RankedSignal[] {
    const allSignals: RankedSignal[] = [];

    for (const company of companies) {
      if (!company.signals) continue;

      for (const signal of company.signals) {
        // Calculate Recency Score (decay function)
        const days = this.parseRecencyDays(signal.date);
        const recencyScore = Math.max(10, Math.round(100 * Math.exp(-0.12 * days)));

        // Calculate Confidence Score
        const confStatus = signal.source?.confidence || (signal.strength === 'STRONG' ? 'HIGH' : 'MEDIUM');
        const confidenceScore = confStatus === 'HIGH' ? 95 : confStatus === 'MEDIUM' ? 70 : 45;

        // Calculate Impact Score
        const impactScore = signal.strength === 'STRONG' ? 95 : signal.strength === 'MODERATE' ? 70 : 50;

        // Calculate Source Veracity Score
        const sourceType = signal.source?.sourceType || 'PUBLIC_DATA';
        const sourceScore = 
          sourceType === 'OFFICIAL_FILING' ? 100 :
          sourceType === 'COMPANY_STATEMENT' ? 85 :
          sourceType === 'NEWS' ? 75 : 60;

        // Early Alpha Bonus
        const earlyAlphaBonus = signal.isEarlySignal ? 100 : 30;

        // Composite ML Weighted Sum
        const composite = 
          recencyScore * this.weights.recency +
          confidenceScore * this.weights.confidence +
          impactScore * this.weights.impact +
          sourceScore * this.weights.source +
          earlyAlphaBonus * this.weights.earlyAlpha;

        const compositeScore = Math.min(99, Math.round(composite));

        const tier: RankedSignal['tier'] = 
          compositeScore >= 88 ? 'ALPHA' :
          compositeScore >= 76 ? 'HIGH_CONVICTION' :
          compositeScore >= 60 ? 'SURGING' : 'MAINSTREAM';

        allSignals.push({
          signal,
          companyName: company.name,
          companyId: company.id,
          compositeScore,
          tier,
          breakdown: {
            recencyScore,
            confidenceScore,
            impactScore,
            sourceScore,
            earlyAlphaBonus
          }
        });
      }
    }

    return allSignals
      .sort((a, b) => b.compositeScore - a.compositeScore)
      .slice(0, limit);
  }
}

// 2. Multi-Modal ML Company Recommendation Engine
export class MLRecommendationEngine {
  public getRecommendationsForCompany(targetCompanyId: string, limit: number = 6): MLRecommendation[] {
    const target = companies.find(c => c.id === targetCompanyId);
    if (!target) return [];

    // Semantic vector nearest neighbors
    const vectorNeighbors = vectorEngine.getNearestNeighbors(targetCompanyId, 25);
    const vectorScoreMap = new Map<string, number>();
    vectorNeighbors.forEach(vn => vectorScoreMap.set(vn.company.id, vn.score));

    const recommendations: MLRecommendation[] = [];

    // Target features
    const targetSector = target.sector;
    const targetIndustry = target.industry;
    const targetInstitutions = new Set(
      target.founders?.flatMap(f => f.ecosystemConnections || []) || []
    );

    const parseNum = (str?: string): number => {
      if (!str) return 0;
      const match = str.match(/[\d.]+/);
      if (!match) return 0;
      const num = parseFloat(match[0]);
      return str.includes('B') ? num * 1000 : num;
    };

    const targetValuation = parseNum(target.valuation?.claim);

    for (const company of companies) {
      if (company.id === targetCompanyId) continue;

      const reasons: string[] = [];

      // 1. Semantic DNA Overlap (0 - 100)
      const vectorScore = vectorScoreMap.get(company.id) || 0.15;
      const semanticDnaOverlap = Math.round(vectorScore * 100);

      // 2. Capital Trajectory Affinity (0 - 100)
      const compValuation = parseNum(company.valuation?.claim);
      const ratio = targetValuation > 0 && compValuation > 0 
        ? Math.min(targetValuation, compValuation) / Math.max(targetValuation, compValuation)
        : 0.5;
      const capitalTrajectoryAffinity = Math.round(ratio * 100);

      // 3. Network Proximity (0 - 100)
      const compInstitutions = company.founders?.flatMap(f => f.ecosystemConnections || []) || [];
      const commonInst = compInstitutions.filter(inst => targetInstitutions.has(inst));
      const networkProximity = commonInst.length > 0 ? 95 : 35;

      if (commonInst.length > 0) {
        reasons.push(`Shared alumni ecosystem corridor: ${commonInst.join(', ')}`);
      }

      // 4. Sector Alignment
      const sameSector = company.sector === targetSector;
      const sameIndustry = company.industry === targetIndustry;
      const marketSectorAlignment = sameIndustry ? 95 : sameSector ? 75 : 30;

      if (sameIndustry) {
        reasons.push(`Direct peer competitor in ${company.industry}`);
      } else if (sameSector) {
        reasons.push(`Adjacent operator in ${company.sector}`);
      }

      // Composite Affinity Score
      const affinity = 
        semanticDnaOverlap * 0.40 +
        capitalTrajectoryAffinity * 0.25 +
        networkProximity * 0.20 +
        marketSectorAlignment * 0.15;

      const affinityScore = Math.min(99, Math.round(affinity));

      // Determine match classification
      let matchType: MLRecommendation['matchType'] = 'DIRECT_COMPARABLE';
      if (commonInst.length > 0 && !sameIndustry) {
        matchType = 'ALUMNI_CORRIDOR';
      } else if (!sameIndustry && semanticDnaOverlap > 60) {
        matchType = 'HIDDEN_COMPARABLE';
        reasons.push(`High latent technology DNA overlap (${semanticDnaOverlap}%) across different end-markets`);
      } else if (sameIndustry && company.stage === 'SEED' && target.stage !== 'SEED') {
        matchType = 'EMERGING_THREAT';
        reasons.push(`Fast-moving early stage disruptor executing on modern primitives`);
      } else if (affinityScore > 75) {
        matchType = 'THESIS_MATCH';
      }

      recommendations.push({
        company,
        affinityScore,
        matchType,
        reasons: reasons.slice(0, 3),
        dimensions: {
          semanticDnaOverlap,
          capitalTrajectoryAffinity,
          networkProximity,
          marketSectorAlignment
        }
      });
    }

    return recommendations
      .sort((a, b) => b.affinityScore - a.affinityScore)
      .slice(0, limit);
  }
}

export const signalRankingEngine = new MLSignalRankingEngine();
export const recommendationEngine = new MLRecommendationEngine();
