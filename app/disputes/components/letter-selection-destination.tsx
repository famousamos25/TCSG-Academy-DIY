"use client"

import { Search } from "lucide-react"
import { LetterDestinationData } from "@/constants/letter-destination-data"
import React, { useEffect, useState } from "react"
import { LetterSelectionDestinationcard, letterSelectionDestinationProps } from "./letter-selection-destination-card"
interface LetterDestinationProps {
   filter: string;
   handleEmit: (e: string) => void
}
export function LetterSelectionDestination ({filter, handleEmit}: LetterDestinationProps) {
    const [data] = useState<letterSelectionDestinationProps[]>(LetterDestinationData)
    const [filteredData,setFilteredData] = useState<letterSelectionDestinationProps[]>(LetterDestinationData)
    const [search,setSearch] = useState<string>("")
    const [propsFilter,setPropsFilter] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
        search != "" ? setFilteredData(data.filter(d=>d.name?.toLowerCase()?.includes(value.toLowerCase()))) : setFilteredData(data)
    }
    useEffect(()=>{
      if(filter != '' && filter != undefined){
          setPropsFilter(filter)
      }
    },[filter])
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
               value={search}
               onChange={handleChange}
               placeholder="Search for a bureau or credit name" 
               />
               </div>
            </form>
         </div>
       </div>
       <div className="max-h-[45vh] overflow-y-auto px-4 py-0">
         {propsFilter && 
            filteredData.filter(d=> d.type.toLowerCase().includes(propsFilter.toLowerCase())).map((f,i)=> (<LetterSelectionDestinationcard  key={i} data={f} handleClick={handleEmit}/>))
         }
       </div>
    </div>
    )
}