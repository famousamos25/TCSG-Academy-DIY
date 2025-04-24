"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ACCOUNTS, AVAILABLE_INSTRUCTIONS, AVAILABLE_REASONS, LATE_PAYMENTS, INQUIRIES_DATA as inquiriesData } from "@/constants/dispute-type-data";
import { DISPUTE_TYPES } from "@/constants/dispute-types";
import { FileText, NetworkIcon } from "lucide-react";
import { useState } from "react";
import { DisputeActions, DisputeFooter, DisputeTableWrapper, InquirySection } from "./dispute-actions";
import { SelectDisputeInstruction, SelectDisputeReason } from "./dispute-reason-instructions";
import DisputeTable, { Account } from "./DisputeTable";
import PersonalInformationDisputeDialog from "./personal-information-dispute";
import PublicRecordsNotice from "./public-response-notice";
import SearchBar from "./search-bar";

type BureauSelection = Record<string, boolean>;
interface AccountBureauSelections {
    [accountId: string]: BureauSelection;
}

interface DisputeTypesProps {
    hideDisputeActions?: boolean;
    onOpenChange: (open: boolean) => void;
    [key: string]: any;
}

export default function DisputeTypes({ hideDisputeActions = false, onOpenChange, ...props }: DisputeTypesProps) {
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
    }>({})


    const handleDisputeTypeSelect = (type: string) => {
        setSelectedDisputeType(type);
    };

    const toggleInquirySelection = (index: number) => {
        setSelectedInquiries((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleSelectAccount = (accountId: string) => {
        setSelectedAccounts(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
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
        account: Account,
        onBureauToggle: () => void
    ) => {
        const selections = bureauSelections[account.accountId] || {
            tu: false,
            exp: false,
            eqfx: false
        };

        const handleToggle = (bureau: 'tu' | 'exp' | 'eqfx') => {
            handleBureauToggle(account.accountId, bureau);
            onBureauToggle();
        };

        const renderBureau = (label: string, key: 'tu' | 'exp' | 'eqfx') => {
            const status = account.bureaus[key];
            if (status === 'Not Reported') {
                return (
                    <div className="text-xs text-gray-400">
                        <span className={key === 'eqfx' ? 'text-red-500' : 'text-gray-500'}>{label}</span>
                        <div className="text-[10px]">Not Reported</div>
                    </div>
                );
            }

            return (
                <div>
                    <div className="text-xs text-gray-500">{label}</div>
                    <Checkbox
                        checked={selections[key]}
                        onCheckedChange={() => handleToggle(key)}
                    />
                </div>
            );
        };

        return (
            <div className="space-y-2">
                <div className="flex items-start flex-nowrap gap-2">
                    {renderBureau("TU", "tu")}
                    {renderBureau("EXP", "exp")}
                    {renderBureau("EQFX", "eqfx")}
                </div>
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
        return dataSource.filter((account: any) => {
            return (
                account.furnisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                account.accountId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    };

    const derivedDisputeTypes = DISPUTE_TYPES.map(type => {
        let count = 0;
    
        switch (type.type) {
            case 'derogatory':
                count = ACCOUNTS.length;
                break;
            case 'late-payments':
                count = LATE_PAYMENTS.length;
                break;
            case 'inquiries':
                count = inquiriesData.length;
                break;
            case 'personal-info':
                count = 0;
                break;
            case 'public-records':
                count = 0;
                break;
            case 'all-accounts':
                count = ACCOUNTS.length + LATE_PAYMENTS.length;
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
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-6 gap-4">
                {derivedDisputeTypes.map((type: any) => (
                    <div
                        key={type.name}
                        className={`
                  border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:border-gray-300
                  ${selectedDisputeType === type.name ? "border-2 border-green-500 shadow-lg" : ""}
                `}
                        onClick={() => handleDisputeTypeSelect(type.name)}
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

            {selectedDisputeType === "Personal Information" && (
                <PersonalInformationDisputeDialog
                    open={selectedDisputeType !== null}
                    onOpenChange={(open) => {
                        if (!open) setSelectedDisputeType("Derogatory");
                    }}
                />
            )}

            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-xl font-bold">
                        {/* count from derived dispute type */}
                        {derivedDisputeTypes.find(name => name.name === "Inquiries")?.count || 0}
                    </div>
                    <div className="text-sm text-gray-600">Inquiries</div>
                </div>
                <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-xl font-bold">
                        {derivedDisputeTypes.find(name => name.name === "Derogatory")?.count || 0}
                    </div>
                    <div className="text-sm text-gray-600">Derogatory Accounts</div>
                </div>
                <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-xl font-bold">
                        {derivedDisputeTypes.find(name => name.name === "Late Payments")?.count || 0}
                    </div>
                    <div className="text-sm text-gray-600">Late Payment Accounts</div>
                </div>
                <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-xl font-bold">
                        {derivedDisputeTypes.find(name => name.name === "Public Records")?.count || 0}
                    </div>
                    <div className="text-sm text-gray-600">Public Records</div>
                </div>
            </div>
            {
                selectedDisputeType === "Inquiries" && (
                    <InquirySection
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        inquiriesData={inquiriesData}
                        selectedInquiries={selectedInquiries}
                        setSelectedInquiries={setSelectedInquiries}
                        filteredInquiries={filteredInquiries}
                        toggleInquirySelection={toggleInquirySelection}
                        setSelectedDisputeType={setSelectedDisputeType}
                    />
                )
            }

            {selectedDisputeType === "Derogatory" && (
                <>
                    {!hideDisputeActions && (
                        <DisputeActions
                            disputeRound={disputeRound}
                            setDisputeRound={setDisputeRound}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            reasons={AVAILABLE_REASONS}
                            instructions={AVAILABLE_INSTRUCTIONS}
                            bureauSelections={bureauSelections}
                            allSelected={allSelected}
                            toggleSelectAll={toggleSelectAll}
                            selectedAccounts={selectedAccounts}
                            selectedReason={selectedReason}
                            setSelectedReason={setSelectedReason}
                            selectedInstruction={selectedInstruction}
                            setSelectedInstruction={setSelectedInstruction}
                        />
                    )}
                    <DisputeTableWrapper
                        {...props}
                        accounts={ACCOUNTS}
                        data={filteredAccounts}
                        selectedAccounts={selectedAccounts}
                        handleSelectAll={handleSelectAll}
                        handleSelectAccount={handleSelectAccount}
                        renderBureauCheckboxes={renderBureauCheckboxes as any}
                        customSelections={customSelections}
                        allSelected={allSelected}
                        toggleSelectAll={toggleSelectAll}
                    />
                    <DisputeFooter
                        onClose={() => onOpenChange(false)}
                        actionText="Create Letters"
                        disabled={false}
                    />
                </>
            )}

            {selectedDisputeType === "Late Payments" && (
                <>
                    {!hideDisputeActions && (
                        <DisputeActions
                            disputeRound={disputeRound}
                            setDisputeRound={setDisputeRound}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            reasons={AVAILABLE_REASONS}
                            instructions={AVAILABLE_INSTRUCTIONS}
                            bureauSelections={bureauSelections}
                            allSelected={allSelected}
                            toggleSelectAll={toggleSelectAll}
                            selectedAccounts={selectedAccounts}
                            selectedReason={selectedReason}
                            setSelectedReason={setSelectedReason}
                            selectedInstruction={selectedInstruction}
                            setSelectedInstruction={setSelectedInstruction}
                        />
                    )}
                    <DisputeTableWrapper
                        {...props}
                        accounts={LATE_PAYMENTS}
                        data={filteredAccounts}
                        selectedAccounts={selectedAccounts}
                        handleSelectAll={handleSelectAll}
                        handleSelectAccount={handleSelectAccount}
                        renderBureauCheckboxes={renderBureauCheckboxes as any}
                        customSelections={customSelections}
                        allSelected={allSelected}
                        toggleSelectAll={toggleSelectAll}
                    />
                </>
            )}

            {selectedDisputeType === "Public Records" && <PublicRecordsNotice />}

            {selectedDisputeType === "All Accounts" && (
                <>
                    <div className="flex justify-between items-center mt-8 space-x-4">
                        <Button
                            variant="outline"
                            className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                        >
                            Dispute All
                        </Button>

                        {selectedAccounts.length > 0 && (
                            <div className="flex space-x-4">
                                <SelectDisputeReason selectedReason={selectedReason} setSelectedReason={setSelectedReason} />
                                <SelectDisputeInstruction selectedInstruction={selectedInstruction} setSelectedInstruction={setSelectedInstruction} />
                            </div>
                        )}

                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>

                    <div className="border rounded-md overflow-hidden shadow-sm mt-4">
                        <DisputeTable
                            ACCOUNTS={[...ACCOUNTS, ...LATE_PAYMENTS] as any} // TODO remove any and use correct type
                            filteredAccounts={filteredAccounts([...ACCOUNTS, ...LATE_PAYMENTS])}
                            selectedAccounts={selectedAccounts}
                            handleSelectAll={handleSelectAll}
                            handleSelectAccount={handleSelectAccount}
                            renderBureauCheckboxes={renderBureauCheckboxes as any}
                            customSelections={customSelections}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
