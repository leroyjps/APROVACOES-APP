// src/components/RoleProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function RoleProtectedRoute({ children, allowedRoles = [] }) {
  const { usuario, carregando } = useAuth();
  if (carregando) return <Loading />;
  if (!usuario) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(usuario.role)) return <Navigate to="/" replace />;
  return children;
}
