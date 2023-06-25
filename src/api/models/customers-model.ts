export interface CustomersResponse {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  totalSharePromised: number;
  totalSharePaid: number;
  fullyPayed: string;
}
export interface CustomersRequest {
  fullName: string;
  phoneNumber: string;
  address: string;
  totalSharePromised: number;
  totalSharePaid: number;
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
  };
}
export interface SearchParams {
  name?: string;
}
