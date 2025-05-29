import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading.js";

export default function ProtectedRoute({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <Loading />;
  }

  if (!usuario) {
    return <Navigate to="/Menu" replace />;
  }

  return children;
}
