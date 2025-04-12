"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface DeleteDialogProps {
    isOpen: boolean;
    creditorName: string;
    handleClose : () => void;
}
export function DeleteDialog({isOpen, creditorName, handleClose}: DeleteDialogProps) {
  return (
    <Dialog open = {isOpen}>
      <DialogContent className="sm:max-w-[40vw]">
        <DialogHeader className="flex items-end justify-end">
          <X className = "w-5 h-5 cursor-pointer my-0 py-0" onClick={handleClose}/>
        </DialogHeader>
         <div className="flex flex-col items-center">
           <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FF9F43" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/>
            <line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            </div>
           <h2 className="font-semibold text-xl mt-4 mb-2">Are you sure ?</h2>
           <p className="text-md mb-4">Do you want to delete {creditorName}</p>
         </div>
        <DialogFooter>
          <Button type="submit" variant="destructive" onClick={handleClose}>Cancel</Button>
          <Button type="submit" className="yellow bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" onClick={handleClose}>Yes Delete!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
