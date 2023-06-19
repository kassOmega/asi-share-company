import { useUserToken } from "../api";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { LoginPage } from "./login";
import { CustomerList } from "./customers";

export function MainRoutes() {
  const { isLoggedIn } = useUserToken();
  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    );
  }

  return (
    <Stack>
      <Switch>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </Stack>
  );
}
