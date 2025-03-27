"use client"
interface LetterSelectionCardProps {
   lane: number
}
export function LetterSelectionCard({ lane }: LetterSelectionCardProps) {
   return (
      <div>
         <div className="flex w-full border-[1px] border-gray-500 p-3 my-2 rounded-md cursor-pointer">
            {lane === 1 &&
               <div className="flex flex-col w-2/3 text-sm">
                  <h2 className="font-bold">Account Sold Letter #1</h2>
                  <div className="flex">
                     <h3 className="font-semibold">Type:</h3>
                     <h3>Credit Bureau</h3>
                  </div>
                  <div className="flex">
                     <h3 className="font-semibold">Round:</h3>
                     <h3>Dispute Round#1</h3>
                  </div>
               </div>
            }
            {lane === 2 &&
               <div className="flex flex-col w-2/3 text-sm">
                  <div className="flex">
                     <h3 className="font-semibold">To: </h3>
                     <h3 className="font-semibold">TRANSUNION</h3>
                  </div>
                  <div className="flex">
                     <h3 className="font-semibold">Type: </h3>
                     <h3>Credit Bureau</h3>
                  </div>
               </div>
            }
            {lane === 3 &&
               <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col w-2/3 text-sm">
                     <div className="flex">
                        <h3 className="font-semibold">Account:</h3>
                        <h3 className="font-semibold">CAPITAL ONE</h3>
                     </div>
                     <div className="flex text-xs">
                        <h3 className="font-semibold">Account Number:</h3>
                        <h3 className="font-semibold">517805808240</h3>
                     </div>
                     <div className="flex text-xs">
                        <h3 className="font-semibold">Reported On:</h3>
                        <h3 className="font-semibold">Transunion</h3>
                     </div>
                  </div>
                  <div className="flex items-center justify-end w-1/3">
                     <input type="checkbox" />
                  </div>
               </div>
            }
         </div>
      </div>
   )
}