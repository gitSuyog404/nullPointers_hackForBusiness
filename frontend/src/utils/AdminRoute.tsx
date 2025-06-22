import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Roles } from "../redux/slices/authSlice";

const AdminRoute: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const isAdmin = userInfo?.role === Roles.ADMIN;

  return userInfo && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
