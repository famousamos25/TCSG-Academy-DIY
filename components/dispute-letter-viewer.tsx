'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date-utils';
import {
  Download,
  Copy,
  Printer,
  Mail,
  FileText,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getDisputeLetter } from '@/lib/dispute-letters';

interface DisputeLetterViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  letterId: string | null;
  userId: string;
}

export function DisputeLetterViewer({ open, onOpenChange, letterId, userId }: DisputeLetterViewerProps) {
  const { toast } = useToast();
  const [letter, setLetter] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!letterId || !userId) return;

    const fetchLetter = async () => {
      try {
        setLoading(true);
        const fetchedLetter = await getDisputeLetter(userId, letterId);
        setLetter(fetchedLetter);
      } catch (error) {
        console.error('Error fetching letter:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dispute letter',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLetter();
  }, [letterId, userId, toast]);

  const copyToClipboard = async () => {
    if (!letter?.content) return;

    try {
      await navigator.clipboard.writeText(letter.content);
      toast({
        title: 'Success',
        description: 'Letter copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy letter',
        variant: 'destructive',
      });
    }
  };

  const downloadLetter = () => {
    if (!letter?.content) return;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              Dispute Letter Details
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="py-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading letter...</p>
          </div>
        ) : !letter ? (
          <div className="py-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Letter not found</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge
                  className={
                    letter.status === 'completed'
                      ? 'bg-purple-50 text-purple-600'
                      : letter.status === 'sent'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-blue-50 text-blue-600'
                  }
                >
                  {letter.status.charAt(0).toUpperCase() + letter.status.slice(1)}
                </Badge>
                <h2 className="text-xl font-semibold text-brand-navy mt-2">
                  {letter.creditorName}
                </h2>
                <p className="text-sm text-gray-600">
                  Created on {formatDate(letter.createdAt)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                  onClick={downloadLetter}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-medium text-gray-900 mb-4">Letter Content</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
                    {letter.content}
                  </pre>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Analysis</h3>
                  <div className="text-sm text-gray-600">
                    {letter.analysis}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Strategy</h3>
                  <div className="text-sm text-gray-600">
                    {letter.strategy}
                  </div>
                </Card>

                {letter.status === 'ready' && (
                  <Button className="w-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Letter
                  </Button>
                )}
                {letter.status === 'sent' && (
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}