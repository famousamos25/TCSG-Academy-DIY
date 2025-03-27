"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ACCOUNTS, AVAILABLE_INSTRUCTIONS, AVAILABLE_REASONS, LATE_PAYMENTS, INQUIRIES_DATA as inquiriesData } from "@/constants/dispute-type-data";
import { DISPUTE_TYPES } from "@/constants/dispute-types";
import { Badge, FileText, NetworkIcon } from "lucide-react";
import { useState } from "react";
import { DisputeActions, DisputeFooter, DisputeTableWrapper, InquirySection } from "./dispute-actions";
import { SelectDisputeInstruction, SelectDisputeReason } from "./dispute-reason-instructions";
import DisputeTable from "./DisputeTable";
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
        if (selectedAccounts.length === ACCOUNTS.length) {
            setSelectedAccounts([]);
        } else {
            setSelectedAccounts(ACCOUNTS.map(account => account.accountId));
        }
    };
    const filteredInquiries =
        selectedFilter === "All"
            ? inquiriesData
            : inquiriesData.filter((item) => item.bureau === selectedFilter);

    const renderBureauCheckboxes = (account: typeof ACCOUNTS[0]) => {
        const selections = bureauSelections[account.accountId] || { tu: false, exp: false, eqfx: false };
        const customSelection = customSelections[account.accountId] || {};

        return (
            <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <div className="text-xs text-gray-500">TU</div>
                        <Checkbox
                            checked={selections.tu}
                            onCheckedChange={() => handleBureauToggle(account.accountId, 'tu')}
                            disabled={account.bureaus.tu === 'Not Reported'}
                            className={account.bureaus.tu === 'In-Dispute' ? 'bg-blue-100' : ''}
                        />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">EXP</div>
                        <Checkbox
                            checked={selections.exp}
                            onCheckedChange={() => handleBureauToggle(account.accountId, 'exp')}
                            disabled={account.bureaus.exp === 'Not Reported'}
                            className={account.bureaus.exp === 'In-Dispute' ? 'bg-blue-100' : ''}
                        />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">EQFX</div>
                        <Checkbox
                            checked={selections.eqfx}
                            onCheckedChange={() => handleBureauToggle(account.accountId, 'eqfx')}
                            disabled={account.bureaus.eqfx === 'Not Reported'}
                            className={account.bureaus.eqfx === 'In-Dispute' ? 'bg-blue-100' : ''}
                        />
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-500">CDTR</div>
                    <Checkbox
                        checked={customSelection.cdtr}
                        onCheckedChange={() => handleBureauToggle(account.accountId, 'cdtr')}
                    />
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

    const filteredAccounts = (dataSource: any)=> dataSource.filter((account: any) =>
        (account.furnisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.accountId.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-6 gap-4">
                {DISPUTE_TYPES.map((type) => (
                    <div
                        key={type.name}
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:border-gray-300`}
                        onClick={() => handleDisputeTypeSelect(type.name)}
                    >
                        <div className="mb-2 flex align-center justify-center">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 gap-1">
                                Attack Guide
                                <NetworkIcon size={16} className="transform rotate-90" />
                            </Badge>
                        </div>
                        <div className="flex flex-col items-center justify-center h-20">
                            <FileText className="h-6 w-6 mb-2 text-brand-navy" />
                            <div className="text-center">
                                <div className="font-medium">{type.name}</div>
                                <div className="text-xs text-gray-600">{type.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedDisputeType === "Personal Information" && (
                <PersonalInformationDisputeDialog
                    open={selectedDisputeType !== null}
                    onOpenChange={(open) => {
                        if (!open) setSelectedDisputeType(null);
                    }}
                />
            )}

            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-xl font-bold">0</div>
                    <div className="text-sm text-gray-600">Inquiries</div>
                </div>
                <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-xl font-bold">0</div>
                    <div className="text-sm text-gray-600">Derogatory Accounts</div>
                </div>
                <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-xl font-bold">0</div>
                    <div className="text-sm text-gray-600">Late Payment Accounts</div>
                </div>
                <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                    <div className="text-xl font-bold">0</div>
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
                    />
                    <DisputeFooter
                        onClose={() => onOpenChange(false)}
                        actionText="Create Letters"
                        disabled={false}
                    />
                </>
            )}

            {
                selectedDisputeType === "Late Payments" && (
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
                        />
                    </>
                )
            }
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
                            ACCOUNTS={[...ACCOUNTS, ...LATE_PAYMENTS]}
                            filteredAccounts={filteredAccounts([...ACCOUNTS, ...LATE_PAYMENTS])}
                            selectedAccounts={selectedAccounts}
                            handleSelectAll={handleSelectAll}
                            handleSelectAccount={handleSelectAccount}
                            renderBureauCheckboxes={renderBureauCheckboxes}
                            customSelections={customSelections}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
