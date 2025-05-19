"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { LATE_PAYMENTS, INQUIRIES_DATA as inquiriesData } from "@/constants/dispute-type-data";
import { DISPUTE_TYPES } from "@/constants/dispute-types";
import { useCreditReport } from '@/hooks/use-credit-report';
import { useMemo, useState } from "react";
import { Account } from "./DisputeTable";

type BureauSelection = Record<string, boolean>;
interface AccountBureauSelections {
    [accountId: string]: BureauSelection;
}

interface DisputeTypesProps {
    hideDisputeActions?: boolean;
    onOpenChange: (open: boolean) => void;
    [key: string]: any;
}


export default function DisputeTypes({ hideDisputeActions = false }: DisputeTypesProps) {
    const [selectedDisputeType, setSelectedDisputeType] = useState<string | null>("Derogatory");
    const [selectedInquiries, setSelectedInquiries] = useState<Record<string, boolean>>({});
    const [selectedFilter, setSelectedFilter] = useState<string>("All");
    const [disputeRound, setDisputeRound] = useState('Dispute Round #1');

    const [selectedReason, setSelectedReason] = useState('');
    const [selectedInstruction, setSelectedInstruction] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
    const [bureauSelections, setBureauSelections] = useState<AccountBureauSelections>({});
    const [customSelections, setCustomSelections] = useState<{
        [accountId: string]: {
            reason?: string;
            instruction?: string;
            cdtr?: boolean;
        };
    }>({});

    const { creditReport } = useCreditReport();

    const handleDisputeTypeSelect = (type: string) => {
        setSelectedDisputeType(type);
    };

    const toggleInquirySelection = (index: number) => {
        setSelectedInquiries((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleSelectAccount = (accountNumber: string) => {
        setSelectedAccounts(prev =>
            prev.includes(accountNumber)
                ? prev.filter(id => id !== accountNumber)
                : [...prev, accountNumber]
        );
    };

    const handleSelectAll = () => {
        setSelectedAccounts(LATE_PAYMENTS.map(acc => acc.accountId));
    };

    const handleDeselectAll = () => {
        setSelectedAccounts([]);
    };


    const [allSelected, setAllSelected] = useState(false);

    const toggleSelectAll = () => {
        setAllSelected((prev) => {
            const newState = !prev;
            if (newState) {
                handleSelectAll();
            } else {
                handleDeselectAll();
            }
            return newState;
        });
    };


    const filteredInquiries =
        selectedFilter === "All"
            ? inquiriesData
            : inquiriesData.filter((item) => item.bureau === selectedFilter);

    const renderBureauCheckboxes = (
        accounts: Account[],
        onBureauToggle: () => void
    ) => {
        const selections = bureauSelections[accounts[0].accountNumber] || {
            tu: false,
            exp: false,
            eqfx: false,
        };

        const handleToggle = (bureau: 'tu' | 'exp' | 'eqfx') => {
            handleBureauToggle(accounts[0].accountNumber, bureau);
            onBureauToggle();
        };

        const findBureau = (bureau: "TransUnion" | "Experian" | "Equifax") => {
            return accounts.find(acc => acc.bureau === bureau);
        };

        const renderBureau = (label: string, key: 'tu' | 'exp' | 'eqfx', bureauName: "TransUnion" | "Experian" | "Equifax") => {
            const bureauData = findBureau(bureauName);

            return (
                <div className="flex flex-col items-center min-w-[60px]">
                    <div className={`text-xs font-semibold ${key === 'eqfx' ? 'text-red-400' : 'text-cyan-400'}`}>
                        {label}
                    </div>
                    {bureauData ? (
                        <Checkbox
                            className="mt-1"
                            checked={selections[key]}
                            onCheckedChange={() => handleToggle(key)}
                        />
                    ) : (
                        <div className="text-[10px] text-gray-400 mt-1 whitespace-nowrap">
                            Not Reported
                        </div>
                    )}
                </div>
            );
        };

        return (
            <div className="flex items-center justify-start gap-6">
                {renderBureau("TU", "tu", "TransUnion")}
                {renderBureau("EXP", "exp", "Experian")}
                {renderBureau("EQFX", "eqfx", "Equifax")}
            </div>
        );
    };



    const handleBureauToggle = (accountId: string, option: keyof BureauSelection | 'cdtr') => {
        if (option === 'cdtr') {
            setCustomSelections(prev => ({
                ...prev,
                [accountId]: {
                    ...prev[accountId],
                    cdtr: !prev[accountId]?.cdtr
                }
            }));
        } else {
            setBureauSelections(prev => ({
                ...prev,
                [accountId]: {
                    ...prev[accountId] || { tu: false, exp: false, eqfx: false },
                    [option]: !prev[accountId]?.[option]
                }
            }));
        }
    };

    const filteredAccounts = (dataSource: any) => {
        if (!Array.isArray(dataSource)) return [];

        return dataSource.filter((account: any) => {
            const furnisher = account.furnisher?.toLowerCase?.() || "";
            const accountId = account.accountId?.toLowerCase?.() || "";
            return (
                furnisher.includes(searchTerm.toLowerCase()) ||
                accountId.includes(searchTerm.toLowerCase())
            );
        });
    };

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
        <div className="space-y-6">
            
            
        </div>
    );
}
