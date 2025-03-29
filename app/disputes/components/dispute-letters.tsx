"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { DisputeLetterSource } from "./dispute-letter-source"
import { SelectDisputeLetter } from "./select-dispute-letter"
import { ReviewDisputeLetter } from "./review-dispute-letter"
import { useState } from "react"

interface OtherdisputeDialogProps {
    open: boolean
    onOpenChange: () =>void;
}
export function DisputeLettersDialog ({open,onOpenChange}:OtherdisputeDialogProps) {
    const [nameFilter, setNameFilter] = useState<string>('');
    const [sourceNameFilter, setSourceNameFilter] = useState<string>('');
    const handleEmittedName = (name: string) => {
      setNameFilter(name)
    }
    const handleEmittedSourceName = (name: string) => {
      setSourceNameFilter(name)
    }
    return (
        <Dialog open={open}>
        <DialogContent className="min-w-[95vw] max-h-[90vh] p-4">
          <DialogHeader>
            <div className="flex items-center justify-between mb-1">
            <DialogTitle>Manage Letters Currently In-Dispute</DialogTitle>
            <X  className="h-4 w-4 cursor-pointer" onClick={onOpenChange}/>
            </div>
          </DialogHeader>
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/3 mx-1">
              <DisputeLetterSource  emitName={(name)=> handleEmittedName(name)}/>
            </div>
            <div className="w-full md:w-1/3 mx-1">
            <SelectDisputeLetter filterName = {nameFilter}  emitFilterName={(name)=> handleEmittedSourceName(name)}/>
            </div>
            <div className="w-full md:w-1/3 mx-1">
            <ReviewDisputeLetter filterName = {sourceNameFilter}/>
            </div>
          </div>
          <DialogFooter>
            <Button variant={"outline"} type="submit" onClick={onOpenChange}>Close</Button>
            <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" type="submit">Start next round</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
