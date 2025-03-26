"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DISPUTE_TYPES } from "@/constants/dispute-types";
import { Badge, FileText, NetworkIcon } from "lucide-react";
import { useState } from "react";
import PersonalInformationDisputeDialog from "./personal-information-dispute";

const inquiriesData = [
    {
        creditor: "CBNA/THD",
        bureau: "EQFX",
        cdtr: "Not Found",
        date: "Nov 10, 2023",
        reason: "Under 15 US Code 1681b permissible purpose...",
        instruction: "Please Delete Immediately",
    },
    {
        creditor: "JPMCB CARD",
        bureau: "EXP",
        cdtr: "CDTR",
        date: "Feb 21, 2023",
        reason: "Under 15 US Code 1681b permissible purpose...",
        instruction: "Please Delete Immediately",
    },
    {
        creditor: "SALLIE MAE B",
        bureau: "TU",
        cdtr: "CDTR",
        date: "Oct 24, 2023",
        reason: "Under 15 US Code 1681b permissible purpose...",
        instruction: "Please Delete Immediately",
    },
    {
        creditor: "SYNCB/LOWES",
        bureau: "TU",
        cdtr: "CDTR",
        date: "Nov 8, 2023",
        reason: "Under 15 US Code 1681b permissible purpose...",
        instruction: "Please Delete Immediately",
    },
];

export default function DisputeTypes() {
    const [selectedDisputeType, setSelectedDisputeType] = useState<string | null>(null);
    const [selectedInquiries, setSelectedInquiries] = useState<Record<string, boolean>>({});
    const [selectedFilter, setSelectedFilter] = useState<string>("All");

    const handleDisputeTypeSelect = (type: string) => {
        setSelectedDisputeType(type);
    };

    const toggleInquirySelection = (index: number) => {
        setSelectedInquiries((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const filteredInquiries =
        selectedFilter === "All"
            ? inquiriesData
            : inquiriesData.filter((item) => item.bureau === selectedFilter);

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
                    open={true}
                    onOpenChange={() => setSelectedDisputeType(null)}
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

            {selectedDisputeType === "Inquiries" && (
                <div className="border rounded-lg p-6">
                    <div className="flex gap-2 items-center mb-4">
                        <Button
                            variant="outline"
                            className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                        >
                            Dispute All
                        </Button>

                        <RadioGroup
                            value={selectedFilter}
                            onValueChange={setSelectedFilter}
                            className="flex"
                        >
                            <Label className="flex items-center space-x-2">
                                <RadioGroupItem value="All" />
                                <span>All ({inquiriesData.length})</span>
                            </Label>
                            <Label className="flex items-center space-x-2">
                                <RadioGroupItem value="TU" />
                                <span>TU ({inquiriesData.filter((i) => i.bureau === "TU").length})</span>
                            </Label>
                            <Label className="flex items-center space-x-2">
                                <RadioGroupItem value="EXP" />
                                <span>EXP ({inquiriesData.filter((i) => i.bureau === "EXP").length})</span>
                            </Label>
                            <Label className="flex items-center space-x-2">
                                <RadioGroupItem value="EQFX" />
                                <span>EQFX ({inquiriesData.filter((i) => i.bureau === "EQFX").length})</span>
                            </Label>
                        </RadioGroup>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="border-b">
                                <TableHead className="text-slate-400 pl-6 text-left">
                                    <Checkbox
                                        checked={Object.values(selectedInquiries).every(Boolean)}
                                        onCheckedChange={() => {
                                            const allChecked = Object.values(selectedInquiries).every(Boolean);
                                            setSelectedInquiries(
                                                Object.fromEntries(filteredInquiries.map((_, i) => [i, !allChecked]))
                                            );
                                        }}
                                    />
                                </TableHead>
                                <TableHead className="text-slate-400 text-left">Creditor</TableHead>
                                <TableHead className="text-slate-400 text-left">Credit Bureau</TableHead>
                                <TableHead className="text-slate-400 text-left">CDTR</TableHead>
                                <TableHead className="text-slate-400 text-left">Date</TableHead>
                                <TableHead className="text-slate-400 text-left">Reason</TableHead>
                                <TableHead className="text-slate-400 text-left">Instruction</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInquiries.map((item, index) => (
                                <TableRow key={index} className="border-b">
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedInquiries[index] || false}
                                            onCheckedChange={() => toggleInquirySelection(index)}
                                        />
                                    </TableCell>
                                    <TableCell>{item.creditor}</TableCell>
                                    <TableCell className={item.bureau === "EQFX" ? "text-red-400" : item.bureau === "EXP" ? "text-blue-400" : "text-cyan-400"}>
                                        {item.bureau}
                                    </TableCell>
                                    <TableCell className="text-gray-500">{item.cdtr}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell className="text-gray-500">{item.reason}</TableCell>
                                    <TableCell className="text-gray-500">{item.instruction}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex justify-end space-x-4 mt-6">
                        <Button variant="outline" onClick={() => setSelectedDisputeType(null)}>
                            Close
                        </Button>
                        <Button
                            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                            disabled={!Object.values(selectedInquiries).some(Boolean)}
                        >
                            Create Inquiry Dispute
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
