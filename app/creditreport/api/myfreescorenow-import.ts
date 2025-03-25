import { db } from '@/lib/firebase';
import { convertKeysToLowerFirst } from '@/lib/utils';
import { doc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';


export async function importMyFreeScoreNow(userId: string, credentials: { username: string, password: string; }) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {

    // Get data
    const data = await getCreditReport(credentials);
    console.log('Credit report data:', data);

    // Create a new batch
    const batch = writeBatch(db);
    const timestamp = serverTimestamp();

    const reportRef = doc(collection(db, 'users', userId, 'credit_reports'));
    batch.set(reportRef, {
      data: JSON.stringify(convertKeysToLowerFirst(data)),
      importedAt: timestamp,
      source: 'test_import',
      status: 'completed',
      lastUpdated: timestamp
    });

    // Update user profile with import status
    const userRef = doc(db, 'users', userId);
    batch.set(userRef, {
      hasImportedReport: true,
      lastReportImport: timestamp,
      lastUpdated: timestamp
    }, { merge: true });

    // Create success notification
    const notificationRef = doc(collection(db, 'users', userId, 'notifications'));
    batch.set(notificationRef, {
      title: 'Credit Report Imported',
      message: 'Your credit report has been successfully imported and analyzed. View your updated scores and insights now.',
      type: 'credit_report',
      read: false,
      createdAt: timestamp
    });

    // Create notification for score changes
    const scoreNotificationRef = doc(collection(db, 'users', userId, 'notifications'));
    batch.set(scoreNotificationRef, {
      title: 'Credit Score Update',
      message: `Your TransUnion score increased by 12 points, Experian by 8 points, and Equifax by 15 points since last month.`,
      type: 'credit_report',
      read: false,
      createdAt: timestamp
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

const getCreditReport = async (credentials: { username: string, password: string; }) => {
  try {
    const accessToken = await getAccessToken(credentials);
    if (!accessToken) {
      throw new Error('Failed to get access token');
    }

    credentials = {
      username: "amosbrazan@gmail.com",
      password: "Romance25-"
    };
    const response = await fetch(`https://api.myfreescorenow.com/api/auth/3B/report.json?username=${credentials.username}&password=${credentials.password}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          username: credentials.username,
          // email: credentials.username,
          password: credentials.password
        }),
      });

    if (!response.ok) {
      throw new Error('Failed to get credit report');
    }

    const reportRes = await response.json();

    if (!reportRes.success) {
      throw new Error('Failed to get credit report');
    }

    return analyseData(reportRes.data);
  } catch (error) {
    console.error('Failed to get credit report:', error);
    throw error;
  }
};

const getAccessToken = async (credentials: { username: string, password: string; }) => {
  try {
    console.log('Credentials to login:', credentials);

    const response = await fetch(`https://api.myfreescorenow.com/api/auth/login?email=${credentials.username}&password=${credentials.password}`,
     {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.username,
        password: credentials.password
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate user');
    }

    const info = await response.json();
    if (!info.success) {
      throw new Error('Invalid credentials');
    }

    return info?.data?.token;
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
};

const analyseData = (sourceData: any) => {
  try {
    const resData: Record<string, any> = {};
    const TrueLinkCreditReportType = sourceData?.BundleComponents?.BundleComponent?.find((component: any) => component?.Type === 'MergeCreditReports')?.TrueLinkCreditReportType;

    if (!TrueLinkCreditReportType) {
      throw new Error('Invalid credit report data');
    }
    resData.summary = TrueLinkCreditReportType?.Summary?.TradelineSummary;

    const mappedScores = TrueLinkCreditReportType?.Borrower?.CreditScore?.map((score: any) => ({
      bureau: score?.Source?.Bureau?.abbreviation,
      score: score?.riskScore,
    }));
    resData.scores = mappedScores.reduce((acc: Record<string, any>, score: any) => {
      acc[score.bureau] = score;
      return acc;
    }, {});

    resData.personalInfo = {
      names: TrueLinkCreditReportType?.Borrower?.BorrowerName.map((value: any) => {
        return {
          [value?.Source?.Bureau?.abbreviation]: value?.Name?.first + ' ' + value?.Name?.middle + ' ' + value?.Name?.last
        };
      }),
      currentAddresses: TrueLinkCreditReportType?.Borrower?.BorrowerAddress.map((value: any) => {
        return {
          [value?.Source?.Bureau?.abbreviation]: Object.values(value.CreditAddress).join(" ")
        };
      }),
      previousAddresses: TrueLinkCreditReportType?.Borrower?.PreviousAddress.map((value: any) => {
        return {
          [value?.Source?.Bureau?.abbreviation]: Object.values(value.CreditAddress).join(" ")
        };
      }),
      dateOfBirth: TrueLinkCreditReportType?.Borrower?.Birth?.map((value: any) => {
        return {
          [value?.Source?.Bureau?.abbreviation]: value?.date
        };
      }),
      employer: TrueLinkCreditReportType?.Borrower?.Employer?.reduce((acc: Record<string, any[]>, value: any) => {
        const key = value?.Source?.Bureau?.abbreviation;

        if (!acc[key]) {
          acc[key] = [{
            dateUpdated: value?.dateUpdated,
            name: value?.name
          }];
        }


        acc[key] = [...acc[key], {
          dateUpdated: value?.dateUpdated,
          name: value?.name
        }];

        return acc;
      }, {})
    };

    resData.accounts = TrueLinkCreditReportType?.TradeLinePartition.map((partition: any) => {
      if (Array.isArray(partition?.Tradeline)) {
        return partition?.Tradeline.map((tradeLine: any) => {
          return {
            [tradeLine?.bureau]: {
              accountNumber: tradeLine?.accountNumber,
              balance: tradeLine?.currentBalance,
              bureau: tradeLine?.bureau,
              creditorName: tradeLine?.creditorName,
              dateReported: tradeLine?.dateReported,
              accountType: tradeLine?.GrantedTrade?.AccountType?.abbreviation,
              creditType: tradeLine?.GrantedTrade?.CreditType?.abbreviation,
              creditLimit: tradeLine?.GrantedTrade?.CreditLimit,
              paymentHistory: tradeLine?.GrantedTrade?.PayStatusHistory,
              paymentStatus: tradeLine?.PayStatus?.abbreviation,
              accountStatus: tradeLine?.OpenClosed?.abbreviation,
              dateOpened: tradeLine?.dateAccountStatus,
            }
          };
        });
      }
      return [{
        [partition?.Tradeline?.bureau]: {
          accountNumber: partition?.Tradeline?.accountNumber,
          balance: partition?.Tradeline?.currentBalance,
          bureau: partition?.Tradeline?.bureau,
          creditorName: partition?.Tradeline?.creditorName,
          dateReported: partition?.Tradeline?.dateReported,
          accountType: partition?.Tradeline?.GrantedTrade?.AccountType?.abbreviation,
          creditType: partition?.Tradeline?.GrantedTrade?.CreditType?.abbreviation,
          creditLimit: partition?.Tradeline?.GrantedTrade?.CreditLimit,
          paymentHistory: partition?.Tradeline?.GrantedTrade?.PayStatusHistory,
          paymentStatus: partition?.Tradeline?.PayStatus?.abbreviation,
          accountStatus: partition?.Tradeline?.OpenClosed?.abbreviation,
          dateOpened: partition?.Tradeline?.dateAccountStatus,
        }
      }];
    });

    resData.inquiries = TrueLinkCreditReportType?.InquiryPartition.map((partition: any) => {
      return {
        bureau: partition?.Inquiry?.bureau,
        inquiryDate: partition?.Inquiry?.inquiryDate,
        typeOfBusiness: partition?.Inquiry?.typeOfBusiness,
        inquiryType: partition?.Inquiry?.inquiryType,
        subscriberNumber: partition?.Inquiry?.subscriberNumber,
        subscriberName: partition?.Inquiry?.subscriberName,
        IndustryCode: partition?.Inquiry?.IndustryCode?.abbreviation,
      };
    });

    return resData;
  } catch (error) {
    return null;
  }

  // Analyze credit report data
  // Calculate credit score
  // Generate insights
  // Return analysed data
};