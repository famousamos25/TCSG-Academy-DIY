"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from 'lucide-react';
interface DisputeLettersInfoDialogProps {
    isOpen: boolean
    onOpenChange: () => void;
    lane: number
}
export function DisputeLettersInfoDialog({ isOpen, onOpenChange, lane }: DisputeLettersInfoDialogProps) {
    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[60vw]">
                <div className="w-full flex items-end justify-end">
                    <X className="h-5 w-5 cursor-pointer" onClick={onOpenChange} />
                </div>
                <div className="flex w-full px-4 py-2">
                    {lane === 1 &&
                        <div className="text-sm">
                            <p className="font-bold">
                                Dispute Letters are sent to one of the following:
                            </p>
                            <br />
                            <ul className="list-disc px-4">
                                <li>A Credit Bureau (<span className="text-[#0892B4]">Experian,</span> <span className="text-[#9E1C33]">Equifax, </span> <span className="text-[#1E4E8E]">TransUnion</span>)</li>
                                <li>A Creditor (e.g., JPMCB Card)</li>
                                <li>A Collection Agency (e.g., Jefferson Capital)</li>
                                <li>A Data Furnisher (e.g., Lexis Nexis)</li>
                            </ul>
                            <p>Choose where your dispute was sent to track it properly</p>
                            <br />
                            <div className="flex"><p className="font-bold">When a Credit Bureau is selected</p> <p> (e.g., Experian):</p></div>
                            <ul className="list-disc px-4">
                                <li>This dispute was sent to a <b>credit bureau</b>, meaning they will investigate with the furnisher. You should receive a response within 30 days</li>
                            </ul>
                            <br />
                            <div className="flex"><p className="font-bold">When a Creditor or Collection Agency is selected </p> <p>(e.g., JPMCB Card, Jefferson Capital etc):</p></div>
                            <ul className="list-disc px-4">
                                <li>This dispute was sent directly to the <b>creditor or collection agency</b>. You should receive a response within 30 days. If unresolved, you may need to escalate to CFPB</li>
                            </ul>
                            <br />
                            <div className="flex"><p className="font-bold">When a Data Furnisher is selected </p> <p>(e.g., JPMCB Card, Jefferson Capital etc):</p></div>
                            <ul className="list-disc px-4">
                                <li>This dispute was sent directly to the <b>data furnisher</b>. You should receive a response within 15 days</li>
                            </ul>
                        </div>
                    }
                    {lane === 2 &&
                        <div className="text-sm">
                            <p className="font-bold">
                                Most dispute items are resolved in 1-4 Dispute Rounds.
                                If you receive no response or resolution in the mail, proceed to the next round
                            </p>
                            <br />
                            <p className="font-semibold">Sent on date:</p>
                            <p><strong>Note:</strong> it generally takes <strong>3-5 days</strong> for the Credit Bureau or Creditor to receive your dispute letter by mail</p>
                            <p className="font-semibold">Round 1 of 6:</p>
                            <p>Response Due Countdown:</p>
                        </div>
                    }
                    {lane === 3 &&
                        <div className="text-sm">
                            <p className="font-bold">
                                This section lists the <strong>items</strong> included in current dispute letter
                            </p>
                            <br />
                            <p>When you import your next <strong>Available Credit Report,</strong> which typically is available <strong>30 days from the date that you imported your Previous Credit Report.</strong></p>
                            <br />
                            <p>Creditfixrr will <strong>automatically</strong> determine whether the disputed <strong>items</strong> are: <strong>VERIFIED, POSITIVE or DELETED from you Credit Report.</strong></p>
                            <br />
                            <p>If <strong>any</strong> of the disputed <strong>items</strong> are marked <strong>"Verified"</strong> continue to the next round, these <strong>items</strong> will <strong>automatically</strong> be included within your <strong>Next Round</strong> Dispute Letter</p>
                            <br />
                            <p className="font-semibold">Note:</p>
                            <p><strong>"Verified"</strong> means that the disputed <strong>item</strong> was <strong>"verified"</strong> as correct reporting

                                <strong>"Positive"</strong> mean that the disputed <strong>item</strong> was <strong>updated</strong> from <strong>negative</strong> to <strong>positive</strong>. (i.e. <strong>Late Payment</strong> status is updated from <strong>Late</strong> to <strong>Paid on Time</strong>)

                                <strong>"Deleted"</strong> means that the disputed <strong>item</strong> was <strong>deleted</strong> from your credit report in this <strong>Dispute Round.</strong></p>
                        </div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}