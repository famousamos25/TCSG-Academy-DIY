/* eslint-disable @next/next/no-img-element */
"use client";
import { format } from "date-fns";

interface Props {
    clientName: string,
    clientAddress: string,
    clientCity: string,
    clientState: string,
    clientZIPCode: string,
    creditorName: string;
    creditorAddress: string;
    creditorCity: string;
    creditorState: string;
    creditorZIPCode: string;
    date: string;
    accountName: string;
    accountNumber: string;
    reason: string;
    instruction: string;
    ssnCard: string;
    driverLicense: string;
    proofOfAddress: string;
}

const InquiryCDTRRound2 = (info: Props) => {

    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        creditorName,
        creditorAddress,
        creditorCity,
        creditorState,
        creditorZIPCode,
        date,
        reason,
        instruction,
        ssnCard,
        driverLicense,
        proofOfAddress
    } = info;
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md border border-gray-200">
            <div className="space-y-3 text-sm">
                {/* Client Information */}
                <div className="space-y-0.5">
                    <p className="font-bold">{clientName}</p>
                    <p>{clientAddress}</p>
                    <p>{`${clientCity}, ${clientState}, ${clientZIPCode}`}</p>
                    <p className="py-1">{date}</p>
                </div>

                {/* Credit Bureau Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditorName}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                {/* Date */}
                <p><b>Subject:</b> Second Request for Removal of Unauthorized Credit Inquiry
                </p>

                {/* Greeting */}
                <p>Dear {creditorName},</p>

                {/* Body */}
                <p className="py-1">
                I am writing to reiterate my concern and request regarding an unauthorized credit inquiry conducted by your company, which remains on my credit report despite my previous request for its investigation and removal.
                </p>

                {/* Account Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditorName}</p>
                    <p>Date of Inquiry: {format(new Date(date), "MM/dd/yyyy")}</p>
                    <p>{reason}</p>
                    <p>{instruction}</p>
                </div>

                {/* Request */}
                <div className="space-y-4">
                    <p className="py-1">
                    Upon reviewing my credit report recently, I was disappointed to find that the unauthorized inquiry has not been removed. This lack of action on your part suggests a disregard for my legal rights and financial reputation. Under the Fair Credit Reporting Act (FCRA), such inquiries require explicit consumer consent, and unauthorized inquiries can unjustly affect one&apos;s credit score.                    </p>
                    <p className="py-1">
                    I respectfully request once more that you provide me with documentation, specifically a contract or any form of written authorization, where I consented to allow your company to access my credit report. If you are unable to furnish this evidence or choose to disregard my request again, I will have no choice but to escalate the matter. I am prepared to file formal complaints with regulatory bodies, including the Federal Trade Commission (FTC) and the Consumer Financial Protection Bureau (CFPB), and to seek legal counsel to protect my rights.
                    </p>

                    <p className="py-1">
                    Please take this request seriously and act accordingly by removing the unauthorized inquiry from my credit report. I expect a prompt response and resolution to this matter within 30 days.
                    </p>

                    <p className="py-1">
                    Thank you for your immediate attention to this issue.
                    </p>

                    <div className="pt-2">
                        <p>Sincerely,</p>
                        <p>{clientName}</p>
                    </div>
                </div>

                <div className="pt-6">
                    <h2 className="text-2xl font-bold text-center mb-8">Enclosures</h2> 
                    {
                        ssnCard && (
                            <img src={ssnCard} alt="SSN Card" className='h-[200px] mt-2 w-auto object-cover' />
                        )
                    }
                    {
                        driverLicense && (
                            <img src={driverLicense} alt="Driver License/ID " className='h-[200px] mt-2 w-auto object-cover' />
                        )
                    }
                    {
                        proofOfAddress && (
                            <img src={proofOfAddress} alt="Proof Of Address" className='h-[200px] mt-2 w-auto object-cover' />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default InquiryCDTRRound2;
