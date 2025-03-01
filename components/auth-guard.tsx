'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { RefreshCw } from 'lucide-react';

// Pages that don't require authentication
const PUBLIC_PAGES = ['/', '/login', '/signup'];

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only redirect after initial load
    if (!loading && !isInitialized) {
      setIsInitialized(true);
      
      // Check if current page requires auth
      const isPublicPage = PUBLIC_PAGES.includes(pathname);
      
      if (!user && !isPublicPage) {
        router.replace('/login');
      } else if (user && (pathname === '/login' || pathname === '/signup')) {
        router.replace('/dashboard');
      }
    }
  }, [user, loading, router, isInitialized, pathname]);

  // Show loading state
  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-brand-yellow" />
      </div>
    );
  }

  // Handle auth error
  if (error) {
    console.error('Auth error:', error);
    router.replace('/login');
    return null;
  }

  // Allow access to public pages without auth
  if (PUBLIC_PAGES.includes(pathname)) {
    return <>{children}</>;
  }

  // Don't render protected content if not authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
}