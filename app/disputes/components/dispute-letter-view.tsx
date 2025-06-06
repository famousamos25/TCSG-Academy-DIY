import DerogatoryRound1 from '@/components/dispute-letters/derogatory/derogatory-round-1';
import PersonalInformation from '@/components/dispute-letters/personal-information';
import SecurityFreeze from '@/components/dispute-letters/security-freeze';

interface DisputeLetterViewProps {
  data: any;
  letterType: string;
}

export function DisputeLetterView({ letterType, data }: DisputeLetterViewProps) {
  if (!data) return null;

  return (
    <div className="w-full text-black">
      {letterType === "securityFreeze" && (<SecurityFreeze {...data} />)}
      {letterType === "personalInformation" && (<PersonalInformation {...data} />)}
      {letterType === "derogatory" && (<DerogatoryRound1 {...data} />)}
    </div>
  );
}
