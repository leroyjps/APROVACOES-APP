// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NovaSolicitacao from "./pages/NovaSolicitacao";
import MinhasSolicitacoes from "./pages/MinhasSolicitacoes";
import VisualizarSolicitacoes from "./pages/VisualizarSolicitacoes";
import AdminUsuarios from "./pages/AdminUsuarios";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas com layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/nova-solicitacao" element={<NovaSolicitacao />} />
            <Route path="/minhas-solicitacoes" element={<MinhasSolicitacoes />} />
            <Route path="/visualizar-solicitacoes" element={<VisualizarSolicitacoes />} />
            <Route
              path="/admin-usuarios"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <AdminUsuarios />
                </RoleProtectedRoute>
              }
            />
          </Route>

          {/* Rota catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
