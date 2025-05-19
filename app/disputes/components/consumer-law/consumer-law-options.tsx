"use client";

import { Badge } from '@/components/ui/badge';
import { DISPUTE_TYPES } from "@/constants/dispute-types";
import { useCreditReport } from '@/hooks/use-credit-report';
import { FileText, NetworkIcon } from "lucide-react";
import { useMemo } from "react";

interface Props {
    selectedOption: string | null;
    selectOption: (option: string) => void;
}


export default function ConsumerLawOptions({ selectedOption="Derogatory", selectOption }: Props) {
    const { creditReport } = useCreditReport();


    const derogatoryAccs = creditReport?.accounts.filter((account: any) => {
        if (account?.some((acc: any) => acc?.paymentStatus === 'Collection/Chargeoff')) return true;
        if (account?.some((acc: any) => acc?.accountType?.toLowerCase()?.includes("collection"))) return true;
        if (account?.some((acc: any) => acc?.accountType?.toLowerCase()?.includes("chargeoff"))) return true;
        return false;
    });

    const latePaymentAccounts = creditReport?.accounts.filter((account: any) => {
        if (account?.some((acc: any) => acc?.paymentStatus?.toLowerCase()?.includes("late") && acc?.accountStatus?.toLowerCase() !== "derogatory")) return true;
        return false;
    });

    const derivedDisputeTypes = useMemo(() => {
        return DISPUTE_TYPES.map(type => {
            let count = 0;

            switch (type.type) {
                case 'derogatory':
                    count = derogatoryAccs?.length;
                    break;
                case 'late-payments':
                    count = latePaymentAccounts?.length;
                    break;
                case 'inquiries':
                    count = creditReport?.inquiries?.length;
                    break;
                case 'personal-info':
                    count = 0;
                    break;
                case 'public-records':
                    count = creditReport?.publicRecords?.length || 0;
                    break;
                case 'all-accounts':
                    count = creditReport?.accounts.length;
                    break;
                default:
                    count = type.count || 0;
            }

            const getLabel = (label: string) => {
                if (count === 0) return 'You have none';
                return `You have ${count} ${label}`;
            };

            const description = getLabel(type.name);

            return { ...type, count, description };
        });
    }, [creditReport?.accounts.length, creditReport?.inquiries?.length, creditReport?.publicRecords?.length, derogatoryAccs?.length, latePaymentAccounts?.length]);

    return (
        <div className="grid grid-cols-6 gap-4">
            {derivedDisputeTypes.map((type: any) => (
                <div
                    key={type.name}
                    className={`
                  border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:border-gray-300
                  ${selectedOption === type.name ? "border-2 border-green-500 shadow-lg" : ""}
                `}
                    onClick={() => selectOption(type.name)}
                >
                    <div className="mb-2 flex align-center justify-center">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 gap-1">
                            Dispute Guide
                            <NetworkIcon size={16} className="transform rotate-90" />
                        </Badge>
                    </div>
                    <div className="flex flex-col items-center justify-center h-20">
                        <FileText className="h-6 w-6 mb-2 text-brand-navy" />
                        <div className="text-center">
                            <div className="font-medium">{type.name}</div>
                            <div className="text-xs text-gray-600">
                                {type.name !== "Personal Information" && type.description}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
