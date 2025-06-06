export enum DisputeType {
    PERSONAL_INFO = 'personal-info',
    DEROGATORY = 'derogatory',
    INQUIRIES = 'inquiries',
    LATE_PAYMENTS = 'late-payments',
    PUBLIC_RECORDS = 'public-records',
    ALL_ACCOUNTS = 'all-accounts'
}
export const DISPUTE_TYPES = [
    {
        name: 'Personal Information',
        count: 0,
        description: 'Dispute',
        type: 'personal-info'
    },
    {
        name: 'Derogatory',
        type: 'derogatory'
    },
    {
        name: 'Inquiries',
        type: 'inquiries'
    },
    {
        name: 'Late Payments',
        type: 'late-payments'
    },
    {
        name: 'Public Records',
        type: 'public-records'
    },
    // {
    //     name: 'All Accounts',
    //     type: 'all-accounts'
    // },
];