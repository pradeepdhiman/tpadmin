import React from "react";
import { useAuth } from './auth-context/auth.context';
import { useNavigate, Outlet } from 'react-router-dom';
import { authUser } from "layouts/authentication/functions/query";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = authUser()
  

  if (!user || !user.token || user.token === "") {
    navigate("/authentication/sign-in");
    return null;
  }

  return <Outlet />;
};
