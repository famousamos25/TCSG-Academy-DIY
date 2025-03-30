"use client"
import { useState, useRef } from "react";
import { disputeOptions } from "@/constants/edit-dipute-letter-data";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface DisputeOption {
  category: string;
  items: string[];
}
interface EditDisputeLetterdialogProps {
    isOpen: boolean,
    handleIsOpen: () => void
    emitSelectedOption: (option: string) => void;
}
export function EditDisputeLetterdialog({ isOpen, handleIsOpen, emitSelectedOption }: EditDisputeLetterdialogProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  
  const handleSave = () => {
    emitSelectedOption(selectedOption as string)
    handleIsOpen();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg">
          <div className="bg-white p-4 border-b sticky top-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Dispute Letter</h3>
              <X className="h-5 w-5" onClick={handleIsOpen}/>
            </div>
          </div>

          <div className="p-4">
            <div className="relative">
              <button
                ref={triggerRef}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="truncate">
                  {selectedOption || "Select a dispute option"}
                </span>
                {isDropdownOpen ?  <ChevronDown className="h-4 w-4"/> : <ChevronUp className="h-4 w-4"/>}
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none sm:text-sm"
                >
                  {disputeOptions.map((section: DisputeOption) => (
                    <div key={section.category} className="py-1">
                      <div className="px-4 py-2 text-md font-bold text-green-600 bg-gray-100 sticky top-0">
                        {section.category}
                      </div>
                      {section.items.map((item) => (
                        <div
                          key={item}
                          className={`px-4 py-2 text-sm cursor-pointer transition-colors
                            hover:bg-green-50 hover:text-green-500
                            ${selectedOption === item ? 'bg-green-500 text-white' : 'text-gray-700'}`}
                          onClick={() => handleOptionSelect(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 p-4 border border-gray-200 rounded-md min-h-20 text-sm text-gray-500">
              {selectedOption}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={() => setSelectedOption(null)}
            >
              Clear
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
              onClick={handleSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}