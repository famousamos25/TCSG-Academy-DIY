'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, X, Lock, RefreshCw, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addPaymentCard, updatePaymentCard } from '@/lib/payment-methods';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface PaymentCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingCard?: {
    id: string;
    cardholderName: string;
    last4: string;
    expiresAt: string;
  };
}

export function PaymentCardDialog({ open, onOpenChange, existingCard }: PaymentCardDialogProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardholderName: existingCard?.cardholderName || '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !validateCard()) {
      return;
    }

    setLoading(true);
    try {
      if (existingCard) {
        await updatePaymentCard(user.uid, existingCard.id, {
          cardholderName: cardDetails.cardholderName,
          expiresAt: `${cardDetails.expiryMonth}/${cardDetails.expiryYear}`,
        });
      } else {
        await addPaymentCard(user.uid, {
          cardholderName: cardDetails.cardholderName,
          cardNumber: cardDetails.cardNumber,
          expiryMonth: cardDetails.expiryMonth,
          expiryYear: cardDetails.expiryYear,
        });
      }

      toast({
        title: existingCard ? 'Card Updated' : 'Card Added',
        description: existingCard 
          ? 'Your payment card has been updated successfully.'
          : 'Your payment card has been added successfully.',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Payment card error:', error);
      toast({
        title: 'Error',
        description: 'Failed to process payment card. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateCard = () => {
    if (!cardDetails.cardholderName) {
      toast({
        title: 'Missing Information',
        description: 'Please enter the cardholder name.',
        variant: 'destructive',
      });
      return false;
    }

    if (cardDetails.cardNumber.length < 15) {
      toast({
        title: 'Invalid Card',
        description: 'Please enter a valid card number.',
        variant: 'destructive',
      });
      return false;
    }

    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      toast({
        title: 'Missing Information',
        description: 'Please enter the card expiry date.',
        variant: 'destructive',
      });
      return false;
    }

    if (cardDetails.cvv.length < 3) {
      toast({
        title: 'Invalid CVV',
        description: 'Please enter a valid CVV number.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              {existingCard ? 'Update Payment Card' : 'Add Payment Card'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                value={cardDetails.cardholderName}
                onChange={(e) => setCardDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                placeholder="Enter cardholder name"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cardNumber: e.target.value.replace(/\D/g, '') }))}
                  placeholder="Enter card number"
                  maxLength={16}
                  disabled={loading}
                  className="pl-10"
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry Date</Label>
                <div className="flex space-x-2">
                  <Select
                    value={cardDetails.expiryMonth}
                    onValueChange={(value) => setCardDetails(prev => ({ ...prev, expiryMonth: value }))}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, '0');
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <Select
                    value={cardDetails.expiryYear}
                    onValueChange={(value) => setCardDetails(prev => ({ ...prev, expiryYear: value }))}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = (new Date().getFullYear() + i).toString().slice(-2);
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                    placeholder="CVV"
                    maxLength={4}
                    disabled={loading}
                    className="pl-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
            <Shield className="h-5 w-5 text-brand-navy mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">Secure Payment Processing</p>
              <p className="text-gray-600 mt-1">
                Your card information is securely encrypted and processed using industry-standard SSL technology.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : existingCard ? (
                'Update Card'
              ) : (
                'Add Card'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}