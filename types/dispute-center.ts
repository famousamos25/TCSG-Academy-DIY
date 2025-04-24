
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
	inquiries: [];
	accounts: LetterAccount[];

	letterSentAt?: string;
	letterCompletedAt?: string;
}

interface LetterAccount {
	accountNumber: string;
	status: string;
	furnisher: string;
	instruction: string;
	reason: string;
}