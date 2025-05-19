export interface Creditor {
  name: string;
  subscriberCode: string;
  telephone: string;
  address: Address;
  industryCode: string;
  source: string;
}

interface Address {
  city: string;
  stateCode: string;
  unparsedStreet: string;
  postalCode: string;
}