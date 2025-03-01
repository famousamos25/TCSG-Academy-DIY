'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { VantageScoreTooltip } from '@/components/vantagescore-tooltip';
import {
  FileText,
  Clock,
  Info,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/date-utils';
import { getScoreColor, getScoreLabel, getScorePercentage } from '@/lib/credit-report';

interface CreditReport {
  data: {
    scores: {
      transunion: number;
      experian: number;
      equifax: number;
    };
    changes: {
      transunion: string;
      experian: string;
      equifax: string;
    };
    totalDebt: {
      transunion: number;
      experian: number;
      equifax: number;
    };
    creditUsage: {
      transunion: number;
      experian: number;
      equifax: number;
    };
  };
  importedAt: any;
}

interface AccountsOverview {
  inDispute: number;
  deleted: number;
  new: number;
  updated: number;
  inquiries: number;
}

export default function DisputeOverviewPage() {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [creditReport, setCreditReport] = useState<CreditReport | null>(null);
  const [accountsOverview, setAccountsOverview] = useState<AccountsOverview>({
    inDispute: 6,
    deleted: 0,
    new: 0,
    updated: 0,
    inquiries: 3,
  });

  useEffect(() => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'users', user.uid, 'credit_reports'),
        orderBy('importedAt', 'desc'),
        limit(1)
      );

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          if (!snapshot.empty) {
            const reportData = snapshot.docs[0].data() as CreditReport;
            setCreditReport(reportData);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching credit report:', error);
          toast({
            title: 'Error',
            description: 'Failed to load credit report data',
            variant: 'destructive',
          });
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up credit report listener:', error);
      setLoading(false);
    }
  }, [user, toast]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="h-8 w-8 animate-spin text-brand-yellow" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Dispute Overview</h1>
          <div className="flex items-center text-sm text-gray-600">
            <VantageScoreTooltip>
              <div className="flex items-center cursor-help">
                <span className="mr-2">VantageScore 3.0</span>
                <Info className="h-4 w-4" />
              </div>
            </VantageScoreTooltip>
            {creditReport && (
              <>
                <span className="mx-4">•</span>
                <span className="mr-4">
                  Last Updated: {formatDate(creditReport.importedAt)}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-brand-navy text-brand-navy hover:bg-brand-navy/10"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button
            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Credit Scores Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {creditReport && ['transunion', 'experian', 'equifax'].map((bureau) => {
          const score = creditReport.data.scores[bureau as keyof typeof creditReport.data.scores];
          const change = creditReport.data.changes[bureau as keyof typeof creditReport.data.changes];
          const totalDebt = creditReport.data.totalDebt[bureau as keyof typeof creditReport.data.totalDebt];
          const usage = creditReport.data.creditUsage[bureau as keyof typeof creditReport.data.creditUsage];

          return (
            <Card key={bureau} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold capitalize">{bureau}</h3>
                <div className="flex items-center space-x-3">
                  <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </span>
                  {change && (
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-medium ${
                        Number(change) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {change}
                      </span>
                      <span className="text-xs text-gray-500">30 days</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`h-2 w-2 rounded-full ${getScoreColor(score)}`} />
                    <span className="text-sm font-medium text-gray-600">
                      {getScoreLabel(score)}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getScoreColor(score)} transition-all duration-500`}
                      style={{ width: `${getScorePercentage(score)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">Total Debt</div>
                    <span className="text-lg font-semibold text-gray-900">
                      ${totalDebt.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">Credit Usage</div>
                    <span className="text-lg font-semibold text-gray-900">
                      {usage}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Accounts Overview */}
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-brand-navy mb-6">Accounts Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Accounts In-Dispute</div>
              <div className="text-2xl font-bold text-brand-navy">{accountsOverview.inDispute}</div>
              <Progress value={(accountsOverview.inDispute / 10) * 100} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Accounts Deleted</div>
              <div className="text-2xl font-bold text-brand-navy">{accountsOverview.deleted}</div>
              <Progress value={(accountsOverview.deleted / 10) * 100} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">New Accounts</div>
              <div className="text-2xl font-bold text-brand-navy">{accountsOverview.new}</div>
              <Progress value={(accountsOverview.new / 10) * 100} className="h-1" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Inquiries</div>
              <div className="text-2xl font-bold text-brand-navy">{accountsOverview.inquiries}</div>
              <Progress value={(accountsOverview.inquiries / 10) * 100} className="h-1" />
            </div>
          </div>
        </div>
      </Card>

      {/* Accounts Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-brand-navy">Accounts Status</h2>
            <Button variant="outline" className="text-brand-navy border-brand-navy hover:bg-brand-navy/10">
              View All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>FURNISHER</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>ACCOUNT DETAILS</TableHead>
                  <TableHead>TRANSUNION</TableHead>
                  <TableHead>EXPERIAN</TableHead>
                  <TableHead>EQUIFAX</TableHead>
                  <TableHead>CREDITOR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    furnisher: 'AMEX',
                    type: 'Account',
                    details: '3499929866639103',
                    status: {
                      transunion: 'In Dispute',
                      experian: 'In Dispute',
                      equifax: 'In Dispute',
                      creditor: 'Not Disputed'
                    }
                  },
                  {
                    furnisher: 'CAP ONE',
                    type: 'Account',
                    details: '517805808240',
                    status: {
                      transunion: 'In Dispute',
                      experian: 'In Dispute',
                      equifax: 'In Dispute',
                      creditor: 'Not Disputed'
                    }
                  }
                ].map((account, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{account.furnisher}</TableCell>
                    <TableCell>{account.type}</TableCell>
                    <TableCell>{account.details}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600">
                        {account.status.transunion}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600">
                        {account.status.experian}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600">
                        {account.status.equifax}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-600">
                        {account.status.creditor}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}