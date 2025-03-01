import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

interface DisputeLetter {
  id?: string;
  userId: string;
  creditorName: string;
  accountNumber?: string;
  disputeType: string;
  bureau: string;
  content: string;
  analysis: string;
  strategy: string;
  status: 'draft' | 'ready' | 'sent' | 'completed';
  round: number;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  completedAt?: Date;
  attachments?: string[];
}

export async function saveDisputeLetter(letter: Omit<DisputeLetter, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'users', letter.userId, 'dispute_letters'), {
      ...letter,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving dispute letter:', error);
    throw error;
  }
}

export async function updateDisputeLetter(userId: string, letterId: string, updates: Partial<DisputeLetter>) {
  try {
    const letterRef = doc(db, 'users', userId, 'dispute_letters', letterId);
    await updateDoc(letterRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating dispute letter:', error);
    throw error;
  }
}

export async function getDisputeLetters(userId: string, status?: DisputeLetter['status']) {
  try {
    let q = query(
      collection(db, 'users', userId, 'dispute_letters'),
      orderBy('createdAt', 'desc')
    );

    if (status) {
      q = query(q, where('status', '==', status));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DisputeLetter[];
  } catch (error) {
    console.error('Error fetching dispute letters:', error);
    throw error;
  }
}

export async function getDisputeLetter(userId: string, letterId: string) {
  try {
    const docRef = doc(db, 'users', userId, 'dispute_letters', letterId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as DisputeLetter;
  } catch (error) {
    console.error('Error fetching dispute letter:', error);
    throw error;
  }
}

export async function markLetterAsSent(userId: string, letterId: string) {
  try {
    const letterRef = doc(db, 'users', userId, 'dispute_letters', letterId);
    await updateDoc(letterRef, {
      status: 'sent',
      sentAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error marking letter as sent:', error);
    throw error;
  }
}

export async function markLetterAsCompleted(userId: string, letterId: string) {
  try {
    const letterRef = doc(db, 'users', userId, 'dispute_letters', letterId);
    await updateDoc(letterRef, {
      status: 'completed',
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error marking letter as completed:', error);
    throw error;
  }
}