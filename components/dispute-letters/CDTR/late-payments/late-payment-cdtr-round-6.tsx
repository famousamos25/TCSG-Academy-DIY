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

const LatePaymentCDTRRound6 = (info: Props) => {

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

                    <p className="my-1">{date}</p>
                </div>

                {/* Credit Bureau Information */}
                <div className="space-y-0.5">
                    <p className="font-medium">{creditBureau}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                <p className="my-1"><b>Subject:</b> Inquiry Regarding Verification Process of Disputed Late Payments
                </p>

                {/* Greeting */}
                <p>Dear {creditBureau},</p>

                {/* Body */}
                <p className="py-1">
                    I am reaching out to address a matter of significant concern regarding the reporting of late payments on my credit report for the account listed below. Despite disputing these late payments with all three major credit bureaus, the information has been verified as accurate each time. This outcome has prompted me to question the verification process employed by the bureaus, as it appears they may not have conducted a thorough investigation in accordance with the Fair Credit Reporting Act (FCRA).
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
                        The FCRA mandates that credit bureaus must contact the furnisher of information—in this case, your company—during the investigation of a consumer dispute. My concern lies in whether this procedural step was indeed taken, as my experiences suggest the bureaus may rely on previous verifications rather than re-contacting creditors for each new dispute.
                    </p>
                    <p className="py-1">
                        Given the importance of accurate credit reporting to my financial health, I am seeking clarification from your company on this matter. Specifically, I would like to know: <br />
                        - Did the credit bureaus contact you regarding the disputed late payments on my account? <br />
                        - If so, what information was provided to them that verified the accuracy of the late payments?
                    </p>
                    <p className="py-1">
                        Understanding the source of the verification will greatly assist me in determining the appropriate course of action to rectify this issue. If it is found that the bureaus did not contact you as part of their investigation, I will direct my efforts towards holding them accountable for failing to comply with the FCRA. Conversely, if the bureaus did indeed verify this information with your company, I must then address the accuracy of the information you provided.                    </p>
                    <p className="py-1">
                        Please respond to this inquiry as soon as possible. Your cooperation is crucial in helping me resolve these discrepancies and protect my credit rights. Should I not receive a response, I will be forced to consider that the late payment information reported by your company may indeed be inaccurate, necessitating further action on my part.
                    </p>
                    <p className="py-1">
                        Thank you for your attention to this urgent matter. I look forward to your prompt response.
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

export default LatePaymentCDTRRound6;