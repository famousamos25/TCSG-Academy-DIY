'use client';

import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  Mail,
  Download,
  Printer,
  Trash2,
  Eye,
  Paperclip,
  Search,
} from 'lucide-react';
import {
  ScrollArea,
} from '@/components/ui/scroll-area';

interface DisputeLetterDetailsProps {
  letter: {
    id: string;
    title: string;
    creditorName: string;
    accountNumber: string;
    dateCreated: string;
    round: number;
    disputedItems: number;
    status: string;
    reason: string;
    instruction: string;
    content?: string;
    attachments?: Array<{
      id: string;
      name: string;
      type: string;
      url: string;
    }>;
  };
  onSend: (letterId: string) => void;
  onEmail: (letterId: string) => void;
  onDownload: (letterId: string) => void;
  onPrint: (letterId: string) => void;
  onDelete: (letterId: string) => void;
}

export function DisputeLetterDetails({
  letter,
  onSend,
  onEmail,
  onDownload,
  onPrint,
  onDelete,
}: DisputeLetterDetailsProps) {
  const [expanded, setExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unsent':
        return <Badge variant="outline">Draft</Badge>;
      case 'sent':
        return <Badge className="bg-blue-50 text-blue-600">Sent</Badge>;
      case 'completed':
        return <Badge className="bg-green-50 text-green-600">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">{letter.title}</h3>
              <p className="text-sm text-gray-600">
                {letter.creditorName} • Account #{letter.accountNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(letter.status)}
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>Round {letter.round}</span>
              <span>•</span>
              <span>{letter.disputedItems} items</span>
              <span>•</span>
              <span>{letter.dateCreated}</span>
            </div>
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Dispute Details</h4>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Reason</div>
                  <div className="text-gray-900">{letter.reason}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Instructions</div>
                  <div className="text-gray-900">{letter.instruction}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Letter Content</h4>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                    onClick={() => onDownload(letter.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                    onClick={() => onPrint(letter.id)}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[300px] w-full rounded border p-4 bg-white">
                <div className="whitespace-pre-wrap font-mono text-sm">
                  {letter.content || `
[Current Date]

[Credit Bureau/Creditor Address]

Re: Dispute of Inaccurate Information

To Whom It May Concern:

I am writing to dispute the following information in my credit report:

Account Number: [Account Number]
Creditor: [Creditor Name]
Reason for Dispute: [Dispute Reason]

Under the Fair Credit Reporting Act, Section 611(a), I have the right to dispute inaccurate information in my credit report. I request that you investigate this matter and correct the disputed information.

[Specific Instructions]

I have attached supporting documentation to verify my claim. Please complete your investigation within 30 days of receiving this dispute as required by the FCRA.

Sincerely,

[Your Name]
`}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Attachments</h4>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  Add Attachment
                </Button>
              </div>
            </div>

            <div className="mt-4">
              {letter.attachments && letter.attachments.length > 0 ? (
                <div className="space-y-2">
                  {letter.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{attachment.name}</div>
                          <div className="text-xs text-gray-500">{attachment.type}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-navy">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-navy">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No attachments yet</p>
                  <p className="text-sm text-gray-500">
                    Add supporting documents to strengthen your dispute
                  </p>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t flex justify-end space-x-3">
            {letter.status === 'unsent' && (
              <>
                <Button
                  variant="outline"
                  className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                  onClick={() => onEmail(letter.id)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  onClick={() => onSend(letter.id)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Letter
                </Button>
              </>
            )}
            <Button
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
              onClick={() => onDelete(letter.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}