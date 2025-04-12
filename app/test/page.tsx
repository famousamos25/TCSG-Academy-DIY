"use client";

import DelegatoryRound1 from '@/components/dispute-letters/delegatory/delegatory-round-1';
import DelegatoryRound2 from '@/components/dispute-letters/delegatory/delegatory-round-2';
import DelegatoryRound3 from '@/components/dispute-letters/delegatory/delegatory-round-3';
import DelegatoryRound5 from '@/components/dispute-letters/delegatory/delegatory-round-5';
import DelegatoryRound6 from '@/components/dispute-letters/delegatory/delegatory-round-6';
import DelegatoryRound4 from '@/components/dispute-letters/delegatory/dlegatory-round-4';
import { DR1Data } from '@/data/dispute-letters/delegatory-round-1';
import { ReactNode } from 'react';

interface Props { }
const page = ({ }: Props) => {

	const letterTypes: { type: string; component: ReactNode; }[] = [
		{ type: "delegatoryRound1", component: <DelegatoryRound1 {...DR1Data} /> },
		{ type: "delegatoryRound2", component: <DelegatoryRound2 {...DR1Data} /> },
		{ type: "delegatoryRound3", component: <DelegatoryRound3 {...DR1Data} /> },
		{ type: "delegatoryRound4", component: <DelegatoryRound4 {...DR1Data} /> },
		{ type: "delegatoryRound5", component: <DelegatoryRound5 {...DR1Data} /> },
		{ type: "delegatoryRound6", component: <DelegatoryRound6 {...DR1Data} /> },




	];

	const currentLetter = "delegatoryRound6";
	return (
		<div className="container mx-auto p-6">
			{
				letterTypes?.find(l => l.type == currentLetter)?.component
			}

		</div>
	);
};

export default page;
