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

const AccountSoldLetter5 = (info: Props) => {
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
                    Following your recent response to my dispute regarding the account listed below, I have come into possession of further pertinent information necessitating a correction of this inaccurately reported account.
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
                    It has come to my attention that the lender has confirmed my payments were made punctually, contradicting the information currently reflected in my credit report. While I acknowledge your reference to legal statutes in your response, it is imperative to highlight that under the Fair Credit Reporting Act (FCRA), I am entitled to dispute any information on my credit report that is inaccurate or incomplete.
                </p>

                <p>
                    For the fifth time, I am requesting a diligent investigation into this matter, given the new evidence at hand. Ignoring this dispute, especially in light of the additional information provided, compels me to consider escalating this issue further. Should there be no action on your part, I am prepared to file complaints with regulatory bodies including the Better Business Bureau (BBB), state Attorney Generals, the Consumer Financial Protection Bureau (CFPB), the Justice Department, the Office of the Comptroller of Currency, Consumer Action, the Consumer Federation of America, the Division of Credit Practices, and Advocates for Fair Credit Reporting.
                </p>
                <p>
                    Please note:
                </p>
                <ol className="list-decimal pl-4">
                    <li>The presumption of validity lies with my dispute unless you possess concrete evidence to the contrary. Should you lack such evidence and yet fail to investigate, this constitutes non-compliance with the FCRA.</li>
                    <li>The provision of new information from my end mandates a re-investigation of the disputed account. A failure to do so further indicates non-compliance on your part.</li>
                </ol>

                <p>
                    Continued inaction on this matter not only breaches the FCRA but also unjustly tarnishes my reputation.
                </p>

                <p>
                    I am meticulously documenting all exchanges regarding this dispute for potential further action. Given the circumstances, a 30-day window for the completion of this investigation seems both reasonable and sufficient.
                </p>

                <p>
                    I trust you will address this issue with the seriousness it deserves.
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

export default AccountSoldLetter5;
