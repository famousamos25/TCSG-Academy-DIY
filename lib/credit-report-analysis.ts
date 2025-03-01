import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { openai } from '@/lib/openai';

export interface CreditReportData {
  accounts: Account[];
  inquiries: Inquiry[];
  personalInfo: PersonalInfo;
  publicRecords: PublicRecord[];
  scores: {
    transunion?: number;
    experian?: number;
    equifax?: number;
  };
}

export interface Account {
  id: string;
  creditorName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  creditLimit?: number;
  paymentStatus: string;
  dateOpened: string;
  lastReported: string;
  monthlyPayment?: number;
  highestBalance?: number;
  termMonths?: number;
  latePayments?: {
    '30days': number;
    '60days': number;
    '90days': number;
  };
  bureauReporting: {
    transunion: boolean;
    experian: boolean;
    equifax: boolean;
  };
  disputeStatus?: {
    transunion?: 'not_disputed' | 'in_dispute' | 'completed';
    experian?: 'not_disputed' | 'in_dispute' | 'completed';
    equifax?: 'not_disputed' | 'in_dispute' | 'completed';
  };
}

export interface Inquiry {
  id: string;
  creditorName: string;
  inquiryDate: string;
  inquiryType: string;
  bureauReporting: {
    transunion: boolean;
    experian: boolean;
    equifax: boolean;
  };
}

export interface PersonalInfo {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  addresses: Array<{
    street: string;
    city: string;
    state: string;
    zipcode: string;
    dateReported: string;
  }>;
  employers: Array<{
    name: string;
    dateReported: string;
  }>;
  phoneNumbers: string[];
}

export interface PublicRecord {
  id: string;
  type: string;
  courtName?: string;
  referenceNumber?: string;
  dateReported: string;
  amount?: number;
  status: string;
  bureauReporting: {
    transunion: boolean;
    experian: boolean;
    equifax: boolean;
  };
}

export interface AnalysisResult {
  accounts: {
    total: number;
    open: number;
    closed: number;
    negative: number;
    positive: number;
    disputeRecommendations: Array<{
      accountId: string;
      creditorName: string;
      reason: string;
      priority: 'high' | 'medium' | 'low';
      successProbability: number;
      bureaus: string[];
    }>;
  };
  inquiries: {
    total: number;
    recent: number;
    disputeRecommendations: Array<{
      inquiryId: string;
      creditorName: string;
      reason: string;
      priority: 'high' | 'medium' | 'low';
      successProbability: number;
      bureaus: string[];
    }>;
  };
  personalInfo: {
    discrepancies: Array<{
      field: string;
      description: string;
      bureaus: string[];
    }>;
  };
  publicRecords: {
    total: number;
    disputeRecommendations: Array<{
      recordId: string;
      type: string;
      reason: string;
      priority: 'high' | 'medium' | 'low';
      successProbability: number;
      bureaus: string[];
    }>;
  };
  overallStrategy: {
    steps: string[];
    timeline: string;
    expectedOutcomes: string[];
  };
}

/**
 * Analyzes a credit report and provides dispute recommendations
 */
export async function analyzeCreditReport(
  userId: string,
  reportData: CreditReportData
): Promise<AnalysisResult> {
  try {
    // For demo purposes, we'll return a mock analysis
    // In production, this would use OpenAI to analyze the report
    const mockAnalysis: AnalysisResult = {
      accounts: {
        total: reportData.accounts.length,
        open: reportData.accounts.filter(a => a.paymentStatus !== 'Closed').length,
        closed: reportData.accounts.filter(a => a.paymentStatus === 'Closed').length,
        negative: reportData.accounts.filter(a => 
          a.paymentStatus.includes('Late') || 
          a.paymentStatus.includes('Collection') || 
          a.paymentStatus.includes('Charge-off')
        ).length,
        positive: reportData.accounts.filter(a => 
          a.paymentStatus === 'Current' || 
          a.paymentStatus === 'Paid as Agreed'
        ).length,
        disputeRecommendations: generateAccountDisputeRecommendations(reportData.accounts)
      },
      inquiries: {
        total: reportData.inquiries.length,
        recent: reportData.inquiries.filter(i => {
          const inquiryDate = new Date(i.inquiryDate);
          const twoYearsAgo = new Date();
          twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
          return inquiryDate > twoYearsAgo;
        }).length,
        disputeRecommendations: generateInquiryDisputeRecommendations(reportData.inquiries)
      },
      personalInfo: {
        discrepancies: generatePersonalInfoDiscrepancies(reportData.personalInfo)
      },
      publicRecords: {
        total: reportData.publicRecords.length,
        disputeRecommendations: generatePublicRecordDisputeRecommendations(reportData.publicRecords)
      },
      overallStrategy: {
        steps: [
          "1. Dispute high-priority negative accounts first",
          "2. Address personal information discrepancies",
          "3. Dispute recent inquiries",
          "4. Address public records",
          "5. Follow up on unresolved disputes after 30 days"
        ],
        timeline: "3-6 months for significant improvement",
        expectedOutcomes: [
          "Removal of 30-40% of negative items",
          "Correction of personal information",
          "Potential score increase of 30-70 points"
        ]
      }
    };

    // Save analysis to Firestore
    await addDoc(collection(db, 'users', userId, 'credit_analyses'), {
      analysis: mockAnalysis,
      reportData: reportData,
      createdAt: serverTimestamp()
    });

    return mockAnalysis;
  } catch (error) {
    console.error('Error analyzing credit report:', error);
    throw error;
  }
}

/**
 * Extracts structured data from a PDF credit report using OCR
 */
export async function extractCreditReportFromPDF(
  userId: string,
  fileBuffer: ArrayBuffer
): Promise<CreditReportData> {
  try {
    // In a real implementation, this would use OCR to extract data from the PDF
    // For demo purposes, we'll return mock data
    
    // Log the extraction attempt
    await addDoc(collection(db, 'users', userId, 'extraction_logs'), {
      fileType: 'pdf',
      fileSize: fileBuffer.byteLength,
      status: 'completed',
      createdAt: serverTimestamp()
    });

    // Return mock data
    return getMockCreditReportData();
  } catch (error) {
    console.error('Error extracting credit report from PDF:', error);
    throw error;
  }
}

/**
 * Generates dispute recommendations for accounts
 */
function generateAccountDisputeRecommendations(accounts: Account[]) {
  const recommendations = [];
  
  for (const account of accounts) {
    // Only recommend disputes for negative accounts
    if (
      account.paymentStatus.includes('Late') || 
      account.paymentStatus.includes('Collection') || 
      account.paymentStatus.includes('Charge-off')
    ) {
      let reason = '';
      let priority: 'high' | 'medium' | 'low' = 'medium';
      let successProbability = 0.5;
      
      // Determine reason and priority based on account details
      if (account.paymentStatus.includes('Collection')) {
        reason = 'Request debt validation under FDCPA';
        priority = 'high';
        successProbability = 0.7;
      } else if (account.paymentStatus.includes('Charge-off')) {
        reason = 'Account information is inaccurate';
        priority = 'high';
        successProbability = 0.6;
      } else if (account.paymentStatus.includes('Late')) {
        reason = 'Late payment was made on time';
        priority = 'medium';
        successProbability = 0.5;
      }
      
      // Determine which bureaus to dispute with
      const bureaus = [];
      if (account.bureauReporting.transunion) bureaus.push('TransUnion');
      if (account.bureauReporting.experian) bureaus.push('Experian');
      if (account.bureauReporting.equifax) bureaus.push('Equifax');
      
      recommendations.push({
        accountId: account.id,
        creditorName: account.creditorName,
        reason,
        priority,
        successProbability: successProbability * 100,
        bureaus
      });
    }
  }
  
  // Sort by priority (high to low)
  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Generates dispute recommendations for inquiries
 */
function generateInquiryDisputeRecommendations(inquiries: Inquiry[]) {
  const recommendations = [];
  
  for (const inquiry of inquiries) {
    // Only recommend disputes for recent inquiries
    const inquiryDate = new Date(inquiry.inquiryDate);
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    if (inquiryDate > twoYearsAgo) {
      // Determine which bureaus to dispute with
      const bureaus = [];
      if (inquiry.bureauReporting.transunion) bureaus.push('TransUnion');
      if (inquiry.bureauReporting.experian) bureaus.push('Experian');
      if (inquiry.bureauReporting.equifax) bureaus.push('Equifax');
      
      recommendations.push({
        inquiryId: inquiry.id,
        creditorName: inquiry.creditorName,
        reason: 'Inquiry made without permission',
        priority: 'medium' as 'high' | 'medium' | 'low',
        successProbability: 40,
        bureaus
      });
    }
  }
  
  return recommendations;
}

/**
 * Generates personal information discrepancies
 */
function generatePersonalInfoDiscrepancies(personalInfo: PersonalInfo) {
  // In a real implementation, this would compare personal info across bureaus
  // For demo purposes, we'll return mock discrepancies
  return [
    {
      field: 'Address',
      description: 'Previous address still showing as current',
      bureaus: ['TransUnion', 'Experian']
    },
    {
      field: 'Employment',
      description: 'Outdated employer information',
      bureaus: ['Equifax']
    }
  ];
}

/**
 * Generates dispute recommendations for public records
 */
function generatePublicRecordDisputeRecommendations(publicRecords: PublicRecord[]) {
  const recommendations = [];
  
  for (const record of publicRecords) {
    // Determine which bureaus to dispute with
    const bureaus = [];
    if (record.bureauReporting.transunion) bureaus.push('TransUnion');
    if (record.bureauReporting.experian) bureaus.push('Experian');
    if (record.bureauReporting.equifax) bureaus.push('Equifax');
    
    recommendations.push({
      recordId: record.id,
      type: record.type,
      reason: 'Public record information is inaccurate or outdated',
      priority: 'high' as 'high' | 'medium' | 'low',
      successProbability: 30,
      bureaus
    });
  }
  
  return recommendations;
}

/**
 * Returns mock credit report data for testing
 */
function getMockCreditReportData(): CreditReportData {
  return {
    accounts: [
      {
        id: 'acc_1',
        creditorName: 'CHASE BANK',
        accountNumber: 'XXXX-XXXX-1234',
        accountType: 'Credit Card',
        balance: 2500,
        creditLimit: 5000,
        paymentStatus: 'Current',
        dateOpened: '2018-05-15',
        lastReported: '2023-02-10',
        monthlyPayment: 100,
        bureauReporting: {
          transunion: true,
          experian: true,
          equifax: true
        }
      },
      {
        id: 'acc_2',
        creditorName: 'BANK OF AMERICA',
        accountNumber: 'XXXX-XXXX-5678',
        accountType: 'Auto Loan',
        balance: 12000,
        paymentStatus: 'Late 30 Days',
        dateOpened: '2020-03-20',
        lastReported: '2023-02-15',
        monthlyPayment: 350,
        termMonths: 60,
        latePayments: {
          '30days': 1,
          '60days': 0,
          '90days': 0
        },
        bureauReporting: {
          transunion: true,
          experian: true,
          equifax: true
        }
      },
      {
        id: 'acc_3',
        creditorName: 'MIDLAND CREDIT',
        accountNumber: 'XXXX1234',
        accountType: 'Collection',
        balance: 750,
        paymentStatus: 'Collection',
        dateOpened: '2021-08-10',
        lastReported: '2023-01-20',
        bureauReporting: {
          transunion: true,
          experian: false,
          equifax: true
        }
      },
      {
        id: 'acc_4',
        creditorName: 'CAPITAL ONE',
        accountNumber: 'XXXX-XXXX-9012',
        accountType: 'Credit Card',
        balance: 0,
        creditLimit: 2000,
        paymentStatus: 'Closed',
        dateOpened: '2017-11-05',
        lastReported: '2022-10-15',
        bureauReporting: {
          transunion: true,
          experian: true,
          equifax: true
        }
      },
      {
        id: 'acc_5',
        creditorName: 'DISCOVER',
        accountNumber: 'XXXX-XXXX-3456',
        accountType: 'Credit Card',
        balance: 4200,
        creditLimit: 4500,
        paymentStatus: 'Current',
        dateOpened: '2019-07-22',
        lastReported: '2023-02-18',
        monthlyPayment: 150,
        bureauReporting: {
          transunion: true,
          experian: true,
          equifax: true
        }
      }
    ],
    inquiries: [
      {
        id: 'inq_1',
        creditorName: 'COMENITY BANK',
        inquiryDate: '2022-12-05',
        inquiryType: 'Individual',
        bureauReporting: {
          transunion: true,
          experian: false,
          equifax: false
        }
      },
      {
        id: 'inq_2',
        creditorName: 'AMERICAN EXPRESS',
        inquiryDate: '2022-10-15',
        inquiryType: 'Individual',
        bureauReporting: {
          transunion: false,
          experian: true,
          equifax: true
        }
      },
      {
        id: 'inq_3',
        creditorName: 'SYNCHRONY BANK',
        inquiryDate: '2021-05-20',
        inquiryType: 'Individual',
        bureauReporting: {
          transunion: true,
          experian: true,
          equifax: false
        }
      }
    ],
    personalInfo: {
      name: {
        first: 'John',
        middle: 'A',
        last: 'Smith'
      },
      addresses: [
        {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipcode: '90210',
          dateReported: '2022-01-15'
        },
        {
          street: '456 Oak Ave',
          city: 'Somewhere',
          state: 'CA',
          zipcode: '90211',
          dateReported: '2020-05-10'
        }
      ],
      employers: [
        {
          name: 'ABC Company',
          dateReported: '2021-03-15'
        },
        {
          name: 'XYZ Corporation',
          dateReported: '2019-08-20'
        }
      ],
      phoneNumbers: ['(555) 123-4567', '(555) 987-6543']
    },
    publicRecords: [
      {
        id: 'pr_1',
        type: 'Civil Judgment',
        courtName: 'COUNTY COURT',
        referenceNumber: 'CV-2021-12345',
        dateReported: '2021-09-15',
        amount: 2500,
        status: 'Satisfied',
        bureauReporting: {
          transunion: true,
          experian: true,
          equifax: true
        }
      }
    ],
    scores: {
      transunion: 680,
      experian: 675,
      equifax: 690
    }
  };
}