"use client"

import { Search } from "lucide-react"
import { LetterSelectionCard } from "./letter-selection-card"

export function LetterSelectionDestination () {
    return (
        <div className="flex flex-col border-[1px] border-gray-500 rounded-md">
       <div className="flex flex-col mb-1 p-4">
          <h2 className="font-semibold text-lg">2.Where do you want to send this letter?</h2>
          <h3 className="text-md opacity-90">Please choose one:</h3>
       </div>
       <div className="border-b-[1px] border-gray-600 h-[1px] mb-2"></div>
       <div className="flex flex-col md:flex-row p-4">
         <div className="w-full mx-1">
            <form className="border-gray-500 border-[1px] focus-within:border-[1px] focus-within:border-green-600 rounded-md p-1">
               <div className="flex items-center w-full">
               <Search className="flex h-4 w-4"/>
               <input className="border-0 focus:outline-none ml-1 w-4/5" 
               type="text"
               placeholder="Search for a bureau or credit name" 
               />
               </div>
            </form>
         </div>
       </div>
       <div className="max-h-[45vh] overflow-y-auto px-4 py-0">
        {[1,2].map(i => (<LetterSelectionCard  key={i} lane={2}/>))}
       </div>
    </div>
    )
}