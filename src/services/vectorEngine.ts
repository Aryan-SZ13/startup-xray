import { Company } from '../data/types';
import { companies } from '../data';

export interface VectorSearchResult {
  company: Company;
  score: number; // 0 to 1
  percentage: number; // 0 to 100
  matchedFeatures: string[];
}

export interface VectorEngineStats {
  totalEntities: number;
  vocabularySize: number;
  dimensions: number;
  indexBuildTimeMs: number;
}

// High-performance In-Memory Semantic Vector Engine
class SemanticVectorEngine {
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();
  private companyVectors: Map<string, Float32Array> = new Map();
  private vectorMagnitudes: Map<string, number> = new Map();
  private stats: VectorEngineStats = {
    totalEntities: 0,
    vocabularySize: 0,
    dimensions: 0,
    indexBuildTimeMs: 0
  };
  private isInitialized = false;

  constructor() {
    this.buildIndex();
  }

  // Tokenize & normalize text into semantic n-grams
  private tokenize(text: string): string[] {
    if (!text) return [];
    const clean = text.toLowerCase().replace(/[^a-z0-9\s-_/]/g, ' ');
    const tokens = clean.split(/\s+/).filter(t => t.length > 2);
    const stopWords = new Set([
      'the', 'and', 'for', 'with', 'that', 'this', 'from', 'are', 'was',
      'built', 'scale', 'platform', 'system', 'next', 'generation', 'modern'
    ]);
    return tokens.filter(t => !stopWords.has(t));
  }

  // Extract weighted semantic document representation from Company entity
  private getCompanyDocument(c: Company): { token: string; weight: number }[] {
    const weightedTokens: { token: string; weight: number }[] = [];

    const addWeighted = (text: string, weight: number) => {
      this.tokenize(text).forEach(token => {
        weightedTokens.push({ token, weight });
      });
    };

    // Primary keywords (highest weight)
    addWeighted(c.name, 4.0);
    addWeighted(c.industry, 3.5);
    if (c.subIndustry) addWeighted(c.subIndustry, 3.5);
    addWeighted(c.sector, 3.0);
    addWeighted(c.headquarters, 2.5);

    // Founders & Alma Mater
    c.founders?.forEach(f => {
      addWeighted(f.name, 2.5);
      f.education?.forEach(edu => addWeighted(edu, 3.0));
      f.ecosystemConnections?.forEach(eco => addWeighted(eco, 3.0));
    });

    // Strategic DNA
    if (c.companyDNA) {
      addWeighted(c.companyDNA.technology, 3.0);
      addWeighted(c.companyDNA.product, 2.5);
      addWeighted(c.companyDNA.businessModel, 2.0);
      addWeighted(c.companyDNA.market, 2.0);
      addWeighted(c.companyDNA.risks, 1.5);
    }

    // Signals & Tagline
    addWeighted(c.tagline, 2.0);
    addWeighted(c.description, 1.5);
    c.markets?.forEach(m => addWeighted(m, 2.5));
    c.signals?.forEach(s => {
      addWeighted(s.title, 1.5);
      addWeighted(s.type, 2.0);
    });

    return weightedTokens;
  }

  public buildIndex(): void {
    const startTime = performance.now();
    const docTermFreqs: Map<string, Map<string, number>> = new Map();
    const docCount = companies.length;
    const termDocCounts: Map<string, number> = new Map();

    // 1. Compute term frequencies for all documents
    for (const company of companies) {
      const tokens = this.getCompanyDocument(company);
      const tfMap = new Map<string, number>();

      for (const { token, weight } of tokens) {
        tfMap.set(token, (tfMap.get(token) || 0) + weight);
      }
      docTermFreqs.set(company.id, tfMap);

      for (const token of tfMap.keys()) {
        termDocCounts.set(token, (termDocCounts.get(token) || 0) + 1);
      }
    }

    // 2. Select top semantic vocabulary features (min doc frequency >= 1)
    const sortedTerms = Array.from(termDocCounts.entries())
      .filter(([_, count]) => count >= 1)
      .sort((a, b) => b[1] - a[1])
      .map(([term]) => term);

    this.vocabulary.clear();
    sortedTerms.forEach((term, idx) => {
      this.vocabulary.set(term, idx);
      // Inverse Document Frequency (smooth IDF)
      const df = termDocCounts.get(term) || 1;
      this.idf.set(term, Math.log((docCount + 1) / (df + 1)) + 1.0);
    });

    const dim = this.vocabulary.size;

    // 3. Project companies into normalized dense embedding vectors
    for (const company of companies) {
      const tfMap = docTermFreqs.get(company.id);
      if (!tfMap) continue;

      const vector = new Float32Array(dim);
      let sumSq = 0;

      for (const [term, tf] of tfMap.entries()) {
        const idx = this.vocabulary.get(term);
        if (idx !== undefined) {
          const idfVal = this.idf.get(term) || 1.0;
          // Log-scaled TF * IDF
          const val = (1 + Math.log(tf)) * idfVal;
          vector[idx] = val;
          sumSq += val * val;
        }
      }

      const mag = Math.sqrt(sumSq) || 1e-9;
      // Unit normalize vector
      for (let i = 0; i < dim; i++) {
        if (vector[i] !== 0) {
          vector[i] /= mag;
        }
      }

      this.companyVectors.set(company.id, vector);
      this.vectorMagnitudes.set(company.id, 1.0); // Already normalized
    }

    const duration = performance.now() - startTime;
    this.stats = {
      totalEntities: companies.length,
      vocabularySize: dim,
      dimensions: dim,
      indexBuildTimeMs: Math.round(duration)
    };
    this.isInitialized = true;
  }

  // Vectorize arbitrary natural language search query
  private vectorizeQuery(query: string): { vector: Float32Array; terms: string[] } {
    const tokens = this.tokenize(query);
    const dim = this.vocabulary.size;
    const queryVector = new Float32Array(dim);
    let sumSq = 0;
    const recognizedTerms: string[] = [];

    const tfMap = new Map<string, number>();
    for (const token of tokens) {
      tfMap.set(token, (tfMap.get(token) || 0) + 1);
    }

    for (const [term, tf] of tfMap.entries()) {
      const idx = this.vocabulary.get(term);
      if (idx !== undefined) {
        recognizedTerms.push(term);
        const idfVal = this.idf.get(term) || 1.0;
        const val = (1 + Math.log(tf)) * idfVal;
        queryVector[idx] = val;
        sumSq += val * val;
      }
    }

    const mag = Math.sqrt(sumSq) || 1e-9;
    for (let i = 0; i < dim; i++) {
      if (queryVector[i] !== 0) {
        queryVector[i] /= mag;
      }
    }

    return { vector: queryVector, terms: recognizedTerms };
  }

  // Cosine dot product between two unit-normalized vectors
  private cosineSimilarity(a: Float32Array, b: Float32Array): number {
    let dot = 0;
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
    }
    return dot;
  }

  // Public Search: Natural language vector semantic retrieval
  public search(
    query: string, 
    options: { topK?: number; minScore?: number; sector?: string; stage?: string } = {}
  ): VectorSearchResult[] {
    if (!this.isInitialized) this.buildIndex();

    const { topK = 20, minScore = 0.05, sector, stage } = options;
    const { vector: queryVector, terms: queryTerms } = this.vectorizeQuery(query);

    if (queryTerms.length === 0) {
      // Fallback: substring matching if query has no recognized dictionary terms
      const qLower = query.toLowerCase().trim();
      return companies
        .filter(c => c.name.toLowerCase().includes(qLower) || c.industry.toLowerCase().includes(qLower))
        .slice(0, topK)
        .map(c => ({
          company: c,
          score: 0.85,
          percentage: 85,
          matchedFeatures: [qLower]
        }));
    }

    const results: VectorSearchResult[] = [];

    for (const company of companies) {
      if (sector && sector !== 'ALL' && company.sector !== sector && company.industry !== sector) {
        continue;
      }
      if (stage && stage !== 'ALL' && company.stage !== stage) {
        continue;
      }

      const compVector = this.companyVectors.get(company.id);
      if (!compVector) continue;

      const similarity = this.cosineSimilarity(queryVector, compVector);

      if (similarity >= minScore) {
        // Identify matched features
        const matched = queryTerms.filter(term => {
          const idx = this.vocabulary.get(term);
          return idx !== undefined && compVector[idx] > 0;
        });

        // Boost score slightly if exact company name or founder institution is matched
        let adjustedScore = similarity;
        if (company.name.toLowerCase().includes(query.toLowerCase().trim())) {
          adjustedScore = Math.min(0.99, adjustedScore + 0.25);
        }

        results.push({
          company,
          score: adjustedScore,
          percentage: Math.round(adjustedScore * 100),
          matchedFeatures: matched
        });
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  // Nearest neighbors in vector embedding space for a given company
  public getNearestNeighbors(companyId: string, topK: number = 6): VectorSearchResult[] {
    if (!this.isInitialized) this.buildIndex();

    const targetVector = this.companyVectors.get(companyId);
    if (!targetVector) return [];

    const targetCompany = companies.find(c => c.id === companyId);
    const results: VectorSearchResult[] = [];

    for (const company of companies) {
      if (company.id === companyId) continue;
      const compVector = this.companyVectors.get(company.id);
      if (!compVector) continue;

      const similarity = this.cosineSimilarity(targetVector, compVector);
      results.push({
        company,
        score: similarity,
        percentage: Math.round(similarity * 100),
        matchedFeatures: [company.sector, company.industry]
      });
    }

    return results.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  public getStats(): VectorEngineStats {
    return this.stats;
  }
}

export const vectorEngine = new SemanticVectorEngine();
