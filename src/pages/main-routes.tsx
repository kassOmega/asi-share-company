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
import { Dashboard } from "./dashboard";
import { UpdateCustomer } from "./customers/update-customer";
import { AddBoard, BoardList } from "./board";
import jwt_decode from "jwt-decode";

export function MainRoutes() {
  const { isLoggedIn, token } = useUserToken();
  let decoded: any;
  if (isLoggedIn) decoded = jwt_decode(token ?? "");
  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    );
  }

  if (decoded.role === "admin") {
    return (
      <ASILayout>
        <Switch>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/register" element={<AddCustomer />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/board/:id" element={<BoardList />} />
          <Route path="/board/register" element={<AddBoard />} />
          <Route path="/customers/fully-paid" element={<PaidCustomerList />} />
          <Route
            path="/customers/fully-unpaid"
            element={<UnpaidCustomerList />}
          />
          <Route path="/customers/:id" element={<CustomerList />} />
          <Route path="/customers/update/:id" element={<UpdateCustomer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Switch>
      </ASILayout>
    );
  }

  return (
    <ASILayout>
      <Switch>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/:id" element={<BoardList />} />
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
