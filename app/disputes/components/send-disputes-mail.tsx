"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { DerogatoryLetter } from "./derogatory-letter"
import { MailServiceOptionsCard } from "./mail-service-options-card"
import { PriceCalculatorCard } from "./price-calculator-card"
interface SendDisputesMailProps {
  isOpen: boolean
  handleClose: () => void;
}
export function SendDisputesMail({isOpen, handleClose} : SendDisputesMailProps) {
  return (
    <Dialog open= {isOpen}>
      <DialogContent className="flex flex-col items-start justify-start min-w-[95vw] h-[90vh] px-6 py-0">
        <DialogHeader className="flex flex-row w-full items-center justify-between">
          <DialogTitle>Mailer</DialogTitle>
          <X className=" w-7 h-7 cursor-pointer p-1 rounded-md text-brand-navy hover:bg-brand-yellow/90" onClick={handleClose}/>
        </DialogHeader>
        <div className="flex w-full">
          <div className="w-1/2 border-[1px] border-gray-300 rounded-md p-2 max-h-[35vh]">
             <DerogatoryLetter  />
          </div>
          <div className="w-1/4 mx-2 border-[1px] border-gray-300 rounded-md p-2">
           <MailServiceOptionsCard />
          </div>
          <div className="w-1/4 flex flex-col ">
          <div className="mx-2 border-[1px] border-gray-300 rounded-md p-0">
           <PriceCalculatorCard />
          </div>
          <div className="flex items-start px-3 mt-4"> 
           <button className="bg-green-500 text-white text-xs border-[1px] border-green-500 rounded-sm px-3 py-1 cursor-pointer mr-2"> Cancel </button>
           <button className="text-green-500 text-xs border-[1px] border-green-500 rounded-sm px-3 py-1 cursor-pointer mx-2"> Topup</button>
           <button className="bg-green-500 text-white text-xs border-[1px] border-green-500 rounded-sm px-3 py-1 cursor-pointer mx-2"> Pay & Mail </button>
           </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
