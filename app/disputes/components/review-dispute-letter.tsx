"use client";

import { useEffect, useState } from "react";
import { DisputeLetterReviewCard } from "./review-dispute-letter-card";
import { reviewDisputesLetterData } from "@/constants/review-dispute-letter";
import { Info } from "lucide-react";
import { DisputeLettersInfoDialog } from "./dispute-letters-info-dialog";
interface ReviewDisputeLetterProps {
  filterName: string;
  hideDisputedItems: boolean;
}
export function ReviewDisputeLetter({ filterName, hideDisputedItems }: ReviewDisputeLetterProps) {
  const [data] = useState(reviewDisputesLetterData)
  const [filteredData, setFilteredData] = useState(reviewDisputesLetterData)
  const [show,setShow] = useState<boolean>(false)
  useEffect(()=>{
    if(!hideDisputedItems) {
      if( filterName !== '' && filterName !== undefined){
        setFilteredData(data.filter(d=>d.source.toLowerCase() === filterName.toLowerCase()))
    }
    else {
      setFilteredData([])
    }
    }
    else{
      setFilteredData([])
    }
  },[filterName,hideDisputedItems])
  return (
    <div className="flex flex-col border-[1px] border-gray-300 rounded-md">
      <div className="flex flex-col mb-1 p-4">
        <h2 className="flex items-center font-semibold text-lg text-green-500">3. Review Disputed Items <Info className="w-4 h-4 ml-1 cursor-pointer" onClick={()=>setShow(!show)}/></h2>
        <h3 className="font-semibold text-xs">Review the items that were included in your dispute letter.</h3>
      </div>
      <div className="border-b-[0.5px] border-gray-300 h-[0.5px] mb-2"></div>
      <div className="max-h-[45vh] overflow-y-auto px-4 py-0">
        {filteredData.map((l, i) => (
          <DisputeLetterReviewCard key={i} data={l} />
        ))}
      </div>
      {
        show &&
        <DisputeLettersInfoDialog isOpen={show} onOpenChange={() => setShow(!show)} lane={3} />
      }
    </div>
  );
}