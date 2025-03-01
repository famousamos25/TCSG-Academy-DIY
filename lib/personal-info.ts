import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export interface PersonalInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  email: string;
  ssn: string;
  createdAt?: any;
  updatedAt?: any;
}

export async function savePersonalInfo(userId: string, info: Partial<PersonalInfo>): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId, 'personal_info', 'details');
    
    // Get existing data first
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.exists() ? docSnap.data() : {};

    // Merge existing data with new info
    await setDoc(docRef, {
      ...existingData,
      ...info,
      updatedAt: serverTimestamp(),
      createdAt: existingData.createdAt || serverTimestamp(),
    });

    // Update user profile with basic info
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      firstName: info.firstName,
      lastName: info.lastName,
      phone: info.phone,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving personal info:', error);
    throw error;
  }
}

export async function getPersonalInfo(userId: string): Promise<PersonalInfo | null> {
  try {
    const docRef = doc(db, 'users', userId, 'personal_info', 'details');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as PersonalInfo;
  } catch (error) {
    console.error('Error getting personal info:', error);
    throw error;
  }
}