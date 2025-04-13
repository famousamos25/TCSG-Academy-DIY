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

const AccountSoldLetter1 = (info: Props) => {
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
                    <p className="font-medium">{creditBureau}</p>
                    <p>{creditBureauAddress}</p>
                    <p>{`${creditBureauCity}, ${creditBureauState}, ${creditBureauZIPCode}`}</p>
                </div>

                <p>{date}</p>

                {/* Letter Body */}
                <p>Dear {creditBureau},</p>
                <p>
                    I am writing to address concerns regarding the accuracy of an account being reported by a furnisher.
                </p>
                <p>
                    Upon reviewing my credit report, I noticed that the furnisher is reporting an account as accurate, despite my
                    belief that they may not have legal standing to do so.
                </p>

                <div className="space-y-0.5">
                    <p className="font-medium">{accountName}</p>
                    <p>Account Number: {accountNumber}</p>
                    <p>
                        Account was part of a bankruptcy and Account Rating and Account status should show closed and it does not. Please delete.
                    </p>
                    <p>
                        Under 15 U.S.C. 1681i Paragraph (5), any information disputed by a consumer or an item of the information is
                        found to be inaccurate or incomplete or cannot be verified, the consumer reporting agency shall (i) promptly delete.
                    </p>
                </div>

                <p>
                    While I am not a legal expert, it seems improbable that the furnisher would have the legal authority to validate
                    an account they no longer own. This leads me to question the accuracy of the reported information.
                </p>
                <p>
                    I kindly request that you investigate this matter thoroughly and take appropriate action to correct any inaccuracies
                    in my credit report associated with this account.
                </p>
                <p>Thank you for your attention to this matter.</p>

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

export default AccountSoldLetter1;
