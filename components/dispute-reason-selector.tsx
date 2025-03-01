'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Target, Check } from 'lucide-react';
import { DISPUTE_REASONS } from '@/lib/legal-references';

interface DisputeReasonSelectorProps {
  disputeType: string;
  selectedReason: string | null;
  onSelectReason: (reason: string) => void;
}

export function DisputeReasonSelector({
  disputeType,
  selectedReason,
  onSelectReason
}: DisputeReasonSelectorProps) {
  const reasons = DISPUTE_REASONS[disputeType as keyof typeof DISPUTE_REASONS] || [];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-brand-navy" />
          <h3 className="font-medium text-gray-900">Dispute Reasons</h3>
        </div>
      </div>

      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-2">
          {reasons.map((reason) => {
            const isSelected = selectedReason === reason;
            return (
              <Card
                key={reason}
                className={`p-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-yellow ring-2 ring-brand-yellow/50'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => onSelectReason(reason)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{reason}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}