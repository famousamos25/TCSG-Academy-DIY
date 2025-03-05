'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { VantageScoreTooltip } from '@/components/vantagescore-tooltip';
import Image from 'next/image';
import { PersonalInfoDialog } from '@/components/personal-info-dialog';
import { TutorialVideoDialog } from '@/components/tutorial-video-dialog';
import { CreditReportImportDialog } from '@/components/credit-report-import-dialog';
import { CreditScoreGoalDialog } from '@/components/credit-score-goal-dialog';
import { DigitalSignatureDialog } from '@/components/digital-signature-dialog';
import { ReferralProgramDialog } from '@/components/referral-program-dialog';
import {
  Info,
  ChevronRight,
  ChevronLeft,
  Target,
  UserPlus,
  Building,
  Upload,
  MonitorPlay,
  FileText,
  DollarSign,
  Blocks,
  TrendingUp,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, getDoc, setDoc } from 'firebase/firestore';
import { formatDate } from '@/lib/date-utils';
import { getScoreColor, getScoreLabel, getScorePercentage } from '@/lib/credit-report';

interface CreditGoals {
  purpose: string;
  currentScore: string;
  motivation: string;
  timeframe: string;
  targetScore: number;
  createdAt: Date;
}

interface ChecklistItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  primaryButton: string;
  secondaryButton?: string;
  completed: boolean;
  status: 'Incomplete' | 'Completed';
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    title: 'Learn How to Use TCSG Academy',
    icon: <MonitorPlay className="h-12 w-12" />,
    description:
      'Watch this quick tutorial to unlock the full benefits of TCSG Academy!',
    primaryButton: 'Watch Now',
    completed: false,
    status: 'Incomplete',
  },
  {
    title: 'Personal Information',
    icon: <UserPlus className="h-12 w-12" />,
    description:
      'Your profile is complete! TCSG Academy will auto-fill your dispute letters with the correct details, making the process seamless.',
    primaryButton: 'Update Info',
    secondaryButton: 'Tutorial',
    completed: false,
    status: 'Incomplete',
  },
  {
    title: 'Upload Credit Report',
    icon: <Upload className="h-12 w-12" />,
    description:
      'TCSG Academy AI has analyzed your report and generated insights. Check out your personalized Credit Analysis Report for next steps.',
    primaryButton: 'Update Report',
    secondaryButton: 'Tutorial',
    completed: false,
    status: 'Incomplete',
  },
  {
    title: 'Set Your Credit Score Goals',
    icon: <Target className="h-12 w-12" />,
    description:
      "We've customized your experience based on your goals. Update them anytime to stay on track with your credit journey.",
    primaryButton: 'Update Goals',
    completed: false,
    status: 'Incomplete',
  },
  {
    title: 'Digital Signature',
    icon: <FileText className="h-12 w-12" />,
    description:
      'Your signature secures your disputes and ensures your Declaration of Self-Representation is legally recognized, preventing stall tactics from creditors.',
    primaryButton: 'View Signature',
    completed: false,
    status: 'Incomplete',
  },
  {
    title: 'Become a TCSG Academy Affiliate',
    icon: <DollarSign className="h-12 w-12" />,
    description:
      "Share TCSG Academy with your network and earn 30% of every friend's subscription. Help people while making extra cash!",
    primaryButton: 'Start Earning',
    completed: false,
    status: 'Incomplete',
  },
  {
    title: 'Build Your Credit Profile',
    icon: <Blocks className="h-12 w-12" />,
    description:
      'Credit builder programs help you establish or rebuild credit with small, manageable steps. Start building your profile today.',
    primaryButton: 'Start Building Credit',
    completed: false,
    status: 'Incomplete',
  },
  // {
  //   title: 'Become An Authorize User',
  //   icon: <UserCheck className="h-12 w-12" />,
  //   description:
  //     'Get added as an authorized user on a trusted credit card to boost your credit age and lower utilization—without extra spending.',
  //   primaryButton: 'Become An Authorized User',
  //   completed: false,
  //   status: 'Incomplete',
  // },
];

export default function DashboardPage() {
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [tutorialVideoOpen, setTutorialVideoOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [creditScoreGoalOpen, setCreditScoreGoalOpen] = useState(false);
  const [digitalSignatureOpen, setDigitalSignatureOpen] = useState(false);
  const [referralProgramOpen, setReferralProgramOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creditReport, setCreditReport] = useState<any>(null);
  const [creditGoals, setCreditGoals] = useState<CreditGoals | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(CHECKLIST_ITEMS.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [user] = useAuthState(auth);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(CHECKLIST_ITEMS);

  useEffect(() => {
    if (!user) return;

    try {
      // Fetch credit report
      const q = query(
        collection(db, 'users', user.uid, 'credit_reports'),
        orderBy('importedAt', 'desc'),
        limit(1)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const reportData = snapshot.docs[0].data();
            setCreditReport(reportData);
            
            // Update Upload Credit Report checklist item
            setChecklistItems(prev => prev.map(item => 
              item.title === 'Upload Credit Report' 
                ? { ...item, completed: true, status: 'Completed' } 
                : item
            ));
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching credit report:', error);
          setLoading(false);
        }
      );

      // Check personal info completion
      const checkPersonalInfo = async () => {
        try {
          const docRef = doc(db, 'users', user.uid, 'personal_info', 'details');
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Update Personal Information checklist item
            setChecklistItems(prev => prev.map(item => 
              item.title === 'Personal Information' 
                ? { ...item, completed: true, status: 'Completed' } 
                : item
            ));
          }
        } catch (error) {
          console.error('Error checking personal info:', error);
        }
      };

      // Check digital signature
      const checkDigitalSignature = async () => {
        try {
          const docRef = doc(db, 'users', user.uid, 'signatures', 'default');
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Update Digital Signature checklist item
            setChecklistItems(prev => prev.map(item => 
              item.title === 'Digital Signature' 
                ? { ...item, completed: true, status: 'Completed' } 
                : item
            ));
          }
        } catch (error) {
          console.error('Error checking digital signature:', error);
        }
      };

      // Check credit goals
      const checkCreditGoals = async () => {
        try {
          const goalsRef = doc(db, 'users', user.uid, 'credit_goals', 'current');
          const goalsSnap = await getDoc(goalsRef);

          if (goalsSnap.exists()) {
            setCreditGoals(goalsSnap.data() as CreditGoals);
            
            // Update Set Your Credit Score Goals checklist item
            setChecklistItems(prev => prev.map(item => 
              item.title === 'Set Your Credit Score Goals' 
                ? { ...item, completed: true, status: 'Completed' } 
                : item
            ));
          }
        } catch (error) {
          console.error('Error fetching credit goals:', error);
        }
      };

      // Check tutorial watched
      const checkTutorialWatched = async () => {
        try {
          const docRef = doc(db, 'users', user.uid, 'activity', 'tutorial');
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists() && docSnap.data().watched) {
            // Update Learn How to Use TCSG Academy checklist item
            setChecklistItems(prev => prev.map(item => 
              item.title === 'Learn How to Use TCSG Academy' 
                ? { ...item, completed: true, status: 'Completed' } 
                : item
            ));
          }
        } catch (error) {
          console.error('Error checking tutorial watched:', error);
        }
      };

      // Check affiliate status
      const checkAffiliateStatus = async () => {
        try {
          const docRef = doc(db, 'users', user.uid, 'affiliate', 'status');
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists() && docSnap.data().active) {
            // Update Become a TCSG Academy Affiliate checklist item
            setChecklistItems(prev => prev.map(item => 
              item.title === 'Become a TCSG Academy Affiliate' 
                ? { ...item, completed: true, status: 'Completed' } 
                : item
            ));
          }
        } catch (error) {
          console.error('Error checking affiliate status:', error);
        }
      };

      // Run all checks
      checkPersonalInfo();
      checkDigitalSignature();
      checkCreditGoals();
      checkTutorialWatched();
      checkAffiliateStatus();

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up listeners:', error);
      setLoading(false);
    }
  }, [user]);

  const checklistProgress = useMemo(() => {
    const completedItems = checklistItems.filter(
      (item) => item.completed
    ).length;
    return Math.round((completedItems / checklistItems.length) * 100);
  }, [checklistItems]);

  const bureauData = useMemo(() => {
    if (!creditReport?.data) return [];

    const bureaus = ['transunion', 'experian', 'equifax'];
    const logos = {
      transunion: 'https://i.imgur.com/a48jzVj.png',
      experian: 'https://i.imgur.com/bCRS33i.png',
      equifax: 'https://i.imgur.com/6lhqUyI.png',
    };

    return bureaus.map((bureau) => ({
      name: bureau.charAt(0).toUpperCase() + bureau.slice(1),
      logo: logos[bureau as keyof typeof logos],
      score: creditReport.data.scores?.[bureau] || 0,
      change: creditReport.data.changes?.[bureau] || '+0',
      totalDebt: creditReport.data.totalDebt?.[bureau] || 0,
      utilization: creditReport.data.creditUsage?.[bureau] || 0,
      fair: false,
    }));
  }, [creditReport]);

  const scrollTo = (direction: 'prev' | 'next') => {
    if (scrollContainerRef.current) {
      const newPage =
        direction === 'next'
          ? Math.min(currentPage + 1, totalPages - 1)
          : Math.max(currentPage - 1, 0);
      setCurrentPage(newPage);

      const itemWidth = scrollContainerRef.current.clientWidth / itemsPerPage;
      const scrollAmount = newPage * (itemWidth * itemsPerPage);

      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleItemAction = async (title: string) => {
    switch (title) {
      case 'Learn How to Use TCSG Academy':
        setTutorialVideoOpen(true);
        // Mark as completed when opened
        setChecklistItems(prev => prev.map(item => 
          item.title === title 
            ? { ...item, completed: true, status: 'Completed' } 
            : item
        ));

        const docRef = doc(db, 'users', user!.uid, 'activity', 'tutorial');

        await setDoc(docRef, {
          watched: true
        });

        break;
      case 'Personal Information':
        setPersonalInfoOpen(true);
        break;
      case 'Upload Credit Report':
        setImportDialogOpen(true);
        break;
      case 'Set Your Credit Score Goals':
        setCreditScoreGoalOpen(true);
        // Mark as completed when opened
        setChecklistItems(prev => prev.map(item => 
          item.title === title 
            ? { ...item, completed: true, status: 'Completed' } 
            : item
        ));
        break;
      case 'Digital Signature':
        setDigitalSignatureOpen(true);
        // Mark as completed when opened
        setChecklistItems(prev => prev.map(item => 
          item.title === title 
            ? { ...item, completed: true, status: 'Completed' } 
            : item
        ));
        break;
      case 'Become a TCSG Academy Affiliate':
        setReferralProgramOpen(true);
        // Mark as completed when opened
        setChecklistItems(prev => prev.map(item => 
          item.title === title 
            ? { ...item, completed: true, status: 'Completed' } 
            : item
        ));
        break;
    }
  };

  const getStatusBadge = (item: ChecklistItem) => {
    return (
      <div className={`px-3 py-1 rounded-full text-sm ${
        item.status === 'Completed' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-brand-yellow/20 text-brand-navy'
      }`}>
        {item.status}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-brand-yellow" />
      </div>
    );
  }

  return (
    <>
    
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-gray-700 font-semibold">Dispute Summary</h2>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              </div>

              {creditGoals && (
                <div className="mb-6 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-brand-yellow" />
                      <span className="text-sm font-medium text-gray-700">
                        Credit Score Goal
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-brand-yellow/10 text-brand-navy"
                    >
                      {creditGoals.timeframe}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`h-2 w-2 rounded-full ${getScoreColor(
                              creditGoals.targetScore
                            )}`}
                          />
                          <span className="text-sm font-medium text-gray-600">
                            Target: {creditGoals.targetScore} (
                            {getScoreLabel(creditGoals.targetScore)})
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {creditGoals.purpose}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${getScoreColor(
                            creditGoals.targetScore
                          )}`}
                          style={{
                            width: `${
                              (Number(creditGoals.currentScore.split('-')[0]) /
                                850) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Current: {creditGoals.currentScore}</span>
                        <span>Goal: {creditGoals.targetScore}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">
                          Motivation
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {creditGoals.motivation}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">
                          Timeline
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {creditGoals.timeframe}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-orange-500" />
                    </div>
                    <span className="text-orange-500 font-semibold">0</span>
                  </div>
                  <p className="text-sm text-gray-600">Disputes Created</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="text-blue-500 font-semibold">0 | 0</span>
                  </div>
                  <p className="text-sm text-gray-600">Sent | Unsent</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Building className="h-5 w-5 text-purple-500" />
                    </div>
                    <span className="text-purple-500 font-semibold">0</span>
                  </div>
                  <p className="text-sm text-gray-600">Accounts In-Dispute</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-red-500" />
                    </div>
                    <span className="text-red-500 font-semibold">0</span>
                  </div>
                  <p className="text-sm text-gray-600">Accounts Deleted</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full bg-white shadow-sm border-0 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="mr-2 h-4 w-4 animate-spin-slow" /> Sync
                Stats
              </Button>

              <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Checklist Progress
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-500">
                    {checklistProgress}%
                  </span>
                </div>
                <Progress
                  value={checklistProgress}
                  className="h-2 bg-gray-100"
                />
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-gray-700 font-semibold">Credit Scores</h2>
                  <VantageScoreTooltip>
                    <div className="px-2 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm cursor-help">
                      VantageScore 3.0
                    </div>
                  </VantageScoreTooltip>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {creditReport ? (
                    <span>
                      Last updated {formatDate(creditReport.importedAt)}
                    </span>
                  ) : (
                    <span>Import your credit report to see scores</span>
                  )}
                </div>
              </div>

              {bureauData.length === 0 ? (
                <Button
                  variant="outline"
                  className="w-full bg-white shadow-sm border-0 hover:bg-gray-50 transition-colors"
                  onClick={() => setImportDialogOpen(true)}
                >
                  <Upload className="mr-2 h-4 w-4" /> Import Credit Report
                </Button>
              ) : (
                <div className="space-y-6">
                  {bureauData.map((bureau) => (
                    <div
                      key={bureau.name}
                      className="bg-white rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-4">
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
                          {bureau.score && bureau.change && (
                            <div className="flex flex-col items-end">
                              <span className={`text-sm font-medium ${
                                Number(bureau.change) >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {bureau.change >= 0 ? '+' : ''}
                                {bureau.change}
                              </span>
                              <span className="text-xs text-gray-500">
                                Last 30 days
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`h-2 w-2 rounded-full ${getScoreColor(bureau.score)}`} />
                            <span className="text-sm font-medium text-gray-600">
                              {getScoreLabel(bureau.score)}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getScoreColor(bureau.score)} transition-all duration-500`}
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
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600">Total Debt</span>
                              <Info className="h-3 w-3 text-gray-400" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900">
                              ${bureau.totalDebt.toLocaleString()}
                            </span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600">Credit Usage</span>
                              <Info className="h-3 w-3 text-gray-400" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900">
                              {bureau.utilization}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold text-brand-navy">
                Success Checklist
              </h2>
              <Info className="h-5 w-5 text-brand-navy/60" />
            </div>
          </div>

          <div className="relative px-4">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-hidden scroll-smooth"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div
                className="flex space-x-6"
                style={{
                  width: `${
                    100 * Math.ceil(checklistItems.length / itemsPerPage)
                  }%`,
                  minWidth: `${
                    100 * Math.ceil(checklistItems.length / itemsPerPage)
                  }%`,
                }}
              >
                {checklistItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex-1"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <Card className="h-full p-6 bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center space-x-2 mb-4">
                          {getStatusBadge(item)}
                        </div>

                        <h3 className="text-lg font-medium text-brand-navy mb-2">
                          {item.title}
                        </h3>

                        <div className="flex justify-center my-6">
                          <div className="text-brand-yellow">{item.icon}</div>
                        </div>

                        <p className="text-sm text-gray-600 mb-6 flex-grow">
                          {item.description}
                        </p>

                        <div className="flex space-x-2">
                          <Button
                            variant="default"
                            className="flex-1 bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                            onClick={() => handleItemAction(item.title)}
                          >
                            {item.primaryButton}
                          </Button>
                          {item.secondaryButton && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow/10"
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPage === index ? 'bg-brand-navy' : 'bg-brand-navy/20'
                  }`}
                  onClick={() => {
                    setCurrentPage(index);
                    if (scrollContainerRef.current) {
                      const itemWidth =
                        scrollContainerRef.current.clientWidth / itemsPerPage;
                      scrollContainerRef.current.scrollTo({
                        left: index * (itemWidth * itemsPerPage),
                        behavior: 'smooth',
                      });
                    }
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => scrollTo('prev')}
              className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-brand-navy hover:bg-brand-navy/5 ${
                currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scrollTo('next')}
              className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-brand-navy hover:bg-brand-navy/5 ${
                currentPage === totalPages - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <PersonalInfoDialog
        open={personalInfoOpen}
        onOpenChange={setPersonalInfoOpen}
      />

      <TutorialVideoDialog
        open={tutorialVideoOpen}
        onOpenChange={setTutorialVideoOpen}
      />

      <CreditReportImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
      />

      <CreditScoreGoalDialog
        open={creditScoreGoalOpen}
        onOpenChange={setCreditScoreGoalOpen}
      />

      <DigitalSignatureDialog
        open={digitalSignatureOpen}
        onOpenChange={setDigitalSignatureOpen}
      />

      <ReferralProgramDialog
        open={referralProgramOpen}
        onOpenChange={setReferralProgramOpen}
      />
    </>
  );
}