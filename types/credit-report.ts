export interface Creditor {
  name: string;
  subscriberCode: string;
  telephone: string;
  address: Address;
  industryCode: string;
  source: string;
}

export interface Address {
  city: string;
  stateCode: string;
  unparsedStreet: string;
  postalCode: string;
}

export interface Inquiry {
  bureau: string;
  inquiryDate: string;
  inquiryType: string;
  subscriberNumber: string;
  subscriberName: string;
  industryCode: string;
}