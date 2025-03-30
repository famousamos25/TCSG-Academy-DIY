import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { Modal } from "./reason-modal";

export interface Account {
    furnisher: string;
    accountId: string;
    accountType: string;
    bureaus: {
        tu: string;
        exp: string;
        eqfx: string;
    };
    reason: string;
    instruction: string;
    status: string;
}

interface DisputeTableProps {
    ACCOUNTS: Account[];
    filteredAccounts: Account[];
    selectedAccounts: string[];
    handleSelectAll: () => void;
    handleSelectAccount: (accountId: string) => void;
    renderBureauCheckboxes: (account: Account) => JSX.Element;
    customSelections: {
        [accountId: string]: {
            reason?: string;
            instruction?: string;
        };
    };
}

const DisputeTable: React.FC<DisputeTableProps> = ({ ACCOUNTS, filteredAccounts, selectedAccounts, handleSelectAll, handleSelectAccount, renderBureauCheckboxes, customSelections }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [editingField, setEditingField] = useState<"reason" | "instruction" | null>(null);
    const [editedText, setEditedText] = useState("");

    const openEditModal = (account: Account, field: "reason" | "instruction") => {
        setEditingAccount(account);
        setEditingField(field);
        setEditedText(field === "reason" 
            ? customSelections[account.accountId]?.reason || account.reason
            : customSelections[account.accountId]?.instruction || account.instruction
        );
        setModalOpen(true);
    };
    
    const handleSave = () => {
        setModalOpen(false);
    };
    return (
        <div className="border rounded-md overflow-hidden shadow-sm mt-4">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox
                                checked={selectedAccounts.length === ACCOUNTS.length && ACCOUNTS.length > 0}
                                onCheckedChange={handleSelectAll}
                            />
                        </TableHead>
                        <TableHead>FURNISHER</TableHead>
                        <TableHead>ACCOUNT TYPE</TableHead>
                        <TableHead>BUREAUS</TableHead>
                        <TableHead>REASON</TableHead>
                        <TableHead>INSTRUCTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAccounts.map((account) => (
                        <TableRow key={account.accountId} className="hover:bg-gray-50">
                            <TableCell>
                                <Checkbox
                                    checked={selectedAccounts.includes(account.accountId)}
                                    onCheckedChange={() => handleSelectAccount(account.accountId)}
                                />
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{account.furnisher}</div>
                                <div className="text-sm text-gray-500">{account.accountId}</div>
                                <div className={`text-xs ${account.status === 'Positive' ? 'text-green-600' : 'text-red-600'}`}>
                                    {account.status}
                                </div>
                            </TableCell>
                            <TableCell>{account.accountType}</TableCell>
                            <TableCell>{renderBureauCheckboxes(account)}</TableCell>
                            <TableCell>
                                <div className="flex">
                                    {customSelections[account.accountId]?.reason || account.reason}
                                    <SquarePen
                                        className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                        onClick={() => openEditModal(account, "reason")}
                                    />
                                </div>
                            </TableCell>

                            <TableCell>
                                <div className="flex">
                                    {account.instruction}
                                    <SquarePen
                                        className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                        onClick={() => openEditModal(account, "instruction")}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
                        <label className="block">
                            <Textarea
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </label>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DisputeTable;
