"use client"

import { useState } from "react";
export interface letterSelectionDestinationProps {
    name: string,
    type: string,
    nameColor: string,
 }
 interface LetterSelectionCardProps {
    data: letterSelectionDestinationProps
    handleClick: (e: string) => void;
 }
export function LetterSelectionDestinationcard ({ data, handleClick }: LetterSelectionCardProps) {
    const [isActive, setIsActive] = useState(false);
    return (
        <div>
            <div className={`flex w-full border-[1px] border-gray-300 p-3 my-2 rounded-md cursor-pointer ${isActive ? 'border-[1px] border-green-600' : ''}`}
            onClick={() => setIsActive(!isActive)}>
           <div className="flex flex-col w-2/3 text-sm" onClick={()=>handleClick(data.name)}>
                  <div className="flex">
                     <h3 className="font-semibold">To: </h3>
                     <h3 className="font-semibold"
                        style={{ color: `${data.nameColor}` }}
                     >{data.name}</h3>
                  </div>
                  <div className="flex">
                     <h3 className="font-semibold">Type: </h3>
                     <h3>{data.type}</h3>
                  </div>
               </div>
         </div>
        </div>
    )
}