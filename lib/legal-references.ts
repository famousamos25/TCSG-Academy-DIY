// Legal reference database for dispute letters
export const LEGAL_REFERENCES = {
  'Late Payment': [
    {
      id: 'fcra-611',
      title: 'FCRA § 611 - Procedure in Case of Disputed Accuracy',
      citation: '15 U.S.C. § 1681i',
      description: 'Requires credit bureaus to investigate disputed information within 30 days.',
      text: 'Pursuant to FCRA § 611 (15 U.S.C. § 1681i), you are required to conduct a reasonable investigation of this dispute within 30 days.',
      relevance: 'High',
      category: 'Investigation Requirements'
    },
    {
      id: 'fcra-623',
      title: 'FCRA § 623 - Responsibilities of Furnishers',
      citation: '15 U.S.C. § 1681s-2',
      description: 'Requires furnishers to report accurate information and investigate disputes.',
      text: 'Under FCRA § 623 (15 U.S.C. § 1681s-2), you have a duty to conduct a reasonable investigation of this dispute and correct any inaccurate information.',
      relevance: 'High',
      category: 'Furnisher Obligations'
    },
    {
      id: 'fcra-609',
      title: 'FCRA § 609 - Disclosures to Consumers',
      citation: '15 U.S.C. § 1681g',
      description: 'Requires disclosure of all relevant information in consumer file.',
      text: 'As required by FCRA § 609 (15 U.S.C. § 1681g), please provide copies of all documents relating to this investigation.',
      relevance: 'Medium',
      category: 'Documentation Requirements'
    }
  ],
  'Account Not Mine': [
    {
      id: 'fcra-605',
      title: 'FCRA § 605 - Requirements Relating to Information Contained in Consumer Reports',
      citation: '15 U.S.C. § 1681c',
      description: 'Prohibits reporting of inaccurate account ownership information.',
      text: 'As per FCRA § 605 (15 U.S.C. § 1681c), you must remove any information that cannot be properly verified as belonging to me.',
      relevance: 'High',
      category: 'Account Verification'
    },
    {
      id: 'fcra-623b',
      title: 'FCRA § 623(b) - Duties of Furnishers Upon Notice of Dispute',
      citation: '15 U.S.C. § 1681s-2(b)',
      description: 'Requires furnishers to verify account ownership upon dispute.',
      text: 'Under FCRA § 623(b) (15 U.S.C. § 1681s-2(b)), you must verify that I am the actual owner of this account.',
      relevance: 'High',
      category: 'Account Verification'
    }
  ],
  'Identity Theft': [
    {
      id: 'fcra-605b',
      title: 'FCRA § 605B - Block of Information Resulting from Identity Theft',
      citation: '15 U.S.C. § 1681c-2',
      description: 'Requires blocking of information resulting from identity theft.',
      text: 'Pursuant to FCRA § 605B (15 U.S.C. § 1681c-2), you must block the reporting of any information identified as resulting from identity theft.',
      relevance: 'High',
      category: 'Identity Theft Protection'
    },
    {
      id: 'fcra-609e',
      title: 'FCRA § 609(e) - Information Available to Victims',
      citation: '15 U.S.C. § 1681g(e)',
      description: 'Requires furnishers to provide records to identity theft victims.',
      text: 'Under FCRA § 609(e) (15 U.S.C. § 1681g(e)), I request all records relating to this fraudulent account.',
      relevance: 'High',
      category: 'Documentation Requirements'
    }
  ],
  'Incorrect Balance': [
    {
      id: 'fcra-623a3',
      title: 'FCRA § 623(a)(3) - Duty to Provide Accurate Information',
      citation: '15 U.S.C. § 1681s-2(a)(3)',
      description: 'Prohibits furnishing information known to be inaccurate.',
      text: 'Per FCRA § 623(a)(3) (15 U.S.C. § 1681s-2(a)(3)), you may not furnish information that you know or have reasonable cause to believe is inaccurate.',
      relevance: 'High',
      category: 'Accuracy Requirements'
    }
  ],
  'Account Closed': [
    {
      id: 'fcra-623a4',
      title: 'FCRA § 623(a)(4) - Duty to Update and Correct Information',
      citation: '15 U.S.C. § 1681s-2(a)(4)',
      description: 'Requires updating account status information.',
      text: 'Under FCRA § 623(a)(4) (15 U.S.C. § 1681s-2(a)(4)), you must update the status of this account to reflect that it has been closed.',
      relevance: 'High',
      category: 'Status Updates'
    }
  ]
};

export const DISPUTE_REASONS = {
  'Late Payment': [
    'Payment was made on time',
    'Payment was never late',
    'Late fee was waived',
    'Payment arrangement was made',
    'No notice of late payment received',
    'Payment was misapplied',
    'Grace period not properly applied',
    'Payment posted to wrong account'
  ],
  'Account Not Mine': [
    'Never opened this account',
    'Victim of identity theft',
    'Account belongs to another person',
    'Account was opened fraudulently',
    'Authorized user only',
    'Result of mixed credit file',
    'Similar name confusion',
    'Closed account reopened without authorization'
  ],
  'Identity Theft': [
    'Account opened fraudulently',
    'Unauthorized charges made',
    'Police report filed',
    'FTC Identity Theft Report filed',
    'Never received account statements',
    'Address used is unknown to me',
    'Signature on application is forged',
    'Account opened without my consent'
  ],
  'Incorrect Balance': [
    'Balance shown is incorrect',
    'Payments not properly credited',
    'Unauthorized charges included',
    'Duplicate charges included',
    'Refund not reflected',
    'Account settled for less',
    'Discharged in bankruptcy'
  ],
  'Account Closed': [
    'Account closed by consumer',
    'Account paid and closed',
    'Account closed by agreement',
    'Zero balance at closing',
    'Account transferred',
    'Account refinanced',
    'Account consolidated'
  ]
};

export const DISPUTE_TEMPLATES = {
  'Late Payment': `I am writing to dispute the following information in my credit report:

[ACCOUNT_DETAILS]

This late payment notation is inaccurate because [REASON]. I have attached documentation supporting my position.

[LEGAL_REFERENCES]

Please investigate this matter and remove the inaccurate late payment information from my credit report.

I request that you:
1. Conduct a reasonable investigation of this dispute
2. Review all submitted documentation
3. Remove or correct the inaccurate information
4. Send me the results of your investigation

I am exercising my rights under the Fair Credit Reporting Act, and I expect a response within 30 days.`,

  'Account Not Mine': `I am writing to dispute the following account that appears on my credit report:

[ACCOUNT_DETAILS]

This account does not belong to me and was [REASON]. I have never opened an account with this creditor.

[LEGAL_REFERENCES]

Please investigate this matter and remove this account from my credit report.

I request that you:
1. Verify the accuracy of the account ownership
2. Review my identification documents
3. Remove this account if it cannot be verified as mine
4. Provide me with proof of account ownership if available

I am exercising my rights under the Fair Credit Reporting Act, and I expect a response within 30 days.`,

  'Identity Theft': `I am writing to dispute the following fraudulent account on my credit report:

[ACCOUNT_DETAILS]

I am a victim of identity theft and this account was opened fraudulently. I have attached:
- FTC Identity Theft Report
- Police Report
- Identity Theft Affidavit
- Proof of Identity

[LEGAL_REFERENCES]

Please block this information and remove it from my credit report immediately.

I request that you:
1. Block this information under FCRA § 605B
2. Notify all furnishers of the block
3. Send me confirmation of the block
4. Provide me with all records related to this fraudulent account

I am exercising my rights under the Fair Credit Reporting Act, and I expect a response within 30 days.`,

  'Incorrect Balance': `I am writing to dispute the following balance on my credit report:

[ACCOUNT_DETAILS]

The reported balance is inaccurate because [REASON]. I have attached documentation showing the correct balance.

[LEGAL_REFERENCES]

Please investigate this matter and update the balance to reflect the correct amount.

I request that you:
1. Verify the current balance
2. Review my payment history
3. Update the balance to the correct amount
4. Provide me with verification of the correction

I am exercising my rights under the Fair Credit Reporting Act, and I expect a response within 30 days.`,

  'Account Closed': `I am writing to dispute the status of the following account on my credit report:

[ACCOUNT_DETAILS]

This account was closed [REASON]. The current status is inaccurate and should be updated to reflect that the account is closed.

[LEGAL_REFERENCES]

Please investigate this matter and update the account status accordingly.

I request that you:
1. Verify the account status
2. Update the status to show as closed
3. Ensure the closed date is accurate
4. Provide me with verification of the correction

I am exercising my rights under the Fair Credit Reporting Act, and I expect a response within 30 days.`
};