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
    creditorName: string;
    creditorAddress: string;
    creditorCity: string;
    creditorState: string;
    creditorZIPCode: string;
    date: string;
    accountName: string;
    accountNumber: string;
    ssnCard?: string;
    driverLicense?: string;
    proofOfAddress?: string;
}

const CreditorAuthorizeUserLetter2 = (info: Props) => {
    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        ssn,
        dob,
        creditorName,
        creditorAddress,
        creditorCity,
        creditorState,
        creditorZIPCode,
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

                {/* Creditor Info */}
                <div className="space-y-0.5">
                    <p className="font-bold">{creditorName}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                <p>{date}</p>

                {/* Letter Body */}
                <p>
                    I am reaching out for the second time to request a comprehensive investigation into an account listed as an authorized user under my name. This account has been verified by your company as though I am the primary account holder, a situation that is both perplexing and incorrect, given that I have no contractual relationship with your company.
                </p>

                <div className="space-y-0.5">
                    <p className="mb-2">Account Details: </p>
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
                    Your continuous reporting of this account impacts my creditworthiness negatively, based on information that I believe to be inaccurately associated with me. I am particularly interested in understanding the evidence you have that suggests my ownership or authorization for this account.                </p>

                <p>
                    In accordance with the Fair Credit Reporting Act (FCRA), I am entitled to a thorough investigation of this matter. I expect this process to be completed, and a response provided, within 30 days of receipt of this letter. Failure to comply with this timeframe mandates, as per the FCRA, the removal of this disputed information from my credit profile.                </p>

                <p>
                    I appreciate your prompt attention to this matter and look forward to your cooperation in rectifying this issue as swiftly as possible.                </p>

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

export default CreditorAuthorizeUserLetter2;
