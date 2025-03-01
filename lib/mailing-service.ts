'use client';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface MailingOptions {
  method: 'first-class' | 'certified';
  color: 'bw' | 'color';
  envelopeSize: 'small' | 'large';
  pages: number;
}

interface MailingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

interface MailingRequest {
  userId: string;
  letterId: string;
  content: string;
  recipientAddress: MailingAddress;
  senderAddress: MailingAddress;
  options: MailingOptions;
  attachments?: string[];
}

export class MailingService {
  private static instance: MailingService;

  private constructor() {}

  public static getInstance(): MailingService {
    if (!MailingService.instance) {
      MailingService.instance = new MailingService();
    }
    return MailingService.instance;
  }

  public async submitForMailing(request: MailingRequest) {
    try {
      // Calculate cost based on options
      const cost = this.calculateMailingCost(request.options);

      // Generate tracking number
      const trackingNumber = this.generateTrackingNumber();

      // Create mailing record
      const mailingRecord = await addDoc(collection(db, 'users', request.userId, 'mailings'), {
        letterId: request.letterId,
        recipientAddress: request.recipientAddress,
        senderAddress: request.senderAddress,
        options: request.options,
        cost,
        trackingNumber,
        status: 'pending',
        createdAt: serverTimestamp(),
        estimatedDelivery: this.calculateEstimatedDelivery(request.options.method),
      });

      // Create notification
      await addDoc(collection(db, 'users', request.userId, 'notifications'), {
        title: 'Letter Submitted for Mailing',
        message: `Your dispute letter has been submitted for mailing. Tracking number: ${trackingNumber}`,
        type: 'mailing',
        read: false,
        createdAt: serverTimestamp(),
      });

      return {
        mailingId: mailingRecord.id,
        trackingNumber,
        cost,
        estimatedDelivery: this.calculateEstimatedDelivery(request.options.method),
      };
    } catch (error) {
      console.error('Error submitting for mailing:', error);
      throw error;
    }
  }

  private calculateMailingCost(options: MailingOptions): number {
    let cost = 0;

    // Base cost by mailing method
    cost += options.method === 'certified' ? 7.75 : 0.63;

    // Additional cost for color printing
    cost += options.color === 'color' ? (options.pages * 0.50) : (options.pages * 0.15);

    // Additional cost for large envelope
    cost += options.envelopeSize === 'large' ? 1.00 : 0;

    return Number(cost.toFixed(2));
  }

  private generateTrackingNumber(): string {
    // Generate USPS-style tracking number
    const prefix = '9400';
    const middle = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    const checkDigit = Math.floor(Math.random() * 10);
    return `${prefix}${middle}${checkDigit}`;
  }

  private calculateEstimatedDelivery(method: 'first-class' | 'certified'): Date {
    const delivery = new Date();
    // Add business days based on mailing method
    delivery.setDate(delivery.getDate() + (method === 'certified' ? 5 : 3));
    return delivery;
  }
}

export const mailingService = MailingService.getInstance();