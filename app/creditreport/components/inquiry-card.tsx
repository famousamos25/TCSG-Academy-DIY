"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Creditor, Inquiry } from '@/types/credit-report';
import { useState } from 'react';

interface Props { 
	inquiry: Inquiry;
	creditors: Creditor[]
}

const InquiryCard = ({ inquiry, creditors,  }: Props) => {
	const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

	const creditor = creditors.find((creditor) => creditor.subscriberCode === inquiry.subscriberNumber);	

	return (
		<Card className="p-6 overflow-hidden">
			<div className="flex_ items-start justify-between mb-4">
				<div className="flex items-center flex-wrap justify-between gap-2">
					<div>
						<div className="flex items-center">
							<h3 className="text-xl font-semibold text-brand-navy">
								{inquiry.subscriberName}
							</h3>
							
						</div>
					</div>

					<Button
						onClick={() => setIsDetailDialogOpen(true)}
						className='h-7 border-accent text-accent hover:text-white text-sm' variant={"outline"}
					>Details</Button>

				</div>
			</div>

			<Separator className='mb-3' />
			<div>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-gray-600">Credit Bureau:</span>
						<span className='truncate'>{inquiry.bureau}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Inquiry Date::</span>
						<span>${inquiry.inquiryDate}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Type of Business:</span>
						<span>{inquiry?.inquiryType}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Creditor Phone:</span>
						<span>{creditor?.telephone}</span>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default InquiryCard;
