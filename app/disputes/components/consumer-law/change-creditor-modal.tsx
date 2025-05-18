import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreditReport } from '@/hooks/use-credit-report';
import { DisputeAccount } from '@/types/account';
import { Creditor } from '@/types/creditor';
import { X } from "lucide-react";
import { useEffect, useState } from "react";


type Props = {
  isOpen: boolean;
  handleClose: () => void;
  onSave?: (creditor: string) => void;
  creditorValue?: string;
  account: DisputeAccount;
};

export function ChangeCreditorModal({ isOpen, handleClose, creditorValue, onSave = () => { }, account }: Props) {  
  const [selectedCreditor, setSelectedCreditor] = useState<string>(creditorValue ??account.subscriberCode);

  const { creditReport } = useCreditReport();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const creditors: Creditor[] = creditReport?.creditors ?? [];  

  const handleSave = () => {

    if (!selectedCreditor) return;

    onSave(selectedCreditor);
    handleClose();
  };

  useEffect(() => {
    const selectedCred = creditors?.find(c => c.subscriberCode === creditorValue || c.subscriberCode === account.subscriberCode);
    
    if (selectedCred) {
      setSelectedCreditor(selectedCred.subscriberCode);
    }
  }, [account, creditors, creditorValue])

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[45vw] pt-0 py-0 pb-4">
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </Button>
        </div>


        <div className="flex flex-col my-1">
          <Select
            value={selectedCreditor}
            onValueChange={v=>setSelectedCreditor(v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Creditor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Creditor</SelectLabel>
                {
                  creditors?.map((c, idx) => (<SelectItem key={idx} value={c.subscriberCode}>
                    <p className="text-sm">{c.name}</p>
                    <p className="text-sm">
                      {c.address?.unparsedStreet} {" "}
                      {c.address?.city} {", "}
                      {c.address?.stateCode} {" "}
                      {c.address?.postalCode} {" "}
                    </p>
                  </SelectItem>))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className='flex justify-end'>
          <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}
