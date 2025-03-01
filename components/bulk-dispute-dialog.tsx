'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FileText,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X,
  CreditCard,
  Building,
  DollarSign,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateDisputeLetter } from '@/lib/dispute-ai';

interface Account {
  id: string;
  creditorName: string;
  accountNumber: string;
  amount: number;
  status: string;
  userId: string;
}

interface BulkDisputeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: Account[];
}

const DISPUTE_TYPES = [
  'Late Payment',
  'Account Not Mine',
  'Incorrect Balance',
  'Account Closed',
  'Identity Theft',
  'Paid as Agreed',
];

const CREDIT_BUREAUS = [
  'Experian',
  'TransUnion',
  'Equifax'
];

export function BulkDisputeDialog({ open, onOpenChange, accounts }: BulkDisputeDialogProps) {
  const { toast } = useToast();
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [disputeType, setDisputeType] = useState('');
  const [bureau, setBureau] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedLetters, setGeneratedLetters] = useState<{ [key: string]: string }>({});

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAccounts(prev => 
      prev.length === accounts.length
        ? []
        : accounts.map(account => account.id)
    );
  };

  const handleGenerate = async () => {
    if (selectedAccounts.length === 0 || !disputeType || !bureau) {
      toast({
        title: 'Missing Information',
        description: 'Please select accounts and fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const letters: { [key: string]: string } = {};
      const increment = 100 / selectedAccounts.length;

      for (const accountId of selectedAccounts) {
        const account = accounts.find(acc => acc.id === accountId);
        if (!account) continue;

        // Generate unique letter for each account
        const result = await generateDisputeLetter(account.userId, {
          creditor_name: account.creditorName,
          account_number: account.accountNumber,
          amount: account.amount,
          dispute_type: disputeType,
          bureau: bureau,
          additional_info: `Bulk dispute - Account ${account.accountNumber}`,
        });

        letters[accountId] = result.letter;
        setProgress(prev => Math.min(prev + increment, 100));
      }

      setGeneratedLetters(letters);

      toast({
        title: 'Letters Generated',
        description: `Successfully generated ${selectedAccounts.length} unique dispute letters.`,
      });
    } catch (error) {
      console.error('Error generating letters:', error);
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate dispute letters',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (accountId: string) => {
    const letter = generatedLetters[accountId];
    if (!letter) return;

    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return;

    const blob = new Blob([letter], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dispute-letter-${account.creditorName.toLowerCase().replace(/\s+/g, '-')}.txt`;
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
              Bulk Dispute Generator
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
          <div className="py-12">
            <div className="text-center">
              <RefreshCw className="h-16 w-16 text-brand-yellow mx-auto mb-6 animate-spin" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Generating Dispute Letters
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Please wait while we generate unique dispute letters for each selected account...
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round(progress)}% Complete
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Dispute Type
                </label>
                <Select value={disputeType} onValueChange={setDisputeType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dispute type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISPUTE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Credit Bureau
                </label>
                <Select value={bureau} onValueChange={setBureau}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bureau" />
                  </SelectTrigger>
                  <SelectContent>
                    {CREDIT_BUREAUS.map(b => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-brand-navy" />
                  <h3 className="font-medium text-gray-900">Select Accounts</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedAccounts.length === accounts.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-gray-600">Select All</span>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>CREDITOR</TableHead>
                      <TableHead>ACCOUNT NUMBER</TableHead>
                      <TableHead>AMOUNT</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead className="text-right">LETTER</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedAccounts.includes(account.id)}
                            onCheckedChange={() => handleSelectAccount(account.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{account.creditorName}</TableCell>
                        <TableCell>{account.accountNumber}</TableCell>
                        <TableCell>${account.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{account.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {generatedLetters[account.id] && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(account.id)}
                              className="text-brand-navy hover:bg-brand-navy/10"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={selectedAccounts.length === 0 || !disputeType || !bureau}
                className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
              >
                Generate {selectedAccounts.length} Letters
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}