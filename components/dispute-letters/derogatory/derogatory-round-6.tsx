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

const DelegatoryRound6 = (info: Props) => {

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

                <p className="py-1">{date}</p>

                <p className="py-1">
                  Dear {creditBureau},
                </p>

                <p className="py-1"> Subject: Notice of Violation of the Fair Credit Reporting Act (FCRA) <b>Under 15 USC 1681q - Obtaining information under false pretenses</b> </p>
                <p className="py-1">Dear Sir/Madam,</p>

				{/* Body */}
				<p className="py-2">
                I am writing to bring to your attention a violation of the Fair Credit Reporting Act (FCRA) that I believe your organization has committed. It has come to my attention that your bureau has obtained information under false pretenses, in direct violation of 15 USC 1681q.			
                 </p>
                <p className="space-y-0.5">
                Upon reviewing my credit report, I have discovered inaccurate and misleading information that appears to have been obtained under deceptive means. These false pretenses include the following: </p>
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
                    It is essential to emphasize that obtaining information under false pretenses is expressly prohibited by the FCRA, which is designed to protect the integrity and accuracy of consumer credit reports. Credit reporting agencies have a responsibility to conduct themselves in an ethical and lawful manner, ensuring that the information reported is obtained legitimately and for appropriate purposes.                    </p>
                    <p className="py-1">
                    I kindly request that your bureau conduct an immediate investigation into these allegations and takes the necessary actions to rectify the inaccuracies resulting from the information obtained under false pretenses. Furthermore, I expect your organization to implement corrective measures to prevent such violations from occurring in the future. </p>
                    <p className="py-1">
                    As a consumer whose rights have been violated under the FCRA, I reserve the right to pursue legal remedies and report this violation to the appropriate regulatory authorities should your bureau fail to address this matter promptly.                    </p>
                    <p className="py-1">
                    I appreciate your attention to this matter and expect a prompt resolution. Please acknowledge receipt of this letter and notify me in writing of the actions taken to rectify the inaccuracies and discrepancies.                    </p>
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

export default DelegatoryRound6;
