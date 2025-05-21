import React from 'react';
import { X } from 'lucide-react';
import { disputeOptions } from '@/constants/edit-dipute-letter-data';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';

interface ReasonsForAllModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleReasonForAll: (reason: string) => void;
}

export default function ReasonsForAllModal({ open, onOpenChange, handleReasonForAll }: ReasonsForAllModalProps) {
  const roundFlowOption = disputeOptions.find(option => option.category === 'ROUND 1-12 FLOW');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-black border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            What&apos;s inaccurate or incorrect about this account?
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 text-slate-400 hover:text-slate-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        <div className="py-2">
          <h3 className="text-xs font-semibold tracking-wide uppercase text-emerald-500 mb-4">
            Inquiries
          </h3>

          <RadioGroup defaultValue={roundFlowOption?.items[0]} className="space-y-3" aria-label="Inquiries">
            {roundFlowOption?.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 border border-slate-700 rounded-md p-2 cursor-pointer"
              >
                <RadioGroupItem value={item} id={`reason-${idx}`} className="border-slate-600 text-blue-500" onClick={()=> handleReasonForAll(item)}/>
                <Label htmlFor={`reason-${idx}`} className="text-sm cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter className="sm:justify-center pt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

