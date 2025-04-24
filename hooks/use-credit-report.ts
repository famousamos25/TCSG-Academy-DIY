'use client';

import { auth, db } from '@/lib/firebase';
import { convertKeysToLowerFirst } from '@/lib/utils';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useCreditReport() {
  const [loading, setLoading] = useState(true);
  const [creditReport, setCreditReport] = useState<any>(null);
  const [user] = useAuthState(auth);
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

  return { creditReport: creditReport?.data ?? null, loading };
}