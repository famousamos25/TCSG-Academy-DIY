import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
  serverTimestamp
} from 'firebase/firestore';

// Generic CRUD operations
export const createDocument = async (
  collectionName: string,
  docId: string,
  data: DocumentData
) => {
  try {
    await setDoc(doc(db, collectionName, docId), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
};

export const getDocument = async (
  collectionName: string,
  docId: string
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (
  collectionName: string,
  docId: string
) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// Collection specific operations
export const getNotifications = async (userId: string, limit_ = 5) => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limit_)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    await updateDocument('notifications', notificationId, { read: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Creditor operations
export const getCreditors = async () => {
  try {
    const q = query(
      collection(db, 'creditors'),
      orderBy('name')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting creditors:', error);
    throw error;
  }
};

export const addCreditor = async (data: DocumentData) => {
  try {
    const docRef = await collection(db, 'creditors');
    await setDoc(doc(docRef), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding creditor:', error);
    throw error;
  }
};