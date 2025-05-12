"use client";

import { AccountDetailsDialog } from '@/app/creditreport/components/account-details-dialog';
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCreditReport } from '@/hooks/use-credit-report';
import { SquarePen } from 'lucide-react';
import { useMemo, useState } from "react";
import { SelectDisputeInstruction, SelectDisputeReason } from "./dispute-reason-instructions";
import { Account } from "./DisputeTable";
import SearchBar from "./search-bar";

type BureauSelection = Record<string, boolean>;
interface AccountBureauSelections {
    [accountId: string]: BureauSelection;
}


interface SelectedInfo {
    index: number;
    bureau: string;
}

interface Props {
    onCloseDialog: () => void;
}

export default function ConsumerLawDerogatories({ onCloseDialog }: Props) {
    const [selectedDisputeType, setSelectedDisputeType] = useState<string | null>("Derogatory");
    const [selectedInquiries, setSelectedInquiries] = useState<Record<string, boolean>>({});
    const [selectedFilter, setSelectedFilter] = useState<string>("All");
    const [disputeRound, setDisputeRound] = useState('Dispute Round #1');
    const [selectedFurnisher, setSelectedFurnisher] = useState<Account | null>(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
    const [selectedInfo, setSelectedInfo] = useState<SelectedInfo[]>([]);
    const [selectedCreditors, setSelectedCreditors] = useState<number[]>([]);
    const [allSelected, setAllSelected] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedReason, setSelectedReason] = useState('');
    const [selectedInstruction, setSelectedInstruction] = useState('');

    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
    const [bureauSelections, setBureauSelections] = useState<AccountBureauSelections>({});
    const [customSelections, setCustomSelections] = useState<{
        [accountId: string]: {
            reason?: string;
            instruction?: string;
            cdtr?: boolean;
        };
    }>({});

    const isChecked = (index: number, bureau: string) => {
        return selectedInfo.some((info) => info.index === index && info.bureau === bureau);
    };

    const toggleSelectAll = () => {
        setAllSelected(prev => !prev);
    };

    const handleBureauCheckedChange = (index: number, bureau: string) => {
        setSelectedInfo((prev) => {
            const existingIndex = prev.findIndex((info) => info.index === index && info.bureau === bureau);
            if (existingIndex !== -1) {
                return prev.filter((info) => info.index !== index && info.bureau !== bureau);
            }
            return [...prev, { index, bureau }];
        });
    };

    const handleSelectAccount = (accountNumber: string) => {
    };

    console.log(selectedInfo);
    

    const { creditReport, loading } = useCreditReport();
    const derogatoryAccs = creditReport?.accounts.filter((account: any) => {
        if (account?.some((acc: any) => acc?.paymentStatus === 'Collection/Chargeoff')) return true;
        if (account?.some((acc: any) => acc?.accountType?.toLowerCase()?.includes("collection"))) return true;
        if (account?.some((acc: any) => acc?.accountType?.toLowerCase()?.includes("chargeoff"))) return true;
        return false;
    });

    const filteredAccounts = useMemo(() => {
        if (!derogatoryAccs) return [];
        if (searchTerm) {
            return derogatoryAccs.filter((account: any) => {
                const bureauDetails = account[0];
                const creditorName = bureauDetails.creditorName.toLowerCase();
                const accountNumber = bureauDetails.accountNumber.toLowerCase();
                return creditorName.includes(searchTerm.toLowerCase()) || accountNumber.includes(searchTerm.toLowerCase());
            });
        }
        return derogatoryAccs;
    }, [searchTerm, derogatoryAccs]);



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
                    <Select value={disputeRound} onValueChange={setDisputeRound}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select round" />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(6)].map((_, i) => (
                                <SelectItem key={i} value={`Dispute Round #${i + 1}`}>
                                    Dispute Round #{i + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedAccounts.length > 0 && (
                        <div className="flex space-x-4">
                            <SelectDisputeReason selectedReason={selectedReason} setSelectedReason={setSelectedReason} />
                            <SelectDisputeInstruction selectedInstruction={selectedInstruction} setSelectedInstruction={setSelectedInstruction} />
                        </div>
                    )}
                </div>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            <div className="border rounded-md overflow-hidden shadow-sm mt-4 ">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>FURNISHER</TableHead>
                            <TableHead>ACCOUNT TYPE</TableHead>
                            <TableHead>BUREAUS</TableHead>
                            <TableHead></TableHead>
                            <TableHead>REASON</TableHead>
                            <TableHead>INSTRUCTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAccounts.map((accounts: any, idx: number) => {
                            const account = accounts[0];
                            return (
                                <TableRow key={idx} className="hover:bg-gray-50">
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedInfo.filter(info => info.index === idx).length  === accounts.length}
                                            onCheckedChange={() => {
                                                if(selectedInfo.filter(info => info.index === idx).length  === accounts.length) {
                                                    setSelectedInfo(prev => prev.filter(info => info.index !== idx));
                                                }
                                                else {
                                                    setSelectedInfo(prev => [
                                                        ...prev,
                                                        ...accounts.map((acc: any) => ({ index: idx, bureau: acc.bureau }))
                                                    ]);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium cursor-pointer"
                                            onClick={() => {
                                                setSelectedFurnisher(account);
                                                setIsDetailDialogOpen(true);
                                            }}
                                        >
                                            {account.creditorName}
                                        </div>
                                        <div className="text-sm text-gray-500">{account.accountNumber}</div>
                                    </TableCell>
                                    <TableCell>
                                        {account.accountType && account.accountType.length > 13
                                            ? account.accountType.substring(0, 11) + '...'
                                            : account.accountType}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-start">
                                            <BeaureauTableCell
                                                onCheckedChange={() => handleBureauCheckedChange(idx, "TransUnion")}
                                                isChecked={isChecked(idx, "TransUnion")}
                                                accounts={accounts} bureau="TransUnion" label="TU" />
                                            <BeaureauTableCell
                                                onCheckedChange={() => handleBureauCheckedChange(idx, "Experian")}
                                                isChecked={isChecked(idx, "Experian")}
                                                accounts={accounts} bureau="Experian" label="EXP" />
                                            <BeaureauTableCell
                                                onCheckedChange={() => handleBureauCheckedChange(idx, "Equifax")}
                                                isChecked={isChecked(idx, "Equifax")}
                                                accounts={accounts} bureau="Equifax" label="EQFX" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-nowrap whitespace-nowrap items-center">
                                            <Checkbox
                                                checked={selectedCreditors.includes(idx)}
                                                onCheckedChange={() => {
                                                    setSelectedCreditors((prev) => {
                                                        if (prev.includes(idx)) {
                                                            return prev.filter((id) => id !== idx);
                                                        }
                                                        return [...prev, idx];
                                                    });
                                                }}
                                            />
                                            <p className="ml-2">CDTR</p>
                                            <SquarePen
                                                className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                                onClick={
                                                    () => {
                                                        // openEditModal(bureauDetails, "creditor");
                                                    }
                                                }
                                            />
                                        </div>

                                        {!account.creditorName && (
                                            <p className="text-sm text-red-500 mt-1">Not found</p>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-nowrap">
                                            {customSelections[account.accountId]?.reason || account.reason}
                                            <SquarePen
                                                className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                                onClick={() => {
                                                    // openEditModal(account, "reason");
                                                }}
                                            />
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-nowrap whitespace-nowrap items-center max-w-[350px] overflow-hidden text-ellipsis">
                                            <span className="truncate">{account.instruction}</span>
                                            <SquarePen
                                                className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                                onClick={() => {
                                                    // openEditModal(account, "instruction");
                                                }}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
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

interface BeaureauTableCellProps {
    isChecked: boolean;
    accounts: any;
    bureau: string;
    label: string;
    onCheckedChange: () => void;
}
const BeaureauTableCell = ({ accounts, bureau, label, isChecked, onCheckedChange }: BeaureauTableCellProps) => {

    const bureauDetails = accounts?.find((account: any) => account?.bureau?.toLowerCase() === bureau.toLowerCase());

    return (
        <div className="flex flex-col items-center min-w-[60px]">
            <div className={`text-xs font-semibold ${label === 'EQFX' ? 'text-red-400' : 'text-cyan-400'}`}>
                {label}
            </div>
            {bureauDetails ? (
                <Checkbox
                    className="mt-1"
                    checked={isChecked}
                    onCheckedChange={onCheckedChange}
                />
            ) : (
                <div className="text-[10px] text-gray-400 mt-1 whitespace-nowrap">
                    Not Reported
                </div>
            )}
        </div>
    );
};