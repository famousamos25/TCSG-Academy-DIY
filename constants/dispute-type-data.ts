const AVAILABLE_REASONS = [
    {
        short: 'Under 15 U.S. Code § 1681 (a)(4) Consumer...',
        full: "Under 15 U.S. Code § 1681 (a)(4) Consumer reporting agencies have assumed a vital role in assembling and evaluating consumer credit and other information on consumers. There is a need to ensure that consumer reporting agencies exercise their grave responsibilities with fairness, impartiality, and a respect for the consumer's right to privacy."
    },
    {
        short: 'Under 15 USC 1692g; Validation of debts',
        full: 'Under 15 USC 1692g; Validation of debts - Within five days after the initial communication with a consumer in connection with the collection of any debt, a debt collector shall, unless the following information is contained in the initial communication or the consumer has paid the debt, send the consumer a written notice containing the amount of the debt, the name of the creditor to whom the debt is owed, and statements regarding dispute rights.'
    },
    {
        short: 'Under 15 U.S. Code § 1681i Consumer...',
        full: "Under 15 U.S. Code § 1681i Consumer dispute procedure - If the completeness or accuracy of any item of information contained in a consumer's file at a consumer reporting agency is disputed by the consumer and the consumer notifies the agency directly, or indirectly through a reseller, of such dispute, the agency shall, free of charge, conduct a reasonable reinvestigation to determine whether the disputed information is inaccurate."
    }
];

const AVAILABLE_INSTRUCTIONS = [
  {
    short: 'Please delete this account immediately f...',
    full: 'Please delete this account immediately from my credit report as it does not belong to me and I have no knowledge of this account. This account was either opened fraudulently or is being reported in error.'
  },
  {
    short: 'Please delete due to a violation of',
    full: 'Please delete due to a violation of the Fair Credit Reporting Act. This account contains inaccurate information and the furnisher has failed to provide proper verification as required by law.'
  },
  {
    short: 'Please investigate and remove this account',
    full: 'Please investigate and remove this account from my credit report. After careful review, I have found that this account contains errors regarding payment history, balance information, and/or account status that do not accurately reflect my credit behavior.'
  }
];

const LATE_PAYMENTS = [
    {
        furnisher: "HYUNDAI FINC",
        accountId: "2021010372143",
        accountType: "Auto Loan",
        bureaus: {
            tu: "In-Dispute",
            exp: "In-Dispute",
            eqfx: "In-Dispute",
            cdtr: "In-Dispute"
        },
        reason: "Under 15 USC 1666b Timing of Payments",
        instruction: "Please Update to Never Late",
        status: "Negative",
    },
    {
        furnisher: "BESTEGG",
        accountId: "4942860002921484",
        accountType: "Credit Card",
        bureaus: {
            tu: "In-Dispute",
            exp: "In-Dispute",
            eqfx: "In-Dispute",
            cdtr: "In-Dispute"
        },
        reason: "Under 15 USC 1666b Timing of Payments",
        instruction: "Please Update to Never Late",
        status: "Negative",
    }
]

const ACCOUNTS = [
    {
        furnisher: 'UTILITY SELFREPORTED',
        accountId: 'PR026AB925D0915481288780E8947F597E4',
        accountType: 'Unknown -credit',
        bureaus: {
            tu: 'Not Reported',
            exp: 'In-Dispute',
            eqfx: 'Not Reported',
        },
        creditor: 'UTILITY SELFREPORTED',
        reason: 'Under 15 U.S. Code § 1681 (a)(4) Consumer Right to Privacy',
        instruction: 'This is a violation of my consumer rights, please delete immediately',
        status: 'Positive'
    },
    {
        furnisher: 'FB&T/MERCURY',
        accountId: '0059499809',
        accountType: 'Credit Card',
        bureaus: {
            tu: 'In-Dispute',
            exp: 'In-Dispute',
            eqfx: 'In-Dispute',
        },
        creditor: 'FB&T/MERCURY',
        reason: 'Under 15 USC 1692g. Validation of debts',
        instruction: 'Please delete due to a violation of 15 U.S. Code  1692g - Validation of debts',
        status: 'Negative'
    },
    {
        furnisher: 'LVNV FUNDING LLC',
        accountId: '379364015536330',
        accountType: 'Unknown -credit',
        bureaus: {
            tu: 'Not Reported',
            exp: 'In-Dispute',
            eqfx: 'In-Dispute',
        },
        creditor: 'LVNV FUNDING LLC',
        reason: 'Under 15 USC 1692g. Validation of debts',
        instruction: 'Please delete due to a violation of 15 U.S. Code  1692g - Validation of debts',
        status: 'Negative'
    },
    {
        furnisher: 'LVNV FUNDING LLC',
        accountId: '4707930522615307',
        accountType: 'Unknown -credit',
        bureaus: {
            tu: 'Not Reported',
            exp: 'In-Dispute',
            eqfx: 'In-Dispute',
        },
        creditor: 'LVNV FUNDING LLC',
        reason: 'Under 15 USC 1692g. Validation of debts',
        instruction: 'Please delete due to a violation of 15 U.S. Code  1692g - Validation of debts',
        status: 'Negative'
    },
    {
        furnisher: 'SECCREDIT',
        accountId: '5194979',
        accountType: 'Collection',
        bureaus: {
            tu: 'Not Reported',
            exp: 'Not Reported',
            eqfx: 'In-Dispute',
        },
        creditor: '',
        reason: 'Under 15 USC 1692g. Validation of debts',
        instruction: 'Please delete due to a violation of 15 U.S. Code  1692g - Validation of debts',
        status: 'Negative'
    }
];

const INQUIRIES_DATA = [
    {
        creditor: "CBNA/THD",
        bureau: "EQFX",
        cdtr: "CDTR",
        date: "Nov 10, 2023",
        reason: "Under 15 US Code 1681b permissible purpose...",
        instruction: "Please Delete Immediately",
    },
    {
        creditor: "JPMCB CARD",
        bureau: "EXP",
        cdtr: "CDTR",
        date: "Feb 21, 2023",
        reason: "Under 15 US Code 1681b permissible purpose...",
        instruction: "Please Delete Immediately",
    },
    {
        creditor: "SALLIE MAE B",
        bureau: "TU",
        cdtr: "CDTR",
        date: "Oct 24, 2023",
        reason: "Under 15 US Code 1681b permissible purpose...",
        instruction: "Please Delete Immediately",
    },
    {
        creditor: "SYNCB/LOWES",
        bureau: "TU",
        cdtr: "CDTR",
        date: "Nov 8, 2023",
        reason: "Under 15 US Code 1681b permissible purpose...",
        instruction: "Please Delete Immediately",
    },
];

export { ACCOUNTS, AVAILABLE_INSTRUCTIONS, AVAILABLE_REASONS, INQUIRIES_DATA, LATE_PAYMENTS };

