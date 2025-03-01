import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { LEGAL_REFERENCES } from '@/lib/legal-references';

interface Suggestion {
  text: string;
  type: 'law' | 'reason' | 'template';
  relevance: number;
  source: string;
}

export class SmartSuggestions {
  private static instance: SmartSuggestions;
  private suggestionCache: Map<string, Suggestion[]>;

  private constructor() {
    this.suggestionCache = new Map();
  }

  public static getInstance(): SmartSuggestions {
    if (!SmartSuggestions.instance) {
      SmartSuggestions.instance = new SmartSuggestions();
    }
    return SmartSuggestions.instance;
  }

  public async getSuggestions(
    context: {
      disputeType?: string;
      creditorName?: string;
      amount?: number;
      bureau?: string;
    },
    limit_ = 5
  ): Promise<Suggestion[]> {
    const cacheKey = JSON.stringify(context);
    
    // Check cache first
    if (this.suggestionCache.has(cacheKey)) {
      return this.suggestionCache.get(cacheKey) || [];
    }

    const suggestions: Suggestion[] = [];

    // Get relevant laws
    if (context.disputeType) {
      const laws = LEGAL_REFERENCES[context.disputeType as keyof typeof LEGAL_REFERENCES] || [];
      suggestions.push(...laws.map(law => ({
        text: law.text,
        type: 'law',
        relevance: law.relevance === 'High' ? 3 : law.relevance === 'Medium' ? 2 : 1,
        source: law.citation
      } as any)));
    }

    // Get similar successful disputes
    if (context.disputeType && context.creditorName) {
      try {
        const q = query(
          collection(db, 'disputes'),
          where('type', '==', context.disputeType),
          where('creditorName', '==', context.creditorName),
          where('outcome', '==', 'success'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );

        const snapshot = await getDocs(q);
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          suggestions.push({
            text: data.reason,
            type: 'reason',
            relevance: 3,
            source: 'Previous Success'
          });
        });
      } catch (error) {
        console.error('Error fetching similar disputes:', error);
      }
    }

    // Sort by relevance and limit
    const sortedSuggestions = suggestions
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit_);

    // Cache the results
    this.suggestionCache.set(cacheKey, sortedSuggestions);

    return sortedSuggestions;
  }

  public async getAutoCompleteSuggestions(
    input: string,
    context: string
  ): Promise<string[]> {
    // Implement autocomplete logic based on input and context
    return [];
  }

  public clearCache(): void {
    this.suggestionCache.clear();
  }
}

export const smartSuggestions = SmartSuggestions.getInstance();