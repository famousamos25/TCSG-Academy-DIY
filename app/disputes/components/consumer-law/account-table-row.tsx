"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from "@/components/ui/table";
import { DisputeAccount } from '@/types/account';
import { SquarePen } from 'lucide-react';
import { useState } from "react";
import { ChangeCreditorModal } from './change-creditor-modal';


interface Props {
    account: DisputeAccount;
    accounts: DisputeAccount[];

    rowSelected: boolean;
    onSelectRow: () => void;

    onSelectFurnisher: (account: DisputeAccount) => void;

    isChecked: (bureau: string) => boolean;
    handleBureauCheckedChange: (bureau: string) => void;
    creditorChecked: boolean;
    onCheckCreditor: () => void;

    onEditCreditor: (c: string) => void;
    creditorValue?: string;
}

export default function AccountTableRow({
    account, onSelectRow, rowSelected, onSelectFurnisher, handleBureauCheckedChange, isChecked,
    creditorChecked, accounts, onCheckCreditor, onEditCreditor, creditorValue
}: Props) {

    const [isChangeCreditorModalOpen, setIsChangeCreditorModalOpen] = useState(false);    

    return (
        <>

            <TableRow className="hover:bg-gray-50">
                <TableCell>
                    <Checkbox
                        checked={rowSelected}
                        onCheckedChange={onSelectRow}
                    />
                </TableCell>
                <TableCell>
                    <div className="font-medium cursor-pointer"
                        onClick={() => onSelectFurnisher(account)}
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
                            onCheckedChange={() => handleBureauCheckedChange("TransUnion")}
                            isChecked={isChecked("TransUnion")}
                            accounts={accounts} bureau="TransUnion" label="TU" />
                        <BeaureauTableCell
                            onCheckedChange={() => handleBureauCheckedChange("Experian")}
                            isChecked={isChecked("Experian")}
                            accounts={accounts} bureau="Experian" label="EXP" />
                        <BeaureauTableCell
                            onCheckedChange={() => handleBureauCheckedChange("Equifax")}
                            isChecked={isChecked("Equifax")}
                            accounts={accounts} bureau="Equifax" label="EQFX" />
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex flex-nowrap whitespace-nowrap items-center">
                        <Checkbox
                            checked={creditorChecked}
                            onCheckedChange={onCheckCreditor}
                        />
                        <p className="ml-2">CDTR</p>
                        <SquarePen
                            className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                            onClick={ () => setIsChangeCreditorModalOpen(true)}
                        />
                    </div>

                    {!account.creditorName && (
                        <p className="text-sm text-red-500 mt-1">Not found</p>
                    )}
                </TableCell>
                <TableCell>
                    <div className="flex flex-nowrap">
                        {/* {customSelections[account.accountId]?.reason || account.reason} */}
                        <SquarePen
                            className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                            onClick={() => setIsChangeCreditorModalOpen(true)}
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
            {isChangeCreditorModalOpen && (
                <ChangeCreditorModal
                    isOpen={isChangeCreditorModalOpen}
                    handleClose={() => setIsChangeCreditorModalOpen(false)}
                    onSave={(value) => {
                        onEditCreditor(value)
                    }}
                    creditorValue={creditorValue}
                    account={account}
                />
            )}

        </>
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