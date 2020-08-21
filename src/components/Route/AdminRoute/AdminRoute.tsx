import { RouteProps, Route } from "react-router-dom";
import React from "react";
import { useUserState } from "../../../context/UserContext/UserContext";
import NotFound from "../../../pages/NotFound/NotFound";

const AdminRoute: React.FC<RouteProps> = ({ ...rest }) => {
  const { isAdmin, employeeInfo } = useUserState();
  console.log(employeeInfo);
  console.log(isAdmin);
  return isAdmin ? <Route {...rest} /> : <Route component={NotFound} />;
};

export default AdminRoute;
