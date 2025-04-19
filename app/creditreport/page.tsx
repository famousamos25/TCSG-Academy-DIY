'use client';

import ScoreGauge from '@/components/common/score-gauge';
import { CreditReportImportDialog } from '@/components/credit-report-import-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VantageScoreTooltip } from '@/components/vantagescore-tooltip';
import { useToast } from '@/hooks/use-toast';
import { getScoreColor } from '@/lib/credit-report';
import { calculateNextRefresh, formatDate } from '@/lib/date-utils';
import { auth, db } from '@/lib/firebase';
import { convertKeysToLowerFirst } from '@/lib/utils';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import {
  AlertCircle,
  CreditCard,
  Download,
  Info,
  RefreshCw,
  Upload,
  User
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AccountCard from './components/account-card';
import CreditSummaryDashboard from './components/credit-summary';
import PersonalInformation from './components/personal-information';

export default function CreditReportPage() {
  const [activeTab, setActiveTab] = useState('accounts');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [creditReport, setCreditReport] = useState<any>(null);  

  useEffect(() => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'users', user.uid, 'credit_reports'),
        orderBy('importedAt', 'desc'),
        limit(1)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const reportData = snapshot.docs[0].data();
          setCreditReport({
            ...reportData,
            data: typeof reportData.data === "string" ? convertKeysToLowerFirst(JSON.parse(reportData.data)) : reportData.data,
          });
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching credit report:', error);
        toast({
          title: 'Error',
          description: 'Failed to load credit report data',
          variant: 'destructive',
        });
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up credit report listener:', error);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const hasImportedReport = !!creditReport;

  // Update BUREAU_DATA with actual values from the credit report
  const BUREAU_DATA = [
    {
      name: 'TransUnion',
      logo: 'https://i.imgur.com/a48jzVj.png',
      score: creditReport?.data?.scores?.transUnion?.score || null,
      totalDebt: creditReport?.data?.summary?.transUnion?.totalBalances || 0,
      change: creditReport?.data?.changes?.transunion || null,
      creditUsage: creditReport?.data?.creditUsage?.transunion || 0,
    },
    {
      name: 'Experian',
      logo: 'https://i.imgur.com/bCRS33i.png',
      score: creditReport?.data?.scores?.experian?.score || null,
      totalDebt: creditReport?.data?.summary?.experian?.totalBalances || 0,
      change: creditReport?.data?.changes?.experian || null,
      creditUsage: creditReport?.data?.creditUsage?.experian || 0,
    },
    {
      name: 'Equifax',
      logo: 'https://i.imgur.com/6lhqUyI.png',
      score: creditReport?.data?.scores?.equifax?.score || null,
      totalDebt: creditReport?.data?.summary?.equifax?.totalBalances || 0,
      change: creditReport?.data?.changes?.equifax || null,
      creditUsage: creditReport?.data?.creditUsage?.equifax || 0,
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 text-brand-yellow animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading credit report data...</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('creditReport:', creditReport);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-navy mb-2">Credit Report & Analysis</h1>
          <div className="flex items-center text-sm text-gray-600">
            <VantageScoreTooltip>
              <div className="flex items-center cursor-help">
                <span className="mr-2">VantageScore 3.0</span>
                <Info className="h-4 w-4" />
              </div>
            </VantageScoreTooltip>
            {hasImportedReport ? (
              <>
                <span className="mx-4">•</span>
                <span className="mr-4">
                  Last Updated: {formatDate(creditReport?.importedAt)}
                </span>
                <span className="mx-4">•</span>
                <span>Next Refresh In: {calculateNextRefresh(creditReport?.importedAt)}</span>
              </>
            ) : (
              <span className="ml-4">Import your credit report to view your scores</span>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-brand-navy text-brand-navy hover:bg-brand-navy/10"
            disabled={!hasImportedReport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button
            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            onClick={() => setImportDialogOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import New Report
          </Button>
        </div>
      </div>

      {/* Bureau Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {BUREAU_DATA.map((bureau) => (
          <Card key={bureau.name} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-24 h-8">
                <Image
                  src={bureau.logo}
                  alt={`${bureau.name} logo`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-3xl font-bold ${getScoreColor(bureau.score)}`}>
                  {bureau.score || '---'}
                </span>
                {bureau.score && (
                  <div className="flex flex-col items-end">
                    <span className={`text-sm font-medium ${Number(bureau.score) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {bureau.score >= 0 ? '+' : ''}{bureau.score}
                    </span>
                    <span className="text-xs text-gray-500">Last 30 days</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {bureau.score ? (
                <ScoreGauge score={Number(bureau.score)} />
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No score available</p>
                  <p className="text-sm text-gray-400 mt-1">Import your report to view score</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <CreditSummaryDashboard creditData={creditReport?.data?.summary} />

      <PersonalInformation personalInfo={creditReport?.data?.personalInfo} />

      {/* Main Content */}
      <Card className="mb-6 border-none">
        <Tabs value={activeTab} className='border-b-none' onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="accounts" className="">Accounts ({ creditReport?.data?.accounts?.length || 0 })</TabsTrigger>
            <TabsTrigger value="derogatory" className="">Derogatory</TabsTrigger>
            <TabsTrigger value="inquiries" className="">Inquiries</TabsTrigger>
            <TabsTrigger value="publicRecords" className="">Public Records</TabsTrigger>
            <TabsTrigger value="latePayments" className="">Late Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="p-6">
            {hasImportedReport ? (
              <>
                <div className="space-y-6_ grid grid-cols-3 gap-4">
                  {creditReport.data.accounts.map((account: any, idx: number) => {
                    const info = account[0];                    
                    if (!info) return;
                    return (
                      <AccountCard key={idx} values={info} account={account} creditors={creditReport?.data?.creditors ?? []} />
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Accounts Found</h3>
                <p className="text-gray-600 mb-6">
                  Import your credit report to view your account information
                </p>
                <Button
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  onClick={() => setImportDialogOpen(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Credit Report
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="inquiries" className="p-6">
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Inquiries Found</h3>
              <p className="text-gray-600 mb-6">
                Import your credit report to view your credit inquiries
              </p>
              <Button
                className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                onClick={() => setImportDialogOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Credit Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="personalInfo" className="p-6">
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information Not Available</h3>
              <p className="text-gray-600 mb-6">
                Import your credit report to view your personal information
              </p>
              <Button
                className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                onClick={() => setImportDialogOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Credit Report
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <CreditReportImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
      />
    </div>
  );
}