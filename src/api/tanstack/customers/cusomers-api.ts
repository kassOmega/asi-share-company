import { useClient } from "../../axios";
import { ResultArray, customersResponse } from "../../models";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useGetCustomersQuery = () => {
  const client = useClient();
  return useQuery<ResultArray<customersResponse>, string>({
    queryKey: ["get customer"],
    queryFn: () => client.get("/api/admin/customers").then((res) => res.data),
  });
};
