"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { LetterSelection } from "./letter-selection"
import { LetterSelectionDestination } from "./letter-selection-destination"
import { LetterAccountSelection } from "./letter-account-selection"
import { useState } from "react"

interface OtherdisputeDialogProps {
    open: boolean
    onOpenChange: () =>void;
}
export function OtherdisputeDialog ({open,onOpenChange}:OtherdisputeDialogProps) {
    const handleFilters = (e:string) => {
       setLetterFilter(e)
    }
    const handleAccountFilter = (e: string) => {
      setAccountFilter(e)
    }
    const [letterFilter, setLetterFilter] = useState<string>('')
    const [accountFilter, setAccountFilter] = useState<string> ('')
    return (
        <Dialog open={open}>
        <DialogContent className="min-w-[95vw] max-h-[90vh] p-4">
          <DialogHeader>
            <div className="flex items-center justify-between mb-1">
            <DialogTitle>Create a letter</DialogTitle>
            <X  className="h-4 w-4 cursor-pointer" onClick={onOpenChange}/>
            </div>
          </DialogHeader>
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/3 mx-1">
              <LetterSelection emitFilter = {(e)=> handleFilters(e)} />
            </div>
            <div className="w-full md:w-1/3 mx-1">
            <LetterSelectionDestination  filter = {letterFilter} handleEmit={(e) => handleAccountFilter(e)} />
            </div>
            <div className="w-full md:w-1/3 mx-1">
            <LetterAccountSelection filter = {accountFilter} />
            </div>
          </div>
          <DialogFooter>
            <Button variant={"outline"} type="submit" onClick={onOpenChange}>Close</Button>
            <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" type="submit">Create Letter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
