/* eslint-disable @next/next/no-img-element */
"use client";

interface Props {
    clientName: string;
    clientAddress: string;
    clientCity: string;
    clientState: string;
    clientZIPCode: string;
    clientPhone: string;
    ssn: string;
    creditorName: string;
    creditorAddress: string;
    creditorCity: string;
    creditorState: string;
    creditorZIPCode: string;
    date: string;
    ssnCard?: string;
    driverLicense?: string;
}

const SecurityFreeze = (info: Props) => {
    const {
        clientName,
        clientAddress,
        clientCity,
        clientState,
        clientZIPCode,
        ssn,
        clientPhone,
        creditorName,
        creditorAddress,
        creditorCity,
        creditorState,
        creditorZIPCode,
        date,
        ssnCard,
        driverLicense,
    } = info;

    return (
        <div className="w-full">
            <div className="space-y-3 text-sm">
                {/* Client Info */}
                <div className="space-y-0.5">
                    <p className="font-bold">{clientName}</p>
                    <p>{clientAddress}</p>
                    <p>{`${clientCity}, ${clientState}, ${clientZIPCode}`}</p>
                    <p>{ssn}</p>
                </div>

                {/* Creditor Info */}
                <div className="space-y-0.5">
                    <p className="font-bold">{creditorName}</p>
                    <p>{creditorAddress}</p>
                    <p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
                </div>

                <p>{date}</p>

                {/* Letter Body */}
                <p className="font-bold">
                    PER THE FAIR CREDIT REPORTING ACT Section 605A. [15 U.S.C. 1681c-1]:
                </p>

                <p>
                    I am sending you this letter to initiate my request for your company to place a security freeze and suppress from sharing <span className="font-bold">ANY</span> information about me: <strong>{clientName}</strong>.
                </p>

                <p>
                    I do not consent nor authorize the sharing of my information to the public, specifically with data aggregators who are looking to collect information on my behalf.
                </p>

                <p>
                    I would like to have my entire credit file <span className="font-bold">REMOVED</span> from your data institution. Please complete my following requests:
                </p>

                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        Provide my <span className="font-bold">Full Consumer File Disclosure</span> of my credit profile: A complete overview, the set of documents & procedures and snapshot of my character including any credit information in association to my name and/or address listed in this document.
                    </li>
                    <li>
                        Place a <span className="font-bold">Security Freeze</span> and suppress from sharing of any information about me to any other parties, unless otherwise expressly permitted by me in writing.
                    </li>
                    <li>
                        Once completed, kindly write back no later than (5) days to confirm that you have in fact, placed a security freeze on my information as well as provide me with the information needed to verify the details of my information suppression.
                    </li>
                </ul>

                <p>My <span className="font-bold">Personal Information</span> is clearly shown below:</p>

                <div className="space-y-1">
                    <p><span className="font-bold">FULL NAME:</span> {clientName}</p>
                    <p><span className="font-bold">PHONE:</span> {clientPhone}</p>
                    <p><span className="font-bold">SOCIAL SECURITY NUMBER:</span> {ssn}</p>
                    <p><span className="font-bold">FULL CURRENT ADDRESS:</span> {`${clientAddress}, ${clientCity}, ${clientState}, ${clientZIPCode}`}</p>
                </div>

                <p className="mt-4">
                    After this credit freeze has been filed, please send me written confirmation to the address listed above.
                </p>

                <p className="mt-4">
                    Sincerely,
                </p>
                <p>{clientName}</p>

                <p className="flex text-center font-bold mt-4">
                    Note: Attached you will find my drivers license. Please do not retain on record. Upon confirmation of my identity, you will need to purge the copy of the Drivers License attached. I do not authorize your company to store or share any of my Personal Identification.
                </p>

                {/* Enclosures */}
                <div className="pt-6">
                    <h2 className="text-2xl font-bold text-center mb-8">Personal Information</h2>
                    {ssnCard && (
                        <img src={ssnCard} alt="SSN Card" className="h-[200px] mt-2 w-auto object-cover" />
                    )}
                    {driverLicense && (
                        <img src={driverLicense} alt="Driver License/ID" className="h-[200px] mt-2 w-auto object-cover" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecurityFreeze;
