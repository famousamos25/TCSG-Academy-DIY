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

const CarRepossessionLetter6 = (info: Props) => {
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
                <p>Dear {creditorName.toUpperCase()},</p>

                <p>I am writing to express my dissatisfaction with the manner in which my dispute has been handled by your company. Despite multiple attempts on my part to rectify inaccuracies on my credit report, I have encountered significant hurdles in achieving resolution.
                </p>
                <p>I wish to bring to your attention that I am currently seeking legal counsel regarding this matter under the Fair Credit Reporting Act (FCRA). As per the FCRA regulations and the advice of my legal counsel, it is incumbent upon your company to conduct a thorough and reasonable investigation into the disputed items presented by consumers. Regrettably, this has not been the case in my situation.</p>

                <p>I understand that your company receives numerous complaints similar to mine, and it may be tempting to simply forward this letter to your legal department. However, I must emphasize that I am fully prepared to escalate this matter to the appropriate authorities if a satisfactory resolution is not reached.</p>

                <p>Please be advised that failure to conduct a proper investigation and provide a substantive response to my dispute will compel me to pursue further legal action. I will not hesitate to engage my FCRA attorney and file complaints with the relevant regulatory bodies, including but not limited to the Federal Trade Commission (FTC), Better Business Bureau (BBB), Consumer Financial Protection Bureau (CFPB), and state Attorney General's office.</p>

                <p>To reiterate my dispute:</p>

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
                    I trust that you will take this matter seriously and undertake the necessary steps to address my concerns promptly and effectively. Your cooperation in resolving this issue is greatly appreciated.
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

export default CarRepossessionLetter6;
