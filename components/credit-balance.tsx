'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { useCredits } from '@/lib/credits';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface CreditBalanceProps {
  onTopUp?: () => void;
}

export function CreditBalance({ onTopUp }: CreditBalanceProps) {
  const [user] = useAuthState(auth);
  const { balance, loading, refreshBalance } = useCredits();

  React.useEffect(() => {
    if (user) {
      refreshBalance(user.uid).catch(console.error);
    }
  }, [user, refreshBalance]);

  return (
    <div className="flex items-center space-x-2 px-4 py-1.5 bg-brand-navy/5 rounded-md">
      <CreditCard size={20} className="text-brand-navy" />
      <span className="text-sm">Credit Balance: ${balance.toFixed(2)}</span>
      <Button 
        variant="ghost" 
        className="bg-brand-navy text-white hover:bg-brand-yellow hover:text-brand-navy px-2 py-1 h-auto text-sm transition-colors"
        onClick={onTopUp}
      >
        Top Up
      </Button>
    </div>
  );
}