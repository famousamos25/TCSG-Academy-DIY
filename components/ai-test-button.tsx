'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { openai } from '@/lib/openai';

export function AITestButton() {
  const { toast } = useToast();

  const testAI = async () => {
    try {
      const testDispute = {
        creditor_name: "Test Bank",
        account_number: "XXXX-1234",
        amount: 500,
        dispute_type: "Late Payment",
        bureau: "Experian"
      };

      const result = await openai.analyzeDispute("test-user", testDispute);
      
      toast({
        title: "AI Test Successful",
        description: "The AI analysis completed successfully. Check the console for details.",
      });
      
      console.log('AI Test Result:', result);
    } catch (error) {
      console.error('AI Test Error:', error);
      toast({
        title: "AI Test Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={testAI} className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
      Test AI Connection
    </Button>
  );
}