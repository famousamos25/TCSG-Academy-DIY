type Bureau = 'TransUnion' | 'Experian' | 'Equifax';

export interface CreditInquiry {
  bureau: Bureau;
  industryCode: string;
  inquiryDate: string; 
  inquiryType: string;
  subscriberName: string;
  subscriberNumber: string;
}
