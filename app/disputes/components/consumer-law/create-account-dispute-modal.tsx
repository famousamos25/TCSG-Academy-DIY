import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { disputeInstructions, disputeOptions } from '@/constants/edit-dipute-letter-data';
import { useCreditReport } from '@/hooks/use-credit-report';
import { auth, db } from "@/lib/firebase";
import { randomId } from "@/lib/utils";
import { Creditor } from '@/types/creditor';
import { DisputeLetter } from '@/types/dispute-center';
import { doc, setDoc } from "firebase/firestore";
import { Info, Loader, X } from "lucide-react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Select from "react-select";
import { toast } from "sonner";
import { ColumnInstruction, ColumnReason, SelectedCreditor, SelectedInfo } from './consumer-law-derogatories';

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


type CreateAccountDisputeProps = {
  isOpen: boolean;
  handleClose: () => void;
  accounts: any[];
  onComplete?: () => void;
  selectedInfos: SelectedInfo[];
  columnReasons: ColumnReason[];
  columnInstructions: ColumnInstruction[];
  selectedCreditors: SelectedCreditor[];
  letterType?: string;
  letterName?: string;

};

export function CreateAccountDisputeDialog({
  isOpen, handleClose, selectedInfos, columnReasons, accounts, selectedCreditors, columnInstructions, onComplete = () => { },
  letterType = 'derogatory',
  letterName = 'Derogatory Letter #1',
}: CreateAccountDisputeProps) {
  const [user] = useAuthState(auth);


  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedBureau, setSelectedBureau] = useState('');
  const [selectedBureaus, setSelectedBureaus] = useState<any>([]);

  const [selectedTUAddress, setSelectedTUAddress] = useState('');
  const [selectedEXAddress, setSelectedEXAddress] = useState('');
  const [selectedEQAddress, setSelectedEQAddress] = useState('');
  const [includeAffidavit, setIncludeAffidavit] = useState(false);
  const [includeSelfRep, setIncludeSelfRep] = useState(false);

  const [isCreatingAccountDispute, setIsCreatingAccountDispute] = useState(false);

  const { creditReport } = useCreditReport();
  const creditors: Creditor[] = creditReport?.creditors ?? [];


  const handleShowModal = (bureau: string) => {
    setSelectedBureau(bureau);
    setShowInfoModal(true);
  };

  const bureauMappings = selectedInfos.reduce((acc: any, info) => {
    const bureau = info.bureau.toLowerCase();
    if (!acc[bureau]) {
      acc[bureau] = [];
    }
    acc[bureau].push(info);
    return acc;
  }, {});

  const createLetters = async () => {
    if (selectedInfos.length ===0 && selectedCreditors.length === 0) return;

    try {
      const letters: DisputeLetter[] = [];
      setIsCreatingAccountDispute(true);

      const bureauAddresses = [
        { bureau: "transUnion", address: selectedTUAddress },
        { bureau: "equifax", address: selectedEQAddress },
        { bureau: "experian", address: selectedEQAddress },
      ];

      // Create letters for creditors
      selectedCreditors.forEach((creditor) => {
        const account = accounts[creditor.index]?.[0];        
        const reason = columnReasons[creditor.index]?.reason || disputeOptions[0]?.items[0];
        const reasonDescription = columnReasons[creditor.index]?.description || disputeOptions[0]?.items[0];

        const instruction = columnInstructions[creditor.index]?.instruction || disputeInstructions[0]?.items[0];
        const instructionDescription = columnInstructions[creditor.index]?.description || disputeInstructions[0]?.items[0];

        letters.push({
          id: randomId(),
          letterType,
          letterName: letterType === "latePayment"? "Late Payment Letter Round 1" : letterName,
          shortDescription: 'Creditor',
          creditBureauName: creditors?.find(c => c.subscriberCode === creditor.creditor)?.name || '',
          createdAt: new Date().toISOString(),
          letterRound: 1,
          userId: user?.uid || '',
          letterSent: false,
          letterCompleted: false,
          creditbureauAddresses: bureauAddresses,
          includeAffidavit,
          includeSelfRep,
          inquiries: [],
          accounts: [{
            accountNumber: account.accountNumber,
            status: "Verified",
            furnisher: account.creditorName,
            reason,
            reasonDescription,
            instruction,
            instructionDescription
          }]
        });
      });

      // Create letters any of the 3 main bureaus selected
      Object.keys(bureauMappings).forEach((bureau) => {
        const bureauInfos = bureauMappings[bureau];
        const bureauAccounts = bureauInfos.map((info: any) => {
          const account = accounts[info.index]?.[0];
          const reason = columnReasons[info.index]?.reason || disputeOptions[0]?.items[0];
          const reasonDescription = columnReasons[info.index]?.description || disputeOptions[0]?.items[0];
          const instruction = columnInstructions[info.index]?.instruction || disputeInstructions[0]?.items[0];
          const instructionDescription = columnInstructions[info.index]?.description || disputeInstructions[0]?.items[0];

          return {
            accountNumber: account.accountNumber,
            status: "Verified",
            furnisher: account.creditorName,
            reason,
            reasonDescription,
            instruction,
            instructionDescription
          };
        });

        letters.push({
          id: randomId(),
          letterType,
          letterName,
          shortDescription: 'Credit Bureau',
          creditBureauName: bureau?.toUpperCase(),
          createdAt: new Date().toISOString(),
          letterRound: 1,
          userId: user?.uid || '',
          letterSent: false,
          letterCompleted: false,
          creditbureauAddresses: bureauAddresses,
          includeAffidavit,
          includeSelfRep,
          inquiries: [],
          accounts: bureauAccounts
        });
      });

      // Create letters for selected secondary bureaus
      const selectedAccountIndexes = selectedInfos.map((info) => info.index);
      selectedBureaus.forEach((bureau: any) => {
        selectedAccountIndexes.push(bureau.index);
      });
      const uniqueIndexes = Array.from(new Set(selectedAccountIndexes)).filter((index) => index !== undefined);
      
      const allSelectedAccounts = uniqueIndexes.map((index) => {
        const account = accounts[index]?.[0];
        const reason = columnReasons[index]?.reason || disputeOptions[0]?.items[0];
        const reasonDescription = columnReasons[index]?.description || disputeOptions[0]?.items[0];
        const instruction = columnInstructions[index]?.instruction || disputeInstructions[0]?.items[0];
        const instructionDescription = columnInstructions[index]?.description || disputeInstructions[0]?.items[0];

        return {
          accountNumber: account.accountNumber,
          status: "Verified",
          furnisher: account.creditorName,
          reason,
          reasonDescription,
          instruction,
          instructionDescription
        };
      });

      selectedBureaus.forEach((bureau: any) => {
        letters.push({
          id: randomId(),
          letterType,
          letterName,
          shortDescription: 'Credit Bureau',
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
          accounts: allSelectedAccounts
        });
      });      

      await Promise.all(
        letters.map(async (letter) => {
          const letterRef = doc(db, 'letters', letter.id);
          await setDoc(letterRef, letter);
        })
      );

      toast('Success', {
        description: 'Derogatory dispute letters created successfully.',
        duration: 3000,
      });

      setIsCreatingAccountDispute(false);
      setSelectedBureaus([]);
      setSelectedTUAddress('');
      setSelectedEXAddress('');
      setSelectedEXAddress('');
      setIncludeAffidavit(false);
      setIncludeSelfRep(false);

      handleClose();
      onComplete();
    } catch (error) {
      console.error('Error creating dispute letters:', error);      
      toast('Error', {
        description: 'Something went wrong while creating dispute letters.',
        duration: 3000,
      });
      setIsCreatingAccountDispute(false);
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
            disabled={isCreatingAccountDispute}
          >
            Create Letters
            {
              isCreatingAccountDispute && <Loader className="animate-spin h-4 w-4 mr-2" />
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}
