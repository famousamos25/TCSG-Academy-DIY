import { AccountDetailsDialog } from "@/app/creditreport/components/account-details-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { Modal } from "./reason-modal";

export interface Account {
    bureau: "TransUnion" | "Experian" | "Equifax";
    creditorName: string;
    accountNumber: string;
    subscriberCode: string;
    balance: string;
    highBalance: string;
    accountStatus: string;
    dateAccountStatus: string;
    accountDescription: string;
    accountType: string;
    creditType: string;
    disputeFlag: string;
    verificationIndicator: string;
    dateReported: string;
    dateLastPayment: string;
    creditLimit: string;
    amountPastDue: string;
    monthlyPayment: string;
    paymentFrequency?: string;
    paymentHistory?: PaymentHistory;
    paymentStatus: string;
}
export interface PaymentHistory {
    status: string;
    startDate: string;
    monthlyPayStatus: {
        date: string;
        status: string;
    }[];
}

interface DisputeTableProps {
    ACCOUNTS: Account[];
    filteredAccounts: Account[];
    selectedAccounts: string[];
    handleSelectAll: () => void;
    handleSelectAccount: (accountNumber: string) => void;
    renderBureauCheckboxes: (account: Account, onBureauToggle: () => void) => JSX.Element;
    customSelections: {
        [accountId: string]: {
            reason?: string;
            instruction?: string;
        };
    };
}

const DisputeTable: React.FC<DisputeTableProps> = ({ ACCOUNTS, filteredAccounts, selectedAccounts, handleSelectAll, handleSelectAccount, renderBureauCheckboxes, customSelections }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [furnisherDetailsOpen, setFurnisherDetailsOpen] = useState(false);
    const [selectedFurnisher, setSelectedFurnisher] = useState<Account | null>(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [editingField, setEditingField] = useState<"reason" | "instruction" | "creditor" | null>(null);
    const [editedText, setEditedText] = useState("");

    const openEditModal = (account: Account, field: "reason" | "instruction" | "creditor") => {
        setEditingAccount(account);
        setEditingField(field);
        console.log("account", account);
        let value = "";
        if (field === "reason") {
            // value = customSelections[account.accountId]?.reason || account.reason;
        } else if (field === "instruction") {
            // value = customSelections[account.accountId]?.instruction || account.instruction;
        } else if (field === "creditor") {
            value = account.creditorName
        }
        setEditedText(value);

        setModalOpen(true);
    };

    const handleSave = () => {
        setModalOpen(false);
    };
    return (
        <div className="border rounded-md overflow-hidden shadow-sm mt-4 ">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox
                            checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                            onCheckedChange={handleSelectAll}
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
                    {filteredAccounts.map((account: any, idx: number) => {
                        const bureauDetails = account[0];
                        return (
                            <TableRow key={idx} className="hover:bg-gray-50">
                                <TableCell>
                                    <Checkbox
                                    checked={selectedAccounts.includes(account.accountNumber)}
                                    onCheckedChange={() => handleSelectAccount(account.accountNumber)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium cursor-pointer"
                                        onClick={() => {
                                            setSelectedFurnisher(account);
                                            setIsDetailDialogOpen(true);
                                        }}
                                    >
                                        {bureauDetails.creditorName}
                                    </div>
                                    <div className="text-sm text-gray-500">{bureauDetails.accountNumber}</div>
                                    {/* <div className={`text-xs ${account.status === 'Positive' ? 'text-green-600' : 'text-red-600'}`}>
                                    {account.status}
                                </div> */}
                                </TableCell>
                                <TableCell>
                                    {bureauDetails.accountType && bureauDetails.accountType.length > 13
                                        ? bureauDetails.accountType.substring(0, 11) + '...'
                                        : bureauDetails.accountType}
                                </TableCell>
                                <TableCell>
                                    {renderBureauCheckboxes(account, () => handleSelectAccount(account.accountId))}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-nowrap whitespace-nowrap items-center">
                                        <Checkbox />
                                        <p className="ml-2">CDTR</p>
                                        <SquarePen
                                            className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                            onClick={
                                                () => openEditModal(bureauDetails, "creditor")
                                            }
                                        />
                                    </div>

                                    {!bureauDetails.creditorName && (
                                        <p className="text-sm text-red-500 mt-1">Not found</p>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-nowrap">
                                        {customSelections[account.accountId]?.reason || account.reason}
                                        <SquarePen
                                            className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                            onClick={() => openEditModal(account, "reason")}
                                        />
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-nowrap whitespace-nowrap items-center max-w-[350px] overflow-hidden text-ellipsis">
                                        <span className="truncate">{account.instruction}</span>
                                        <SquarePen
                                            className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                            onClick={() => openEditModal(account, "instruction")}
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
            {modalOpen && (
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
            )}
        </div>
    );
};

export default DisputeTable;
