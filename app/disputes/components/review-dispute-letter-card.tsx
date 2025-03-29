"use client"

import { PencilLine } from "lucide-react";

interface AccountDispute {
    accountName: string;
    status?: string;
    accountNumber: string;
    reason?: string;
    instruction?: string;
    source: string
  };
interface DisputeLettersDialogProps {
  data: AccountDispute
}
export function DisputeLetterReviewCard ({data}: DisputeLettersDialogProps) {
    return (
        <div>
        <div className={`flex w-full border-[1px] border-gray-300 p-3 my-2 rounded-md cursor-pointer`}
        >
              <div className="flex flex-col w-full text-sm">
                 <div className="flex w-full justify-between"><h2 className="font-bold">{data.accountName}</h2> 
                 <label className="flex items-center bg-[#008BA6] rounded-md py-1 px-2 h-6"><span className=" text-[#bbedf3] text-xs">verified</span></label>
                 </div>
                 <p className="flex text-xs">{data.reason && <p className="font-bold">Account No:</p>}  {data.accountNumber}</p>
                 <p className="flex text-xs">{data.reason && <p className="font-bold">Reason: <span className="font-medium">{data.reason}</span><PencilLine className="ml-1 text-green-500 h-3 w-3"/></p>}</p>
                 <p className="flex text-xs">{data.instruction && <p className="font-bold">Instruction: <span className="font-medium">{data.reason}</span><PencilLine className="ml-1 text-green-500 h-3 w-3"/></p>}</p>
              </div>
        </div>
     </div>
    )
}