import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { SelectDisputeInstruction, SelectDisputeReason } from "./dispute-reason-instructions";
import DisputeTable from "./DisputeTable";
import { Modal } from "./reason-modal";
import SearchBar from "./search-bar";

const DISPUTE_ROUNDS = [
    { short: "Dispute Round #1", full: "Dispute Round #1" },
    { short: "Dispute Round #2", full: "Dispute Round #2" },
    { short: "Dispute Round #3", full: "Dispute Round #3" }
];

const DisputeSection: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border rounded-lg p-6">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        {children}
    </div>
);
const DisputeActions: React.FC<{
    disputeRound: string;
    setDisputeRound: (value: string) => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    reasons: { short: string; full: string }[];
    instructions: { short: string; full: string }[];
    bureauSelections: Record<string, Record<string, boolean>>;
    allSelected: boolean;
    toggleSelectAll: () => void;
    selectedAccounts: any[];
    selectedReason: string;
    setSelectedReason: (value: string) => void;
    selectedInstruction: string;
    setSelectedInstruction: (value: string) => void;
}> = ({
    disputeRound,
    setDisputeRound,
    searchTerm,
    setSearchTerm,
    allSelected,
    toggleSelectAll,
    selectedAccounts, 
    selectedReason,
    setSelectedReason,
    selectedInstruction,
    setSelectedInstruction
}) => (
    <div className="flex justify-between items-center mt-8">
        <div className="flex space-x-4">
            <Button
                variant="outline"
                className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                onClick={toggleSelectAll}
            >
                {allSelected ? "Deselect All" : "Dispute All"}
            </Button>
            <Select value={disputeRound} onValueChange={setDisputeRound}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select round" />
                </SelectTrigger>
                <SelectContent>
                    {[...Array(6)].map((_, i) => (
                        <SelectItem key={i} value={`Dispute Round #${i + 1}`}>
                            Dispute Round #{i + 1}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selectedAccounts.length > 0 && (
                <div className="flex space-x-4">
                    <SelectDisputeReason selectedReason={selectedReason} setSelectedReason={setSelectedReason} />
                    <SelectDisputeInstruction selectedInstruction={selectedInstruction} setSelectedInstruction={setSelectedInstruction} />
                </div>
            )}
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
);



const DisputeSelect: React.FC<{ options: { short: string; full: string }[]; placeholder: string }> = ({ options, placeholder }) => (
    <Select>
        <SelectTrigger className="w-[200px]"><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>
            <TooltipProvider>
                {options.map(option => (
                    <Tooltip key={option.short} delayDuration={300}>
                        <TooltipTrigger asChild>
                            <SelectItem value={option.short}>{option.short}</SelectItem>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-md p-4 bg-white border shadow-lg rounded-md">
                            <p className="text-sm">{option.full}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </SelectContent>
    </Select>
);

const DisputeTableWrapper = ({ data, accounts, selectedAccounts, handleSelectAll, handleSelectAccount, renderBureauCheckboxes, customSelections }: { 
        data: (accounts: any[]) => any[];
        accounts: any[];
        selectedAccounts: any[];
        handleSelectAll: () => void;
        handleSelectAccount: (account: any) => void;
        renderBureauCheckboxes: (account: any) => JSX.Element;
        customSelections: any;
        allSelected: boolean; 
        toggleSelectAll: () => void;    
}) => (
    <div className="border rounded-md overflow-hidden shadow-sm mt-4">
        <DisputeTable
            filteredAccounts={data(accounts)}
            selectedAccounts={selectedAccounts}
            handleSelectAll={handleSelectAll}
            handleSelectAccount={handleSelectAccount}
            renderBureauCheckboxes={renderBureauCheckboxes}
            customSelections={customSelections}
        />
    </div>
);

const DisputeFooter: React.FC<{ onClose: () => void; actionText: string; disabled: boolean }> = ({ onClose, actionText, disabled }) => (
    <div className="flex justify-end space-x-4 mt-6">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90" disabled={disabled}>{actionText}</Button>
    </div>
);

const InquirySection: React.FC<{
    selectedFilter: string;
    setSelectedFilter: (value: string) => void;
    inquiriesData: any[];
    selectedInquiries: Record<number, boolean>;
    setSelectedInquiries: (value: Record<number, boolean>) => void;
    filteredInquiries: any[];
    toggleInquirySelection: (index: number) => void;
    setSelectedDisputeType: (value: string | null) => void;
}> = ({ selectedFilter, setSelectedFilter, inquiriesData, selectedInquiries, setSelectedInquiries, filteredInquiries, toggleInquirySelection, setSelectedDisputeType }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{ field: string; value: string } | null>(null);
    const [editedValue, setEditedValue] = useState("");
    const [extraValue, setExtraValue] = useState(""); 
    const [allSelected, setAllSelected] = useState<boolean>(false);

    const openModal = (field: string, value: string) => {
        setModalData({ field, value });
        setEditedValue(value);
        setExtraValue(""); 
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setIsModalOpen(false);
    };

    const toggleSelectAll = () => {
        const newSelectedState = !allSelected;
        setAllSelected(newSelectedState);
    
        setSelectedInquiries(
            Object.fromEntries(filteredInquiries.map((_, i) => [i, newSelectedState]))
        );
    };

    const firstSelectedIndex = Object.keys(selectedInquiries)
    .map(Number)
    .find(index => selectedInquiries[index]);
    const firstSelectedInquiry = firstSelectedIndex !== undefined ? filteredInquiries[firstSelectedIndex] : null;

    return (
        <DisputeSection title="Inquiry Section">
            <div className="flex gap-2 items-center mb-4">
                <Button
                    variant="outline"
                    className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                    onClick={toggleSelectAll}
                >
                    {allSelected ? "Deselect All" : "Dispute All"}
                </Button>
                <RadioGroup value={selectedFilter} onValueChange={setSelectedFilter} className="flex">
                    {['All', 'TU', 'EXP', 'EQFX'].map(type => (
                        <Label key={type} className="flex items-center space-x-2">
                            <RadioGroupItem value={type} />
                            <span>{type} ({type === 'All' ? inquiriesData.length : inquiriesData.filter(i => i.bureau === type).length})</span>
                        </Label>
                    ))}
                </RadioGroup>
                <div className="flex flex-wrap gap-4">
                    <DisputeSelect
                        options={DISPUTE_ROUNDS}
                        placeholder="Select an option"
                    />
                    {firstSelectedInquiry && (
                        <>
                            <DisputeSelect
                                options={[{ short: firstSelectedInquiry.reason, full: firstSelectedInquiry.reason }]}
                                placeholder={firstSelectedInquiry.reason}
                            />
                            <DisputeSelect
                                options={[{ short: firstSelectedInquiry.instruction, full: firstSelectedInquiry.instruction }]}
                                placeholder={firstSelectedInquiry.instruction}
                            />
                        </>
                    )}
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="border-b">
                        <TableHead className="text-slate-400 pl-6 text-left">
                            <Checkbox
                                checked={Object.values(selectedInquiries).every(Boolean)}
                                onCheckedChange={() => {
                                    const allChecked = Object.values(selectedInquiries).every(Boolean);
                                    setSelectedInquiries(Object.fromEntries(filteredInquiries.map((_, i) => [i, !allChecked])));
                                }}
                            />
                        </TableHead>
                        {['Creditor', 'Credit Bureau', 'CDTR', 'Date', 'Reason', 'Instruction'].map(header => (
                            <TableHead key={header} className="text-slate-400 text-left">{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredInquiries.map((item: any, index: number) => (
                        <TableRow key={index} className="border-b">
                            <TableCell>
                                <Checkbox checked={selectedInquiries[index] || false} onCheckedChange={() => toggleInquirySelection(index)} />
                            </TableCell>
                            <TableCell>{item.creditor}</TableCell>
                            <TableCell className={item.bureau === "EQFX" ? "text-red-400" : item.bureau === "EXP" ? "text-blue-400" : "text-cyan-400"}>
                                <div className="flex items-center">
                                    <Checkbox
                                        checked={selectedInquiries[index] || false}
                                        onCheckedChange={() => toggleInquirySelection(index)}
                                        className="mr-2"
                                    />
                                    {item.bureau}
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-500">
                                <div className="flex">
                                    {item.cdtr}
                                    <SquarePen 
                                        className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                        onClick={() => openModal("CDTR", item.creditor)}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell className="text-gray-500">
                                <div className="flex">
                                    {item.reason}
                                    <SquarePen 
                                        className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                        onClick={() => openModal("Reason", item.reason)}
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-500">
                                <div className="flex">
                                    {item.instruction}
                                    <SquarePen 
                                        className="w-4 h-4 text-green-500 cursor-pointer ml-2"
                                        onClick={() => openModal("Instruction", item.instruction)}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DisputeFooter onClose={() => setSelectedDisputeType(null)} actionText="Create Inquiry Dispute" disabled={!Object.values(selectedInquiries).some(Boolean)} />

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} onSave={handleSave}>
                    {modalData?.field === "Reason" || modalData?.field === "Instruction" ? (
                        <>
                            <Input
                                type="text"
                                className="border p-2 rounded w-full mt-2"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                            />
                            <Textarea
                                className="border p-2 rounded w-full mt-2"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                            />
                        </>
                    ) : (
                        <Input
                            type="text"
                            className="border p-2 rounded w-full mt-2"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                        />
                    )}
                </Modal>
            )}
        </DisputeSection>
    );
};


export { DisputeActions, DisputeFooter, DisputeSection, DisputeTableWrapper, InquirySection };

