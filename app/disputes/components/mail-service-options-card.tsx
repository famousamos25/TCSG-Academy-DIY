"use client"

export function MailServiceOptionsCard () {
    return (
        <div className="flex flex-col w-full px-4 py-2">
            <div className="flex items-center justify-between w-full">
                <p className="text-green-500 font-semibold text-sm"> Mail Service Options</p>
                <button className="text-green-500 text-xs border-[1px] border-green-500 rounded-sm px-3 py-1 cursor-pointer"> More Details </button>
            </div>
            <hr className="h-[1px] my-4"/>

            <div className="flex flex-col">
               <h2 className="text-green-500 text-sm font-semibold">First Class Mail Service</h2>
               <p className="font-semibold text-xs">Small Envelop (up to 5-pages)</p>
               <p className="text-xs mb-2">Starts From: $ 2.00/ea B&W | $ 2.35/ea Color</p>
               <p className="font-semibold text-xs">Medium & Large Envelop (6 to 59-pages)</p>
               <p className="text-xs mb-2">Starts From: $ 4.35/ea B&W | $ 4.45/ea Color</p>

               <h2 className="text-green-500 text-sm font-semibold">Certified Mail Service</h2>
               <p className="font-semibold text-xs  mb-2">Starts From: $ 7.50 B&W | $ 8.50 Color</p>
               <h2 className="text-green-500 text-sm font-semibold">Additional Pages</h2>
               <p className="font-semibold text-xs mb-2">$ .40/ea B&W | $ .45/ea Color</p>
               <hr className="h-[1px] mt-1 mb-3"/>
               <ul className="list-disc px-4">
                <li className="text-sm">
                First Class Mail typically takes around 4-5 days to deliver.
                </li>
                <li className="text-sm">Certified Letters require a signature from the receiving party and provides a date/time stamp you can use to validate your dispute if needed.</li>
               </ul>
            </div>

        </div>
    )
}