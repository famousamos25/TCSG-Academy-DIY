"use client"

import { Search } from "lucide-react"
import { letterAccountSelectionData } from "@/constants/letter-account-selection-data"
import { useEffect, useState } from "react"
import { LetterAccountSelectionCard, letterAccountSelectionDataProps } from "./letter-account-selection-card"
interface LetterAccountSelectionProps {
   filter: string
}
export function LetterAccountSelection ({ filter } : LetterAccountSelectionProps) {
   const [data] = useState<letterAccountSelectionDataProps[]>(letterAccountSelectionData)
   const [filteredData,setFilteredData] = useState<letterAccountSelectionDataProps[]>(letterAccountSelectionData)
   const [search,setSearch] = useState<string>("")
   const [filterProps, setFilterProps] = useState<string> ('')
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearch(value)
      search != "" ? setFilteredData(data.filter(d=>d.account?.toLowerCase()?.includes(value.toLowerCase()))) : setFilteredData(data)
   }

   useEffect (()=>{
     if( filter != '' && filter != undefined){
       setFilterProps(filter)
     }
   },[filter])
    return (
        <div className="flex flex-col border-[1px] border-gray-500 rounded-md">
        <div className="flex flex-col mb-1 p-4">
           <h2 className="font-semibold text-lg">3. Which accounts is this about?</h2>
           <h3 className="text-md opacity-90">Please choose one or more:</h3>
        </div>
        <div className="border-b-[1px] border-gray-600 h-[1px] mb-2"></div>
        <div className="flex flex-col md:flex-row p-4">
          <div className="w-full mx-1">
             <form className="border-gray-500 border-[1px] focus-within:border-[1px] focus-within:border-green-600 rounded-md p-1">
                <div className="flex items-center w-full">
                <Search className="flex h-4 w-4"/>
                <input 
                className="border-0 focus:outline-none ml-1 w-4/5" 
                value={search}
                onChange={handleChange}
                type="text"
                placeholder="Search for a bureau or credit name" 
                />
                </div>
             </form>
          </div>
        </div>
        <div className="max-h-[45vh] overflow-y-auto px-4 py-0">
         {
            filterProps &&
            filteredData.filter(d => d.reportedOn.toLowerCase().includes(filterProps.toLowerCase())).map((f,i) => (<LetterAccountSelectionCard key={i} data={f} />))
         }
        </div>
     </div>
    )
}