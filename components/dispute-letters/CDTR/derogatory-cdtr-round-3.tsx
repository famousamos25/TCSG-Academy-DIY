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

const DerogatoryCDTRRound3 = (info: Props) => {

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

				<p className="py-1"><b>Subject:</b> Dispute and Request for Verification of Charge-Off Account Reporting
                </p>

				{/* Greeting */}
				<p>Dear {creditorName},</p>

				{/* Body */}
				<p>
                I am writing to challenge the reporting of a charge-off account that I believe has been inaccurately reported under my name.                </p>
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
                    Approximately 30 days ago, I initiated a dispute regarding this account with the credit bureaus, and it was subsequently verified. This verification process has significantly impacted me, and I am now requesting direct from you, as the reporting entity, documents or evidence substantiating the accuracy of this charge-off report.
                    </p>

					<p className="py-1">
                    I am specifically requesting documentation beyond a simple billing statement — evidence that conclusively proves the account&apos;s status and my association with said charge-off. Should you be unable to furnish such documentation, I respectfully request that this charge-off be immediately removed from my credit report, in compliance with credit reporting standards and regulations.
                    </p>

					<p className="py-1">
                    The integrity of the information reported to credit bureaus is of utmost importance, affecting consumers’ credit scores and financial opportunities. I trust you will treat this request with the seriousness it deserves and respond promptly.
                    </p>
                    <p className="py-1">
                    Thank you for your attention to this matter. I look forward to your swift response and resolution.                    </p>

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

export default DerogatoryCDTRRound3;
