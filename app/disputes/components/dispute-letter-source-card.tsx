"use client"
export interface DisputeLetterSourceDataProps {
    name: string,
    kind: string,
    disputeLetters: number,
    nameColor: string,
}
interface DisputeLettersDialogProps {
  data: DisputeLetterSourceDataProps
  emittedName: (name: string) => void;
}
export function DisputeLetterSourceCard ({ emittedName, data}: DisputeLettersDialogProps) {
    return (
        <div>
        <div className={`flex w-full items-center border-[1px] border-gray-300 p-3 my-2 rounded-md cursor-pointer`}
        >
              <div className="flex flex-col w-1/2 text-sm" onClick={() => emittedName(data.name)}>
                 <h2 className="font-bold"
                 style={{ color: data.nameColor}}
                 >{data.name}</h2>
                 <div className="flex">
                    <h3 className="font-semibold">Kind:</h3>
                    <h3>{data.kind}</h3>
                 </div>
              </div>
              <div className="flex text-sm w-1/2 items-center justify-center">
                    <h3 className="font-semibold mr-1">Dispute Letters: </h3>
                    <label className="flex items-center justify-center bg-green-500 text-white text-xs rounded-sm h-5 w-6">{data.disputeLetters}</label>
                 </div>
        </div>
     </div>
    )
}