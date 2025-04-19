/* eslint-disable @next/next/no-img-element */
"use client";

interface Props {
    clientName: string,
    clientAddress: string,
    clientCity: string,
    clientState: string,
    clientZIPCode: string,
    creditorName: string;
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

const LatePaymentCDTRRound1 = (info: Props) => {

    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        creditorName,
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

                    <p className="my-1">{date}</p>
                </div>

                {/* Credit Bureau Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditorName}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                <p className="my-1"><b>Subject:</b> Request for Investigation and Documentation under the Fair Credit Billing Act
                </p>

                {/* Greeting */}
                <p>Dear {creditorName},</p>

                {/* Body */}
                <p className="py-1">
                I am writing to request a thorough investigation into the reporting of my account, which has been marked as late on multiple occasions across all three major credit bureaus.
                </p>
                <p className="py-1">
                Account Details:
                </p>

                {/* Account Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{accountName}</p>
                    <p className="font-medium">{accountNumber}</p>
                    <p>{reason}</p>
                    <p>{instruction}</p>
                </div>

                {/* Request */}
                <div className="space-y-4">
                    <p className="py-1">
                    The negative impact of this reporting became evident to me following a denial for credit at Wal-Mart, with the reason explicitly cited as the negative marks originating from your reporting. This incident has raised serious concerns about my future ability to obtain credit.
                    </p>
                    <p className="py-1">
                    In accordance with the Fair Credit Billing Act (FCBA), which stipulates that consumers have the right to request and obtain information about their accounts that have been reported, I am hereby requesting all pertinent information that your company has used as the basis for reporting my account as late. This includes, but is not limited to, payment histories, dates of alleged late payments, and any correspondence or notices sent to me regarding late payments.
                    </p>
                    <p className="py-1">
                    Given the serious implications of this matter on my financial health and creditworthiness, I expect that thirty days is a reasonable timeframe for your company to respond to this request. Should you be unable to provide the requested documentation, or if it is found that the negative reporting was indeed inaccurate, I kindly request that all such inaccuracies be rectified and that the incorrect information be deleted from my reports with Experian, TransUnion, and Equifax.
                    </p>
                    <p className="py-1">
                    I trust that your company will address this matter with the urgency and seriousness it warrants. Thank you for your prompt attention to this request, and I look forward to your cooperation in resolving this issue.
                    </p>
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

export default LatePaymentCDTRRound1;