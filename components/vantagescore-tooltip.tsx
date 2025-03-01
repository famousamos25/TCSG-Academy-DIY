'use client';

import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface VantageScoreTooltipProps {
  children: React.ReactNode;
}

export function VantageScoreTooltip({ children }: VantageScoreTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] p-4">
          <div>
            <h3 className="font-semibold mb-2">VantageScore 3.0</h3>
            <p className="text-sm">
              VantageScore 3.0 is a credit scoring model that ranges from 300 to 850. 
              Scores are calculated based on your credit history and help lenders assess 
              your creditworthiness. Higher scores indicate better credit health.
            </p>
            <div className="mt-2 space-y-1 text-sm">
              <p>• 300-579: Poor</p>
              <p>• 580-669: Fair</p>
              <p>• 670-739: Good</p>
              <p>• 740-799: Very Good</p>
              <p>• 800-850: Excellent</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}