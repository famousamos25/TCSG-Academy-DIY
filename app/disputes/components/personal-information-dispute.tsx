import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X } from 'lucide-react';
import DisputeTableRow from './dispute-table-row';
import { useState } from 'react';
import { CreatePersonalInfoDisputeDialog } from './create-personal-info-dispute';

interface PersonalInformationDisputeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PersonalInformationDisputeDialog({ open, onOpenChange }: PersonalInformationDisputeDialogProps) {
  const [show, setShow] = useState<boolean>(false)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] w-[1200px] max-h-[90vh] p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold">Create New Dispute(s)</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                    <Table className='border'>
                        <TableHeader>
                            <TableRow className="border-b">
                                <TableHead className="text-slate-400 pl-6 text-left">Field</TableHead>
                                <TableHead className="text-cyan-400 text-left">TRANSUNION</TableHead>
                                <TableHead className="text-blue-400 text-left">EXPERIAN</TableHead>
                                <TableHead className="text-red-400 text-left">EQUIFAX</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <DisputeTableRow />

                        </TableBody>
                    </Table>
                    <div className="flex justify-end space-x-4 mt-6">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                        <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" onClick={()=>setShow(!show)}>
                            Create Personal Information Dispute
                        </Button>
                    </div>
                </div>
            </DialogContent>
            {
                show &&
                <CreatePersonalInfoDisputeDialog isOpen={show} handleClose={() =>setShow(!show)}/>
            }
        </Dialog>
    );
}
