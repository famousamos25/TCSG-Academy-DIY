"use client"
import { ChevronDown, Search } from "lucide-react"
import { LetterSelectionCard } from "./letter-selection-card"
import { LetterSelectionData } from "@/constants/letter-selection-data"

export function LetterSelection () {
   return (
    <div className="flex flex-col border-[1px] border-gray-500 rounded-md">
       <div className="flex flex-col mb-1 p-4">
          <h2 className="font-semibold text-lg">1.Which letter would you like to send?</h2>
          <h3 className="text-md opacity-90">Please choose one:</h3>
       </div>
       <div className="border-b-[1px] border-gray-600 h-[1px] mb-2"></div>
       <div className="flex flex-col md:flex-row p-4">
         <div className="w-full md:w-1/2 mr-2">
            <form className="border-gray-500 border-[1px] focus-within:border-[1px] focus-within:border-green-600 rounded-md p-1">
               <div className="flex items-center w-full">
               <Search className="flex h-4 w-4"/>
               <input className="border-0 focus:outline-none ml-1 w-4/5" type="text" placeholder="Search for a letter" />
               </div>
            </form>
         </div>
         <div className="w-full md:w-1/2 mx-2">
            <form className="border-gray-500 border-[1px] focus-within:border-[1px] focus-within:border-green-600  rounded-md px-1">
               <div className="flex items-center justify-between">
               <select className="border-0 focus:outline-none w-full h-8 overflow-y-auto">
                  <option>Pre Dispute</option>
                  {LetterSelectionData.map(l=><option key={l.round}>{l.round}</option>)}
               </select>
               <ChevronDown className="w-2 h-2"/>
               </div>
            </form>
         </div>
       </div>
       <div className="max-h-[45vh] overflow-y-auto px-4 py-0">
        {LetterSelectionData.map(i => (<LetterSelectionCard key={i.type} lane={1}/>))}
       </div>
    </div>
   )
}