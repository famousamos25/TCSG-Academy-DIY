import { useCreditReport } from '@/hooks/use-credit-report';
import { useDocuments } from '@/hooks/use-documents';
import { usePersonalInfo } from '@/hooks/use-personal-info';
import { DisputeLetter } from '@/types/dispute-center';
import { format } from 'date-fns';
import { useMemo } from 'react';

interface PrintLetterProps {
  letter: DisputeLetter;
}

export function useLetterInfo({ letter }: PrintLetterProps) {

  const { creditReport } = useCreditReport();
  const { userInfo, } = usePersonalInfo();
  const { documents } = useDocuments();

  const letterData: any = useMemo(() => {
    try {
      if (!userInfo) return null;
      if (!letter) return null;
      if (!creditReport) return null;
      if (!creditReport?.creditors) return null;
      if (!creditReport?.creditors?.length) return null;

      const creditor = (creditReport?.creditors)?.find((c: any) => c);

      const ssnCard = documents?.find((doc: any) => doc.type === "social_security")?.fileUrl ?? "";
      const driverLicense = documents?.find((doc: any) => doc.type === "drivers_license")?.fileUrl ?? "";

      return {
        clientName: `${userInfo?.firstName ?? ""} ${userInfo?.firstName ?? ""}`,
        clientAddress: userInfo?.address1 ?? "",
        clientCity: userInfo?.city ?? "",
        clientState: userInfo?.state ?? "",
        clientZIPCode: userInfo?.zipcode ?? "",
        clientPhone: userInfo?.phone ?? "",
        date: format(new Date(letter?.createdAt), 'MMMM dd, yyyy'),
        creditorName: creditor?.name ?? "",
        creditorAddress: creditReport?.address?.unparsedStreet ?? "",
        creditorCity: creditor?.address?.city ?? "",
        creditorState: creditor?.address?.stateCode ?? "",
        creditorZIPCode: creditor?.address?.postalCode ?? "",
        ssn: userInfo?.ssn ?? "",
        ssnCard,
        driverLicense,
      };
    } catch (error) {
      return null;
    }
  }, [userInfo, letter, creditReport, documents]);

  return { letterData };
}
