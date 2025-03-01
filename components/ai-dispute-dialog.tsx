'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, CheckCircle2, AlertCircle, FileText, Target, Scale, Copy, Download, UserCheck, Database, RefreshCw } from 'lucide-react';
import { openai } from '@/lib/openai';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface AIDisputeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DISPUTE_TYPES = [
  'Late Payment',
  'Account Not Mine',
  'Incorrect Balance',
  'Account Closed',
  'Identity Theft',
  'Other'
];

const CREDIT_BUREAUS = [
  'Experian',
  'TransUnion',
  'Equifax'
];

export function AIDisputeDialog({ open, onOpenChange }: AIDisputeDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [letter, setLetter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [hasPersonalInfo, setHasPersonalInfo] = useState(false);
  const [user] = useAuthState(auth);
  const [disputeDetails, setDisputeDetails] = useState({
    creditor_name: '',
    account_number: '',
    amount: '',
    dispute_type: '',
    bureau: '',
    additional_info: ''
  });

  React.useEffect(() => {
    const checkPersonalInfo = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'users', user.uid, 'personal_info', 'details');
        const docSnap = await getDoc(docRef);
        setHasPersonalInfo(docSnap.exists());
      } catch (error) {
        console.error('Error checking personal info:', error);
        setHasPersonalInfo(false);
      }
    };

    checkPersonalInfo();
  }, [user]);

  const runAnalysis = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use the AI features.",
        variant: "destructive",
      });
      return;
    }

    if (!disputeDetails.creditor_name || !disputeDetails.dispute_type || !disputeDetails.bureau) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (!hasPersonalInfo) {
      toast({
        title: "Personal Information Required",
        description: "Please complete your personal information in the Success Checklist before generating a dispute letter.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // First, analyze the dispute
      const analysisResult = await openai.analyzeDispute(user.uid, disputeDetails);
      setAnalysis(analysisResult);
      
      // Then, generate the dispute letter
      // TODO: Implement this 
      // const response = await openai.chat.completions.create({
      //   model: 'gpt-4-turbo-preview',
      //   messages: [
      //     {
      //       role: 'system',
      //       content: `You are a credit repair expert specializing in generating professional dispute letters. 
      //       Use formal business letter format and include all relevant legal references.`
      //     },
      //     {
      //       role: 'user',
      //       content: `Generate a formal dispute letter for:
      //         Creditor: ${disputeDetails.creditor_name}
      //         Account: ${disputeDetails.account_number || 'Not provided'}
      //         Amount: $${disputeDetails.amount || 'Not specified'}
      //         Type: ${disputeDetails.dispute_type}
      //         Bureau: ${disputeDetails.bureau}
      //         Additional Info: ${disputeDetails.additional_info || 'None provided'}

      //         Include:
      //         1. Proper business letter formatting
      //         2. All relevant FCRA/FDCPA citations
      //         3. Specific dispute reasons
      //         4. Request for investigation
      //         5. 30-day investigation notice
      //         6. Statement of rights`
      //     }
      //   ],
      //   max_tokens: 4000,
      //   temperature: 0.7,
      // });

      // setLetter(response.choices[0].message.content);
      
      // toast({
      //   title: "Analysis Complete",
      //   description: "AI has analyzed your dispute and generated a customized letter.",
      // });
      
      setActiveTab('analysis');
    } catch (error) {
      console.error('AI Analysis Error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "There was an error analyzing your dispute. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (letter) {
      try {
        await navigator.clipboard.writeText(letter);
        toast({
          title: "Copied!",
          description: "Dispute letter copied to clipboard.",
        });
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Failed to copy letter to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  const downloadLetter = () => {
    if (letter) {
      const blob = new Blob([letter], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dispute-letter-${disputeDetails.creditor_name.toLowerCase().replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-brand-navy flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-brand-yellow" />
            AI Dispute Assistant
          </DialogTitle>
        </DialogHeader>

        {!hasPersonalInfo && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <UserCheck className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Personal Information Required</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Please complete your personal information in the Success Checklist before generating a dispute letter.
                  This ensures your letters include all necessary identification details.
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Dispute Details</TabsTrigger>
            <TabsTrigger value="analysis" disabled={!analysis}>Analysis & Letter</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="creditor">Creditor Name</Label>
                  <Input
                    id="creditor"
                    value={disputeDetails.creditor_name}
                    onChange={(e) => setDisputeDetails(prev => ({ ...prev, creditor_name: e.target.value }))}
                    placeholder="Enter creditor name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account">Account Number</Label>
                  <Input
                    id="account"
                    value={disputeDetails.account_number}
                    onChange={(e) => setDisputeDetails(prev => ({ ...prev, account_number: e.target.value }))}
                    placeholder="Enter account number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={disputeDetails.amount}
                    onChange={(e) => setDisputeDetails(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bureau">Credit Bureau</Label>
                  <Select
                    value={disputeDetails.bureau}
                    onValueChange={(value) => setDisputeDetails(prev => ({ ...prev, bureau: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bureau" />
                    </SelectTrigger>
                    <SelectContent>
                      {CREDIT_BUREAUS.map((bureau) => (
                        <SelectItem key={bureau} value={bureau}>
                          {bureau}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="type">Dispute Type</Label>
                  <Select
                    value={disputeDetails.dispute_type}
                    onValueChange={(value) => setDisputeDetails(prev => ({ ...prev, dispute_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dispute type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISPUTE_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="additional">Additional Information</Label>
                  <Input
                    id="additional"
                    value={disputeDetails.additional_info}
                    onChange={(e) => setDisputeDetails(prev => ({ ...prev, additional_info: e.target.value }))}
                    placeholder="Enter any additional details that may help with the dispute"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <Scale className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">Legal Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Get relevant laws and regulations that support your case
                  </p>
                </Card>
                <Card className="p-4">
                  <Target className="h-5 w-5 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-900 mb-1">Success Probability</h3>
                  <p className="text-sm text-gray-600">
                    Calculate your chances of success based on historical data
                  </p>
                </Card>
              </div>

              <Button
                onClick={runAnalysis}
                className="w-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                disabled={loading}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {loading ? 'Analyzing...' : 'Generate Analysis & Letter'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            {loading ? (
              <div className="py-6">
                <div className="flex flex-col items-center">
                  <div className="animate-spin">
                    <Sparkles className="h-8 w-8 text-brand-yellow" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                    Analyzing Your Dispute
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-6">
                    Please wait while our AI analyzes your dispute details and generates recommendations...
                  </p>
                  <Progress value={65} className="w-full h-2" />
                </div>
              </div>
            ) : (
              <div className="py-4 space-y-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-medium text-gray-900">Analysis Results</h3>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap">
                    {analysis?.analysis}
                  </div>
                </div>

                {letter && (
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900">Generated Dispute Letter</h3>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadLetter}
                          className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-[90vh] overflow-y-auto">
                      <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
                        {letter}
                      </pre>
                    </div>
                  </Card>
                )}

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-brand-navy text-brand-navy hover:bg-brand-navy/10"
                    onClick={() => {
                      setActiveTab('details');
                      setAnalysis(null);
                      setLetter(null);
                    }}
                  >
                    Edit Details
                  </Button>
                  <Button
                    className="flex-1 bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    onClick={runAnalysis}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}