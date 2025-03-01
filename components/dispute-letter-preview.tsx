'use client';

import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useReactToPrint } from 'react-to-print';
import {
  Download,
  Copy,
  Printer,
  Mail,
  FileText,
  CheckCircle2,
  X,
  RefreshCw,
} from 'lucide-react';
import { DISPUTE_REASONS } from '@/lib/legal-references';

interface DisputeLetterPreviewProps {
  letter: {
    id: string;
    creditorName: string;
    accountNumber: string;
    disputeType: string;
    bureau: string;
    reason: string;
    content: string;
    aiSuggestion?: {
      reason: string;
      citation: string;
    };
    personalInfo: {
      name: string;
      address: string;
      city: string;
      state: string;
      zipcode: string;
      phone: string;
    };
  };
  onReasonChange: (reason: string) => void;
  onSave: () => void;
  onSend: () => void;
}

export function DisputeLetterPreview({
  letter,
  onReasonChange,
  onSave,
  onSend,
}: DisputeLetterPreviewProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Dispute Letter - ${letter.creditorName}`,
    pageStyle: '@page { size: auto; margin: 20mm; }',
    onAfterPrint: () => {
      toast({
        title: 'Print successful',
        description: 'Your dispute letter has been sent to the printer.',
      });
    },
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter.content);
      toast({
        title: 'Copied!',
        description: 'Letter content copied to clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy letter content.',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([letter.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dispute-letter-${letter.creditorName.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Generate letter content based on template and selected reason
  const letterContent = `${new Date().toLocaleDateString()}

${letter.bureau}
P.O. Box XXXXX
City, State ZIP

Re: Dispute of Inaccurate Information

To Whom It May Concern:

I am writing to dispute the following information in my credit report:

Account Number: ${letter.accountNumber}
Creditor: ${letter.creditorName}
Reason for Dispute: ${letter.reason}

Under the Fair Credit Reporting Act, Section 611(a), I have the right to dispute the accuracy of information in my credit report. I am requesting that you investigate this matter and correct the disputed information.

${letter.content}

Please investigate this matter and respond within 30 days, as required by the FCRA.

Sincerely,

${letter.personalInfo.name}
${letter.personalInfo.address}
${letter.personalInfo.city}, ${letter.personalInfo.state} ${letter.personalInfo.zipcode}
${letter.personalInfo.phone}`;

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">Dispute Letter Preview</h3>
            <p className="text-sm text-gray-600">
              Review and customize your dispute letter
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {letter.aiSuggestion && (
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900">AI-Suggested Reason</h4>
                  <p className="text-sm text-gray-600">{letter.aiSuggestion.reason}</p>
                  <p className="text-xs text-gray-500 mt-1">Citation: {letter.aiSuggestion.citation}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-900">
              Dispute Reason
            </label>
            <Select
              value={letter.reason}
              onValueChange={onReasonChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select dispute reason" />
              </SelectTrigger>
              <SelectContent>
                {DISPUTE_REASONS[letter.disputeType as keyof typeof DISPUTE_REASONS]?.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div ref={printRef} className="p-8 max-h-[90vh] overflow-y-auto">
        <ScrollArea className="h-[400px]">
          <div className="whitespace-pre-wrap font-mono text-sm">
            {letterContent}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onSave}
            className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileText className="h-4 w-4 mr-2" />
            )}
            Save Draft
          </Button>
          <Button
            onClick={onSend}
            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Mail className="h-4 w-4 mr-2" />
            )}
            Send Letter
          </Button>
        </div>
      </div>
    </Card>
  );
}