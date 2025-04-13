/* eslint-disable @next/next/no-img-element */
"use client";

interface Props {
    clientName: string;
    clientAddress: string;
    clientCity: string;
    clientState: string;
    clientZIPCode: string;
    ssn: string;
    date: string;
    creditBureau: string;
    creditBureauAddress: string;
    creditBureauCity: string;
    creditBureauState: string;
    creditBureauZIPCode: string;
    reportedClientName: string;
    akaNames: string;
    reportedCurrentAddress: string;
    actualCurrentAddress: string;
    reportedPreviousAddresses: string;
    reportedEmployers: string;
    reportedDOB: string;
    actualDOB: string;
    ssnCard?: string;
    driverLicense?: string;
    proofOfAddress?: string;
}

const PersonalInformation = (info: Props) => {
    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        ssn,
        date,
        creditBureau,
        creditBureauAddress,
        creditBureauCity,
        creditBureauState,
        creditBureauZIPCode,
        reportedClientName,
        akaNames,
        reportedCurrentAddress,
        actualCurrentAddress,
        reportedPreviousAddresses,
        reportedEmployers,
        reportedDOB,
        actualDOB,
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
                </div>

                {/* Credit Bureau Info */}
                <div className="space-y-0.5">
                    <p className="font-bold">{creditBureau}</p>
                    <p>{creditBureauAddress}</p>
                    <p>{`${creditBureauCity}, ${creditBureauState}, ${creditBureauZIPCode}`}</p>
                </div>

                <p>{date}</p>

                <p><span className="font-bold">Subject: </span>Dispute of Inaccurate Personal Information on My Consumer File</p>

                <p>To Whom It May Concern:</p>

                <p>
                    I am writing to formally dispute inaccurate personal information that is currently being reported on my consumer file, as provided by your agency. I have recently reviewed my credit report and have identified erroneous details which are both incorrect and not a reflection of my personal history.
                </p>

                <p>
                    In accordance with the <span className="font-bold">Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681i</span>, I am asserting my right to challenge and dispute inaccurate information on my credit report. The FCRA mandates that each piece of information on a consumer's credit report must be accurate, complete, and within the credit reporting time frame.
                </p>

                <p>The specific inaccuracies I found on my report include:</p>

                <p className="font-bold text-red-500">Personal Information for {creditBureau}</p>

                <div className="space-y-1">
                    <p className="flex justify-between"><strong>NAME:</strong>{reportedClientName}</p>
                    <p>BS-30/31  </p>
                    <p>The only name I go by is {clientName}. Please remove any name you have in your system that does not match.</p>
                    <p className="flex justify-between"><strong>Also Known As:</strong> {akaNames}</p>
                </div>

                <div className="space-y-1">
                    <p className="flex justify-between"><strong>CURRENT ADDRESS:</strong> {reportedCurrentAddress}</p>
                    <p>BS-40, BS-42-44</p>
                    <p>REMOVE the reported Consumer’s Current Residence(s) of {reportedCurrentAddress} as my REQUISITE REPORTED CURRENT, CORRECT and COMPLETE Current Address is {actualCurrentAddress}. I DO NOT AUTHORIZE you to retain, nor report any not proven, true, correct, valid and required reported personal identifier information that is not in exact agreement with my submitted FACTUALLY CORRECT CURRENT PERSONAL IDENTIFIERS as indicated here.</p>
                </div>

                <div className="space-y-1">
                    <p className="flex justify-between"><strong>PREVIOUS RESIDENCE:</strong> {reportedPreviousAddresses}</p>
                    <p>BS-40, BS-42-44 </p>
                    <p>REMOVE the display reported Previous Residence(s) of {reportedPreviousAddresses} as my REQUISITE REPORTED CURRENT CORRECT COMPLETE Current Address is [CURRENT ADDRESS] . I DO NOT AUTHORIZE you to retain nor report any not proven true correct valid and required reported personal identifier information that is not in exact agreement with my submitted FACTUALLY CORRECT CURRENT PERSONAL IDENTIFIERS as indicated</p>
                </div>

                <div className="space-y-1">
                    <p className="flex justify-between"><strong>EMPLOYER(S):</strong> {reportedEmployers}</p>
                    <p></p>
                    <p>REMOVE the displayed Reported Employer(s) of {reportedEmployers} as my REQUISITE REPORTED CURRENT CORRECT COMPLETE Reported Employers is XXXXX. I DO NOT AUTHORIZE you to retain nor report any not proven true correct valid and required reported personal identifier information that is not in exact agreement with my submitted FACTUALLY CORRECT CURRENT PERSONAL IDENTIFIERS as indicated.</p>
                </div>

                <div className="space-y-1">
                    <p className="flex justify-between"><strong>Birth Year:</strong> {reportedDOB}</p>
                    <p> *BSCF40-45</p>
                    <p>REMOVE the displayed Date of Birth {reportedDOB}. My actual correct Date of Birth is: {actualDOB}.  I DO NOT AUTHORIZE you to retain nor report any not proven true correct valid and required reported personal identifier information that is not in exact agreement with my submitted FACTUALLY CORRECT CURRENT PERSONAL IDENTIFIERS as indicated</p>
                </div>

                <hr />
                <p>
                    I have attached relevant documentation that proves the inaccuracy of the aforementioned items. I kindly request that you investigate these discrepancies without delay. Pursuant to the FCRA, you are required to initiate the investigation within 30 days of receiving this letter.
                </p>

                <p>
                    Furthermore, if after your investigation, you find that the information is indeed inaccurate, I request that it be promptly corrected or deleted from my file. Also, I would appreciate it if you could provide me with a corrected copy of my credit report after the inaccuracies have been addressed.
                </p>

                <p>
                    Lastly, in accordance with the FCRA, if you cannot or do not verify the disputed information within the stipulated time frame, the information must be promptly deleted from my report.
                </p>

                <p>
                    I look forward to your prompt attention to this serious matter. Protecting the accuracy and integrity of my credit report is of utmost importance to me. Kindly inform me in writing of the outcome of your investigation.
                </p>

                <p>Thank you for your attention to this matter.</p>

                <p>Sincerely,</p>
                <p>{clientName}</p>

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

export default PersonalInformation;
