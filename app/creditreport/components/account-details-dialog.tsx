"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatAmountWithCurrency } from '@/lib/utils';
import { Creditor } from '@/types/credit-report';
import { X } from 'lucide-react';
import PaymentHistory from './payment-history';
interface AccountDetailsDialogProps {
    isOpen: boolean;
    onOpenChange: () => void;
    account: any;
    creditors: Creditor[];
}
export function AccountDetailsDialog({ isOpen, onOpenChange, account, creditors }: AccountDetailsDialogProps) {
    const info = account[0];
    if (!info) return;
    const values: any = info;

    const accountsInfo = account;
    const accountDetailMappings = [
        { key: "creditorName", label: "Account Name", type: "" },
        { key: "accountNumber", label: "Account Number", type: "" },
        { key: "accountDescription", label: "Account Description", type: "" },
        { key: "accountStatus", label: "Account Status", type: "" },
        { key: "accountType", label: "Account Type", type: "" },
        { key: "dateOpened", label: "Date Opened", type: "date" },
        { key: "dateReported", label: "Date Last Reported", type: "date" },
        { key: "dateLastPayment", label: "Date of Late Payment", type: "date" },
        { key: "creditType", label: "Type Detail", type: "" },
    ];

    const balanceMappings = [
        { key: "balance", label: "Balance", type: "amount" },
        { key: "creditLimit", label: "Credit Limit", type: "amount" },
        { key: "highBalance", label: "Highest Credit", type: "amount" },
        { key: "amountPastDue", label: "Past Due", type: "amount" },
        { key: "monthlyPayment", label: "Monthly Payment", type: "" },
        { key: "paymentStatus", label: "Payment Status", type: "" },
    ];

    const creditorMappings = [
        { key: "address", label: "Address", type: "" },
        { key: "telephone", label: "Phone Number", type: "" },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="w-full lg:max-w-[1200px] flex flex-col !max-h-[90vh]">
                <div className="w-full flex items-end justify-end">
                    <X className="h-5 w-5 cursor-pointer" onClick={onOpenChange} />
                </div>
                <div className="w-full flex flex-col flex-1 px-4 -mt-12">
                    <div className="flex items-center">
                        <h2 className="text-xl font-semibold text-brand-navy">
                            {values.creditorName}
                        </h2>
                    </div>

                    <div className="flex-1 w-full h-full overflow-y-auto">
                        <div className="mt-5">
                            <h3 className="text-lg font-bold">Account Details</h3>
                            <Separator className="my-2" />

                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b ">
                                        <TableHead className="text-slate-400 pl-6"></TableHead>
                                        <TableHead className="text-cyan-400">TRANSUNION</TableHead>
                                        <TableHead className="text-blue-400">EXPERIAN</TableHead>
                                        <TableHead className="text-red-400">EQUIFAX</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        accountDetailMappings.map((item, index) => {
                                            const bureaus = ["transUnion", "experian", "equifax"].map((bureau) => {
                                                const value = accountsInfo?.find((info: any) => info.bureau?.toLowerCase() === bureau?.toLowerCase())?.[item.key];
                                                const isDate = item.type === "date";
                                                const isAmount = item.type === "amount";
                                                const formattedValue = (isDate && value) ? new Date(value).toLocaleDateString() : value;
                                                const formattedAmount = isAmount ? formatAmountWithCurrency(value, "currency") : value;
                                                const displayValue = isDate ? formattedValue : isAmount ? formattedAmount : value;
                                                return displayValue || "-";
                                            });

                                            return (
                                                <TableRow key={index} className="border-none even:bg-gray-100 ">
                                                    <TableCell className="font-medium pl-6">{item.label}</TableCell>
                                                    <TableCell className="text-center_">
                                                        {bureaus[0]}
                                                    </TableCell>
                                                    <TableCell className="text-center_">
                                                        {bureaus[1]}
                                                    </TableCell>
                                                    <TableCell className="text-center_">
                                                        {bureaus[2]}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-5">
                            <h3 className="text-lg font-bold">Balance & Payments</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b ">
                                        <TableHead className="text-slate-400 pl-6"></TableHead>
                                        <TableHead className="text-cyan-400">TRANSUNION</TableHead>
                                        <TableHead className="text-blue-400">EXPERIAN</TableHead>
                                        <TableHead className="text-red-400">EQUIFAX</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        balanceMappings.map((item, index) => {
                                            const keyValues = ["transUnion", "experian", "equifax"].map((bureau) => {
                                                const value = accountsInfo?.find((info: any) => info.bureau?.toLowerCase() === bureau?.toLowerCase())?.[item.key];
                                                const isDate = item.type === "date";
                                                const isAmount = item.type === "amount";
                                                const formattedValue = (isDate && value) ? new Date(value).toLocaleDateString() : value;
                                                const formattedAmount = (isAmount && value && value !== "0") ? formatAmountWithCurrency(value, "currency") : "--";
                                                const displayValue = isDate ? formattedValue : isAmount ? formattedAmount : value;
                                                return displayValue || "-";
                                            });
                                            return (
                                                <TableRow key={index} className="border-none even:bg-gray-100 ">
                                                    <TableCell className="font-medium pl-6">{item.label}</TableCell>
                                                    <TableCell className="text-center_">
                                                        {keyValues[0]}
                                                    </TableCell>
                                                    <TableCell className="text-center_">
                                                        {keyValues[1]}
                                                    </TableCell>
                                                    <TableCell className="text-center_">
                                                        {keyValues[2]}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-5">
                            <h3 className="text-lg font-bold">Creditor Information</h3>
                            <Separator className="my-2" />
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b ">
                                        <TableHead className="text-slate-400 pl-6"></TableHead>
                                        <TableHead className="text-cyan-400">TRANSUNION</TableHead>
                                        <TableHead className="text-blue-400">EXPERIAN</TableHead>
                                        <TableHead className="text-red-400">EQUIFAX</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        creditorMappings.map((item, index) => {
                                            const keyValues = ["transUnion", "experian", "equifax"].map((bureau) => {
                                                const account = accountsInfo?.find((info: any) => info.bureau?.toLowerCase() === bureau?.toLowerCase());

                                                let creditor = creditors?.find((creditor) => creditor.subscriberCode === account?.subscriberCode);
                                                if (!creditor) {
                                                    creditor = creditors?.find((creditor) => creditor.name === account?.creditorName);
                                                }

                                                if (item.key === "address" && creditor?.address) {
                                                    const address = creditor?.address;
                                                    return `${address?.unparsedStreet?.trim()}, ${address?.city?.trim()}, ${address?.stateCode?.trim()} ${address?.postalCode?.trim()}`;
                                                }

                                                if (item.key === "telephone") {
                                                    return creditor?.telephone || "-";
                                                }

                                                return "-";
                                            });
                                            return (
                                                <TableRow key={index} className="border-none even:bg-gray-100">
                                                    <TableCell className="font-medium pl-6">{item.label}</TableCell>
                                                    <TableCell className="text-center_">
                                                        {keyValues[0]}
                                                    </TableCell>
                                                    <TableCell className="text-center_">
                                                        {keyValues[1]}
                                                    </TableCell>
                                                    <TableCell className="text-center_">
                                                        {keyValues[2]}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-5">
                            <h3 className="text-lg text-green-600 font-bold">Two-Year Payment Historys</h3>
                            <p className="text-red-400 text-sm mt-2">* SmartCredit Sometimes Reports An Account more than one-time during the month</p>
                            <PaymentHistory
                                account={accountsInfo}
                            />
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}