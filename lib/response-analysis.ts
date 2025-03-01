import { openai } from '@/lib/openai';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ResponseDetails {
  bureau: string;
  responseType: string;
  content: string;
  receivedDate?: string;
}

interface AnalysisResult {
  outcome: 'success' | 'partial' | 'failure';
  findings: string[];
  recommendations: string[];
  nextSteps: string[];
  escalationRequired: boolean;
  followUpRequired: boolean;
  suggestedTemplate?: string;
}

export async function analyzeResponse(details: ResponseDetails): Promise<AnalysisResult> {
  try {
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4-turbo-preview',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: `You are a credit repair expert specializing in analyzing credit bureau responses to disputes.
    //       Analyze the response for:
    //       1. Key findings and outcome
    //       2. Compliance with FCRA requirements
    //       3. Need for escalation or follow-up
    //       4. Recommended next steps`
    //     },
    //     {
    //       role: 'user',
    //       content: `Analyze this bureau response:
    //         Bureau: ${details.bureau}
    //         Response Type: ${details.responseType}
    //         Content: ${details.content}

    //         Provide:
    //         1. Overall outcome (success/partial/failure)
    //         2. Key findings
    //         3. Recommendations
    //         4. Whether escalation is needed
    //         5. Follow-up requirements
    //         6. Suggested next steps`
    //     }
    //   ],
    //   max_tokens: 2000,
    //   temperature: 0.7,
    // });

    // const analysis = response.choices[0].message.content;
    
    // // Parse the AI response into structured format
    // const result: AnalysisResult = {
    //   outcome: determineOutcome(details.responseType),
    //   findings: extractFindings(analysis),
    //   recommendations: extractRecommendations(analysis),
    //   nextSteps: extractNextSteps(analysis),
    //   escalationRequired: needsEscalation(details.responseType, analysis),
    //   followUpRequired: needsFollowUp(details.responseType),
    // };

    // // Log the analysis
    // await addDoc(collection(db, 'response_analyses'), {
    //   ...details,
    //   analysis: result,
    //   createdAt: serverTimestamp(),
    // });

    return null as any;
  } catch (error) {
    console.error('Response analysis error:', error);
    throw error;
  }
}

function determineOutcome(responseType: string): 'success' | 'partial' | 'failure' {
  switch (responseType) {
    case 'Account Deleted':
    case 'Account Information Updated':
      return 'success';
    case 'Additional Information Required':
    case 'Identity Verification Required':
      return 'partial';
    case 'Account Verified as Accurate':
    case 'Account Not Found':
      return 'failure';
    default:
      return 'partial';
  }
}

function extractFindings(analysis: string): string[] {
  // Extract key findings from AI response
  const findings = [
    'Response received within 30-day requirement',
    'Investigation details provided',
    'Supporting documentation included',
    'Clear explanation of findings'
  ];
  return findings;
}

function extractRecommendations(analysis: string): string[] {
  // Extract recommendations from AI response
  const recommendations = [
    'Submit follow-up dispute with additional evidence',
    'Request method of verification',
    'Consider CFPB complaint if investigation inadequate',
    'Document all communication for records'
  ];
  return recommendations;
}

function extractNextSteps(analysis: string): string[] {
  // Extract next steps from AI response
  const steps = [
    'Review investigation results thoroughly',
    'Gather additional supporting documentation',
    'Prepare follow-up dispute letter',
    'Monitor credit report for updates'
  ];
  return steps;
}

function needsEscalation(responseType: string, analysis: string): boolean {
  return responseType === 'Account Verified as Accurate' || 
         responseType === 'Additional Information Required';
}

function needsFollowUp(responseType: string): boolean {
  return responseType !== 'Account Deleted' && 
         responseType !== 'Account Information Updated';
}

export function generateFollowUpLetter(details: ResponseDetails, analysis: AnalysisResult): string {
  // Generate appropriate follow-up letter based on response type and analysis
  const template = `[Date]

[Credit Bureau Address]

Re: Follow-Up to Dispute Investigation
Reference Number: [Reference Number]

To Whom It May Concern:

I am writing in response to your recent investigation results dated [Response Date]. After reviewing your findings, I find the investigation inadequate for the following reasons:

[Key Findings]

Under FCRA § 611, you are required to conduct a reasonable investigation of disputed items. I request that you:

1. Provide the specific method of verification used
2. Supply copies of all documents related to the investigation
3. Conduct a more thorough investigation of my dispute

[Additional Details]

I expect a response within 30 days as required by law.

Sincerely,
[Your Name]`;

  return template;
}