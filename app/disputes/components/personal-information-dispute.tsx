import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreditReport } from '@/hooks/use-credit-report';
import { X } from 'lucide-react';
import { useState } from 'react';
import { CreatePersonalInfoDisputeDialog } from './create-personal-info-dispute';

interface PersonalInformationDisputeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export type Bureau = 'transUnion' | 'experian' | 'equifax';
export interface SelectedInfo {
    type: string;
    value: string;
    bureau: Bureau;
}

export default function PersonalInformationDisputeDialog({ open, onOpenChange }: PersonalInformationDisputeDialogProps) {
    const [show, setShow] = useState<boolean>(false);
    const [selectedInfos, setSelectedInfos] = useState<SelectedInfo[]>([]);

    const { creditReport, loading: loadingCreditReport } = useCreditReport();

    const handleSelectionChange = (bureau: Bureau, type: string, value: string) => {
        const exists = selectedInfos?.find((info) => info.bureau === bureau && info.value === value && info.type === type);
        if (exists) {
            setSelectedInfos((prev) => prev.filter((info) => info.bureau !== bureau || info.value !== value || info.type !== type));
        }
        else {
            setSelectedInfos((prev) => [...prev, { type, value, bureau }]);
        }
    };

    const getValue = (key: string, bureau: string) => {
        const value = personalInfo?.[key]?.find((name: any) => name.hasOwnProperty(bureau))?.[bureau];
        return value ?? "-";
    };

    const isChecked = (bureau: Bureau, type: string, value: string) => {
        return !!selectedInfos?.find((info) => info.bureau === bureau && info.value === value && info.type === type);
    };

    const getUniqueEmployers = (employers: { dateUpdated: string, name: string; }[]) => {
        if (!employers || !Array.isArray(employers)) return [];

        // Create a map to store the most recent employer record for each unique name
        const employerMap = new Map<string, { dateUpdated: string, name: string; }>();

        employers.forEach((employer) => {
            const existingEmployer = employerMap.get(employer.name);
            if (!existingEmployer || new Date(employer.dateUpdated) > new Date(existingEmployer.dateUpdated)) {
                employerMap.set(employer.name, employer);
            }
        });

        // Convert the map values back to an array
        return Array.from(employerMap.values());
    };


    const personalInfo = creditReport?.personalInfo;

    // console.log("personalInfo", personalInfo);
    console.log("selectedInfos", selectedInfos);

    console.log(getUniqueEmployers(personalInfo?.employer?.equifax ?? []))


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] w-[1200px] max-h-[90vh] p-0 overflow-hidden">
                <DialogHeader className="px-6 pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold">Create New Dispute(s)</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>
                <div className="px-6 pb-2 space-y-6 max-h-[calc(90vh-120px)] min-h-[30vh] overflow-y-auto">
                    {
                        loadingCreditReport ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">Loading...</p>
                            </div>
                        ) : personalInfo ? <>
                            <Table className='border'>
                                <TableHeader>
                                    <TableRow className="border-b">
                                        <TableHead className="text-slate-400 pl-6 text-left">Field</TableHead>
                                        <TableHead className="text-cyan-400 text-left">TRANSUNION</TableHead>
                                        <TableHead className="text-blue-400 text-left">EXPERIAN</TableHead>
                                        <TableHead className="text-red-400 text-left">EQUIFAX</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="border-b ">
                                        <TableCell className="font-medium pl-6">Name</TableCell>
                                        <PersonalInfoTableCell
                                            bureau="transUnion" type="name" value={getValue('names', 'transUnion')}
                                            checked={isChecked('transUnion', 'name', getValue('names', 'transUnion'))}
                                            onCheckedChange={() => handleSelectionChange('transUnion', 'name', getValue('names', 'transUnion'))}
                                        />
                                        <PersonalInfoTableCell
                                            bureau="experian" type="name" value={getValue('names', 'experian')}
                                            checked={isChecked('experian', 'name', getValue('names', 'experian'))}
                                            onCheckedChange={() => handleSelectionChange('experian', 'name', getValue('names', 'experian'))}
                                        />
                                        <PersonalInfoTableCell
                                            bureau="equifax" type="name" value={getValue('names', 'equifax')}
                                            checked={isChecked('equifax', 'name', getValue('names', 'equifax'))}
                                            onCheckedChange={() => handleSelectionChange('equifax', 'name', getValue('names', 'equifax'))}
                                        />
                                    </TableRow>

                                    <TableRow className="border-b ">
                                        <TableCell className="font-medium pl-6">Date Of Birth</TableCell>
                                        <PersonalInfoTableCell
                                            bureau="transUnion" type="dateOfBirth" value={getValue('dateOfBirth', 'transUnion')}
                                            checked={isChecked('transUnion', 'dateOfBirth', getValue('dateOfBirth', 'transUnion'))}
                                            onCheckedChange={() => handleSelectionChange('transUnion', 'dateOfBirth', getValue('dateOfBirth', 'transUnion'))}
                                        />
                                        <PersonalInfoTableCell
                                            bureau="experian" type="dateOfBirth" value={getValue('dateOfBirth', 'experian')}
                                            checked={isChecked('experian', 'dateOfBirth', getValue('dateOfBirth', 'experian'))}
                                            onCheckedChange={() => handleSelectionChange('experian', 'dateOfBirth', getValue('dateOfBirth', 'experian'))}
                                        />
                                        <PersonalInfoTableCell
                                            bureau="equifax" type="dateOfBirth" value={getValue('dateOfBirth', 'equifax')}
                                            checked={isChecked('equifax', 'dateOfBirth', getValue('dateOfBirth', 'equifax'))}
                                            onCheckedChange={() => handleSelectionChange('equifax', 'dateOfBirth', getValue('dateOfBirth', 'equifax'))}
                                        />
                                    </TableRow>

                                    <TableRow className="border-b ">
                                        <TableCell className="font-medium pl-6">Previous Address</TableCell>
                                        <PersonalInfoTableCell
                                            bureau="transUnion" type="previousAddresses" value={getValue('previousAddresses', 'transUnion')}
                                            checked={isChecked('transUnion', 'previousAddresses', getValue('previousAddresses', 'transUnion'))}
                                            onCheckedChange={() => handleSelectionChange('transUnion', 'previousAddresses', getValue('previousAddresses', 'transUnion'))}
                                        />
                                        <PersonalInfoTableCell
                                            bureau="experian" type="previousAddresses" value={getValue('previousAddresses', 'experian')}
                                            checked={isChecked('experian', 'previousAddresses', getValue('previousAddresses', 'experian'))}
                                            onCheckedChange={() => handleSelectionChange('experian', 'previousAddresses', getValue('previousAddresses', 'experian'))}
                                        />
                                        <PersonalInfoTableCell
                                            bureau="equifax" type="previousAddresses" value={getValue('previousAddresses', 'equifax')}
                                            checked={isChecked('equifax', 'previousAddresses', getValue('previousAddresses', 'equifax'))}
                                            onCheckedChange={() => handleSelectionChange('equifax', 'previousAddresses', getValue('previousAddresses', 'equifax'))}
                                        />
                                    </TableRow>

                                    <TableRow className="border-b ">
                                        <TableCell className="font-medium pl-6">Current Address</TableCell>
                                        <PersonalInfoTableCell
                                            bureau="transUnion" type="currentAddresses" value={getValue('currentAddresses', 'transUnion')}
                                            checked={isChecked('transUnion', 'currentAddresses', getValue('currentAddresses', 'transUnion'))}
                                            onCheckedChange={() => handleSelectionChange('transUnion', 'currentAddresses', getValue('currentAddresses', 'transUnion'))}
                                        />
                                        <PersonalInfoTableCell
                                            bureau="experian" type="currentAddresses" value={getValue('currentAddresses', 'experian')}
                                            checked={isChecked('experian', 'currentAddresses', getValue('currentAddresses', 'experian'))}
                                            onCheckedChange={() => handleSelectionChange('experian', 'currentAddresses', getValue('currentAddresses', 'experian'))}
                                        />
                                        <PersonalInfoTableCell
                                            bureau="equifax" type="currentAddresses" value={getValue('currentAddresses', 'equifax')}
                                            checked={isChecked('equifax', 'currentAddresses', getValue('currentAddresses', 'equifax'))}
                                            onCheckedChange={() => handleSelectionChange('equifax', 'currentAddresses', getValue('currentAddresses', 'equifax'))}
                                        />
                                    </TableRow>
                                    <TableRow className="border-b ">
                                        <TableCell className="font-medium pl-6">Employer</TableCell>
                                        <TableCell className="text-center_">
                                            {getUniqueEmployers(personalInfo?.employer?.transUnion)?.map((emp: any, idx: number) => (
                                                <div key={idx} className="flex items-start space-x-2">
                                                    <Checkbox
                                                        id={`${emp}-${idx}`}
                                                        checked={isChecked("transUnion", "employer", getUniqueEmployers(personalInfo?.employer?.transUnion)?.[idx]?.name ?? emp.name)}
                                                        onCheckedChange={() => handleSelectionChange("transUnion", "employer", getUniqueEmployers(personalInfo?.employer?.transUnion)?.[idx]?.name ?? emp.name)}
                                                    />
                                                    <label htmlFor={`${emp}-${idx}`} className="flex flex-col cursor-pointer">
                                                        <div>
                                                            <p className='text-[12px] text-neutral-600'>{emp.name}</p>
                                                            <p className='text-sm text-neutral-800'>(Date updated: {emp.dateUpdated})</p>
                                                        </div>
                                                        {isChecked("transUnion", "employer", getUniqueEmployers(personalInfo?.employer?.transUnion)?.[idx]?.name ?? emp.name) && (
                                                            <span className="text-green-500 text-sm ">Dispute</span>
                                                        )}
                                                    </label>
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell className="text-center_">
                                            {getUniqueEmployers(personalInfo?.employer?.experian)?.map((emp: any, idx: number) => (
                                                <div key={idx} className="flex items-start space-x-2">
                                                    <Checkbox
                                                        id={`${emp}-${idx}`}
                                                        checked={isChecked("experian", "employer", getUniqueEmployers(personalInfo?.employer?.experian)?.[idx]?.name ?? emp.name)}
                                                        onCheckedChange={() => handleSelectionChange("experian", "employer", getUniqueEmployers(personalInfo?.employer?.experian)?.[idx]?.name ?? emp.name)}
                                                    />
                                                    <label htmlFor={`${emp}-${idx}`} className="flex flex-col cursor-pointer">
                                                        <div>
                                                            <p className='text-[12px] text-neutral-600'>{emp.name}</p>
                                                            <p className='text-sm text-neutral-800'>(Date updated: {emp.dateUpdated})</p>
                                                        </div>
                                                        {isChecked("experian", "employer", getUniqueEmployers(personalInfo?.employer?.experian)?.[idx]?.name ?? emp.name) && (
                                                            <span className="text-green-500 text-sm ">Dispute</span>
                                                        )}
                                                    </label>
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell className="text-center_">
                                            {getUniqueEmployers(personalInfo?.employer?.equifax)?.map((emp: any, idx: number) => (
                                                <div key={idx} className="flex items-start space-x-2">
                                                    <Checkbox
                                                        id={`${emp}-${idx}`}
                                                        checked={isChecked("equifax", "employer", getUniqueEmployers(personalInfo?.employer?.equifax)?.[idx]?.name ?? emp.name)}
                                                        onCheckedChange={() => handleSelectionChange("equifax", "employer", getUniqueEmployers(personalInfo?.employer?.equifax)?.[idx]?.name ?? emp.name)}
                                                    />
                                                    <label htmlFor={`${emp}-${idx}`} className="flex flex-col cursor-pointer">
                                                        <div>
                                                            <p className='text-[12px] text-neutral-600'>{emp.name}</p>
                                                            <p className='text-sm text-neutral-800'>(Date updated: {emp.dateUpdated})</p>
                                                        </div>
                                                        {isChecked("equifax", "employer", getUniqueEmployers(personalInfo?.employer?.equifax)?.[idx]?.name ?? emp.name) && (
                                                            <span className="text-green-500 text-sm ">Dispute</span>
                                                        )}
                                                    </label>
                                                </div>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="flex justify-end space-x-4 mt-6">
                                <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                                <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                                    onClick={() => setShow(!show)}
                                    disabled={selectedInfos.length === 0}
                                >
                                    Create Personal Information Dispute
                                </Button>
                            </div>
                        </> : (
                            <div className="flex flex-col space-y-4">
                                <p className="text-sm text-gray-500">No info found. Please import your credit profile.</p>
                            </div>
                        )
                    }
                </div>
            </DialogContent>
            {
                show && selectedInfos.length > 0 && 
                <CreatePersonalInfoDisputeDialog
                    isOpen={show}
                    handleClose={() => setShow(!show)}
                    selectedInfos={selectedInfos}
                    onComplete={() => {
                        setSelectedInfos([])
                    }}
                />
            }
        </Dialog>
    );
}


const PersonalInfoTableCell = ({ bureau, type, value, checked, onCheckedChange }: any) => {
    return (
        <TableCell className="text-center_">
            <div className="flex items-start space-x-2">
                <Checkbox
                    id={`${bureau}-${type}`}
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                />
                <label htmlFor={`${bureau}-${type}`} className="flex flex-col cursor-pointer">
                    <span>{value}</span>
                    {checked && (
                        <span className="text-green-500 text-sm ">Dispute</span>
                    )}
                </label>
            </div>
        </TableCell>
    );
};