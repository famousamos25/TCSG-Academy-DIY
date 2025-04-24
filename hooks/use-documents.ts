'use client';

import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useDocuments() {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<any>([]);

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    try {
      const docRef = collection(db, 'users', user.uid, 'documents');

      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        const documentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(documentsData);
        setLoading(false);
      }, (error) => {
        console.error('Error fetching documents:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { documents, loading };
}