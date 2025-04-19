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

const CreditorAuthorizeUserLetter3 = (info: Props) => {
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
                <p>Subject: Urgent Request for New Investigation and Removal of Unauthorized Trade Line</p>
                <p>Attention: Supervisor</p>
                <p>Dear {creditorName.toUpperCase()},</p>

                <p>
                    I am writing to express my continued distress and dissatisfaction with your company's repeated failure to address and rectify an issue I have raised on multiple occasions: the erroneous presence of an authorized user tradeline on my credit report, which I have categorically stated does not belong to me.
                </p>

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
                    The ongoing inaction by your company not only contravenes consumer protection laws but also inflicts significant emotional distress upon me. The persistence of this error hinders my financial opportunities, notably affecting my ability to secure a car loan, and exacerbates stress for my family and me.
                </p>

                <p>
                    Given the gravity of this situation and the potential legal implications of willfully reporting inaccurate information—as stipulated by the Fair Credit Reporting Act (FCRA)—I hereby request, with utmost urgency, that you conduct a new, thorough investigation into this matter. Additionally, I demand the following specific documentation as proof of your claims:
                </p>

                <ol className="list-decimal pl-6">
                    <li>A copy of the original credit agreement bearing my signature, affirming my consent and participation.</li>
                    <li>A detailed billing statement explicitly listing my name, to validate your reporting.</li>
                </ol>

                <p>
                    Should you fail to provide the requested documentation or continue to report this inaccurate trade line, I will have no option but to escalate the matter by filing complaints with regulatory bodies including, but not limited to, the FTC, BBB, both state and your state's Attorney Generals, the Consumer Financial Protection Bureau, the Justice Department, the Office of the Comptroller of Currency, Consumer Action, the Consumer Federation of America, the Division of Credit Practices, and Advocates for Fair Credit Reporting.
                </p>

                <p>
                    I expect this trade line to be removed from my credit report within 10 days from the receipt of this letter, failing which I will proceed with the aforementioned complaints without further notice.
                </p>

                <p>I trust you will treat this matter with the seriousness and urgency it warrants.</p>

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

export default CreditorAuthorizeUserLetter3
