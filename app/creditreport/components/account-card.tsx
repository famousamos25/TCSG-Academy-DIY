"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { AccountDetailsDialog } from './account-details-dialog';

interface Props { 
	values: any;
	account: any;
}

const AccountCard = ({ values, account }: Props) => {
	const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

	return (
		<Card className="p-6 overflow-hidden">
			<div className="flex_ items-start justify-between mb-4">
				<div className="flex items-center flex-wrap justify-between gap-2">
					<div>
						<div className="flex items-center">
							<h3 className="text-xl font-semibold text-brand-navy">
								{values.creditorName}
							</h3>
							<Badge variant={account.accountStatus === 'Open' ? 'success' : 'secondary'}>
								{values.accountStatus}
							</Badge>
						</div>
						<p className="text-sm text-gray-600 line-clamp-1 runcate flex items-center gap-2">
							Account #{values.accountNumber} <br />{values.accountType}
						</p>
					</div>

					<Button
						onClick={() => setIsDetailDialogOpen(true)}
						className='h-7 border-accent text-accent hover:text-white text-sm' variant={"outline"}
					>Details</Button>

				</div>
				<div className="text-right">
					<div className="text-sm font-bold text-brand-navy">
						${values?.balance}
					</div>
					<p className="text-sm text-gray-600">Current Balance</p>
				</div>
			</div>

			<Separator className='mb-3' />
			<div>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-gray-600">Account Number:</span>
						<span className='truncate'>{values?.accountNumber}</span>
					</div>
					{values.creditLimit && (
						<div className="flex justify-between">
							<span className="text-gray-600">Credit Limit</span>
							<span>${values?.creditLimit?.toLocaleString()}</span>
						</div>
					)}
					<div className="flex justify-between">
						<span className="text-gray-600">Balance:</span>
						<span>${values?.balance}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Payment Status:</span>
						<span>{values?.paymentStatus}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Account Status:</span>
						<span>{values?.accountStatus}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Account Type:</span>
						<span>{values?.accountType}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Date Opened:</span>
						<span>{values?.dateOpened}</span>
					</div>
				</div>
			</div>

			{
				isDetailDialogOpen && (
					<AccountDetailsDialog 
						isOpen={isDetailDialogOpen}
						onOpenChange={() => setIsDetailDialogOpen(false)}
						account={account}
					/>
				)
			}
		</Card>
	);
};

export default AccountCard;
