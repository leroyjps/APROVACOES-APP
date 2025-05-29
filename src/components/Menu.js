// src/components/Menu.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <nav className="menu">
      <h2 className="menu-title">Sistema de Aprovações</h2>
      <ul className="menu-list">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/nova-solicitacao" className={({ isActive }) => (isActive ? "active" : undefined)}>
            Nova Solicitação
          </NavLink>
        </li>
        <li>
          <NavLink to="/minhas-solicitacoes" className={({ isActive }) => (isActive ? "active" : undefined)}>
            Minhas Solicitações
          </NavLink>
        </li>
        {usuario?.role === "admin" && (
          <li>
            <NavLink to="/admin-usuarios" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Gerenciar Usuários
            </NavLink>
          </li>
        )}
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
