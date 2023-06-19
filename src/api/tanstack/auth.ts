import { useMutation } from "@tanstack/react-query";
import { useClient, useUserToken } from "../axios";
import { LoginRequest } from "../models";

export const useLoginMutation = () => {
  const client = useClient();
  const auth = useUserToken();
  return useMutation({
    mutationFn: (data: LoginRequest) => {
      return client
        .post("/api/admin/login", data)
        .then((d) => d.data)
        .then((res) => {
          auth.authBearer(res.token);
          return res;
        });
    },
  });
};
