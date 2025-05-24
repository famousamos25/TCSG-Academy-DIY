"use client";

import { AccountDetailsDialog } from '@/app/creditreport/components/account-details-dialog';
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { disputeInstructions, disputeOptions } from '@/constants/edit-dipute-letter-data';
import { useCreditReport } from '@/hooks/use-credit-report';
import { DisputeAccount } from '@/types/account';
import { useCallback, useMemo, useState } from "react";
import { SelectDisputeInstruction, SelectDisputeReason } from "../dispute-reason-instructions";
import { Account } from "../DisputeTable";
import SearchBar from "../search-bar";
import AccountTableRow from './account-table-row';
import { CreateAccountDisputeDialog } from './create-account-dispute-modal';
export interface SelectedInfo {
    index: number;
    bureau: string;
}

export interface SelectedCreditor {
    index: number;
    creditor: string;
}

export interface ColumnReason {
    index: number;
    reason: string;
    description: string;
}
export interface ColumnInstruction {
    index: number;
    instruction: string;
    description: string;
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

    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
    const [selectedInfo, setSelectedInfo] = useState<SelectedInfo[]>([]);
    const [selectedCreditors, setSelectedCreditors] = useState<SelectedCreditor[]>([]);
    const [columnReasons, setColumnReasons] = useState<ColumnReason[]>([]);
    const [columnInstructions, setColumnInstructions] = useState<ColumnInstruction[]>([]);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const [allSelected, setAllSelected] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedReason, setSelectedReason] = useState('');
    const [selectedInstruction, setSelectedInstruction] = useState('');


    const isChecked = (index: number, bureau: string) => {
        return selectedInfo.some((info) => info.index === index && info.bureau === bureau);
    };

    const toggleSelectAll = () => {
        setAllSelected(prev => !prev);
    };

    const handleBureauCheckedChange = (index: number, bureau: string) => {
        const isAlreadyChecked = selectedInfo.some((info) => info.index === index && info.bureau === bureau);
        if (isAlreadyChecked) {
            setSelectedInfo((prev) => prev.filter((info) => info.index !== index || info.bureau !== bureau));
        }
        else {
            setSelectedInfo((prev) => [...prev, { index, bureau }]);
        }
    };

    const { creditReport } = useCreditReport();
    console.log(creditReport);


    
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
                                <AccountTableRow
                                    key={idx}
                                    account={account}
                                    accounts={accounts}
                                    rowSelected={selectedInfo.filter(info => info.index === idx).length === accounts.length}
                                    onSelectRow={() => {
                                        if (selectedInfo.filter(info => info.index === idx).length === accounts.length) {
                                            setSelectedInfo(prev => prev.filter(info => info.index !== idx));
                                        }
                                        else {
                                            setSelectedInfo(prev => [
                                                ...prev,
                                                ...accounts.map((acc: any) => ({ index: idx, bureau: acc.bureau }))
                                            ]);
                                        }
                                    }}
                                    onSelectFurnisher={(acc: DisputeAccount) => {
                                        console.log(acc);

                                    }}

                                    isChecked={(b: string) => isChecked(idx, b)}
                                    handleBureauCheckedChange={(b: string) => handleBureauCheckedChange(idx, b)}
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
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={onCloseDialog}>Close</Button>
                <Button
                    className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    onClick={() => setShowAddressModal(true)}
                    disabled={selectedInfo.length === 0 && selectedCreditors.length === 0}
                >
                    Create Letters
                </Button>
            </div>

            {showAddressModal && (
                <CreateAccountDisputeDialog
                    isOpen={showAddressModal}
                    handleClose={() => {
                        setShowAddressModal(false);
                    }}
                    onComplete={() => {
                        setSelectedInfo([])
                        setSelectedCreditors([]);
                        setColumnReasons([]);
                        setColumnInstructions([]);
                    }}
                    columnInstructions={columnInstructions}
                    columnReasons={columnReasons}
                    selectedInfos={selectedInfo}
                    selectedCreditors={selectedCreditors}
                    accounts={filteredAccounts}
                />
            )}
        </div>
    );
}