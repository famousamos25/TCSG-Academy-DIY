import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

interface ReferredUser {
  email: string;
  conversionStatus: string;
  dateCreated: string;
  becameLeadAt: string | null;
  becameConversionAt: string | null;
}

export async function fetchReferredUsers(): Promise<ReferredUser[]> {
  try {
    const q = query(
      collection(db, 'referred_users'),
      orderBy('dateCreated', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      email: doc.data().email,
      conversionStatus: doc.data().conversionStatus,
      dateCreated: doc.data().dateCreated,
      becameLeadAt: doc.data().becameLeadAt || null,
      becameConversionAt: doc.data().becameConversionAt || null
    }));
  } catch (error) {
    console.error('Error fetching referred users:', error);
    return [];
  }
}