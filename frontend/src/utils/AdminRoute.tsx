import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Roles } from "../redux/slices/authSlice";

const AdminRoute: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const isAdmin = userInfo?.role === Roles.ADMIN;
  const isRestaurant = userInfo?.role === Roles.RESTAURANT;
  const hasAdminAccess = isAdmin || isRestaurant;

  return userInfo && hasAdminAccess ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
