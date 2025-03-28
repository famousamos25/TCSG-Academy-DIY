import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface UndoStatusDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export function UndoStatusDialog({ open, onOpenChange, onConfirm }: UndoStatusDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="text-center">
                    <AlertCircle className="text-orange-400 mx-auto" size={40} />
                    <DialogTitle className="text-lg font-semibold">Are you sure?</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Mark the letter as unsent if it has not been mailed.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-center space-x-4">
                    <Button variant="destructive" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant="secondary" onClick={onConfirm}>Yes, Mark As Unsent!</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
