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

const CreditorCarRepossessionLetter1 = (info: Props) => {
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
                <p>Dear Sir/Madam,</p>

                <p>
                I am writing to express my extreme dissatisfaction with your company's failure to address and remove an inaccurate authorized user account from my credit report. Despite my repeated requests for assistance, your organization has neglected to take action to rectify this issue.</p>

                <div className="space-y-0.5">
                    <p className="mb-2">The unauthorized account in question is as follows:</p>
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
                Despite my clear communication that I have no association with this account and the creditor's inability to provide proof of my ownership, your company continues to verify and report it. This failure to act has forced me to take matters into my own hands.
                </p>

                <p>
                Regrettably, due to your company's inaction and disregard for my rights as a consumer, I have no choice but to escalate this matter by filing complaints with the following entities:
                </p>
                <ul>
                    <li>- Federal Trade Commission (FTC)</li>
                    <li>- Better Business Bureau (BBB)</li>
                    <li>- Attorney General's Office (both in your state and mine)</li>
                    <li>- Consumer Financial Protection Bureau</li>
                    <li>- Department of Justice</li>
                    <li>- Office of the Comptroller of the Currency</li>
                    <li>- Consumer Action</li>
                    <li>- Consumer Federation of America</li>
                    <li>- Division of Credit Practices</li>
                    <li>- Advocates for Fair Credit Reporting</li>
                    <li>- State Senator</li>
                    <li>- Congress</li>
                    <li>- National Association of Consumer Advocates</li>
                    <li>- National Consumer Law League</li>
                </ul>

                <p>
                Furthermore, I intend to seek guidance from a consumer rights attorney to assist me in resolving this matter.
                </p>
                <p>
                Please be advised that this will be my final communication with your company regarding this issue. I demand, for the last time, the immediate removal of this inaccurate authorized user account from my credit report. Failure to comply will result in further escalation of this matter.
                </p>

                <p>I urge you to take this matter seriously and act swiftly to rectify this egregious error.</p>

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

export default CreditorCarRepossessionLetter1;
