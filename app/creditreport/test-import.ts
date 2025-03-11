import { db } from '@/lib/firebase';
import { doc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';

// Test credit report data
const TEST_DATA = {
  scores: {
    transunion: 554,
    experian: 561,
    equifax: 563
  },
  changes: {
    transunion: '+12',
    experian: '+8',
    equifax: '+15'
  },
  totalDebt: {
    transunion: 26770,
    experian: 26770,
    equifax: 26770
  },
  creditUsage: {
    transunion: 64,
    experian: 64,
    equifax: 64
  },
  accounts: [
    {
      id: 'test_account_1',
      creditorName: 'HYUNDAI FINC',
      accountNumber: '20210101372143',
      accountType: 'Auto Loan',
      balance: 26770,
      originalAmount: 35000,
      monthlyPayment: 525,
      paymentStatus: 'Late 30 Days',
      dateOpened: '2021-01-01',
      lastUpdated: '2024-02-20',
      status: 'Open',
      creditLimit: null,
      pastDueAmount: 525
    },
    {
      id: 'test_account_2',
      creditorName: 'CAPITAL ONE',
      accountNumber: '4147********1234',
      accountType: 'Credit Card',
      balance: 3200,
      originalAmount: null,
      creditLimit: 5000,
      monthlyPayment: 96,
      paymentStatus: 'Current',
      dateOpened: '2020-06-15',
      lastUpdated: '2024-02-20',
      status: 'Open',
      pastDueAmount: 0
    },
    {
      id: 'test_account_3',
      creditorName: 'AMEX',
      accountNumber: '3499********9103',
      accountType: 'Credit Card',
      balance: 12500,
      originalAmount: null,
      creditLimit: 15000,
      monthlyPayment: 375,
      paymentStatus: 'Late 60 Days',
      dateOpened: '2019-03-10',
      lastUpdated: '2024-02-20',
      status: 'Open',
      pastDueAmount: 750
    },
    {
      id: 'test_account_4',
      creditorName: 'DISCOVER',
      accountNumber: '6011********4321',
      accountType: 'Credit Card',
      balance: 8900,
      originalAmount: null,
      creditLimit: 10000,
      monthlyPayment: 267,
      paymentStatus: 'Late 90 Days',
      dateOpened: '2018-11-25',
      lastUpdated: '2024-02-20',
      status: 'Open',
      pastDueAmount: 801
    }
  ],
  summary: {
    totalAccounts: 27,
    openAccounts: 10,
    closedAccounts: 17,
    delinquentAccounts: 2,
    derogatoryAccounts: 15,
    totalBalance: 54351,
    totalMonthlyPayment: 699,
    creditUtilization: 64
  }
};

export async function importTestReport(userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    // Create a new batch
    const batch = writeBatch(db);
    
    // Create report document with proper timestamp
    const reportRef = doc(collection(db, 'users', userId, 'credit_reports'));
    
    batch.set(reportRef, {
      data: TEST_DATA,
      importedAt: serverTimestamp(),
      source: 'test_import',
      status: 'completed',
      lastUpdated: serverTimestamp()
    });

    // Update user profile with import status
    const userRef = doc(db, 'users', userId);
    batch.set(userRef, {
      hasImportedReport: true,
      lastReportImport: serverTimestamp(),
      lastUpdated: serverTimestamp()
    }, { merge: true });

    // Create success notification
    const notificationRef = doc(collection(db, 'users', userId, 'notifications'));
    batch.set(notificationRef, {
      title: 'Credit Report Imported',
      message: 'Your credit report has been successfully imported and analyzed. View your updated scores and insights now.',
      type: 'credit_report',
      read: false,
      createdAt: serverTimestamp()
    });

    // Create notification for score changes
    const scoreNotificationRef = doc(collection(db, 'users', userId, 'notifications'));
    batch.set(scoreNotificationRef, {
      title: 'Credit Score Update',
      message: `Your TransUnion score increased by 12 points, Experian by 8 points, and Equifax by 15 points since last month.`,
      type: 'credit_report',
      read: false,
      createdAt: serverTimestamp()
    });

    // Commit all changes
    await batch.commit();

    return { 
      success: true,
      message: 'Test credit report data imported successfully'
    };
  } catch (error) {
    console.error('Import test report error:', error);
    throw error;
  }
}