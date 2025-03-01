import { Timestamp } from 'firebase/firestore';

export function formatDate(timestamp: Timestamp | Date | string | null | undefined): string {
  if (!timestamp) return 'N/A';
  
  try {
    // Handle Firestore Timestamp
    const date = timestamp instanceof Timestamp ? 
      timestamp.toDate() : 
      typeof timestamp === 'string' ? 
        new Date(timestamp) : 
        timestamp;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
}

export function calculateNextRefresh(timestamp: Timestamp | Date | string | null | undefined): string {
  if (!timestamp) return 'N/A';
  
  try {
    const importDate = timestamp instanceof Timestamp ? 
      timestamp.toDate() : 
      typeof timestamp === 'string' ? 
        new Date(timestamp) : 
        timestamp;

    const nextRefresh = new Date(importDate);
    nextRefresh.setDate(nextRefresh.getDate() + 30);
    
    const daysRemaining = Math.ceil((nextRefresh.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 ? `${daysRemaining} days` : 'Available now';
  } catch (error) {
    console.error('Error calculating next refresh:', error);
    return 'N/A';
  }
}