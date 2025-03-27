"use client"

import { useState } from "react";

export interface letterSelectionCardData {
   name: string,
   type: string,
   round: string,
}
interface LetterSelectionCardProps {
   data: letterSelectionCardData
   handleClick: (e:string) => void;
}
export function LetterSelectionCard({ handleClick, data }: LetterSelectionCardProps) {
   const [isActive, setIsActive] = useState(false);
   return (
      <div>
         <div className={`flex w-full border-[1px] border-gray-500 p-3 my-2 rounded-md cursor-pointer ${isActive ? 'border-[1px] border-green-600' : ''}`}
            onClick={() => setIsActive(!isActive)}
         >
               <div className="flex flex-col w-2/3 text-sm" onClick={() => handleClick(data.type)}>
                  <h2 className="font-bold">{data.name}</h2>
                  <div className="flex">
                     <h3 className="font-semibold">Type:</h3>
                     <h3>{data.type}</h3>
                  </div>
                  <div className="flex">
                     <h3 className="font-semibold">Round:</h3>
                     <h3>{data.round}</h3>
                  </div>
               </div>
         </div>
      </div>
   )
}