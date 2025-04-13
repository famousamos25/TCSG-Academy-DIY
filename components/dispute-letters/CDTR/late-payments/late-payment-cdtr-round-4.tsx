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

const LatePaymentCDTRRound4 = (info: Props) => {

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

                <p className="my-1"><b>Subject:</b> Request for Verification of Reporting Accuracy
                </p>

                {/* Greeting */}
                <p>Dear {creditBureau},</p>

                {/* Body */}
                <p className="py-1">
                I have recently reviewed my credit reports from all three major credit bureaus and have identified discrepancies with an account reported by your company. This matter has prompted me to seek clarification to ensure my consumer rights are upheld as outlined by federal regulations.
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
                    In accordance with guidelines from the Federal Trade Commission (FTC) and the mandates of the Fair Credit Reporting Act (FCRA), it is my understanding that all information furnished to credit bureaus must be meticulously accurate. Given the importance of this matter, I kindly request that you provide me with a comprehensive breakdown and documentation that validates the accuracy of the reported information for the account in question. This documentation should include, but not be limited to, payment histories, agreements, and any other relevant information that can substantiate your reporting.
                    </p>
                    <p className="py-1">
                    The FCRA stipulates significant penalties for furnishers who willfully report inaccurate information without rectifying these inaccuracies, including fines up to $1,000.00 per violation. It is in our mutual interest to ensure that all reported information is accurate and reflective of true account status.
                    </p>
                    <p className="py-1">
                    I trust that your company recognizes the gravity of this request and will take the necessary steps to provide the requested documentation or, if inaccuracies are found, make the appropriate corrections to my credit report promptly.
                    </p>
                    <p className="py-1">
                    Thank you for your attention to this matter. I look forward to your prompt and detailed response.                    </p>
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

export default LatePaymentCDTRRound4;