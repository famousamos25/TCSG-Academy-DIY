"uce cient"

import { Wallet } from "lucide-react"
interface TopUpCardProps {
   amount: number,
   description: string
}
export function TopUpCard ({amount, description} : TopUpCardProps) {
    return (
        <div className="flex flex-col items-center justify-center border-[1px] border-gray-300 rounded-md cursor-pointer h-28 mx-3 my-4">
              <Wallet className="w-4 h-4"/> 
              <p className="text-sm font-semibold">Top Up ${amount}</p>
              <p className="text-sm font-normal">{description}</p>
        </div>
    )
}