"use client";

import DelegatoryRound1 from '@/components/dispute-letters/delegatory/delegatory-round-1';
import AccountSoldLetter1 from '@/components/dispute-letters/other-disputes/account-sold-letter-1';
import AccountSoldLetter2 from '@/components/dispute-letters/other-disputes/account-sold-letter-2';
import AccountSoldLetter3 from '@/components/dispute-letters/other-disputes/account-sold-letter-3';
import AccountSoldLetter4 from '@/components/dispute-letters/other-disputes/account-sold-letter-4';
import AccountSoldLetter5 from '@/components/dispute-letters/other-disputes/account-sold-letter-5';
import AccountSoldLetter6 from '@/components/dispute-letters/other-disputes/account-sold-letter-6';
import AuthorizeUserLetter1 from '@/components/dispute-letters/other-disputes/authorize-user-letter-1';
import AuthorizeUserLetter2 from '@/components/dispute-letters/other-disputes/authorize-user-letter-2';
import AuthorizeUserLetter3 from '@/components/dispute-letters/other-disputes/authorize-user-letter-3';
import AuthorizeUserLetter4 from '@/components/dispute-letters/other-disputes/authorize-user-letter-4';
import AuthorizeUserLetter5 from '@/components/dispute-letters/other-disputes/authorize-user-letter-5';
import AuthorizeUserLetter6 from '@/components/dispute-letters/other-disputes/authorize-user-letter-6';
import CarRepossessionLetter1 from '@/components/dispute-letters/other-disputes/car-repossession-letter-1';
import CarRepossessionLetter2 from '@/components/dispute-letters/other-disputes/car-repossession-letter-2';
import CarRepossessionLetter3 from '@/components/dispute-letters/other-disputes/car-repossession-letter-3';
import CarRepossessionLetter4 from '@/components/dispute-letters/other-disputes/car-repossession-letter-4';
import CarRepossessionLetter5 from '@/components/dispute-letters/other-disputes/car-repossession-letter-5';
import CarRepossessionLetter6 from '@/components/dispute-letters/other-disputes/car-repossession-letter-6';
import CreditorAuthorizeUserLetter1 from '@/components/dispute-letters/other-disputes/creditor-auth-user-letter-1';
import CreditorAuthorizeUserLetter2 from '@/components/dispute-letters/other-disputes/creditor-auth-user-letter-2';
import CreditorAuthorizeUserLetter3 from '@/components/dispute-letters/other-disputes/creditor-auth-user-letter-3';
import CreditorAuthorizeUserLetter4 from '@/components/dispute-letters/other-disputes/creditor-auth-user-letter-4';
import CreditorAuthorizeUserLetter5 from '@/components/dispute-letters/other-disputes/creditor-auth-user-letter-5';
import CreditorAuthorizeUserLetter6 from '@/components/dispute-letters/other-disputes/creditor-auth-user-letter-6';
import CreditorCarRepossessionLetter1 from '@/components/dispute-letters/other-disputes/creditor-car-repossession-letter1';
import PersonalInformation from '@/components/dispute-letters/personal-information';
import SecurityFreeze from '@/components/dispute-letters/security-freeze';
import { ASL1Data } from '@/data/dispute-letters/account-sold-letter-1';
import { ASL2Data } from '@/data/dispute-letters/account-sold-letter-2';
import { ASL3Data } from '@/data/dispute-letters/account-sold-letter-3';
import { ASL4Data } from '@/data/dispute-letters/account-sold-letter-4';
import { ASL5Data } from '@/data/dispute-letters/account-sold-letter-5';
import { AUL1Data } from '@/data/dispute-letters/authorize-user-letter-1';
import { AUL2Data } from '@/data/dispute-letters/authorize-user-letter-2';
import { AUL3Data } from '@/data/dispute-letters/authorize-user-letter-3';
import { AUL4Data } from '@/data/dispute-letters/authorize-user-letter-4';
import { AUL5Data } from '@/data/dispute-letters/authorize-user-letter-5';
import { AUL6Data } from '@/data/dispute-letters/authorize-user-letter-6';
import { CRL1Data } from '@/data/dispute-letters/car-repossession-letter-1';
import { CRL2Data } from '@/data/dispute-letters/car-repossession-letter-2';
import { CRL3Data } from '@/data/dispute-letters/car-repossession-letter-3';
import { CRL4Data } from '@/data/dispute-letters/car-repossession-letter-4';
import { CRL5Data } from '@/data/dispute-letters/car-repossession-letter-5';
import { CRL6Data } from '@/data/dispute-letters/car-repossession-letter-6';
import { CAUL1Data } from '@/data/dispute-letters/creditor-auth-user-letter-1';
import { CAUL2Data } from '@/data/dispute-letters/creditor-auth-user-letter-2';
import { CAUL3Data } from '@/data/dispute-letters/creditor-auth-user-letter-3';
import { CAUL4Data } from '@/data/dispute-letters/creditor-auth-user-letter-4';
import { CAUL5Data } from '@/data/dispute-letters/creditor-auth-user-letter-5';
import { CAUL6Data } from '@/data/dispute-letters/creditor-auth-user-letter-6';
import { CCRL1Data } from '@/data/dispute-letters/creditor-car-rep-letter1';
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
import { PIData } from '@/data/personal-information';
import { SFData } from '@/data/security-freeze';
import { ReactNode } from 'react';
import { DR2Data } from '@/data/dispute-letters/derogatory-round-2';
import { DR3Data } from '@/data/dispute-letters/derogatory-round-3';
import { DR4Data } from '@/data/dispute-letters/derogatory-round-4';
import { DR5Data } from '@/data/dispute-letters/derogatory-round-5';
import { DR6Data } from '@/data/dispute-letters/derogatory-round-6';
import { IR1Data } from '@/data/inquiry/inquiry-round-1';
import { IR2Data } from '@/data/inquiry/inquiry-round-2';
import { IR3Data } from '@/data/inquiry/inquiry-round-3';
import { LP1Data } from '@/data/late-payment/late-payment-round-1';
import { LP2Data } from '@/data/late-payment/late-payment-round-2';
import { LP3Data } from '@/data/late-payment/late-payment-round-3';
import { LP4Data } from '@/data/late-payment/late-payment-round-4';
import { LP5Data } from '@/data/late-payment/late-payment-round-5';
import { LP6Data } from '@/data/late-payment/late-payment-round-6';
import { CDTRDR1Data } from '@/data/CDTR/derogatory-cdtr-round-1';
import { CDTRDR2Data } from '@/data/CDTR/derogatory-cdtr-round-2';
import { CDTRDR3Data } from '@/data/CDTR/derogatory-cdtr-round-3';
import { CDTRDR4Data } from '@/data/CDTR/derogatory-cdtr-round-4';
import { CDTRDR5Data } from '@/data/CDTR/derogatory-cdtr-round-5';
import { CDTRDR6Data } from '@/data/CDTR/derogatory-cdtr-round-6';
import { ICDTRR1Data } from '@/data/CDTR/inquiry/inquiry-cdtr-round-1';
import { ICDTRR2Data } from '@/data/CDTR/inquiry/inquiry-cdtr-round-2';
import { ICDTRR3Data } from '@/data/CDTR/inquiry/inquiry-cdtr-round-3';
import { LPCDTRR1Data } from '@/data/CDTR/late-payment/late-payment-cdtr-round-1';
import { LPCDTRR2Data } from '@/data/CDTR/late-payment/late-payment-cdtr-round-2';
import { LPCDTRR3Data } from '@/data/CDTR/late-payment/late-payment-cdtr-round-3';
import { LPCDTRR4Data } from '@/data/CDTR/late-payment/late-payment-cdtr-round-4';
import { LPCDTRR5Data } from '@/data/CDTR/late-payment/late-payment-cdtr-round-5';
import { LPCDTRR6Data } from '@/data/CDTR/late-payment/late-payment-cdtr-round-6';

interface Props { }
const page = ({ }: Props) => {

	const letterTypes: { type: string; component: ReactNode; }[] = [
		{ type: "delegatoryRound1", component: <DelegatoryRound1 {...DR1Data} /> },
		{ type: "accountSoldLetter1", component: <AccountSoldLetter1 {...ASL1Data} /> },
		{ type: "accountSoldLetter2", component: <AccountSoldLetter2 {...ASL2Data} /> },
		{ type: "accountSoldLetter3", component: <AccountSoldLetter3 {...ASL3Data} /> },
		{ type: "accountSoldLetter4", component: <AccountSoldLetter4 {...ASL4Data} /> },
		{ type: "accountSoldLetter5", component: <AccountSoldLetter5 {...ASL5Data} /> },
		{ type: "accountSoldLetter6", component: <AccountSoldLetter6 {...ASL5Data} /> },
		{ type: "authorizeUserLetter1", component: <AuthorizeUserLetter1 {...AUL1Data} /> },
		{ type: "authorizeUserLetter2", component: <AuthorizeUserLetter2 {...AUL2Data} /> },
		{ type: "authorizeUserLetter3", component: <AuthorizeUserLetter3 {...AUL3Data} /> },
		{ type: "authorizeUserLetter4", component: <AuthorizeUserLetter4 {...AUL4Data} /> },
		{ type: "authorizeUserLetter5", component: <AuthorizeUserLetter5 {...AUL5Data} /> },
		{ type: "authorizeUserLetter6", component: <AuthorizeUserLetter6 {...AUL6Data} /> },
		{ type: "creditorAuthorizeUserLetter1", component: <CreditorAuthorizeUserLetter1 {...CAUL1Data} /> },
		{ type: "creditorAuthorizeUserLetter2", component: <CreditorAuthorizeUserLetter2 {...CAUL2Data} /> },
		{ type: "creditorAuthorizeUserLetter3", component: <CreditorAuthorizeUserLetter3 {...CAUL3Data} /> },
		{ type: "creditorAuthorizeUserLetter4", component: <CreditorAuthorizeUserLetter4 {...CAUL4Data} /> },
		{ type: "creditorAuthorizeUserLetter5", component: <CreditorAuthorizeUserLetter5 {...CAUL5Data} /> },
		{ type: "creditorAuthorizeUserLetter6", component: <CreditorAuthorizeUserLetter6 {...CAUL6Data} /> },
		{ type: "carRepossessionLetter1", component: <CarRepossessionLetter1 {...CRL1Data} /> },
		{ type: "carRepossessionLetter2", component: <CarRepossessionLetter2 {...CRL2Data} /> },
		{ type: "carRepossessionLetter3", component: <CarRepossessionLetter3 {...CRL3Data} /> },
		{ type: "carRepossessionLetter4", component: <CarRepossessionLetter4 {...CRL4Data} /> },
		{ type: "carRepossessionLetter5", component: <CarRepossessionLetter5 {...CRL5Data} /> },
		{ type: "carRepossessionLetter6", component: <CarRepossessionLetter6 {...CRL6Data} /> },
		{ type: "creditorCarRepossessionLetter1", component: <CreditorCarRepossessionLetter1 {...CCRL1Data} /> },
		{ type: "securityFreeze", component: <SecurityFreeze {...SFData} /> },
		{ type: "personalInformation", component: <PersonalInformation {...PIData} /> },
		{ type: "delegatoryRound2", component: <DelegatoryRound2 {...DR2Data} /> },
		{ type: "delegatoryRound3", component: <DelegatoryRound3 {...DR3Data} /> },
		{ type: "delegatoryRound4", component: <DelegatoryRound4 {...DR4Data} /> },
		{ type: "delegatoryRound5", component: <DelegatoryRound5 {...DR5Data} /> },
		{ type: "delegatoryRound6", component: <DelegatoryRound6 {...DR6Data} /> },
		{ type: "InquiryRound1", component: <InquiryRound1 {...IR1Data} /> },
		{ type: "InquiryRound2", component: <InquiryRound2 {...IR2Data} /> },
		{ type: "InquiryRound3", component: <InquiryRound3 {...IR3Data} /> },
		{ type: "LatePaymentRound1", component: <LatePaymentRound1 {...LP1Data} /> },
		{ type: "LatePaymentRound2", component: <LatePaymentRound2 {...LP2Data} /> },
		{ type: "LatePaymentRound3", component: <LatePaymentRound3 {...LP3Data} /> },
		{ type: "LatePaymentRound4", component: <LatePaymentRound4 {...LP4Data} /> },
		{ type: "LatePaymentRound5", component: <LatePaymentRound5 {...LP5Data} /> },
		{ type: "LatePaymentRound6", component: <LatePaymentRound6 agencies={agencies} {...LP6Data} /> },
		{ type: "DelegatoryCDTRRound1", component: <DelegatoryCDTRRound1 {...CDTRDR1Data} /> },
		{ type: "DelegatoryCDTRRound2", component: <DelegatoryCDTRRound2 {...CDTRDR2Data} /> },
		{ type: "DelegatoryCDTRRound3", component: <DelegatoryCDTRRound3 {...CDTRDR3Data} /> },
		{ type: "DelegatoryCDTRRound4", component: <DelegatoryCDTRRound4 {...CDTRDR4Data} /> },
		{ type: "DelegatoryCDTRRound5", component: <DelegatoryCDTRRound5 {...CDTRDR5Data} /> },
		{ type: "DelegatoryCDTRRound6", component: <DelegatoryCDTRRound6 {...CDTRDR6Data} /> },
		{ type: "InquiryCDTRRound1", component: <InquiryCDTRRound1 {...ICDTRR1Data} /> },
		{ type: "InquiryCDTRRound2", component: <InquiryCDTRRound2 {...ICDTRR2Data} /> },
		{ type: "InquiryCDTRRound3", component: <InquiryCDTRRound3 {...ICDTRR3Data} /> },
		{ type: "LatePaymentCDTRRound1", component: <LatePaymentCDTRRound1 {...LPCDTRR1Data} /> },
		{ type: "LatePaymentCDTRRound2", component: <LatePaymentCDTRRound2 {...LPCDTRR2Data} /> },
		{ type: "LatePaymentCDTRRound3", component: <LatePaymentCDTRRound3 {...LPCDTRR3Data} /> },
		{ type: "LatePaymentCDTRRound4", component: <LatePaymentCDTRRound4 {...LPCDTRR4Data} /> },
		{ type: "LatePaymentCDTRRound5", component: <LatePaymentCDTRRound5 {...LPCDTRR5Data} /> },
		{ type: "LatePaymentCDTRRound6", component: <LatePaymentCDTRRound6 {...LPCDTRR6Data} /> },
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
