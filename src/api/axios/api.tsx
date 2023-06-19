import { useRequest } from "./api-factory";

type LoginRequestBody = {
  userName: string;
  password: string;
};
type LoginResponse = {
  token: string;
};

export const useLogin = () =>
  useRequest<LoginRequestBody, LoginResponse>("POST", "/api/admin/login");
