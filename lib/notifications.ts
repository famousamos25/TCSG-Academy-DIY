'use client';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy, limit, getDocs, doc, updateDoc } from 'firebase/firestore';

export interface Notification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: 'dispute' | 'response' | 'system' | 'alert';
  status?: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  metadata?: Record<string, any>;
  createdAt?: any;
}

export async function createNotification(notification: Omit<Notification, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'users', notification.userId, 'notifications'), {
      ...notification,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function getUnreadNotifications(userId: string): Promise<Notification[]> {
  try {
    const q = query(
      collection(db, 'users', userId, 'notifications'),
      where('read', '==', false),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Notification[];
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
}

export async function markNotificationAsRead(userId: string, notificationId: string) {
  try {
    const docRef = doc(db, 'users', userId, 'notifications', notificationId);
    await updateDoc(docRef, {
      read: true,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

export function createDisputeNotification(
  userId: string,
  type: 'submission' | 'response' | 'update',
  details: any
) {
  let notification: Omit<Notification, 'id' | 'createdAt'>;

  switch (type) {
    case 'submission':
      notification = {
        userId,
        type: 'dispute',
        status: 'success',
        title: 'Dispute Letter Submitted',
        message: `Your dispute letter for ${details.creditorName} has been submitted successfully.`,
        read: false,
        metadata: {
          disputeId: details.disputeId,
          creditorName: details.creditorName,
          bureau: details.bureau
        }
      };
      break;

    case 'response':
      notification = {
        userId,
        type: 'response',
        status: details.outcome === 'success' ? 'success' : 'warning',
        title: 'Bureau Response Received',
        message: `Response received from ${details.bureau} regarding your dispute with ${details.creditorName}.`,
        read: false,
        metadata: {
          disputeId: details.disputeId,
          creditorName: details.creditorName,
          bureau: details.bureau,
          outcome: details.outcome
        }
      };
      break;

    case 'update':
      notification = {
        userId,
        type: 'alert',
        status: 'info',
        title: 'Dispute Status Update',
        message: `Your dispute with ${details.creditorName} has been ${details.status}.`,
        read: false,
        metadata: {
          disputeId: details.disputeId,
          creditorName: details.creditorName,
          status: details.status
        }
      };
      break;

    default:
      throw new Error('Invalid notification type');
  }

  return createNotification(notification);
}