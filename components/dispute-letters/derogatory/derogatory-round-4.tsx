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

const DelegatoryRound4 = (info: Props) => {

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
					<p>{ssn}</p>
					<p>{dob}</p>
				</div>

				{/* Credit Bureau Information */}
				<div className="space-y-0.5">
					<p className="font-medium">{creditBureau}</p>
					<p>{creditorAddress}</p>
					<p>{`${creditorCity}, ${creditorState}, ${creditorZIPCode}`}</p>
				</div>

				{/* Date */}
				<p>{date}</p>

				{/* Body */}
				<p>
                I am writing to bring to your attention a violation of the Fair Credit Reporting Act (FCRA) that I believe your organization has committed. Under 15 U.S. Code 1681n, individuals have rights to compensation for willful noncompliance by credit reporting agencies.
				</p>
                <p className="space-y-0.5">
                I accessed a copy of my credit report from your bureau and found several discrepancies and inaccuracies that have a significant impact on my creditworthiness and financial reputation. These errors include
                </p>

                {/* Account Information */}
				<div className="space-y-0.5">
					<p className="font-medium">{accountName}</p>
					<p>{accountNumber}</p>
					<p>{reason}</p>
                    <p>{instruction}</p>
				</div>

				{/* Request */}
				<div className="space-y-0.5">
					<p>
                    As per the FCRA, I kindly request that your bureau promptly investigate these inaccuracies and take the necessary steps to rectify them. I understand that the FCRA allows consumers to request a reinvestigation within 30 days of receiving a response from the Credit Bureaus.
					</p>
                    <p className="py-2">
                    Furthermore, I would like to remind you of the obligations imposed by the FCRA, which include conducting reasonable investigations into disputed items, correcting or deleting any inaccurate, incomplete, or unverifiable information, and notifying the furnisher(s) of this information about the dispute.
                    </p>
                    <p>
                    Should your bureau fail to uphold these legal obligations and rectify the inaccuracies within the prescribed timeline, I will be compelled to take further action and exercise my rights under the FCRA, which may include pursuing legal remedies.
                    </p>
                    <p className="py-2">
                    I trust that you will take this matter seriously and handle it with the utmost urgency and professionalism. I appreciate your prompt attention to this issue.
                    </p>
                    <p>
                    Please acknowledge receipt of this letter and notify me in writing of the actions taken to address these inaccuracies and discrepancies. 
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

export default DelegatoryRound4;
