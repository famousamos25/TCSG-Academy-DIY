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

const DerogatoryCDTRRound2 = (info: Props) => {

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

				<p className="py-1"><b>Subject:</b> Request for Reinvestigation of Account Reporting Inaccuracies
                </p>
                <p className="py-1">
                 To Whom It May Concern
                </p>
				{/* Greeting */}
				<p>Dear {creditorName},</p>

				{/* Body */}
				<p>
                I am writing to formally request a reinvestigation of an account listed on my credit report, which I believe contains inaccuracies in its reporting.				</p>
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
                    As mandated by credit reporting laws, it is imperative that all information reported to the credit bureaus is accurate and fully correct. The obligation to maintain the integrity of credit information is a cornerstone of consumer credit rights.
                    </p>

					<p className="py-1">
                    It has come to my attention that there is a discrepancy in how this account is reported across the three major credit bureaus. Specifically, a charge-off is reported on one bureau&apos;s report but is absent from the others. This inconsistency raises questions about the accuracy of the reported information. Furthermore, I was not provided with any prior notice of your intention to report this charge-off, which I believe may constitute a breach of the requirement for an early warning notice.					</p>

					<p className="py-1">
                    Given these concerns, I respectfully request that you remove the inaccurately reported charge-off from my credit report. Ensuring accurate reporting is crucial for upholding the fairness and integrity of credit information, which significantly impacts consumer&apos;s financial opportunities.                   
                    </p>
                    <p className="py-1">
                    I appreciate your prompt attention to this matter and look forward to your cooperation in resolving these reporting discrepancies. Please inform me of the outcome of your investigation at your earliest convenience.
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

export default DerogatoryCDTRRound2;
