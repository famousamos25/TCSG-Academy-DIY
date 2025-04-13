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

const DelegatoryCDTRRound1 = (info: Props) => {

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

				<p className="py-1"><b>Subject:</b> Verification Request as Per the Fair Credit Billing Act
                </p>

				{/* Greeting */}
				<p>Dear {creditBureau},</p>

				{/* Body */}
				<p>
                I am reaching out to address an issue regarding an account that appears to be erroneously linked to me as an authorized user. In light of this, I am exercising my rights under the Fair Credit Billing Act (FCBA) to demand a comprehensive investigation into this matter.
				</p>
                <p className="py-1">
                  Account Information:
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
                    I request a detailed record of all transactions related to this account, encompassing charges, payments, and any adjustments. Access to this information is essential for confirming the inaccuracy of the account&apos;s reported association with my financial identity.
					</p>

					<p className="py-1">
					If you are unable to provide the necessary documentation within 30 days of receiving this letter, I respectfully request that this account be removed from my credit reports with all reporting agencies. Such a measure is in line with your duty to ensure the accuracy of reported credit information.
					</p>

					<p className="py-1">
                    Thank you for your immediate attention to this request. I am eager to see this issue resolved swiftly and am hopeful for your prompt cooperation.
                    </p>

					<div className="pt-2">
						<p>Kind regards,</p>
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

export default DelegatoryCDTRRound1;
