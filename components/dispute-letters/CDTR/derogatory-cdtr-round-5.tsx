/* eslint-disable @next/next/no-img-element */
"use client";

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

const DelegatoryCDTRRound5 = (info: Props) => {

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
                    <p className="py-1">{date}</p>
                </div>

                {/* Credit Bureau Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditorName}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                <p className="py-1"><b>Subject:</b>Request for Documentation and Verification of Reported Charge-Off
                </p>

                {/* Greeting */}
                <p>Dear {creditorName},</p>

                {/* Body */}
                <p>
                    I am writing to express my concern regarding the charge-off account that your company has reported to the credit bureaus, which is linked to my financial records. This matter has become a significant concern for me, and I seek clarity and resolution.
                </p>
                <p className="py-1">
                    Account Details:
                </p>
                {/* Account Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{accountName}</p>
                    <p>{accountNumber}</p>
                    <p>{reason}</p>
                    <p>{instruction}</p>
                </div>

                {/* Request */}
                <div className="space-y-4">
                    <p className="py-1">
                        To address this issue thoroughly, I am requesting the following information and documents to ensure the accuracy and validity of the reported charge-off:
                    </p>

                    <p className="py-1">
                        1. A detailed transaction history for this account, outlining all charges, payments, and adjustments.
                    </p>

                    <p className="py-1">
                        2. A copy of the original contract or application for this account, specifically one that includes my signature, to verify my agreement and responsibility for the alleged debt.                    
                    </p>

                    <p className="py-1">
                        3. Documentation indicating the exact date the account was officially charged off.
                    </p>

                    <p className="py-1">
                        This request is made in pursuit of my rights under the Fair Credit Reporting Act (FCRA), which mandates the accuracy and fairness of information reported by creditors and collection agencies. The integrity of my credit report is of utmost importance, and it is imperative that all reported items are accurate and fully substantiated.
                    </p>

                    <p className="py-1">
                        Should there be any discrepancies or if your company is unable to provide the requested documentation, I kindly ask for the immediate deletion of this charge-off from my credit report to rectify the inaccuracies currently affecting my credit score and financial opportunities.
                        I am diligently documenting all correspondence related to this matter and anticipate your prompt response and cooperation in resolving this issue.
                    </p>
                    
                    <p className="py-1">
                    Thank you for your attention to this important matter.
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

export default DelegatoryCDTRRound5;
