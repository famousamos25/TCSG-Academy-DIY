import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreditReport } from '@/hooks/use-credit-report';
import { useDocuments } from '@/hooks/use-documents';
import { usePersonalInfo } from '@/hooks/use-personal-info';
import { DisputeLetter } from '@/types/dispute-center';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { Loader, X } from "lucide-react";
import { PropsWithChildren, useMemo, useState } from 'react';
import { DisputeLetterView } from './dispute-letter-view';

interface PreviewLetterModalProps extends PropsWithChildren {
  letter: DisputeLetter;
}

export function PreviewLetterModal({ children, letter }: PreviewLetterModalProps) {
  const [open, setOpen] = useState(false);

  const onClose = (open: boolean) => {
    setOpen(open);
  };

  const { creditReport, loading } = useCreditReport();
  const { userInfo, loading: loadingUserInfo } = usePersonalInfo();
  const { documents, loading: loadingDocs } = useDocuments();
  
  const letterData: any = useMemo(() => {
    if (!userInfo) return null;
    if (!letter) return null;
    if (!creditReport) return null;
    if (!creditReport?.creditors) return null;
    if (!creditReport?.creditors?.length) return null;

    const creditor = (creditReport?.creditors)?.find((c: any) => letter?.creditBureauName);

    const ssnCard = documents?.find((doc: any) => doc.type === "social_security")?.fileUrl ?? "";
    const driverLicense = documents?.find((doc: any) => doc.type === "drivers_license")?.fileUrl ?? "";

    
    return {
      clientName: `${userInfo?.firstName ?? ""} ${userInfo?.lastName ?? ""}`,
      clientAddress: userInfo?.address1 ?? "",
      clientCity: userInfo?.city ?? "",
      clientState: userInfo?.state ?? "",
      clientZIPCode: userInfo?.zipcode ?? "",
      clientPhone: userInfo?.phone ?? "",
      clientDob: userInfo.dob ,
      date: format(new Date(letter?.createdAt), 'MMMM dd, yyyy'),

      creditorName: creditor?.name ?? "",
      creditorAddress: creditReport?.address?.unparsedStreet ?? "",
      creditorCity: creditor?.address?.city ?? "",
      creditorState: creditor?.address?.stateCode ?? "",
      creditorZIPCode: creditor?.address?.postalCode ?? "",
      ssn: userInfo?.ssn ?? "",
      ssnCard,
      driverLicense,
      creditBureau: letter?.creditBureauName
    };
  }, [userInfo, letter, creditReport, documents]);

  if (!letter) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-white text-white py-0">
        <div className="flex items-end justify-end">
          <X className="text-gray-600 w-6 h-6 cursor-pointer" onClick={() => onClose(false)} />
        </div>
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-semibold text-green-400">Preview Letter</DialogTitle>
        </DialogHeader>

        {(loading || loadingDocs || loadingUserInfo) ? (
          <div className="flex items-center justify-center py-16">
            <Loader className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : creditReport ? (
            <DisputeLetterView letterType={letter?.letterType} data={letterData} /> 
        )
          : (
            <div className="flex items-center justify-center py-16">
              <p className="text-gray-500">No credit report data available.</p>
            </div>
          )
        }

      </DialogContent>
    </Dialog>
  );
}
