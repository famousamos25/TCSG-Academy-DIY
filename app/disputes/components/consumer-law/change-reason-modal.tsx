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
import { Textarea } from '@/components/ui/textarea';
import { disputeOptions } from '@/constants/edit-dipute-letter-data';
import { X } from "lucide-react";
import { useEffect, useState } from "react";


type Props = {
  isOpen: boolean;
  handleClose: () => void;
  onSave?: (data: { reason: string; description: string}) => void;
  defaultValue?: { reason: string; description: string};
};

export function ChangeReasonModal({ isOpen, handleClose, defaultValue, onSave = () => { } }: Props) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [reasonDescription, setReasonDescription] = useState("");

  const handleSave = () => {
    onSave({
      reason: selectedReason,
      description: reasonDescription
    });
    handleClose();
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedReason(defaultValue.reason)
      setReasonDescription(defaultValue.description)
    }

  }, [defaultValue]);

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
            value={selectedReason}
            onValueChange={v => {
              setSelectedReason(v);
              setReasonDescription(v);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select reason...." />
            </SelectTrigger>
            <SelectContent>
              {
                disputeOptions
                .filter(option => option.category === 'ROUND 1-12 FLOW')
                .map((option, idx) => (
                  <SelectGroup key={idx}>
                    <SelectLabel>INQUIRIES</SelectLabel>
                    {
                      option.items?.map((item, idx) => (<SelectItem key={idx} value={item}>{item}</SelectItem>))
                    }
                  </SelectGroup>
                ))
              }
            </SelectContent>
          </Select>

          <Textarea
            rows={3}
            className='mt-2'
            value={reasonDescription}
            onChange={e => setReasonDescription(e.target.value)}
          />
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
