import { AxiosRequestConfig, Method } from "axios";
import { useCallback, useState } from "react";
import { useClient } from "./client-context";

type RequestMethod<RequestBody = {}, ResponseBody = {}, Params = {}> = (data?: {
  data?: RequestBody;
  params?: Params;
  headers?: AxiosRequestConfig<RequestBody>["headers"];
}) => Promise<ResponseBody>;

type UseRequestType<RequestBody = {}, ResponseBody = {}, Params = {}> = [
  RequestMethod<RequestBody, ResponseBody, Params>,
  { data?: ResponseBody; loading: boolean; error: boolean }
];

export function useRequest<RequestBody = {}, ResponseBody = {}, Params = {}>(
  method: Method,
  url: string
): UseRequestType<RequestBody, ResponseBody, Params> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState<ResponseBody>();
  const axios = useClient();

  const request: RequestMethod<RequestBody, ResponseBody, Params> = useCallback(
    async ({ data, params, headers } = {}): Promise<ResponseBody> => {
      setLoading(true);
      try {
        if (!axios) throw Error("you should wrap the app with AxiosContext");
        const res = await axios.request({
          method,
          url,
          data,
          params,
          headers,
        });
        setResponse(res.data);
        return res.data;
      } catch (e) {
        setError(true);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [axios, method, url]
  );

  return [request, { data: response, loading, error }];
}
