'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  CreditCard,
  Gift,
  GraduationCap,
  User,
  Settings,
  FileText,
  Scale,
  Target,
  Inbox,
  MessageSquare,
  Building,
  LayoutDashboard,
  PlayCircle,
  ShoppingBag,
  Megaphone,
  X,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TutorialVideoDialog } from '@/components/tutorial-video-dialog';
import { TopUpCreditsDialog } from '@/components/top-up-credits-dialog';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signOut } from '@/lib/auth';
import { NotificationCenter } from '@/components/notification-center';
import { CreditBalance } from '@/components/credit-balance';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'admin' | 'credit_report' | 'system';
  read: boolean;
  created_at: string;
}

export function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [tutorialVideoOpen, setTutorialVideoOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [topUpOpen, setTopUpOpen] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    try {
      // Fetch notifications
      const q = query(
        collection(db, 'users', user.uid, 'notifications'),
        orderBy('created_at', 'desc'),
        limit(5)
      );

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const newNotifications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Notification[];
          setNotifications(newNotifications);
        },
        (error) => {
          console.error('Error fetching notifications:', error);
          setNotifications([]);
        }
      );

      // Fetch user profile
      const userRef = doc(db, 'users', user.uid);
      const profileUnsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setUserProfile(doc.data());
        }
      });

      return () => {
        unsubscribe();
        profileUnsubscribe();
      };
    } catch (error) {
      console.error('Error setting up listeners:', error);
      setNotifications([]);
    }
  }, [user?.uid]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id: string) => {
    if (!user?.uid) return;

    try {
      await updateDoc(doc(db, 'users', user.uid, 'notifications', id), {
        read: true,
        updated_at: serverTimestamp()
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'admin':
        return <Bell className="h-4 w-4 text-brand-navy" />;
      case 'credit_report':
        return <FileText className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-16 flex items-center justify-center border-b">
        <RefreshCw className="h-6 w-6 animate-spin text-brand-yellow" />
      </div>
    );
  }

  if (!user || error) {
    return null;
  }

  // Don't render on landing page, login page, or signup page
  if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <>
      <div className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="relative w-32 h-12">
            <Image
              src="https://i.imgur.com/xFHDLUO.png"
              alt="TCSG Academy Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Button 
              className="bg-brand-navy text-white hover:bg-brand-yellow hover:text-brand-navy transition-colors"
              onClick={() => setTutorialVideoOpen(true)}
            >
              Start Tour
            </Button>
            
            <CreditBalance onTopUp={() => setTopUpOpen(true)} />
            
            <NotificationCenter />

            <Link href="/account">
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={userProfile?.photoURL || user.photoURL} />
                  <AvatarFallback>
                    {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                  </AvatarFallback> 
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push('/account')}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 h-16">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 text-sm font-medium text-brand-navy">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white p-2">
                <Link href="/dashboard">
                  <DropdownMenuItem className="flex items-center space-x-2 py-2 px-3 cursor-pointer">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/creditreport">
                  <DropdownMenuItem className="flex items-center space-x-2 py-2 px-3 cursor-pointer">
                    <FileText size={18} />
                    <span>Credit Report & Analysis</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/disputes">
                  <DropdownMenuItem className="flex items-center space-x-2 py-2 px-3 cursor-pointer">
                    <Scale size={18} />
                    <span>Dispute Center</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/dispute-overview">
                  <DropdownMenuItem className="flex items-center space-x-2 py-2 px-3 cursor-pointer">
                    <Target size={18} />
                    <span>Dispute Overview</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/mail-center">
                  <DropdownMenuItem className="flex items-center space-x-2 py-2 px-3 cursor-pointer">
                    <Inbox size={18} />
                    <span>Mail Center</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/chatgpt">
                  <DropdownMenuItem className="flex items-center space-x-2 py-2 px-3 cursor-pointer">
                    <MessageSquare size={18} />
                    <span>ChatGPT</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/creditor-information">
                  <DropdownMenuItem className="flex items-center space-x-2 py-2 px-3 cursor-pointer">
                    <Building size={18} />
                    <span>Creditor Information</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/account"
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-brand-navy"
            >
              <User size={20} />
              <span>My Account</span>
            </Link>
            <Link
              href="/store"
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-brand-navy"
            >
              <ShoppingBag size={20} />
              <span>E-Store</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-brand-navy">
                <GraduationCap size={20} />
                <span>Academy</span>
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/academy">
                  <DropdownMenuItem>Credit Basics</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/rewards"
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-brand-navy"
            >
              <Gift size={20} />
              <span>TCSG Academy Rewards</span>
            </Link>
            <Link
              href="/tutorials"
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-brand-navy"
            >
              <PlayCircle size={20} />
              <span>Tutorials</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Announcements Bar */}
      <div className="bg-brand-yellow p-2 text-center text-sm text-brand-navy flex items-center justify-center">
        <Megaphone className="h-4 w-4 mr-2" />
        <span>Welcome To TCSG Academy DIY</span>
      </div>

      {/* Tutorial Video Dialog */}
      <TutorialVideoDialog
        open={tutorialVideoOpen}
        onOpenChange={setTutorialVideoOpen}
        videoId="xlnfx1ax34"
      />

      {/* TopUpCreditsDialog */}
      <TopUpCreditsDialog
        open={topUpOpen}
        onOpenChange={setTopUpOpen}
      />
    </>
  );
}