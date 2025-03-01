import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where, orderBy, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { analyzeResponse } from '@/lib/response-analysis';
import { generateDisputeLetter } from '@/lib/dispute-ai';

interface DisputeRound {
  id: string;
  userId: string;
  disputeId: string;
  roundNumber: number;
  strategy: string;
  letterContent: string;
  bureauResponse?: string;
  responseAnalysis?: any;
  status: 'draft' | 'sent' | 'waiting' | 'completed';
  outcome?: 'success' | 'partial' | 'failure';
  nextSteps?: string[];
  createdAt: Date;
  sentAt?: Date;
  completedAt?: Date;
}

// Strategy templates for each round
const ROUND_STRATEGIES = {
  1: {
    name: 'Initial Dispute',
    description: 'Basic dispute letter citing FCRA rights',
    approach: 'Direct dispute with basic legal citations',
    escalation: 'None',
  },
  2: {
    name: 'Method of Verification',
    description: 'Request specific verification methods',
    approach: 'Focus on investigation procedures',
    escalation: 'Request investigation details',
  },
  3: {
    name: 'Documentation Request',
    description: 'Demand supporting documentation',
    approach: 'Emphasis on burden of proof',
    escalation: 'Cite specific FCRA sections',
  },
  4: {
    name: 'Legal Pressure',
    description: 'Increased legal citations and warnings',
    approach: 'Strong legal language and requirements',
    escalation: 'Mention of FCRA violations',
  },
  5: {
    name: 'CFPB Escalation',
    description: 'Prepare for regulatory complaint',
    approach: 'Final warning before CFPB involvement',
    escalation: 'CFPB complaint preparation',
  },
  6: {
    name: 'Legal Action Warning',
    description: 'Final notice before legal action',
    approach: 'Direct threat of legal action',
    escalation: 'Attorney referral warning',
  },
};

export async function createDisputeRound(
  userId: string,
  disputeId: string,
  details: any
): Promise<string> {
  try {
    // Get current round number
    const rounds = await getDisputeRounds(userId, disputeId);
    const roundNumber = rounds.length + 1;

    if (roundNumber > 12) {
      throw new Error('Maximum dispute rounds (12) reached');
    }

    // Get strategy for this round
    const strategy = ROUND_STRATEGIES[Math.min(roundNumber, 6) as keyof typeof ROUND_STRATEGIES];

    // Generate letter based on round strategy
    const letter = await generateDisputeLetter(userId, {
      ...details,
      roundNumber,
      strategy: strategy.approach,
    });

    // Create new round
    const roundRef = await addDoc(collection(db, 'users', userId, 'dispute_rounds'), {
      disputeId,
      roundNumber,
      strategy: strategy.name,
      letterContent: letter.letter,
      status: 'draft',
      createdAt: serverTimestamp(),
    });

    return roundRef.id;
  } catch (error) {
    console.error('Error creating dispute round:', error);
    throw error;
  }
}

export async function getDisputeRounds(
  userId: string,
  disputeId: string
): Promise<DisputeRound[]> {
  try {
    const roundsRef = collection(db, 'users', userId, 'dispute_rounds');
    const q = query(
      roundsRef,
      where('disputeId', '==', disputeId),
      orderBy('roundNumber', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DisputeRound[];
  } catch (error) {
    console.error('Error getting dispute rounds:', error);
    throw error;
  }
}

export async function updateRoundStatus(
  userId: string,
  roundId: string,
  status: DisputeRound['status'],
  details?: any
) {
  try {
    const roundRef = doc(db, 'users', userId, 'dispute_rounds', roundId);
    
    const updates: any = {
      status,
      updatedAt: serverTimestamp(),
    };

    if (status === 'sent') {
      updates.sentAt = serverTimestamp();
    } else if (status === 'completed') {
      updates.completedAt = serverTimestamp();
    }

    if (details?.bureauResponse) {
      // Analyze bureau response
      const analysis = await analyzeResponse({
        bureau: details.bureau,
        responseType: details.responseType,
        content: details.bureauResponse,
      });

      updates.bureauResponse = details.bureauResponse;
      updates.responseAnalysis = analysis;
      updates.outcome = analysis.outcome;
      updates.nextSteps = analysis.nextSteps;
    }

    await updateDoc(roundRef, updates);
  } catch (error) {
    console.error('Error updating round status:', error);
    throw error;
  }
}

export async function getDisputeRoundStats(userId: string): Promise<{
  totalRounds: number;
  successfulRounds: number;
  pendingRounds: number;
  averageRoundsPerDispute: number;
}> {
  try {
    const roundsRef = collection(db, 'users', userId, 'dispute_rounds');
    const snapshot = await getDocs(roundsRef);
    
    const rounds = snapshot.docs.map(doc => doc.data());
    const disputes = new Set(rounds.map(r => r.disputeId));

    return {
      totalRounds: rounds.length,
      successfulRounds: rounds.filter(r => r.outcome === 'success').length,
      pendingRounds: rounds.filter(r => r.status === 'sent' || r.status === 'waiting').length,
      averageRoundsPerDispute: rounds.length / disputes.size || 0,
    };
  } catch (error) {
    console.error('Error getting dispute round stats:', error);
    throw error;
  }
}

export function suggestNextStrategy(
  currentRound: number,
  previousOutcome?: 'success' | 'partial' | 'failure'
): {
  strategy: string;
  approach: string;
  recommendations: string[];
} {
  const nextRound = currentRound + 1;
  const baseStrategy = ROUND_STRATEGIES[Math.min(nextRound, 6) as keyof typeof ROUND_STRATEGIES];

  let recommendations: string[] = [];

  if (previousOutcome === 'failure') {
    recommendations = [
      'Gather additional supporting documentation',
      'Include more specific legal citations',
      'Request method of verification details',
      'Consider escalating to CFPB if appropriate'
    ];
  } else if (previousOutcome === 'partial') {
    recommendations = [
      'Focus on unresolved items specifically',
      'Provide additional evidence for remaining items',
      'Request clarification on partial updates',
      'Consider splitting dispute into separate letters'
    ];
  } else {
    recommendations = [
      'Continue with standard dispute process',
      'Maintain detailed records of progress',
      'Follow up on any remaining items',
      'Document all successful removals'
    ];
  }

  return {
    strategy: baseStrategy.name,
    approach: baseStrategy.approach,
    recommendations,
  };
}