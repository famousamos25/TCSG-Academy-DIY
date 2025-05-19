import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { auth, db } from "@/lib/firebase";
import { randomId } from "@/lib/utils";
import { DisputeLetter } from '@/types/dispute-center';
import { doc, setDoc } from "firebase/firestore";
import { Info, Loader, X } from "lucide-react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { toast } from "sonner";
import { CreditBureauAddressDescription } from "./credit-bureau-address-description";
import { SelectedInfo } from './personal-information-dispute';

const transUnionAdresses = [
  "P.O BOX 2000, Chester, PA 19016-2000",
  "P.O. BOX 2000, Chester, PA 19016-2000",
];
const experianAdresses = [
  "P.O BOX 4500, Allen, TX 75013",
  "P.O BOX 9701, Allen, TX 75013",
  "P.O BOX 9554, Allen, TX 75013",
];
const equifaxAdresses = [
  "P.O BOX 740256, Atlanta, GA 30374-0256",
  "P.O BOX 105096, Atlanta, GA 30348-5096",
];
const secondaryBureaus = [
  "Chex Systems, Inc.",
  "ARS",
  "Federal Trade Commission",
  "FactorTrust Inc.",
  "NCTUE Security Freeze",
  "LexisNexis",
  "SageStream",
];


type CreatePersonalInfoDisputeProps = {
  isOpen: boolean;
  handleClose: () => void;
  onComplete?: () => void;
  selectedInfos: SelectedInfo[];
};

export function CreatePersonalInfoDisputeDialog({ isOpen, handleClose, selectedInfos, onComplete=()=>{} }: CreatePersonalInfoDisputeProps) {
  const [user] = useAuthState(auth);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedBureau, setSelectedBureau] = useState('');
  const [selectedBureaus, setSelectedBureaus] = useState<any>([]);

  const [selectedTUAddress, setSelectedTUAddress] = useState('');
  const [selectedEXAddress, setSelectedEXAddress] = useState('');
  const [selectedEQAddress, setSelectedEQAddress] = useState('');
  const [includeAffidavit, setIncludeAffidavit] = useState(false);
  const [includeSelfRep, setIncludeSelfRep] = useState(false);

  const [isCreatingPersonalInfoDispute, setIsCreatingPersonalInfoDispute] = useState(false);


  const handleShowModal = (bureau: string) => {
    setSelectedBureau(bureau);
    setShowInfoModal(true);
  };

  const createLetters = async () => {
    if (!selectedInfos) return;
    const letters: DisputeLetter[] = [];
    setIsCreatingPersonalInfoDispute(true);
    const bureauAddresses = [
      { bureau: "transUnion", address: selectedTUAddress },
      { bureau: "equifax", address: selectedEQAddress },
      { bureau: "experian", address: selectedEQAddress },
    ];

    // Create letters for the 3 main bureaus
    selectedInfos.forEach((info) => {
      letters.push({
        id: randomId(),
        letterName: 'Personal Information Dispute Letter',
        shortDescription: 'Credit Bureau',
        letterType: 'personalInformation',
        creditBureauName: info.bureau.toUpperCase(),
        createdAt: new Date().toISOString(),
        letterRound: 1,
        userId: user?.uid || '',
        letterSent: false,
        letterCompleted: false,
        creditbureauAddresses: bureauAddresses,
        includeAffidavit,
        includeSelfRep,
        inquiries: [],
        accounts: []
      });
    });

    // Create letters for selected secondary bureaus
    selectedBureaus.forEach((bureau: any) => {
      letters.push({
        id: randomId(),
        letterName: 'Personal Information Dispute Letter',
        shortDescription: 'Credit Bureau',
        letterType: 'personalInformation',
        creditBureauName: bureau?.value,
        createdAt: new Date().toISOString(),
        letterRound: 1,
        userId: user?.uid || '',
        letterSent: false,
        letterCompleted: false,
        creditbureauAddresses: bureauAddresses,
        includeAffidavit,
        includeSelfRep,
        inquiries: [],
        accounts: []
      });
    });
    try {
      await Promise.all(
        letters.map(async (letter) => {
          const letterRef = doc(db, 'letters', letter.id);
          await setDoc(letterRef, letter);
        })
      );

      toast('Success', {
        description: 'Personal information dispute letters created successfully.',
        duration: 3000,
      });
      
      setIsCreatingPersonalInfoDispute(false);
      setSelectedBureaus([]);
      setSelectedTUAddress('');
      setSelectedEXAddress('');
      setSelectedEXAddress('');
      setIncludeAffidavit(false);
      setIncludeSelfRep(false);

      handleClose();
      onComplete();
    } catch (error) {
      toast('Error', {
        description: 'Something went wrong while creating dispute letters.',
        duration: 3000,
      });
      setIsCreatingPersonalInfoDispute(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[45vw] pt-0">
        <div className="flex items-center justify-between">
          <h2 className="text-md">Select Address</h2>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center p-0 my-1">
            <label className="flex items-center mr-4">
              <Checkbox className="mr-2" checked={includeAffidavit} onCheckedChange={(value) => setIncludeAffidavit(!!value)} />
              ID Theft Affidavit
            </label>
            <label className="flex items-center">
              <Checkbox className="mr-2" checked={includeSelfRep} onCheckedChange={(value) => setIncludeSelfRep(!!value)} />
              Declaration of Self-Representation
            </label>
          </div>

          <div className="mt-4">
            {[{
              label: "TransUnion",
              addresses: transUnionAdresses,
              selected: selectedTUAddress,
              setSelected: setSelectedTUAddress,
            }, {
              label: "Experian",
              addresses: experianAdresses,
              selected: selectedEXAddress,
              setSelected: setSelectedEXAddress,
            }, {
              label: "Equifax",
              addresses: equifaxAdresses,
              selected: selectedEQAddress,
              setSelected: setSelectedEQAddress,
            }].map(({ label, addresses, selected, setSelected }) => (
              <div className="flex flex-col my-1" key={label}>
                <label className="text-sm flex items-center">
                  {label} Address
                  <Info className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleShowModal(label)} />
                </label>
                <select
                  className="border border-gray-800 rounded-md p-2 mt-1 text-sm focus:outline-none"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="">Select...</option>
                  {addresses.map((addr, i) => <option key={i} value={addr}>{addr}</option>)}
                </select>
              </div>
            ))}
          </div>

          <div className="flex flex-col my-1">
            <label className="text-sm mb-1">Alternate / Secondary Bureaus</label>
            <Select
              isMulti
              options={secondaryBureaus?.map(b => ({ label: b, value: b }))}
              value={selectedBureaus}
              onChange={value => setSelectedBureaus(value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            onClick={createLetters}
            disabled={isCreatingPersonalInfoDispute}
          >
            Create Letters
            {
              isCreatingPersonalInfoDispute && <Loader className="animate-spin h-4 w-4 mr-2" />
            }
          </Button>
        </DialogFooter>
      </DialogContent>

      {
        showInfoModal && (
          <CreditBureauAddressDescription
            isOpen={showInfoModal}
            handleClose={() => setShowInfoModal(false)}
            bureau={selectedBureau}
          />
        )
      }
    </Dialog >
  );
}
