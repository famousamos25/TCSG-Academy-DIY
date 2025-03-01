'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scale, Check } from 'lucide-react';
import { LEGAL_REFERENCES } from '@/lib/legal-references';

interface LegalReferenceSelectorProps {
  disputeType: string;
  selectedRefs: string[];
  onSelectRef: (refId: string) => void;
}

export function LegalReferenceSelector({
  disputeType,
  selectedRefs,
  onSelectRef
}: LegalReferenceSelectorProps) {
  const references = LEGAL_REFERENCES[disputeType as keyof typeof LEGAL_REFERENCES] || [];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Scale className="h-5 w-5 text-brand-navy" />
          <h3 className="font-medium text-gray-900">Legal References</h3>
        </div>
        <Badge variant="outline" className="text-brand-navy">
          {selectedRefs.length} Selected
        </Badge>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {references.map((ref) => {
            const isSelected = selectedRefs.includes(ref.id);
            return (
              <Card
                key={ref.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-yellow ring-2 ring-brand-yellow/50'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => onSelectRef(ref.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{ref.title}</h4>
                      {isSelected && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{ref.citation}</p>
                    <p className="text-sm text-gray-500 mt-2">{ref.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}