/* eslint-disable @next/next/no-img-element */
"use client";
import { format } from "date-fns";

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

const InquiryRound1 = (info: Props) => {

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
				<p className="py-1">
                I am writing to address an issue I recently discovered upon reviewing my credit report. It has come to my attention that a creditor has made an inquiry into my credit report without my authorization, resulting in a decrease in my credit score.
				</p>

                <p className="py-1">
                I am concerned about the legality of this action. As far as I am aware, creditors are not permitted to pull a credit report without proper authorization from the individual. If this is indeed the case, I request that you promptly remove this unauthorized inquiry from my credit report.
                </p>
                <p className="py-1">
                Below, I have provided details of the unauthorized inquiry:
                </p>

				{/* Account Information */}
				<div className="space-y-0.5">
					<p className="font-medium">{accountName}</p>
					<p>Date of Inquiry: {format(new Date(date), "MM/dd/yyyy")}</p>
					<p>{reason}</p>
					<p>{instruction}</p>
				</div>

				{/* Request */}
				<div className="space-y-4">
					<p className="py-1">
                    I am eager to restore my credit score to its previous level as soon as possible, as I am currently in the process of seeking approval for important financial matters. Could you please provide an estimated timeframe for when the unauthorized inquiry will be removed from my credit report?
					</p>

					<p className="py-1">
                    Thank you for your attention to this matter. I look forward to your prompt response and resolution.
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

export default InquiryRound1;
