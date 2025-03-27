import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectDisputeReasonProps {
    selectedReason: string;
    setSelectedReason: (value: string) => void;
}

const SelectDisputeReason = ({ selectedReason, setSelectedReason }: SelectDisputeReasonProps) => (
    <Select value={selectedReason} onValueChange={setSelectedReason}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a reason" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Debt Validation Laws</SelectLabel>
                <SelectItem value="1692g">Under 15 USC 1692g. Validation of debts</SelectItem>
                <SelectItem value="1681b">Under 15 US Code 1681b permissible purposes of consumer reports</SelectItem>
                <SelectItem value="1681a4">Under 15 U.S. Code § 1681 (a) (4) Consumer Right to Privacy</SelectItem>
            </SelectGroup>
            <SelectGroup>
                <SelectLabel>Late Payment Disputes</SelectLabel>
                <SelectItem value="late_proof">Please show proof I was ever late</SelectItem>
                <SelectItem value="covid_protection">Protected by COVID-19 forbearance</SelectItem>
                <SelectItem value="cares_act">How are you reporting late payments if I am protected by the Cares Act?</SelectItem>
            </SelectGroup>
            <SelectGroup>
                <SelectLabel>Charge-Off Disputes</SelectLabel>
                <SelectItem value="balance_chargeoff">Balance and past due amount on a closed/Charge-Off account</SelectItem>
                <SelectItem value="third_party">Bought by 3rd party debt buyer but still showing balance</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
);

interface SelectDisputeInstructionProps {
    selectedInstruction: string;
    setSelectedInstruction: (value: string) => void;
}

const SelectDisputeInstruction = ({ selectedInstruction, setSelectedInstruction }: SelectDisputeInstructionProps) => (
    <Select value={selectedInstruction} onValueChange={setSelectedInstruction}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Instruction" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>For Deletion</SelectLabel>
                <SelectItem value="delete_immediately">Please Delete Immediately</SelectItem>
                <SelectItem value="violation_1692g">Please delete due to a violation of 15 U.S. Code 1692g - Validation of debts</SelectItem>
                <SelectItem value="consumer_rights_violation">This is a violation of my consumer rights, please delete immediately</SelectItem>
                <SelectItem value="not_mine">This account is not mine, Please remove it from my account immediately.</SelectItem>
            </SelectGroup>
            <SelectGroup>
                <SelectLabel>For Updating to Positive</SelectLabel>
                <SelectItem value="update_pays_agreed">Please Update to Pays Account As Agreed</SelectItem>
                <SelectItem value="update_never_late">Please Update to Never Late</SelectItem>
                <SelectItem value="update_paid_agreed">Please update to paid as agreed, never late.</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
);

export { SelectDisputeInstruction, SelectDisputeReason };
