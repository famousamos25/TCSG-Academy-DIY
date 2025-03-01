import { auth, db } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Initialize auth persistence
if (auth) {
  setPersistence(auth, browserLocalPersistence).catch(console.error);
}

export const signIn = async (email: string, password: string) => {
  if (!auth) throw new Error('Auth not initialized');
  
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login timestamp
    if (result.user && db) {
      await setDoc(doc(db, 'users', result.user.uid), {
        lastLogin: serverTimestamp()
      }, { merge: true });
    }
    
    return result.user;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const signUp = async (email: string, password: string) => {
  if (!auth || !db) throw new Error('Firebase not initialized');

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user profile
    await setDoc(doc(db, 'users', result.user.uid), {
      id: result.user.uid,
      email: result.user.email,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });

    return result.user;
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new Error(error.message || 'Failed to create account');
  }
};

export const signOut = async () => {
  if (!auth) throw new Error('Auth not initialized');

  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  if (!auth) return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!db) return null;

  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};