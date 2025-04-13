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

const LatePaymentCDTRRound3 = (info: Props) => {

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

                <p className="my-1"><b>Subject:</b> Urgent Dispute of Inaccurate Account Reporting
                </p>

                {/* Greeting */}
                <p>Dear {creditBureau},</p>

                {/* Body */}
                <p className="py-1">
                I am writing to you with a matter of urgent concern regarding the accuracy of the account information your company has reported to the credit bureaus. Despite disputing this account with the credit bureaus 30 days ago, it was verified without any substantive evidence provided to me, adversely affecting my credit score and financial well-being.
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
                    The verification of this account, despite the discrepancies I&apos;ve noted, raises significant concerns. I respectfully request that your company provides me with detailed documentation validating the accuracy of the reported information. This should include, but not be limited to, any contracts, agreements, payment histories, and other relevant documents that can substantiate the late payments reported.
                    </p>
                    <p className="py-1">
                    Should your company be unable to furnish such evidence, I must insist, in accordance with the Fair and Accurate Credit Transactions Act (FACTA), that any inaccurately reported late payments be immediately rectified or the disputed account information be removed from my credit reports.
                    </p>
                    <p className="py-1">
                    The potential legal implications of failing to comply with the requirements for accurate reporting under FACTA and the Fair Credit Reporting Act (FCRA) are concerning. The continued presence of these inaccuracies on my credit report has already impeded my ability to secure a loan, causing undue financial and emotional stress.
                    </p>
                    <p className="py-1">
                    I urge your company to rectify my account by correcting any inaccuracies, specifically by updating my account status to reflect that I was never late on any payments. Failure to address this issue will compel me to seek legal advice and consider further action to protect my rights under the FCRA.                    
                    </p>
                    <p className="py-1">
                    I am prepared to take further action to protect my rights, including consulting with a consumer rights attorney, should this issue not be resolved in a manner that accurately reflects my credit history.
                    </p>
                    <p className="py-1">
                    I trust in your company&apos;s integrity and commitment to upholding the law by ensuring accurate credit reporting. I look forward to your prompt response and the resolution of this matter.
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

export default LatePaymentCDTRRound3;