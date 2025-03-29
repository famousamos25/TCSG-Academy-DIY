"use client"
import { Progress } from "@/components/ui/progress"
export interface DisputeLetter {
   title: string;
   round?: string;
   sentOn?: string;
   nextRoundDue: string;
   source: string;
};
interface DisputeLettersDialogProps {
  data: DisputeLetter,
  emitFilterName: (name: string) => void;
}
export function DisputeLetterCard ({data, emitFilterName}: DisputeLettersDialogProps) {
    return (
        <div>
        <div className={`flex w-full items-center border-[1px] border-gray-300 p-3 my-2 rounded-md cursor-pointer`}
        >
              <div className="flex flex-col w-full text-sm" onClick={()=> emitFilterName(data.source)}>
                 <h2 className="font-bold"
                 >{data.title}</h2>
                 <div className="flex">
                    <h3 className="font-semibold">Sent On:</h3>
                    <h3>{data.sentOn}</h3>
                 </div>
                 <div className="flex">
                    <h3 className="font-semibold">Next Round Due:</h3>
                    <h3>{data.nextRoundDue}</h3>
                 </div>
                 <Progress  className="w-full [&>div]:!bg-green-600 mt-1" value={20}/>
              </div>
        </div>
     </div>
    )
}