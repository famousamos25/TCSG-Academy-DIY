
export interface DisputeLetter {
	letterType: string;
	id: string;
	letterName: string;
	creditBureauName: string;
	shortDescription: string;
	letterRound: number;
	letterSent: boolean;
	letterCompleted: boolean;
	createdAt: string;
	userId: string;
	inquiries?: { instruction: string, reason: string}[];
	accounts?: LetterAccount[];
	creditbureauAddresses?: CreditbureauAddress[];
	includeAffidavit?: boolean;
	includeSelfRep?: boolean;
	metadata?: any;

	letterSentAt?: string;
	letterCompletedAt?: string;
}

interface LetterAccount {
	accountNumber: string;
	status: string;
	furnisher: string;
	
	reason: string;
	reasonDescription?: string;
	instruction: string;
	instructionDescription?: string;
}

interface CreditbureauAddress { 
	bureau: string;
	address: string
}