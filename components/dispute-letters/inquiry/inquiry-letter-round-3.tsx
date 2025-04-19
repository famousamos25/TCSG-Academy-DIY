/* eslint-disable @next/next/no-img-element */
"use client";
import { format } from "date-fns";

interface Props {
    clientName: string,
    clientAddress: string,
    clientCity: string,
    clientState: string,
    clientZIPCode: string,
    ssn: string;
    dob: string;
    creditBureau: string;
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

const InquiryRound3 = (info: Props) => {

    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        ssn,
        dob,
        creditBureau,
        creditorAddress,
        creditorCity,
        creditorState,
        creditorZIPCode,
        date,
        accountName,
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
                    <p>{ssn}</p>
                    <p>{dob}</p>
                </div>

                {/* Credit Bureau Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditBureau}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                {/* Date */}
                <p>{date}</p>

                {/* Greeting */}
                <p>Dear {creditBureau},</p>

                {/* Body */}
                <p className="py-1">
                I am writing to express my continued frustration regarding the unauthorized inquiry on my credit report, which has yet to be removed despite my previous communications.
                </p>
                <p className="py-1">
                Despite my efforts to dispute this inquiry with the creditor and provide evidence of its unauthorized nature, it remains on my credit report, causing undue stress and damage to my financial standing.
                </p>

                {/* Account Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{accountName}</p>
                    <p>Date of Inquiry: {format(new Date(date), "MM/dd/yyyy")}</p>
                    <p>{reason}</p>
                    <p>{instruction}</p>
                </div>

                {/* Request */}
                <div className="space-y-4">
                    <p className="py-1">
                    As your company has failed to take appropriate action to rectify this situation, I am left with no choice but to escalate this matter further. I intend to file complaints with the following agencies: Federal Trade Commission (FTC), attorney general, and Consumer Financial Protection Bureau (CFPB). 
                    </p>
                    <p className="py-1">
                    It is deeply concerning to me that both your company and the creditor have failed to uphold my rights in this matter. I feel that my rights are being violated, and I refuse to tolerate this any longer.
                    </p>
                    <p className="py-1">
                    I demand that the unauthorized inquiry be promptly removed from my credit report within 30 days from the date of this letter. Failure to do so will leave me with no option but to seek legal advice to explore all available legal remedies.
                    </p>
                    <p className="py-1">
                    This will be my final correspondence on this matter. I expect prompt action and resolution.
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

export default InquiryRound3;