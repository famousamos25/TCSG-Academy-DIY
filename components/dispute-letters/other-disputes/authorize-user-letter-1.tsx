/* eslint-disable @next/next/no-img-element */
"use client";

interface Props {
    clientName: string;
    clientAddress: string;
    clientCity: string;
    clientState: string;
    clientZIPCode: string;
    ssn: string;
    dob: string;
    creditBureau: string;
    creditBureauAddress: string;
    creditBureauCity: string;
    creditBureauState: string;
    creditBureauZIPCode: string;
    date: string;
    accountName: string;
    accountNumber: string;
    ssnCard?: string;
    driverLicense?: string;
    proofOfAddress?: string;
};

const AuthorizeUserLetter1 = (info: Props) => {
    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        ssn,
        dob,
        creditBureau,
        creditBureauAddress,
        creditBureauCity,
        creditBureauState,
        creditBureauZIPCode,
        date,
        accountName,
        accountNumber,
        ssnCard,
        driverLicense,
        proofOfAddress,
    } = info;

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md border border-gray-200">
            <div className="space-y-3 text-sm">
                {/* Client Info */}
                <div className="space-y-0.5">
                    <p className="font-bold">{clientName}</p>
                    <p>{clientAddress}</p>
                    <p>{`${clientCity}, ${clientState}, ${clientZIPCode}`}</p>
                    <p>{ssn}</p>
                    <p>{dob}</p>
                </div>

                {/* Credit Bureau Info */}
                <div className="space-y-0.5">
                    <p className="font-bold">{creditBureau}</p>
                    <p>{creditBureauAddress}</p>
                    <p>{`${creditBureauCity}, ${creditBureauState}, ${creditBureauZIPCode}`}</p>
                </div>

                <p>{date}</p>

                {/* Letter Body */}
                <p>
                    I am writing to inquire about the accuracy of information being reported by one of your furnishers. Upon reviewing my credit report, I noticed discrepancies in the reporting of the following account:
                </p>

                <p>The following tradeline you are reporting concerning me is inaccurate and/or incomplete:</p>

                <div className="space-y-0.5">
                    <p className="font-bold">{accountName}</p>
                    <p>Account Number: {accountNumber}</p>
                    <p>
                        Account was part of a bankruptcy and Account Rating and Account status should show closed and it does not. Please delete.
                    </p>
                    <p>
                        Under 15 U.S.C. 1681i Paragraph (5), any information disputed by a consumer or an item of the information is found to be inaccurate or incomplete or cannot be verified, the consumer reporting agency shall (i) promptly delete.
                    </p>
                </div>

                <p>
                    It has come to my attention that the current reporting of this account may not be accurate, as the furnisher may no longer have legal standing to validate it. While I am not a legal expert, it appears that if the furnisher no longer possesses ownership of the account, their ability to validate its accuracy may be compromised.
                </p>

                <p>
                    Therefore, I kindly request that you investigate this matter and take appropriate action to rectify any inaccuracies. I urge you to either correct, modify, update, or delete the disputed information from my credit report.
                </p>

                <p>
                    Thank you for your prompt attention to this matter. I look forward to receiving confirmation of the resolution of this dispute.
                </p>

                <div className="pt-2">
                    <p>Sincerely,</p>
                    <p>{clientName}</p>
                </div>

                {/* Enclosures */}
                <div className="pt-6">
                    <h2 className="text-2xl font-bold text-center mb-8">Enclosures</h2>
                    {ssnCard && (
                        <img src={ssnCard} alt="SSN Card" className="h-[200px] mt-2 w-auto object-cover" />
                    )}
                    {driverLicense && (
                        <img src={driverLicense} alt="Driver License/ID" className="h-[200px] mt-2 w-auto object-cover" />
                    )}
                    {proofOfAddress && (
                        <img src={proofOfAddress} alt="Proof Of Address" className="h-[200px] mt-2 w-auto object-cover" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthorizeUserLetter1;
