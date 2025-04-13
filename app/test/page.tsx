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
import { DR1Data } from '@/data/dispute-letters/delegatory-round-1';
import { PIData } from '@/data/personal-information';
import { SFData } from '@/data/security-freeze';
import { ReactNode } from 'react';

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
