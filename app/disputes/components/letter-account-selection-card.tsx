"use client";

import { useState } from "react";

export interface letterAccountSelectionDataProps {
   account: string,
   accountNumber: string,
   reportedOn: string
}
interface LetterSelectionCardProps {
   data: letterAccountSelectionDataProps
}

export function LetterAccountSelectionCard({ data }: LetterSelectionCardProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`flex w-full border-[1px] p-3 my-2 rounded-md cursor-pointer ${
        isSelected ? "border-green-600" : "border-gray-500"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col w-2/3 text-sm">
          <div className="flex">
            <h3 className="font-semibold">Account:</h3>
            <h3 className="font-semibold ml-1">{data.account}</h3>
          </div>
          <div className="flex text-xs">
            <h3 className="font-semibold">Account Number:</h3>
            <h3 className="font-semibold ml-1">{data.accountNumber}</h3>
          </div>
          <div className="flex text-xs">
            <h3 className="font-semibold">Reported On:</h3>
            <h3
              className="font-semibold ml-1"
              style={{
                color:
                  data.reportedOn.toLowerCase() === "experian"
                    ? "#22487F"
                    : "#01A4C7",
              }}
            >
              {data.reportedOn}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-end w-1/3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
}
