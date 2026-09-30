import { vectorEngine, VectorSearchResult } from '../vectorEngine';
import { signalRankingEngine, recommendationEngine, RankedSignal, MLRecommendation } from '../mlRanking';
import { ragAnalyst, RAGAnalysisResult } from '../ragAnalyst';
import { realtimeStream, RealTimeEvent, SourceHealth } from '../realtimeStream';

export class IntelligenceAPI {
  // 1. Vector Search
  public static searchVector(
    query: string, 
    options?: { topK?: number; minScore?: number; sector?: string; stage?: string }
  ): VectorSearchResult[] {
    return vectorEngine.search(query, options);
  }

  // 2. ML Ranked Signals
  public static getRankedSignals(limit: number = 30): RankedSignal[] {
    return signalRankingEngine.rankAllSignals(limit);
  }

  // 3. ML Recommendations
  public static getRecommendations(companyId: string, limit: number = 6): MLRecommendation[] {
    return recommendationEngine.getRecommendationsForCompany(companyId, limit);
  }


  // 4. LLM Analyst with RAG
  public static async runRAGAnalysis(
    query: string, 
    onStageUpdate?: (stage: string) => void
  ): Promise<RAGAnalysisResult> {
    return ragAnalyst.analyze(query, onStageUpdate);
  }

  // 5. Real-Time Telemetry & Connected Sources
  public static getSourceHealth(): SourceHealth[] {
    return realtimeStream.getConnectedSources();
  }

  public static getRecentEvents(): RealTimeEvent[] {
    return realtimeStream.getRecentEvents();
  }

  public static subscribeRealtimeEvents(callback: (event: RealTimeEvent) => void): () => void {
    return realtimeStream.subscribe(callback);
  }

  public static getVectorStats() {
    return vectorEngine.getStats();
  }
}

export * from '../vectorEngine';
export * from '../mlRanking';
export * from '../ragAnalyst';
export * from '../realtimeStream';
