'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Eye, ExternalLink } from 'lucide-react';

interface SecurityFreezeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FURNISHER_DATA = [
  {
    name: 'Chex Systems, Inc.,',
    category: 'Check and Bank Screening',
    website: 'http://www.chexsystems.com/',
    phone: '800-428-9623',
    detail: ''
  },
  {
    name: 'SafeRent Solutions, LLC',
    category: 'Tennant Screening',
    website: 'https://saferentsolutions.com/rental-applicant-support/',
    phone: '',
    detail: ''
  },
  {
    name: 'LCI',
    category: 'Employment Screening',
    website: 'https://www.lciinc.com/transunionconsumers/',
    phone: '650-386-0599',
    detail: ''
  },
  {
    name: 'FactorTrust',
    category: 'Low-income and subprime',
    website: 'https://www.transunion.com/client-support/factortrust-consumer-inquiry',
    phone: '844-773-3321',
    detail: ''
  },
  {
    name: 'CoreLogic Credco',
    category: 'Supplementary Reports',
    website: 'https://www.corelogic.com/solutions/credco-consumer-assistance.aspx',
    phone: '877-532-8778',
    detail: ''
  },
  {
    name: 'First Advantage Corporation',
    category: 'Employment Screening',
    website: 'http://www.fadv.com/free-report-for-consumers.aspx',
    phone: '800-845-6004',
    detail: ''
  },
  {
    name: 'Real Page, Inc. (LeasingDesk)',
    category: 'Tennant Screening',
    website: 'https://www.realpage.com/support/consumer/',
    phone: '866-934-1124',
    detail: ''
  },
  {
    name: 'Clarity Services',
    category: 'Low-income and subprime',
    website: 'https://www.clarityservices.com/',
    phone: '866-390-3118',
    detail: ''
  },
  {
    name: 'Teletrack',
    category: 'Low-income and subprime',
    website: 'https://consumers.teletrack.com/',
    phone: '877-309-5226',
    detail: ''
  },
  {
    name: 'MicroBilt',
    category: 'Low-income and subprime',
    website: 'https://www.microbilt.com/us/consumer-affairs',
    phone: '888-222-7621',
    detail: ''
  },
  {
    name: 'DataX',
    category: 'Low-income and subprime',
    website: 'https://consumers.dataxltd.com/annualCreditReport',
    phone: '800-295-4790',
    detail: ''
  },
  {
    name: 'SageStream (subsidiary of ID Analytics, LLC)',
    category: 'Supplementary Reports',
    website: 'http://www.sagestreamllc.com/',
    phone: '1-800-456-1244',
    detail: ''
  },
  {
    name: 'Advanced Resolution Services',
    category: 'Supplementary Reports',
    website: 'https://www.ars-consumeroffice.com/other',
    phone: '800-392-8911',
    detail: ''
  },
  {
    name: 'The Work Number',
    category: 'Employment Screening',
    website: 'https://www.theworknumber.com/Employees/DataReport/',
    phone: '866-604-6570',
    detail: ''
  },
  {
    name: 'First Advantage Corporation Resident Solutions',
    category: 'Tennant Screening',
    website: 'https://fadv.com/solutions/residential-tenant-background-checks/',
    phone: '800-845-6004',
    detail: ''
  },
  {
    name: 'LexisNexis C.L.U.E. (Auto & Property Reports)',
    category: 'Personal Property Insurance',
    website: 'https://consumer.risk.lexisnexis.com/',
    phone: '888-497-0011',
    detail: ''
  },
  {
    name: 'Innovis',
    category: 'Supplementary Reports',
    website: 'https://www.innovis.com/personal/creditReport',
    phone: '800-540-2505',
    detail: ''
  },
  {
    name: 'LexisNexis Risk Solutions',
    category: 'Supplementary Reports',
    website: 'https://consumer.risk.lexisnexis.com/consumer',
    phone: '888-497-0011',
    detail: ''
  },
  {
    name: 'National Consumer Telecom & Utilities Exchange (NCTUE)',
    category: 'Utilities',
    website: 'https://www.nctue.com/consumers',
    phone: '866-349-5185',
    detail: ''
  }
];

export function SecurityFreezeDialog({ open, onOpenChange }: SecurityFreezeDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFurnishers, setSelectedFurnishers] = useState<string[]>([]);

  const filteredFurnishers = FURNISHER_DATA.filter(furnisher => 
    furnisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    furnisher.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedFurnishers.length === FURNISHER_DATA.length) {
      setSelectedFurnishers([]);
    } else {
      setSelectedFurnishers(FURNISHER_DATA.map(f => f.name));
    }
  };

  const toggleFurnisher = (name: string) => {
    setSelectedFurnishers(prev => 
      prev.includes(name) 
        ? prev.filter(f => f !== name) 
        : [...prev, name]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1200px] max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Security Freeze Dispute</DialogTitle>
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

        <div className="space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto pr-1">
          <div className="bg-white p-4 border rounded-md">
            <div className="text-2xl font-bold">{selectedFurnishers.length}</div>
            <div className="text-sm text-gray-600">Furnisher Accounts</div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button 
              variant="outline" 
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
              onClick={handleSelectAll}
            >
              Select All Data Furnisher
            </Button>
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 text-left">
                  <tr className="border-b">
                    <th className="p-4 font-medium text-gray-600 w-[40px]"></th>
                    <th className="p-4 font-medium text-gray-600 w-[25%]">NAME</th>
                    <th className="p-4 font-medium text-gray-600 w-[20%]">CATEGORY</th>
                    <th className="p-4 font-medium text-gray-600 w-[30%]">WEBSITE</th>
                    <th className="p-4 font-medium text-gray-600 w-[15%]">PHONE NUMBER</th>
                    <th className="p-4 font-medium text-gray-600 w-[10%] text-center">DETAIL</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFurnishers.map((furnisher, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <Checkbox 
                          checked={selectedFurnishers.includes(furnisher.name)}
                          onCheckedChange={() => toggleFurnisher(furnisher.name)}
                        />
                      </td>
                      <td className="p-4 truncate" title={furnisher.name}>{furnisher.name}</td>
                      <td className="p-4 truncate" title={furnisher.category}>{furnisher.category}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <a 
                            href={furnisher.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate"
                            title={furnisher.website}
                          >
                            {furnisher.website}
                          </a>
                          <ExternalLink className="h-3 w-3 flex-shrink-0 text-gray-400" />
                        </div>
                      </td>
                      <td className="p-4">{furnisher.phone}</td>
                      <td className="p-4 text-center">
                        {furnisher.detail ? (
                          <span>{furnisher.detail}</span>
                        ) : (
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button 
              className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
              disabled={selectedFurnishers.length === 0}
            >
              Create Security Freeze Dispute
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}