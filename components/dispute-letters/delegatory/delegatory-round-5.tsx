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

const DelegatoryRound5 = (info: Props) => {

	const {
		clientName,
		clientAddress,
		clientCity,
		clientState,
		clientZIPCode,
		ssn,
		dob,
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
					<p>{ssn} | {dob}</p>
				    <p>{date}</p>
				</div>

				{/* Credit Bureau Information */}
				<div className="space-y-0.5">
					<p className="font-medium">{creditBureau}</p>
					<p>{creditorAddress}</p>
					<p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
				</div>

                <p className="py-1">
                  Dear {creditBureau},
                </p>

                <p className="py-1"> Subject: Notice of Violation of the Fair Credit Reporting Act (FCRA) <b>Under 15 USC 1681o. Civil liability for negligent noncompliance</b> </p>
                <p className="pb-2">Dear Sir/Madam,</p>

				{/* Body */}
				<p>
                I am writing to inform you of a violation of the Fair Credit Reporting Act (FCRA) that I believe your organization has committed, specifically under 15 U.S. Code 1681o,
                 which pertains to civil liability for negligent noncompliance.				</p>
                <p className="space-y-0.5">
                Upon reviewing my credit report, I have identified several inaccuracies and discrepancies that have significant implications for my creditworthiness and financial well-being. These errors include:                </p>

                {/* Account Information */}
				<div className="space-y-0.5">
					<p className="font-medium">{accountName}</p>
					<p>{accountNumber}</p>
					<p>{reason}</p>
                    <p>{instruction}</p>
				</div>

				{/* Request */}
				<div className="space-y-0.5">
                    <p className="py-1">
                    Under the FCRA, credit reporting agencies are mandated to maintain accurate and up-to-date information about consumers. It is the responsibility of the credit bureaus to ensure the accuracy of the information they report. Negligent noncompliance with this obligation can result in civil liability under Section 1681o of the FCRA.
                    </p>
                    <p className="py-1">
                    I hereby request that your bureau initiates an immediate investigation into the inaccuracies outlined above. I expect your organization to take the necessary steps to rectify these errors and update my credit report accordingly, in compliance with the FCRA provisions. In addition, I request that you promptly furnish notification of the dispute and the resulting changes to any relevant data furnishers.                    </p>
                    <p className="py-1">
                    As an affected consumer, I am entitled to the protections and remedies provided by the FCRA. If your organization fails to address these inaccuracies within the prescribed timeline, I will not hesitate to exercise my rights under the law. This may include pursuing legal remedies and reporting this violation to the appropriate regulatory agencies.                    </p>
                    <p className="py-1">
                    I appreciate your attention to this matter and expect prompt resolution. Please acknowledge receipt of this letter and notify me in writing of the actions taken to rectify the inaccuracies and discrepancies
                    </p>
                    <p className="py-2">Thank you for your cooperation.
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

export default DelegatoryRound5;
