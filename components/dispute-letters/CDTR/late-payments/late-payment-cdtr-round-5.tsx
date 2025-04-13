/* eslint-disable @next/next/no-img-element */
"use client";

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

const LatePaymentCDTRRound5 = (info: Props) => {

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

                    <p className="my-1">{date}</p>
                </div>

                {/* Credit Bureau Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditBureau}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                <p className="my-1"><b>Subject:</b> Request for Verification of Late Payment Reporting
                </p>

                {/* Greeting */}
                <p>Dear {creditBureau},</p>

                {/* Body */}
                <p className="py-1">
                I am writing to express my concern and dissatisfaction regarding the reporting of inaccurate late payment information on my credit report by your company. This erroneous information has significantly impacted my credit score and financial opportunities.
                </p>
                <p className="py-1">
                Account Details:
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
                    To address this issue, I am formally requesting a detailed breakdown of all transactions associated with this account, including payment dates, amounts, and any fees or charges applied. Additionally, I am asking for a copy of the original contract or application for this account, specifically seeking documentation that includes my signature to verify my consent and agreement to the terms.
                    </p>
                    <p className="py-1">
                    Given the critical nature of this matter, I believe that twenty days is a reasonable timeframe for your company to respond to this request with the necessary documentation. This will allow me to review the accuracy of the reported information thoroughly.
                    </p>
                    <p className="py-1">
                    Should your review and the provided documentation reveal discrepancies or inaccuracies in the late payment reporting, I kindly request that these errors be rectified immediately. The correction should reflect the accurate status of my account as not late, thereby amending the information reported to the three major credit bureaus.
                    </p>
                    <p className="py-1">
                    I trust that your company will take this matter seriously and act promptly to resolve the inaccuracies reported on my credit profile. Thank you in advance for your cooperation and attention to this urgent issue.
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

export default LatePaymentCDTRRound5;