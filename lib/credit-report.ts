import { CreditReportData } from './credit-report-analysis';

export function getScoreColor(score: number | null): string {
  if (!score) return 'text-gray-400';
  if (score >= 800) return 'text-emerald-500 bg-emerald-500';
  if (score >= 740) return 'text-green-500 bg-green-500';
  if (score >= 670) return 'text-blue-500 bg-blue-500';
  if (score >= 580) return 'text-orange-500 bg-orange-500';
  return 'text-red-500 bg-red-500';
}

export function getScoreLabel(score: number | null): string {
  if (!score) return 'No Score';
  if (score >= 800) return 'Exceptional';
  if (score >= 740) return 'Very Good';
  if (score >= 670) return 'Good';
  if (score >= 580) return 'Fair';
  return 'Poor';
}

export function getScorePercentage(score: number | null): number {
  if (!score) return 0;
  // VantageScore range is 300-850
  return ((score - 300) / 550) * 100;
}

export async function getCreditReportData(userId: string): Promise<CreditReportData> {
  const response = await fetch(`/api/credit-report?userId=${userId}`);
  if (!response.ok) {
    return {
      scores: {
        transunion: 0,
        experian: 0,
        equifax: 0,
      },
      accounts: [],
      inquiries: [],
      publicRecords: [],
      personalInfo: {} as any,
    };
  }
  return response.json();
}