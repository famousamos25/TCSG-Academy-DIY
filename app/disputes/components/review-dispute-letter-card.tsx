"use client"

import { PencilLine } from "lucide-react";
import { useState } from "react";
import { EditDisputeLetterdialog } from "./edit-dispute-letter-dialog";

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
export function DisputeLetterReviewCard({ data }: DisputeLettersDialogProps) {
  const [show, setShow] = useState<boolean>(false);
  const [reason, setReason] = useState<string>(data.reason as string);
  const handleSelectedOption = (name: string) => {
    setReason(name)
  }
  return (
    <div>
      <div className={`flex w-full border-[1px] border-gray-300 p-3 my-2 rounded-md cursor-pointer`}
      >
        <div className="flex flex-col w-full text-sm">
          <div className="flex w-full justify-between"><h2 className="font-bold">{data.accountName}</h2>
            <label className="flex items-center bg-[#008BA6] rounded-md py-1 px-2 h-6"><span className=" text-[#bbedf3] text-xs">verified</span></label>
          </div>
          <p className="flex text-xs">{data.reason && <p className="font-bold">Account No:</p>}  {data.accountNumber}</p>
          <div className="flex text-xs">
            {data.reason &&
              <div className="flex flex-wrap items-center gap-x-1">
                <p className="font-bold">Reason: </p>
                <p className="font-medium">{reason}</p>
                <PencilLine className="text-green-500 h-3 w-3 flex-shrink-0 cursor-pointer" onClick={() => setShow(!show)} />
              </div>
            }
          </div>

          <p className="flex text-xs">
            {data.instruction &&
              <div className="flex flex-wrap items-center gap-x-1">
                <p className="font-bold">Instruction: </p>
                <p className="font-medium">{data.reason}</p>
                <PencilLine className="text-green-500 h-3 w-3 flex-shrink-0 cursor-pointer" onClick={() => setShow(!show)} />
              </div>
            }
          </p>
        </div>
      </div>
      {show &&
        <EditDisputeLetterdialog isOpen={show} handleIsOpen={() => setShow(!show)} emitSelectedOption={(option) => handleSelectedOption(option)} />
      }
    </div>
  )
}