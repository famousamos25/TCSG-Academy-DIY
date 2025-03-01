'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface CreditsStore {
  balance: number;
  loading: boolean;
  setBalance: (balance: number) => void;
  addCredits: (amount: number) => Promise<void>;
  removeCredits: (amount: number) => Promise<void>;
  refreshBalance: (userId: string) => Promise<void>;
}

export const useCredits = create<CreditsStore>()(
  persist(
    (set, get) => ({
      balance: 0,
      loading: false,

      setBalance: (balance) => set({ balance }),

      addCredits: async (amount) => {
        const currentBalance = get().balance;
        set({ balance: currentBalance + amount });
      },

      removeCredits: async (amount) => {
        const currentBalance = get().balance;
        if (currentBalance < amount) {
          throw new Error('Insufficient credits');
        }
        set({ balance: currentBalance - amount });
      },

      refreshBalance: async (userId) => {
        try {
          set({ loading: true });
          const docRef = doc(db, 'users', userId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            set({ balance: data.credits || 0 });
          } else {
            set({ balance: 0 });
          }
        } catch (error) {
          console.error('Error refreshing credits:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: 'credits-storage',
    }
  )
);

export async function updateUserCredits(userId: string, amount: number) {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      credits: amount,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user credits:', error);
    throw error;
  }
}