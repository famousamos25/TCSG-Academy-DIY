import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Info, X } from "lucide-react"
import { useState } from "react"
import { CreditBureauAddressDescription } from "./credit-bureau-address-description"

type CreatePersonalInfoDisputeProps = {
    isOpen: boolean
    handleClose: () => void;
}

export function CreatePersonalInfoDisputeDialog({ isOpen, handleClose }: CreatePersonalInfoDisputeProps) {
    const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
    const [selectedBureau, setSelelectedBureau] = useState<string>('')

    const handleShowModal = (bureau: string) =>{
        setSelelectedBureau(bureau)
        setShowInfoModal(!showInfoModal)
    }
    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[45vw]">
                <DialogHeader>
                    <div className="flex items-center justify-between px-0">
                        <h2 className="text-md">Select Address</h2>
                        <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>
                <div className="flex flex-col p-2">
                    <div className="flex items-center p-0 my-1">
                        <div className="flex items-center justify-start">
                            <input type="checkbox" className="cursor-pointer mr-2" />
                            <h3 className="mr-2">ID Theft Affidavit</h3>
                        </div>
                        <div className="flex items-center justify-start">
                            <input type="checkbox" className="cursor-pointer mr-2" />
                            <h3>Declaration of Self-Representation</h3>
                        </div>
                    </div>
                    <div className="flex flex-col my-1">
                        <label className="flex items-center text-sm">TransUnion Address<Info className="h-3 w-3 cursor-pointer mx-1" onClick={() => handleShowModal('TransUnion')}/></label>
                        <select className="border-[1px] border-gray-800 rounded-md p-2 text-sm focus:outline-none">
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-1">
                        <label className="flex items-center text-sm">Experian Address<Info className="h-3 w-3 cursor-pointer mx-1" onClick={() => handleShowModal('Experian')}/></label>
                        <select className="border-[0.1px] border-gray-800 rounded-md p-2 text-sm focus:outline-none">
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-1">
                        <label className="flex items-center text-sm">Equifax Address<Info className="h-3 w-3 cursor-pointer mx-1" onClick={() => handleShowModal('Equifax')}/></label>
                        <select className="border-[1px] border-gray-800 rounded-md p-2 text-sm focus:outline-none">
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-1">
                        <label className="flex items-center text-sm">Alternate / Secondary Bureaus</label>
                        <select className="border-[1px] border-gray-800 rounded-md p-2 text-sm focus:outline-none">
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">Create Letters</Button>
                </DialogFooter>
            </DialogContent>
            {
                showInfoModal && 
                <CreditBureauAddressDescription isOpen={showInfoModal} handleClose={()=>setShowInfoModal(!showInfoModal)} bureau={selectedBureau}/>
            }
        </Dialog>
    )
}
