"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { useState } from "react"
import { topUpOptions } from "@/constants/top-up-options"
import { TopUpCard } from "./top-up-card"
import { CreditUsageCard } from "./credit-usage-card"
import { TopUpForm } from "./top-up-form"
interface SendDisputesMailProps {
  isOpen: boolean
  handleClose: () => void;
}
export function TopUpDialog({isOpen, handleClose} : SendDisputesMailProps) {
  const [options] = useState(topUpOptions)  
  return (
    <Dialog open= {isOpen}>
      <DialogContent className="flex flex-col items-start justify-start min-w-[80vw] h-[90vh] px-6 py-0">
        <DialogHeader className="flex flex-row w-full items-end justify-end">
          <X className=" w-7 h-7 cursor-pointer p-1 rounded-md text-brand-navy hover:bg-brand-yellow/90" onClick={handleClose}/>
        </DialogHeader>
        <div className="flex w-full">
          <div className="flex flex-col w-2/3 p-2">
             <div className="flex flex-col">
               <h3 className="text-green-500 mb-1 text-center text-xl font-semibold"> Add Credits </h3>
             </div>
             <hr />
             <div className="grid grid-cols-2">
             {
                 options.map((o,i)=> <TopUpCard key={i} amount={o.amount} description={o.description} />)
             }
             </div>
            <div>
              <TopUpForm hanldeClose={handleClose} />
            </div>
          </div>
          <div className="w-1/3 flex flex-col p-2">
            <div className="flex flex-col">
               <h3 className="text-green-500 mb-1 text-center text-xl font-semibold"> Credits Usage </h3>
             </div>
             <hr />
           <CreditUsageCard />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
