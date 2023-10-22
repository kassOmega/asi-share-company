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
}
export interface UpdateCustomersRequest {
  CustomersRequest: CustomersRequest;
  id: number;
}
export interface CustomersStat {
  data: {
    totalPaidShare: number;
    totalRequestedShare: number;
    totalShareHolders: number;
    totalShareHoldersCompletelyPaid: number;
    totalSharePromisedAmount: number;
    totalSharePaidAmount: number;
    startedPay:number,
    paid10kAndAbove:number
  };
}
export interface SearchParams {
  name?: string;
}
