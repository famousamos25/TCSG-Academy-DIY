import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import OpenAI from 'openai';

interface AISettings {
  openai_api_key: string;
  default_model: string;
  max_tokens: number;
  temperature: number;
}

class OpenAIService {
  private static instance: OpenAIService;
  private client: OpenAI | null = null;
  private settings: AISettings | null = null;

  private constructor() {}

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  private async initialize() {
    if (!this.client) {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        
        if (!apiKey) {
          throw new Error('OpenAI API key not configured');
        }

        this.client = new OpenAI({
          apiKey,
          dangerouslyAllowBrowser: true
        });

        this.settings = {
          openai_api_key: apiKey,
          default_model: 'gpt-4-turbo-preview',
          max_tokens: 2000,
          temperature: 0.7
        };
      } catch (error) {
        console.error('Failed to initialize OpenAI client:', error);
        throw error;
      }
    }
  }

  public async analyzeDispute(userId: string, params: any): Promise<any> {
    try {
      await this.initialize();
      if (!this.client || !this.settings) {
        throw new Error('OpenAI client not initialized');
      }

      // For test data, return pre-defined analysis immediately
      if (params.mode === 'test' || params.test === true) {
        return {
          analysis: `Based on the provided information, here's my analysis:

1. Initial Assessment
- Account shows a ${params.paymentStatus || 'Late Payment'}
- Current balance: $${params.amount || 0}
- This type of late payment can significantly impact credit score

2. Recommended Strategy
- Dispute the late payment based on ${params.reason || 'inaccurate reporting'}
- Request goodwill adjustment given payment history
- Include supporting documentation

3. Relevant Laws
- FCRA § 611 (15 U.S.C. § 1681i)
- FCRA § 623 (15 U.S.C. § 1681s-2)

4. Required Documents
- Payment records
- Account statements
- Correspondence with creditor

5. Success Probability: High
- Late payments are commonly removed with proper documentation
- Strong legal basis for dispute

6. Next Steps
1. Submit dispute to all three bureaus
2. Follow up after 30 days
3. Consider escalation if needed`,
          success: true
        };
      }

      // For real disputes, use OpenAI API with optimized prompt
      const response = await this.client.chat.completions.create({
        model: this.settings.default_model,
        messages: [
          {
            role: 'system',
            content: 'You are a credit repair expert. Provide concise, actionable dispute analysis.'
          },
          {
            role: 'user',
            content: `Analyze dispute:
Creditor: ${params.creditor_name}
Account: ${params.account_number || 'N/A'}
Amount: $${params.amount || 0}
Type: ${params.dispute_type}
Info: ${params.additional_info || 'None'}

Format:
1. Assessment
2. Strategy
3. Laws
4. Documents
5. Success Probability
6. Next Steps`
          }
        ],
        max_tokens: this.settings.max_tokens,
        temperature: this.settings.temperature,
      });

      const analysis = response.choices[0].message.content;

      // Log interaction asynchronously
      this.logInteraction(
        userId,
        'dispute_analysis',
        params,
        analysis || '',
        response.usage?.total_tokens || 0,
        this.settings.default_model
      ).catch(console.error);

      return {
        analysis,
        success: true
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to analyze dispute');
    }
  }

  private async logInteraction(
    userId: string,
    type: string,
    prompt: any,
    response: string,
    tokensUsed: number,
    modelUsed: string,
    metadata?: any
  ) {
    try {
      await addDoc(collection(db, 'users', userId, 'ai_interactions'), {
        type,
        prompt,
        response,
        tokensUsed,
        modelUsed,
        metadata,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Failed to log AI interaction:', error);
    }
  }

  public generateDisputeLetter(userId: string, params: any): Promise<any> { 
    return Promise.resolve({ success: true, letter: 'Generated dispute letter' });
  }

  public analyzeResponse(userId: string, params: any): Promise<any> {
    return Promise.resolve({ success: true, analysis: 'Analyzed response' });
  }
}

export const openai = OpenAIService.getInstance();