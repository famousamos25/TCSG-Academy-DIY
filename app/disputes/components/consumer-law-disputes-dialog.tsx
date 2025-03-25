'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FileText, Search, X } from 'lucide-react';
import { useState } from 'react';

interface ConsumerLawDisputesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DISPUTE_TYPES = [
  {
    name: 'Derogatory',
    count: 21,
    description: 'You have 21 Derogatory(s)'
  },
  {
    name: 'Inquiries',
    count: 5,
    description: 'You have 5 Inquiry(s)'
  },
  {
    name: 'Late Payments',
    count: 2,
    description: 'You have 2 Late Payment(s)'
  },
  {
    name: 'Public Records',
    count: 0,
    description: 'You have none'
  },
  {
    name: 'All Accounts',
    count: 0,
    description: 'You have none'
  },
  {
    name: 'Personal Information',
    count: 0,
    description: 'Dispute'
  }
];

const ACCOUNTS = [
  {
    furnisher: 'UTILITY SELFREPORTED',
    accountId: 'PR026AB925D0915481288780E8947F597E4',
    accountType: 'Unknown -credit',
    bureaus: {
      tu: 'Not Reported',
      exp: 'In-Dispute',
      eqfx: 'Not Reported'
    },
    reason: 'CDTR',
    instruction: 'Please delete due to a violation of',
    status: 'Positive'
  },
  {
    furnisher: 'FB&T/MERCURY',
    accountId: '0059499809',
    accountType: 'Credit Card',
    bureaus: {
      tu: 'In-Dispute',
      exp: 'In-Dispute',
      eqfx: 'In-Dispute'
    },
    reason: 'CDTR',
    instruction: 'Please delete due to a violation of',
    status: 'Negative'
  },
  {
    furnisher: 'LVNV FUNDING LLC',
    accountId: '379364015536330',
    accountType: 'Unknown -credit',
    bureaus: {
      tu: 'Not Reported',
      exp: 'In-Dispute',
      eqfx: 'In-Dispute'
    },
    reason: 'CDTR',
    instruction: 'Please delete due to a violation of',
    status: 'Negative'
  },
  {
    furnisher: 'LVNV FUNDING LLC',
    accountId: '4707930522615307',
    accountType: 'Unknown -credit',
    bureaus: {
      tu: 'Not Reported',
      exp: 'In-Dispute',
      eqfx: 'In-Dispute'
    },
    reason: 'CDTR',
    instruction: 'Please delete due to a violation of',
    status: 'Negative'
  },
  {
    furnisher: 'SECCREDIT',
    accountId: '5194979',
    accountType: 'Collection',
    bureaus: {
      tu: 'Not Reported',
      exp: 'Not Reported',
      eqfx: 'In-Dispute'
    },
    reason: 'CDTR Not Found',
    instruction: 'Please delete due to a violation of',
    status: 'Negative'
  }
];

interface BureauSelection {
  tu: boolean;
  exp: boolean;
  eqfx: boolean;
}

interface AccountBureauSelections {
  [accountId: string]: BureauSelection;
}

const DISPUTE_REASONS = {
  'CDTR': {
    title: 'Under 15 USC 1692g; Validation of debts',
    description: 'Request for validation of debt under FDCPA'
  },
  'CDTR Not Found': {
    title: 'Under 15 USC 1692g; Validation of debts',
    description: 'Debt collector not found or unable to validate debt'
  }
};

// Full text versions of the reasons
const AVAILABLE_REASONS = [
  {
    short: 'Under 15 U.S. Code § 1681 (a)(4) Consumer...',
    full: "Under 15 U.S. Code § 1681 (a)(4) Consumer reporting agencies have assumed a vital role in assembling and evaluating consumer credit and other information on consumers. There is a need to ensure that consumer reporting agencies exercise their grave responsibilities with fairness, impartiality, and a respect for the consumer's right to privacy."
  },
  {
    short: 'Under 15 USC 1692g; Validation of debts',
    full: 'Under 15 USC 1692g; Validation of debts - Within five days after the initial communication with a consumer in connection with the collection of any debt, a debt collector shall, unless the following information is contained in the initial communication or the consumer has paid the debt, send the consumer a written notice containing the amount of the debt, the name of the creditor to whom the debt is owed, and statements regarding dispute rights.'
  },
  {
    short: 'Under 15 U.S. Code § 1681i Consumer...',
    full: "Under 15 U.S. Code § 1681i Consumer dispute procedure - If the completeness or accuracy of any item of information contained in a consumer's file at a consumer reporting agency is disputed by the consumer and the consumer notifies the agency directly, or indirectly through a reseller, of such dispute, the agency shall, free of charge, conduct a reasonable reinvestigation to determine whether the disputed information is inaccurate."
  }
];

// Full text versions of the instructions
const AVAILABLE_INSTRUCTIONS = [
  {
    short: 'Please delete this account immediately f...',
    full: 'Please delete this account immediately from my credit report as it does not belong to me and I have no knowledge of this account. This account was either opened fraudulently or is being reported in error.'
  },
  {
    short: 'Please delete due to a violation of',
    full: 'Please delete due to a violation of the Fair Credit Reporting Act. This account contains inaccurate information and the furnisher has failed to provide proper verification as required by law.'
  },
  {
    short: 'Please investigate and remove this account',
    full: 'Please investigate and remove this account from my credit report. After careful review, I have found that this account contains errors regarding payment history, balance information, and/or account status that do not accurately reflect my credit behavior.'
  }
];

export function ConsumerLawDisputesDialog({ open, onOpenChange }: ConsumerLawDisputesDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedDisputeType, setSelectedDisputeType] = useState('Derogatory');
  const [disputeRound, setDisputeRound] = useState('Dispute Round #1');
  const [bureauSelections, setBureauSelections] = useState<AccountBureauSelections>({});
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedInstruction, setSelectedInstruction] = useState('');
  const [customSelections, setCustomSelections] = useState<{
    [accountId: string]: {
      reason?: string;
      instruction?: string;
      cdtr?: boolean;
    };
  }>({});

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === ACCOUNTS.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(ACCOUNTS.map(account => account.accountId));
    }
  };

  const handleBureauToggle = (accountId: string, option: keyof BureauSelection | 'cdtr') => {
    if (option === 'cdtr') {
      setCustomSelections(prev => ({
        ...prev,
        [accountId]: {
          ...prev[accountId],
          cdtr: !prev[accountId]?.cdtr
        }
      }));
    } else {
      setBureauSelections(prev => ({
        ...prev,
        [accountId]: {
          ...prev[accountId] || { tu: false, exp: false, eqfx: false },
          [option]: !prev[accountId]?.[option]
        }
      }));
    }
  };

  const filteredAccounts = ACCOUNTS.filter(account => 
    account.furnisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDisputeTypeSelect = (type: string) => {
    setSelectedDisputeType(type);
  };

  const handleCustomSelection = (accountId: string, type: 'reason' | 'instruction', value: string) => {
    setCustomSelections(prev => ({
      ...prev,
      [accountId]: {
        ...prev[accountId],
        [type]: value
      }
    }));
  };

  const renderBureauCheckboxes = (account: typeof ACCOUNTS[0]) => {
    const selections = bureauSelections[account.accountId] || { tu: false, exp: false, eqfx: false };
    const customSelection = customSelections[account.accountId] || {};
    
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <div className="text-xs text-gray-500">TU</div>
            <Checkbox
              checked={selections.tu}
              onCheckedChange={() => handleBureauToggle(account.accountId, 'tu')}
              disabled={account.bureaus.tu === 'Not Reported'}
              className={account.bureaus.tu === 'In-Dispute' ? 'bg-blue-100' : ''}
            />
          </div>
          <div>
            <div className="text-xs text-gray-500">EXP</div>
            <Checkbox
              checked={selections.exp}
              onCheckedChange={() => handleBureauToggle(account.accountId, 'exp')}
              disabled={account.bureaus.exp === 'Not Reported'}
              className={account.bureaus.exp === 'In-Dispute' ? 'bg-blue-100' : ''}
            />
          </div>
          <div>
            <div className="text-xs text-gray-500">EQFX</div>
            <Checkbox
              checked={selections.eqfx}
              onCheckedChange={() => handleBureauToggle(account.accountId, 'eqfx')}
              disabled={account.bureaus.eqfx === 'Not Reported'}
              className={account.bureaus.eqfx === 'In-Dispute' ? 'bg-blue-100' : ''}
            />
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">CDTR</div>
          <Checkbox
            checked={customSelection.cdtr}
            onCheckedChange={() => handleBureauToggle(account.accountId, 'cdtr')}
          />
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1200px] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Create New Dispute(s)</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <h2 className="text-lg font-medium text-center mb-6">What do you want to dispute?</h2>

          <div className="grid grid-cols-6 gap-4">
            {DISPUTE_TYPES.map((type) => (
              <div 
                key={type.name}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedDisputeType === type.name 
                    ? 'border-brand-yellow ring-2 ring-brand-yellow/50 bg-brand-yellow/5' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => handleDisputeTypeSelect(type.name)}
              >
                <div className="mb-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Attack Guide
                  </Badge>
                </div>
                <div className="flex flex-col items-center justify-center h-20">
                  <FileText className="h-6 w-6 mb-2 text-brand-navy" />
                  <div className="text-center">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-xs text-gray-600">{type.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
              <div className="text-xl font-bold">0</div>
              <div className="text-sm text-gray-600">Inquiries</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
              <div className="text-xl font-bold">0</div>
              <div className="text-sm text-gray-600">Derogatory Accounts</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
              <div className="text-xl font-bold">0</div>
              <div className="text-sm text-gray-600">Late Payment Accounts</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
              <div className="text-xl font-bold">0</div>
              <div className="text-sm text-gray-600">Public Records</div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
              >
                Dispute All
              </Button>
              
              <Select value={disputeRound} onValueChange={setDisputeRound}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dispute Round #1">Dispute Round #1</SelectItem>
                  <SelectItem value="Dispute Round #2">Dispute Round #2</SelectItem>
                  <SelectItem value="Dispute Round #3">Dispute Round #3</SelectItem>
                </SelectContent>
              </Select>

              {Object.values(bureauSelections).some(sel => Object.values(sel).some(v => v)) && (
                <Select value={selectedReason} onValueChange={setSelectedReason}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <TooltipProvider>
                      {AVAILABLE_REASONS.map((reason) => (
                        <Tooltip key={reason.short} delayDuration={300}>
                          <TooltipTrigger asChild>
                            <SelectItem value={reason.short}>{reason.short}</SelectItem>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-md p-4 bg-white border shadow-lg rounded-md">
                            <p className="text-sm">{reason.full}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </SelectContent>
                </Select>
              )}

              {Object.values(bureauSelections).some(sel => Object.values(sel).some(v => v)) && (
                <Select value={selectedInstruction} onValueChange={setSelectedInstruction}>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select instruction" />
                  </SelectTrigger>
                  <SelectContent>
                    <TooltipProvider>
                      {AVAILABLE_INSTRUCTIONS.map((instruction) => (
                        <Tooltip key={instruction.short} delayDuration={300}>
                          <TooltipTrigger asChild>
                            <SelectItem value={instruction.short}>{instruction.short}</SelectItem>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-md p-4 bg-white border shadow-lg rounded-md">
                            <p className="text-sm">{instruction.full}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="relative w-[300px]">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="text-sm text-gray-600 italic">
            Choose the current round for this dispute cycle.
          </div>

          <div className="border rounded-md overflow-hidden shadow-sm mt-4">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedAccounts.length === ACCOUNTS.length && ACCOUNTS.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>FURNISHER</TableHead>
                  <TableHead>ACCOUNT TYPE</TableHead>
                  <TableHead>BUREAUS</TableHead>
                  <TableHead>REASON</TableHead>
                  <TableHead>INSTRUCTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.accountId} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox 
                        checked={selectedAccounts.includes(account.accountId)}
                        onCheckedChange={() => handleSelectAccount(account.accountId)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{account.furnisher}</div>
                      <div className="text-sm text-gray-500">{account.accountId}</div>
                      <div className={`text-xs ${account.status === 'Positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {account.status}
                      </div>
                    </TableCell>
                    <TableCell>{account.accountType}</TableCell>
                    <TableCell>
                      {renderBureauCheckboxes(account)}
                    </TableCell>
                    <TableCell>
                      {customSelections[account.accountId]?.reason || account.reason}
                    </TableCell>
                    <TableCell>
                      {customSelections[account.accountId]?.instruction || account.instruction}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button 
              className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
              disabled={selectedAccounts.length === 0}
            >
              Create Letters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}