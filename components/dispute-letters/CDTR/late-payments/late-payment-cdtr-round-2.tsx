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

const LatePaymentCDTRRound2 = (info: Props) => {

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

                    <p className="my-1">{date}</p>
                </div>

                {/* Credit Bureau Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditorName}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                <p className="my-1"><b>Subject:</b> Discrepancy in Late Payment Reporting and Request for Investigation
                </p>

                {/* Greeting */}
                <p>Dear {creditorName},</p>

                {/* Body */}
                <p className="py-1">
                Upon reviewing my credit reports from the three major credit bureaus, I have identified discrepancies in the reporting of late payments by your company. It is perplexing to find multiple late payments reported when such instances are not consistently reflected across my other credit reports. This inconsistency raises concerns about the accuracy of the reported information.                </p>
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
                    Furthermore, I have learned from the Federal Trade Commission (FTC) that there is a requirement for creditors to notify consumers within 30 days before or after negative information is reported to the credit bureaus. I do not recall receiving any such notification from your company, which brings into question compliance with the Fair Credit Reporting Act (FCRA).                    </p>
                    <p className="py-1">
                    I am formally requesting that your company initiate a new investigation into the reported late payments on my account. It is crucial to identify and correct any inaccuracies to ensure that my credit report accurately reflects my financial behavior and history.
                    </p>
                    <p className="py-1">
                    Additionally, I want to highlight that under the FCRA, failure to notify consumers about negative reporting, as well as reporting inaccurate information, may result in significant penalties, including fines. The impact of these reporting errors on my credit score has caused considerable stress and may hinder my financial opportunities.
                    </p>
                    <p className="py-1">
                    I urge your company to rectify my account by correcting any inaccuracies, specifically by updating my account status to reflect that I was never late on any payments. Failure to address this issue will compel me to seek legal advice and consider further action to protect my rights under the FCRA.                    
                    </p>
                    <p className="py-1">
                    I appreciate your prompt attention to this matter and expect a swift resolution. Please inform me of the outcome of your investigation and the steps your company will take to amend the reported information.
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

export default LatePaymentCDTRRound2;