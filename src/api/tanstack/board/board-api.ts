import { useClient } from "../../axios";
import {
  ResultArray,
  ResultObject,
  BoardRequest,
  BoardResponse,
} from "../../models";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetBoardQuery = () => {
  const client = useClient();
  return useQuery<ResultArray<BoardResponse>, string>({
    queryKey: ["get Board Members"],
    queryFn: () =>
      client.get("/api/admin/board-members").then((res) => res.data),
  });
};
export const useGetBoardByIdQuery = (id: number) => {
  const client = useClient();
  return useQuery<ResultObject<BoardResponse>>({
    queryKey: ["get customer by id", id],
    queryFn: () =>
      client.get(`/api/admin/customers/profile/${id}`).then((res) => res.data),
  });
};
export const useRegisterBoardMutation = () => {
  const client = useClient();
  return useMutation({
    mutationFn: (data: BoardRequest) => {
      return client
        .post("/api/admin/board-member", data)
        .then((d) => d.data)
        .then((res) => {
          return res;
        });
    },
  });
};
