'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { getCreditReportData } from '@/lib/credit-report';
import { CreditReportData } from '@/lib/credit-report-analysis';

export function useCreditReport() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<CreditReportData | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const reportData = await getCreditReportData(user.uid);
        setData(reportData);
        setError(null);
      } catch (err) {
        console.error('Error fetching credit report:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch credit report'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  return { data, loading, error, refetch: () => user && getCreditReportData(user.uid) };
}