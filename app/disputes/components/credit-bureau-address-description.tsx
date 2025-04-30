import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

type CreditBureauAddressDescription = {
    bureau: string;
    isOpen: boolean;
    handleClose: () => void;
};

export function CreditBureauAddressDescription({ bureau, isOpen, handleClose }: CreditBureauAddressDescription) {
    return (
        <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[45vw] p-0 px-4 pb-4">
                <div className="flex items-center justify-end px-0 relative">
                    <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-500 absolute top-0.5 hover:text-gray-700 ml-auto">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-col p-2">
                    {
                        bureau === 'TransUnion' &&
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">TransUnion Address Description</h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                The correct dispute addresses for TransUnion may vary depending on the type of dispute and your location. However, here are the general addresses you can use to dispute information on your  <br />
                                TransUnion credit report:
                            </p>
                            <h2 className="font-semibold mt-2">For Mailing Disputes:</h2>
                            <h2 className="font-semibold">TransUnion Consumer Solutions</h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                P.O. Box 2000 <br />
                                Chester, PA 19016-2000
                            </p>
                            <h2 className="font-semibold mt-2">For Identity Theft or Fraud-Related Disputes:</h2>
                            <h2>TransUnion Fraud Victim Assistance Department</h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                P.O. Box 2000 <br />
                                Chester, PA 19016-2000</p>
                        </div>
                    }
                    {
                        bureau === 'Experian' &&
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">Experian Address Description </h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                The correct dispute addresses for Experian may vary depending on the type of dispute and your location. However, here are the general addresses you can use to dispute information on your <br />
                                Experian credit report:
                            </p>
                            <h2 className="font-semibold mt-2">For Mailing Disputes:</h2>
                            <h2 className="font-semibold">Experian</h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                P.O. Box 4500 <br />
                                Allen, TX 75013
                            </p>
                            <h2 className="font-semibold mt-2">Alternate Address For Mailing Disputes:</h2>
                            <h2 className="font-semibold">Experian</h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                P.O. Box 9701 <br />
                                Allen, TX 75013
                            </p>
                            <p className='mt-1 text-sm  text-neutral-500'>This address is sometimes used as an alternative for disputes and may be referenced in specific situations.</p>
                            <h2 className="font-semibold mt-2">For Identity Theft or Fraud-related Disputes:</h2>
                            <h2 className="font-semibold">Experian</h2>
                            <h2 className="font-semibold">Fraud Alert Requests</h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                P.O. Box 9554 <br />
                                Allen, TX 75013</p>
                        </div>
                    }
                    {
                        bureau === 'Equifax' &&
                        <div className="flex flex-col">
                            <h2 className="text-md font-semibold">Equifax Address Description</h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                The correct dispute addresses for Equifax may vary depending on the type of dispute and your location. However, here are the general addresses you can use to dispute information on your <br />
                                Equifax credit report:
                            </p>
                            <h2 className="font-semibold mt-2">For Mailing Disputes:</h2>
                            <h2 className="font-semibold">Equifax Information Services LLC
                            </h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                P.O. Box 740256 <br />
                                Atlanta, GA 30374-0256
                            </p>
                            <h2 className="font-semibold mt-2">For Identity Theft or Fraud-related Disputes:</h2>
                            <h2 className="font-semibold">Equifax Information Services LLC </h2>
                            <p className='mt-1 text-sm  text-neutral-500'>
                                P.O. Box 740256
                                <br />
                                Atlanta, GA 30374-0256
                            </p>
                        </div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}
