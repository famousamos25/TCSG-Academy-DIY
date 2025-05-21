"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen } from 'lucide-react';
import { useState } from "react";
import { ChangeCreditorModal } from './change-creditor-modal';
import { ChangeReasonModal } from './change-reason-modal';
import { ChangeInstructionModal } from './change-instruction-modal';
import { CreditInquiry } from '@/types/inquiry';

interface Props {
    account: CreditInquiry;

    rowSelected: boolean;
    onSelectRow: () => void;

    creditorChecked: boolean;
    onCheckCreditor: () => void;

    creditorValue?: string;
    onEditCreditor: (c: string) => void;

    columnReason: { reason: string; description: string}
    onEditReason: (data: { reason: string; description: string; }) => void;
    
    columnInstruction: { instruction: string; description: string}
    onEditInstruction: (data: { instruction: string; description: string}) => void;
}

export default function InquiryTableRow({
    account, onSelectRow, rowSelected, creditorChecked, onCheckCreditor, onEditCreditor, creditorValue, onEditReason, columnReason,
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
                    >
                        {account.subscriberName}
                    </div>
                   
                </TableCell>
                <TableCell>
                    <div className="flex flex-nowrap whitespace-nowrap items-center">
                    <Checkbox
                        checked={rowSelected}
                        onCheckedChange={onSelectRow}
                    />
                        <div className={`text-sm ml-1 ${account.bureau === 'Equifax' ? 'text-red-500' : 'text-gray-500'}`}>
                            {account.bureau === 'TransUnion'
                                ? 'TU'
                                : account.bureau === 'Equifax'
                                    ? 'EQFX'
                                    : account.bureau === 'Experian'
                                        ? 'EXP'
                                        : account.bureau}
                        </div>
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

                    {!account.bureau && (
                        <p className="text-sm text-red-500 mt-1">Not found</p>
                    )}
                </TableCell>
                <TableCell>
                    { account.inquiryDate }
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