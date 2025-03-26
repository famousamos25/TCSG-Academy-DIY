import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
            cdtr?: boolean;
        };
    };
}

const DisputeTable: React.FC<DisputeTableProps> = ({ ACCOUNTS, filteredAccounts, selectedAccounts, handleSelectAll, handleSelectAccount, renderBureauCheckboxes, customSelections }) => {
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
                            <TableCell>{customSelections[account.accountId]?.reason || account.reason}</TableCell>
                            <TableCell>{customSelections[account.accountId]?.instruction || account.instruction}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DisputeTable;
