import React from 'react';
import { X } from 'lucide-react';
import { disputeInstructions } from '@/constants/edit-dipute-letter-data';
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

interface InstructionsForAllModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InstructionsForAllModal({ open, onOpenChange }: InstructionsForAllModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-black border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            What's inaccurate or incorrect about this account?
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 text-slate-400 hover:text-slate-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        <div className="py-2">

          <RadioGroup className="space-y-3" aria-label="Inquiries">
            {disputeInstructions.map((category, catIdx) => (
              <div key={catIdx} className="mb-6">
                <h3 className="text-xs font-semibold tracking-wide uppercase text-emerald-500 mb-2">
                  {category.category}
                </h3>
                <RadioGroup
                  defaultValue={category.items[0] ?? ""}
                  className="space-y-3"
                  aria-label={category.category}
                >
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 border border-slate-700 rounded-md p-2 cursor-pointer"
                    >
                      <RadioGroupItem
                        value={item}
                        id={`reason-${catIdx}-${idx}`}
                        className="border-slate-600 text-blue-500"
                      />
                      <Label htmlFor={`reason-${catIdx}-${idx}`} className="text-sm cursor-pointer">
                        {item}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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

