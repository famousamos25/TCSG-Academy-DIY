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

const CreditorAuthorizeUserLetter5 = (info: Props) => {
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
                <p>Subject: Request for Reinvestigation and Removal of Unauthorized Authorized User Account</p>
                <p>Dear {creditorName.toUpperCase()},</p>

                <p>
                I am writing to formally dispute and request the removal of an account listed on my credit report for which your company has mistakenly verified my association as an authorized user. This account, detailed below, has been incorrectly attributed to me:               </p>

                <div className="space-y-0.5">
                    <p className="mb-2">Account Details:</p>
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
                I wish to clarify that I have never opened an account with your company, nor have I consented to be added as an authorized user on any such account. This error has not only misrepresented my financial responsibilities but also significantly hindered my financial opportunities, affecting my ability to secure a home loan, employment, and credit approval.
                </p>

                <p>
                In light of these circumstances, I urge you to conduct a thorough investigation into this matter. Failure to comply with the Fair Credit Reporting Act (FCRA) by continuing to report inaccurate and damaging information compels me to consider all available legal remedies. This includes potential litigation for defamation and seeking declaratory relief under the FCRA, as supported by the precedent set in the case of Nelson vs. Chase Manhattan (Court Case Opinion No. 00-15946 CV-99-00290-D.C. by the US Court of Appeals 9th Circuit). The ruling underscores a creditor's duty to ensure the accuracy of reported information and affirms the consumer's right to legal action should their FCRA rights be violated.
                </p>

                <p>
                While I earnestly hope to resolve this issue without resorting to legal action, please be advised that I am prepared to take all necessary steps to rectify this situation and safeguard my rights.
                </p>

                <p>I kindly request that your company act promptly to investigate and correct this reporting error. I look forward to your cooperation in resolving this matter.</p>

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

export default CreditorAuthorizeUserLetter5;
