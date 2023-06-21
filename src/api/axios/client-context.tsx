import axios, { AxiosInstance } from "axios";
import React, { ReactNode, useContext, useMemo, useState } from "react";
import jwt_decode from "jwt-decode";
import { BoardResponse } from "../models";

type AxiosContextType = {
  client: AxiosInstance;
  authBearer: (token?: string) => void;
  isLoggedIn: boolean;
  token: string;
};

const AxiosContext = React.createContext<AxiosContextType | null>(null);

export const AxiosClientProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000",
        headers: !!token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }),
    [token]
  );
  return (
    <AxiosContext.Provider
      value={{
        client: axiosInstance,
        authBearer: (token) => {
          setToken(token ?? null);
          if (token) return localStorage.setItem("token", token);
          localStorage.removeItem("token");
        },
        isLoggedIn: !!token,
        token: token ?? "",
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export const useClient = () => useContext(AxiosContext)?.client!;
export const useUserToken = () => {
  const { isLoggedIn, token, authBearer } = useContext(AxiosContext)!;
  return {
    isLoggedIn,
    token,
    authBearer,
    user: (token ? jwt_decode(token) : undefined) as BoardResponse | undefined,
  };
};
