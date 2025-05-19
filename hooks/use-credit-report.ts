'use client';

import { auth, db } from '@/lib/firebase';
import { convertKeysToLowerFirst } from '@/lib/utils';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useCreditReport() {
  const [loading, setLoading] = useState(true);
  const [creditReport, setCreditReport] = useState<any>(null);
  const [user] = useAuthState(auth);

  const derogatoryAccs = useMemo(() => {
    if (!creditReport) return [];
    if (!creditReport?.data?.accounts || creditReport?.data?.accounts?.length === 0) return [];
    return creditReport?.data?.accounts.filter((account: any) => {
      if (account?.some((acc: any) => acc?.paymentStatus === 'Collection/Chargeoff')) return true;
      if (account?.some((acc: any) => acc?.accountType?.toLowerCase()?.includes("collection"))) return true;
      if (account?.some((acc: any) => acc?.accountType?.toLowerCase()?.includes("chargeoff"))) return true;
      return false;
    });
  }, [creditReport]);

  const latePaymentAccounts = useMemo(() => {
    if (!creditReport) return [];    
    if (!creditReport?.data?.accounts || creditReport?.data?.accounts?.length === 0) return [];
    
    return creditReport?.data?.accounts.filter((account: any) => {
      if (account?.some((acc: any) => acc?.paymentStatus?.toLowerCase()?.includes("late") && acc?.accountStatus?.toLowerCase() !== "derogatory")) return true;
      return false;
    });
  }, [creditReport]);

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
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up credit report listener:', error);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { creditReport: creditReport?.data ?? null, loading, derogatoryAccs, latePaymentAccounts };
};