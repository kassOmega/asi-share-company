export interface BoardResponse {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  userName: string;
  role: string;
}
export interface BoardRequest {
  fullName: string;
  phoneNumber: string;
  address: string;
  password: string;
  userName: string;
}
export interface UpdateBoardRequest {
  BoardRequest: BoardRequest;
  id: number;
}
