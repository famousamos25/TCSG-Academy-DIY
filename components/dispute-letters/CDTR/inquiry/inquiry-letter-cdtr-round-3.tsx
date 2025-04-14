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

const InquiryCDTRRound3 = (info: Props) => {

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
                <p><b>Subject:</b> Final Notice Regarding Unauthorized Credit Inquiry
                </p>

                {/* Greeting */}
                <p>Dear {creditorName},</p>

                {/* Body */}
                <p className="py-1">
                This correspondence serves as my final communication to your company concerning an unauthorized credit inquiry that has adversely affected my credit score. Despite my previous attempts to resolve this issue through multiple letters requesting an investigation and proof of authorization, my concerns have not been addressed.                
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
                    The absence of a response or evidence from your company confirming my authorization for this credit pull is a clear violation of the Fair Credit Reporting Act (FCRA), which stipulates substantial penalties for such infractions, including a fine of up to $1,000.00 per violation.
                    </p>
                    <p className="py-1">
                    Given the lack of action and response to my previous requests, I am left with no alternative but to consider legal recourse. If the inquiry is not removed from my credit report within five days from the date of this letter, I will proceed to consult with a consumer rights attorney to explore my legal options. Additionally, I intend to file complaints against your company with regulatory bodies, including but not limited to the Federal Trade Commission (FTC) and the Consumer Financial Protection Bureau (CFPB).
                    </p>

                    <p className="py-1">
                    I urge your immediate attention to this matter and expect prompt resolution to avoid further legal actions. Your cooperation in rectifying this issue by removing the unauthorized inquiry from my credit report is not only appreciated but necessary.
                    </p>

                    <p className="py-1">
                    Thank you for your understanding and prompt action on this urgent matter.
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

export default InquiryCDTRRound3;
