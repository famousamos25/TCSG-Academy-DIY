"use client";
import { useEffect, useState } from "react";
import { disputeLetters } from "@/constants/dispute-letters";
import { DisputeLetterCard } from "./dispute-letter-card";
import { Info } from "lucide-react";
import { DisputeLettersInfoDialog } from "./dispute-letters-info-dialog";
interface SelectDisputeLetterProps {
  filterName: string
  emitFilterName: (name: string) => void;
}
export function SelectDisputeLetter({filterName, emitFilterName}: SelectDisputeLetterProps) {
  const [data] = useState(disputeLetters)
  const [filteredData,setFilteredData] = useState(disputeLetters)
  const [show, setShow] = useState<boolean>(false);

  const handleEmittedName = (name: string) => {
     emitFilterName(name)
  }
  useEffect(()=>{
      if(filterName !== '' && filterName != undefined){
          setFilteredData(data.filter(d=>d.source.toLowerCase() === filterName.toLowerCase()))
      }
      else {
         setFilteredData([])
      }
  },[filterName])
  return (
    <div className="flex flex-col border-[1px] border-b-transparent border-gray-300 rounded-md">
      <div className="flex flex-col mb-1 p-4">
        <h2 className="flex items-center font-semibold text-lg text-green-500">2.Select the Dispute Letter  
          <Info className="w-4 h-4 ml-1 cursor-pointer" onClick={()=>setShow(!show)} /></h2>
        <h3 className="font-semibold text-xs">Select the DIspute Letter you want to review.</h3>
      </div>
      <div className="border-b-[0.5px] border-gray-300 h-[0.5px] mb-2"></div>
      <div className="max-h-[45vh] overflow-y-auto px-4 py-0">
        {filteredData.map((l, i) => (
          <DisputeLetterCard key={i} data={l} emitFilterName={(name)=> handleEmittedName(name)} />
        ))}
      </div>
      {
        show &&
        <DisputeLettersInfoDialog isOpen={show} onOpenChange={() => setShow(!show)} lane={2} />
      }
    </div>
  );
}