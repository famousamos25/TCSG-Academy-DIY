"use client";
import { disputeLetterSourceData } from "@/constants/dispute-letter.source";
import { useState } from "react";
import { DisputeLetterSourceCard } from "./dispute-letter-source-card";
import { Info } from "lucide-react";
import { DisputeLettersInfoDialog } from "./dispute-letters-info-dialog";

interface LetterSelectionProps {
  emitName: (name: string) => void;
}
export function DisputeLetterSource({ emitName }: LetterSelectionProps) {
  const [data] = useState(disputeLetterSourceData)
  const [show, setShow] = useState<boolean>(false);
  const handleEmittedname = (name: string) => {
     emitName(name)
  }

  return (
    <div className="flex flex-col border-[1px] border-b-transparent border-gray-300 rounded-md">
      <div className="flex flex-col mb-1 p-4">
        <h2 className="flex items-center font-semibold text-lg text-green-500">1.Select the Source <Info className="w-4 h-4 ml-1 cursor-pointer" onClick={() => setShow(!show)} /></h2>
        <h3 className="text-xs font-semibold">Choose the Credit Bureau or Creditor you sent the dispute</h3>
      </div>
      <div className="border-b-[0.5px] border-gray-300 h-[0.5px] mb-2"></div>
      <div className="max-h-[45vh] overflow-y-auto px-4 py-0">
        {data.map((l, i) => (
          <DisputeLetterSourceCard key={i} data={l} emittedName={(name)=>handleEmittedname(name)} />
        ))}
      </div>
      {
        show &&
        <DisputeLettersInfoDialog isOpen={show} onOpenChange={() => setShow(!show)} lane={1} />
      }
    </div>
  );
}
