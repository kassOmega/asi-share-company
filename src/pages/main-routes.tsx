import { useUserToken } from "../api";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./login";
import {
  CustomerList,
  AddCustomer,
  PaidCustomerList,
  UnpaidCustomerList,
} from "./customers";
import { ASILayout } from "../components";

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
    <ASILayout>
      <Switch>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/register" element={<AddCustomer />} />
        <Route path="/customers/fully-paid" element={<PaidCustomerList />} />
        <Route
          path="/customers/fully-unpaid"
          element={<UnpaidCustomerList />}
        />
        <Route path="/customers/:id" element={<CustomerList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </ASILayout>
  );
}
