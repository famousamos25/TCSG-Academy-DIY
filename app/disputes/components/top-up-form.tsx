"use client"

interface TopUpFormProps {
    hanldeClose: () => void;
}
export function TopUpForm({hanldeClose}: TopUpFormProps) {
    return (
        <div>
            <div className="flex flex-col px-2">
                <div className="flex flex-col w-full">
                    <label className="text-sm mb-1">Name on Card</label>
                    <input className="border-[1px] border-gray-300 rounded-sm text-sm focus:outline-none py-2 px-1" type="text" placeholder="John Doe" />
                </div>
                <div className="flex w-full mt-3">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="text-sm mb-1">Card Number</label>
                        <input className="border-[1px] border-gray-300 rounded-sm text-sm focus:outline-none py-2 px-1" type="text" placeholder="42424242424242" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/4">
                        <label className="text-sm ml-1 mb-1">Exp. Date</label>
                        <input className="border-[1px] border-gray-300 rounded-sm text-sm focus:outline-none py-2 px-1 mx-1" type="date" placeholder="Exp Date" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/4">
                        <label className="text-sm mb-1">CVC</label>
                        <input className="border-[1px] border-gray-300 rounded-sm text-sm focus:outline-none py-2 px-1" type="text" placeholder="CVC" />
                    </div>
                </div>
                <div className="flex flex-col w-1/2 mt-2">
                    <label className="text-sm mb-1">Zip Code</label>
                    <input className="border-[1px] border-gray-300 rounded-sm text-sm focus:outline-none py-2 px-1" type="text" placeholder="John Doe" />
                </div>
            </div>
            <div className="flex items-center justify-start w-full p-2">
                <input type="checkbox" className="h-4 w-4 mr-2" />
                <p className="text-sm">I have read and agreed with the terms of <span className="text-green-500">service and privacy policy</span></p>
            </div>
            <div className="flex items-center justify-center px-3 my-4">
                <button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 rounded-sm px-3 py-1 cursor-pointer mr-2" onClick={hanldeClose}> Top up </button>
                <button className="bg-muted rounded-sm px-3 py-1 cursor-pointer mx-2" onClick={hanldeClose}> Cancel</button>
            </div>
        </div>
    )
}