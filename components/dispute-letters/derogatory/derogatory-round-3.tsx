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

const DerogatoryRound3 = (info: Props) => {

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
				<p>RE: Dispute Authorization and Multiple Violations of Fair Credit Reporting Act
                </p>

				{/* Body */}
				<p>
                I, {clientName}, hereby authorize this dispute. It is important to note that this dispute was not sent by an unauthorized third party or &quot;credit clinic.&quot;
				</p>

				{/* Account Information */}
				<div className="space-y-0.5">
					<p>I am writing to address the ongoing violations of the Fair Credit Reporting Act (FCRA) that have yet to be resolved, despite my previous dispute letter. The violations are as follows:
                    </p>
				</div>

                <div className="space-y-0.5">
                    <p>
                    FCRA Section 607(a)(4) - Consumer Right to Privacy: I have the sole authority to determine what information should be considered private. I insist that my hard inquiries and account information not be shared on my credit report.
                    </p>

                </div>

                <div className="space-y-0.5">
                  <p>In addition to the violations, I remind you of the previous violations outlined in my initial dispute letter, including the violation of the Debt Collection Practices Act, Acquiring Location Information Regulations, Timely Payments Regulations, Finance Charge Determination, and Credit Report Permissible Purposes. 
                    These violations require your immediate attention and resolution.</p>
                </div>
                <div className="space-y-0.5">
                    <p>Once again, I demand that you take immediate action to address these violations and fulfill the following requests:</p>
                </div>

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
                    I cannot stress enough the urgency of this matter.
                     Failure to comply with my requests and resolve these violations will leave me with no choice but to pursue legal remedies available under the Fair Credit Reporting Act.
					</p>
                    <p className="my-1">
                    I expect a prompt response and a definitive plan of action from you. Your cooperation in rectifying these issues is greatly appreciated.
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

export default DerogatoryRound3;
