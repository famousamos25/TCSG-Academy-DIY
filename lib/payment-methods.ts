import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface PaymentCard {
  id: string;
  cardholderName: string;
  last4: string;
  expiresAt: string;
  default: boolean;
  cardType: string;
  createdAt: Date;
}

export async function addPaymentCard(userId: string, cardDetails: {
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
}): Promise<PaymentCard> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    // Generate a unique ID for the card
    const cardId = `card_${Date.now()}`;

    // Create the new card object
    const newCard: PaymentCard = {
      id: cardId,
      cardholderName: cardDetails.cardholderName,
      last4: cardDetails.cardNumber.slice(-4),
      expiresAt: `${cardDetails.expiryMonth}/${cardDetails.expiryYear}`,
      default: false,
      cardType: getCardType(cardDetails.cardNumber),
      createdAt: new Date(),
    };

    // Get existing payment methods or initialize empty array
    const existingData = userDoc.data();
    const paymentMethods = existingData?.paymentMethods || [];

    // If this is the first card, make it the default
    if (paymentMethods.length === 0) {
      newCard.default = true;
    }

    // Add the new card to the payment methods array
    const updatedPaymentMethods = [...paymentMethods, newCard];

    // Update the user document
    await updateDoc(userRef, {
      paymentMethods: updatedPaymentMethods,
      updatedAt: serverTimestamp(),
    });

    return newCard;
  } catch (error) {
    console.error('Error adding payment card:', error);
    throw error;
  }
}

export async function updatePaymentCard(userId: string, cardId: string, updates: Partial<PaymentCard>): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const existingData = userDoc.data();
    const paymentMethods = existingData?.paymentMethods || [];

    // Update the specified card
    const updatedPaymentMethods = paymentMethods.map((card: PaymentCard) => 
      card.id === cardId ? { ...card, ...updates } : card
    );

    await updateDoc(userRef, {
      paymentMethods: updatedPaymentMethods,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating payment card:', error);
    throw error;
  }
}

export async function deletePaymentCard(userId: string, cardId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const existingData = userDoc.data();
    const paymentMethods = existingData?.paymentMethods || [];

    // Remove the specified card
    const updatedPaymentMethods = paymentMethods.filter((card: PaymentCard) => card.id !== cardId);

    // If we removed the default card and there are other cards, make the first one default
    if (paymentMethods.find((card: PaymentCard) => card.id === cardId)?.default && updatedPaymentMethods.length > 0) {
      updatedPaymentMethods[0].default = true;
    }

    await updateDoc(userRef, {
      paymentMethods: updatedPaymentMethods,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error deleting payment card:', error);
    throw error;
  }
}

function getCardType(cardNumber: string): string {
  // Basic card type detection based on first digit
  const firstDigit = cardNumber.charAt(0);
  switch (firstDigit) {
    case '4':
      return 'visa';
    case '5':
      return 'mastercard';
    case '3':
      return 'amex';
    case '6':
      return 'discover';
    default:
      return 'unknown';
  }
}