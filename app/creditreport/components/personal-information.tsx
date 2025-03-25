import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const PersonalInformation = ({ personalInfo }: any) => {
	const [isRevealed, setIsRevealed] = useState(false);

	return (
		<Card className="text-black mb-5 shadow-sm">
			<CardHeader onClick={() => setIsRevealed(prev => !prev)} className="flex cursor-pointer flex-row items-center justify-between pb-5 border-b ">
				<div>
					<CardDescription className="text-slate-400 text-sm">Personal Info</CardDescription>
					<CardTitle className="text-slate-600 text-lg">Personal Information</CardTitle>
				</div>
				<div className="rounded-full p-2">
					<ChevronRight className={cn("h-4 w-4 text-slate-400 transition-all", {
						"transform rotate-90": isRevealed
					})} />
				</div>
			</CardHeader>
			<CardContent className={cn("px-0 py-0  h-0 transition-all opacity-0 overflow-hidden", {
				"h-auto opacity-100": isRevealed
			})}>
				<Table>
					<TableHeader>
						<TableRow className="border-b ">
							<TableHead className="text-slate-400 pl-6"></TableHead>
							<TableHead className="text-cyan-400">TRANSUNION</TableHead>
							<TableHead className="text-blue-400">EXPERIAN</TableHead>
							<TableHead className="text-red-400">EQUIFAX</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow className="border-b ">
							<TableCell className="font-medium pl-6">Name</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.names?.find((name: any) => name.hasOwnProperty('transUnion'))?.transUnion}
							</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.names?.find((name: any) => name.hasOwnProperty('experian'))?.experian}
							</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.names?.find((name: any) => name.hasOwnProperty('equifax'))?.equifax}
							</TableCell>
						</TableRow>

						<TableRow className="border-b ">
							<TableCell className="font-medium pl-6">Date Of Birth</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.dateOfBirth?.find((name: any) => name.hasOwnProperty('transUnion'))?.transUnion}
							</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.dateOfBirth?.find((name: any) => name.hasOwnProperty('experian'))?.experian}
							</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.dateOfBirth?.find((name: any) => name.hasOwnProperty('equifax'))?.equifax}
							</TableCell>
						</TableRow>

						<TableRow className="border-b ">
							<TableCell className="font-medium pl-6">Previous Address</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.previousAddresses?.find((name: any) => name.hasOwnProperty('transUnion'))?.transUnion}
							</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.previousAddresses?.find((name: any) => name.hasOwnProperty('experian'))?.experian}
							</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.previousAddresses?.find((name: any) => name.hasOwnProperty('equifax'))?.equifax}
							</TableCell>
						</TableRow>

						<TableRow className="border-b ">
							<TableCell className="font-medium pl-6">Current Address</TableCell>
							<TableCell className="">
								{personalInfo?.currentAddresses?.find((name: any) => name.hasOwnProperty('transUnion'))?.transUnion}
							</TableCell>
							<TableCell className="">
								{personalInfo?.currentAddresses?.find((name: any) => name.hasOwnProperty('experian'))?.experian}
							</TableCell>
							<TableCell className="">
								{personalInfo?.currentAddresses?.find((name: any) => name.hasOwnProperty('equifax'))?.equifax}
							</TableCell>
						</TableRow>
						<TableRow className="border-b ">
							<TableCell className="font-medium pl-6">Employer</TableCell>
							<TableCell className="text-left">
								{personalInfo?.employer?.transUnion?.map((emp: any, idx: number) => (
									<div key={idx}>
										<p className='text-[12px] text-neutral-600'>{emp.name}</p>
										<p className='text-sm text-neutral-800'>(Date updated: {emp.dateUpdated})</p>
									</div>
								))}
							</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.employer?.experian?.map((emp: any, idx: number) => (
									<div key={idx} className='mt-1'>
										<p className='text-[12px] text-neutral-600'>{emp.name}</p>
										<p className='text-sm text-neutral-800'>(Date updated: {emp.dateUpdated})</p>
									</div>
								))}
							</TableCell>
							<TableCell className="text-center_">
								{personalInfo?.employer?.equifax?.map((emp: any, idx: number) => (
									<div key={idx}>
										<p className='text-[12px] text-neutral-600'>{emp.name}</p>
										<p className='text-sm text-neutral-800'>(Date updated: {emp.dateUpdated})</p>
									</div>
								))}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default PersonalInformation;