'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FURNISHER_DATA } from '@/constants/furnisher-data';
import { auth, db } from '@/lib/firebase';
import { randomId } from '@/lib/utils';
import { DisputeLetter } from '@/types/dispute-center';
import { doc, setDoc } from 'firebase/firestore';
import { ExternalLink, Eye, Loader, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'sonner';
import { SecurityFreezeDetailDialog } from './security-freeze-detail-dialog';

interface SecurityFreezeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SecurityFreezeDialog({ open, onOpenChange }: SecurityFreezeDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFurnishers, setSelectedFurnishers] = useState<string[]>([]);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
  const [isCreatingSecurityFreezeDispute, setIsCreatingSecurityFreezeDispute] = useState(false);

  const [user] = useAuthState(auth);

  const handleCreateSecurityFreezeDispute = async () => {
    setIsCreatingSecurityFreezeDispute(true);


    try {
      if (selectedFurnishers.length === 0) {
        toast('Error', {
          description: 'Please select at least one furnisher.',
          duration: 3000
        });
        setIsCreatingSecurityFreezeDispute(false);
        return;
      }

      const selectedFurnisherData = FURNISHER_DATA.filter(f => selectedFurnishers.includes(f.name));

      const dataMapped: DisputeLetter[] = selectedFurnisherData.map(f => ({
        id: randomId(),
        letterName: 'Security Freeze Attack',
        letterType: "securityFreeze",
        creditBureauName: f.name,
        shortDescription: 'Data Furnisher',
        createdAt: new Date().toISOString(),
        letterRound: 1,
        userId: user?.uid || '',
        letterSent: false,
        letterCompleted: false,
        inquiries: [],
        accounts: [],
      }));

      await Promise.all(dataMapped.map(async (letter) => {
        const letterRef = await doc(db, 'letters', letter.id);
        await setDoc(letterRef, letter);
      }));

      // Handle success
      toast('Success', {
        description: 'Your Security Freeze Dispute has been created successfully.',
        duration: 3000
      });
      setSelectedFurnishers([]);
      onOpenChange(false);
    } catch (error) {
      toast("Failed", {
        description: "An error occurred while creating the Security Freeze Dispute.",
        duration: 3000
      });
    } finally {
      setIsCreatingSecurityFreezeDispute(false);
    }
  };

  const filteredFurnishers = FURNISHER_DATA.filter(furnisher =>
    furnisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    furnisher.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    setSelectedFurnishers(FURNISHER_DATA.map(f => f.name));
  };

  const handleDeselectAll = () => {
    if (selectedFurnishers.length > 0) {
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

        <div className="space-y-6 max-h-[calc(90vh-160px)] overflow-y-auto pr-1">
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
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600" onClick={() => setIsDetailDialogOpen(!isDetailDialogOpen)}>
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

        </div>
        <DialogFooter className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            disabled={selectedFurnishers.length === 0 || isCreatingSecurityFreezeDispute}
            onClick={handleCreateSecurityFreezeDispute}
          >
            {
              isCreatingSecurityFreezeDispute && <Loader className="animate-spin h-4 w-4 mr-2" />
            }
            Create Security Freeze Dispute
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}