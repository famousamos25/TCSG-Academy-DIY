'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FURNISHER_DATA } from '@/constants/furnisher-data';
import { ExternalLink, Eye, X } from 'lucide-react';
import { useState } from 'react';
import { SecurityFreezeDetailDialog } from './security-freeze-detail-dialog';

interface SecurityFreezeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SecurityFreezeDialog({ open, onOpenChange }: SecurityFreezeDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFurnishers, setSelectedFurnishers] = useState<string[]>([]);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
   
  const filteredFurnishers = FURNISHER_DATA.filter(furnisher => 
    furnisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    furnisher.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    setSelectedFurnishers(FURNISHER_DATA.map(f => f.name));
  };

  const handleDeselectAll = () => {
     if(selectedFurnishers.length > 0){
       setSelectedFurnishers([]);
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
            {selectedFurnishers.length > 0 && 
              <Button 
              variant="outline" 
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
              onClick={handleDeselectAll}
              >
              Deselect All Data Furnisher
              </Button>
            }
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
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600" onClick={()=>setIsDetailDialogOpen(!isDetailDialogOpen)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Learn More</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isDetailDialogOpen &&
            <SecurityFreezeDetailDialog 
              isOpen={isDetailDialogOpen} 
              onOpenChange={() => setIsDetailDialogOpen(!isDetailDialogOpen)} 
            />
          }

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