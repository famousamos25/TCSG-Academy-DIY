'use client';

import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface SmartTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export function SmartTooltip({ content, children, side = 'top', align = 'center' }: SmartTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center cursor-help">
            {children}
            <Info className="h-4 w-4 ml-1 text-gray-400" />
          </div>
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className="max-w-[300px] p-4">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}