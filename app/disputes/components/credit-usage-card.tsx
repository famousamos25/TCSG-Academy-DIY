"use client"

export function CreditUsageCard() {
    return (
        <div className="flex flex-col w-full p-0">
            <div className="flex flex-col px-6 mt-4">
                <div className="flex flex-col items-center justify-center py-4 border-[1px] border-gray-300 rounded-sm">
                <p className="text-sm">You Have: <span className="text-green-500 font-semibold">$ 0.4</span></p>
                <p className="text-sm">Credits Available.</p>
                </div>
                <div className="flex flex-col text-start">
                <div className="flex flex-col items-start my-4">
                        <p className="text-green-500 text-sm font-semibold">SMS messages</p>
                        <p className="text-sm font-semibold">$0.04 cents/SMS Message</p>
                        <p className="text-sm">Approx. 160 characters/SMS per recipient.</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-green-500 text-sm font-semibold">Mail Letters</p>
                        <p className="text-sm font-semibold">From $2/Dispute Letter</p>
                    </div>
                    <div className="flex flex-col items-start my-2">
                        <p className="text-green-500 text-sm font-semibold">ChatGPT</p>
                        <p className="text-sm font-semibold">From $0.05 cents/Letter Rewrite or Question</p>
                    </div>
                    <div className="flex flex-col items-start my-2">
                        <p className="text-green-500 text-sm font-semibold">OpenAi Charges</p>
                        <p className="text-sm font-semibold">From $0.10 / Letter rewrite</p>
                    </div>
                </div>
            </div>
        </div>
    )
}