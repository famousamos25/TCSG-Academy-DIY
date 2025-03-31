"use client"

export function PriceCalculatorCard() {
    return (
        <div className="flex flex-col w-full p-0">
            <div className="flex items-start w-full px-6 py-2">
                <p className="text-green-500 font-semibold text-sm mt-2"> Price Calculator</p>
            </div>
            <hr className="h-[1px] my-4 mx-6" />

            <div className="flex flex-col px-6">
                <div className="flex flex-col">
                    <h2 className="text-xs font-semibold">Mail Service Type</h2>
                    <select className="w-full border-[1px] border-gray-400 rounded-md text-xs  focus:outline-none h-8 mb-2">
                        <option>First Class</option>
                        <option>Certified Mail</option>
                    </select>
                    <h2 className="text-xs font-semibold">Color</h2>
                    <select className="w-full border-[1px] border-gray-400 rounded-md text-xs focus:outline-none h-8">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>
                <hr className="h-[1px] my-4" />
                <div className="flex flex-col text-start">
                    <h2 className="mb-1 text-sm font-semibold">Letter Breakdown</h2>
                    <div className="flex items-center justify-between"><p className="text-green-500 text-sm">First Page:</p> <p className=" ml-1">1</p></div>
                    <div className="flex items-center justify-between"><p className="text-green-500 text-sm">Additional Pages:</p> <p className="ml-1">1</p></div>
                    <div className="flex w-full items-center justify-between"><p className="text-green-500">Total Letters:</p> <p className="ml-1">1</p></div>
                </div>
            </div>
            <div className="p-0">
                <hr className="h-[1px] my-4" />
                <div className="flex items-center justify-between px-6 mb-4">
                    <p className="text-sm font-semibold">Total Cost:</p>
                    <p className="text-sm font-semibold">$2</p>
                </div>
            </div>
        </div>
    )
}