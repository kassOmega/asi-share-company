import { useClient } from "../../axios";
import {
  ResultArray,
  CustomersRequest,
  CustomersResponse,
  CustomersStat,
  ResultObject,
  SearchParams,
} from "../../models";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCustomersQuery = (params?: SearchParams) => {
  const client = useClient();
  return useQuery<ResultArray<CustomersResponse>, string>({
    queryKey: ["get customer", params?.name],
    queryFn: () =>
      client
        .get("/api/admin/customers", { params: { name: params?.name } })
        .then((res) => res.data),
  });
};

export const useDeleteCustomerMutation = () => {
  const client = useClient();
  return useMutation<unknown, string, string>({
    mutationFn: (id: string) =>
      client.delete(`/api/admin/customer/${id}`).then((res) => res.data),
  });
};

export const useGetCustomerByIdQuery = (id: number) => {
  const client = useClient();
  return useQuery<ResultObject<CustomersResponse>>({
    queryKey: ["get customer by id", id],
    queryFn: () =>
      client.get(`/api/admin/customers/profile/${id}`).then((res) => res.data),
  });
};
export const useGetPaidCustomersQuery = () => {
  const client = useClient();
  return useQuery<ResultArray<CustomersResponse>, string>({
    queryKey: ["get paid customer"],
    queryFn: () =>
      client.get("/api/admin/customers/fully-payed").then((res) => res.data),
  });
};
export const useGetUnpaidCustomersQuery = () => {
  const client = useClient();
  return useQuery<ResultArray<CustomersResponse>, string>({
    queryKey: ["get unpaid customer"],
    queryFn: () =>
      client
        .get("/api/admin/customers/incomplete-payment")
        .then((res) => res.data),
  });
};
export const useGetCustomersStatQuery = () => {
  const client = useClient();
  return useQuery<CustomersStat>({
    queryKey: ["get customer stat"],
    queryFn: () =>
      client.get("/api/admin/customers/stat").then((res) => res.data),
  });
};

export const useRegisterCustomerMutation = () => {
  const client = useClient();
  return useMutation({
    mutationFn: (data: CustomersRequest) => {
      return client
        .post("/api/admin/customer", data)
        .then((d) => d.data)
        .then((res) => {
          return res;
        });
    },
  });
};
interface updateRequest {
  totalSharePaid: number;
}
export const useUpdateCustomerPaymentMutation = () => {
  const client = useClient();
  return useMutation({
    mutationFn: (data: updateRequest) => {
      return client
        .put("/api/admin/customer", data)
        .then((d) => d.data)
        .then((res) => {
          return res;
        });
    },
  });
};
export const useUpdateCustomerMutation = (id: string) => {
  const client = useClient();
  return useMutation({
    mutationFn: (data: CustomersRequest) => {
      return client
        .put("/api/admin/customer/" + id, data)
        .then((d) => d.data)
        .then((res) => {
          return res;
        });
    },
  });
};
