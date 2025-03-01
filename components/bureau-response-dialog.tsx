'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Upload,
  RefreshCw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeResponse } from '@/lib/response-analysis';

interface BureauResponseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disputeId?: string;
}

const RESPONSE_TYPES = [
  'Investigation Complete',
  'Verification Failed',
  'Additional Information Required',
  'Mixed File Found',
  'Identity Verification Required',
  'Account Verified as Accurate',
  'Account Information Updated',
  'Account Deleted',
  'Account Not Found',
];

export function BureauResponseDialog({
  open,
  onOpenChange,
  disputeId,
}: BureauResponseDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [responseDetails, setResponseDetails] = useState({
    bureau: '',
    responseType: '',
    content: '',
    receivedDate: '',
  });

  const handleAnalyze = async () => {
    if (!responseDetails.bureau || !responseDetails.responseType || !responseDetails.content) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeResponse(responseDetails);
      setAnalysis(result);
      
      toast({
        title: 'Analysis Complete',
        description: 'Bureau response has been analyzed.',
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'Failed to analyze response',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!analysis) return null;

    switch (analysis.outcome) {
      case 'success':
        return (
          <Badge className="bg-green-50 text-green-600">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Success
          </Badge>
        );
      case 'partial':
        return (
          <Badge className="bg-yellow-50 text-yellow-600">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Partial Success
          </Badge>
        );
      case 'failure':
        return (
          <Badge className="bg-red-50 text-red-600">
            <XCircle className="h-4 w-4 mr-1" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-brand-navy flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-brand-yellow" />
            Analyze Bureau Response
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-12 text-center">
            <RefreshCw className="h-16 w-16 text-brand-yellow mx-auto mb-6 animate-spin" />
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Analyzing Response
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Please wait while our AI analyzes the bureau&apos;s response...
            </p>
          </div>
        ) : !analysis ? (
          <div className="py-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Credit Bureau</Label>
                <Select
                  value={responseDetails.bureau}
                  onValueChange={(value) => setResponseDetails(prev => ({ ...prev, bureau: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bureau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="experian">Experian</SelectItem>
                    <SelectItem value="transunion">TransUnion</SelectItem>
                    <SelectItem value="equifax">Equifax</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Response Type</Label>
                <Select
                  value={responseDetails.responseType}
                  onValueChange={(value) => setResponseDetails(prev => ({ ...prev, responseType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select response type" />
                  </SelectTrigger>
                  <SelectContent>
                    {RESPONSE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label>Response Content</Label>
                <div className="mt-1.5 relative">
                  <Button
                    variant="outline"
                    className="absolute right-2 top-2 z-10"
                    onClick={() => {
                      // Handle file upload
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload PDF
                  </Button>
                  <Input
                    value={responseDetails.content}
                    onChange={(e) => setResponseDetails(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Paste the response content here or upload a PDF"
                    className="min-h-[200px] resize-y"
                    // multiline
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              className="w-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Analyze Response
            </Button>
          </div>
        ) : (
          <div className="py-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Analysis Results</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Here&apos;s what our AI found in the bureau&apos;s response
                </p>
              </div>
              {getStatusBadge()}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-4">Key Findings</h4>
                <div className="space-y-4">
                  {analysis.findings.map((finding: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-brand-navy">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-600">{finding}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-4">Recommended Actions</h4>
                <div className="space-y-4">
                  {analysis.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <ArrowRight className="h-5 w-5 text-brand-yellow flex-shrink-0" />
                      <p className="text-sm text-gray-600">{rec}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {analysis.outcome === 'failure' && (
              <Button
                className="w-full bg-brand-navy text-white hover:bg-brand-navy/90"
                onClick={() => window.open('https://www.consumerfinance.gov/complaint/', '_blank')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                File CFPB Complaint
              </Button>
            )}

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-brand-navy text-brand-navy hover:bg-brand-navy/10"
                onClick={() => {
                  setAnalysis(null);
                  setResponseDetails({
                    bureau: '',
                    responseType: '',
                    content: '',
                    receivedDate: '',
                  });
                }}
              >
                Analyze Another Response
              </Button>
              <Button
                className="flex-1 bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                onClick={handleAnalyze}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Regenerate Analysis
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}