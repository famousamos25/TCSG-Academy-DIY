"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
  interface SelectNextRoundDialogProps {
    handleClose: () => void;
    isOpen: boolean;
  }  
  export function SelectNextRoundDialog({ handleClose, isOpen }:SelectNextRoundDialogProps) {
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
            <AlertDialogTitle  className="mx-auto text-lg font-semibold">Do you want to proceed ?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-center">
                This will generate your Next Round Dispute Letter for unresolved/Verified Items
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="bg-transparent text-red-600 border-red-600 cursor-pointer text-sm hover:bg-transparent hover:text-red-600" onClick={handleClose}>Go Back</AlertDialogCancel>
            <AlertDialogAction className="bg-green-500 text-white cursor-pointer text-sm hover:bg-green-500" onClick={handleClose}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  