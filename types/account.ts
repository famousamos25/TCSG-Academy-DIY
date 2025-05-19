export interface DisputeAccount {
  bureau: string;
  creditorName: string;
  accountNumber: string;
  subscriberCode: string;
  balance: string;
  highBalance: string;
  accountStatus: string;
  dateAccountStatus: string;
  accountDescription: string;
  accountType: string;
  creditType: string;
  disputeFlag: string;
  verificationIndicator: string;
  dateReported: string;
  dateLastPayment: string;
  creditLimit: string;
  amountPastDue: string;
  monthlyPayment: string;
  paymentFrequency: string;
  paymentHistory: PaymentHistory;
  paymentStatus: string;
}

interface PaymentHistory {
  status: string;
  startDate: string;
  monthlyPayStatus: MonthlyPayStatus[];
}

interface MonthlyPayStatus {
  date: string;
  status: string;
}