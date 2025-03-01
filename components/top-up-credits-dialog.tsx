'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Info } from 'lucide-react';
import { useCredits, updateUserCredits } from '@/lib/credits';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface TopUpCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CreditPackage {
  amount: number;
  credits: number;
  price: number;
}

const CREDIT_PACKAGES: CreditPackage[] = [
  { amount: 10, credits: 10, price: 10 },
  { amount: 20, credits: 20, price: 20 },
  { amount: 50, credits: 50, price: 50 },
  { amount: 100, credits: 100, price: 100 },
  { amount: 200, credits: 200, price: 200 },
  { amount: 500, credits: 500, price: 500 },
];

export function TopUpCreditsDialog({ open, onOpenChange }: TopUpCreditsDialogProps) {
  const [user] = useAuthState(auth);
  const { balance, addCredits } = useCredits();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    zipcode: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedAmount) {
      toast({
        title: 'Error',
        description: 'Please select an amount and ensure you are logged in.',
        variant: 'destructive',
      });
      return;
    }

    if (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.zipcode) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all card details.',
        variant: 'destructive',
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please agree to the terms and privacy policy.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update credits in both store and database
      await addCredits(selectedAmount);
      await updateUserCredits(user.uid, balance + selectedAmount);
      
      toast({
        title: 'Payment Successful',
        description: `Successfully added ${selectedAmount} credits to your account.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: 'Failed to process payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-12">
              <Image
                src="https://i.imgur.com/xFHDLUO.png"
                alt="TCSG Academy Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-semibold border-b pb-4">
            Top up Credits
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {CREDIT_PACKAGES.map((pkg) => (
                <Card
                  key={pkg.amount}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedAmount === pkg.amount
                      ? 'border-brand-yellow ring-2 ring-brand-yellow/50'
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAmount(pkg.amount)}
                >
                  <div className="text-center">
                    <div className="font-medium text-brand-navy">
                      Top Up ${pkg.amount}
                    </div>
                    <div className="text-sm text-gray-600">
                      Get {pkg.credits} Credits for ${pkg.price}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name On Card</Label>
                <Input
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Card Number</Label>
                  <Input
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value.replace(/\D/g, '') }))}
                    placeholder="4242 4242 4242 4242"
                    maxLength={16}
                  />
                </div>
                <div>
                  <Label>Exp. Date</Label>
                  <Input
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label>CVC</Label>
                  <Input
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '') }))}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <Label>Zipcode</Label>
                <Input
                  value={cardDetails.zipcode}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, zipcode: e.target.value.replace(/\D/g, '') }))}
                  placeholder="12345"
                  maxLength={5}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600"
                >
                  I have read and agree with the{' '}
                  <a href="#" className="text-brand-navy hover:underline">service</a>
                  {' '}and{' '}
                  <a href="#" className="text-brand-navy hover:underline">privacy policy</a>.
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  disabled={loading || !selectedAmount || !agreedToTerms}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Top Up'
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">Credits Usage</h3>
              <div className="text-sm space-y-4">
                <div>
                  <div className="text-gray-600 mb-1">You Have:</div>
                  <div className="font-medium">${balance.toFixed(2)} Credits Available</div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>SMS messages</span>
                    <Info className="h-4 w-4" />
                  </div>
                  <div className="text-sm">$0.04 cents/SMS Message</div>
                  <div className="text-xs text-gray-500">
                    Approx. 160 characters/SMS per recipient
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Mail Letters</span>
                    <Info className="h-4 w-4" />
                  </div>
                  <div className="text-sm">From $2/Dispute Letter</div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>ChatGPT</span>
                    <Info className="h-4 w-4" />
                  </div>
                  <div className="text-sm">From $0.05 cents/Letter Rewrite or Question</div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>OpenAI Charges</span>
                    <Info className="h-4 w-4" />
                  </div>
                  <div className="text-sm">From $0.10/Letter rewrite</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}