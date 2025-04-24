'use client';

import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function usePersonalInfo() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid, 'personal_info/details');

      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setLoading(false);
        if (snapshot.exists()) {
          setUserInfo({ ...snapshot.data(), uid: user.uid });
        }
      }, (error) => {
        console.error('Error fetching personal info:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up personal info listener:', error);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return { loading, userInfo };
}