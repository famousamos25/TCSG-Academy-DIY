"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from "@/components/ui/table";
import { DisputeAccount } from '@/types/account';
import { SquarePen } from 'lucide-react';
import { useState } from "react";
import { ChangeCreditorModal } from './change-creditor-modal';
import { ChangeReasonModal } from './change-reason-modal';
import { ChangeInstructionModal } from './change-instruction-modal';

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

    creditorValue?: string;
    onEditCreditor: (c: string) => void;

    columnReason: { reason: string; description: string}
    onEditReason: (data: { reason: string; description: string; }) => void;
    
    columnInstruction: { instruction: string; description: string}
    onEditInstruction: (data: { instruction: string; description: string}) => void;
}

export default function AccountTableRow({
    account, onSelectRow, rowSelected, onSelectFurnisher, handleBureauCheckedChange, isChecked,
    creditorChecked, accounts, onCheckCreditor, onEditCreditor, creditorValue, onEditReason, columnReason,
    columnInstruction, onEditInstruction,
}: Props) {

    const [isChangeCreditorModalOpen, setIsChangeCreditorModalOpen] = useState(false);
    const [isChangeReasonModalOpen, setIsChangeReasonModalOpen] = useState(false);
    const [isChangeInstructionModalOpen, setIsChangeInstructionModalOpen] = useState(false);

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
                            onClick={() => setIsChangeCreditorModalOpen(true)}
                        />
                    </div>

                    {!account.creditorName && (
                        <p className="text-sm text-red-500 mt-1">Not found</p>
                    )}
                </TableCell>
                <TableCell>
                    <div className="flex flex-nowrap">
                        {columnReason.reason}
                        <SquarePen
                            className="w-4 h-4 text-green-500 shrink-0 cursor-pointer ml-2"
                            onClick={() => setIsChangeReasonModalOpen(true)}
                        />
                    </div>
                </TableCell>

                <TableCell>
                    <div className="flex flex-nowrap whitespace-nowrap items-center max-w-[350px] overflow-hidden text-ellipsis">
                        <span className="truncate">{columnInstruction.instruction}</span>
                        <SquarePen
                            className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                            onClick={() => setIsChangeInstructionModalOpen(true)}
                        />
                    </div>
                </TableCell>
            </TableRow>
            {isChangeCreditorModalOpen && (
                <ChangeCreditorModal
                    isOpen={isChangeCreditorModalOpen}
                    handleClose={() => setIsChangeCreditorModalOpen(false)}
                    onSave={(value) => {
                        onEditCreditor(value);
                    }}
                    defaultValue={creditorValue}
                    account={account}
                />
            )}

            {isChangeReasonModalOpen && (
                <ChangeReasonModal
                    isOpen={isChangeReasonModalOpen}
                    handleClose={() => setIsChangeReasonModalOpen(false)}
                    onSave={(data) => {
                        onEditReason(data)
                    }}
                    defaultValue={columnReason}
                />
            )}
            {isChangeInstructionModalOpen && (
                <ChangeInstructionModal
                    isOpen={isChangeInstructionModalOpen}
                    handleClose={() => setIsChangeInstructionModalOpen(false)}
                    onSave={(data) => {
                        onEditInstruction(data)
                    }}
                    defaultValue={columnInstruction}
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