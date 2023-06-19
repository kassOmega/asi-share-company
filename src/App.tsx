import React from "react";
import { Stack, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AxiosClientProvider } from "./api";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainRoutes } from "./pages";

const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <AxiosClientProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <MainRoutes />
          </ThemeProvider>
        </QueryClientProvider>
      </AxiosClientProvider>
    </BrowserRouter>
  );
}

export default App;
