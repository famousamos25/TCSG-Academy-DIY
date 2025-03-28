import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";


const disputeData = [
    { label: "Name", transunion: "AMOS CHOLIN BRAZAN", experian: "AMOS BRAZAN", equifax: "AMOS C BRAZAN" },
    { label: "Date Of Birth", transunion: "05/12/1985", experian: "12/31/1984", equifax: "05/12/1985" },
    { label: "Also Known As", transunion: "TAYLOR, AMOS, C", experian: "AMOS C TAYLOR", equifax: "AMOS CHOLIN BRAZAN, AMOS TAYLOR" },
    { label: "Former Name", transunion: "Not Reported", experian: "Not Reported", equifax: "Not Reported" },
    { label: "Current Address", transunion: "385 ASHANA DR COLLIERVILLE TN 38017", experian: "1138 N GERMANTOWN PKW # 101-225CORDOVA TN 380165872", equifax: "880 SCHILLING FARM RD APT 201 COLLIERVILLE TN 38017" },
    { label: "Previous Address", transunion: "880 SCHILLING FARM RD COLLIERVILLE TN 38017, 7825 GROVE CT GERMANTOWN TN 38138", experian: "7825 GROVE CT WGermantown TN 381383354, 385 ASHANA DR COLLIERVILLE TN 380171105", equifax: "7825 GROVE CT W APT 102 GERMANTOWN TN 38138, 385 ASHANA DR COLLIERVILLE TN 38017" },
    { label: "Employer", transunion: [{ value: "SELF", updated: "2023-10-25" }, { value: "THE CREDIT SOLUTION GROUP ACAD", updated: "2022-03-03" }], experian: [{ value: "FULL HOUSE ENTERTAINMENT", updated: "2021-05-01" }, { value: "MVSU", updated: "2007-07-01" }], equifax: [{ value: "FULL HOUSE ENTERTAIN", updated: "2024-07-01" }] },
];

export default function DisputeTableRow() {
    const [selectedDisputes, setSelectedDisputes] = useState<Record<string, boolean>>({});

    const toggleDispute = (key: string) => {
        setSelectedDisputes(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {disputeData.map((item, rowIndex) => (
                <TableRow key={rowIndex} className="border-b">
                    <TableCell className="font-medium pl-6 text-left">{item.label}</TableCell>
                    {(['transunion', 'experian', 'equifax'] as const).map((bureau) => (
                        <TableCell key={bureau} className="text-left">
                            {Array.isArray(item[bureau]) ? (
                                item[bureau].map((entry, index) => {
                                    const key = `${rowIndex}-${bureau}-${index}`;
                                    return (
                                        <div key={key} className="flex flex-col space-y-1">
                                            <div className="flex items-start space-x-2">
                                                <Checkbox
                                                    checked={selectedDisputes[key] || false}
                                                    onCheckedChange={() => toggleDispute(key)}
                                                />
                                                <span>{entry.value}</span>
                                            </div>
                                            {entry.updated && (
                                                <span className="text-xs text-gray-400 ml-6">(Date Updated: {entry.updated})</span>
                                            )}
                                            {selectedDisputes[key] && (
                                                <span
                                                    className="text-green-500 text-sm ml-6 cursor-pointer hover:underline"
                                                    onClick={() => toggleDispute(key)}
                                                >
                                                    Dispute
                                                </span>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            checked={selectedDisputes[`${rowIndex}-${bureau}`] || false}
                                            onCheckedChange={() => toggleDispute(`${rowIndex}-${bureau}`)}
                                        />
                                        <span>{item[bureau]}</span>
                                    </div>
                                    {selectedDisputes[`${rowIndex}-${bureau}`] && (
                                        <span
                                            className="text-green-500 text-sm ml-6 cursor-pointer"
                                            onClick={() => toggleDispute(`${rowIndex}-${bureau}`)}
                                        >
                                            Dispute
                                        </span>
                                    )}
                                </div>
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}


