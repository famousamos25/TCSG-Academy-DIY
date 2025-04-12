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

const DelegatoryRound1 = (info: Props) => {

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

				{/* Greeting */}
				<p>Dear {creditBureau},</p>

				{/* Body */}
				<p>
					I received a copy of my credit report and found the following items to be errors. Here as follows are items in
					error:
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
					<p>
						Please <span className="font-bold">VALIDATE</span> this information with the creditors and{" "}
						<span className="font-bold">PROVIDE ME WITH ANY DOCUMENTATIONS</span> associated with these accounts,
						(i.e.an <span className="font-bold">ORIGINAL CONTRACT BEARING MY SIGNATURE</span>). I formally request that
						this information be immediately corrected or deleted from the credit file you maintain under my social
						security number. Please note that you have{" "}
						<span className="font-bold">30 days to complete your investigation</span>, as per the{" "}
						<span className="font-bold">FAIR CREDIT REPORTING ACT section 623(a)(3)</span>, and I am keeping CAREFUL
						record of your actions.{" "}
						<span className="font-bold">
							Failure to respond satisfactorily within 30 days of RECEIPT of this letter will result in a small claims
							action against your company. I will be seeking damages for:
						</span>
					</p>

					<div className="space-y-0.5 pl-4">
						<p>1.) Defamation</p>
						<p>2.) Violation Of The Fair Credit Reporting Act</p>
					</div>

					<p>
						P.S. Please be aware that depending upon your response, I may be detailing any potential issues with your
						company via the Better Business Bureau.
					</p>

					<p>* Please remove all non-account holding inquiries over 30 days old.</p>

					<p>Thank you for your cooperation in this matter,</p>

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

export default DelegatoryRound1;
