export interface customersResponse {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  userName: string;
  totalSharePromised: number;
  totalSharePaid: number;
  fullyPayed: string;
}
export interface customersRequest {
  fullName: string;
  phoneNumber: string;
  address: string;
  password: string;
  userName: string;
  totalSharePromised: number;
  totalSharePaid: number;
}
