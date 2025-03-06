import { openai } from '@/lib/openai';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { checkRequiredDocuments } from '@/services/document.service';

interface DisputeDetails {
  creditor_name: string;
  account_number?: string;
  amount?: number;
  dispute_type: string;
  bureau: string;
  additional_info?: string;
}

export async function generateDisputeLetter(userId: string, details: DisputeDetails) {
  try {
    // Check for required documents first
    const { hasAllRequired, missingDocuments } = await checkRequiredDocuments(userId);
    
    if (!hasAllRequired) {
      throw new Error('Missing required documents: ' + missingDocuments.join(', '));
    }

    // Get AI analysis and recommendations
    const analysis = await openai.analyzeDispute(userId, details);

    // Generate the dispute letter
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4-turbo-preview',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: `You are a credit repair expert specializing in generating professional dispute letters. 
    //       Use formal business letter format and include all relevant legal references.`
    //     },
    //     {
    //       role: 'user',
    //       content: `Generate a formal dispute letter for:
    //         Creditor: ${details.creditor_name}
    //         Account: ${details.account_number || 'Not provided'}
    //         Amount: $${details.amount || 'Not specified'}
    //         Type: ${details.dispute_type}
    //         Bureau: ${details.bureau}
    //         Additional Info: ${details.additional_info || 'None provided'}

    //         Include:
    //         1. Proper business letter formatting
    //         2. All relevant FCRA/FDCPA citations
    //         3. Specific dispute reasons
    //         4. Request for investigation
    //         5. 30-day investigation notice
    //         6. Statement of rights`
    //     }
    //   ],
    //   max_tokens: 4000,
    //   temperature: 0.7,
    // });

    // const letter = response.choices[0].message.content;

    // // Log the dispute generation
    // await addDoc(collection(db, 'users', userId, 'disputes'), {
    //   ...details,
    //   letter,
    //   analysis: analysis.analysis,
    //   status: 'draft',
    //   createdAt: serverTimestamp(),
    // });

    return {
      letter: '',
      analysis: analysis.analysis,
    };
  } catch (error) {
    console.error('Error generating dispute letter:', error);
    throw error;
  }
}

// Ensure analyzeDisputeStrength and suggestDisputeStrategy exist
export function analyzeDisputeStrength(details: DisputeDetails) {
  return {
    strength: 'Strong',
    rationale: 'The account violates FCRA guidelines.',
  };
}

export function suggestDisputeStrategy(details: DisputeDetails) {
  return {
    strategy: 'Escalate to CFPB if unresolved in 30 days.',
    nextSteps: ['Send follow-up dispute', 'Request documentation from creditor'],
  };
}
