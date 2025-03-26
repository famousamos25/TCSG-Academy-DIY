"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings, StickyNote, X } from 'lucide-react';
interface SecurityFreezeDetailDialogProps {
   isOpen: boolean
   onOpenChange: () => void;
}
export function SecurityFreezeDetailDialog ({isOpen,onOpenChange}: SecurityFreezeDetailDialogProps) {
    return (
        <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[50vw]">
            <div className="w-full flex items-end justify-end">
               <X className="h-5 w-5 cursor-pointer" onClick={onOpenChange}/>
            </div>
            <DialogHeader className="flex items-center justify-center mb-2">
                <DialogTitle>Chex Systems, Inc.,</DialogTitle>
                <DialogDescription>
                     ChexSystems Consumer Relations.
                </DialogDescription>
            </DialogHeader>
            <div className="flex w-full">
                <div className="w-1/2 text-sm">
                    <p>
                        Provides account verification services primarily for financial institutions. 
                        Collects and reports data on checking account applications, openings, and closures, including reasons for account closure
                    </p>
                     <br />
                    <p>
                       ChexSystems is ownedby the eFunds subsidiary of Fidelity National Information Services, Inc. (FNIS).
                    </p>
                    <br />
                    <p>
                      <div className="flex items-center">
                        <StickyNote className="h-4 w-4"/>
                        <p className="font-bold ml-1">Free report:</p>
                      </div>
                      The company will provide one free report every 12 months if you request it. A free score will be provided upon request too.
                    </p>
                    <br />
                    <p>
                      <div className="flex items-center">
                        <Settings className="h-4 w-4"/>
                        <p className="font-bold ml-1">Freeze your report:</p>
                      </div>
                      The company will freeze your consumer report if you request it.
                    </p>
                </div>
                <div className="w-1/2 text-sm ml-4">
                    <div className="flex flex-col">
                    <p className="font-bold">Website</p>
                    <a className="text-blue-800 cursor-pointer">http://www.chexsystems.com/</a>

                    <p className="font-bold"> Phone</p>
                    <p>800-428-9623</p>

                    <p className="font-bold">  Address</p>
                    <p>ChexSystems Consumer Relations</p>

                    <p className="font-bold">  PO Box 583399</p>
                    <p>Minneapolis, MN 55458</p>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    )
}