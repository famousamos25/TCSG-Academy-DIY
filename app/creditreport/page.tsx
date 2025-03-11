'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { VantageScoreTooltip } from '@/components/vantagescore-tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import {
  Upload,
  FileText,
  Download,
  Filter,
  CreditCard,
  Home,
  Car,
  GraduationCap,
  Wallet,
  User,
  RefreshCw,
  AlertCircle,
  Info
} from 'lucide-react';
import { CreditReportImportDialog } from '@/components/credit-report-import-dialog';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { formatDate, calculateNextRefresh } from '@/lib/date-utils';
import { getScoreColor, getScoreLabel, getScorePercentage } from '@/lib/credit-report';
import { convertKeysToLowerFirst } from '@/lib/utils';
import CreditSummaryDashboard from './credit-summary';

// Account type options for filtering
const ACCOUNT_TYPES = [
  { value: 'all', label: 'All Accounts', icon: CreditCard },
  { value: 'creditCard', label: 'Credit Cards', icon: CreditCard },
  { value: 'mortgage', label: 'Mortgages', icon: Home },
  { value: 'autoLoan', label: 'Auto Loans', icon: Car },
  { value: 'studentLoan', label: 'Student Loans', icon: GraduationCap },
  { value: 'personalLoan', label: 'Personal Loans', icon: Wallet },
];

export default function CreditReportPage() {
  const [activeTab, setActiveTab] = useState('accounts');
  const [accountFilter, setAccountFilter] = useState('all');
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
      change: creditReport?.data?.changes?.transunion || null,
      totalDebt: creditReport?.data?.totalDebt?.transunion || 0,
      creditUsage: creditReport?.data?.creditUsage?.transunion || 0,
    },
    {
      name: 'Experian',
      logo: 'https://i.imgur.com/bCRS33i.png',
      score: creditReport?.data?.scores?.experian?.score || null,
      change: creditReport?.data?.changes?.experian || null,
      totalDebt: creditReport?.data?.totalDebt?.experian || 0,
      creditUsage: creditReport?.data?.creditUsage?.experian || 0,
    },
    {
      name: 'Equifax',
      logo: 'https://i.imgur.com/6lhqUyI.png',
      score: creditReport?.data?.scores?.equifax?.score || null,
      change: creditReport?.data?.changes?.equifax || null,
      totalDebt: creditReport?.data?.totalDebt?.equifax || 0,
      creditUsage: creditReport?.data?.creditUsage?.equifax || 0,
    },
  ];


  console.log('creditReport', creditReport);
  

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
                <>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`h-2 w-2 rounded-full ${getScoreColor(bureau.score)}`} />
                      <span className="text-sm font-medium text-gray-600">
                        {getScoreLabel(bureau.score)}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getScoreColor(bureau.score)}`}
                        style={{ width: `${getScorePercentage(bureau.score)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>300</span>
                      <span>850</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600 mb-1">Total Debt</div>
                      <span className="text-lg font-semibold text-gray-900">
                        ${bureau.totalDebt.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600 mb-1">Credit Usage</div>
                      <span className="text-lg font-semibold text-gray-900">
                        {bureau.creditUsage}%
                      </span>
                    </div>
                  </div>
                </>
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

      {/* Main Content */}
      <Card className="mb-6 border-none">
        <Tabs value={activeTab} className='border-b-none' onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start gap-6">
            <TabsTrigger value="accounts" className="">Accounts</TabsTrigger>
            <TabsTrigger value="inquiries" className="">Inquiries</TabsTrigger>
            <TabsTrigger value="personalInfo" className="">Personal Info</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="p-6">
            {hasImportedReport ? (
              <>
                {/* <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <Select value={accountFilter} onValueChange={setAccountFilter}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACCOUNT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              {type.icon && <type.icon className="h-4 w-4 mr-2" />}
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div> */}

                <div className="space-y-6_ grid grid-cols-3 gap-4">
                  {creditReport.data.accounts.map((account: any, idx: number) => {

                    const info = account[0];
                    if (!info) return;

                    const values: any = Object.values(info)[0];
                    console.log('values', values);


                    return (
                      <Card key={idx} className="p-6">
                        <div className="flex_ items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="text-xl font-semibold text-brand-navy">
                                {values.creditorName}
                              </h3>
                              <Badge variant={account.accountStatus === 'Open' ? 'success' : 'secondary'}>
                                {values.accountStatus}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              Account #{values.accountNumber} • {values.accountType}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-brand-navy">
                              ${values?.balance}
                            </div>
                            <p className="text-sm text-gray-600">Current Balance</p>
                          </div>
                        </div>

                        <div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Account Number:</span>
                              <span className='truncate'>{values?.accountNumber}</span>
                            </div>
                            {values.creditLimit && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Credit Limit</span>
                                <span>${values?.creditLimit?.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">Balance:</span>
                              <span>${values?.balance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Payment Status:</span>
                              <span>{values?.paymentStatus}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Account Status:</span>
                              <span>{values?.accountStatus}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Account Type:</span>
                              <span>{values?.accountType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date Opened:</span>
                              <span>{values?.dateOpened}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
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