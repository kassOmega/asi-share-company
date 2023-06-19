import { useClient } from "../../axios";
import { ResultArray, customersRequest, customersResponse } from "../../models";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useGetCustomersQuery = () => {
  const client = useClient();
  return useQuery<ResultArray<customersResponse>, string>({
    queryKey: ["get customer"],
    queryFn: () => client.get("/api/admin/customers").then((res) => res.data),
  });
};
export const useGetPaidCustomersQuery = () => {
  const client = useClient();
  return useQuery<ResultArray<customersResponse>, string>({
    queryKey: ["get paid customer"],
    queryFn: () =>
      client.get("/api/admin/customers/fully-payed").then((res) => res.data),
  });
};
export const useGetUnpaidCustomersQuery = () => {
  const client = useClient();
  return useQuery<ResultArray<customersResponse>, string>({
    queryKey: ["get unpaid customer"],
    queryFn: () =>
      client
        .get("/api/admin/customers/incomplete-payment")
        .then((res) => res.data),
  });
};

export const useRegisterCustomerMutation = () => {
  const client = useClient();
  return useMutation({
    mutationFn: (data: customersRequest) => {
      return client
        .post("/api/admin/customer", data)
        .then((d) => d.data)
        .then((res) => {
          return res;
        });
    },
  });
};
