/* eslint-disable @next/next/no-img-element */
"use client";

interface Props {
    clientName: string,
    clientAddress: string,
    clientCity: string,
    clientState: string,
    clientZIPCode: string,
    ssn: string;
    dob: string;
    creditBureau: string;
    creditorAddress: string;
    creditorCity: string;
    creditorState: string;
    creditorZIPCode: string;
    date: string;
    accountName: string;
    accountNumber: string;
    reason: string;
    instruction: string;
    ssnCard: string;
    driverLicense: string;
    proofOfAddress: string;
}

const DelegatoryCDTRRound6 = (info: Props) => {

    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        creditBureau,
        creditorAddress,
        creditorCity,
        creditorState,
        creditorZIPCode,
        date,
        accountName,
        accountNumber,
        reason,
        instruction,
        ssnCard,
        driverLicense,
        proofOfAddress
    } = info;
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md border border-gray-200">
            <div className="space-y-3 text-sm">
                {/* Client Information */}
                <div className="space-y-0.5">
                    <p className="font-bold">{clientName}</p>
                    <p>{clientAddress}</p>
                    <p>{`${clientCity}, ${clientState}, ${clientZIPCode}`}</p>
                    <p className="py-1">{date}</p>
                </div>

                {/* Credit Bureau Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditBureau}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                <p className="py-1"><b>Subject:</b>Urgent: Resolution Required for Inaccurate Charge-Off Reporting
                </p>

                {/* Greeting */}
                <p>Dear {creditBureau},</p>

                {/* Body */}
                <p>
                I am writing to you with a matter of urgent concern, addressed directly to the department head. Despite my attempts to resolve an issue regarding a charge-off account through your dispute department, the inaccuracies remain uncorrected.
                </p>
                <p className="py-1">
                    Account Details:
                </p>
                {/* Account Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{accountName}</p>
                    <p>{accountNumber}</p>
                    <p>{reason}</p>
                    <p>{instruction}</p>
                </div>

                {/* Request */}
                <div className="space-y-4">
                    <p className="py-1">
                    It has come to my attention that the investigations carried out by the credit bureaus might not always adhere to the rigorous standards set forth by law. In light of this, I am currently consulting with a consumer rights attorney to determine the liable party for the inaccurate information that continues to tarnish my credit report.
                    </p>

                    <p className="py-1">
                    I kindly request your cooperation in identifying the party responsible for this discrepancy. This information is crucial for taking the appropriate legal steps to rectify the inaccuracies reported under my name and hold the responsible entity accountable.
                    </p>

                    <p className="py-1">
                    I urge your prompt response to this serious matter. Your immediate attention and a resolution to this issue are imperative, as it significantly impacts my financial standing and creditworthiness.                  
                    </p>
                    
                    <p className="py-1">
                    Thank you for your cooperation and swift action in this regard.                    </p>

                    <div className="pt-2">
                        <p>Sincerely,</p>
                        <p>{clientName}</p>
                    </div>
                </div>

                <div className="pt-6">
                    <h2 className="text-2xl font-bold text-center mb-8">Enclosures</h2>
                    {
                        ssnCard && (
                            <img src={ssnCard} alt="SSN Card" className='h-[200px] mt-2 w-auto object-cover' />
                        )
                    }
                    {
                        driverLicense && (
                            <img src={driverLicense} alt="Driver License/ID " className='h-[200px] mt-2 w-auto object-cover' />
                        )
                    }
                    {
                        proofOfAddress && (
                            <img src={proofOfAddress} alt="Proof Of Address" className='h-[200px] mt-2 w-auto object-cover' />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default DelegatoryCDTRRound6;
