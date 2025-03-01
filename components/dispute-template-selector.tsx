'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Check, Sparkles } from 'lucide-react';
import { DISPUTE_TEMPLATES } from '@/lib/legal-references';

interface DisputeTemplateSelectorProps {
  disputeType: string;
  selectedTemplate: string | null;
  onSelectTemplate: (template: string) => void;
}

export function DisputeTemplateSelector({
  disputeType,
  selectedTemplate,
  onSelectTemplate
}: DisputeTemplateSelectorProps) {
  const templates = Object.keys(DISPUTE_TEMPLATES);
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);

  // Simulate AI recommendation based on dispute type
  React.useEffect(() => {
    if (disputeType) {
      // In a real implementation, this would call an AI service
      setAiRecommendation(disputeType);
    }
  }, [disputeType]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-brand-navy" />
          <h3 className="font-medium text-gray-900">Dispute Templates</h3>
        </div>
        {aiRecommendation && (
          <Badge className="bg-brand-yellow/10 text-brand-navy flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Recommended
          </Badge>
        )}
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template;
            const isRecommended = template === aiRecommendation;
            
            return (
              <Card
                key={template}
                className={`p-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-yellow ring-2 ring-brand-yellow/50'
                    : isRecommended
                    ? 'border-brand-yellow/30 bg-brand-yellow/5'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => onSelectTemplate(template)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{template}</span>
                    {isRecommended && (
                      <Badge variant="outline" className="text-xs bg-brand-yellow/10 text-brand-navy">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {DISPUTE_TEMPLATES[template as keyof typeof DISPUTE_TEMPLATES]?.substring(0, 60)}...
                </p>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}