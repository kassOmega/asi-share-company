export interface CustomersResponse {
  id: string;
  customerID: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  totalSharePromised: number;
  totalSharePaid: number;
  totalSharePromisedAmount: number;
  totalSharePaidAmount: number;
  fullyPayed: string;
  ServiceCharge: number;
  profilePicture: string;
  attachments: string[];
}
export interface CustomersRequest {
  customerID: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  totalSharePromised: number;
  totalSharePaid: number;
  totalSharePromisedAmount: number;
  totalSharePaidAmount: number;
  ServiceCharge: number;
}
export interface UpdateCustomersRequest {
  CustomersRequest: CustomersRequest;
  id: number;
}
export interface CustomersStat {
  data: {
    moneyPaid10kAndAbove: number;
    moneyPaidBelow10k: number;
    paidShare10kAndAbove: number;
    paidShareBelow10k: number;
    promisedMoney10kAndAbove: number;
    promisedMoneyBelow10k: number;
    promisedShare10kAndAbove: number;
    promisedShareBelow10k: number;
    startedPay: number;
    totalPaidShare: number;
    totalRequestedShare: number;
    totalShareHolders: number;
    totalShareHoldersCompletelyPaid: number;
    totalSharePaidAmount: number;
    totalSharePromisedAmount: number;
    customersPaidBelow10k: number;
    customerspaid10kAndAbove: number;
  };
}
export interface SearchParams {
  name?: string;
  min?: string;
  max?: string;
}
