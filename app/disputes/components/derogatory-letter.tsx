"use client"

import { FileTerminal, X } from "lucide-react"

export function DerogatoryLetter() {
    return (
        <>
            <div className="flex items-end justify-end">
                <X className="w-5 h-5 cursor-pointer"/>
            </div>
            <div className="flex w-full">
                <div className="flex w-2/3">
                    <FileTerminal className="h-16 w-28 my-auto text-green-600" />
                    <div className="flex flex-col text-start">
                        <h2 className="mb-1">Derogatory Letter #1</h2>
                        <div className="flex"><p className="text-green-500">To:</p> <p className=" ml-1 opacity-85">UTILITY SELFREPORTED</p></div>
                        <div className="flex"><p className="text-green-500">First Page:</p> <p className="ml-1">1</p></div>
                        <div className="flex w-full"><p className="text-green-500">Additional Pages/Attachments:</p> <p className="ml-1">1</p></div>
                        <div className="flex"><p className="my-2 font-semibold text-md">Mail Service Type</p></div>
                        <select className="w-full border-[1px] border-gray-400 rounded-md focus:outline-none h-8">
                            <option>First Class</option>
                            <option>Certified Mail</option>
                        </select>
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-center">
                    <p className="text-green-500 font-semibold">Letter Price: $2.8</p>
                </div>
            </div>
        </>
    )
}