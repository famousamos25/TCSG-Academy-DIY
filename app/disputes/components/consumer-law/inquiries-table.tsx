"use client";

import { AccountDetailsDialog } from '@/app/creditreport/components/account-details-dialog';
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { disputeInstructions, disputeOptions } from '@/constants/edit-dipute-letter-data';
import { useCreditReport } from '@/hooks/use-credit-report';
import { DisputeAccount } from '@/types/account';
import { useCallback, useMemo, useState } from "react";
import { SelectDisputeInstruction, SelectDisputeReason } from "../dispute-reason-instructions";
import { Account } from "../DisputeTable";
import SearchBar from "../search-bar";
import AccountTableRow from './account-table-row';
import InquiryTableRow from './inquiry-table-row';
import ReasonsForAllModal from '../reason-for-all-modal';
import InstructionsForAllModal from '../instruction-for-all-modal';

type BureauSelection = Record<string, boolean>;
interface AccountBureauSelections {
    [accountId: string]: BureauSelection;
}


interface SelectedInfo {
    index: number;
    bureau: string;
    subscriberName?: string;
}

interface SelectedCreditor {
    index: number;
    creditor: string;
}

interface ColumnReason {
    index: number;
    reason: string;
    description: string;
}
interface ColumnInstruction {
    index: number;
    instruction: string;
    description: string;
}

interface Props {
    onCloseDialog: () => void;
}

export default function InquiriesTable({ onCloseDialog }: Props) {
    const [selectedBureau, setSelectedBureau] = useState('');
    const [selectedFurnisher, setSelectedFurnisher] = useState<Account | null>(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);

    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
    const [selectedInfo, setSelectedInfo] = useState<SelectedInfo[]>([]);
    const [selectedCreditors, setSelectedCreditors] = useState<SelectedCreditor[]>([]);
    const [columnReasons, setColumnReasons] = useState<ColumnReason[]>([]);
    const [columnInstructions, setColumnInstructions] = useState<ColumnInstruction[]>([]);
    const [isReasonForAllModalOpen, setIsReasonForAllModalOpen] = useState(false);
    const [isInstructionForAllModalOpen, setIsInstructionForAllModalOpen] = useState(false);

    const [allSelected, setAllSelected] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const toggleSelectAll = () => {
        if(selectedInfo.length === filteredAccounts.length) {
            setSelectedInfo([])
            setAllSelected(false);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const selectedInfoAccs = filteredAccounts.map(({ industryCode, inquiryDate,inquiryType,subscriberCode,subscriberNumber, ...rest }) => rest);
        setSelectedInfo(selectedInfoAccs.map((acc,idx)=>({
            index:idx,
            ...acc
        })))
        setAllSelected(true);
    };

    const { creditReport } = useCreditReport();

    const inquiryAccs = creditReport?.inquiries.map((i: { subscriberNumber: number; }) =>({
       ...i,
       subscriberCode: i.subscriberNumber
    }));

    const bureauCounts: Record<string, number> = {
        TransUnion: 0,
        Equifax: 0,
        Experian: 0
    };

    inquiryAccs?.forEach((account: any) => {
        const bureau = account.bureau;
        if (bureau && bureauCounts.hasOwnProperty(bureau)) {
            bureauCounts[bureau]++;
        }
    });

    const filteredAccounts = useMemo(() => {
    if (!inquiryAccs) return [];

    let accounts = [...inquiryAccs];

    if (selectedBureau && selectedBureau !== 'ALL_BUREAUS') {
        accounts = accounts.filter((account: any) => account.bureau === selectedBureau);
    }

    if (searchTerm) {
        accounts = accounts.filter((account: any) => {
            const bureau = account.bureau?.toLowerCase() || '';
            const subscriberName = account.subscriberName?.toLowerCase() || '';
            return (
                bureau.includes(searchTerm.toLowerCase()) ||
                subscriberName.includes(searchTerm.toLowerCase())
            );
        });
    }

    return accounts;
}, [searchTerm, selectedBureau, inquiryAccs]);


    const handleEditReason = useCallback(({ reason, description }: { reason: string; description: string; }, idx: number) => {
        const existing = columnReasons.find((c) => c.index === idx);
        if (existing) {
            setColumnReasons(prev => prev.map(c => {
                if (existing.index === c.index) {
                    return { index: c.index, reason, description };
                }
                return c;
            }));
        } else {
            setColumnReasons((prev) => [...prev, { index: idx, reason, description }]);
        }
    }, [columnReasons],);

    const handleEditInstruction = useCallback(({ instruction, description }: { instruction: string; description: string; }, idx: number) => {
        const existing = columnInstructions.find((c) => c.index === idx);
        if (existing) {
            setColumnInstructions(prev => prev.map(c => {
                if (existing.index === c.index) {
                    return { index: c.index, instruction, description };
                }
                return c;
            }));
        } else {
            setColumnInstructions((prev) => [...prev, { index: idx, instruction, description }]);
        }
    }, [columnInstructions],);

    const handleReasonForAll = (reason: string) => {
       const newColumnReasons = Array.from({length: filteredAccounts.length},(r: ColumnReason, idx: number)=>({
            index: idx,
           description: reason,
           reason: reason
       }))
       setColumnReasons(newColumnReasons)
    }
    
    const handleInstructionsForAll = (instruction: string) => {
      const newInstructionReasons = Array.from({length: filteredAccounts.length},(r: ColumnInstruction, idx: number)=>({
           index: idx,
           description: instruction,
           instruction: instruction
       }))
       setColumnInstructions(newInstructionReasons)
    }

    return (
        <div className="w-full ">
            <div className="flex justify-between items-center mt-8">
                <div className="flex space-x-4">
                    <Button
                        variant="outline"
                        className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                        onClick={toggleSelectAll}
                    >
                        {allSelected ? "Deselect All" : "Dispute All"}
                    </Button>
                    <Select value={selectedBureau} onValueChange={setSelectedBureau}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select bureau" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ALL_BUREAUS">
                                    {`All(${Object.values(bureauCounts).reduce((sum, count) => sum + count, 0)})`}
                                </SelectItem>
                                {['TransUnion', 'Equifax', 'Experian'].map((bureau, idx) => {
                                    const count = bureauCounts[bureau] || 0;
                                    const short =
                                        bureau === 'TransUnion' ? 'TU' :
                                            bureau === 'Equifax' ? 'EQFX' :
                                                bureau === 'Experian' ? 'EXP' :
                                                    bureau;

                                    return (
                                        <SelectItem key={idx} value={bureau}>
                                            {`${short} (${count})`}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                   {
                    allSelected && 
                        <div className="flex space-x-4">
                            <Button
                                variant="outline"
                                className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                                onClick={() => setIsReasonForAllModalOpen(true)}
                            >
                                Reasons for All
                            </Button>
                           <Button
                                variant="outline"
                                className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                                onClick={() => setIsInstructionForAllModalOpen(true)}
                            >
                                Instructions for All
                            </Button>
                        </div>
                   }                
                
                </div>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            <div className="border rounded-md overflow-hidden shadow-sm mt-4 ">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={(filteredAccounts.length === selectedInfo.length) && filteredAccounts.length > 0}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>CREDITOR</TableHead>
                            <TableHead>CREDITOR BUREAU</TableHead>
                            <TableHead></TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>REASON</TableHead>
                            <TableHead>INSTRUCTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAccounts.map((account: any, idx: number) => {
                            return (
                                <InquiryTableRow
                                    key={idx}
                                    account={account}
                                    rowSelected={selectedInfo.some(info => info.index === idx)}
                                    onSelectRow={() => {
                                        if (selectedInfo) {
                                            const checkedBureau: SelectedInfo = {
                                                index: idx,
                                                bureau: account.bureau,
                                                subscriberName: account.subscriberName
                                            }
                                            if(filteredAccounts.length === selectedInfo.length){setAllSelected(true)}
                                            if(filteredAccounts.length !== selectedInfo.length){setAllSelected(false)}
                                            if(selectedInfo.some(info => info.index === idx)) {
                                            setSelectedInfo(prev => prev.filter(info => info.index !== idx));
                                            return;
                                            };
                                            setSelectedInfo([...selectedInfo, checkedBureau])                                            
                                        }
                                    }}
                                    creditorValue={selectedCreditors.find((c) => c.index === idx)?.creditor}

                                    creditorChecked={!!selectedCreditors.find((c) => c.index === idx)}
                                    onCheckCreditor={() => {
                                        const isChecked = !!selectedCreditors.find((c) => c.index === idx);

                                        if (isChecked) {
                                            setSelectedCreditors((prev) => prev.filter((c) => c.index !== idx));
                                        }
                                        else {
                                            setSelectedCreditors((prev) => [...prev, { index: idx, creditor: account.subscriberCode }]);
                                        }
                                    }}
                                    onEditCreditor={(creditor: string) => {
                                        const existing = selectedCreditors.find((c) => c.index === idx);
                                        if (existing) {
                                            setSelectedCreditors(prev => prev.map(c => {
                                                if (existing.index === c.index) {
                                                    return { index: c.index, creditor };
                                                }
                                                return c;
                                            }));
                                        } else {
                                            setSelectedCreditors((prev) => [...prev, { index: idx, creditor }]);
                                        }
                                    }}
                                    onEditReason={(data) => handleEditReason(data, idx)}
                                    columnReason={columnReasons.find((c) => c.index === idx) ?? { reason: disputeOptions[0]?.items[0], description: disputeOptions[0]?.items[0] }}
                                    columnInstruction={columnInstructions.find((c) => c.index === idx) ?? { instruction: disputeInstructions[0]?.items[0], description: disputeInstructions[0]?.items[0] }}
                                    onEditInstruction={(data) => handleEditInstruction(data, idx)}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
                {isDetailDialogOpen && selectedFurnisher && (
                    <AccountDetailsDialog
                        isOpen={isDetailDialogOpen}
                        onOpenChange={() => setIsDetailDialogOpen(false)}
                        account={selectedFurnisher}
                        creditors={[]}
                    />
                )}
                {isReasonForAllModalOpen && (
                    <ReasonsForAllModal
                        open={isReasonForAllModalOpen}
                        onOpenChange={setIsReasonForAllModalOpen}
                        handleReasonForAll= {(reason: string) =>  handleReasonForAll(reason)}
                    />
                )}
                {isInstructionForAllModalOpen && (
                    <InstructionsForAllModal
                        open={isInstructionForAllModalOpen}
                        onOpenChange={setIsInstructionForAllModalOpen}
                        handleInstructionsForAll= {(instruction: string) =>  handleInstructionsForAll(instruction)}
                    />
                )}
                {/*{modalOpen && (
                    <Modal onClose={() => setModalOpen(false)} onSave={handleSave}>
                        <div className="space-y-4">
                            <label className="block">
                                <Input
                                    type="text"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            </label>

                            {editingField !== "creditor" && (
                                <label className="block">
                                    <Textarea
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </label>
                            )}
                        </div>
                    </Modal>
                )} */}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={onCloseDialog}>Close</Button>
                <Button
                    className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    disabled={false}
                >
                    Create Letters
                </Button>
            </div>
        </div>
    );
}
