// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (err) {
      setErro("Email ou senha incorretos");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        {erro && <p className="erro">{erro}</p>}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
        <button type="submit">Entrar</button>
        <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
      </form>
    </div>
  );
}
