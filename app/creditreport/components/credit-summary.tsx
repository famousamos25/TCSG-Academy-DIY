import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const CreditSummaryDashboard = ({ creditData }: any) => {

	const [isRevealed, setIsRevealed] = useState(false);

	const metrics = [
		{ name: 'Total Accounts', key: 'totalAccounts' },
		{ name: 'Open Accounts', key: 'openAccounts' },
		{ name: 'Closed Accounts', key: 'closeAccounts' },
		// { name: 'Collection Accounts', key: 'collectionAccounts' },
		{ name: 'Delinquent Accounts', key: 'delinquentAccounts' },
		{ name: 'Derogatory Accounts', key: 'derogatoryAccounts' },
		{ name: 'Total Balance', key: 'totalBalances', format: true },
		{ name: 'Total Payments', key: 'totalMonthlyPayments', format: true },
		// { name: 'Public Records', key: 'publicRecords' },
		// { name: 'Total Inquiries', key: 'totalInquiries' }
	];

	const formatValue = (value: any, format: any) => {
		if (value === null || !value) return '-';
		if (format) return `$${new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(value)}`;
		return value;
	};

	return (
		<Card className="text-black mb-5 shadow-sm">
			<CardHeader onClick={() => setIsRevealed(prev => !prev)} className="flex cursor-pointer flex-row items-center justify-between pb-2 border-b ">
				<div>
					<CardDescription className="text-slate-400 text-sm">Overview</CardDescription>
					<CardTitle className="text-slate-600 text-lg">Credit Summary</CardTitle>
				</div>
				<div className="rounded-full p-2">
					<ChevronRight className={cn("h-4 w-4 text-slate-400 transition-all", {
						"transform rotate-90": isRevealed
					})} />
				</div>
			</CardHeader>
			<CardContent className={cn("px-0 py-0 h-0 transition-all opacity-0 overflow-hidden", {
				"h-auto opacity-100": isRevealed
			})}>
				<Table>
					<TableHeader>
						<TableRow className="border-b ">
							<TableHead className="text-slate-400 pl-6"></TableHead>
							<TableHead className="text-cyan-400 text-center">TRANSUNION</TableHead>
							<TableHead className="text-blue-400 text-center">EXPERIAN</TableHead>
							<TableHead className="text-red-400 text-center">EQUIFAX</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{metrics.map((metric, idx) => (
							<TableRow key={idx} className="border-b ">
								<TableCell className="font-medium pl-6">{metric.name}</TableCell>
								<TableCell className="text-center">
									{formatValue(creditData?.transUnion?.[metric.key], metric.format)}
								</TableCell>
								<TableCell className="text-center">
									{formatValue(creditData?.experian?.[metric.key], metric.format)}
								</TableCell>
								<TableCell className="text-center">
									{formatValue(creditData?.equifax?.[metric.key], metric.format)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default CreditSummaryDashboard;