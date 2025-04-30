import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Info, Loader, ChevronDown, ChevronUp } from "lucide-react";
import { CreditBureauAddressDescription } from "./credit-bureau-address-description";
import { Bureau, FormattedDispute } from "./dispute-table-row";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { randomId } from "@/lib/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

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

export interface Letter {
    id: string;
    letterName: string;
    shortDescription: string;
    letterType: string;
    creditBureauName: string;
    createdAt: string;
    letterRound: number;
    userId: string;
    letterSent: boolean;
    letterCompleted: boolean;
    disputedData: FormattedDispute[]; 
    address: string;
    includeAffidavit: boolean;
    includeSelfRep: boolean;
  }
  

type CreatePersonalInfoDisputeProps = {
  isOpen: boolean;
  handleClose: () => void;
  formattedDisputes: Record<Bureau, FormattedDispute[]> | undefined;
};

export function CreatePersonalInfoDisputeDialog({ isOpen, handleClose, formattedDisputes }: CreatePersonalInfoDisputeProps) {
  const [user] = useAuthState(auth);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedBureau, setSelectedBureau] = useState('');
  const [selectedBureaus, setSelectedBureaus] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTUAddress, setSelectedTUAddress] = useState('');
  const [selectedEXAddress, setSelectedEXAddress] = useState('');
  const [selectedEQAddress, setSelectedEQAddress] = useState('');
  const [includeAffidavit, setIncludeAffidavit] = useState(false);
  const [includeSelfRep, setIncludeSelfRep] = useState(false);
  const [isCreatingPersonalInfoDispute, setIsCreatingPersonalInfoDispute] = useState(false);
  
  const toggleOption = (option: string) => {
    setSelectedBureaus(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const removeOption = (option: string) => {
    setSelectedBureaus(prev => prev.filter(o => o !== option));
  };

  const handleShowModal = (bureau: string) => {
    setSelectedBureau(bureau);
    setShowInfoModal(true);
  };


const createLetters = async () => {
    if (!formattedDisputes) return;
    const letters: Letter[] = [];
    setIsCreatingPersonalInfoDispute(true)
    const bureauAddresses = {
      transunion: selectedTUAddress,
      experian: selectedEXAddress,
      equifax: selectedEXAddress
    };
  
    // Create letters for the 3 main bureaus
    Object.entries(formattedDisputes).forEach(([bureau, disputes]) => {
      letters.push({
        id: randomId(),
        letterName: bureau.toUpperCase(),
        shortDescription: 'Personal Information',
        letterType: 'personalInformation',
        creditBureauName: bureau,
        createdAt: new Date().toISOString(),
        letterRound: 1,
        userId: user?.uid || '',
        letterSent: false,
        letterCompleted: false,
        disputedData: disputes,
        address: bureauAddresses[bureau as Bureau] || '',
        includeAffidavit,
        includeSelfRep,
      });
    });
  
    // Create letters for selected secondary bureaus
    selectedBureaus.forEach((bureau) => {
      letters.push({
        id: randomId(),
        letterName: bureau,
        shortDescription: 'Personal Information',
        letterType: 'personalInformation',
        creditBureauName: bureau,
        createdAt: new Date().toISOString(),
        letterRound: 1,
        userId: user?.uid || '',
        letterSent: false,
        letterCompleted: false,
        disputedData: [],
        address: '',
        includeAffidavit,
        includeSelfRep,
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
      setIsCreatingPersonalInfoDispute(false)
      handleClose();
      setSelectedBureaus([]);
      setSelectedTUAddress('');
      setSelectedEXAddress('');
      setSelectedEXAddress('');
      setIncludeAffidavit(false);
      setIncludeSelfRep(false);
    } catch (error) {
      toast('Error', {
        description: 'Something went wrong while creating dispute letters.',
        duration: 3000,
      });
      setIsCreatingPersonalInfoDispute(false)
    }
  };
  
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[45vw]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-md">Select Address</h2>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col p-2">
          <div className="flex items-center p-0 my-1">
            <label className="flex items-center mr-4">
              <input type="checkbox" className="mr-2" checked={includeAffidavit} onChange={(e) => setIncludeAffidavit(e.target.checked)} />
              ID Theft Affidavit
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" checked={includeSelfRep} onChange={(e) => setIncludeSelfRep(e.target.checked)} />
              Declaration of Self-Representation
            </label>
          </div>

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
                className="border border-gray-800 rounded-md p-2 text-sm focus:outline-none"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="">Select...</option>
                {addresses.map((addr, i) => <option key={i} value={addr}>{addr}</option>)}
              </select>
            </div>
          ))}

          <div className="flex flex-col my-1 relative">
            <label className="text-sm mb-1">Alternate / Secondary Bureaus</label>
            <div className="border border-gray-800 rounded-md p-2 text-sm cursor-pointer min-h-[42px] flex flex-wrap gap-2" onClick={() => setOpen(!open)}>
              {selectedBureaus.length === 0 && <span className="text-gray-400 my-auto">Select bureaus...</span>}
              {open ? <ChevronUp className="h-4 w-4 absolute right-1 mt-1 font-bold"/> : <ChevronDown className="h-4 w-4 absolute right-1 mt-1 font-bold"/>}
              {selectedBureaus.map((item) => (
                <div key={item} className="bg-gray-200 text-gray-800 px-2 py-1 rounded flex items-center gap-1">
                  <span>{item}</span>
                  <X size={14} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); removeOption(item); }} />
                </div>
              ))}
            </div>
            {open && (
              <div className="absolute top-full mt-1 z-10 w-full border bg-white border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
                {secondaryBureaus.map((option) => (
                  <div
                    key={option}
                    onClick={() => toggleOption(option)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedBureaus.includes(option) ? "bg-blue-100 font-semibold" : ""}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" 
           onClick={createLetters}
           disabled = {isCreatingPersonalInfoDispute}
           >
            Create Letters
            {
                   isCreatingPersonalInfoDispute && <Loader className="animate-spin h-4 w-4 mr-2" />
             }
          </Button>
        </DialogFooter>
      </DialogContent>

      {showInfoModal && (
        <CreditBureauAddressDescription
          isOpen={showInfoModal}
          handleClose={() => setShowInfoModal(false)}
          bureau={selectedBureau}
        />
      )}
    </Dialog>
  );
}
