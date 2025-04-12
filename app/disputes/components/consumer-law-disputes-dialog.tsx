'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import DisputeTypes from './dispute-types';
interface ConsumerLawDisputesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hideDisputeActions?: boolean;
}
export function ConsumerLawDisputesDialog({ open, onOpenChange, hideDisputeActions }: ConsumerLawDisputesDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-full max-w-[95vw] max-h-[90vh] p-0 overflow-hidden">
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

          <DisputeTypes hideDisputeActions={hideDisputeActions} onOpenChange={onOpenChange}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}