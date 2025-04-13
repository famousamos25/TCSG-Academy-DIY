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

const AccountSoldLetter4 = (info: Props) => {
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
                <p>Dear {creditBureau},</p>
                <p>
                    I am writing to express my frustration and disappointment regarding the unresolved issue with the account listed below. Despite my previous attempts to rectify this matter, the problem persists, causing significant emotional distress.
                </p>

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
                    In my last communication with you, I made it clear that I would escalate this matter to the Federal Trade Commission (FTC) if the issue was not resolved. I followed through on my word and filed a complaint with the FTC.
                </p>

                <p>
                    Furthermore, as per your recommendation, I contacted the furnisher regarding the verified account. However, they failed to respond to my request for information. According to my understanding, if the furnisher cannot verify the accuracy of an item being reported, it must be removed from my credit report.
                </p>

                <p>
                    The continued presence of this inaccurate account is not only impacting my ability to obtain credit but is also causing me significant emotional stress. I have researched other agencies that protect consumers against inaccurate reporting, and I am prepared to file complaints if necessary.
                </p>

                <p>
                    Therefore, I urge you to take immediate action to resolve this issue. Failure to do so will leave me with no choice but to file complaints with the following agencies:
                </p>

                <ul className="list-none pl-0">
                    <li>- Better Business Bureau (BBB)</li>
                    <li>- Attorney General</li>
                    <li>- Attorney General in your state</li>
                    <li>- Consumer Financial Protection Bureau</li>
                    <li>- Justice Department</li>
                </ul>

                <p>
                    I expect a prompt response and resolution to this matter.
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

export default AccountSoldLetter4;
