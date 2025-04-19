/* eslint-disable @next/next/no-img-element */
"use client";

import { agencies, Agency } from "@/data/dispute-letters/agencies";

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
    agencies: Agency[]
}

const LatePaymentRound6 = (info: Props) => {

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
        accountNumber,
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
                I am writing to express my deep concern regarding your failure to conduct a proper investigation into the inaccurate late account on my credit report. Despite my repeated attempts to rectify this issue, your company has neglected to fulfill its obligations under the Fair Credit Reporting Act (FCRA).
                </p>
                <p className="py-1">
                I wish to inform you that I am currently consulting with a Fair Credit Reporting Act (FCRA) attorney to explore options for escalating this matter to the next level. According to the FCRA and the advice of legal counsel, credit bureaus are required to conduct a reasonable investigation into items presented by consumers. Your failure to do so constitutes a violation of the law.
                </p>
                <p className="py-1">
                 This letter serves as my final request for your company to abide by the law and conduct a proper investigation into the inaccurate late account. Failure to take appropriate action will compel me to instruct my FCRA attorney to proceed with escalating this issue. Additionally, I will be filing complaints with the following agencies:               
                </p>
                <ul className="list-disc space-y-0.5 ml-4">
                   {agencies.map((a,i)=><li key={i}>{a.name}</li>)}
                </ul>
                <p className="py-1">
                Below, I have provided details of the inaccurate late account:
                </p>

                {/* Account Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{accountName}</p>
                    <p className="font-medium">{accountNumber}</p>
                    <p>{reason}</p>
                    <p>{instruction}</p>
                </div>

                {/* Request */}
                <div className="space-y-4">
                    <p className="py-1">
                    I urge you to take this matter seriously and address it promptly. Your cooperation in resolving this issue is greatly appreciated.                    </p>
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

export default LatePaymentRound6;