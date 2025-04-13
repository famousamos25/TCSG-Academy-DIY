"use client";

import DelegatoryCDTRRound1 from '@/components/dispute-letters/CDTR/derogatory-cdtr-round-1';
import DelegatoryCDTRRound2 from '@/components/dispute-letters/CDTR/derogatory-cdtr-round-2';
import DelegatoryCDTRRound3 from '@/components/dispute-letters/CDTR/derogatory-cdtr-round-3';
import DelegatoryCDTRRound4 from '@/components/dispute-letters/CDTR/derogatory-cdtr-round-4';
import DelegatoryCDTRRound5 from '@/components/dispute-letters/CDTR/derogatory-cdtr-round-5';
import DelegatoryCDTRRound6 from '@/components/dispute-letters/CDTR/derogatory-cdtr-round-6';
import InquiryCDTRRound1 from '@/components/dispute-letters/CDTR/inquiry/inquiry-letter-cdtr-round-1';
import InquiryCDTRRound3 from '@/components/dispute-letters/CDTR/inquiry/inquiry-letter-cdtr-round-3';
import InquiryCDTRRound2 from '@/components/dispute-letters/CDTR/inquiry/inquiry-letter-cdtr.round-2';
import LatePaymentCDTRRound1 from '@/components/dispute-letters/CDTR/late-payments/late-payment-cdtr-round-1';
import LatePaymentCDTRRound2 from '@/components/dispute-letters/CDTR/late-payments/late-payment-cdtr-round-2';
import LatePaymentCDTRRound3 from '@/components/dispute-letters/CDTR/late-payments/late-payment-cdtr-round-3';
import LatePaymentCDTRRound4 from '@/components/dispute-letters/CDTR/late-payments/late-payment-cdtr-round-4';
import LatePaymentCDTRRound5 from '@/components/dispute-letters/CDTR/late-payments/late-payment-cdtr-round-5';
import LatePaymentCDTRRound6 from '@/components/dispute-letters/CDTR/late-payments/late-payment-cdtr-round-6';
import DelegatoryRound1 from '@/components/dispute-letters/derogatory/derogatory-round-1';
import DelegatoryRound2 from '@/components/dispute-letters/derogatory/derogatory-round-2';
import DelegatoryRound3 from '@/components/dispute-letters/derogatory/derogatory-round-3';
import DelegatoryRound5 from '@/components/dispute-letters/derogatory/derogatory-round-5';
import DelegatoryRound6 from '@/components/dispute-letters/derogatory/derogatory-round-6';
import DelegatoryRound4 from '@/components/dispute-letters/derogatory/derogatory-round-4';
import InquiryRound1 from '@/components/dispute-letters/inquiry/inquiry-letter-round-1';
import InquiryRound2 from '@/components/dispute-letters/inquiry/inquiry-letter-round-2';
import InquiryRound3 from '@/components/dispute-letters/inquiry/inquiry-letter-round-3';
import LatePaymentRound1 from '@/components/dispute-letters/late-payments/late-payment-round-1';
import LatePaymentRound2 from '@/components/dispute-letters/late-payments/late-payment-round-2';
import LatePaymentRound3 from '@/components/dispute-letters/late-payments/late-payment-round-3';
import LatePaymentRound4 from '@/components/dispute-letters/late-payments/late-payment-round-4';
import LatePaymentRound5 from '@/components/dispute-letters/late-payments/late-payment-round-5';
import LatePaymentRound6 from '@/components/dispute-letters/late-payments/late-payment-round-6';
import { agencies } from '@/data/dispute-letters/agencies';
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
		{ type: "InquiryRound1", component: <InquiryRound1 {...DR1Data} /> },
		{ type: "InquiryRound2", component: <InquiryRound2 {...DR1Data} /> },
		{ type: "InquiryRound3", component: <InquiryRound3 {...DR1Data} /> },
		{ type: "LatePaymentRound1", component: <LatePaymentRound1 {...DR1Data} /> },
		{ type: "LatePaymentRound2", component: <LatePaymentRound2 {...DR1Data} /> },
		{ type: "LatePaymentRound3", component: <LatePaymentRound3 {...DR1Data} /> },
		{ type: "LatePaymentRound4", component: <LatePaymentRound4 {...DR1Data} /> },
		{ type: "LatePaymentRound5", component: <LatePaymentRound5 {...DR1Data} /> },
		{ type: "LatePaymentRound6", component: <LatePaymentRound6 agencies={agencies} {...DR1Data} /> },
		{ type: "DelegatoryCDTRRound1", component: <DelegatoryCDTRRound1 {...DR1Data} /> },
		{ type: "DelegatoryCDTRRound2", component: <DelegatoryCDTRRound2 {...DR1Data} /> },
		{ type: "DelegatoryCDTRRound3", component: <DelegatoryCDTRRound3 {...DR1Data} /> },
		{ type: "DelegatoryCDTRRound4", component: <DelegatoryCDTRRound4 {...DR1Data} /> },
		{ type: "DelegatoryCDTRRound5", component: <DelegatoryCDTRRound5 {...DR1Data} /> },
		{ type: "DelegatoryCDTRRound6", component: <DelegatoryCDTRRound6 {...DR1Data} /> },
		{ type: "InquiryCDTRRound1", component: <InquiryCDTRRound1 {...DR1Data} /> },
		{ type: "InquiryCDTRRound2", component: <InquiryCDTRRound2 {...DR1Data} /> },
		{ type: "InquiryCDTRRound3", component: <InquiryCDTRRound3 {...DR1Data} /> },
		{ type: "LatePaymentCDTRRound1", component: <LatePaymentCDTRRound1 {...DR1Data} /> },
		{ type: "LatePaymentCDTRRound2", component: <LatePaymentCDTRRound2 {...DR1Data} /> },
		{ type: "LatePaymentCDTRRound3", component: <LatePaymentCDTRRound3 {...DR1Data} /> },
		{ type: "LatePaymentCDTRRound4", component: <LatePaymentCDTRRound4 {...DR1Data} /> },
		{ type: "LatePaymentCDTRRound5", component: <LatePaymentCDTRRound5 {...DR1Data} /> },
		{ type: "LatePaymentCDTRRound6", component: <LatePaymentCDTRRound6 {...DR1Data} /> },

	];

	const currentLetter = "LatePaymentCDTRRound6";
	return (
		<div className="container mx-auto p-6">
			{
				letterTypes?.find(l => l.type == currentLetter)?.component
			}

		</div>
	);
};

export default page;
