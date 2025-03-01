import { LEGAL_REFERENCES } from '@/lib/legal-references';

interface LegalAnalysis {
  relevantLaws: string[];
  recommendations: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  nextSteps: string[];
  requiredDocuments: string[];
}

export function analyzeLegalBasis(disputeType: string, reason: string): LegalAnalysis {
  const references = LEGAL_REFERENCES[disputeType as keyof typeof LEGAL_REFERENCES] || [];
  
  // Get relevant laws based on dispute type
  const relevantLaws = references.map(ref => `${ref.title} (${ref.citation})`);

  // Determine risk level and recommendations based on dispute type and reason
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  let recommendations: string[] = [];
  let nextSteps: string[] = [];
  let requiredDocuments: string[] = [];

  switch (disputeType) {
    case 'Late Payment':
      riskLevel = 'Medium';
      recommendations = [
        'Include proof of payment if available',
        'Request payment history from creditor',
        'Document any communication about payment arrangements'
      ];
      nextSteps = [
        'Submit dispute to all three credit bureaus',
        'Follow up with creditor directly',
        'Keep copies of all correspondence'
      ];
      requiredDocuments = [
        'Payment receipts',
        'Bank statements',
        'Correspondence with creditor'
      ];
      break;

    case 'Account Not Mine':
      riskLevel = 'High';
      recommendations = [
        'File police report if fraudulent',
        'Place fraud alert on credit reports',
        'Contact creditor\'s fraud department'
      ];
      nextSteps = [
        'Submit identity theft report',
        'Request account documentation from creditor',
        'Consider credit freeze'
      ];
      requiredDocuments = [
        'Government ID',
        'Proof of address',
        'Identity theft report'
      ];
      break;

    case 'Identity Theft':
      riskLevel = 'High';
      recommendations = [
        'File FTC Identity Theft Report',
        'File police report',
        'Place extended fraud alert'
      ];
      nextSteps = [
        'Submit identity theft affidavit',
        'Request account records under FCRA 609(e)',
        'Monitor credit reports closely'
      ];
      requiredDocuments = [
        'FTC Identity Theft Report',
        'Police report',
        'Identity theft affidavit',
        'Government ID'
      ];
      break;

    default:
      riskLevel = 'Medium';
      recommendations = [
        'Gather supporting documentation',
        'Review credit report carefully',
        'Document all communication'
      ];
      nextSteps = [
        'Submit dispute letter',
        'Follow up after 30 days',
        'Keep detailed records'
      ];
      requiredDocuments = [
        'Credit report copy',
        'Supporting documentation',
        'Correspondence records'
      ];
  }

  return {
    relevantLaws,
    recommendations,
    riskLevel,
    nextSteps,
    requiredDocuments
  };
}

export function generateLegalSummary(analysis: LegalAnalysis): string {
  return `Legal Analysis Summary:

Relevant Laws:
${analysis.relevantLaws.map(law => `• ${law}`).join('\n')}

Risk Level: ${analysis.riskLevel}

Recommendations:
${analysis.recommendations.map(rec => `• ${rec}`).join('\n')}

Next Steps:
${analysis.nextSteps.map(step => `• ${step}`).join('\n')}

Required Documents:
${analysis.requiredDocuments.map(doc => `• ${doc}`).join('\n')}`;
}