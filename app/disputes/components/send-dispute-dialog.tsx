"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
  interface SendDisputeDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    handleSave: () => void;
  }  
  export function SendDisputeDialog({isOpen, handleSave, handleClose}: SendDisputeDialogProps) {
    return (
      <AlertDialog open = {isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-end justify-end cursor-pointer">
               <X className = "h-4 w-4" onClick={handleClose}/>
            </div>
            <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FF9F43" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/>
            <line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            </div>
            <AlertDialogTitle  className="mx-auto text-lg font-semibold">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-center">
                Please ensure each letter is marked as sent only after it has been mailed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="bg-transparent text-red-600 border-red-600 cursor-pointer text-sm hover:bg-transparent hover:text-red-600" onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" onClick={handleSave}>Yes Mark as Sent!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  