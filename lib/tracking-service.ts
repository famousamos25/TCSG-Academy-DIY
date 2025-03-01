'use client';

import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface TrackingUpdate {
  status: 'sent' | 'in_transit' | 'delivered' | 'in_review' | 'completed';
  timestamp: Date;
  details?: string;
  location?: string;
}

export async function getTrackingStatus(trackingNumber: string): Promise<TrackingUpdate[]> {
  try {
    // In a real implementation, this would call a USPS/FedEx/UPS API
    // For demo purposes, we'll simulate tracking updates
    
    // Check if we have cached tracking data
    const trackingRef = doc(db, 'tracking', trackingNumber);
    const trackingDoc = await getDoc(trackingRef);
    
    if (trackingDoc.exists()) {
      return trackingDoc.data().updates as TrackingUpdate[];
    }
    
    // Simulate tracking data
    const updates: TrackingUpdate[] = [
      {
        status: 'sent',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        details: 'Shipping label created',
        location: 'USPS Facility'
      }
    ];
    
    // Randomly determine current status based on how old the tracking number is
    const daysSinceSent = 4;
    
    if (daysSinceSent >= 2) {
      updates.push({
        status: 'in_transit',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        details: 'In transit to destination',
        location: 'Regional Distribution Center'
      });
    }
    
    if (daysSinceSent >= 3) {
      updates.push({
        status: 'delivered',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        details: 'Delivered, Front Door/Porch',
        location: 'Destination'
      });
    }
    
    // Cache the tracking data
    await updateDoc(trackingRef, {
      updates,
      lastChecked: serverTimestamp()
    });
    
    return updates;
  } catch (error) {
    console.error('Error getting tracking status:', error);
    throw error;
  }
}

export async function updateLetterStatus(userId: string, letterId: string, trackingNumber: string): Promise<void> {
  try {
    // Get tracking updates
    const updates = await getTrackingStatus(trackingNumber);
    
    // Determine the latest status
    let latestStatus = 'sent';
    let latestTimestamp = null;
    
    for (const update of updates) {
      if (update.timestamp > (latestTimestamp || new Date(0))) {
        latestStatus = update.status;
        latestTimestamp = update.timestamp;
      }
    }
    
    // Update the letter status
    const letterRef = doc(db, 'users', userId, 'dispute_letters', letterId);
    
    await updateDoc(letterRef, {
      status: latestStatus,
      lastUpdated: serverTimestamp(),
      ...(latestStatus === 'delivered' && { deliveredAt: serverTimestamp() }),
      ...(latestStatus === 'in_review' && { inReviewAt: serverTimestamp() }),
      ...(latestStatus === 'completed' && { completedAt: serverTimestamp() })
    });
  } catch (error) {
    console.error('Error updating letter status:', error);
    throw error;
  }
}

export function generateTrackingNumber(): string {
  // Generate a random USPS-like tracking number
  const prefix = '9400';
  const middle = Math.floor(10000000000000).toString().padStart(14, '0');
  return `${prefix}${middle}`;
}

export async function refreshTrackingStatus(userId: string, letterId: string, trackingNumber: string): Promise<void> {
  try {
    // In a real implementation, this would call the tracking API again
    // For demo purposes, we'll just update the letter status
    await updateLetterStatus(userId, letterId, trackingNumber);
  } catch (error) {
    console.error('Error refreshing tracking status:', error);
    throw error;
  }
}