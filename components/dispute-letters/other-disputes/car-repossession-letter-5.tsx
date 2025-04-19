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

const CarRepossessionLetter5 = (info: Props) => {
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
                <p>Dear {creditorName},</p>

                <p>I am writing to express my deep concern regarding the recent letter I received from your company stating that you have verified the inaccurate repossession account on my credit report. This news is deeply troubling, especially considering the new and relevant information I provided to your company, clearly demonstrating the inaccuracy of this account.              </p>

                <p>I am left wondering whether this new information was properly considered during your investigation, or if it was even passed on to the furnisher for review. The lack of transparency and apparent disregard for my efforts to rectify this situation is extremely frustrating and distressing. I diligently followed your instructions, only to receive another letter asserting the verification of the account, causing me significant stress and sleepless nights.</p>

                <p>It is disheartening to feel like just another number in your system, especially when the consequences of your actions directly impact my ability to care for my sick parents. I implore you to recognize the human element in these disputes and to conduct thorough and accurate investigations that truly reflect the individual circumstances of each case.</p>

                <p>I have done my own research on the procedures your company employs for handling disputes and have learned about the E-Oscar system. While I understand the need for efficient processes, I urge you not to rely solely on this system, as it may not always provide accurate results. As per the Federal Trade Commission (FTC) guidelines, it is imperative that your investigations are conducted with diligence and integrity, rather than simply echoing information provided by creditors and collection agencies.</p>

                <p>I am aware of my rights under the Fair Credit Reporting Act (FCRA), including the option to pursue legal action against credit bureaus for violations. However, I sincerely hope that we can resolve this matter amicably and without the need for further escalation.</p>

                <p>Therefore, I respectfully request that you conduct a new and thorough investigation into the repossession account in question, taking into account all relevant information provided.</p>

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
                    Please understand that if action is not taken to address this issue promptly, I will be left with no choice but to file additional complaints and seek legal advice from an FCRA attorney.
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

export default CarRepossessionLetter5;
