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

const InquiryCDTRRound1 = (info: Props) => {

    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        creditBureau,
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
                    <p className="font-medium">{creditBureau}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                {/* Date */}
                <p><b>Subject:</b> Unauthorized Credit Inquiry Removal Request
                </p>

                {/* Greeting */}
                <p>Dear {creditBureau},</p>

                {/* Body */}
                <p className="py-1">
                I am writing to address an issue that has come to my attention upon reviewing my credit reports. It appears that an inquiry made by your company is listed without my recall of authorizing such an action. I do not remember applying for credit or authorizing your company to access my credit report. As you are aware, per the Fair Credit Reporting Act (FCRA), consumer permission is required for such inquiries, and unauthorized ones are against the law.
                </p>

                {/* Account Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditBureau}</p>
                    <p>Date of Inquiry: {format(new Date(date), "MM/dd/yyyy")}</p>
                    <p>{reason}</p>
                    <p>{instruction}</p>
                </div>

                {/* Request */}
                <div className="space-y-4">
                    <p className="py-1">
                    I kindly request that you investigate this matter and remove the unauthorized inquiry from my credit reports maintained by Experian, TransUnion, and Equifax within 30 days. This action is necessary to correct my credit records and avoid any potential escalation of this matter, including complaints to regulatory authorities.
                    </p>
                    <p className="py-1">
                    I trust that this request aligns with your commitment to comply with all applicable laws and regulations governing credit reporting. I appreciate your prompt attention to this matter and expect a swift resolution.
                    </p>

                    <p className="py-1">
                     Thank you for your cooperation.
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

export default InquiryCDTRRound1;
