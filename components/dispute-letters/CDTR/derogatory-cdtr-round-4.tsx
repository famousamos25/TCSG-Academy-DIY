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

const DelegatoryCDTRRound4 = (info: Props) => {

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
					<p className="py-1">{date}</p>
				</div>

				{/* Credit Bureau Information */}
				<div className="space-y-0.5">
					<p className="font-medium">{creditorName}</p>
					<p>{creditorAddress}</p>
					<p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
				</div>

				<p className="py-1"><b>Subject:</b>Request for Documentation and Compliance with the Fair Credit Reporting Act
                </p>

				{/* Greeting */}
				<p>Dear {creditorName},</p>

				{/* Body */}
				<p>
                I am writing to express my concern over the continued reporting of a charge-off account on my credit report, which I believe to be inaccurately reported. In light of this, I am formally requesting documentation to verify the accuracy of this reporting, as is my right under the Fair Credit Reporting Act (FCRA).
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
                    It is imperative that I receive concrete evidence showing that your reporting of this charge-off is entirely accurate. My objective is to ensure that my rights under the FCRA are not being infringed upon, especially regarding accurate and fair credit reporting practices.
                    </p>

					<p className="py-1">
                    Given the serious implications of inaccurately reported credit information on my financial health, I urge your company to review this matter promptly. If the reporting of this account cannot be verified as accurate, I request its immediate deletion from my credit report to comply with the FCRA&apos;s requirements.
                    </p>

					<p className="py-1">
                    I appreciate your immediate attention to this request and expect a timely response to this matter. Ensuring the accuracy of credit reporting is not only a legal obligation but a matter of financial integrity and consumer trust.
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

export default DelegatoryCDTRRound4;
