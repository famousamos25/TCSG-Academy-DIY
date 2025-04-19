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
}

const AccountSoldLetter3 = (info: Props) => {
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
                    I am writing to express my frustration and confusion regarding the handling of a dispute I initiated with your company.
                </p>
                <p>
                    Upon reviewing my credit report, I noticed discrepancies in the information reported by all three credit bureaus. I promptly challenged this inaccurate information with each bureau, including yours. However, while the other two bureaus have successfully removed the disputed accounts from my credit report, your company has failed to do so.
                </p>
                <p>The accounts in question are as follows:</p>

                {/* Account Info */}
                <div className="space-y-0.5">
                    <p className="font-bold">{accountName}</p>
                    <p>Account Number: {accountNumber}</p>
                    <p>
                        Account was part of a bankruptcy and Account Rating and Account status should show closed and it does not. Please delete.
                    </p>
                    <p>
                        Under 15 U.S.C. 1681i Paragraph (5) any information disputed by a consumer or an item of the information is
                        found to be inaccurate or incomplete or cannot be verified the consumer reporting agency shall (i) promptly delete
                    </p>
                </div>

                <p>
                    I am puzzled as to why your company has not taken similar action to rectify this issue, especially considering that the other bureaus have acknowledged the inaccuracy of the reported information. It seems inconceivable that the same creditor would verify the accuracy of the information with two bureaus but not with yours.
                </p>
                <p>
                    This discrepancy is not only causing frustration but is also hindering my ability to obtain credit approval. I urge you to promptly investigate this matter and take the necessary steps to correct the error on my credit report.
                </p>
                <p>
                    I want to emphasize that I am not one to complain without cause, but I require resolution of this error immediately. I have been informed that failure to rectify errors may warrant a complaint to the Federal Trade Commission (FTC) about your company. While I hope to avoid such action, I will not hesitate to pursue it if necessary.
                </p>
                <p>
                    Please contact the furnisher to address this discrepancy and ensure that my credit report accurately reflects my credit history.
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

export default AccountSoldLetter3;
