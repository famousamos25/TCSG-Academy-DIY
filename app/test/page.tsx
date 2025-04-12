"use client";

import DelegatoryRound1 from '@/components/dispute-letters/delegatory/delegatory-round-1';
import { DR1Data } from '@/data/dispute-letters/delegatory-round-1';
import { ReactNode } from 'react';

interface Props { }
const page = ({ }: Props) => {

	const letterTypes: { type: string; component: ReactNode; }[] = [
		{ type: "delegatoryRound1", component: <DelegatoryRound1 {...DR1Data} /> },
	];

	const currentLetter = "delegatoryRound1";
	return (
		<div className="container mx-auto p-6">
			{
				letterTypes?.find(l => l.type == currentLetter)?.component
			}

		</div>
	);
};

export default page;
